/**
 * Cart helpers — wraps the Shopify Cart API mutations + query.
 *
 * All functions return the updated Cart object so callers can
 * unconditionally update their local state with the response.
 *
 * `revalidate: 0` is set on every call — cart is per-user and must
 * never be served from a shared cache.
 *
 * Cart lifecycle:
 *   - First add-to-cart → `createCart()` returns a new cart with an ID
 *   - Subsequent operations use that ID
 *   - Carts auto-expire after 10 days of inactivity. `getCart()` returns
 *     null in that case; the caller resets cartId in localStorage and
 *     starts fresh on the next add.
 */

import { shopifyFetch } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "./queries";
import type { Cart, CartLineAttribute, CartUserError } from "./types";

interface CartMutationResponse {
  cart: Cart | null;
  userErrors: CartUserError[];
}

/** Throws if the mutation returned userErrors; returns the cart otherwise. */
function unwrapCartMutation(payload: CartMutationResponse): Cart {
  if (payload.userErrors.length > 0) {
    const messages = payload.userErrors
      .map((e) => `${e.field?.join(".") ?? "?"}: ${e.message}`)
      .join("; ");
    throw new Error(`Shopify cart error: ${messages}`);
  }
  if (!payload.cart) {
    throw new Error("Shopify cart mutation returned no cart");
  }
  return payload.cart;
}

/** Fetch an existing cart by ID. Returns null if expired/not found. */
export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: CART_QUERY,
    variables: { id: cartId },
    revalidate: 0,
  });
  return data.cart;
}

/**
 * Create a new cart seeded with the first line item.
 *
 * `attributes` is optional and carries line-item properties (the
 * personalization payload — colours, names, motifs). Shopify
 * deduplicates lines by `merchandiseId + attributes`: same product +
 * same config increments quantity; different config creates a new line.
 */
export async function createCart(
  variantId: string,
  quantity = 1,
  attributes?: CartLineAttribute[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: CartMutationResponse }>({
    query: CART_CREATE_MUTATION,
    variables: {
      lines: [{ merchandiseId: variantId, quantity, attributes }],
    },
    revalidate: 0,
  });
  return unwrapCartMutation(data.cartCreate);
}

/** Add a line to an existing cart. See createCart() re: attributes semantics. */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
  attributes?: CartLineAttribute[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResponse }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity, attributes }],
    },
    revalidate: 0,
  });
  return unwrapCartMutation(data.cartLinesAdd);
}

/** Change the quantity of an existing line. */
export async function updateCartLineQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResponse }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    revalidate: 0,
  });
  return unwrapCartMutation(data.cartLinesUpdate);
}

/** Remove one or more lines from the cart. */
export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResponse }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    revalidate: 0,
  });
  return unwrapCartMutation(data.cartLinesRemove);
}
