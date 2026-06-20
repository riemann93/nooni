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
import AddToCartButton from "@/components/AddToCartButton";
import PersonalizationForm from "@/components/personalization/PersonalizationForm";
import ProductPreview, {
  PREVIEW_SUPPORTED_HANDLES,
} from "@/components/personalization/ProductPreview";
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
  /** Shopify product handle — used to gate the live preview. */
  handle: string;
  variants: ProductVariant[];
  /** null when the product has no personalization. */
  schema: PersonalizationSchema | null;
}

export default function ProductPurchaseSection({
  handle,
  variants,
  schema,
}: ProductPurchaseSectionProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? "",
  );
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const availableForSale = selectedVariant?.availableForSale ?? false;

  const [values, setValues] = useState<Record<string, string>>({});
  // Default valid=true when there's no schema; default false otherwise
  // so the button starts disabled until required fields are filled.
  const [isValid, setIsValid] = useState<boolean>(!schema);

  const handleFormChange = useCallback(
    (next: Record<string, string>, nextValid: boolean) => {
      setValues(next);
      setIsValid(nextValid);
    },
    [],
  );

  const attributes = useMemo(
    () => (schema ? toLineItemAttributes(schema, values) : undefined),
    [schema, values],
  );

  const showPreview = schema !== null && PREVIEW_SUPPORTED_HANDLES.has(handle);
  const palette = paletteFromSchema(schema);

  return (
    <>
      {variants.length > 1 && (
        <div className="mt-10 border-t border-nooni-line-soft pt-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-nooni-ink">
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
                <span className="block text-[0.6rem] opacity-70">{formatPrice(v.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showPreview && (
        <div className="mt-10 border-t border-nooni-line-soft pt-8">
          <ProductPreview values={values} colors={palette} />
        </div>
      )}

      {schema && (
        <div className={`mt-10 ${showPreview ? "" : "border-t border-nooni-line-soft pt-8"}`}>
          <PersonalizationForm schema={schema} onChange={handleFormChange} />
        </div>
      )}

      <div className="mt-10">
        <AddToCartButton
          variantId={selectedVariant?.id ?? ""}
          availableForSale={availableForSale}
          attributes={attributes}
          disabled={!isValid}
        />
        {schema && !isValid && (
          <p className="mt-3 text-xs text-nooni-ink-soft/70">
            Udfyld dine valg for at lægge i kurv.
          </p>
        )}
      </div>
    </>
  );
}
