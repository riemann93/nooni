/**
 * Hero: navnemærker first.
 *
 * Holds the page's only H1. Layout:
 *   - A rounded cream frame (bg-nooni-bg-warm) with the copy on the
 *     left and a product-focused Dots med navn image on the right. On mobile
 *     the copy comes first so H1, rating and CTA sit above the fold at
 *     375px, with the image below.
 *   - Stars + review count come from src/lib/social-proof.ts. That data
 *     is placeholder: purely visual, never in JSON-LD.
 *   - "Fra XX kr" is the live Dots med navn price from Shopify. Dots med
 *     navn leads because it fits what parents search ("navnemærke til
 *     lynlås", flyverdragt, overtøj; CONTENT-PLAN.md keyword map). If Shopify is
 *     unreachable the price line (and the Shopify image) is dropped and
 *     a local photo is used, so the hero never breaks.
 *
 * The eyebrow and subline tell reason 1 from the Instagram posts that
 * sell ("Det er min, den her!"), and the ticks are three of the five
 * reasons parents buy, not generic shop promises. All of that copy
 * lives in src/lib/why-parents-buy.ts. Delivery and shipping facts sit
 * in the <ValueStrip /> right below.
 *
 * When HERO_VIDEO is set the image slot plays that short muted loop
 * instead, with the photo as its poster.
 */

import Image from "next/image";
import Link from "next/link";
import Stars from "@/components/Stars";
import { LEAD_NAME_TAG } from "@/lib/product-meta";
import { OVERALL_RATING } from "@/lib/social-proof";
import { HERO_BENEFITS, HERO_VIDEO } from "@/lib/why-parents-buy";
import { getProductsByHandles, type ProductSummary } from "@/lib/shopify/products";

export const revalidate = 60;

const FALLBACK_IMAGE = {
  src: "/images/dots_name_lifestyle.jpg",
  alt: "Dots med navn, navnemærke på lynlåsen",
};

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

async function getLeadProduct(): Promise<ProductSummary | null> {
  try {
    const [product] = await getProductsByHandles([LEAD_NAME_TAG]);
    return product ?? null;
  } catch {
    return null;
  }
}

function Tick() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-nooni-sub"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default async function Hero() {
  const lead = await getLeadProduct();
  const shopifyImage = lead?.images.nodes[0];
  const price = lead?.priceRange.minVariantPrice;
  const leadHref = `/produkter/${LEAD_NAME_TAG}`;

  const image = shopifyImage
    ? { src: shopifyImage.url, alt: shopifyImage.altText ?? "Dots med navn, navnemærke på en lynlås" }
    : FALLBACK_IMAGE;

  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-5 md:px-10 md:pt-4 md:pb-8 lg:pt-6 lg:pb-[45px]">
        <div className="overflow-hidden rounded-[28px] bg-nooni-bg-warm md:grid md:grid-cols-[1.1fr_1fr] md:items-stretch">
          <div className="flex flex-col justify-center px-5 pt-6 pb-5 md:px-10 md:py-12 lg:px-14">
            <p
              className="uppercase tracking-[0.22em] text-nooni-sub"
              style={{ fontSize: "var(--nooni-text-label)" }}
            >
              „Det er min, den her!“
            </p>

            <h1
              className="mt-3 font-editorial italic leading-[1.05] text-nooni-headline"
              style={{ fontSize: "var(--nooni-text-heading-lg)" }}
            >
              Personlige navnemærker til børn
            </h1>

            <Stars
              rating={OVERALL_RATING.rating}
              count={OVERALL_RATING.count}
              size={18}
              className="mt-3"
            />

            <p
              className="mt-3 font-editorial leading-snug text-nooni-ink-soft"
              style={{ fontSize: "var(--nooni-text-body-lg)" }}
            >
              Ti ens flyverdragter i garderoben, og dit barn finder selv sin egen. Dots sidder på
              lynlåsen og giver små hænder et greb, så de kan lyne selv.
            </p>

            {price && (
              <p className="mt-4 text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
                Fra <span className="font-medium">{formatPrice(price.amount, price.currencyCode)}</span>
              </p>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={leadHref}
                className="inline-flex items-center justify-center rounded-full bg-nooni-headline px-7 py-3.5 text-white transition-colors hover:bg-[#9d6f6f]"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Design dit navnemærke
              </Link>
              <Link
                href="/navnemaerker"
                className="inline-flex items-center justify-center rounded-full border border-nooni-sub px-7 py-3.5 text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Se alle navnemærker
              </Link>
            </div>

            <ul
              className="mt-5 flex flex-col gap-1.5 text-nooni-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-5"
              style={{ fontSize: "var(--nooni-text-ui)" }}
            >
              {HERO_BENEFITS.map((tick) => (
                <li key={tick} className="inline-flex items-center gap-2">
                  <Tick />
                  {tick}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px]">
            {HERO_VIDEO ? (
              <video
                aria-label={image.alt}
                poster={HERO_VIDEO.poster}
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={HERO_VIDEO.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 768px) 560px, 100vw"
                className="object-cover"
              />
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(247,239,229,0.55) 0%, rgba(247,239,229,0) 30%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
