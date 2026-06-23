"use client";

import {
  NOONI_COLORS,
  type ColorOption,
} from "@/lib/shopify/personalization";
import MotifRenderer, { hasMotifRenderer } from "./motifs";

export const PREVIEW_SUPPORTED_HANDLES = new Set<string>(["dots-5stk"]);

const NEUTRAL_MAIN_HEX = "#EFE6D8";
const NEUTRAL_SECONDARY_HEX = "#B48383";

interface ProductPreviewProps {
  values: Record<string, string>;
  colors?: readonly ColorOption[];
  /** When true, fills the full gallery-sized container instead of a small glass card. */
  fullSize?: boolean;
}

export default function ProductPreview({
  values,
  colors = NOONI_COLORS,
  fullSize = false,
}: ProductPreviewProps) {
  const mainHex = resolveColor(colors, values.main_color, NEUTRAL_MAIN_HEX);
  const secondaryHex = resolveColor(colors, values.secondary_color, NEUTRAL_SECONDARY_HEX);
  const motifKey = values.motif;
  const showMotif = Boolean(motifKey && hasMotifRenderer(motifKey));

  const dotSvg = (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Forhåndsvisning af din konfigurerede Dot"
      className={fullSize ? "h-[62%] w-[62%]" : "h-[140px] w-[140px]"}
    >
      <defs>
        <filter id="motif-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="48" fill={mainHex} />
      {showMotif && motifKey && (
        <g transform="translate(5 5) scale(0.9)" filter="url(#motif-shadow)">
          <MotifRenderer motifKey={motifKey} color={secondaryHex} />
        </g>
      )}
    </svg>
  );

  if (fullSize) {
    return (
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-nooni-bg-warm">
        {dotSvg}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/20 p-5 shadow-[0_8px_32px_rgba(61,50,40,0.12)] backdrop-blur-md">
      {dotSvg}
    </div>
  );
}

function resolveColor(
  palette: readonly ColorOption[],
  value: string | undefined,
  fallback: string,
): string {
  if (!value) return fallback;
  return palette.find((c) => c.value === value)?.hex ?? fallback;
}
