/**
 * ProductPreview — live visualisation of a configured Dot.
 *
 * Renders a single large Dot (circle) in the chosen main colour, with
 * the chosen motif drawn on top in the secondary colour. Updates in
 * real time as the user fills in the personalization form.
 *
 * Currently scoped to Dots-with-motif (handle `dots-5stk`). The
 * SUPPORTED_HANDLES allowlist is the place to extend later when
 * other products get their own preview shapes (Emblem will reuse the
 * same shape with a different proportion; Loops will be elongated).
 *
 * Defaults: when a field hasn't been chosen yet, the dot renders in a
 * pale "neutral" colour and the motif slot is empty — so the preview
 * is always visible and visibly responds the moment the customer
 * picks anything.
 */

"use client";

import {
  NOONI_COLORS,
  type ColorOption,
} from "@/lib/shopify/personalization";
import MotifRenderer, { hasMotifRenderer } from "./motifs";

export const PREVIEW_SUPPORTED_HANDLES = new Set<string>(["dots-5stk"]);

/** Pale fallback used until the customer picks the main colour. */
const NEUTRAL_MAIN_HEX = "#EFE6D8"; // matches --color-nooni-line-soft
/** Soft fallback used until the customer picks the secondary colour. */
const NEUTRAL_SECONDARY_HEX = "#B48383"; // matches --color-nooni-headline

interface ProductPreviewProps {
  values: Record<string, string>;
  /**
   * Active palette — the colour options actually rendered in the form.
   * Defaults to NOONI_COLORS. When colours come from Shopify the form
   * stores the metaobject handle as the value, so the preview must
   * resolve hex against the same palette, not the hardcoded one.
   */
  colors?: readonly ColorOption[];
}

export default function ProductPreview({
  values,
  colors = NOONI_COLORS,
}: ProductPreviewProps) {
  const mainHex = resolveColor(colors, values.main_color, NEUTRAL_MAIN_HEX);
  const secondaryHex = resolveColor(
    colors,
    values.secondary_color,
    NEUTRAL_SECONDARY_HEX,
  );

  const motifKey = values.motif;
  const showMotif = Boolean(motifKey && hasMotifRenderer(motifKey));

  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-nooni-sub">
        Forhåndsvisning
      </p>

      {/* Glass card — roughly ¼ of the product image area */}
      <div className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/20 p-5 shadow-[0_8px_32px_rgba(61,50,40,0.12)] backdrop-blur-md">
        <svg
          viewBox="0 0 100 100"
          className="h-[140px] w-[140px]"
          role="img"
          aria-label="Forhåndsvisning af din konfigurerede Dot"
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
      </div>
    </div>
  );
}

/** Look up a palette swatch by its value, falling back to a neutral hex. */
function resolveColor(
  palette: readonly ColorOption[],
  value: string | undefined,
  fallback: string,
): string {
  if (!value) return fallback;
  return palette.find((c) => c.value === value)?.hex ?? fallback;
}
