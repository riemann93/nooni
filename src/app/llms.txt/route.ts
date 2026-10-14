/**
 * /llms.txt: a plain Markdown summary of Nooni for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini). Format per https://llmstxt.org.
 *
 * Built from the same Shopify catalogue as the shop, so names and
 * prices never drift from what customers see. Regenerated hourly.
 */

import { getAllPosts } from "@/lib/blog";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  metaDescription,
  SITE_DESCRIPTION,
  SITE_URL,
  UNINDEXED_PRODUCT_HANDLES,
} from "@/lib/seo";
import { getAllProducts, getProductByHandle } from "@/lib/shopify/products";

export const revalidate = 3600;

function price(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

export async function GET() {
  const summaries = await getAllProducts().catch(() => []);
  const products = (
    await Promise.all(
      summaries
        .filter((p) => !UNINDEXED_PRODUCT_HANDLES.has(p.handle))
        .map((p) => getProductByHandle(p.handle).catch(() => null)),
    )
  ).filter((p) => p !== null);

  const productLines = products.map((p) => {
    const min = p.priceRange.minVariantPrice;
    const from = p.priceRange.maxVariantPrice.amount !== min.amount ? "fra " : "";
    // da-DK prices already end in "kr.", so no extra full stop.
    const about = metaDescription(p.description, 220);
    return `- [${p.title}](${SITE_URL}/produkter/${p.handle}): ${from}${price(min.amount, min.currencyCode)} ${about}`.trimEnd();
  });

  const postLines = getAllPosts().map(
    (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`,
  );

  const body = `# Nooni

> ${SITE_DESCRIPTION}

Nooni er en lille dansk webshop drevet af Camilla fra Borris i Vestjylland. Alle produkter er designet af hende og 3D-printet hjemme. Kerneproduktet er personlige navnemærker til børnetøj, lynlåse, tasker og overtøj, så børnenes ting ikke bliver forbyttet i institutionen. Mange produkter kan personliggøres med barnets navn, motiv og farver direkte på produktsiden.

- Webshop: ${SITE_URL}
- Sprog: dansk
- Priser: danske kroner (DKK)
- Kontakt: ${CONTACT_EMAIL}
- Instagram: ${INSTAGRAM_URL}

## Produkter

${productLines.join("\n")}

## Om Nooni

- [Min historie](${SITE_URL}/om-os): Camilla, personen bag Nooni, og hvordan produkterne bliver til.
- [Kontakt](${SITE_URL}/kontakt): spørgsmål og særlige ønsker.

## Blog

${postLines.join("\n")}

## Optional

- [Alle produkter](${SITE_URL}/produkter)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
