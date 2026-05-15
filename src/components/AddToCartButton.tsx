/**
 * AddToCartButton — adds a single variant to the cart via CartContext.
 *
 * Used on /produkter/[handle]. Client component because it reads from
 * CartContext and manages a small "just added" feedback state.
 *
 * For now this assumes the caller has already picked a variant
 * (typically the default variant since the test product has only one).
 * When products with multiple variants land (Decks 1-row vs 2-row),
 * a <VariantSelector /> will pick the variantId and pass it in.
 *
 * Errors are logged to console but not surfaced in the UI yet — for
 * the soft launch a real error toast is over-engineering. Add one
 * once we have evidence of cart failures in production.
 */

"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
  variantId: string;
  availableForSale: boolean;
}

export default function AddToCartButton({
  variantId,
  availableForSale,
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
      await addLine(variantId);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-nooni-headline px-8 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f] disabled:opacity-60 disabled:cursor-wait"
    >
      {loading ? "Tilføjer…" : justAdded ? "Tilføjet ✓" : "Læg i kurv"}
    </button>
  );
}
