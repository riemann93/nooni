/**
 * HowItWorks — "Sådan virker det" strip between Hero and Mest populære.
 *
 * Three steps explaining what happens after a customer hits "Design
 * din egen": you design it → we print it at home → it lands in your
 * mailbox in 2–4 days. Numbered, single sentence per step, no
 * decorative icons — the brand voice carries it.
 *
 * Functions as the site's main pre-launch trust signal: production
 * transparency (printed at home in Denmark, short turnaround) stands
 * in for customer reviews until we have real ones.
 */

interface Step {
  num: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Du designer selv",
    body:
      "Vælg farver, motiv eller navn direkte på produktsiden. Du ser ændringen live, mens du klikker.",
  },
  {
    num: "02",
    title: "Vi printer hjemme",
    body:
      "Hver ordre 3D-printes hos os i Danmark. Ingen lager, ingen masseproduktion — kun det du har bestilt.",
  },
  {
    num: "03",
    title: "Frem på 2–4 dage",
    body:
      "Vi pakker selv og sender med PostNord. De fleste pakker er fremme inden for fire hverdage.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="bg-nooni-bg-warm py-20 md:py-28"
      data-screen-label="02 How it works"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
            Sådan virker det
          </p>
          <h2 className="mt-4 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-tight text-nooni-ink">
            Fra idé til{" "}
            <em className="italic text-nooni-headline">postkasse</em>
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step) => (
            <li key={step.num} className="flex flex-col">
              <span className="font-display text-5xl font-medium leading-none text-nooni-headline">
                {step.num}
              </span>
              <h3 className="mt-6 font-editorial text-2xl italic font-medium leading-tight text-nooni-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm font-editorial text-lg leading-relaxed text-nooni-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
