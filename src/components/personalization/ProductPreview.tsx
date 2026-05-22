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

/** Handles that should render a preview. Extend as more product types get one. */
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

      <div className="flex aspect-square w-full max-w-[280px] items-center justify-center rounded-3xl bg-nooni-bg-warm p-8">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label="Forhåndsvisning af din konfigurerede Dot"
        >
          <circle cx="50" cy="50" r="48" fill={mainHex} />
          {showMotif && motifKey && (
            <MotifRenderer motifKey={motifKey} color={secondaryHex} />
          )}
        </svg>
      </div>

      <p className="mt-3 text-xs text-nooni-ink-soft/70">
        Sådan kommer din Dot til at se ud.
      </p>
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
