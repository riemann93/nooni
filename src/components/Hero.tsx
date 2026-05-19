/**
 * Hero — resting state (chunks 1 + 2 of the homepage-spec rebuild).
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
 *   - A rounded-rect outline in the arch-line tone sitting BORDER_GAP px
 *     outside the photo on all sides — with the top and bottom
 *     horizontal segments removed. The corners flare outward at top and
 *     bottom following the photo's curvature
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
/** Gap between the photo edge and the surrounding border outline, in px. */
const BORDER_GAP = 18;
/**
 * Corner radius of the border outline. Photo radius + gap keeps the gap
 * constant all the way around the corner (concentric rounded rects).
 */
const CORNER = PHOTO_RADIUS + BORDER_GAP;
/** Stroke weight for both the vertical strips and the corner arcs, in px. */
const STROKE = 2;

export default function Hero() {
  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-6 pt-10 md:px-10 md:pt-16">
        {/*
         * Positioned wrapper: defines the hero's box so the photo frame
         * (clipped) and the side borders (un-clipped) can co-exist as
         * absolutely-positioned siblings at the same rect.
         */}
        <div className="relative aspect-[4/5] md:aspect-[3/2]">
          {/* ── Frame: photo + wash + copy ── */}
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
              className="object-cover"
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
                  Personlige mærker til familien
                </p>

                <h1 className="mt-5 font-editorial italic leading-none text-nooni-headline text-[clamp(64px,9vw,128px)]">
                  Dots
                </h1>

                <p className="mt-5 max-w-sm font-editorial text-lg leading-relaxed text-nooni-ink-soft">
                  Personlige mærker med dit barns navn eller motiv.
                  Print on demand, hjemme i Danmark.
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

          <HeroSideBorders />
        </div>
      </div>
    </section>
  );
}

/**
 * Side-only frame outline, per spec §1 "Resting state".
 *
 *   - A rounded rectangle in --color-nooni-arch sitting BORDER_GAP px
 *     outside the photo on every side (concentric rounded rects)
 *   - The two vertical sides and all four corners are drawn
 *   - The top and bottom horizontal segments are omitted, leaving a
 *     gap at the top centre and the bottom centre
 *   - The corners curve outward following the photo's curvature
 *     (standard rounded-rectangle corners, not "pinched")
 *
 * Implementation: a vertical strip (CSS div) for each side's straight
 * portion, plus a fixed-size SVG quarter-arc at each of the four
 * corners. The arc starts at the end of the vertical strip and traces
 * a full 90° quarter-circle to where the (omitted) horizontal edge
 * would begin, CORNER px in from the outline's actual corner.
 */
function HeroSideBorders() {
  const R = CORNER;
  const S = STROKE;
  const r = R - S / 2;
  const stroke = "var(--color-nooni-arch)";

  // Standard rounded-rect corners. For TL, the arc's centre is at
  // (R, R) — inside the outline — so the curve bulges outward toward
  // (0, 0). In SVG's y-down coords this means sweep-flag=1 (visually
  // clockwise) for TL/BR and sweep-flag=0 for TR/BL.
  const paths = {
    tl: `M ${S / 2} ${R} A ${r} ${r} 0 0 1 ${R} ${S / 2}`,
    tr: `M ${R - S / 2} ${R} A ${r} ${r} 0 0 0 0 ${S / 2}`,
    bl: `M ${S / 2} 0 A ${r} ${r} 0 0 0 ${R} ${R - S / 2}`,
    br: `M ${R - S / 2} 0 A ${r} ${r} 0 0 1 0 ${R - S / 2}`,
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: -BORDER_GAP,
        right: -BORDER_GAP,
        bottom: -BORDER_GAP,
        left: -BORDER_GAP,
      }}
    >
      {/* Straight vertical strips, inset from top/bottom by CORNER. */}
      <span
        className="absolute left-0"
        style={{ top: R, bottom: R, width: S, background: stroke }}
      />
      <span
        className="absolute right-0"
        style={{ top: R, bottom: R, width: S, background: stroke }}
      />

      <CornerArc d={paths.tl} className="absolute top-0 left-0" />
      <CornerArc d={paths.tr} className="absolute top-0 right-0" />
      <CornerArc d={paths.bl} className="absolute bottom-0 left-0" />
      <CornerArc d={paths.br} className="absolute bottom-0 right-0" />
    </div>
  );
}

function CornerArc({ d, className }: { d: string; className?: string }) {
  return (
    <svg width={CORNER} height={CORNER} className={className}>
      <path
        d={d}
        fill="none"
        stroke="var(--color-nooni-arch)"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </svg>
  );
}
