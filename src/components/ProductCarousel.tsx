"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductSummary } from "@/lib/shopify/products";

interface Props {
  products: ProductSummary[];
  taglinesByHandle: Record<string, string>;
  imageAspect?: string;
}

const GAP = 3;

function getCardW() {
  if (typeof window === "undefined") return 34;
  const w = window.innerWidth;
  if (w <= 375) return 65;
  if (w >= 900) return 34;
  return 65 - ((w - 375) / (900 - 375)) * (65 - 34);
}

function trackX(index: number, cardW: number): string {
  const step = cardW + GAP;
  return `${50 - cardW / 2 - index * step}%`;
}

export default function ProductCarousel({ products, taglinesByHandle, imageAspect }: Props) {
  const [active, setActive] = useState(Math.floor(products.length / 2));
  const [cardW, setCardW] = useState(34);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    function update() { setCardW(getCardW()); }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
    <div className="relative px-6 sm:px-10">
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            gap: `${GAP}%`,
            transform: `translateX(${trackX(active, cardW)})`,
          }}
        >
          {products.map((product, i) => (
            <div
              key={product.handle}
              className="shrink-0 transition-opacity duration-300"
              style={{
                width: `${cardW}%`,
                opacity: i === active ? 1 : 0.3,
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <ProductCard
                product={product}
                tagline={taglinesByHandle[product.handle]}
                sizes="(min-width: 1024px) 30vw, 60vw"
                imageAspect={imageAspect ?? "aspect-[3/4]"}
                eager={i === Math.floor(products.length / 2)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setActive((i) => i - 1)}
        disabled={!canPrev}
        aria-label="Forrige produkt"
        className="absolute left-0 top-1/3 z-[1] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#B48383]/30 text-[#B48383] shadow-sm transition hover:scale-105 disabled:opacity-0"
        style={{ background: "rgba(180,131,131,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        ←
      </button>

      <button
        onClick={() => setActive((i) => i + 1)}
        disabled={!canNext}
        aria-label="Næste produkt"
        className="absolute right-0 top-1/3 z-[1] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#B48383]/30 text-[#B48383] shadow-sm transition hover:scale-105 disabled:opacity-0"
        style={{ background: "rgba(180,131,131,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        →
      </button>
    </div>
  );
}
