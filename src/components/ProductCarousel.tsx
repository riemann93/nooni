"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/shopify/products";

interface Props {
  products: ProductSummary[];
  taglinesByHandle: Record<string, string>;
}

export default function ProductCarousel({ products, taglinesByHandle }: Props) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + products.length) % products.length);
  const next = () => setActive((i) => (i + 1) % products.length);

  return (
    <div className="relative flex items-center">
      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Forrige produkt"
        className="absolute left-0 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-nooni-line-soft bg-white/80 text-nooni-ink shadow-sm backdrop-blur-sm transition hover:bg-white"
      >
        ←
      </button>

      {/* Cards */}
      <div className="mx-10 flex w-full items-center justify-center gap-3 overflow-hidden">
        {products.map((product, i) => {
          const offset = (i - active + products.length) % products.length;
          // 0 = active, 1 = next, length-1 = prev
          const isActive = offset === 0;
          const isSide = offset === 1 || offset === products.length - 1;

          if (!isActive && !isSide) return null;

          return (
            <div
              key={product.handle}
              className="transition-all duration-300"
              style={{
                width: isActive ? "52%" : "24%",
                opacity: isActive ? 1 : 0.35,
                pointerEvents: isActive ? "auto" : "none",
                flexShrink: 0,
              }}
            >
              <ProductCard
                product={product}
                tagline={taglinesByHandle[product.handle]}
                sizes="(min-width: 640px) 40vw, 52vw"
              />
            </div>
          );
        })}
      </div>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Næste produkt"
        className="absolute right-0 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-nooni-line-soft bg-white/80 text-nooni-ink shadow-sm backdrop-blur-sm transition hover:bg-white"
      >
        →
      </button>
    </div>
  );
}
