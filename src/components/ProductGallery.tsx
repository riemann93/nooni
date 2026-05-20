/**
 * ProductGallery — main image + clickable thumbnails for the product
 * detail page.
 *
 * Client component because the active-image state lives in React. The
 * main image swaps without a network round-trip; Next/Image keeps each
 * URL primed in its own srcset.
 *
 * Thumbnails only render when there's more than one image. With a
 * single image the component degrades to the same square frame the
 * page used before.
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
}

export default function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (images.length === 0) return null;
  const active = images[activeIdx] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-nooni-bg-warm">
        <Image
          key={active.url}
          src={active.url}
          alt={active.altText ?? productTitle}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
          {images.map((img, i) => {
            const selected = i === activeIdx;
            return (
              <button
                key={img.url}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`Vis billede ${i + 1} af ${images.length}`}
                aria-pressed={selected}
                className={`relative aspect-square overflow-hidden rounded-lg bg-nooni-bg-warm transition-all ${
                  selected
                    ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
