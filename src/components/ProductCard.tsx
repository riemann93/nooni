/**
 * ProductCard — square liquid-glass card for the products grid.
 *
 * Square (aspect-ratio: 1 / 1) on the art block, content below.
 */

import Link from "next/link";
import * as React from "react";
import GlassSurface from "./GlassSurface";

export interface ProductCardProps {
  name: string;
  tag: string;
  price: string;
  description: string;
  href: string;
  /** Square illustration component — see components/product-art/. */
  art: React.ReactNode;
}

export default function ProductCard({
  name,
  tag,
  price,
  description,
  href,
  art,
}: ProductCardProps) {
  return (
    <GlassSurface as={Link} href={href} className="group flex flex-col p-5">
      <div className="aspect-square overflow-hidden rounded-xl">{art}</div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-editorial text-3xl italic font-medium text-nooni-headline tracking-tight">
          {name}
        </h3>
        <span className="text-sm text-nooni-ink-soft whitespace-nowrap">{price}</span>
      </div>

      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-nooni-sub">
        {tag}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-nooni-ink-soft flex-1">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-nooni-headline">
        Tilpas dit eget
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </GlassSurface>
  );
}
