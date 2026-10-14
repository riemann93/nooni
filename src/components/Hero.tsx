/**
 * Hero: the homepage's only H1.
 *
 * Calm and centred: a short label, the headline, one line, then what
 * a buyer checks first (price and rating), two actions, a quiet
 * row of delivery and return facts, then one large photo.
 *
 * The price is the live Dots med navn price from Shopify, or the fixed
 * price in product-meta.ts when Shopify is unreachable. It is a fixed
 * price, so no "Fra".
 * Stars are placeholder data and hidden on the production deploy.
 */

import Image from "next/image";
import Link from "next/link";
import Stars from "@/components/Stars";
import { displayPrice, getProductMeta, LEAD_NAME_TAG } from "@/lib/product-meta";
import { OVERALL_RATING, PLACEHOLDER_SOCIAL_PROOF } from "@/lib/social-proof";
import { STORE_FACTS } from "@/lib/store-facts";
import { getProductsByHandles } from "@/lib/shopify/products";

export const revalidate = 60;

// Placeholder ratings never reach the live site (see social-proof.ts).
const SHOW_STARS = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

/** What a buyer checks before buying, from the store facts (Shopify policies). */
const TRUST: { text: string; icon: React.ReactNode }[] = [
  { text: STORE_FACTS.dispatch, icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /> },
  { text: STORE_FACTS.shippingPrice, icon: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" /> },
  { text: STORE_FACTS.withdrawal, icon: <path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" /> },
  { text: "Betal med MobilePay", icon: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" /> },
];

async function getLeadPrice(): Promise<string | null> {
  try {
    const [product] = await getProductsByHandles([LEAD_NAME_TAG]);
    return displayPrice(LEAD_NAME_TAG, product?.priceRange.minVariantPrice);
  } catch {
    return displayPrice(LEAD_NAME_TAG);
  }
}

export default async function Hero() {
  const price = await getLeadPrice();

  return (
    <section className="bg-nooni-bg" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-9 text-center md:px-10 md:pt-24">
        <p className="text-nooni-sub" style={{ fontSize: "var(--nooni-text-ui)" }}>
          Dots med navn
        </p>
        <h1
          className="mx-auto mt-3 max-w-[900px] font-editorial leading-[1.02] tracking-[-0.02em] text-nooni-ink"
          style={{ fontSize: "clamp(40px, 6.4vw, 88px)" }}
        >
          Personlige navnemærker{" "}
          <span className="whitespace-nowrap italic text-nooni-headline">til børn</span>
        </h1>
        <p
          className="mx-auto mt-5 max-w-[520px] font-editorial leading-snug text-nooni-ink-soft"
          style={{ fontSize: "var(--nooni-text-body-lg)" }}
        >
          Navnet sidder på lynlåsen. Så finder dit barn selv sin jakke, og små hænder får noget at
          tage fat i.
        </p>

        {(price || SHOW_STARS) && (
          <div className="mt-6 flex flex-col items-center gap-2">
            {price && (
              <p className="text-nooni-ink" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                <span className="font-medium">{price}</span>
                <span className="text-nooni-ink-soft"> · {getProductMeta(LEAD_NAME_TAG).quantityNote}</span>
              </p>
            )}
            {SHOW_STARS && <Stars rating={OVERALL_RATING.rating} count={OVERALL_RATING.count} size={15} />}
          </div>
        )}

        <div className="mt-7 flex flex-col items-center justify-center gap-1 sm:mt-8 sm:flex-row sm:gap-7">
          <Link
            href={`/produkter/${LEAD_NAME_TAG}`}
            className="inline-flex items-center justify-center rounded-full bg-nooni-headline px-7 py-3.5 text-white transition-colors hover:bg-[#9d6f6f]"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Design dit navnemærke
          </Link>
          <Link
            href="/navnemaerker"
            className="group inline-flex items-center gap-1 px-2 py-3 text-nooni-headline"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Se alle navnemærker
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        <ul
          aria-label="Køb trygt"
          className="mx-auto mt-6 grid max-w-[340px] grid-cols-2 gap-x-4 gap-y-5 text-nooni-ink-soft sm:mt-10 sm:flex sm:max-w-[900px] sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-7"
          style={{ fontSize: "var(--nooni-text-ui)" }}
        >
          {TRUST.map(({ text, icon }) => (
            <li key={text} className="flex flex-col items-center gap-1.5 text-center leading-tight sm:flex-row sm:gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-nooni-sub">
                {icon}
              </svg>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-[1280px] px-4 md:mt-12 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/10] md:aspect-[16/8]">
          <Image
            src="/images/dots_name_lifestyle.jpg"
            alt="Dots med navnet Elvira på lynlåsen af en lille rygsæk"
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 1200px, (min-width: 640px) 100vw, 170vw"
            className="origin-[52%_52%] scale-[1.7] object-cover object-[50%_52%] sm:scale-100"
          />
        </div>
      </div>
    </section>
  );
}
