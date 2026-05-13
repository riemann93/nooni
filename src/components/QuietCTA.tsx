/**
 * QuietCTA — closing call-to-action.
 *
 * Single sentence, single button. Calm Nordic restraint per VISION.md
 * principle 5 — no countdowns, no "limited time" framing.
 */

import Link from "next/link";

export default function QuietCTA() {
  return (
    <section
      className="relative z-[1] py-32 text-center"
      data-screen-label="03 CTA"
    >
      <div className="mx-auto max-w-[1280px] px-10">
        <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
          Kom godt i gang
        </span>
        <h3 className="mx-auto mt-4 mb-7 max-w-3xl font-editorial italic text-[clamp(36px,4.5vw,56px)] leading-[1.15] text-nooni-ink">
          Skal vi printe noget{" "}
          <em className="italic text-nooni-headline">
            med dit barns navn på?
          </em>
        </h3>
        <Link
          href="/#produkter"
          className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-6 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
        >
          Vælg dit produkt
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
