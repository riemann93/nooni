/**
 * Everyday: four small facts that make the morning easier, each with a
 * thin line icon and one sentence. Claims come from Camilla's posts;
 * the wash fact is tested (Dots stay on in the machine). Never add a
 * wash temperature until Camilla gives one.
 */

const ITEMS: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Et greb til små hænder",
    body: "Dots giver noget at tage fat i, så barnet kan lyne selv.",
    icon: <path d="M12 3v10M8 9l4 4 4-4M7 21h10a2 2 0 0 0 2-2v-1a5 5 0 0 0-5-5h-4a5 5 0 0 0-5 5v1a2 2 0 0 0 2 2z" />,
  },
  {
    title: "Ingen tusch i tøjet",
    body: "Navnet hænger udenpå, så jakken kan gå videre bagefter.",
    icon: <path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4zM14 7l3 3M3 3l18 18" />,
  },
  {
    title: "Flytter med",
    body: "Når jakken bliver for lille, flytter mærket over på den næste.",
    icon: <path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" />,
  },
  {
    title: "Bliver siddende i vask",
    body: "Ingen grund til at tage dem af, før tøjet skal vaskes.",
    icon: <path d="M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM4 7h16M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
];

export default function Everyday() {
  return (
    <section className="bg-nooni-bg py-20 md:py-32" data-screen-label="04 Everyday">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <h2
          className="mx-auto max-w-[720px] text-center font-editorial leading-[1.1] tracking-[-0.02em] text-nooni-ink"
          style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}
        >
          Små ting, der gør <span className="italic text-nooni-headline">morgenen lettere</span>
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.title} className="text-center sm:text-left">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="mx-auto text-nooni-sub sm:mx-0"
              >
                {item.icon}
              </svg>
              <h3 className="mt-4 font-medium text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
                {item.title}
              </h3>
              <p className="mt-1.5 font-editorial leading-relaxed text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
