/**
 * ProductsGrid — "Mest populære" row below the Hero.
 *
 * Per design/homepage-spec.md §2: three pre-selected products in a
 * single row on desktop. Each card is a photo with a fully arched top
 * (semicircle) and soft bottom corners, plus an info block below.
 *
 * Above every card sits a thin outer arch in the arch-line tone,
 * offset by ARCH_GAP px so a constant gap follows the photo's
 * curvature — the same concentric outline treatment used on the hero
 * (a cross-section visual rhyme).
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

/** Gap between the outer arch and the photo, in px. Matches the hero. */
const ARCH_GAP = 14;
/** Outer-arch stroke weight, in px. Matches the hero border. */
const ARCH_STROKE = 3;
/** Bottom-corner radius of the photo card, in px. Top is a full semicircle. */
const PHOTO_BOTTOM_RADIUS = 18;

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

        <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const card = cardsByHandle.get(product.handle);
            const image = product.images.nodes[0];
            const price = product.priceRange.minVariantPrice;

            return (
              <Link
                key={product.handle}
                href={`/produkter/${product.handle}`}
                className="group block"
              >
                <ProductPhoto
                  src={image?.url}
                  alt={image?.altText ?? product.title}
                />

                <div className="mt-6 flex flex-col gap-2 px-1">
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

/**
 * Card photo composition:
 *
 *   - Outer arch: a thin half-circle stroke offset ARCH_GAP px outside
 *     the photo's top semicircle. Built with CSS border + top
 *     border-radius — its box is exactly W × W/2, so the semicircle
 *     fills the box and no straight verticals show below it.
 *   - Inner photo: full semicircle top, soft PHOTO_BOTTOM_RADIUS px
 *     bottom corners, aspect-ratio 3:4. overflow-hidden clips the
 *     image to the shape.
 *
 * The wrapper has marginTop = ARCH_GAP so the outer arch fits within
 * the link's bounding box (otherwise it would extend above the row's
 * intended position).
 */
function ProductPhoto({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <div
      className="relative aspect-[3/4]"
      style={{ marginTop: ARCH_GAP }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: -ARCH_GAP,
          right: -ARCH_GAP,
          top: -ARCH_GAP,
          aspectRatio: "2 / 1",
          borderTopLeftRadius: "9999px",
          borderTopRightRadius: "9999px",
          borderTop: `${ARCH_STROKE}px solid var(--color-nooni-arch)`,
          borderLeft: `${ARCH_STROKE}px solid var(--color-nooni-arch)`,
          borderRight: `${ARCH_STROKE}px solid var(--color-nooni-arch)`,
        }}
      />

      <div
        className="absolute inset-0 overflow-hidden bg-nooni-bg-warm"
        style={{
          borderRadius: `9999px 9999px ${PHOTO_BOTTOM_RADIUS}px ${PHOTO_BOTTOM_RADIUS}px`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
