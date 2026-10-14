/**
 * Store policies (terms, shipping, returns, privacy) from Shopify.
 *
 * Shopify owns the text, so Camilla edits it in Shopify Admin →
 * Settings → Policies and both checkout and nooni.dk update. The site
 * renders them on its own pages (/handelsbetingelser etc.) because
 * customers and Google look for them on the shop's own domain.
 */

import { shopifyFetch } from "./client";

export type PolicyKind =
  | "termsOfService"
  | "shippingPolicy"
  | "refundPolicy"
  | "privacyPolicy";

interface ShopPolicy {
  title: string;
  body: string;
}

/**
 * The policies were written with an old Gmail address. nooni.dk only
 * ever shows hej@nooni.dk, so swap it here until the text in Shopify
 * is updated (checkout still shows the old address until then).
 */
const OLD_EMAIL = /hej\.nooni\s*@gmail\.com/gi;

function cleanBody(html: string): string {
  return html
    .replace(/<!---->/g, "")
    .replace(/<span>\s*<\/span>/g, "")
    .replace(/<sup[^>]*>\s*<\/sup>/g, "")
    .replace(/\s+id="[^"]*"/g, "")
    .replace(OLD_EMAIL, "hej@nooni.dk");
}

export async function getPolicy(kind: PolicyKind): Promise<ShopPolicy | null> {
  const data = await shopifyFetch<{ shop: Record<PolicyKind, ShopPolicy | null> }>({
    query: `query Policy { shop { ${kind} { title body } } }`,
    revalidate: 3600,
  });
  const policy = data.shop[kind];
  return policy ? { ...policy, body: cleanBody(policy.body) } : null;
}
