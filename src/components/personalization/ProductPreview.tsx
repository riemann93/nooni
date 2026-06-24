"use client";

import {
  NOONI_COLORS,
  type ColorOption,
} from "@/lib/shopify/personalization";
import MotifRenderer, { hasMotifRenderer } from "./motifs";

export const PREVIEW_SUPPORTED_HANDLES = new Set<string>([
  "dots-5stk",
  "dots-med-navn-3stk",
  "loops",
]);

export const NEUTRAL_MAIN_HEX = "#EFE6D8";
export const NEUTRAL_SECONDARY_HEX = "#B48383";

export interface ProductPreviewProps {
  handle: string;
  values: Record<string, string>;
  colors?: readonly ColorOption[];
  fullSize?: boolean;
  onSave?: () => void;
}

export default function ProductPreview({
  handle,
  values,
  colors = NOONI_COLORS,
  fullSize = false,
  onSave,
}: ProductPreviewProps) {
  const mainHex = resolveColor(colors, values.main_color, NEUTRAL_MAIN_HEX);
  const secondaryHex = resolveColor(colors, values.secondary_color, NEUTRAL_SECONDARY_HEX);
  const motifKey = values.motif;
  const showMotif = Boolean(motifKey && hasMotifRenderer(motifKey));
  const nameText = values.name?.trim() ?? "";
  const isPill = handle === "dots-med-navn-3stk";
  // Scale font to fill the shape: width budget / chars, capped by height budget.
  // 0.6 ≈ average char-width ratio for Fredoka Bold.
  const nameFontSize = nameText.length === 0 ? 0 : isPill
    ? Math.min(24, Math.round(78 / (nameText.length * 0.58)))
    : Math.min(34, Math.round(90 / (nameText.length * 0.58)));

  const productSvg = (
    <svg
      viewBox="0 0 100 100"
      overflow="visible"
      role="img"
      aria-label="Forhåndsvisning af dit produkt"
      className={fullSize ? "h-[62%] w-[62%]" : "h-[140px] w-[140px]"}
    >
      <defs>
        <filter id="motif-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
        </filter>
        <filter id="shape-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(80,45,30,0.45)" />
        </filter>
      </defs>

      <ProductShape handle={handle} fill={mainHex} filter="url(#shape-shadow)" />

      {showMotif && motifKey && (
        <g transform="translate(9.5 5.5) scale(0.81)" filter="url(#motif-shadow)">
          <MotifRenderer motifKey={motifKey} color={secondaryHex} />
        </g>
      )}
      {nameText && (
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill={secondaryHex}
          fontSize={nameFontSize}
          fontFamily="Fredoka, system-ui, sans-serif"
          fontWeight="bold"
          filter="url(#motif-shadow)"
        >
          {nameText}
        </text>
      )}
    </svg>
  );

  if (fullSize) {
    return (
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-nooni-bg-warm">
        {productSvg}
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            aria-label="Gem forhåndsvisning"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex h-9 items-center gap-1.5 rounded-full bg-white/70 px-4 text-sm text-nooni-ink shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
          >
            <span>Gem</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/20 p-5 shadow-[0_8px_32px_rgba(61,50,40,0.12)] backdrop-blur-md">
      {productSvg}
    </div>
  );
}

export function resolveColor(
  palette: readonly ColorOption[],
  value: string | undefined,
  fallback: string,
): string {
  if (!value) return fallback;
  return palette.find((c) => c.value === value)?.hex ?? fallback;
}

/** Returns the SVG shape element for a given product handle. */
export function ProductShape({
  handle,
  fill,
  filter,
}: {
  handle: string;
  fill: string;
  filter?: string;
}) {
  if (handle === "dots-med-navn-3stk") {
    // Pill with fully-rounded right end (r=18) and lightly-rounded left corners (r=8)
    // Path: M top-left-start → top edge → arc top-right → arc bottom-right → bottom edge → arc bottom-left → left edge → arc top-left → Z
    return (
      <path
        d="M 13,33 L 77,33 A 17,17 0 0,1 94,50 A 17,17 0 0,1 77,67 L 13,67 A 8,8 0 0,1 5,59 L 5,41 A 8,8 0 0,1 13,33 Z"
        fill={fill}
        filter={filter}
      />
    );
  }
  return <circle cx="50" cy="50" r="48" fill={fill} filter={filter} />;
}
