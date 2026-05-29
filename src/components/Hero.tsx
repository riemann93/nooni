/**
 * Hero — resting state.
 *
 * Source: design/homepage-spec.md §1 + design/sketch-homepage-layout.jpg.
 *
 * What this renders:
 *   - A full-content-width rounded frame, 3:2 on desktop, taller on mobile
 *   - Full-bleed lifestyle photo (placeholder `familie_1.jpg` until
 *     Camilla's new product shots land — same aspect, similar palette)
 *   - A cream wash veiling the left third so the copy stays legible
 *   - Left-aligned stack: small label, "Dots" headline, description,
 *     "Design din egen" CTA
 *
 * Not yet wired (deferred — possibly past Dalager Marked):
 *   - The expand-on-click configurator
 *   - The basketball-arc cart animation
 */

import Image from "next/image";
import Link from "next/link";

const HERO_PHOTO = {
  src: "/images/familie_1.jpg",
  alt:
    "Familie i hverdagen — placeholderfoto med samme farveunivers som de" +
    " kommende Dots-produktbilleder",
};

/** Border-radius of the photo frame, in px. */
const PHOTO_RADIUS = 28;

export default function Hero() {
  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-[45px] md:px-10 md:pt-16">
        <div className="relative aspect-[4/5] md:aspect-[3/2]">
          <div
            className="absolute inset-0 overflow-hidden bg-nooni-bg-warm"
            style={{ borderRadius: PHOTO_RADIUS }}
          >
            <Image
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1232px, 100vw"
              // Mirrored horizontally so the in-focus subject sits on the
              // left, where the cream wash + copy veil it — keeping the
              // headline legible over the quieter side of the frame.
              className="object-cover -scale-x-100"
            />

            {/*
             * Cream wash on the left. Stronger / wider on mobile so the
             * copy survives over busier crops of the photo. The right
             * side fades fully so the photo stays the dominant element.
             */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right," +
                  " rgba(247,239,229,0.96) 0%," +
                  " rgba(247,239,229,0.82) 35%," +
                  " rgba(247,239,229,0.0) 70%)",
              }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[78%] px-6 md:max-w-[46%] md:px-14">
                <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
                  Personlige mærker til dit tøj
                </p>

                <h1 className="mt-5 font-editorial italic leading-none text-nooni-headline text-[clamp(64px,9vw,128px)]">
                  Dots
                </h1>

                <p className="mt-5 max-w-sm font-editorial text-lg leading-relaxed text-nooni-ink-soft">
                  Dots er personlige mærker til lynlåsen,
                  <br />
                  fåes med symbol eller navn.
                  <br />
                  Designet og produceret i Danmark.
                </p>

                <Link
                  href="/produkter/dots-med-navn-3stk"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3.5 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
                >
                  Design din egen
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
