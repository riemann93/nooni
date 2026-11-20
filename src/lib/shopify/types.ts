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

/**
 * One video source as returned by the Storefront API (`Video.sources`).
 * Shopify transcodes uploads into several renditions (mp4 at several
 * heights + an HLS m3u8); we pick the mp4s for a plain <video> tag.
 */
export interface ShopifyVideoSource {
  url: string;
  mimeType: string;
  height: number;
}

/**
 * Product media item: either an image or a video. Both carry an image
 * (for videos it's Shopify's preview frame) so galleries and thumbnails
 * can treat them the same and only branch when rendering the main view.
 */
export interface ProductMediaNode {
  mediaContentType: "IMAGE" | "VIDEO" | "EXTERNAL_VIDEO" | "MODEL_3D";
  image?: ShopifyImage | null;
  previewImage?: ShopifyImage | null;
  sources?: ShopifyVideoSource[];
}

/** Gallery item: an image, optionally with video sources to play. */
export interface GalleryItem extends ShopifyImage {
  videoSources?: ShopifyVideoSource[];
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
  media: { nodes: ProductMediaNode[] };
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: { nodes: ProductVariant[] };
}

/* ── Cart ─────────────────────────────────────────────────────────── */

export interface CartLineMerchandise {
  id: string; // Shopify variant ID
  title: string; // variant title (e.g. "Default Title", "1 række")
  product: {
    handle: string;
    title: string;
    images: { nodes: ShopifyImage[] };
  };
  price: Money;
}

/**
 * Line-item attribute (a.k.a. line item property in Shopify admin).
 * Free-form key/value pairs that ride along with the cart line all the
 * way to the order. Used for personalization (colors, name, motif).
 */
export interface CartLineAttribute {
  key: string;
  value: string;
}

export interface CartLine {
  id: string; // line ID, used for update/remove mutations
  quantity: number;
  merchandise: CartLineMerchandise;
  attributes: CartLineAttribute[];
  cost: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string; // GID — store this in localStorage
  checkoutUrl: string; // where "Til kassen" sends the user
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: { nodes: CartLine[] };
}

/** Errors returned in the `userErrors` array on cart mutations. */
export interface CartUserError {
  field: string[] | null;
  message: string;
  code?: string;
}
