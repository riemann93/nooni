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
  facts?: ProductFacts;
}

/**
 * Product facts shown in the facts block below the buy box. Every field
 * is optional: leave it out until Camilla has confirmed it. Never fill
 * one in from guesswork (SEARCH-GUIDE.md: no claim without a test).
 * Missing facts show as "Camilla udfylder" in previews and are hidden
 * on the live shop.
 */
export interface ProductFacts {
  material?: string;
  size?: string;
  mounting?: string;
  washing?: string;
  age?: string;
}

/** Name-tag family. These link to the /navnemaerker hub. */
export const NAME_TAG_HANDLES = [
  "loops-navn",
  "loops",
  "dots-med-navn-3stk",
  "dots-5stk",
  "emblem",
] as const;

export const isNameTag = (handle: string) => (NAME_TAG_HANDLES as readonly string[]).includes(handle);

/** Confirmed facts shared by the whole name-tag family (see the 3D-print post). */
export const NAME_TAG_FACTS: ProductFacts = {};

export const PRODUCT_META: Record<string, ProductMeta> = {
  loops: { cardTitle: "Loops, navnemærke til taske", badge: "Bestseller" },
  emblem: { cardTitle: "Loops med navn, navnemærke til taske", badge: "Kan personliggøres" },
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

/** Where the "Navnemærker" crumb and hub links point. */
export const NAMETAG_HUB_PATH = "/navnemaerker";

/** Name-tag family: Loops, Dots and Emblem. The core product. */
const NAMETAG_HANDLES = new Set([
  "loops-navn",
  "loops",
  "emblem",
  "dots-med-navn-3stk",
  "dots-5stk",
]);

/** Position in the name-tag family, Loops first. Used to sort the listing. */
export function nametagRank(handle: string): number {
  return [...NAMETAG_HANDLES].indexOf(handle);
}

export function isNametag(handle: string): boolean {
  return NAMETAG_HANDLES.has(handle);
}
