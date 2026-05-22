/**
 * Footer — the closing element. Site-wide.
 *
 * Mounted in src/app/layout.tsx so it appears at the bottom of every
 * page.
 *
 * Shape: the same pill silhouette used by HowItWorks, Story and
 * BlogTeaser — top corners rounded with `2rem`, bottom corners square,
 * full content width. The flat bottom edge sits flush against the
 * viewport bottom so the footer reads as the page's actual end.
 *
 * We tried a true 2:1 semi-circle dome here and it didn't survive
 * Camilla's review — too theatrical, didn't match the other sections.
 * The pill shape keeps the footer cohesive with everything above.
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
      className="relative z-[1] bg-nooni-bg pt-16 md:pt-24"
      data-screen-label="Footer"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div
          className="bg-nooni-bg-warm px-8 py-14 text-center shadow-sm md:px-16 md:py-18"
          style={{ borderRadius: "2rem 2rem 0 0" }}
        >
          <Link
            href="/"
            aria-label="Nooni — forsiden"
            className="inline-block"
          >
            <Logo className="text-3xl md:text-4xl" />
          </Link>

          <p className="mx-auto mt-6 max-w-[460px] font-editorial text-base leading-relaxed text-nooni-ink-soft md:text-lg">
            Spørgsmål, særlige ønsker, eller bare en god idé? Vi svarer hurtigt.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-6 py-3 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
            >
              Skriv til os
              <span aria-hidden>→</span>
            </Link>

            <a
              href="mailto:hej@nooni.dk"
              className="flex items-center gap-2 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
            >
              <MailIcon />
              <span className="font-sans text-[14px]">hej@nooni.dk</span>
            </a>

            <a
              href="https://www.instagram.com/hej.nooni/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
            >
              <InstagramIcon />
              <span className="font-sans text-[14px]">@hej.nooni</span>
            </a>
          </div>

          <div className="mt-8 space-y-1 text-xs tracking-[0.12em] text-nooni-ink-soft/70">
            <p>Nooni v/Camilla Riemann Sinnbeck · Storegade 47, Borris · 6900 Skjern</p>
            <p>© {new Date().getFullYear()} Nooni — lavet med kærlighed i Danmark</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
