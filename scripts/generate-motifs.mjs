#!/usr/bin/env node
/**
 * Motif generator — reads design/motifs/*.svg and emits a TypeScript
 * file the website can render directly.
 *
 * Goals:
 *   - Camilla drops an SVG into design/motifs/, pushes, the site
 *     updates on the next Vercel build with no developer involvement.
 *   - Handles two source styles we know about (Inkscape custom drawings,
 *     Tabler-style icon SVGs) and any reasonable variation in between.
 *   - Recolouring works: every fill / stroke is rewritten to
 *     `currentColor` so we drive the colour via CSS `color`.
 *
 * Input convention:
 *   - One SVG per motif. The filename (minus ".svg" and any trailing
 *     " F" variant marker) is used VERBATIM as the motif key AND the
 *     label shown on the website — no slugifying, no translation, so
 *     "Kirsebær.svg" shows as "Kirsebær". Name the file exactly how it
 *     should appear in the picker.
 *   - A trailing " F" in the filename marks a "Filled" variant of the
 *     same motif (e.g. "cherry.svg" + "cherry F.svg" both group under
 *     "cherry"; we prefer F when both exist — filled icons read
 *     better at small dot sizes).
 *
 * Output:
 *   src/components/personalization/motifs.generated.ts
 *
 *   Contains two things:
 *     GENERATED_MOTIFS — record of key -> { inner, transform }
 *       inner: the SVG children as a raw markup string
 *       transform: an SVG transform that fits the source viewBox into
 *                  the renderer's 0 0 100 100 box
 *     GENERATED_MOTIF_KEYS — sorted array of keys
 *
 * The output file is committed to git so fresh clones work without
 * running the generator. Vercel regenerates on every build via the
 * `prebuild` hook in package.json.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(SCRIPT_DIR);
const INPUT_DIR = join(REPO_ROOT, "design/motifs");
const OUTPUT_FILE = join(
  REPO_ROOT,
  "src/components/personalization/motifs.generated.ts",
);

const RENDER_BOX = 100; // matches <ProductPreview /> viewBox

/* ───────────────────────────── helpers ──────────────────────────── */

/** "Cherry F.svg" -> { baseName: "Cherry", isFilled: true } */
function parseFilename(filename) {
  const name = filename.replace(/\.svg$/i, "");
  const filledMatch = name.match(/^(.*)\s+F$/i);
  if (filledMatch) return { baseName: filledMatch[1].trim(), isFilled: true };
  return { baseName: name.trim(), isFilled: false };
}

/** Strip Inkscape/Sodipodi noise from SVG markup. */
function stripMetadata(svgInner) {
  return (
    svgInner
      // self-closing sodipodi tags
      .replace(/<sodipodi:[^>]*\/>/g, "")
      // wrapped sodipodi blocks
      .replace(/<sodipodi:[a-z-]+\b[^>]*>[\s\S]*?<\/sodipodi:[a-z-]+>/g, "")
      // <defs> blocks (we don't reference anything from them)
      .replace(/<defs\b[^>]*>[\s\S]*?<\/defs>/g, "")
      // self-closing defs
      .replace(/<defs\b[^>]*\/>/g, "")
      // inkscape:* and sodipodi:* attributes anywhere
      .replace(/\s(?:inkscape|sodipodi):[a-z-]+="[^"]*"/g, "")
      // XML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim()
  );
}

/**
 * Replace concrete fill/stroke colours with `currentColor` so the
 * renderer can drive the colour via CSS `color`. Preserves `none`.
 * Elements marked `data-fixed` keep their own colour: parts that are
 * always printed in one filament, like the lemon's leaf.
 */
function recolour(svgInner) {
  return svgInner.replace(/<[^>]+>/g, (tag) =>
    tag.includes("data-fixed") ? tag : recolourTag(tag),
  );
}

function recolourTag(svgInner) {
  return svgInner
    .replace(/fill:\s*#[0-9a-fA-F]+/g, "fill:currentColor")
    .replace(/stroke:\s*#[0-9a-fA-F]+/g, "stroke:currentColor")
    .replace(/fill="#[0-9a-fA-F]+"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9a-fA-F]+"/g, 'stroke="currentColor"')
    .replace(/fill="rgb\([^)]+\)"/g, 'fill="currentColor"')
    .replace(/stroke="rgb\([^)]+\)"/g, 'stroke="currentColor"');
}

/** Parse the source viewBox; default to 0 0 100 100 if missing. */
function extractViewBox(svgText) {
  const match = svgText.match(/viewBox\s*=\s*"([^"]+)"/);
  if (!match) return [0, 0, RENDER_BOX, RENDER_BOX];
  return match[1].trim().split(/[\s,]+/).map(Number);
}

/** Extract everything inside the outermost <svg>…</svg>. */
function extractInner(svgText) {
  const match = svgText.match(/<svg\b[^>]*>([\s\S]*)<\/svg>\s*$/);
  return match ? match[1] : "";
}

/**
 * Icon SVGs (e.g. Tabler) set fill/stroke on the root <svg>, which
 * extractInner drops. Carry those onto a wrapping <g> so outline icons
 * stay outlines and filled icons stay filled.
 */
function wrapWithRootPaint(svgText, inner) {
  const rootTag = svgText.match(/<svg\b[^>]*>/)?.[0] ?? "";
  const attrs = [];
  for (const name of ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"]) {
    const match = rootTag.match(new RegExp(`\\s${name}="([^"]*)"`));
    if (match) attrs.push(`${name}="${match[1]}"`);
  }
  return attrs.length ? `<g ${attrs.join(" ")}>${inner}</g>` : inner;
}

/**
 * Compute the SVG transform that fits a source viewBox into the
 * renderer's 0 0 RENDER_BOX RENDER_BOX coordinate space, centred.
 */
function fitTransform([vx, vy, vw, vh]) {
  const scale = Math.min(RENDER_BOX / vw, RENDER_BOX / vh);
  const tx = (RENDER_BOX - vw * scale) / 2 - vx * scale;
  const ty = (RENDER_BOX - vh * scale) / 2 - vy * scale;
  return `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(5)})`;
}

/** Escape a string for inclusion inside a TS double-quoted string literal. */
function escapeForTsString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/* ────────────────────────────── main ────────────────────────────── */

function main() {
  let files;
  try {
    files = readdirSync(INPUT_DIR).filter((f) => f.toLowerCase().endsWith(".svg"));
  } catch (err) {
    console.error(`Cannot read ${INPUT_DIR}: ${err.message}`);
    process.exit(1);
  }

  // Group files by their verbatim base name; prefer the F (filled)
  // variant. The base name is the key AND the displayed label — no
  // transformation, so the picker shows the filename exactly.
  /** @type {Map<string, { filename: string; isFilled: boolean }>} */
  const chosen = new Map();
  for (const filename of files) {
    const { baseName, isFilled } = parseFilename(filename);
    if (!baseName) continue;
    const existing = chosen.get(baseName);
    if (!existing || (isFilled && !existing.isFilled)) {
      chosen.set(baseName, { filename, isFilled });
    }
  }

  // Process each chosen file into { inner, transform }, sorted with
  // Danish collation so æ/ø/å land where a Danish reader expects.
  const entries = [];
  const sorted = [...chosen.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], "da"),
  );
  for (const [key, { filename }] of sorted) {
    const svgText = readFileSync(join(INPUT_DIR, filename), "utf8");
    const viewBox = extractViewBox(svgText);
    let inner = extractInner(svgText);
    inner = wrapWithRootPaint(svgText, stripMetadata(inner));
    inner = recolour(inner);
    inner = inner.replace(/\s+/g, " ").trim();
    const transform = fitTransform(viewBox);
    // Every part has its own colour, so the customer's pick does nothing.
    const fixedColour = !inner.includes("currentColor");
    entries.push({ key, filename, inner, transform, fixedColour });
  }

  // Emit the TS file.
  const banner = `/**
 * Auto-generated by scripts/generate-motifs.mjs from design/motifs/.
 * Do not edit by hand — your changes will be overwritten on next build.
 *
 * Source-of-truth filenames live in design/motifs/; the renderer that
 * consumes this file is src/components/personalization/motifs.tsx.
 */

`;

  const recordLines = entries
    .map(
      ({ key, filename, inner, transform, fixedColour }) =>
        `  // ${filename}\n  ${JSON.stringify(key)}: { inner: "${escapeForTsString(inner)}", transform: "${transform}", fixedColour: ${fixedColour} },`,
    )
    .join("\n");

  const keysArray = entries
    .map(({ key }) => `  ${JSON.stringify(key)},`)
    .join("\n");

  const body = `export interface GeneratedMotif {
  /** Pre-baked SVG markup (children of <svg>) with currentColor fills. */
  inner: string;
  /** SVG transform that fits the source viewBox into a 0 0 100 100 box. */
  transform: string;
  /** True when every part has a fixed colour, so no symbol colour applies. */
  fixedColour: boolean;
}

export const GENERATED_MOTIFS: Record<string, GeneratedMotif> = {
${recordLines}
};

export const GENERATED_MOTIF_KEYS: readonly string[] = [
${keysArray}
];
`;

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, banner + body, "utf8");

  console.log(
    `generate-motifs: wrote ${entries.length} motif(s) -> ${OUTPUT_FILE.replace(REPO_ROOT + "/", "")}`,
  );
}

main();
