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
 *   - Two side-only curved borders in the arch-line tone (no top/bottom
 *     border) whose ends curl inward toward the hero's centre — the
 *     unusual border treatment called out in the spec
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

/** Corner-arc radius for the side borders, in px. Larger = more pronounced curl. */
const CORNER = 56;
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
          <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-nooni-bg-warm">
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
 * Side-only frame borders, per spec §1 "Resting state":
 *
 *   - Two thin vertical lines, one per side, in --color-nooni-arch
 *   - No top or bottom horizontal edge
 *   - At each end, the line curls inward toward the hero centre
 *
 * Implementation: a vertical strip (CSS div) for the straight portion,
 * plus a fixed-size SVG quarter-arc at each of the four corners. The
 * arc endpoints meet the strip end at (STROKE/2, CORNER) and continue
 * to (CORNER, STROKE/2) — a point that sits in space along where the
 * top/bottom edge would be, inset CORNER px from the actual corner.
 *
 * Sweep-flag note: SVG sweep=0 is visually counter-clockwise in our
 * y-down coordinate system; sweep=1 is visually clockwise. For each
 * corner we pick the flag so the short arc bows toward the hero's
 * interior. (Pick the wrong one and the curl points outward.)
 */
function HeroSideBorders() {
  const R = CORNER;
  const S = STROKE;
  const r = R - S / 2;
  const stroke = "var(--color-nooni-arch)";

  const paths = {
    // Bottom of vertical (S/2, R) → end in space (R, S/2). Inward = sweep 0.
    tl: `M ${S / 2} ${R} A ${r} ${r} 0 0 0 ${R} ${S / 2}`,
    // Mirror of TL. Inward = sweep 1.
    tr: `M ${R - S / 2} ${R} A ${r} ${r} 0 0 1 0 ${S / 2}`,
    // Top of vertical (S/2, 0) → end in space (R, R - S/2). Inward = sweep 1.
    bl: `M ${S / 2} 0 A ${r} ${r} 0 0 1 ${R} ${R - S / 2}`,
    // Mirror of BL. Inward = sweep 0.
    br: `M ${R - S / 2} 0 A ${r} ${r} 0 0 0 0 ${R - S / 2}`,
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Straight vertical strips, inset from top/bottom by CORNER. */}
      <span
        className="absolute left-0"
        style={{ top: R, bottom: R, width: S, background: stroke }}
      />
      <span
        className="absolute right-0"
        style={{ top: R, bottom: R, width: S, background: stroke }}
      />

      {/* Corner curls. */}
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
