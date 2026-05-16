/**
 * Higher-level Shopify product fetching helpers.
 *
 * The functions here wrap the raw shopifyFetch + queries layer so route
 * handlers and components don't have to know about GraphQL.
 */

import { shopifyFetch } from "./client";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_SUMMARY_BY_HANDLE_QUERY,
} from "./queries";
import type { Money, Product, ShopifyImage } from "./types";

/**
 * Skinny product summary used by listing surfaces (homepage product
 * grid, future /produkter listing). Don't bolt extra fields onto this
 * — if you need more, query the full product on demand.
 */
export interface ProductSummary {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  images: { nodes: ShopifyImage[] };
  priceRange: { minVariantPrice: Money };
}

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

/**
 * Fetch a curated set of products by handle, returned in the same order
 * as the input array. Missing handles are silently dropped — the caller
 * can compare result length to input length if they need to detect that.
 *
 * Implemented as parallel exact-handle lookups rather than a single
 * `products(query: "handle:foo OR handle:bar")` call: the latter is
 * search-style and returns the full catalogue ranked by relevance
 * (only honouring `first:` for the slice). Per-handle is strict, fast
 * enough for grid sizes, and the round-trips parallelise on the edge.
 */
export async function getProductsByHandles(
  handles: string[],
): Promise<ProductSummary[]> {
  if (handles.length === 0) return [];

  const results = await Promise.all(
    handles.map(async (handle) => {
      const data = await shopifyFetch<{ product: ProductSummary | null }>({
        query: PRODUCT_SUMMARY_BY_HANDLE_QUERY,
        variables: { handle },
      });
      return data.product;
    }),
  );

  return results.filter((p): p is ProductSummary => p !== null);
}
