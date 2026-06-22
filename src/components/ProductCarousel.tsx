"use client";

import { useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/shopify/products";

interface Props {
  products: ProductSummary[];
  taglinesByHandle: Record<string, string>;
  imageAspect?: string;
}

// Width of each card as % of the carousel viewport, gap between cards in %.
const CARD_W = 34;
const GAP = 3;
const STEP = CARD_W + GAP; // distance the track moves per card

// translateX so that card at `index` is centred in the 100%-wide viewport.
// Position of card[i]'s left edge in the track = i * STEP (in %).
// We want that left edge to land at (50% - CARD_W/2) in the viewport.
// So: trackX + i*STEP = 50 - CARD_W/2  →  trackX = 50 - CARD_W/2 - i*STEP
function trackX(index: number): string {
  return `${50 - CARD_W / 2 - index * STEP}%`;
}

export default function ProductCarousel({ products, taglinesByHandle, imageAspect }: Props) {
  const [active, setActive] = useState(Math.floor(products.length / 2));
  const touchStartX = useRef<number | null>(null);

  const canPrev = active > 0;
  const canNext = active < products.length - 1;

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40 && canNext) setActive((i) => i + 1);
    if (dx > 40 && canPrev) setActive((i) => i - 1);
  }

  return (
    // Outer wrapper — `relative` anchors the arrows, extra px makes
    // room so the arrow buttons aren't clipped by overflow:hidden.
    <div className="relative px-10">
      {/* Clipping container — fades edges with mask */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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
                sizes="(min-width: 1024px) 30vw, 60vw"
                imageAspect={imageAspect ?? "aspect-[3/4.4]"}
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
        className="absolute left-0 top-1/3 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#B48383]/30 text-[#B48383] shadow-sm transition hover:scale-105 disabled:opacity-0"
        style={{ background: "rgba(180,131,131,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        ←
      </button>

      {/* Next arrow */}
      <button
        onClick={() => setActive((i) => i + 1)}
        disabled={!canNext}
        aria-label="Næste produkt"
        className="absolute right-0 top-1/3 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#B48383]/30 text-[#B48383] shadow-sm transition hover:scale-105 disabled:opacity-0"
        style={{ background: "rgba(180,131,131,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        →
      </button>
    </div>
  );
}
