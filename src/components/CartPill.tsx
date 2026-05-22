/**
 * CartPill — the navbar's cart button, client-side because it reads
 * the cart total from CartContext.
 *
 * Renders "Kurv" before hydration (matches SSR markup) and "Kurv (n)"
 * after the client mounts and reads the live count. The state-only
 * difference is invisible to users at typical paint times.
 *
 * Click handler is wired to a no-op until step 3 (CartDrawer); for now
 * it just exists so the markup matches the final shape.
 */

"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartPill() {
  const { totalQuantity, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-4 py-2 text-xs text-white transition-colors hover:bg-[#9d6f6f]"
      aria-label="Åbn kurv"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
      Kurv{totalQuantity > 0 ? ` (${totalQuantity})` : ""}
    </button>
  );
}
