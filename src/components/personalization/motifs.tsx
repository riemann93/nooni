/**
 * Motif renderer — single React component that draws any motif from the
 * auto-generated catalogue.
 *
 * The motif geometry lives in motifs.generated.ts (regenerated on every
 * build by scripts/generate-motifs.mjs from design/motifs/*.svg). Source
 * SVGs are pre-processed: viewBox normalised to fit a 0..100 box via a
 * pre-computed transform, every fill/stroke colour rewritten to
 * `currentColor`. So we just inject the inner markup and drive the
 * colour via CSS `color`.
 *
 * dangerouslySetInnerHTML is the right tool here despite the name —
 * we control the input (our own generator, our own design folder), and
 * browsers render inline SVG markup correctly when used this way.
 */

import {
  GENERATED_MOTIFS,
  GENERATED_MOTIF_KEYS,
} from "./motifs.generated";

interface MotifRendererProps {
  /** Motif key (e.g. "lemon", "cherry"). Must exist in motifs.generated. */
  motifKey: string;
  /** CSS colour. Applied to every `currentColor` in the motif markup. */
  color: string;
}

/**
 * Renders a single motif as an SVG <g>. Designed to sit inside the
 * 0 0 100 100 viewBox of <ProductPreview />'s outer <svg>.
 */
export default function MotifRenderer({ motifKey, color }: MotifRendererProps) {
  const motif = GENERATED_MOTIFS[motifKey];
  if (!motif) return null;
  return (
    <g
      style={{ color }}
      transform={motif.transform}
      dangerouslySetInnerHTML={{ __html: motif.inner }}
    />
  );
}

/** Returns true if a renderer exists for this motif value. */
export function hasMotifRenderer(motifKey: string): boolean {
  return motifKey in GENERATED_MOTIFS;
}

/** All motif keys currently available, sorted alphabetically by the generator. */
export const ALL_MOTIF_KEYS = GENERATED_MOTIF_KEYS;
