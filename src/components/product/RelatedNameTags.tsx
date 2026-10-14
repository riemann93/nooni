/**
 * RelatedNameTags: "Andre navnemærker" row. Name tags are the core
 * product, so every product page (name tag or not) points to the rest of
 * the family and to the /navnemaerker hub.
 */

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { NAME_TAG_HANDLES } from "@/lib/product-meta";
import { getProductsByHandles } from "@/lib/shopify/products";

export default async function RelatedNameTags({ handle }: { handle: string }) {
  const handles = NAME_TAG_HANDLES.filter((h) => h !== handle).slice(0, 3);
  const products = await getProductsByHandles(handles).catch(() => []);
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="andre-navnemaerker" className="mt-16 md:mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
            Navnemærker
          </p>
          <h2
            id="andre-navnemaerker"
            className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
            style={{ fontSize: "var(--nooni-text-heading-md)" }}
          >
            Andre <em className="italic text-nooni-headline">navnemærker</em>
          </h2>
        </div>
        <Link href="/navnemaerker" className="text-nooni-headline underline underline-offset-4" style={{ fontSize: "var(--nooni-text-body)" }}>
          Se alle navnemærker
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
