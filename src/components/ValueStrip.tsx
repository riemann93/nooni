/**
 * ValueStrip — single horizontal band of trust signals between the
 * products section and the story.
 *
 * Solid background (no .glass) — sits above the arches; the strip
 * is a punctuation mark in the layout so the arches are deliberately
 * hidden behind it.
 */

const ITEMS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <path d="M3 12l2 2 4-4M3 6l2 2 4-4M3 18l2 2 4-4M14 7h7M14 12h7M14 17h7" />,
    text: "Lavet i Danmark — printet hjemme hos os",
  },
  {
    icon: <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v5l3 3" />,
    text: "Klar til afsendelse på 2–4 dage",
  },
  {
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    text: "Personliggøres til lige præcis dit barn",
  },
  {
    icon: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    ),
    text: "Fri fragt over 350 kr.",
  },
];

export default function ValueStrip() {
  return (
    <div className="relative z-[1] border-y border-nooni-line-soft bg-nooni-bg py-5" data-screen-label="02 Value">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-12 px-10">
        {ITEMS.map(({ icon, text }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-[13px] text-nooni-ink-soft tracking-[0.03em]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-nooni-sub"
            >
              {icon}
            </svg>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
