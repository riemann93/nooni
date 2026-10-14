/**
 * Shipping, delivery and returns: the one place these facts live.
 *
 * Copied from the Shopify store policies (Settings → Policies), which
 * are the terms customers agree to at checkout and are shown on
 * /levering and /returnering. The USP strip, footer, llms.txt, page
 * metadata and the product JSON-LD all read from here, so the site
 * can't promise one thing while checkout charges another. When a
 * policy changes in Shopify, change it here too.
 */

export const SHIPPING = {
  priceDkk: 55,
  country: "DK",
  carriers: ["DAO", "GLS", "PostNord"],
  /** Working days from order to dispatch (printing and packing). */
  handlingDays: { min: 1, max: 2 },
  /** Working days with the carrier. */
  transitDays: { min: 1, max: 3 },
} as const;

export const RETURNS = {
  /** Fortrydelsesret, counted from the day the parcel arrives. */
  withdrawalDays: 14,
  /** Reklamationsret under købeloven. */
  complaintMonths: 24,
  /**
   * Whether personalised items are exempt from the fortrydelsesret.
   * The law allows it for goods made to the buyer's spec, but the
   * published Shopify return policy grants 14 days on everything, so
   * this stays false until that policy says otherwise. When it flips,
   * also change the product schema's return policy in seo.ts.
   */
  personalisedExempt: false,
} as const;

/**
 * What Shopify checkout offers, checked 2026-10-14: cards (Visa,
 * Mastercard, Maestro, Amex, UnionPay), MobilePay, Klarna, PayPal, plus
 * Shop Pay, Apple Pay and Google Pay. No Dankort. Recheck after changing
 * payment providers in Shopify.
 */
export const PAYMENT_METHODS = ["MobilePay", "Visa", "Mastercard", "Klarna", "PayPal"] as const;

const range = ({ min, max }: { min: number; max: number }) =>
  min === max ? `${min}` : `${min} til ${max}`;

/** Ready-made Danish phrases, so every surface words the facts alike. */
export const STORE_FACTS = {
  shippingPrice: `Fast fragt ${SHIPPING.priceDkk} kr.`,
  dispatch: `Sendes inden for ${range(SHIPPING.handlingDays)} hverdage`,
  delivery: `Levering i Danmark på ${range(SHIPPING.transitDays)} hverdage`,
  carriers: SHIPPING.carriers.join(", ").replace(/, ([^,]*)$/, " eller $1"),
  withdrawal: `${RETURNS.withdrawalDays} dages fortrydelsesret`,
  complaint: `${RETURNS.complaintMonths} måneders reklamationsret`,
  madeIn: "Håndlavet i Danmark",
  payment: `Betal med ${PAYMENT_METHODS.slice(0, -1).join(", ")} og ${PAYMENT_METHODS.at(-1)}`,
};

const DA_WEEKDAYS = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
const DA_MONTHS = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
];

/** Adds business days (Mon to Fri). Danish public holidays are ignored. */
function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) left -= 1;
  }
  return d;
}

function formatDay(d: Date): string {
  return `${DA_WEEKDAYS[d.getDay()]} d. ${d.getDate()}. ${DA_MONTHS[d.getMonth()]}`;
}

/** "tirsdag d. 20. oktober til torsdag d. 22. oktober" for an order placed on `from`. */
export function deliveryWindow(from: Date = new Date()): string {
  const { handlingDays, transitDays } = SHIPPING;
  const earliest = addBusinessDays(from, handlingDays.min + transitDays.min);
  const latest = addBusinessDays(from, handlingDays.max + transitDays.max);
  return `${formatDay(earliest)} til ${formatDay(latest)}`;
}
