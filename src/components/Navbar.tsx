import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
      <Link
        href="/"
        className="font-display text-2xl font-semibold text-nooni-headline tracking-wide"
      >
        nooni
      </Link>
      <nav className="flex items-center gap-8 text-sm font-sans text-nooni-sub">
        <Link href="/#produkter" className="hover:text-nooni-headline transition-colors">
          Produkter
        </Link>
        <Link href="/om-os" className="hover:text-nooni-headline transition-colors">
          Om os
        </Link>
        <Link
          href="/#produkter"
          className="rounded-full bg-nooni-warm px-5 py-2 text-white hover:bg-nooni-headline transition-colors"
        >
          Shop
        </Link>
      </nav>
    </header>
  );
}
