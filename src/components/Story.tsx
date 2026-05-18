/**
 * StorySection — "Familien bag" narrative with stats.
 *
 * Left column: family photo in a Boho-arch frame (9999px top, 22px bottom).
 * No backdrop arches — intentional visual pause after the busy product grid.
 * Used on the homepage (section 04) and on /om-os.
 */

import Image from "next/image";

export default function StorySection() {
  return (
    <section
      id="historie"
      className="relative z-[1] bg-nooni-bg-warm py-40"
      data-screen-label="04 Story"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-24 px-10 md:grid-cols-[0.95fr_1.05fr]">
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{ borderRadius: "9999px 9999px 22px 22px" }}
        >
          <Image
            src="/images/familie_1.jpg"
            alt="Familien bag Nooni — Camilla, Steffan og deres to døtre"
            fill
            className="object-cover object-top"
            sizes="(min-width: 768px) 45vw, 90vw"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
            Familien bag
          </span>
          <h2 className="mt-4 mb-10 font-editorial text-[clamp(44px,5.5vw,76px)] leading-[1.08] text-nooni-ink tracking-tight">
            Lavet derhjemme,{" "}
            <em className="italic text-nooni-sub">
              med plads til fingeraftryk.
            </em>
          </h2>
          <div className="font-editorial text-[21px] leading-[1.6] text-nooni-ink-soft space-y-5 max-w-[520px]">
            <p>
              Nooni er en lille dansk familievirksomhed. Vi startede, fordi
              vores egne børns tøj og tasker blev væk — og fordi de
              eksisterende løsninger enten var grimme eller kedelige.
            </p>
            <p>
              Hver eneste Dot, Loop og Deck bliver printet hjemme hos os på
              vores Bambu P2S. Vi pakker selv. Vi sender selv. Og vi læser hver
              ordrebesked, der kommer ind.
            </p>
          </div>

          <dl className="mt-11 grid max-w-[520px] grid-cols-3 gap-12 border-t border-nooni-line pt-9">
            {[
              ["1.412", "Print sendt"],
              ["2–4", "Dage til afsendelse"],
              ["100%", "Lavet i Danmark"],
            ].map(([num, lbl]) => (
              <div key={lbl}>
                <dt className="font-display text-4xl font-medium text-nooni-headline leading-none tracking-tight">
                  {num}
                </dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.16em] text-nooni-ink-soft">
                  {lbl}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
