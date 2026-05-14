/**
 * Higher-level Shopify product fetching helpers.
 *
 * The functions here wrap the raw shopifyFetch + queries layer so route
 * handlers and components don't have to know about GraphQL.
 */

import { shopifyFetch } from "./client";
import { PRODUCT_BY_HANDLE_QUERY } from "./queries";
import type { Product } from "./types";

/**
 * Fetch a single product by its Shopify handle (the URL slug).
 *
 * Returns null if the product doesn't exist or isn't published to the
 * Storefront API sales channel — both look the same from the API's
 * perspective.
 */
export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data.product;
}
