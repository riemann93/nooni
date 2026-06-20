"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/produkter", label: "Produkter" },
  { href: "/om-os", label: "Min historie" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Luk menu" : "Åbn menu"}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full transition-colors hover:bg-nooni-bg-warm"
      >
        <span
          className={`block h-[1.5px] w-5 bg-nooni-ink transition-transform duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-nooni-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-nooni-ink transition-transform duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-4 right-4 top-[calc(100%+8px)] rounded-2xl border border-nooni-line-soft bg-[#FFFCF7] px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-base transition-colors ${
                  pathname === href
                    ? "font-medium text-nooni-headline"
                    : "text-nooni-ink-soft hover:text-nooni-headline"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
