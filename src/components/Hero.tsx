/**
 * Hero — resting state.
 *
 * Source: design/homepage-spec.md §1, revised so the site feels like
 * Camilla's Instagram: her own face first, her own voice ("jeg"), and
 * the rounded text boxes from her reels (<InstaNote />).
 *
 * What this renders:
 *   - A cream rounded pill, full content width
 *   - Left: a "Hej, jeg er Camilla" note, the headline, a short line in
 *     Camilla's voice, and the Dots CTA (IDENTITY.md: visitors must be
 *     able to go straight to Dots)
 *   - Right: the family photo in the brand's arch frame, with a reel-
 *     style note laid over its bottom edge
 *
 * The photo sits in its own column rather than under a cream wash, so
 * no faces are veiled by the copy.
 *
 * Not yet wired (deferred — possibly past Dalager Marked):
 *   - The expand-on-click configurator
 *   - The basketball-arc cart animation
 */

import Image from "next/image";
import Link from "next/link";
import InstaNote from "@/components/InstaNote";

const HERO_PHOTO = {
  src: "/images/familie_1.jpg",
  alt: "Camilla med sine to piger, familien bag Nooni",
};

export default function Hero() {
  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-5 md:px-10 md:pt-4 md:pb-8 lg:pt-6 lg:pb-[45px]">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div className="order-2 md:order-1">
              <InstaNote variant="blush" className="text-[clamp(15px,1.4vw,19px)]">
                Hej, jeg er Camilla
              </InstaNote>

              <h1
                className="mt-5 font-editorial leading-[1.05] tracking-tight text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-heading-lg)" }}
              >
                Små hjælpere, så dit barn{" "}
                <span className="italic text-nooni-headline">kan selv</span>
              </h1>

              <p
                className="mt-5 max-w-[460px] font-editorial leading-relaxed text-nooni-ink-soft"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                Jeg er mor til to små piger og tidligere lærer. Jeg designer og
                3D-printer ting, der hjælper børn med at klare lidt mere selv.
                Alt bliver printet hjemme hos mig, i lige de farver, du vælger.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/produkter/dots-med-navn-3stk"
                  className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
                  style={{ fontSize: "var(--nooni-text-ui)" }}
                >
                  Design dine Dots
                </Link>
                <Link
                  href="/produkter"
                  className="inline-flex items-center gap-1 py-3 text-nooni-sub transition-colors hover:text-nooni-headline"
                  style={{ fontSize: "var(--nooni-text-ui)" }}
                >
                  Se alle produkter
                  <span aria-hidden>›</span>
                </Link>
              </div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[520px] md:order-2">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_18px_40px_-20px_rgba(120,80,70,0.45)]"
                style={{ borderRadius: "9999px 9999px 28px 28px" }}
              >
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 520px, 90vw"
                  className="object-cover object-[22%_center]"
                />
              </div>

              <InstaNote
                variant="cream"
                className="absolute bottom-6 left-1/2 w-max max-w-[90%] -translate-x-1/2 text-center text-[clamp(14px,1.3vw,18px)]"
              >
                Kan I finde jeres egen jakke?
              </InstaNote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
