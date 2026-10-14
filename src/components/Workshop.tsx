/**
 * Workshop: who makes the tag and how it reaches you, in one beat.
 * Replaces the separate "Sådan virker det" and "Personen bag" bands.
 *
 * Camilla's photo and a few lines in her voice, the printer video, and
 * the three steps from name to postkasse. Trust through craft: show
 * the person and the machine, not promises. The full story is on
 * /om-os.
 *
 * Delivery wording comes from the store facts. The proof line comes
 * from PROOF_LINE, which only holds numbers Camilla stands behind.
 */

import Image from "next/image";
import Link from "next/link";
import { STORE_FACTS } from "@/lib/store-facts";
import { PROOF_LINE } from "@/lib/why-parents-buy";

const STEPS = [
  { title: "Du designer", body: "Navn og farver, lige her på siden." },
  { title: "Jeg printer", body: "Hvert mærke bliver printet til dit barn hjemme hos mig." },
  { title: "Postkassen", body: `${STORE_FACTS.dispatch}. ${STORE_FACTS.delivery}.` },
];

export default function Workshop() {
  return (
    <section id="historie" className="bg-nooni-bg py-8 md:py-16" data-screen-label="05 Workshop">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            <div className="grid grid-cols-2 gap-2 p-2 md:gap-3 md:p-3">
              <div className="relative aspect-[3/4] overflow-hidden" style={{ borderRadius: "999px 999px 18px 18px" }}>
                <Image
                  src="/images/familie_2.jpg"
                  alt="Camilla, der designer og printer Noonis navnemærker"
                  fill
                  sizes="(min-width: 768px) 25vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
                <video
                  aria-label="Printerne, hvor navnemærkerne bliver til"
                  poster="/images/blog-teaser-poster.jpg"
                  preload="none"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/images/blog-teaser.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="flex flex-col justify-center px-5 pt-5 pb-7 md:px-10 md:py-12 lg:px-14">
              <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
                Fra mit værksted
              </p>
              <h2
                className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-heading-md)" }}
              >
                Hej, jeg hedder <em className="italic text-nooni-headline">Camilla</em>
              </h2>
              <p
                className="mt-4 max-w-[520px] font-editorial leading-[1.6] text-nooni-ink-soft"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                Jeg er uddannet lærer og mor til to, og jeg designer og printer alle Noonis
                navnemærker hjemme i Vestjylland. Målet er enkelt: at børn kan finde deres egne ting
                og klare lidt mere selv i garderoben.
              </p>
              <p className="mt-4 font-display font-medium text-nooni-headline" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                {PROOF_LINE.map((part) => `${part}.`).join(" ")}
              </p>

              <ol className="mt-6 grid gap-4 border-t border-nooni-line pt-6 sm:grid-cols-3">
                {STEPS.map((step, i) => (
                  <li key={step.title}>
                    <p className="font-display text-sm font-medium text-nooni-sub">{i + 1}</p>
                    <h3 className="mt-1 font-editorial font-medium text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
                      {step.title}
                    </h3>
                    <p className="mt-0.5 font-editorial leading-snug text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                href="/om-os"
                className="mt-7 self-start text-nooni-sub underline decoration-nooni-line underline-offset-4 transition-colors hover:decoration-nooni-sub"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Læs min historie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
