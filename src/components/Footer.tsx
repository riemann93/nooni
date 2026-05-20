/**
 * Footer — the arched closing element. Site-wide.
 *
 * Mounted in src/app/layout.tsx so it appears at the bottom of every
 * page.
 *
 * Shape: a true semi-circle dome the full content width of the page
 * (matches max-w-[1280px] with side padding, same as every other
 * section). Achieved with:
 *   - aspect-ratio: 2 / 1 (width = 2× height)
 *   - border-radius: 50% 50% 0 0 / 100% 100% 0 0 (top corners are
 *     ellipse-radius equal to the full half-axes of the box — at
 *     2:1 that ellipse equals a circle)
 *
 * aspect-ratio is "preferred", not strict — if the content needs more
 * room than width/2 (typical on narrow phones) the box grows taller
 * and the dome becomes a tall ellipse rather than a perfect half
 * circle. That's the right fallback for small screens.
 *
 * Content sits in the lower middle of the dome with flex
 * justify-center, so on wide screens there's quiet empty space at
 * the apex of the curve.
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
      className="relative z-[1] bg-nooni-bg pt-20 md:pt-28"
      data-screen-label="Footer"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div
          className="relative bg-nooni-bg-warm shadow-sm"
          style={{
            aspectRatio: "2 / 1",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center sm:px-16 md:px-24 lg:px-32">
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

            <div className="mt-8 text-xs tracking-[0.12em] text-nooni-ink-soft/70">
              © {new Date().getFullYear()} Nooni — lavet med kærlighed i Danmark
            </div>
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
