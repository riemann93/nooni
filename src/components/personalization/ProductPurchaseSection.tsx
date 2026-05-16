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
  type PersonalizationSchema,
} from "@/lib/shopify/personalization";

interface ProductPurchaseSectionProps {
  /** Shopify product handle — used to gate the live preview. */
  handle: string;
  variantId: string;
  availableForSale: boolean;
  /** null when the product has no personalization. */
  schema: PersonalizationSchema | null;
}

export default function ProductPurchaseSection({
  handle,
  variantId,
  availableForSale,
  schema,
}: ProductPurchaseSectionProps) {
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

  return (
    <>
      {showPreview && (
        <div className="mt-10 border-t border-nooni-line-soft pt-8">
          <ProductPreview values={values} />
        </div>
      )}

      {schema && (
        <div className={`mt-10 ${showPreview ? "" : "border-t border-nooni-line-soft pt-8"}`}>
          <PersonalizationForm schema={schema} onChange={handleFormChange} />
        </div>
      )}

      <div className="mt-10">
        <AddToCartButton
          variantId={variantId}
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
