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
import Stars from "@/components/Stars";
import type { ProductSummary } from "@/lib/shopify/products";
import { getProductMeta } from "@/lib/product-meta";
import { PLACEHOLDER_SOCIAL_PROOF, getProductRating } from "@/lib/social-proof";

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

/** "Fra 49 kr" style price: whole kroner without decimals, "kr" not "kr.". */
function formatPrice(amount: string, currencyCode: string): string {
  const n = parseFloat(amount);
  const number = new Intl.NumberFormat("da-DK", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
  return currencyCode === "DKK" ? `${number} kr` : `${number} ${currencyCode}`;
}

/** Placeholder ratings must never reach the live shop (see social-proof.ts). */
const SHOW_RATINGS = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

interface ProductCardProps {
  product: ProductSummary;
  /** Optional curated one-liner shown above the title (homepage only). */
  tagline?: string;
  /** Image sizes hint — tune per surface for accurate srcset selection. */
  sizes?: string;
  /** Override the image container aspect ratio class. Defaults to aspect-[3/4]. */
  imageAspect?: string;
  /** Load eagerly instead of lazily (cards visible on first paint). */
  eager?: boolean;
}

export default function ProductCard({
  product,
  tagline,
  sizes = "(min-width: 1024px) 30vw, 45vw",
  imageAspect = "aspect-[3/4]",
  eager = false,
}: ProductCardProps) {
  const image = product.images.nodes[0];
  const price = product.priceRange.minVariantPrice;
  const meta = getProductMeta(product.handle);
  const title = meta.title ?? product.title;
  const rating = SHOW_RATINGS ? getProductRating(product.handle) : null;

  return (
    <Link
      href={`/produkter/${product.handle}`}
      className={`group block overflow-hidden bg-nooni-bg-warm transition-shadow duration-300 ${SHADOW} ${SHADOW_HOVER}`}
      style={{
        borderRadius: `9999px 9999px ${CARD_BOTTOM_RADIUS}px ${CARD_BOTTOM_RADIUS}px`,
      }}
    >
      {image && (
        <div className={`relative ${imageAspect}`}>
          <Image
            src={image.url}
            alt={image.altText ?? title}
            fill
            sizes={sizes}
            loading={eager ? "eager" : undefined}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {meta.badge && (
            <span
              className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-nooni-bg px-3 py-1 font-medium text-nooni-ink shadow-sm"
              style={{ fontSize: "var(--nooni-text-label)" }}
            >
              {meta.badge}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1 px-3 py-2 sm:gap-1.5 sm:px-5 sm:py-3">
        {tagline && (
          <p className="uppercase tracking-[0.2em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
            {tagline}
          </p>
        )}

        <h3 className="font-editorial italic font-medium leading-tight text-nooni-headline tracking-tight text-[length:var(--nooni-text-body-lg)] sm:text-[length:var(--nooni-text-heading-sm)]">
          {title}
        </h3>

        {rating && <Stars rating={rating.rating} count={rating.count} size={13} showRating={false} compact />}

        <span className="whitespace-nowrap font-medium text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
          Fra {formatPrice(price.amount, price.currencyCode)}
        </span>

        <span className="mt-2 flex justify-center rounded-full bg-nooni-headline text-white transition-colors group-hover:bg-[#9d6f6f] sm:mt-3 px-4 py-2" style={{ fontSize: "var(--nooni-text-ui)" }}>
          Køb
        </span>
      </div>
    </Link>
  );
}
