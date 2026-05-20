/**
 * Contact — homepage closing CTA section.
 *
 * One arched-top "doorway" container holding the eyebrow + headline +
 * intro copy + contact links. Sits on the page background; the
 * earlier wide-shallow outer arch backdrop was removed because the
 * two arches in Camilla's sketch were iterations on the same shape,
 * not stacked elements.
 *
 * The site-wide <Footer /> mounted in layout.tsx now owns the
 * copyright line — keep it out of here.
 */

import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="relative z-[1] bg-nooni-bg pt-24 pb-0 md:pt-32"
      data-screen-label="06 Kontakt"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div
          className="mx-auto max-w-[880px] overflow-hidden bg-nooni-bg-warm px-10 pt-16 pb-14 text-center shadow-sm md:px-16 md:pt-20"
          style={{ borderRadius: "9999px 9999px 0 0" }}
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub after:h-px after:w-7 after:bg-nooni-sub">
            Sig hej
          </span>

          <h2 className="mt-5 font-editorial text-[clamp(40px,5vw,64px)] leading-[1.05] text-nooni-ink">
            Kontakt
          </h2>

          <p className="mx-auto mt-6 max-w-[460px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
            Spørgsmål, særlige ønsker, eller bare en god idé? Vi svarer hurtigt.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3.5 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
            >
              Skriv til os
              <span aria-hidden>→</span>
            </Link>

            <a
              href="mailto:hej@nooni.dk"
              className="flex items-center gap-2.5 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
            >
              <MailIcon />
              <span className="font-sans text-[15px]">hej@nooni.dk</span>
            </a>

            <a
              href="https://www.instagram.com/hej.nooni/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
            >
              <InstagramIcon />
              <span className="font-sans text-[15px]">@hej.nooni</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
