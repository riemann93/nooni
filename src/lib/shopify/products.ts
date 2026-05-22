/**
 * Higher-level Shopify product fetching helpers.
 *
 * The functions here wrap the raw shopifyFetch + queries layer so route
 * handlers and components don't have to know about GraphQL.
 */

import { shopifyFetch } from "./client";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_COLORS_QUERY,
  PRODUCT_SUMMARY_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";
import type { ColorOption } from "./personalization";
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

/**
 * Fetch every published product, in whatever order Shopify returns
 * them by default. Used by the /produkter listing page. No
 * pagination yet — the catalogue is small enough that one round-trip
 * is fine; revisit when we cross the first-page limit.
 */
export async function getAllProducts(
  limit: number = 100,
): Promise<ProductSummary[]> {
  const data = await shopifyFetch<{ products: { nodes: ProductSummary[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first: limit },
  });
  return data.products.nodes;
}

/* ── Product colours (Shopify taxonomy metafield) ─────────────────── */

interface MetaobjectFieldNode {
  key: string;
  value: string | null;
  type: string;
  reference: { image?: { url: string; altText: string | null } } | null;
  references: {
    nodes: Array<{ image?: { url: string; altText: string | null } }>;
  } | null;
}

interface ColorMetaobjectNode {
  id: string;
  handle: string;
  fields: MetaobjectFieldNode[];
}

const HEX_RE = /#[0-9a-fA-F]{6}/;

/** Pull the first hex string out of a field value (handles list.color JSON). */
function extractHex(value: string | null): string | undefined {
  if (!value) return undefined;
  const match = value.match(HEX_RE);
  return match ? match[0] : undefined;
}

/** Find the spool image URL among a metaobject's fields, if any. */
function extractImageUrl(fields: MetaobjectFieldNode[]): string | undefined {
  for (const f of fields) {
    if (f.reference?.image?.url) return f.reference.image.url;
    const listImg = f.references?.nodes.find((n) => n.image?.url);
    if (listImg?.image?.url) return listImg.image.url;
  }
  return undefined;
}

/** "warm-rosa" -> "Warm rosa". Last-resort colour name. */
function prettifyHandle(handle: string): string {
  return handle.replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase());
}

/**
 * Resolve a product's colour palette from its Shopify "Color" taxonomy
 * metafield, with spool photos when present.
 *
 * Deliberately defensive: any failure (missing env, GraphQL error, no
 * metafield, unexpected field shape) resolves to an empty array rather
 * than throwing. The caller treats `[]` as "fall back to the hardcoded
 * palette", so a bad Shopify response never breaks the product page.
 *
 * Field handles aren't assumed — we scan each metaobject's fields:
 *   - the field with a media reference  -> spool photo (imageUrl)
 *   - a `color`-typed / hex-looking value -> swatch hex
 *   - a single-line text value (or the handle) -> the colour name
 */
export async function getProductColors(handle: string): Promise<ColorOption[]> {
  try {
    const data = await shopifyFetch<{
      product: {
        metafield: { references: { nodes: ColorMetaobjectNode[] } } | null;
      } | null;
    }>({
      query: PRODUCT_COLORS_QUERY,
      variables: { handle },
    });

    const nodes = data.product?.metafield?.references?.nodes ?? [];

    const colors: ColorOption[] = [];
    for (const node of nodes) {
      if (!node?.fields) continue;

      const imageUrl = extractImageUrl(node.fields);

      let hex: string | undefined;
      let label: string | undefined;
      for (const f of node.fields) {
        if (!hex && (f.type === "color" || extractHex(f.value))) {
          hex = extractHex(f.value);
        }
        if (
          !label &&
          (f.key === "label" || f.type === "single_line_text_field") &&
          f.value
        ) {
          label = f.value;
        }
      }

      colors.push({
        value: node.handle,
        label: label ?? prettifyHandle(node.handle),
        hex: hex ?? "#E2D6C8", // neutral line tone if no hex present
        imageUrl,
      });
    }

    return colors;
  } catch (err) {
    console.error("[colors] getProductColors failed for", handle, err);
    return [];
  }
}
