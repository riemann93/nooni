/**
 * NameTagTiles: the name-tag family as four large, quiet tiles. Name,
 * one line, price and a link on top, the product photo below.
 *
 * Dots med navn first (the core product), then Dots med motiv, then
 * the two Loops for the bag. Photos and prices are live from Shopify;
 * if Shopify is unreachable the tiles still render with local photos
 * (or the tag's outline) and no price, so the section never empties.
 */

import Image from "next/image";
import Link from "next/link";
import { ProductShape } from "@/components/personalization/ProductPreview";
import { getProductMeta } from "@/lib/product-meta";
import { getProductsByHandles, type ProductSummary } from "@/lib/shopify/products";

export const revalidate = 60;

const TILES: { handle: string; line: string; fallback?: string }[] = [
  { handle: "dots-med-navn-3stk", line: "Til lynlås, flyverdragt og overtøj.", fallback: "/images/dots_name_lifestyle.jpg" },
  { handle: "dots-5stk", line: "Et symbol, før barnet kan læse.", fallback: "/images/dots_motif_lifestyle.jpg" },
  { handle: "emblem", line: "Til skoletasken og penalhuset." },
  { handle: "loops", line: "Til tasken og nøglerne." },
];

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

async function getProducts(): Promise<Map<string, ProductSummary>> {
  try {
    const products = await getProductsByHandles(TILES.map((t) => t.handle));
    return new Map(products.map((p) => [p.handle, p]));
  } catch {
    return new Map();
  }
}

export default async function NameTagTiles() {
  const products = await getProducts();

  return (
    <section id="navnemaerker" className="bg-nooni-bg py-8 md:py-16" data-screen-label="03 Navnemærker">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <h2
          className="text-center font-editorial leading-[1.1] tracking-[-0.02em] text-nooni-ink"
          style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}
        >
          Find det rigtige <span className="italic text-nooni-headline">navnemærke</span>
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {TILES.map((tile) => {
            const product = products.get(tile.handle);
            const name = getProductMeta(tile.handle).crumbName ?? product?.title ?? tile.handle;
            const shopifyImage = product?.images.nodes[0];
            const image = shopifyImage
              ? { src: shopifyImage.url, alt: shopifyImage.altText ?? name }
              : tile.fallback
                ? { src: tile.fallback, alt: name }
                : null;
            const price = product?.priceRange.minVariantPrice;

            return (
              <li key={tile.handle}>
                <Link
                  href={`/produkter/${tile.handle}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-nooni-bg-warm text-center"
                >
                  <div className="px-6 pt-10 md:pt-12">
                    <h3 className="font-editorial tracking-[-0.01em] text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-sm)" }}>
                      {name}
                    </h3>
                    <p className="mt-1.5 font-editorial text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
                      {tile.line}
                    </p>
                    <p className="mt-4 text-nooni-headline" style={{ fontSize: "var(--nooni-text-ui)" }}>
                      {price && (
                        <span className="text-nooni-ink-soft">
                          Fra {formatPrice(price.amount, price.currencyCode)}
                          <span className="mx-2">·</span>
                        </span>
                      )}
                      Design dit{" "}
                      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">›</span>
                    </p>
                  </div>
                  <div className="relative mx-6 mt-8 mb-6 aspect-[4/3] overflow-hidden rounded-[20px] md:mx-8 md:mb-8">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 560px, 90vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-nooni-bg">
                        <svg viewBox="0 0 100 100" className="w-1/3" aria-hidden>
                          <ProductShape handle={tile.handle} fill="#E4C9B6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center">
          <Link href="/navnemaerker" className="group inline-flex items-center gap-1 text-nooni-headline" style={{ fontSize: "var(--nooni-text-ui)" }}>
            Sammenlign alle navnemærker
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
