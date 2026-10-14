import { STORE_FACTS } from "@/lib/store-facts";

/**
 * ValueStrip: the USP band right under the hero. Delivery and shipping
 * wording comes from the store facts (the Shopify policies), so the
 * strip can't promise what checkout doesn't deliver.
 *
 * Two columns on mobile, one row from md up.
 *
 * Solid background (no .glass). It sits above the arches; the strip
 * is a punctuation mark in the layout so the arches are deliberately
 * hidden behind it.
 */

const ITEMS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <path d="M3 12l2 2 4-4M3 6l2 2 4-4M3 18l2 2 4-4M14 7h7M14 12h7M14 17h7" />,
    text: "Printet hjemme hos os",
  },
  {
    icon: <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v5l3 3" />,
    text: STORE_FACTS.dispatch,
  },
  {
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    text: "Med dit barns navn eller symbol",
  },
  {
    icon: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    ),
    text: STORE_FACTS.shippingPrice,
  },
];

export default function ValueStrip() {
  return (
    <section aria-label="Fordele ved Nooni" className="relative z-[1] border-y border-nooni-line-soft bg-nooni-bg py-4 md:py-5" data-screen-label="02 Value">
      <ul className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-3 px-4 md:flex md:flex-wrap md:items-center md:justify-between md:gap-8 md:px-10">
        {ITEMS.map(({ icon, text }, i) => (
          <li
            key={i}
            className="inline-flex items-center gap-2.5 text-[13px] leading-snug text-nooni-ink-soft tracking-[0.03em] md:gap-3"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-nooni-sub"
            >
              {icon}
            </svg>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
