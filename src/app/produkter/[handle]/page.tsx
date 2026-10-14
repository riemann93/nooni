/**
 * Product detail page — /produkter/[handle].
 *
 * Fetches a product from Shopify Storefront by URL handle and renders:
 *   - title, image, price, description (from Shopify)
 *   - <ProductPurchaseSection /> which itself renders the schema-driven
 *     personalization form (if the handle has a schema) and the
 *     add-to-cart button with form-state-driven validation
 *
 * Caching: ISR via Next's fetch cache, 60s. Shopify edits appear within
 * a minute without a redeploy.
 *
 * Future polish (low priority):
 *   - generateStaticParams() once the real product handles are locked
 *     in, so the half-dozen production routes pre-render at build time
 *     instead of on first request
 *   - Variant selector when products with real Shopify variants exist
 *     (Decks 1-row vs 2-row is the first case)
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductPageClient from "@/components/personalization/ProductPageClient";
import {
  getSchemaForHandle,
  withColorOptions,
} from "@/lib/shopify/personalization";
import { getProductByHandle, getProductColors } from "@/lib/shopify/products";
import {
  getProductRating,
  getReviewsFor,
  PLACEHOLDER_SOCIAL_PROOF,
} from "@/lib/social-proof";
import { getProductMeta } from "@/lib/product-meta";
import {
  jsonLdScript,
  metaDescription,
  pageMetadata,
  productJsonLd,
  UNINDEXED_PRODUCT_HANDLES,
} from "@/lib/seo";

// Re-fetch the underlying Shopify data at most every 60 seconds.
export const revalidate = 60;

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    return { title: "Produkt ikke fundet" };
  }
  const description = metaDescription(product.description);
  const image = product.images.nodes[0];
  return {
    ...pageMetadata({
      title: product.title,
      description,
      path: `/produkter/${handle}`,
      openGraph: image
        ? { images: [{ url: image.url, width: image.width, height: image.height, alt: image.altText ?? product.title }] }
        : {},
    }),
    robots: UNINDEXED_PRODUCT_HANDLES.has(handle)
      ? { index: false, follow: false }
      : undefined,
  };
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  // Colour lookup runs in parallel; it self-recovers to [] on any
  // failure, so it can't block or break the page.
  const meta = getProductMeta(handle);

  const [product, colors, addOnProduct] = await Promise.all([
    getProductByHandle(handle),
    getProductColors(handle),
    meta.addOnHandle ? getProductByHandle(meta.addOnHandle) : Promise.resolve(null),
  ]);

  if (!product) {
    notFound();
  }

  // Inject the Shopify palette (with spool photos) into the schema's
  // colour fields. Empty `colors` leaves the schema on the hardcoded
  // NOONI_COLORS fallback.
  const baseSchema = getSchemaForHandle(handle);
  const schema = baseSchema ? withColorOptions(baseSchema, colors) : null;

  const addOnVariants = addOnProduct?.variants.nodes ?? null;
  const addOnMinPrice = addOnProduct?.priceRange.minVariantPrice ?? null;

  // Placeholder ratings and reviews are made up: never show them on the
  // live site, and never put them in the JSON-LD above.
  const showSocialProof =
    !PLACEHOLDER_SOCIAL_PROOF || process.env.VERCEL_ENV !== "production";
  const rating = showSocialProof ? getProductRating(handle) ?? undefined : undefined;
  const reviews = showSocialProof ? getReviewsFor(handle) : undefined;

  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const priceLabel =
    minPrice.amount === maxPrice.amount
      ? formatPrice(minPrice.amount, minPrice.currencyCode)
      : `${formatPrice(minPrice.amount, minPrice.currencyCode)} – ${formatPrice(maxPrice.amount, maxPrice.currencyCode)}`;

  return (
    <section className="relative z-[1] mx-auto max-w-[1280px] px-6 py-[45px] md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            productJsonLd({
              handle,
              title: product.title,
              description: product.description,
              images: product.images.nodes.map((img) => img.url),
              availableForSale: product.availableForSale,
              minPrice,
              maxPrice,
            }),
          ),
        }}
      />
      <ProductPageClient
        handle={handle}
        images={product.images.nodes}
        productTitle={product.title}
        variants={product.variants.nodes}
        schema={schema}
        tagline={meta.tagline}
        quantityNote={meta.quantityNote}
        priceLabel={priceLabel}
        availableForSale={product.availableForSale}
        descriptionHtml={product.descriptionHtml}
        rating={rating}
        reviews={reviews}
        addOnVariants={addOnVariants ?? undefined}
        addOnMinPrice={addOnMinPrice ?? undefined}
      />
    </section>
  );
}
