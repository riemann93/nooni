/**
 * 404 page. Keeps the site chrome, points people back into the shop,
 * and is noindex (Next adds it) so Google never lists a dead URL.
 */

import type { Metadata } from "next";
import Link from "next/link";

// Next already sends noindex on 404 responses.
export const metadata: Metadata = {
  title: "Siden findes ikke",
};

export default function NotFound() {
  return (
    <section className="bg-nooni-bg py-[45px]" data-screen-label="404">
      <div className="mx-auto max-w-[640px] px-6 py-16 text-center md:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">404</p>
        <h1 className="mt-4 font-editorial text-[clamp(36px,4.5vw,60px)] leading-[1.08] tracking-tight text-nooni-ink">
          Siden <em className="italic text-nooni-headline">findes ikke</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[440px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
          Måske er den flyttet, eller også er adressen stavet forkert. Prøv
          at kigge i butikken i stedet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/produkter"
            className="inline-flex items-center rounded-full bg-nooni-headline px-6 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
          >
            Se alle produkter
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-nooni-sub px-6 py-3 text-sm text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
          >
            Til forsiden
          </Link>
        </div>
      </div>
    </section>
  );
}
