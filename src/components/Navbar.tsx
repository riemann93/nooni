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
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[2] w-full">
      <div className="relative mx-auto max-w-[1280px] px-4 py-4 md:px-6">
        <div className="nooni-glass flex items-center justify-between px-7 py-4 md:px-8">
          <Link href="/" aria-label="Nooni — forsiden">
            <Logo className="text-3xl md:text-4xl" />
          </Link>

          <nav className="hidden items-center gap-8 lg:gap-10 text-base text-nooni-ink-soft sm:flex">
            <Link
              href="/navnemaerker"
              className="font-medium text-nooni-headline transition-colors hover:text-nooni-ink"
            >
              Navnemærker
            </Link>
            <Link
              href="/produkter"
              className="transition-colors hover:text-nooni-headline"
            >
              Alle produkter
            </Link>
            <Link
              href="/om-os"
              className="transition-colors hover:text-nooni-headline"
            >
              Om Nooni
            </Link>
            <Link
              href="/kontakt"
              className="transition-colors hover:text-nooni-headline"
            >
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <CartPill />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
