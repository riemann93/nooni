/**
 * StorySection — "Familien bag" narrative.
 *
 * Left column: family photo in a Boho-arch frame (9999px top, 22px bottom).
 * Right column: about-us body copy.
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

export default function StorySection() {
  return (
    <section
      id="historie"
      className="relative z-[1] bg-nooni-bg py-16 md:py-24"
      data-screen-label="04 Story"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-8 py-14 md:px-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[0.95fr_1.05fr] md:gap-20">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{ borderRadius: "9999px 9999px 22px 22px" }}
            >
              <Image
                src="/images/familie_2.jpg"
                alt="Camilla og hendes datter — familien bag Nooni"
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 45vw, 90vw"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
                Familien bag
              </span>
              <h2 className="mt-4 mb-8 font-editorial text-[clamp(36px,5vw,64px)] leading-[1.08] text-nooni-ink tracking-tight">
                Lavet derhjemme,{" "}
                <em className="italic text-nooni-sub">
                  med plads til fingeraftryk.
                </em>
              </h2>
              <div className="font-editorial text-[19px] leading-[1.6] text-nooni-ink-soft space-y-5 max-w-[520px]">
                <p>
                  Nooni er en lille dansk familievirksomhed. Vi startede, fordi
                  vores egne børns tøj og tasker blev væk — og fordi de
                  eksisterende løsninger enten var grimme eller kedelige.
                </p>
                <p>
                  Hver eneste Dot, Loop og Deck bliver printet hjemme hos os på
                  vores Bambu P2S. Vi pakker selv. Vi sender selv. Og vi læser
                  hver ordrebesked, der kommer ind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
