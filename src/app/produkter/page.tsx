/**
 * /produkter — the full product listing page.
 *
 * Fetches every published product from Shopify and renders the
 * shared <ProductCard /> for each. No filtering, sorting, or
 * pagination yet — the catalogue is small enough that one round-trip
 * and a flat grid are fine. Order is whatever Shopify returns by
 * default.
 *
 * Caching: ISR via Next's fetch cache, 60s — matches the homepage
 * row and the product detail page.
 */

import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Alle produkter — Nooni",
  description:
    "Se hele Noonis sortiment: Dots, Loops, Emblem, Deks og mere.",
};

export default async function ProductsListingPage() {
  const products = await getAllProducts();

  return (
    <section
      className="bg-nooni-bg py-[45px]"
      data-screen-label="Produkter"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
            Sortimentet
          </p>
          <h1 className="mt-4 font-editorial text-[clamp(36px,4.5vw,60px)] leading-[1.08] tracking-tight text-nooni-ink">
            Alle{" "}
            <em className="italic text-nooni-headline">produkter</em>
          </h1>
        </div>

        {products.length === 0 ? (
          <p className="font-editorial text-lg text-nooni-ink-soft">
            Ingen produkter at vise lige nu.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
