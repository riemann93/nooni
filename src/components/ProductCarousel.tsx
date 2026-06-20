"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/shopify/products";

interface Props {
  products: ProductSummary[];
  taglinesByHandle: Record<string, string>;
}

// Width of each card as % of the carousel viewport, gap between cards in %.
const CARD_W = 57;
const GAP = 5;
const STEP = CARD_W + GAP; // distance the track moves per card

// translateX so that card at `index` is centred in the 100%-wide viewport.
// Position of card[i]'s left edge in the track = i * STEP (in %).
// We want that left edge to land at (50% - CARD_W/2) in the viewport.
// So: trackX + i*STEP = 50 - CARD_W/2  →  trackX = 50 - CARD_W/2 - i*STEP
function trackX(index: number): string {
  return `${50 - CARD_W / 2 - index * STEP}%`;
}

export default function ProductCarousel({ products, taglinesByHandle }: Props) {
  const [active, setActive] = useState(Math.floor(products.length / 2));

  const canPrev = active > 0;
  const canNext = active < products.length - 1;

  return (
    // Outer wrapper — `relative` anchors the arrows, extra px makes
    // room so the arrow buttons aren't clipped by overflow:hidden.
    <div className="relative px-10">
      {/* Clipping container — only clips horizontally */}
      <div className="overflow-hidden">
        {/* Sliding track — width is auto so cards lay out naturally */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            gap: `${GAP}%`,
            transform: `translateX(${trackX(active)})`,
          }}
        >
          {products.map((product, i) => (
            <div
              key={product.handle}
              className="shrink-0 transition-opacity duration-300"
              style={{
                width: `${CARD_W}%`,
                opacity: i === active ? 1 : 0.3,
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <ProductCard
                product={product}
                tagline={taglinesByHandle[product.handle]}
                sizes={`${CARD_W}vw`}
                imageAspect="aspect-[3/4.4]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous arrow */}
      <button
        onClick={() => setActive((i) => i - 1)}
        disabled={!canPrev}
        aria-label="Forrige produkt"
        className="absolute left-0 top-1/3 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-nooni-line-soft bg-white text-nooni-ink shadow-sm transition hover:bg-nooni-bg-warm disabled:opacity-0"
      >
        ←
      </button>

      {/* Next arrow */}
      <button
        onClick={() => setActive((i) => i + 1)}
        disabled={!canNext}
        aria-label="Næste produkt"
        className="absolute right-0 top-1/3 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-nooni-line-soft bg-white text-nooni-ink shadow-sm transition hover:bg-nooni-bg-warm disabled:opacity-0"
      >
        →
      </button>
    </div>
  );
}
