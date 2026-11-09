/**
 * CustomerMap — "Nooni er sendt til hele Danmark".
 *
 * Small thank-you section at the bottom of the homepage, just above the
 * footer: a map of Denmark with a dot per town Nooni has shipped to
 * (bigger dot = more parcels). Same cream pill container as the other
 * homepage sections. The PNG is transparent; next/image serves it as
 * AVIF/WebP, so no separate WebP file is kept in /public.
 */

import Image from "next/image";

export default function CustomerMap() {
  return (
    <section
      className="bg-nooni-bg py-5 md:py-[45px]"
      data-screen-label="06 Customer map"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-6 py-10 md:px-12 md:py-14">
          <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
            <span
              className="uppercase tracking-[0.22em] text-nooni-sub font-medium"
              style={{ fontSize: "var(--nooni-text-label)" }}
            >
              Tak til jer
            </span>
            <h2
              className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              Nooni er sendt til{" "}
              <em className="italic text-nooni-headline">hele Danmark</em>
            </h2>
            <p
              className="mt-5 max-w-[520px] font-editorial leading-[1.6] text-nooni-ink-soft"
              style={{ fontSize: "var(--nooni-text-body-lg)" }}
            >
              Fra Frederikshavn til Sønderborg: tak til alle jer, der har
              bestilt. Hver prik er en by, hvor en lille Nooni-pakke er
              landet, og jo større prik, jo flere pakker.
            </p>
            <div className="mt-8 w-full max-w-[420px]">
              <Image
                src="/images/danmarkskort-kunder-n.png"
                alt="Danmarkskort med prikker for de byer, Nooni har sendt pakker til"
                width={1200}
                height={1200}
                sizes="(min-width: 480px) 420px, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
