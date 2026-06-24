/**
 * ProductPurchaseSection — wraps the personalization form, the live
 * preview (when supported for this handle), and the add-to-cart button
 * so they can share state.
 *
 * The form's values live here. They're:
 *   - rendered into a live SVG preview above the form (handle-scoped
 *     via PREVIEW_SUPPORTED_HANDLES — currently `dots-5stk` only)
 *   - converted to Shopify line item attributes via toLineItemAttributes
 *     and handed to AddToCartButton
 *
 * If the product has no schema, the form/preview don't render and the
 * button works in its bare form (no attributes attached).
 *
 * The button is disabled until every required field has a value.
 */

"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import PersonalizationForm from "@/components/personalization/PersonalizationForm";
import {
  toLineItemAttributes,
  type ColorOption,
  type FieldDef,
  type PersonalizationSchema,
} from "@/lib/shopify/personalization";
import type { Money, ProductVariant } from "@/lib/shopify/types";

function formatPrice(money: Money): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}

/** Pull the colour palette out of a schema (first colour field's options). */
function paletteFromSchema(
  schema: PersonalizationSchema | null,
): readonly ColorOption[] | undefined {
  if (!schema) return undefined;
  function find(fields: readonly FieldDef[]): readonly ColorOption[] | undefined {
    for (const f of fields) {
      if (f.type === "color" && f.options) return f.options;
      if (f.type === "choice") {
        for (const o of f.options) {
          const hit = find(o.fields);
          if (hit) return hit;
        }
      }
    }
    return undefined;
  }
  return find(schema.fields);
}

interface ProductPurchaseSectionProps {
  handle: string;
  variants: ProductVariant[];
  schema: PersonalizationSchema | null;
  onValuesChange?: (values: Record<string, string>) => void;
  addOnVariants?: { id: string; title: string; price: Money }[];
  addOnMinPrice?: Money;
}

export default function ProductPurchaseSection({
  handle,
  variants,
  schema,
  onValuesChange,
  addOnVariants,
  addOnMinPrice,
}: ProductPurchaseSectionProps) {
  const { addLines, loading } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? "",
  );
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const availableForSale = selectedVariant?.availableForSale ?? false;

  const [values, setValues] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(!schema);
  const [addOnSelected, setAddOnSelected] = useState(false);
  // Default to the first variant that has a real price; fall back to index 0
  const firstPricedVariant = addOnVariants?.find(
    (v) => parseFloat(v.price.amount) > 0,
  ) ?? addOnVariants?.[0];
  const [addOnVariantId, setAddOnVariantId] = useState<string>(
    firstPricedVariant?.id ?? "",
  );
  const addOnVariant = addOnVariants?.find((v) => v.id === addOnVariantId) ?? firstPricedVariant;

  // Use priceRange fallback if variant price comes back as 0 from Shopify
  const effectiveAddOnPrice: Money | undefined = (() => {
    if (!addOnVariant) return addOnMinPrice;
    const variantAmt = parseFloat(addOnVariant.price.amount);
    if (variantAmt > 0) return addOnVariant.price;
    return addOnMinPrice ?? addOnVariant.price;
  })();

  // Combined total: selected main variant + add-on when toggled on
  const totalPrice: Money | undefined = (() => {
    if (!selectedVariant || !addOnSelected || !effectiveAddOnPrice) return undefined;
    const mainAmt = parseFloat(selectedVariant.price.amount);
    const addOnAmt = parseFloat(effectiveAddOnPrice.amount);
    return {
      amount: (mainAmt + addOnAmt).toFixed(2),
      currencyCode: selectedVariant.price.currencyCode,
    };
  })();

  const handleFormChange = useCallback(
    (next: Record<string, string>, nextValid: boolean) => {
      setValues(next);
      setIsValid(nextValid);
      onValuesChange?.(next);
    },
    [onValuesChange],
  );

  const attributes = useMemo(
    () => (schema ? toLineItemAttributes(schema, values) : undefined),
    [schema, values],
  );

  const palette = paletteFromSchema(schema);

  return (
    <>
      {variants.length > 1 && (
        <div className="mt-5 border-t border-nooni-line-soft pt-5">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-nooni-ink">
            Størrelse
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                disabled={!v.availableForSale}
                className={[
                  "rounded-full border px-5 py-2 text-sm transition-colors",
                  v.id === selectedVariantId
                    ? "border-nooni-ink bg-nooni-ink text-white"
                    : "border-nooni-line-soft bg-transparent text-nooni-ink hover:border-nooni-ink",
                  !v.availableForSale ? "cursor-not-allowed opacity-40" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{v.title}</span>
                <span className="block text-xs opacity-70">{formatPrice(v.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {schema && (
        <div className="mt-5 border-t border-nooni-line-soft pt-5">
          <PersonalizationForm schema={schema} onChange={handleFormChange} />
        </div>
      )}

      {addOnVariants && addOnVariants.length > 0 && (
        <div className="mt-5 border-t border-nooni-line-soft pt-5">
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-nooni-ink">Tilføj pose</p>
              <p className="text-xs text-nooni-ink-soft">{effectiveAddOnPrice ? `+${formatPrice(effectiveAddOnPrice)}` : ""}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={addOnSelected}
              onClick={() => setAddOnSelected((v) => !v)}
              className={`relative h-6 w-11 flex-none overflow-hidden rounded-full transition-colors ${
                addOnSelected ? "bg-nooni-headline" : "bg-nooni-line"
              }`}
            >
              <span
                className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                  addOnSelected ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </label>
          {addOnSelected && addOnVariants.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {addOnVariants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setAddOnVariantId(v.id)}
                  className={[
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    v.id === addOnVariantId
                      ? "border-nooni-ink bg-nooni-ink text-white"
                      : "border-nooni-line-soft text-nooni-ink hover:border-nooni-ink",
                  ].join(" ")}
                >
                  {v.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-5">
        {availableForSale ? (
          <button
            type="button"
            disabled={loading || !isValid}
            onClick={async () => {
              try {
                const lines = [
                  { variantId: selectedVariant?.id ?? "", quantity: 1, attributes },
                  ...(addOnSelected && addOnVariant
                    ? [{ variantId: addOnVariant.id, quantity: 1 }]
                    : []),
                ];
                await addLines(lines);
                setJustAdded(true);
                window.setTimeout(() => setJustAdded(false), 1600);
              } catch (err) {
                console.error("Add to cart failed:", err);
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-nooni-headline px-8 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Tilføjer…" : justAdded ? "Tilføjet ✓" : totalPrice ? `Læg i kurv – ${formatPrice(totalPrice)}` : "Læg i kurv"}
          </button>
        ) : (
          <button type="button" disabled className="inline-flex items-center justify-center rounded-full bg-nooni-line px-8 py-3 text-sm text-nooni-ink-soft cursor-not-allowed">
            Udsolgt
          </button>
        )}
        {schema && !isValid && (
          <p className="mt-3 text-xs text-nooni-ink-soft/70">
            Udfyld dine valg for at lægge i kurv.
          </p>
        )}
      </div>
    </>
  );
}
