/**
 * StorySection — "Personen bag" narrative.
 *
 * Left column: portrait photo in a Boho-arch frame (9999px top, 22px bottom).
 * Right column: about-us body copy in Camilla's voice.
 *
 * Wrapped in a cream pill container on the regular page background,
 * matching HowItWorks and BlogTeaser — the cream tone now indicates
 * "this is a content beat", not "this is the section".
 *
 * Used on the homepage and on /om-os. The earlier stats row
 * ("1.412 print sendt" etc.) was removed because the figure was
 * fabricated. The factual claims that survived moved into
 * <HowItWorks /> between Hero and Mest populære.
 */

import Image from "next/image";
import Link from "next/link";

export default function StorySection() {
  return (
    <section
      id="historie"
      className="relative z-[1] bg-nooni-bg py-5 md:py-[45px]"
      data-screen-label="04 Story"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[0.95fr_1.05fr]">
            <div
              className="relative min-h-[320px] md:min-h-0"
              style={{ borderRadius: "32px 250px 0 22px", boxShadow: "inset -4px 4px 12px rgba(0,0,0,0.12)", overflow: "hidden" }}
            >
              <Image
                src="/images/familie_2.jpg"
                alt="Camilla — personen bag Nooni"
                fill
                priority
                quality={90}
                className="object-cover object-top"
                sizes="(min-width: 768px) 45vw, 90vw"
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-7 md:px-10 md:py-10 lg:px-14 lg:py-16">
              <span className="inline-flex items-center gap-3 uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
                Personen bag
              </span>
              <h2 className="mt-4 mb-8 font-editorial leading-[1.08] text-nooni-ink tracking-tight" style={{ fontSize: "var(--nooni-text-heading-lg)" }}>
                Hvem er bag{" "}
                <em className="italic text-nooni-headline">Nooni?</em>
              </h2>
              <div className="font-editorial leading-[1.6] text-nooni-ink-soft space-y-5 max-w-[520px]" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                <p>
                  Hej! Jeg hedder Camilla. Da jeg måtte vinke farvel til
                  lærerfaget efter en svær depression, fandt jeg lyset og
                  kreativiteten i 3D-print. I dag designer jeg – sammen med
                  mine to printere, Wall-E og EVA – værktøjer, der hjælper
                  børn med at mestre hverdagen selv. Nooni er skabt ud fra en
                  drøm om at give børnefamilier flere succesoplevelser, mere
                  selvtillid og en lettere hverdag.
                </p>
              </div>
              <Link
                href="/om-os"
                className="mt-8 self-start inline-flex items-center gap-2 rounded-full border border-nooni-sub px-6 py-2.5 text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Min historie
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
