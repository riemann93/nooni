/**
 * ProductsGrid — "Mest populære" row below the Hero.
 *
 * Per design/homepage-spec.md §2: three pre-selected products in a
 * single row on desktop, followed by a "Se alle produkter" link that
 * routes to the /produkter listing page.
 *
 * Server-rendered with ISR (60s). Card visuals live in <ProductCard />
 * so the homepage row and the listing page stay in lockstep.
 *
 * Currently hand-picked: Loops, Emblem, Deks. The fourth product
 * (Tic Tac Take — a game, different category) was dropped to land
 * the three-up grid; final selection is still Camilla's call per
 * spec §2 "Open product questions".
 */

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByHandles } from "@/lib/shopify/products";

export const revalidate = 60;

interface CardCopy {
  handle: string;
  tagline: string;
}

const CARDS: CardCopy[] = [
  { handle: "loops", tagline: "Til tasker & nøgler" },
  { handle: "emblem", tagline: "Større mærker med motiv" },
  { handle: "deks-single", tagline: "Korteholder til kortspil" },
];

export default async function ProductsGrid() {
  const products = await getProductsByHandles(CARDS.map((c) => c.handle));
  const taglinesByHandle = new Map(CARDS.map((c) => [c.handle, c.tagline]));

  return (
    <section
      id="produkter"
      className="bg-nooni-bg py-[45px]"
      data-screen-label="03 Products"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-8 py-12 md:px-12 md:py-14">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Mest populære
            </p>
            <h2 className="mt-4 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-tight text-nooni-ink">
              Mere end{" "}
              <em className="italic text-nooni-headline">personlige mærker</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-y-12 sm:gap-x-8 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.handle}
                product={product}
                tagline={taglinesByHandle.get(product.handle)}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 rounded-full border border-nooni-sub px-7 py-3 text-sm text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
            >
              Se alle produkter
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
