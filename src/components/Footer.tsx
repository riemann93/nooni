/**
 * Footer — the arched closing element. Site-wide.
 *
 * Mounted in src/app/layout.tsx so it appears at the bottom of every
 * page. The arch shape is the same doorway used by the Story photo
 * and the product cards — a full semicircle top with a flat bottom
 * that sits flush against the page edge.
 *
 * Replaces both the earlier homepage-only Contact section and the
 * earlier 4-column rectangular footer. The single element does both
 * jobs.
 *
 * Content, top to bottom:
 *   - Nooni wordmark (links to home — acts as "scroll to top" when
 *     already on /, navigates home from inner pages)
 *   - Short prompt
 *   - "Skriv til os" primary CTA → /kontakt
 *   - Email + Instagram inline links
 *   - Copyright line
 *
 * Backlog (accepted minor flaws, not blocking soft launch):
 *   - On /kontakt itself, the "Skriv til os" CTA loops back to the
 *     current page. Hide the CTA conditionally on that route when we
 *     touch this again.
 */

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className="relative z-[1] bg-nooni-bg pt-24 md:pt-32"
      data-screen-label="Footer"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div
          className="mx-auto max-w-[880px] overflow-hidden bg-nooni-bg-warm px-10 pt-14 pb-10 text-center shadow-sm md:px-16 md:pt-16"
          style={{ borderRadius: "9999px 9999px 0 0" }}
        >
          <Link href="/" aria-label="Nooni — forsiden" className="inline-block">
            <Logo className="text-3xl" />
          </Link>

          <p className="mx-auto mt-7 max-w-[460px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
            Spørgsmål, særlige ønsker, eller bare en god idé? Vi svarer hurtigt.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
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

          <div className="mt-10 border-t border-nooni-line-soft pt-6 text-xs tracking-[0.12em] text-nooni-ink-soft/70">
            © {new Date().getFullYear()} Nooni — lavet med kærlighed i Danmark
          </div>
        </div>
      </div>
    </footer>
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
