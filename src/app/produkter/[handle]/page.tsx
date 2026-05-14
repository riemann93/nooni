/**
 * Product detail page — /produkter/[handle].
 *
 * Fetches the product from Shopify Storefront by URL handle and renders
 * a minimal title + image + price + description view. This is the first
 * round-trip with Shopify; it intentionally has no personalization form
 * or cart wiring yet — those come in the next iteration.
 *
 * Caching: responses are cached on Vercel for 60s via shopifyFetch's
 * default revalidate. Edits in Shopify will appear on nooni.dk within
 * a minute without a redeploy.
 *
 * Notes for the next iteration:
 *   - Add <PersonalizationForm /> with per-product schema (Dots / Loops
 *     / Decks each have different fields)
 *   - Add <AddToCartButton /> that mutates the cart via Storefront API
 *   - generateStaticParams() once we lock the handles, so the three
 *     production routes are pre-rendered at build time
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
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

  const primaryImage = product.images.nodes[0];
  const minPrice = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const priceLabel =
    minPrice.amount === maxPrice.amount
      ? formatPrice(minPrice.amount, minPrice.currencyCode)
      : `${formatPrice(minPrice.amount, minPrice.currencyCode)} – ${formatPrice(maxPrice.amount, maxPrice.currencyCode)}`;

  return (
    <section className="relative z-[1] mx-auto max-w-[1280px] px-10 py-24">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        {primaryImage && (
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-nooni-bg-warm">
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? product.title}
              width={primaryImage.width}
              height={primaryImage.height}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
            {product.availableForSale ? "På lager" : "Udsolgt"}
          </p>

          <h1 className="mt-3 font-editorial text-5xl italic font-medium text-nooni-headline tracking-tight">
            {product.title}
          </h1>

          <p className="mt-4 font-display text-2xl font-medium text-nooni-ink">
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

          <div className="mt-10 rounded-xl border border-dashed border-nooni-line p-5 text-sm text-nooni-ink-soft">
            Personalisering og kurv kommer i næste iteration.
          </div>
        </div>
      </div>
    </section>
  );
}
