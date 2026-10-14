/**
 * Shared content for /llms.txt (short index) and /llms-full.txt (every
 * product, policy and blog post in full). Both are Markdown per
 * https://llmstxt.org and are built from the same Shopify catalogue and
 * posts as the pages, so AI assistants never quote stale facts.
 */

import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_URL,
  UNINDEXED_PRODUCT_HANDLES,
} from "@/lib/seo";
import { getAllProducts, getProductByHandle } from "@/lib/shopify/products";
import { STORE_FACTS } from "@/lib/store-facts";

export const INTRO = `# Nooni

> ${SITE_DESCRIPTION}

Nooni (nooni.dk) er en lille dansk webshop drevet af Camilla fra Borris i Vestjylland. Alle produkter er designet af hende og 3D-printet hjemme. Kerneproduktet er personlige navnemærker til børnetøj, lynlåse, tasker og overtøj, så børnenes ting ikke bliver forbyttet i institutionen. Mange produkter kan personliggøres med barnets navn, motiv og farver direkte på produktsiden.

- Webshop: ${SITE_URL}
- Sprog: dansk
- Priser: danske kroner (DKK)
- Kontakt: ${CONTACT_EMAIL}
- Instagram: ${INSTAGRAM_URL}`;

export const ABOUT_LINKS = `- [Min historie](${SITE_URL}/om-os): Camilla, personen bag Nooni, og hvordan produkterne bliver til.
- [Kontakt](${SITE_URL}/kontakt): spørgsmål og særlige ønsker.
- [Levering og fragt](${SITE_URL}/levering): ${STORE_FACTS.shippingPrice} ${STORE_FACTS.dispatch}. ${STORE_FACTS.delivery}.
- [Fortrydelsesret og returnering](${SITE_URL}/returnering): ${STORE_FACTS.withdrawal} og ${STORE_FACTS.complaint}.
- [Handelsbetingelser](${SITE_URL}/handelsbetingelser)
- [Privatlivspolitik](${SITE_URL}/privatlivspolitik)`;

export function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

/** "fra 75,00 kr." for products with a price range, else "50,00 kr.". */
export function priceText(p: {
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string };
  };
}) {
  const min = p.priceRange.minVariantPrice;
  const from = p.priceRange.maxVariantPrice.amount !== min.amount ? "fra " : "";
  return `${from}${formatPrice(min.amount, min.currencyCode)}`;
}

/** Every indexable product with full details. Empty on a Shopify outage. */
export async function getCatalogue() {
  const summaries = await getAllProducts().catch(() => []);
  const products = await Promise.all(
    summaries
      .filter((p) => !UNINDEXED_PRODUCT_HANDLES.has(p.handle))
      .map((p) => getProductByHandle(p.handle).catch(() => null)),
  );
  return products.filter((p) => p !== null);
}

