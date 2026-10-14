/**
 * ProductsGrid: "Vores navnemærker" row below the USP strip.
 *
 * Only the name-tag family (Loops, Dots, Emblem). Everything else
 * lives in <MoreFromNooni /> further down, so the first product row a
 * visitor meets is the core product. Ends in "Se alle navnemærker",
 * which routes to the /navnemaerker hub.
 *
 * Mobile: a horizontal snap-scroll row (cards peek at the edge, so it
 * reads as scrollable). Desktop: a four-up grid. Card visuals live in
 * <ProductCard /> so the homepage and the listing stay in lockstep.
 *
 * Server-rendered with ISR (60s). If Shopify is unreachable the row
 * renders without cards rather than breaking the homepage.
 */

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByHandles, type ProductSummary } from "@/lib/shopify/products";

export const revalidate = 60;

interface CardCopy {
  handle: string;
  tagline: string;
}

const CARDS: CardCopy[] = [
  { handle: "dots-med-navn-3stk", tagline: "Til lynlås og overtøj" },
  { handle: "loops", tagline: "Til taske og nøgler" },
  { handle: "emblem", tagline: "Til skoletaske og penalhus" },
  { handle: "dots-5stk", tagline: "Symbol, før barnet kan læse" },
];

async function getNameTags(): Promise<ProductSummary[]> {
  try {
    return await getProductsByHandles(CARDS.map((c) => c.handle));
  } catch {
    return [];
  }
}

export default async function ProductsGrid() {
  const products = await getNameTags();
  const taglinesByHandle = Object.fromEntries(CARDS.map((c) => [c.handle, c.tagline]));

  return (
    <section
      id="navnemaerker"
      className="bg-nooni-bg py-3 md:py-6"
      data-screen-label="03 Navnemærker"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm py-6 md:px-12 md:py-10">
          <div className="mb-5 flex flex-col gap-3 px-5 md:mb-8 md:flex-row md:items-end md:justify-between md:px-0">
            <div className="max-w-2xl">
              <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
                Vores navnemærker
              </p>
              <h2 className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-md)" }}>
                Navnemærker til{" "}
                <em className="italic text-nooni-headline">lynlås, jakke og taske</em>
              </h2>
            </div>
            <Link
              href="/navnemaerker"
              className="hidden shrink-0 items-center gap-2 rounded-full border border-nooni-sub px-6 py-2.5 text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white md:inline-flex"
              style={{ fontSize: "var(--nooni-text-ui)" }}
            >
              Se alle navnemærker
            </Link>
          </div>

          {products.length > 0 && (
            <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] px-5 pt-2 pb-8 scroll-px-5 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-4">
              {products.map((product) => (
                <li key={product.handle} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
                  <ProductCard
                    product={product}
                    tagline={taglinesByHandle[product.handle]}
                    sizes="(min-width: 768px) 25vw, 62vw"
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 flex justify-center px-5 md:hidden">
            <Link
              href="/navnemaerker"
              className="inline-flex items-center gap-2 rounded-full border border-nooni-sub px-7 py-3 text-sm text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
            >
              Se alle navnemærker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
