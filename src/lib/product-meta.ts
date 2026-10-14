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
  /**
   * The fixed price in DKK, confirmed by the owner. Shown when Shopify
   * can't be reached; Shopify's price wins whenever it loads. Change it
   * here when the price changes in Shopify.
   */
  priceDkk?: number;
  /** True when the product has several prices (variants), so the price reads "Fra 75 kr.". */
  priceFrom?: boolean;
  /**
   * Shopify CDN photo used when Shopify can't be reached, so product
   * rows on the homepage never show up empty. Copied from the product's
   * first image in Shopify; update it if that photo changes.
   */
  fallbackImage?: string;
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
 * Name-tag family, lead product first (CONTENT-PLAN.md keyword map):
 * Dots med navn for lynlås and overtøj, Dots med motiv for children who
 * can't read yet, then Loops for the bag. Handle "emblem" is the product
 * titled "Loops - Navn" (SEO.md issue 4).
 */
export const LEAD_NAME_TAG = "dots-med-navn-3stk";

export const NAME_TAG_HANDLES = [
  "dots-med-navn-3stk",
  "dots-5stk",
  "emblem",
  "loops-navn",
  "loops",
] as const;

export const isNameTag = (handle: string) => (NAME_TAG_HANDLES as readonly string[]).includes(handle);

/** Confirmed facts shared by the whole name-tag family (see the 3D-print post). */
export const NAME_TAG_FACTS: ProductFacts = {};

export const PRODUCT_META: Record<string, ProductMeta> = {
  "dots-med-navn-3stk": {
    tagline: "Navnemærke til lynlås, flyverdragt og overtøj",
    crumbName: "Dots med navn",
    quantityNote: "3 stk. i sættet",
    priceDkk: 70,
    title: "Dots med navn, navnemærke til lynlås",
    badge: "Bestseller",
  },
  "dots-5stk": {
    tagline: "Symbolmærker til børn, der ikke kan læse",
    crumbName: "Dots med motiv",
    quantityNote: "5 stk. i sættet",
    priceDkk: 50,
    title: "Dots med motiv, symbolmærker til lynlås",
    badge: "Kan personliggøres",
  },
  emblem: {
    tagline: "Navnemærke til taske",
    crumbName: "Loops med navn",
    priceDkk: 40,
    fallbackImage: "https://cdn.shopify.com/s/files/1/1039/4196/4106/files/20260623_135033.jpg?v=1782216202",
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
  loops: {
    tagline: "Navnemærke til taske",
    crumbName: "Loops med motiv",
    priceDkk: 50,
    fallbackImage: "https://cdn.shopify.com/s/files/1/1039/4196/4106/files/20260623_135056.jpg?v=1782216204",
    title: "Loops med motiv, navnemærke til taske",
    badge: "Kan personliggøres",
  },
  "deks-single": {
    crumbName: "Deks",
    priceDkk: 80,
    fallbackImage: "https://cdn.shopify.com/s/files/1/1039/4196/4106/files/DSC04375.jpg?v=1779267217",
  },
  "box-kort-aesker": {
    crumbName: "Box",
    priceDkk: 75,
    priceFrom: true,
    fallbackImage: "https://cdn.shopify.com/s/files/1/1039/4196/4106/files/Mellem_tre_farver.jpg?v=1781473120",
  },
  "tic-tac-take": {
    crumbName: "Haps",
    priceDkk: 150,
    fallbackImage: "https://cdn.shopify.com/s/files/1/1039/4196/4106/files/20260623_135329.jpg?v=1782216203",
    addOnHandle: "uden-titel-17-jun-_10-36-17",
  },
};

export function getProductMeta(handle: string): ProductMeta {
  return PRODUCT_META[handle] ?? {};
}

/**
 * The price to show for a product: Shopify's when it loaded, else the
 * fixed price above, formatted "70 kr." ("Fra 75 kr." for products with
 * several prices). Null when neither is known.
 */
export function displayPrice(
  handle: string,
  shopifyPrice?: { amount: string; currencyCode: string } | null,
): string | null {
  const amount = shopifyPrice ? parseFloat(shopifyPrice.amount) : PRODUCT_META[handle]?.priceDkk;
  if (amount === undefined || Number.isNaN(amount)) return null;
  const label = `${new Intl.NumberFormat("da-DK", { maximumFractionDigits: 2 }).format(amount)} kr.`;
  return PRODUCT_META[handle]?.priceFrom ? `Fra ${label}` : label;
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

/** Position in the name-tag family, Dots med navn first. Used to sort the listing. */
export function nametagRank(handle: string): number {
  return (NAME_TAG_HANDLES as readonly string[]).indexOf(handle);
}

export const isNametag = isNameTag;
