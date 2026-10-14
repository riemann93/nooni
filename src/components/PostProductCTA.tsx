/**
 * PostProductCTA: in-post card pointing at the matching name-tag
 * product and the /navnemaerker hub. Keeps the blog in service of the
 * shop; the card is quiet and sits after the first section of a post.
 */

import Link from "next/link";

const PRODUCTS: Record<string, { name: string; line: string }> = {
  "loops-navn": {
    name: "Loops",
    line: "Navnemærket med dit barns navn, der sidder fast i vask efter vask.",
  },
  "dots-med-navn-3stk": {
    name: "Dots med navn",
    line: "Små navnemærker til sutteflasker, drikkedunke og madkasser.",
  },
};

export default function PostProductCTA({ handle }: { handle: string }) {
  const product = PRODUCTS[handle] ?? PRODUCTS["loops-navn"];
  const href = PRODUCTS[handle] ? `/produkter/${handle}` : "/produkter/loops-navn";

  return (
    <aside
      aria-label="Navnemærker fra Nooni"
      className="my-10 rounded-[2rem] bg-nooni-bg-warm px-7 py-8 md:px-10 md:py-9"
      style={{ clear: "both" }}
    >
      <span className="text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium">
        Navnemærker fra Nooni
      </span>
      <h2
        className="mt-3 font-editorial leading-[1.15] text-nooni-ink"
        style={{ fontSize: "var(--nooni-text-heading-sm)" }}
      >
        {product.name}
      </h2>
      <p
        className="mt-2 max-w-[520px] font-editorial leading-relaxed text-nooni-ink-soft"
        style={{ fontSize: "var(--nooni-text-body-lg)" }}
      >
        {product.line}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={href}
          className="inline-flex items-center rounded-full bg-nooni-headline px-6 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
          style={{ fontSize: "var(--nooni-text-ui)" }}
        >
          Se {product.name}
        </Link>
        <Link
          href="/navnemaerker"
          className="text-nooni-headline underline underline-offset-4"
          style={{ fontSize: "var(--nooni-text-ui)" }}
        >
          Alle navnemærker
        </Link>
      </div>
    </aside>
  );
}
