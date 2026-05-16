/**
 * Hero — the homepage opener.
 *
 * Two-column layout on desktop (text left, photo right). On mobile the
 * photo dominates the top ~60vh and the text sits below it.
 *
 * The photo is square, framed in a Boho-arch shape (full semicircle
 * top, slight bottom-corner radius), with a warm two-tone drop shadow
 * that follows the arch outline.
 *
 * The Boho-arch decoration is kept in code but currently disabled
 * (SHOW_ARCHES = false). We're parking them until they have a clear
 * purpose. Flip the flag to bring them back; the geometry is dialled
 * in for the current hero proportions already.
 *
 * Primary CTA points to /produkter/dots-med-navn-3stk per the
 * "name version is the most functional" call.
 */

import Image from "next/image";
import Link from "next/link";
import Arch from "@/components/Arch";

const SHOW_ARCHES = false;

const HERO_PHOTO = {
  src: "/images/dots_name_lifestyle.jpg",
  alt: "Nooni navnemærke med navnet “Elvira” hængende på et barns blomstrede rygsæk",
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {SHOW_ARCHES && (
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
      )}

      <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-20 md:px-10 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
          {/* ── Photo (renders FIRST on mobile, second on desktop) ── */}
          <div className="order-1 md:order-2">
            <HeroPhoto />
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

/**
 * Photo composition: outer wrapper carries the drop shadow; inner
 * wrapper clips the image to the Boho-arch outline via border-radius.
 * `filter: drop-shadow` follows the rendered shape, so the halo
 * traces the arch — not a hidden bounding rectangle.
 */
function HeroPhoto() {
  return (
    <div
      className="relative mx-auto w-full"
      style={{
        maxWidth: 520,
        // Warm two-tone drop shadow — uses the brand headline tone so
        // the halo reads as Nooni-cohesive rather than generic.
        filter:
          "drop-shadow(0 24px 40px rgba(180, 131, 131, 0.18)) drop-shadow(0 8px 16px rgba(61, 50, 40, 0.08))",
      }}
    >
      <div
        className="relative aspect-square overflow-hidden bg-nooni-bg-warm"
        style={{
          // Full semicircle on top, soft 28px corners on the bottom —
          // a classic doorway-style Boho arch.
          borderRadius: "9999px 9999px 28px 28px",
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
  );
}
