/**
 * Higher-level Shopify product fetching helpers.
 *
 * The functions here wrap the raw shopifyFetch + queries layer so route
 * handlers and components don't have to know about GraphQL.
 */

import { shopifyFetch } from "./client";
import {
  PRODUCTS_BY_HANDLES_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
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
 * Shopify's `query` arg uses the search-string format `handle:foo OR
 * handle:bar OR …` and returns results in relevance order, not the
 * order we asked for. We re-sort client-side so the homepage card grid
 * is deterministic.
 */
export async function getProductsByHandles(
  handles: string[],
): Promise<ProductSummary[]> {
  if (handles.length === 0) return [];

  const query = handles.map((h) => `handle:${h}`).join(" OR ");

  const data = await shopifyFetch<{
    products: { nodes: ProductSummary[] };
  }>({
    query: PRODUCTS_BY_HANDLES_QUERY,
    variables: { first: handles.length, query },
  });

  // Re-sort to match the input order.
  const byHandle = new Map(data.products.nodes.map((p) => [p.handle, p]));
  return handles
    .map((h) => byHandle.get(h))
    .filter((p): p is ProductSummary => p !== undefined);
}
