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
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/personalization/ProductPurchaseSection";
import { getSchemaForHandle } from "@/lib/shopify/personalization";
import { getProductByHandle } from "@/lib/shopify/products";

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
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const schema = getSchemaForHandle(handle);
  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const priceLabel =
    minPrice.amount === maxPrice.amount
      ? formatPrice(minPrice.amount, minPrice.currencyCode)
      : `${formatPrice(minPrice.amount, minPrice.currencyCode)} – ${formatPrice(maxPrice.amount, maxPrice.currencyCode)}`;

  return (
    <section className="relative z-[1] mx-auto max-w-[1280px] px-6 py-24 md:px-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <ProductGallery
          images={product.images.nodes}
          productTitle={product.title}
        />

        <div className="flex flex-col">
          {/*
            Availability pill: only render "Udsolgt" when the product is
            unbuyable. We intentionally do NOT show a "På lager" pill,
            since many Nooni products are made-to-order and inventory
            isn't tracked — claiming stock we don't measure would be a
            promise we can't keep.
          */}
          {!product.availableForSale && (
            <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Udsolgt
            </p>
          )}

          <h1 className="font-editorial text-5xl font-medium leading-[1.05] text-nooni-headline tracking-tight">
            {product.title}
          </h1>

          <p className="mt-5 font-editorial text-4xl font-medium text-nooni-ink">
            {priceLabel}
          </p>

          {product.descriptionHtml && (
            <div
              className="mt-8 font-editorial text-lg leading-relaxed text-nooni-ink-soft"
              // descriptionHtml comes from Shopify, which sanitises HTML
              // for the Storefront API — safe to render.
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {product.variants.nodes[0] ? (
            <ProductPurchaseSection
              handle={handle}
              variantId={product.variants.nodes[0].id}
              availableForSale={
                product.availableForSale &&
                product.variants.nodes[0].availableForSale
              }
              schema={schema}
            />
          ) : (
            <p className="mt-10 text-sm text-nooni-ink-soft">
              Dette produkt kan ikke købes lige nu.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
