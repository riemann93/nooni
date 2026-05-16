/**
 * CartContext — single source of truth for the user's cart on the client.
 *
 * Holds the Cart object fetched from Shopify and exposes mutate helpers
 * (addLine, updateQuantity, removeLine). The cart's GID is persisted in
 * localStorage so the cart survives across page loads.
 *
 * Hydration model:
 *   - On first paint (SSR), cart is `null` and totalQuantity is 0.
 *   - On mount (client), we read the cart ID from localStorage. If it
 *     exists, we fetch the live cart from Shopify and populate state.
 *   - This means the navbar pill renders "Kurv" (no number) on SSR and
 *     "Kurv (n)" after hydration. ~50ms invisible to most users; no
 *     hydration mismatch warning because the SSR markup matches the
 *     pre-hydration client render.
 *
 * Cart expiry: Shopify auto-expires carts after 10 days. If `getCart`
 * returns null on rehydrate, we clear the stored ID and start fresh
 * on the next add-to-cart.
 */

"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addToCart as apiAddToCart,
  createCart as apiCreateCart,
  getCart as apiGetCart,
  removeCartLines as apiRemoveCartLines,
  updateCartLineQuantity as apiUpdateCartLineQuantity,
} from "@/lib/shopify/cart";
import type { Cart, CartLineAttribute } from "@/lib/shopify/types";

const STORAGE_KEY = "nooni.cartId";

interface CartContextValue {
  cart: Cart | null;
  /** True while a mutation is in flight. */
  loading: boolean;
  /** Total line-item quantity across the cart. 0 for empty/uninitialized. */
  totalQuantity: number;
  /** Drawer open state — owned here so any descendant can toggle it. */
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addLine: (
    variantId: string,
    quantity?: number,
    attributes?: CartLineAttribute[],
  ) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Rehydrate cart from localStorage on mount.
  useEffect(() => {
    const cartId =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (!cartId) return;

    let cancelled = false;
    apiGetCart(cartId)
      .then((c) => {
        if (cancelled) return;
        if (c) {
          setCart(c);
        } else {
          // Cart expired or doesn't exist anymore.
          window.localStorage.removeItem(STORAGE_KEY);
        }
      })
      .catch((err) => {
        // Don't crash the app if the cart fetch fails — log and reset.
        console.error("Failed to rehydrate cart:", err);
        window.localStorage.removeItem(STORAGE_KEY);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const persistCart = useCallback((c: Cart) => {
    setCart(c);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, c.id);
    }
  }, []);

  const addLine = useCallback(
    async (
      variantId: string,
      quantity = 1,
      attributes?: CartLineAttribute[],
    ) => {
      setLoading(true);
      try {
        const updated = cart
          ? await apiAddToCart(cart.id, variantId, quantity, attributes)
          : await apiCreateCart(variantId, quantity, attributes);
        persistCart(updated);
        // Auto-open the drawer so users see the new line confirmed.
        setIsDrawerOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cart, persistCart],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await apiUpdateCartLineQuantity(
          cart.id,
          lineId,
          quantity,
        );
        persistCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart, persistCart],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await apiRemoveCartLines(cart.id, [lineId]);
        persistCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart, persistCart],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      totalQuantity: cart?.totalQuantity ?? 0,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addLine,
      updateQuantity,
      removeLine,
    }),
    [
      cart,
      loading,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addLine,
      updateQuantity,
      removeLine,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
