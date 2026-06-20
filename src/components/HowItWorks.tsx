/**
 * HowItWorks — "Sådan virker det" strip between Hero and Mest populære.
 *
 * Three steps describing the customer's journey. Lives inside a cream
 * pill container (matching the Blog teaser and Story sections) on the
 * regular page background, so the strip reads as its own beat rather
 * than another full-width band of warm tone.
 */

interface Step {
  num: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    num: "1",
    title: "Skab dit design",
    body: "Vælg farver, symbol eller navn.",
  },
  {
    num: "2",
    title: "Jeg printer hjemme",
    body: "Jeg printer alle varer hjemme på mit kontor i Borris.",
  },
  {
    num: "3",
    title: "Varen bliver leveret til dig",
    body:
      "Jeg pakker og sender dine varer til dig, så snart de er produceret færdige.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="bg-nooni-bg py-5 md:py-[45px]"
      data-screen-label="02 How it works"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-5 py-7 md:px-12 md:py-14">
          <div className="mb-6 max-w-2xl md:mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Sådan virker det
            </p>
            <h2 className="mt-4 font-editorial text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-tight text-nooni-ink">
              Fra idé til{" "}
              <em className="italic text-nooni-headline">postkasse</em>
            </h2>
          </div>

          <ol className="grid grid-cols-3 gap-4 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.num} className="flex flex-col">
                <span className="font-display text-3xl font-medium leading-none text-nooni-headline md:text-4xl">
                  {step.num}
                </span>
                <h3 className="mt-3 font-editorial text-sm italic font-medium leading-tight text-nooni-ink md:mt-4 md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1 font-editorial text-xs leading-relaxed text-nooni-ink-soft md:mt-2 md:max-w-sm md:text-base">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
