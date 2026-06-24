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
  tagline?: string;
  /** Short note shown below the price, e.g. "5 stk. i sættet". */
  quantityNote?: string;
  /** Handle of an optional add-on product shown as a toggle on the product page. */
  addOnHandle?: string;
}

export const PRODUCT_META: Record<string, ProductMeta> = {
  "dots-5stk": { quantityNote: "5 stk. i sættet" },
  "dots-med-navn-3stk": { quantityNote: "3 stk. i sættet" },
  "loops-navn": { quantityNote: "3 stk. i sættet" },
  "tic-tac-take": { addOnHandle: "pose-til-haps" },
};

export function getProductMeta(handle: string): ProductMeta {
  return PRODUCT_META[handle] ?? {};
}
