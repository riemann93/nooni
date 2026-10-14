/**
 * Maker: who makes the tags, in one calm beat. A tall photo of Camilla
 * in the brand's single arch, and a few large lines about her. The
 * full story lives on /om-os.
 */

import Image from "next/image";
import Link from "next/link";

export default function Maker() {
  return (
    <section id="historie" className="bg-nooni-bg py-20 md:py-32" data-screen-label="05 Maker">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <div
          className="relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden"
          style={{ borderRadius: "50% 50% 28px 28px / 37.5% 37.5% 28px 28px" }}
        >
          <Image
            src="/images/familie_2.jpg"
            alt="Camilla, der designer og printer Noonis navnemærker"
            fill
            sizes="(min-width: 768px) 460px, 90vw"
            className="object-cover object-top"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="text-nooni-sub" style={{ fontSize: "var(--nooni-text-ui)" }}>
            Lavet i Vestjylland
          </p>
          <h2
            className="mt-3 font-editorial leading-[1.12] tracking-[-0.02em] text-nooni-ink"
            style={{ fontSize: "clamp(30px, 3.6vw, 48px)" }}
          >
            Hvert mærke bliver printet til dit barn, hjemme hos{" "}
            <span className="italic text-nooni-headline">Camilla</span>
          </h2>
          <p
            className="mt-6 font-editorial leading-relaxed text-nooni-ink-soft md:max-w-[440px]"
            style={{ fontSize: "var(--nooni-text-body-lg)" }}
          >
            Uddannet lærer og mor til to. Hun designer navnemærkerne, så børn kan finde deres egne
            ting og klare lidt mere selv.
          </p>
          <Link
            href="/om-os"
            className="group mt-8 inline-flex items-center gap-1 text-nooni-headline"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Mød Camilla
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
