/**
 * Shopify Storefront API client.
 *
 * Thin typed wrapper around fetch() that talks to the Storefront GraphQL
 * endpoint. The access token is a "public" token (designed to ship in
 * client bundles), but we still read it from env vars so it can be
 * rotated without a code change.
 *
 * Caching: by default responses are cached on Vercel's edge for 60s
 * (Next.js fetch cache via `next.revalidate`). Cart mutations should
 * pass `revalidate: 0` to skip the cache entirely.
 */

const API_VERSION = "2025-01";

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /**
   * Seconds to cache the response. Default 60.
   * Pass 0 for mutations or anything that must be live (cart, customer).
   */
  revalidate?: number;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; locations?: unknown; path?: unknown }>;
}

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 60,
}: ShopifyFetchOptions): Promise<T> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !token) {
    throw new Error(
      "Shopify env vars missing. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN. See .env.example for the " +
        "expected shape; values come from Shopify Admin → Apps → your " +
        "headless storefront → API credentials.",
    );
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: revalidate > 0 ? { revalidate } : undefined,
    cache: revalidate === 0 ? "no-store" : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Shopify HTTP ${response.status} ${response.statusText}: ${text.slice(0, 300)}`,
    );
  }

  const body = (await response.json()) as ShopifyGraphQLResponse<T>;

  if (body.errors?.length) {
    const messages = body.errors.map((e) => e.message).join("; ");
    throw new Error(`Shopify GraphQL error: ${messages}`);
  }

  if (!body.data) {
    throw new Error("Shopify response missing `data` field");
  }

  return body.data;
}
