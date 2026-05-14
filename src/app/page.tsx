/**
 * Under-construction page — production branch only.
 *
 * Soft-launch holder for nooni.dk until the real site is ready to ship.
 * Nooni wordmark + "Kommer snart" + Instagram link. No nav, no products,
 * no arches — intentionally quiet.
 *
 * When the real site is ready, merge main → production and this file
 * is replaced by the full homepage.
 */

export default function UnderConstruction() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-display text-7xl sm:text-8xl font-medium text-nooni-headline tracking-tight leading-none">
        nooni
      </h1>

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
