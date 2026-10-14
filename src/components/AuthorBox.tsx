/**
 * AuthorBox: Camilla's byline at the end of every Gode råd post.
 * E-E-A-T signal (CONTENT-PLAN.md): real person, real background, link
 * to /om-os, where the matching Person schema lives.
 */

import Image from "next/image";
import Link from "next/link";

export default function AuthorBox() {
  return (
    <aside
      aria-label="Om forfatteren"
      className="mt-14 flex items-center gap-6 rounded-[2rem] bg-nooni-bg-warm p-6 md:p-8"
    >
      <div
        className="relative h-24 w-20 shrink-0 overflow-hidden md:h-28 md:w-24"
        style={{ borderRadius: "9999px 9999px 16px 16px" }}
      >
        <Image
          src="/images/familie_2.jpg"
          alt="Camilla fra Nooni"
          fill
          sizes="96px"
          className="object-cover object-top"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-nooni-sub">
          Skrevet af
        </p>
        <p className="mt-1 font-editorial text-2xl text-nooni-ink">Camilla</p>
        <p className="mt-1 font-editorial text-base leading-relaxed text-nooni-ink-soft">
          Lærer og mor til to. Jeg designer og printer Noonis navnemærker
          hjemme i Borris.{" "}
          <Link
            href="/om-os"
            className="text-nooni-headline underline underline-offset-4"
          >
            Læs min historie
          </Link>
        </p>
      </div>
    </aside>
  );
}
