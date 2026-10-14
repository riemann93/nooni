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

/**
 * Per-product rating and count, keyed by Shopify handle. Dots med navn
 * carries most reviews because it is the lead product (CONTENT-PLAN.md).
 */
export const PRODUCT_RATINGS: Record<string, Rating> = {
  "dots-med-navn-3stk": { rating: 4.9, count: 148 },
  "dots-5stk": { rating: 4.8, count: 52 },
  emblem: { rating: 4.9, count: 41 },
  "loops-navn": { rating: 4.8, count: 37 },
  loops: { rating: 4.7, count: 34 },
};

/** Mostly Dots med navn on lynlås and flyverdragt, the lead use case. */
export const REVIEWS: ParentReview[] = [
  {
    name: "Sofie",
    town: "Aarhus",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Endelig navnemærker der bliver siddende. Dots med navn har siddet på lynlåsen på flyverdragten i vuggestuen hele vinteren.",
  },
  {
    name: "Mads",
    town: "Odense",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Pædagogerne i børnehaven sagde selv, at det var de nemmeste navnemærker at læse. Ingen forbyttede flyverdragter siden.",
  },
  {
    name: "Camilla",
    town: "Frederiksberg",
    handle: "dots-5stk",
    stars: 5,
    text: "Vores datter kan ikke læse endnu, men hun finder selv sin jakke på den lille blomst i lynlåsen. Hun peger stolt på den hver morgen.",
  },
  {
    name: "Jonas",
    town: "Aalborg",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Dots på lynlåsen gør det meget lettere for vores søn at lyne jakken selv. Han får et godt greb, og navnet står tydeligt.",
  },
  {
    name: "Line",
    town: "Roskilde",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Vi har prøvet strygemærker og klistermærker i overtøjet. Dots på lynlåsen er det første, pædagogerne kan se uden at vende jakken.",
  },
  {
    name: "Henrik",
    town: "Vejle",
    handle: "emblem",
    stars: 4,
    text: "Fine farver og god kvalitet. Det tog lidt tid at vælge mellem farverne, men nu har begge drenge deres egne Loops på tasken.",
  },
  {
    name: "Maja",
    town: "Esbjerg",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Garderoben i vuggestuen er fuld af ens flyverdragter, men vores er nem at finde med navnet i lynlåsen.",
  },
  {
    name: "Rasmus",
    town: "Silkeborg",
    handle: "dots-5stk",
    stars: 5,
    text: "Dots med motiv på regntøjet og vinterjakken. Hurtig levering, og man kan mærke, at de er lavet med omhu.",
  },
  {
    name: "Ida",
    town: "Helsingør",
    handle: "emblem",
    stars: 5,
    text: "Købt til skolestart. Loops hænger på skoletasken, og navnet står tydeligt.",
  },
  {
    name: "Anders",
    town: "Horsens",
    handle: "dots-med-navn-3stk",
    stars: 5,
    text: "Vi skulle mærke alt overtøjet til børnehaven på én weekend. Dots kom hurtigt, og de sad fast på lynlåsene med det samme.",
  },
];

export function getProductRating(handle: string): Rating | null {
  return PRODUCT_RATINGS[handle] ?? null;
}

export function getReviewsFor(handle: string): ParentReview[] {
  return REVIEWS.filter((r) => r.handle === handle);
}

/**
 * Placeholder star distribution for a product, index 0 = 1 star up to
 * index 4 = 5 stars. Derived from the (made up) average and count so the
 * bars agree with the headline number. Not real data.
 */
export function getRatingDistribution(rating: Rating): number[] {
  const deficit = Math.max(0, 5 - rating.rating);
  const share = [0, 0.01, 0.02, Math.max(0, deficit - 0.07), 0];
  share[4] = Math.max(0, 1 - share[1] - share[2] - share[3]);
  const counts = share.map((s) => Math.round(s * rating.count));
  counts[4] += rating.count - counts.reduce((a, b) => a + b, 0);
  return counts;
}
