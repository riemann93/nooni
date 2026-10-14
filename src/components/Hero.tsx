/**
 * Hero: the homepage's only H1.
 *
 * Calm and centred: a short label, the headline, one line, two
 * actions, then one large photo of the product in use. No boxes, no
 * tick lists. The photo does the selling.
 *
 * "Fra XX kr." is the live Dots med navn price from Shopify. If Shopify
 * is unreachable the price is left out and the hero still renders.
 */

import Image from "next/image";
import Link from "next/link";
import { LEAD_NAME_TAG } from "@/lib/product-meta";
import { getProductsByHandles } from "@/lib/shopify/products";

export const revalidate = 60;

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

async function getLeadPrice(): Promise<string | null> {
  try {
    const [product] = await getProductsByHandles([LEAD_NAME_TAG]);
    const price = product?.priceRange.minVariantPrice;
    return price ? formatPrice(price.amount, price.currencyCode) : null;
  } catch {
    return null;
  }
}

export default async function Hero() {
  const price = await getLeadPrice();

  return (
    <section className="bg-nooni-bg" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-14 text-center md:px-10 md:pt-24">
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

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
          <Link
            href={`/produkter/${LEAD_NAME_TAG}`}
            className="inline-flex items-center justify-center rounded-full bg-nooni-headline px-7 py-3.5 text-white transition-colors hover:bg-[#9d6f6f]"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Design dit navnemærke
          </Link>
          <Link
            href="/navnemaerker"
            className="group inline-flex items-center gap-1 text-nooni-headline"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Se alle navnemærker
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
        {price && (
          <p className="mt-5 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-label)" }}>
            Fra {price} · 3 stk. i sættet
          </p>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] px-4 md:mt-16 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/10] md:aspect-[16/8]">
          <Image
            src="/images/dots_name_lifestyle.jpg"
            alt="Dots med navnet Elvira på lynlåsen af en lille rygsæk"
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-[50%_52%]"
          />
        </div>
      </div>
    </section>
  );
}
