/**
 * Minimal TypeScript types for the Shopify Storefront API objects we use.
 *
 * Intentionally narrow — only fields we query in queries.ts. When we
 * start querying more fields (variants with options, metafields, etc.)
 * extend these types in lockstep.
 */

export interface Money {
  amount: string; // stringified decimal, e.g. "39.00"
  currencyCode: string; // ISO 4217, e.g. "DKK"
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: { nodes: ShopifyImage[] };
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: { nodes: ProductVariant[] };
}
