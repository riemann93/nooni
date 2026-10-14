/**
 * Shared SEO facts for nooni.dk: the canonical URL, the brand
 * description, and the schema.org JSON-LD builders used by layout.tsx
 * and the product/blog pages.
 *
 * One place for these so the <title>, the structured data, llms.txt
 * and the sitemap all describe Nooni the same way. Search engines and
 * LLMs trust a business more when every source agrees.
 */

import type { Metadata } from "next";
import { getProductMeta, isNametag, NAMETAG_HUB_PATH, productTitle } from "@/lib/product-meta";
import { RETURNS, SHIPPING } from "@/lib/store-facts";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export const SITE_URL = "https://nooni.dk";
export const SITE_NAME = "Nooni";
export const CONTACT_EMAIL = "hej@nooni.dk";
export const INSTAGRAM_URL = "https://www.instagram.com/hej.nooni/";

export const SITE_DESCRIPTION =
  "Nooni laver personlige navnemærker og smarte 3D-printede løsninger til børn og familier. Designet og printet hjemme i Borris, Danmark.";

const DEFAULT_OG_IMAGE = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Nooni: personlige navnemærker og 3D-printede ting til børn",
  },
];

/**
 * Metadata for one page: title, description, canonical and a complete
 * Open Graph block. Use it on every page. Next replaces (not merges) a
 * page's `openGraph` with the layout's, so a page that set only a title
 * used to lose site name and locale, and inherit the homepage's og:url.
 * Without explicit images the default share card is used.
 */
export function pageMetadata({
  title,
  description,
  path,
  openGraph = {},
}: {
  title: string;
  description: string;
  path: string;
  openGraph?: OpenGraph;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "da_DK",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: DEFAULT_OG_IMAGE,
      ...openGraph,
    } as OpenGraph,
  };
}

/**
 * Product handles that exist in Shopify but must never be indexed,
 * listed or put in the sitemap. The add-on bag only appears as an
 * add-on on the Tic Tac Take page.
 */
export const UNINDEXED_PRODUCT_HANDLES = new Set([
  "nooni_test_product",
  "uden-titel-17-jun-_10-36-17",
]);

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
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT_EMAIL,
          availableLanguage: "Danish",
        },
        founder: { "@id": CAMILLA_ID },
        taxID: "46558804",
        // Borris is the village; 6900 Skjern is its postal town.
        address: {
          "@type": "PostalAddress",
          streetAddress: "Storegade 47, Borris",
          postalCode: "6900",
          addressLocality: "Skjern",
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

/**
 * Shipping and returns from store-facts.ts. Google needs both before
 * it shows a product as a rich shopping result.
 */
const SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: String(SHIPPING.priceDkk), currency: "DKK" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: SHIPPING.country },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: SHIPPING.handlingDays.min, maxValue: SHIPPING.handlingDays.max, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: SHIPPING.transitDays.min, maxValue: SHIPPING.transitDays.max, unitCode: "DAY" },
  },
};

const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: SHIPPING.country,
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: RETURNS.withdrawalDays,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnShippingFees",
};

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
          shippingDetails: SHIPPING_DETAILS,
          hasMerchantReturnPolicy: RETURN_POLICY,
          seller: { "@id": ORG_ID },
        }
      : {
          "@type": "AggregateOffer",
          url,
          lowPrice: p.minPrice.amount,
          highPrice: p.maxPrice.amount,
          priceCurrency: p.minPrice.currencyCode,
          availability,
          shippingDetails: SHIPPING_DETAILS,
          hasMerchantReturnPolicy: RETURN_POLICY,
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
        isNametag(p.handle)
          ? { name: "Navnemærker", path: NAMETAG_HUB_PATH }
          : { name: "Produkter", path: "/produkter" },
        { name: getProductMeta(p.handle).crumbName ?? p.title, path: `/produkter/${p.handle}` },
      ]),
    ],
  };
}

/** Stable id for Camilla's Person node, defined on /om-os and referenced as author. */
export const CAMILLA_ID = `${SITE_URL}/om-os#camilla`;

/** Person schema for Camilla (rendered on /om-os and every post). */
export function camillaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": CAMILLA_ID,
    name: "Camilla Riemann Sinnbeck",
    givenName: "Camilla",
    jobTitle: "Lærer og grundlægger af Nooni",
    description: "Lærer og mor til to. Designer og 3D-printer Noonis navnemærker i Borris.",
    url: `${SITE_URL}/om-os`,
    image: `${SITE_URL}/images/familie_2.jpg`,
    worksFor: { "@id": ORG_ID },
    sameAs: [INSTAGRAM_URL],
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
        author: { "@id": CAMILLA_ID },
        publisher: { "@id": ORG_ID },
      },
      breadcrumbJsonLd([
        { name: "Forside", path: "/" },
        { name: "Gode råd", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}

interface HubJsonLdInput {
  path: string;
  title: string;
  description: string;
  products: { handle: string; title: string }[];
  faq: { question: string; answer: string }[];
}

/**
 * CollectionPage (with the products as an ItemList), FAQPage and
 * breadcrumb for a category hub such as /navnemaerker. No ratings: the
 * review data is placeholder until real reviews are in.
 */
export function hubJsonLd(hub: HubJsonLdInput) {
  const url = `${SITE_URL}${hub.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: hub.title,
        description: hub.description,
        url,
        inLanguage: "da-DK",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: hub.products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: productTitle(p.handle, p.title),
            url: `${SITE_URL}/produkter/${p.handle}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: hub.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      breadcrumbJsonLd([
        { name: "Forside", path: "/" },
        { name: hub.title, path: hub.path },
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
