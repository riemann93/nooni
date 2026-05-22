/**
 * ProductCard — the shared dome-shaped product card.
 *
 * One cream-tinted container (--color-nooni-bg-warm) with a full
 * semicircle top from the photo and soft rounded bottom corners under
 * the info block. Photo and info share the background so the seam
 * between them is just a clean horizontal transition.
 *
 * Used on both:
 *   - the homepage "Mest populære" row (with a hand-curated tagline)
 *   - the /produkter listing page (no tagline)
 *
 * Keep visual changes here so the two surfaces stay in sync, per
 * design/homepage-spec.md §2.
 */

import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/lib/shopify/products";

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

interface ProductCardProps {
  product: ProductSummary;
  /** Optional curated one-liner shown above the title (homepage only). */
  tagline?: string;
  /** Image sizes hint — tune per surface for accurate srcset selection. */
  sizes?: string;
}

export default function ProductCard({
  product,
  tagline,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
}: ProductCardProps) {
  const image = product.images.nodes[0];
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
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
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 px-7 py-6">
        {tagline && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-nooni-sub">
            {tagline}
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
}
