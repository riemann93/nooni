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
import CartPill from "./CartPill";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[2] w-full">
      <div className="mx-auto max-w-[1280px] px-10 py-4">
        <div className="nooni-glass flex items-center justify-between px-6 py-3">
          <Link href="/" aria-label="Nooni — forsiden">
            <Logo className="text-2xl" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-nooni-ink-soft sm:flex">
            <Link
              href="/produkter"
              className="transition-colors hover:text-nooni-headline"
            >
              Produkter
            </Link>
            <Link
              href="/om-os"
              className="transition-colors hover:text-nooni-headline"
            >
              Min historie
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-nooni-headline"
            >
              Blog
            </Link>
            <Link
              href="/kontakt"
              className="transition-colors hover:text-nooni-headline"
            >
              Kontakt
            </Link>
          </nav>

          <CartPill />
        </div>
      </div>
    </header>
  );
}
