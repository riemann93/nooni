/**
 * AddToCartButton — adds a single variant to the cart via CartContext.
 *
 * Used on /produkter/[handle], typically wrapped by ProductPurchaseSection
 * which feeds the variant ID and the personalization line item attributes
 * built from the personalization form's current state.
 *
 * Errors from the underlying cart mutation are console.error'd but not
 * surfaced in the UI yet — for the soft launch a real error toast is
 * over-engineering. Revisit once there's evidence of cart failures in
 * production traffic.
 */

"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { CartLineAttribute } from "@/lib/shopify/types";

interface AddToCartButtonProps {
  variantId: string;
  availableForSale: boolean;
  /** Line-item properties to attach (personalization payload). */
  attributes?: CartLineAttribute[];
  /**
   * External disabled flag — typically driven by personalization form
   * validity. The cart's own loading state is OR'd in internally.
   */
  disabled?: boolean;
}

export default function AddToCartButton({
  variantId,
  availableForSale,
  attributes,
  disabled,
}: AddToCartButtonProps) {
  const { addLine, loading } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!availableForSale) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center rounded-full bg-nooni-line px-8 py-3 text-sm text-nooni-ink-soft cursor-not-allowed"
      >
        Udsolgt
      </button>
    );
  }

  async function handleClick() {
    try {
      await addLine(variantId, 1, attributes);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }

  const isDisabled = loading || disabled;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-nooni-headline px-8 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Tilføjer…" : justAdded ? "Tilføjet ✓" : "Læg i kurv"}
    </button>
  );
}
