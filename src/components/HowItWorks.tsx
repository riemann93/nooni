/**
 * HowItWorks: "Sådan virker det", three short steps from design to
 * postkasse for a navnemærke. Kept to one compact band: no photo, one
 * line per step, so it reassures without pushing the products down.
 *
 * Delivery wording comes from the store facts, so it can't drift from
 * the shipping policy.
 */

import { STORE_FACTS } from "@/lib/store-facts";

interface Step {
  num: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    num: "1",
    title: "Design dit navnemærke",
    body: "Vælg navn eller symbol, og de farver der passer til jakken eller tasken.",
  },
  {
    num: "2",
    title: "Jeg printer det hjemme",
    body: "Hvert mærke bliver printet til dit barn hjemme på mit kontor.",
  },
  {
    num: "3",
    title: "Det lander i postkassen",
    body: `${STORE_FACTS.dispatch}. ${STORE_FACTS.delivery}.`,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-nooni-bg py-5 md:py-[45px]" data-screen-label="05 How it works">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-6 py-8 md:px-12 md:py-12">
          <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
            Sådan virker det
          </p>
          <h2 className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-md)" }}>
            Fra navn til{" "}
            <em className="italic text-nooni-headline">lynlås</em>
          </h2>

          <ol className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((step) => (
              <li key={step.num} className="flex gap-4">
                <span className="font-display text-3xl font-medium leading-none text-nooni-headline md:text-4xl">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-editorial text-xl italic font-medium leading-tight text-nooni-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-editorial leading-relaxed text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
