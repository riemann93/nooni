/**
 * PLACEHOLDER SOCIAL PROOF. EVERYTHING IN THIS FILE IS MADE UP.
 *
 * The rating, review count, family count and every review below are
 * invented so the design can be built and judged with realistic
 * content. None of it comes from real customers.
 *
 * Before production, replace it with real reviews (e.g. from a review
 * app or Shopify) or remove it. Rules until then:
 *
 * - Never feed any of this into JSON-LD. No Review or AggregateRating
 *   schema from placeholder data: Google penalises fake review markup.
 * - Never ship it to nooni.dk. Showing invented reviews to real
 *   customers is misleading marketing under markedsføringsloven.
 *
 * Components that render social proof should check
 * PLACEHOLDER_SOCIAL_PROOF so the whole lot can be switched off in one
 * place.
 */

export const PLACEHOLDER_SOCIAL_PROOF = true;

export interface Rating {
  /** Average stars, 1 to 5, one decimal. */
  rating: number;
  /** Number of reviews behind the average. */
  count: number;
}

export interface ParentReview {
  /** Parent's first name. */
  name: string;
  town: string;
  /** Shopify handle of the product the review is about. */
  handle: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
}

/** Overall shop rating across all products. */
export const OVERALL_RATING: Rating = { rating: 4.9, count: 312 };

/** Shown as "{FAMILY_COUNT} familier bruger Nooni". */
export const FAMILY_COUNT = 1200;

/** Per-product rating and count, keyed by Shopify handle. */
export const PRODUCT_RATINGS: Record<string, Rating> = {
  "loops-navn": { rating: 4.9, count: 148 },
  loops: { rating: 4.8, count: 41 },
  emblem: { rating: 4.9, count: 37 },
  "dots-med-navn-3stk": { rating: 4.8, count: 52 },
  "dots-5stk": { rating: 4.7, count: 34 },
};

export const REVIEWS: ParentReview[] = [
  {
    name: "Sofie",
    town: "Aarhus",
    handle: "loops-navn",
    stars: 5,
    text: "Endelig navnemærker der bliver siddende. Loops har været på madkassen og drikkedunken i vuggestuen hele foråret og ser stadig ud som nye.",
  },
  {
    name: "Mads",
    town: "Odense",
    handle: "loops-navn",
    stars: 5,
    text: "Pædagogerne i børnehaven sagde selv, at det var de nemmeste navnemærker at læse. Ingen forbyttede flyverdragter siden.",
  },
  {
    name: "Camilla",
    town: "Frederiksberg",
    handle: "emblem",
    stars: 5,
    text: "Emblem sidder på hjemmeskoene og regntøjet. Vores datter peger stolt på sit navn hver morgen i garderoben.",
  },
  {
    name: "Jonas",
    town: "Aalborg",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Dots med navn er perfekte til sutteflasker og små ting i vuggestuen. De kan tåle opvaskeren, og det var det vigtigste for os.",
  },
  {
    name: "Line",
    town: "Roskilde",
    handle: "loops-navn",
    stars: 5,
    text: "Vi har prøvet strygemærker og klistermærker. Loops er de første navnemærker, vi ikke skal sætte på igen efter et par uger.",
  },
  {
    name: "Henrik",
    town: "Vejle",
    handle: "loops",
    stars: 4,
    text: "Fine farver og god kvalitet. Det tog lidt tid at vælge mellem farverne, men nu har begge drenge deres egne Loops i børnehaven.",
  },
  {
    name: "Maja",
    town: "Esbjerg",
    handle: "emblem",
    stars: 5,
    text: "Smukke navnemærker, der ikke ligner alle de andres. Garderoben i vuggestuen er fuld af ens ting, men vores er nemme at finde.",
  },
  {
    name: "Rasmus",
    town: "Silkeborg",
    handle: "dots-5stk",
    stars: 5,
    text: "Dots på madkasse, låg og drikkedunk. Hurtig levering, og man kan mærke, at de er lavet med omhu.",
  },
  {
    name: "Ida",
    town: "Helsingør",
    handle: "loops-navn",
    stars: 5,
    text: "Købt til opstart i vuggestue. Navnet står tydeligt, og Loops har overlevet både sandkasse og opvaskemaskine.",
  },
  {
    name: "Anders",
    town: "Horsens",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Vi skulle mærke alt til børnehaven på én weekend. Navnemærkerne kom hurtigt, og de sad fast med det samme.",
  },
];

export function getProductRating(handle: string): Rating | null {
  return PRODUCT_RATINGS[handle] ?? null;
}

export function getReviewsFor(handle: string): ParentReview[] {
  return REVIEWS.filter((r) => r.handle === handle);
}
