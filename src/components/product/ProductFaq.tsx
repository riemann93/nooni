/**
 * ProductFaq: product questions. Answers only state what is true today
 * (store policies from src/lib/store-facts.ts, the 3D-print post, the
 * facts in product-meta.ts). Washing, mounting and age answers wait for
 * Camilla and are hidden on the live shop until filled in. No FAQPage
 * JSON-LD.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { STORE_FACTS } from "@/lib/store-facts";
import { NAME_TAG_FACTS, getProductMeta, isNameTag } from "@/lib/product-meta";
import { SHOW_UNKNOWN_FACTS } from "./showPlaceholders";

interface Qa {
  q: string;
  a: ReactNode;
}

export default function ProductFaq({ handle }: { handle: string }) {
  const nameTag = isNameTag(handle);
  const facts = { ...(nameTag ? NAME_TAG_FACTS : {}), ...getProductMeta(handle).facts };
  const pending = <em className="italic text-nooni-headline">Camilla udfylder svaret</em>;

  const fromFacts = (q: string, answer?: string): Qa[] =>
    answer ? [{ q, a: answer }] : SHOW_UNKNOWN_FACTS ? [{ q, a: pending }] : [];

  const items: Qa[] = [
    {
      q: "Hvordan bliver det lavet?",
      a: "Det bliver 3D-printet lag for lag af Camilla i Vestjylland. Ved navnemærkerne er navnet en del af selve mærket, ikke et klistermærke.",
    },
    ...fromFacts(nameTag ? "Tåler navnemærket vask?" : "Tåler det vask?", facts.washing),
    ...fromFacts("Hvordan sætter jeg det på?", facts.mounting),
    ...fromFacts("Hvilken alder passer det til?", facts.age),
    {
      q: "Hvor hurtigt kommer det?",
      a: `${STORE_FACTS.dispatch}. ${STORE_FACTS.delivery}. ${STORE_FACTS.shippingPrice}.`,
    },
    {
      q: "Kan jeg returnere det?",
      a: `Ja. Du har ${STORE_FACTS.withdrawal} og ${STORE_FACTS.complaint}. Læs mere på siden om returnering.`,
    },
  ];

  return (
    <section aria-labelledby="faq" className="mt-16 md:mt-24">
      <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
        Spørgsmål
      </p>
      <h2
        id="faq"
        className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
        style={{ fontSize: "var(--nooni-text-heading-md)" }}
      >
        Ofte stillede <em className="italic text-nooni-headline">spørgsmål</em>
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        {items.map((item) => (
          <details key={item.q} className="group rounded-[1.5rem] bg-nooni-bg-warm px-6 py-4">
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-body-lg)" }}
            >
              {item.q}
              <span aria-hidden="true" className="text-nooni-headline transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
      {nameTag && (
        <p className="mt-6 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
          Vil du vide mere? Se alt om{" "}
          <Link href="/navnemaerker" className="text-nooni-headline underline underline-offset-4">
            navnemærker
          </Link>
          .
        </p>
      )}
    </section>
  );
}
