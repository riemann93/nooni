/**
 * /produkter — the full product listing page.
 *
 * Fetches every published product from Shopify and renders the
 * shared <ProductCard /> for each, grouped by category: navnemærker
 * first (the core product), then kortspil og spil. Products in
 * UNINDEXED_PRODUCT_HANDLES (the add-on bag) are left out.
 *
 * Caching: ISR via Next's fetch cache, 60s — matches the homepage
 * row and the product detail page.
 */

import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";
import { isNametag, nametagRank } from "@/lib/product-meta";
import { UNINDEXED_PRODUCT_HANDLES, pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Navnemærker til børn og kortspil",
  description:
    "Se Noonis navnemærker til taske, lynlås og overtøj (Loops, Dots med navn og Dots med motiv), og kortspil til børn: Deks, Box og Tic Tac Take.",
  path: "/produkter",
});

const CHIP =
  "rounded-full border border-nooni-ink/15 bg-nooni-bg-warm px-5 py-2 text-nooni-ink transition-colors hover:border-nooni-headline hover:text-nooni-headline";

export default async function ProductsListingPage() {
  const products = (await getAllProducts()).filter(
    (p) => !UNINDEXED_PRODUCT_HANDLES.has(p.handle),
  );
  const nametags = products
    .filter((p) => isNametag(p.handle))
    .sort((a, b) => nametagRank(a.handle) - nametagRank(b.handle));
  const games = products.filter((p) => !isNametag(p.handle));

  const groups = [
    {
      id: "navnemaerker",
      label: "Navnemærker",
      heading: "Navnemærker",
      products: nametags,
      href: "/navnemaerker",
    },
    {
      id: "spil",
      label: "Kortspil og spil",
      heading: "Kortspil og spil",
      products: games,
      href: undefined,
    },
  ].filter((g) => g.products.length > 0);

  return (
    <section
      className="bg-nooni-bg py-[45px]"
      data-screen-label="Produkter"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p
            className="uppercase tracking-[0.22em] text-nooni-sub"
            style={{ fontSize: "var(--nooni-text-label)" }}
          >
            Sortimentet
          </p>
          <h1 className="mt-4 font-editorial text-[clamp(36px,4.5vw,60px)] leading-[1.08] tracking-tight text-nooni-ink">
            <em className="italic text-nooni-headline">Navnemærker</em> og
            kortspil til børn
          </h1>
        </div>

        {groups.length > 0 && (
          <nav
            aria-label="Kategorier"
            className="mb-12 flex flex-wrap gap-3 font-display"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className={CHIP}>
                {g.label}
              </a>
            ))}
          </nav>
        )}

        {products.length === 0 ? (
          <p className="font-editorial text-lg text-nooni-ink-soft">
            Ingen produkter at vise lige nu.
          </p>
        ) : (
          groups.map((g) => (
            <div key={g.id} id={g.id} className="mb-16 scroll-mt-28">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2
                  className="font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                  style={{ fontSize: "var(--nooni-text-heading-md)" }}
                >
                  {g.heading}
                </h2>
                {g.href && (
                  <Link
                    href={g.href}
                    className="font-display text-nooni-headline underline-offset-4 hover:underline"
                    style={{ fontSize: "var(--nooni-text-ui)" }}
                  >
                    Alt om navnemærker
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-3 sm:gap-y-12 sm:gap-x-8">
                {g.products.map((product) => (
                  <ProductCard key={product.handle} product={product} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
