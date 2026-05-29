/**
 * Per-product display metadata that lives in code (not in Shopify).
 *
 * Shopify owns title, price, description, and images — everything that
 * a Camilla-edit needs to update without a deploy. Anything that's
 * really part of the design vocabulary (the italic tagline that sits
 * above the title, etc.) lives here instead so it can evolve with the
 * site rather than the catalogue.
 *
 * Add new handles as products go live.
 */

export interface ProductMeta {
  /**
   * Small italic line shown above the title on the product detail page.
   * Use sentence case. Keep it short — one short phrase that tells the
   * customer what the product *is*.
   */
  tagline?: string;
}

export const PRODUCT_META: Record<string, ProductMeta> = {
  "dots-5stk": {
    tagline: "Personligt mærke til lynlås",
  },
};

export function getProductMeta(handle: string): ProductMeta {
  return PRODUCT_META[handle] ?? {};
}
