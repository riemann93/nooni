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
import { getProductMeta } from "@/lib/product-meta";

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
  return {
    title: product.title,
    description: product.description.slice(0, 160),
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
  const [product, colors] = await Promise.all([
    getProductByHandle(handle),
    getProductColors(handle),
  ]);

  if (!product) {
    notFound();
  }

  // Inject the Shopify palette (with spool photos) into the schema's
  // colour fields. Empty `colors` leaves the schema on the hardcoded
  // NOONI_COLORS fallback.
  const baseSchema = getSchemaForHandle(handle);
  const schema = baseSchema ? withColorOptions(baseSchema, colors) : null;

  // In-code metadata: tagline above the title etc.
  const meta = getProductMeta(handle);

  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const priceLabel =
    minPrice.amount === maxPrice.amount
      ? formatPrice(minPrice.amount, minPrice.currencyCode)
      : `${formatPrice(minPrice.amount, minPrice.currencyCode)} – ${formatPrice(maxPrice.amount, maxPrice.currencyCode)}`;

  return (
    <section className="relative z-[1] mx-auto max-w-[1280px] px-6 py-[45px] md:px-10">
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
      />
    </section>
  );
}
