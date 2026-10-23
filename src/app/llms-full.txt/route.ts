/**
 * /llms-full.txt: the whole shop as one Markdown file for AI
 * assistants. Every product description, the store policies and every
 * blog post in full, so an assistant can answer detailed questions
 * ("kan Dots tåle vask?", "hvad koster fragt?") from our own words.
 */

import { getAllPosts } from "@/lib/blog";
import { ABOUT_LINKS, getCatalogue, INTRO, priceText } from "@/lib/llms";
import { SITE_URL } from "@/lib/seo";
import { getPolicy, type PolicyKind } from "@/lib/shopify/policies";

export const revalidate = 3600;

const POLICIES: { kind: PolicyKind; title: string; path: string }[] = [
  { kind: "shippingPolicy", title: "Levering og fragt", path: "/levering" },
  { kind: "refundPolicy", title: "Fortrydelsesret og returnering", path: "/returnering" },
  { kind: "termsOfService", title: "Handelsbetingelser", path: "/handelsbetingelser" },
];

/** Shopify policy HTML to plain paragraphs. */
function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|li|h\d)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*/g, "\n\n")
    .trim();
}

export async function GET() {
  const [products, policies] = await Promise.all([
    getCatalogue(),
    Promise.all(POLICIES.map((p) => getPolicy(p.kind).catch(() => null))),
  ]);

  const productSections = products.map(
    (p) => `### ${p.title}

- URL: ${SITE_URL}/produkter/${p.handle}
- Pris: ${priceText(p)}
- På lager: ${p.availableForSale ? "ja" : "nej"}

${p.description.trim()}`,
  );

  const policySections = POLICIES.flatMap((meta, i) => {
    const policy = policies[i];
    if (!policy) return [];
    return [`### ${meta.title}\n\n${SITE_URL}${meta.path}\n\n${htmlToText(policy.body)}`];
  });

  const postSections = getAllPosts().map(
    (post) => `### ${post.title}

${SITE_URL}/blog/${post.slug} (${post.date})

${post.content.replace(/^###\s+/gm, "#### ")}`,
  );

  const body = `${INTRO}

## Om Nooni

${ABOUT_LINKS}

## Produkter

${productSections.join("\n\n")}

## Vilkår

${policySections.join("\n\n")}

## Blog

${postSections.join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
