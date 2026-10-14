/**
 * Shared SEO facts for nooni.dk: the canonical URL, the brand
 * description, and the schema.org JSON-LD builders used by layout.tsx
 * and the product/blog pages.
 *
 * One place for these so the <title>, the structured data, llms.txt
 * and the sitemap all describe Nooni the same way. Search engines and
 * LLMs trust a business more when every source agrees.
 */

export const SITE_URL = "https://nooni.dk";
export const SITE_NAME = "Nooni";
export const CONTACT_EMAIL = "hej@nooni.dk";
export const INSTAGRAM_URL = "https://www.instagram.com/hej.nooni/";

export const SITE_DESCRIPTION =
  "Nooni laver personlige navnemærker og smarte 3D-printede løsninger til børn og familier. Designet og printet hjemme i Borris, Danmark.";

/** Product handles that exist in Shopify but must never be indexed. */
export const UNINDEXED_PRODUCT_HANDLES = new Set(["nooni_test_product"]);

/**
 * Serialises JSON-LD for a <script> tag. Escapes `<` so a product
 * description can't close the script tag (see Next's JSON-LD guide).
 */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Plain-text description trimmed to `max` chars on a word boundary. */
export function metaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const ORG_ID = `${SITE_URL}/#organization`;

/** Site-wide graph: the shop itself plus the website it runs. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineStore",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        image: `${SITE_URL}/opengraph-image`,
        description: SITE_DESCRIPTION,
        email: CONTACT_EMAIL,
        founder: { "@type": "Person", name: "Camilla" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Borris",
          addressCountry: "DK",
        },
        areaServed: "DK",
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "da-DK",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

interface ProductJsonLdInput {
  handle: string;
  title: string;
  description: string;
  images: string[];
  availableForSale: boolean;
  minPrice: { amount: string; currencyCode: string };
  maxPrice: { amount: string; currencyCode: string };
}

const AVAILABILITY = {
  in: "https://schema.org/InStock",
  out: "https://schema.org/OutOfStock",
};

/** Product + breadcrumb for /produkter/[handle]. */
export function productJsonLd(p: ProductJsonLdInput) {
  const url = `${SITE_URL}/produkter/${p.handle}`;
  const availability = p.availableForSale ? AVAILABILITY.in : AVAILABILITY.out;
  const offers =
    p.minPrice.amount === p.maxPrice.amount
      ? {
          "@type": "Offer",
          url,
          price: p.minPrice.amount,
          priceCurrency: p.minPrice.currencyCode,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": ORG_ID },
        }
      : {
          "@type": "AggregateOffer",
          url,
          lowPrice: p.minPrice.amount,
          highPrice: p.maxPrice.amount,
          priceCurrency: p.minPrice.currencyCode,
          availability,
          seller: { "@id": ORG_ID },
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: p.title,
        description: p.description.replace(/\s+/g, " ").trim(),
        url,
        image: p.images,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers,
      },
      breadcrumbJsonLd([
        { name: "Forside", path: "/" },
        { name: "Produkter", path: "/produkter" },
        { name: p.title, path: `/produkter/${p.handle}` },
      ]),
    ],
  };
}

interface BlogPostJsonLdInput {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

/** BlogPosting + breadcrumb for /blog/[slug]. */
export function blogPostJsonLd(post: BlogPostJsonLdInput) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: `${SITE_URL}${post.image}`,
        url,
        inLanguage: "da-DK",
        author: { "@type": "Person", name: "Camilla" },
        publisher: { "@id": ORG_ID },
      },
      breadcrumbJsonLd([
        { name: "Forside", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}

function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
