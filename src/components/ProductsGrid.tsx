/**
 * ProductsGrid — "Mest populære" row below the Hero.
 *
 * Per design/homepage-spec.md §2: three pre-selected products in a
 * single row on desktop. Each card is one cream-tinted container
 * (--color-nooni-bg-warm) shaped as a dome: a full semicircle top
 * from the photo, soft rounded bottom corners under the info block.
 * Photo and info share the same background, so the seam between them
 * is just a clean horizontal transition inside the dome.
 *
 * Server-rendered with ISR (60s). Tagline copy is hand-curated below;
 * Shopify's product descriptions are too long for a grid teaser.
 *
 * Currently hand-picked: Loops, Emblem, Deks. The fourth product
 * (Tic Tac Take — a game, different category) was dropped to land
 * the three-up grid; final selection is still Camilla's call per
 * spec §2 "Open product questions".
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
];

/** Bottom-corner radius of the card, in px. Top is a full semicircle. */
const CARD_BOTTOM_RADIUS = 24;

/**
 * Warm two-tone shadow — same palette as the hero photo so the cards
 * feel like part of the same brand family. Tailwind arbitrary value
 * uses underscores in place of spaces; commas inside rgba() are fine.
 */
const SHADOW =
  "shadow-[0_26px_48px_-10px_rgba(180,131,131,0.30),0_12px_22px_-6px_rgba(61,50,40,0.16)]";
const SHADOW_HOVER =
  "hover:shadow-[0_38px_64px_-12px_rgba(180,131,131,0.36),0_16px_28px_-6px_rgba(61,50,40,0.20)]";

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
    <section
      id="produkter"
      className="bg-nooni-bg py-24 md:py-32"
      data-screen-label="03 Products"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
            Mest populære
          </p>
          <h2 className="mt-4 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-tight text-nooni-ink">
            Mere end{" "}
            <em className="italic text-nooni-headline">navnemærker</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const card = cardsByHandle.get(product.handle);
            const image = product.images.nodes[0];
            const price = product.priceRange.minVariantPrice;

            return (
              <Link
                key={product.handle}
                href={`/produkter/${product.handle}`}
                className={`group block overflow-hidden bg-nooni-bg-warm transition-shadow duration-300 ${SHADOW} ${SHADOW_HOVER}`}
                style={{
                  borderRadius: `9999px 9999px ${CARD_BOTTOM_RADIUS}px ${CARD_BOTTOM_RADIUS}px`,
                }}
              >
                {image && (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={image.url}
                      alt={image.altText ?? product.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2 px-7 py-6">
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
