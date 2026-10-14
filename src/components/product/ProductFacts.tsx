/**
 * ProductFacts: the facts block (material, size, mounting, washing, age).
 * Data comes from src/lib/product-meta.ts. Unknown facts are flagged for
 * Camilla outside production and hidden on the live shop. Never invent a
 * claim here.
 */

import { NAME_TAG_FACTS, getProductMeta, isNameTag, type ProductFacts as Facts } from "@/lib/product-meta";
import { SHOW_UNKNOWN_FACTS } from "./showPlaceholders";

const ROWS: { key: keyof Facts; label: string }[] = [
  { key: "material", label: "Materiale" },
  { key: "size", label: "Størrelse" },
  { key: "mounting", label: "Montering" },
  { key: "washing", label: "Vask" },
  { key: "age", label: "Alder" },
];

export default function ProductFacts({ handle }: { handle: string }) {
  const facts: Facts = { ...(isNameTag(handle) ? NAME_TAG_FACTS : {}), ...getProductMeta(handle).facts };
  const rows = ROWS.filter((r) => facts[r.key] || SHOW_UNKNOWN_FACTS);
  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="fakta" className="mt-16 md:mt-24">
      <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
        Fakta
      </p>
      <h2
        id="fakta"
        className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
        style={{ fontSize: "var(--nooni-text-heading-md)" }}
      >
        Det skal du <em className="italic text-nooni-headline">vide</em>
      </h2>
      <dl className="mt-8 divide-y divide-nooni-line-soft rounded-[2rem] bg-nooni-bg-warm px-6 py-2 md:px-10">
        {rows.map((r) => (
          <div key={r.key} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="font-medium text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
              {r.label}
            </dt>
            <dd style={{ fontSize: "var(--nooni-text-body)" }} className="text-nooni-ink-soft">
              {facts[r.key] ?? <span className="italic text-nooni-headline">Camilla udfylder</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
