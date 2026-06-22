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
  src: "/images/DSC04432.JPG",
  alt: "Dots personlige mærker til tøj",
};

/** Border-radius of the photo frame, in px. */
const PHOTO_RADIUS = 28;

export default function Hero() {
  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-5 md:px-10 md:pt-4 md:pb-8 lg:pt-6 lg:pb-[45px]">
        <div className="relative aspect-[1/1] md:aspect-[4/3] lg:aspect-[15/8]">
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
              className="object-cover object-[center_10%] brightness-[1.35] scale-110 lg:scale-125"
            />

            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right," +
                  " rgba(247,239,229,0.96) 0%," +
                  " rgba(247,239,229,0.88) 40%," +
                  " rgba(247,239,229,0.0) 70%," +
                  " rgba(247,239,229,0.0) 100%)",
              }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[85%] px-6 md:max-w-[55%] md:px-10 lg:max-w-[46%] lg:px-14">
                <p className="text-[10px] uppercase tracking-[0.22em] text-nooni-sub md:text-xs">
                  Kortholder til kortspil
                </p>

                <h1 className="mt-3 font-editorial italic leading-none text-nooni-headline text-[clamp(56px,10vw,200px)] md:mt-4 lg:mt-5">
                  Deks
                </h1>

                <p className="mt-3 max-w-sm font-editorial text-sm leading-relaxed text-nooni-ink-soft md:mt-4 md:text-base lg:mt-5 lg:text-lg">
                  Kortholder til når hænderne ikke kan holde alle kort når man spiller. Fåes i flere farver.
                </p>

                <Link
                  href="/produkter/deks-duo"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-nooni-headline px-5 py-2.5 text-xs text-white transition-colors hover:bg-[#9d6f6f] md:mt-6 lg:mt-7 lg:px-7 lg:py-3.5 lg:text-sm"
                >
                  Køb nu
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
