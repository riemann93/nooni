"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/shopify/products";

interface Props {
  products: ProductSummary[];
  taglinesByHandle: Record<string, string>;
}

// Card width as % of the carousel container, gap as % between cards.
const CARD_W = 54;
const GAP = 4;
const STEP = CARD_W + GAP; // how far the track moves per card

// translateX so the card at `index` is centred in the viewport.
// Center = 50% - CARD_W/2 - index * STEP
function trackX(index: number) {
  return 50 - CARD_W / 2 - index * STEP;
}

export default function ProductCarousel({ products, taglinesByHandle }: Props) {
  // Start on the middle card
  const [active, setActive] = useState(Math.floor(products.length / 2));

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(products.length - 1, i));

  return (
    <div className="relative">
      {/* Overflow clip */}
      <div className="overflow-hidden">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{
            transform: `translateX(${trackX(active)}%)`,
            gap: `${GAP}%`,
          }}
        >
          {products.map((product, i) => (
            <div
              key={product.handle}
              className="shrink-0 transition-opacity duration-400"
              style={{
                width: `${CARD_W}%`,
                opacity: i === active ? 1 : 0.3,
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <ProductCard
                product={product}
                tagline={taglinesByHandle[product.handle]}
                sizes="54vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {active > 0 && (
        <button
          onClick={prev}
          aria-label="Forrige produkt"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-nooni-line-soft bg-white/90 text-nooni-ink shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          ←
        </button>
      )}
      {active < products.length - 1 && (
        <button
          onClick={next}
          aria-label="Næste produkt"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-nooni-line-soft bg-white/90 text-nooni-ink shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          →
        </button>
      )}
    </div>
  );
}
