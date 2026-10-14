/**
 * MoreFromNooni: the secondary product row (Deks, Box, Tic Tac Take).
 *
 * Deliberately smaller than the navnemærker row: compact horizontal
 * cards with a small arched thumbnail, title and price. These products
 * are part of the shop but not the core, so they sit low on the page
 * and never compete with the name-tag family.
 *
 * Server-rendered with ISR (60s). Renders nothing if Shopify is
 * unreachable.
 */

import Image from "next/image";
import Link from "next/link";
import { productTitle } from "@/lib/product-meta";
import { getProductsByHandles, type ProductSummary } from "@/lib/shopify/products";

export const revalidate = 60;

const ITEMS: { handle: string; tagline: string }[] = [
  { handle: "deks-single", tagline: "Kortholder til kortspil" },
  { handle: "box-kort-aesker", tagline: "Æske til kortspil" },
  { handle: "tic-tac-take", tagline: "Spil til farten" },
];

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

async function getProducts(): Promise<ProductSummary[]> {
  try {
    return await getProductsByHandles(ITEMS.map((i) => i.handle));
  } catch {
    return [];
  }
}

export default async function MoreFromNooni() {
  const products = await getProducts();
  if (products.length === 0) return null;
  const taglines = Object.fromEntries(ITEMS.map((i) => [i.handle, i.tagline]));

  return (
    <section className="bg-nooni-bg pt-4 pb-20 md:pb-28" data-screen-label="08 Mere fra Nooni">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-editorial leading-[1.1] tracking-tight text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-sm)" }}>
            Mere fra <em className="italic text-nooni-headline">Nooni</em>
          </h2>
          <Link
            href="/produkter"
            className="shrink-0 text-nooni-sub underline decoration-nooni-line underline-offset-4 transition-colors hover:decoration-nooni-sub"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Alle produkter
          </Link>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-5">
          {products.map((product) => {
            const image = product.images.nodes[0];
            const price = product.priceRange.minVariantPrice;
            return (
              <li key={product.handle}>
                <Link
                  href={`/produkter/${product.handle}`}
                  className="group flex items-center gap-4 rounded-[24px] bg-nooni-bg-warm p-3 pr-5 transition-colors hover:bg-nooni-line-soft"
                >
                  {image && (
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-t-full rounded-b-[14px] md:h-24 md:w-20">
                      <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
                      {taglines[product.handle]}
                    </p>
                    <h3 className="mt-0.5 font-editorial text-lg leading-tight text-nooni-ink">
                      {productTitle(product.handle, product.title)}
                    </h3>
                    <p className="mt-0.5 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                      Fra {formatPrice(price.amount, price.currencyCode)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
