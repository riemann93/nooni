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
} as const;

export const PAYMENT_METHODS = ["Visa", "Mastercard", "MobilePay", "Dankort"] as const;

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
