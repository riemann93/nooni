/**
 * Navbar — sticky liquid-glass site header.
 *
 * Sits above sections at z-index: 2 so it stays clear of the products
 * grid (z: 1) while still being part of the same stacking layer as the
 * fixed arches (z: 0) behind everything.
 *
 * Wordmark uses Fredoka (display); links/CTA use the body sans.
 */

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[2] w-full">
      <div className="mx-auto max-w-[1280px] px-10 py-4">
        <div className="nooni-glass flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="font-display text-2xl font-medium tracking-tight text-nooni-headline leading-none"
          >
            nooni
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-nooni-ink-soft sm:flex">
            <Link
              href="/#produkter"
              className="transition-colors hover:text-nooni-headline"
            >
              Produkter
            </Link>
            <Link
              href="/om-os"
              className="transition-colors hover:text-nooni-headline"
            >
              Vores historie
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-nooni-headline"
            >
              Kontakt
            </Link>
          </nav>

          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-4 py-2 text-xs text-white transition-colors hover:bg-[#9d6f6f]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            Kurv (0)
          </Link>
        </div>
      </div>
    </header>
  );
}
