/**
 * StorySection: the short "Personen bag" trust beat at the foot of the
 * homepage.
 *
 * Left column: portrait photo in a Boho-arch frame (9999px top, 22px bottom).
 * Right column: a few lines in Camilla's voice. The full story lives on
 * /om-os; this is only the trust beat that links there.
 *
 * Wrapped in a cream pill container on the regular page background,
 * matching HowItWorks: the cream tone marks a content beat.
 *
 * The earlier stats row ("1.412 print sendt" etc.) was removed because
 * the figure was fabricated. The proof line now comes from PROOF_LINE
 * in src/lib/why-parents-buy.ts, which only holds numbers Camilla
 * stands behind.
 */

import Image from "next/image";
import Link from "next/link";
import { PROOF_LINE } from "@/lib/why-parents-buy";

export default function StorySection() {
  return (
    <section
      id="historie"
      className="relative z-[1] bg-nooni-bg py-5 md:py-[45px]"
      data-screen-label="08 Story"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[0.95fr_1.05fr]">
            <div
              className="relative min-h-[260px] md:min-h-[380px]"
              style={{ borderRadius: "32px 250px 0 22px", boxShadow: "inset -4px 4px 12px rgba(0,0,0,0.12)", overflow: "hidden" }}
            >
              <Image
                src="/images/familie_2.jpg"
                alt="Camilla, personen bag Nooni"
                fill
                quality={90}
                className="object-cover object-top"
                sizes="(min-width: 768px) 45vw, 90vw"
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-7 md:px-10 md:py-10 lg:px-14 lg:py-12">
              <span className="uppercase tracking-[0.22em] text-nooni-sub font-medium" style={{ fontSize: "var(--nooni-text-label)" }}>
                Personen bag
              </span>
              <h2 className="mt-4 mb-6 font-editorial leading-[1.08] text-nooni-ink tracking-tight" style={{ fontSize: "var(--nooni-text-heading-lg)" }}>
                Hvem er bag{" "}
                <em className="italic text-nooni-headline">Nooni?</em>
              </h2>
              <div className="font-editorial leading-[1.6] text-nooni-ink-soft space-y-5 max-w-[520px]" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                <p>
                  Hej! Jeg hedder Camilla. Jeg er uddannet lærer og mor til to,
                  og jeg designer og printer alle Noonis navnemærker hjemme i
                  Vestjylland. Målet er enkelt: at børn kan finde deres egne ting og
                  klare lidt mere selv i garderoben.
                </p>
              </div>
              <p
                className="mt-6 font-display font-medium leading-snug text-nooni-headline"
                style={{ fontSize: "var(--nooni-text-heading-sm)" }}
              >
                {PROOF_LINE.map((part) => `${part}.`).join(" ")}
              </p>
              <Link
                href="/om-os"
                className="mt-8 self-start inline-flex items-center gap-2 rounded-full border border-nooni-sub px-6 py-2.5 text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Min historie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
