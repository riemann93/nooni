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
  /** Italic line above the product title. Names the keyword-map search the page targets (CONTENT-PLAN.md). */
  tagline?: string;
  /** Short name for the last breadcrumb, e.g. "Dots med navn". Falls back to the Shopify title. */
  crumbName?: string;
  /**
   * Title that says what the product is ("Dots, navnemærke til lynlås").
   * Used for the H1, <title>, schema name, cards and listings. Stands in
   * for the Shopify title until SEO.md issue 4 is fixed there.
   */
  title?: string;
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

/**
 * Name-tag family, lead product first: Loops lead, Dots come second
 * (the owner's call, ahead of the CONTENT-PLAN.md keyword map order).
 * Handle "emblem" is the product titled "Loops - Navn" (SEO.md issue 4).
 */
export const LEAD_NAME_TAG = "loops";

export const NAME_TAG_HANDLES = [
  "loops",
  "emblem",
  "loops-navn",
  "dots-med-navn-3stk",
  "dots-5stk",
] as const;

export const isNameTag = (handle: string) => (NAME_TAG_HANDLES as readonly string[]).includes(handle);

/** Confirmed facts shared by the whole name-tag family (see the 3D-print post). */
export const NAME_TAG_FACTS: ProductFacts = {};

export const PRODUCT_META: Record<string, ProductMeta> = {
  loops: {
    tagline: "Navnemærke til taske",
    crumbName: "Loops med motiv",
    title: "Loops med motiv, navnemærke til taske",
    badge: "Bestseller",
  },
  emblem: {
    tagline: "Navnemærke til taske",
    crumbName: "Loops med navn",
    title: "Loops med navn, navnemærke til taske",
    badge: "Kan personliggøres",
  },
  "loops-navn": {
    tagline: "Navnemærke til taske",
    crumbName: "Loops med navn",
    quantityNote: "3 stk. i sættet",
    title: "Loops med navn, navnemærke til taske",
    badge: "Kan personliggøres",
  },
  "dots-med-navn-3stk": {
    tagline: "Navnemærke til lynlås, flyverdragt og overtøj",
    crumbName: "Dots med navn",
    quantityNote: "3 stk. i sættet",
    title: "Dots med navn, navnemærke til lynlås",
    badge: "Kan personliggøres",
  },
  "dots-5stk": {
    tagline: "Symbolmærker til børn, der ikke kan læse",
    crumbName: "Dots med motiv",
    quantityNote: "5 stk. i sættet",
    title: "Dots med motiv, symbolmærker til lynlås",
    badge: "Kan personliggøres",
  },
  "tic-tac-take": { addOnHandle: "uden-titel-17-jun-_10-36-17" },
};

export function getProductMeta(handle: string): ProductMeta {
  return PRODUCT_META[handle] ?? {};
}

/** The title to show for a product: ours from PRODUCT_META, else Shopify's. */
export function productTitle(handle: string, shopifyTitle: string): string {
  return PRODUCT_META[handle]?.title ?? shopifyTitle;
}

/**
 * Splits "Dots, navnemærke til lynlås" (or Shopify's "Loops - Navn")
 * into the short name and the rest. `rest` is null when there is none.
 */
export function splitTitle(title: string): { name: string; rest: string | null; sep: string } {
  for (const sep of [" - ", ", "]) {
    const idx = title.indexOf(sep);
    if (idx !== -1) return { name: title.slice(0, idx), rest: title.slice(idx + sep.length), sep };
  }
  return { name: title, rest: null, sep: "" };
}

/** Where the "Navnemærker" crumb and hub links point: the hub that targets the head term. */
export const NAMETAG_HUB_PATH = "/navnemaerker";

/** Position in the name-tag family, Loops first. Used to sort the listing. */
export function nametagRank(handle: string): number {
  return (NAME_TAG_HANDLES as readonly string[]).indexOf(handle);
}

export const isNametag = isNameTag;
