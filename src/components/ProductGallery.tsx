"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { ReactNode } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  overlay?: ReactNode;
}

export default function ProductGallery({
  images,
  productTitle,
  overlay,
}: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;
  const active = images[activeIdx] ?? images[0];
  const hasMultiple = images.length > 1;

  const goPrev = () =>
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-nooni-bg-warm">
        <Image
          key={active.url}
          src={active.url}
          alt={active.altText ?? productTitle}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover scale-110 transition-transform duration-500 hover:scale-125"
          priority
        />

        {hasMultiple && (
          <>
            <ArrowButton direction="prev" onClick={goPrev} label="Forrige billede" />
            <ArrowButton direction="next" onClick={goNext} label="Næste billede" />
          </>
        )}

        {overlay && (
          <div className="pointer-events-none absolute bottom-4 right-4">
            {overlay}
          </div>
        )}
      </div>

      {/* Thumbnail carousel */}
      {hasMultiple && (
        <div className="relative mt-4">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-nooni-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-nooni-bg to-transparent" />

          {/* Scrollable strip — py-1 gives ring room so it isn't clipped */}
          <div
            ref={thumbsRef}
            className="flex gap-3 overflow-x-auto px-1 py-1 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((img, i) => {
              const selected = i === activeIdx;
              return (
                <button
                  key={img.url}
                  type="button"
                  onClick={(e) => {
                    setActiveIdx(i);
                    // If near right edge, scroll forward to reveal next items
                    const btn = e.currentTarget;
                    const container = thumbsRef.current;
                    if (container) {
                      const btnRight = btn.offsetLeft + btn.offsetWidth;
                      const visibleRight = container.scrollLeft + container.clientWidth;
                      if (btnRight > visibleRight - btn.offsetWidth) {
                        container.scrollBy({ left: btn.offsetWidth * 2, behavior: "smooth" });
                      }
                    }
                  }}
                  aria-label={`Vis billede ${i + 1} af ${images.length}`}
                  aria-pressed={selected}
                  className={`relative aspect-square w-[19%] flex-none overflow-hidden rounded-lg bg-nooni-bg-warm transition-all [scroll-snap-align:start] ${
                    selected
                      ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}

function ArrowButton({ direction, onClick, label }: ArrowButtonProps) {
  const positionClass = direction === "prev" ? "left-3 md:left-4" : "right-3 md:right-4";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 ${positionClass} -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-nooni-ink shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/95 focus-visible:scale-110 focus-visible:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nooni-headline`}
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
