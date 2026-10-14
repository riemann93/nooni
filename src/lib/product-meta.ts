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
  /**
   * Title shown on product cards, saying what the product is. Stands in
   * for the Shopify title until SEO.md issue 4 is fixed there.
   */
  cardTitle?: string;
  /** Optional badge on the card photo. */
  badge?: "Bestseller" | "Kan personliggøres";
  /** Short note shown below the price, e.g. "5 stk. i sættet". */
  quantityNote?: string;
  /** Handle of an optional add-on product shown as a toggle on the product page. */
  addOnHandle?: string;
}

export const PRODUCT_META: Record<string, ProductMeta> = {
  loops: { cardTitle: "Loops, navnemærke til taske", badge: "Bestseller" },
  emblem: { cardTitle: "Emblem, navnemærke med motiv", badge: "Kan personliggøres" },
  "dots-5stk": {
    quantityNote: "5 stk. i sættet",
    cardTitle: "Dots, symbolmærker til lynlås",
    badge: "Kan personliggøres",
  },
  "dots-med-navn-3stk": {
    quantityNote: "3 stk. i sættet",
    cardTitle: "Dots med navn, navnemærke til lynlås",
    badge: "Kan personliggøres",
  },
  "loops-navn": {
    quantityNote: "3 stk. i sættet",
    cardTitle: "Loops med navn, navnemærke til taske",
    badge: "Bestseller",
  },
  "tic-tac-take": { addOnHandle: "uden-titel-17-jun-_10-36-17" },
};

export function getProductMeta(handle: string): ProductMeta {
  return PRODUCT_META[handle] ?? {};
}

/**
 * Where the "Navnemærker" crumb points. Switch to "/navnemaerker" once
 * the hub page exists.
 */
export const NAMETAG_HUB_PATH = "/produkter";

/** Name-tag family: Loops, Dots and Emblem. The core product. */
const NAMETAG_HANDLES = new Set([
  "loops-navn",
  "loops",
  "emblem",
  "dots-med-navn-3stk",
  "dots-5stk",
]);

export function isNametag(handle: string): boolean {
  return NAMETAG_HANDLES.has(handle);
}
