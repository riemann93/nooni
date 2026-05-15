/**
 * CartDrawer — slide-in panel showing the cart contents.
 *
 * Mounted in src/app/layout.tsx as a sibling of <main>. Reads its
 * open/closed state from CartContext so any descendant can toggle it
 * (CartPill, the "+ Add to cart" auto-open behaviour, etc.).
 *
 * Behaviour:
 *   - Backdrop closes on click
 *   - Esc key closes
 *   - Body scroll locked while open
 *   - "Til kassen" redirects to cart.checkoutUrl (Shopify-hosted)
 *
 * z-index: 10 (backdrop) and 11 (drawer). Sits above the Navbar (z:2)
 * and Footer (z:1). HeroArches (z:0) stays behind everything.
 *
 * Empty state: the drawer still renders even with an empty cart so the
 * user can dismiss it; it just shows a "Din kurv er tom" message.
 */

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import type { CartLine } from "@/lib/shopify/types";

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

export default function CartDrawer() {
  const {
    cart,
    loading,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeLine,
  } = useCart();

  // Close on Esc.
  useEffect(() => {
    if (!isDrawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen]);

  const lines = cart?.lines.nodes ?? [];
  const isEmpty = lines.length === 0;

  function handleCheckout() {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-0 z-[10] bg-black/30 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Indkøbskurv"
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 z-[11] flex h-full w-full max-w-[440px] flex-col bg-nooni-bg shadow-xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DrawerHeader onClose={closeDrawer} />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isEmpty ? (
            <EmptyState />
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <CartLineRow
                  key={line.id}
                  line={line}
                  loading={loading}
                  onChangeQuantity={(q) => updateQuantity(line.id, q)}
                  onRemove={() => removeLine(line.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && cart && (
          <DrawerFooter
            subtotal={formatPrice(
              cart.cost.subtotalAmount.amount,
              cart.cost.subtotalAmount.currencyCode,
            )}
            disabled={loading}
            onCheckout={handleCheckout}
          />
        )}
      </aside>
    </>
  );
}

function DrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-nooni-line-soft px-6 py-5">
      <h2 className="font-editorial italic text-2xl text-nooni-headline">
        Din kurv
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Luk kurv"
        className="rounded-full p-2 text-nooni-ink-soft transition-colors hover:bg-nooni-line-soft hover:text-nooni-headline"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="font-editorial italic text-xl text-nooni-headline">
        Din kurv er tom
      </p>
      <p className="text-sm text-nooni-ink-soft">
        Tilføj et produkt for at komme i gang.
      </p>
    </div>
  );
}

interface CartLineRowProps {
  line: CartLine;
  loading: boolean;
  onChangeQuantity: (q: number) => void;
  onRemove: () => void;
}

function CartLineRow({
  line,
  loading,
  onChangeQuantity,
  onRemove,
}: CartLineRowProps) {
  const image = line.merchandise.product.images.nodes[0];
  const productTitle = line.merchandise.product.title;
  // "Default Title" is Shopify's name for single-variant products; hide it.
  const variantTitle =
    line.merchandise.title === "Default Title" ? null : line.merchandise.title;
  const lineTotal = formatPrice(
    line.cost.totalAmount.amount,
    line.cost.totalAmount.currencyCode,
  );

  return (
    <li className="flex gap-4">
      {image && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-nooni-bg-warm">
          <Image
            src={image.url}
            alt={image.altText ?? productTitle}
            width={image.width}
            height={image.height}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-editorial italic text-lg text-nooni-headline">
              {productTitle}
            </p>
            {variantTitle && (
              <p className="text-xs uppercase tracking-[0.18em] text-nooni-sub">
                {variantTitle}
              </p>
            )}
          </div>
          <p className="whitespace-nowrap text-sm font-medium text-nooni-ink">
            {lineTotal}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantityControl
            value={line.quantity}
            disabled={loading}
            onChange={onChangeQuantity}
          />
          <button
            type="button"
            onClick={onRemove}
            disabled={loading}
            className="text-xs text-nooni-ink-soft underline-offset-2 hover:underline disabled:opacity-50"
          >
            Fjern
          </button>
        </div>
      </div>
    </li>
  );
}

interface QuantityControlProps {
  value: number;
  disabled: boolean;
  onChange: (q: number) => void;
}

function QuantityControl({ value, disabled, onChange }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-nooni-line-soft">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= 1}
        aria-label="Færre"
        className="flex h-8 w-8 items-center justify-center text-nooni-ink-soft transition-colors hover:text-nooni-headline disabled:opacity-40"
      >
        −
      </button>
      <span className="w-7 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label="Flere"
        className="flex h-8 w-8 items-center justify-center text-nooni-ink-soft transition-colors hover:text-nooni-headline disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

interface DrawerFooterProps {
  subtotal: string;
  disabled: boolean;
  onCheckout: () => void;
}

function DrawerFooter({ subtotal, disabled, onCheckout }: DrawerFooterProps) {
  return (
    <footer className="border-t border-nooni-line-soft px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.18em] text-nooni-sub">
          Subtotal
        </span>
        <span className="font-display text-xl font-medium text-nooni-ink">
          {subtotal}
        </span>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        disabled={disabled}
        className="w-full rounded-full bg-nooni-headline py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f] disabled:cursor-wait disabled:opacity-60"
      >
        Til kassen
      </button>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-nooni-ink-soft/70">
        Sikker betaling via Shopify
      </p>
    </footer>
  );
}
