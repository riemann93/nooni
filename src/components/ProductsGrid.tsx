/**
 * ProductsGrid — secondary product showcase below the Hero.
 *
 * Two-up grid of the four "non-Dots" product families: Loops, Emblem,
 * Deks, Tic Tac Take. The Dots family lives in the hero — these are
 * the "and also…" surface so customers see the rest of the catalogue
 * without leaving the homepage.
 *
 * Server-rendered: fetches product summaries (handle, title, primary
 * image, min price) from Shopify on render, with ISR caching at 60s
 * (matches the product detail page). When the brand owner updates
 * product photos in Shopify admin, they appear here within a minute.
 *
 * Tagline / short pitch per card is hand-curated below — Shopify's
 * own product descriptions are too long for a grid teaser.
 */

import Image from "next/image";
import Link from "next/link";
import { getProductsByHandles } from "@/lib/shopify/products";

export const revalidate = 60;

interface CardCopy {
  handle: string;
  tagline: string;
}

const CARDS: CardCopy[] = [
  { handle: "loops", tagline: "Til tasker & nøgler" },
  { handle: "emblem", tagline: "Større mærker med motiv" },
  { handle: "deks-single", tagline: "Korteholder til kortspil" },
  { handle: "tic-tac-take", tagline: "Familiens nye favoritspil" },
];

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

export default async function ProductsGrid() {
  const products = await getProductsByHandles(CARDS.map((c) => c.handle));
  const cardsByHandle = new Map(CARDS.map((c) => [c.handle, c]));

  return (
    <section id="produkter" className="bg-nooni-bg py-24 md:py-32" data-screen-label="03 Products">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
            Kollektionen
          </p>
          <h2 className="mt-4 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-tight text-nooni-ink">
            Mere end{" "}
            <em className="italic text-nooni-headline">navnemærker</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {products.map((product) => {
            const card = cardsByHandle.get(product.handle);
            const image = product.images.nodes[0];
            const price = product.priceRange.minVariantPrice;

            return (
              <Link
                key={product.handle}
                href={`/produkter/${product.handle}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-nooni-bg-warm transition-shadow hover:shadow-lg"
              >
                {image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-nooni-bg-warm">
                    <Image
                      src={image.url}
                      alt={image.altText ?? product.title}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-2 px-7 py-6">
                  {card && (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-nooni-sub">
                      {card.tagline}
                    </p>
                  )}

                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-editorial text-2xl italic font-medium text-nooni-headline tracking-tight">
                      {product.title}
                    </h3>
                    <span className="whitespace-nowrap text-sm text-nooni-ink-soft">
                      Fra {formatPrice(price.amount, price.currencyCode)}
                    </span>
                  </div>

                  <span className="mt-2 inline-flex items-center gap-2 text-[13px] text-nooni-headline">
                    Se mere
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
