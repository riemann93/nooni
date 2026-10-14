/**
 * MoreFromNooni: the rest of the shop, near the bottom of the homepage,
 * so a visitor who scrolled all the way down still meets real products
 * with a photo and a price.
 *
 * Deks, Box and Haps (handle tic-tac-take). Same quiet card as the
 * name-tag tiles on a phone: photo, name, one line, price. Three across
 * from md up; on a phone a swipeable row whose next card peeks in.
 *
 * Photos and prices are live from Shopify. If Shopify is unreachable
 * the row still renders, with the fallback photo and fixed price from
 * product-meta.ts, so it never disappears.
 */

import Image from "next/image";
import Link from "next/link";
import { displayPrice, getProductMeta } from "@/lib/product-meta";
import { getProductsByHandles, type ProductSummary } from "@/lib/shopify/products";

export const revalidate = 60;

const ITEMS: { handle: string; line: string }[] = [
  { handle: "deks-single", line: "Kortholder til kortspillet." },
  { handle: "box-kort-aesker", line: "Æske til kortene, i jeres farver." },
  { handle: "tic-tac-take", line: "Kryds og bolle, også på farten." },
];

async function getProducts(): Promise<Map<string, ProductSummary>> {
  try {
    const products = await getProductsByHandles(ITEMS.map((i) => i.handle));
    return new Map(products.map((p) => [p.handle, p]));
  } catch {
    return new Map();
  }
}

export default async function MoreFromNooni() {
  const products = await getProducts();

  return (
    <section className="bg-nooni-bg py-16 md:py-28" data-screen-label="08 Mere fra Nooni">
      <div className="mx-auto max-w-[1280px] md:px-10">
        <div className="px-6 text-center md:px-0">
          <h2
            className="font-editorial leading-[1.1] tracking-[-0.02em] text-nooni-ink"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            Mere fra <span className="italic text-nooni-headline">Nooni</span>
          </h2>
          <p className="mt-3 font-editorial text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
            Til spilleaftenen og turen, printet på samme måde.
          </p>
        </div>

        <ul className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {ITEMS.map((item) => {
            const product = products.get(item.handle);
            const meta = getProductMeta(item.handle);
            const name = meta.crumbName ?? product?.title ?? item.handle;
            const shopifyImage = product?.images.nodes[0];
            const src = shopifyImage?.url ?? meta.fallbackImage;
            const price = displayPrice(item.handle, product?.priceRange.minVariantPrice);

            return (
              <li key={item.handle} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <Link
                  href={`/produkter/${item.handle}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-nooni-bg-warm md:rounded-[28px]"
                >
                  <div className="relative m-2 aspect-square overflow-hidden rounded-[14px] md:m-3 md:rounded-[20px]">
                    {src && (
                      <Image
                        src={src}
                        alt={shopifyImage?.altText ?? name}
                        fill
                        sizes="(min-width: 768px) 380px, 72vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-4 pt-2 pb-5 text-center md:px-6 md:pb-7">
                    <h3 className="font-editorial text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-sm)" }}>
                      {name}
                    </h3>
                    <p className="mt-1 font-editorial leading-snug text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                      {item.line}
                    </p>
                    <p className="mt-auto pt-3 text-nooni-headline" style={{ fontSize: "var(--nooni-text-ui)" }}>
                      {price && (
                        <span className="text-nooni-ink">
                          {price}
                          <span className="mx-2 text-nooni-ink-soft">·</span>
                        </span>
                      )}
                      Se mere{" "}
                      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">›</span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center md:mt-10">
          <Link
            href="/produkter"
            className="group inline-flex items-center gap-1 py-3 text-nooni-headline"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Se alle produkter
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
