"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { ReactNode } from "react";
import type { GalleryItem } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: GalleryItem[];
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
        {active.videoSources ? (
          // Product video: muted autoplay loop, like a short reel. The
          // preview frame shows until the video loads. Controls let the
          // visitor pause; playsInline keeps iOS from going fullscreen.
          <video
            key={active.url}
            poster={active.url}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={active.altText ?? productTitle}
          >
            {/* Smallest first is fine for mobile; browsers take the first playable source. */}
            {pickVideoSources(active.videoSources).map((src) => (
              <source key={src.url} src={src.url} type={src.mimeType} />
            ))}
          </video>
        ) : (
          <Image
            key={active.url}
            src={active.url}
            alt={active.altText ?? productTitle}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover scale-110 transition-transform duration-500 hover:scale-125"
            preload
          />
        )}

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
          <div className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-10 bg-gradient-to-r from-nooni-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-10 bg-gradient-to-l from-nooni-bg to-transparent" />

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
                    const btn = e.currentTarget;
                    const container = thumbsRef.current;
                    if (container) {
                      const btnRight = btn.offsetLeft + btn.offsetWidth;
                      const btnLeft = btn.offsetLeft;
                      const visibleRight = container.scrollLeft + container.clientWidth;
                      const visibleLeft = container.scrollLeft;
                      if (btnRight > visibleRight - btn.offsetWidth) {
                        container.scrollBy({ left: btn.offsetWidth * 2, behavior: "smooth" });
                      } else if (btnLeft < visibleLeft + btn.offsetWidth) {
                        container.scrollBy({ left: -btn.offsetWidth * 2, behavior: "smooth" });
                      }
                    }
                  }}
                  aria-label={`Vis ${img.videoSources ? "video" : "billede"} ${i + 1} af ${images.length}`}
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
                  {img.videoSources && <PlayBadge />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Prefer a mid-size rendition (~720p) so the main view looks sharp
 * without pulling a full-HD file on mobile; keep the rest as fallbacks.
 */
function pickVideoSources(sources: NonNullable<GalleryItem["videoSources"]>) {
  const preferred = sources.find((s) => s.height >= 720) ?? sources[sources.length - 1];
  return [preferred, ...sources.filter((s) => s !== preferred)];
}

function PlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-nooni-ink shadow-sm">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <polygon points="7 4 20 12 7 20" />
        </svg>
      </span>
    </span>
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
