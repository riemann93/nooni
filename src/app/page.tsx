/**
 * Under-construction page — production branch only.
 *
 * Soft-launch holder for nooni.dk until the real site is ready to ship.
 * Nooni wordmark + "Kommer snart" + Instagram link. No nav, no products,
 * no arches — intentionally quiet.
 *
 * The wordmark is rendered via the canonical <Logo /> component — see
 * BRAND.md for the spec. Do not inline the styling here.
 *
 * When the real site is ready, merge main → production and this file
 * is replaced by the full homepage.
 */

import Logo from "@/components/Logo";

export default function UnderConstruction() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <Logo as="h1" className="text-7xl sm:text-8xl" />

      <p className="mt-8 font-editorial italic text-2xl sm:text-3xl text-nooni-ink-soft">
        Kommer snart
      </p>

      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-nooni-sub">
        Smarte løsninger til familier
      </p>

      <a
        href="https://www.instagram.com/hej.nooni/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-14 text-sm text-nooni-ink-soft hover:text-nooni-headline transition-colors"
      >
        Følg med på Instagram — @hej.nooni
      </a>
    </main>
  );
}
