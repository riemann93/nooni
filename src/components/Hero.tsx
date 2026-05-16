/**
 * Hero — the new homepage opener.
 *
 * Two-column layout on desktop (text left, photo right). On mobile the
 * photo dominates the top ~60vh and the text sits below it.
 *
 * The photo is contained in a Boho-arch shaped frame to tie the
 * lifestyle imagery into the brand language. The concentric-line arches
 * (Nooni's signature decoration, see BRAND.md) live INSIDE this section
 * — not as a fixed-viewport overlay — so they scroll out naturally when
 * the user moves past the hero. This keeps the brand DNA visible at the
 * top of the page and lets the product grid below breathe on a clean
 * background.
 *
 * Primary CTA points to /produkter/dots-med-navn-3stk per the
 * "name version is the most functional" call.
 */

import Image from "next/image";
import Link from "next/link";
import Arch from "@/components/Arch";

const HERO_PHOTO = {
  src: "/images/dots_name_lifestyle.jpg",
  alt: "Nooni navnemærke med navnet “Elvira” hængende på et barns blomstrede rygsæk",
  // Original is 1000x750 landscape; cropping handled via object-cover.
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative arches — contained to this section. Negative z-index
          keeps them below content without needing a stacking context on
          the section itself. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 select-none"
      >
        <Arch
          maskId="hero-arch-left"
          direction="up"
          width={520}
          height={680}
          peakOffset={200}
          lines={6}
          gap={38}
          strokeWidth={3}
          style={{ top: -10, left: -80 }}
        />
        <Arch
          maskId="hero-arch-right"
          direction="down"
          width={520}
          height={680}
          peakOffset={200}
          lines={6}
          gap={38}
          strokeWidth={3}
          style={{ top: -10, right: -80 }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-20 md:px-10 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
          {/* ── Photo (renders FIRST on mobile, second on desktop) ── */}
          <div className="order-1 md:order-2">
            <div
              className="relative mx-auto w-full overflow-hidden bg-nooni-bg-warm"
              style={{
                // Boho arch — full semicircle top, square bottom.
                borderRadius: "9999px 9999px 28px 28px",
                aspectRatio: "4 / 5",
                maxWidth: 520,
              }}
            >
              <Image
                src={HERO_PHOTO.src}
                alt={HERO_PHOTO.alt}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── Text (renders second on mobile, first on desktop) ── */}
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Smarte løsninger til familier
            </p>

            <h1 className="mt-5 font-editorial text-[clamp(40px,5.5vw,68px)] leading-[1.05] tracking-tight text-nooni-ink">
              Personlige mærker{" "}
              <em className="italic text-nooni-headline">
                med dit barns navn
              </em>
            </h1>

            <p className="mt-6 max-w-md font-editorial text-lg leading-relaxed text-nooni-ink-soft">
              Mist aldrig tøj fra børnehaven igen. Vi printer Dots på
              bestilling, hjemme i Danmark.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/produkter/dots-med-navn-3stk"
                className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3.5 text-sm text-white transition-colors hover:bg-[#9d6f6f]"
              >
                Lav dine Dots
                <span aria-hidden>→</span>
              </Link>

              <a
                href="#produkter"
                className="text-sm text-nooni-ink-soft underline-offset-4 transition-colors hover:text-nooni-headline hover:underline"
              >
                Se alle produkter ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
