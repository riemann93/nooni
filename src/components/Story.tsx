/**
 * StorySection — "Familien bag" narrative with stats.
 *
 * Left column: family photo in a Boho-arch frame (9999px top, 22px bottom).
 * The SVG illustration placeholder will be replaced with the real family
 * photo once the image is committed to public/images/.
 *
 * No backdrop arches — intentional visual pause after the busy product grid.
 * Used on the homepage (section 04) and on /om-os.
 */

export default function StorySection() {
  return (
    <section
      id="historie"
      className="relative z-[1] bg-nooni-bg-warm py-40"
      data-screen-label="04 Story"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-24 px-10 md:grid-cols-[0.95fr_1.05fr]">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[22px_22px_22px_22px] flex items-center justify-center"
          style={{
            borderRadius: "9999px 9999px 22px 22px",
            backgroundColor: "var(--color-nooni-nude)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 22px, color-mix(in oklab, #fff 10%, transparent) 22px 23px)",
            }}
          />
          <svg viewBox="0 0 320 400" className="relative w-[70%]">
            <rect x="60" y="100" width="200" height="160" rx="14" fill="var(--color-nooni-bg)" stroke="#C9B4A0" strokeWidth="1.2" />
            <rect x="80" y="120" width="160" height="100" rx="6" fill="#F2E3D9" />
            <rect x="140" y="140" width="40" height="60" rx="3" fill="var(--color-nooni-headline)" />
            <circle cx="160" cy="170" r="6" fill="var(--color-nooni-bg)" />
            <line x1="80" y1="240" x2="240" y2="240" stroke="#C9B4A0" strokeWidth="1" />
            <circle cx="100" cy="280" r="14" fill="var(--color-nooni-cool)" />
            <rect x="140" y="266" width="80" height="28" rx="14" fill="var(--color-nooni-warm)" />
            <circle cx="240" cy="280" r="10" fill="var(--color-nooni-headline)" />
          </svg>
          <span className="absolute bottom-6 left-6 font-mono text-[11px] tracking-[0.1em] text-[color-mix(in_oklab,var(--color-nooni-ink)_50%,transparent)]">
            [ produktion · hjemmestue ]
          </span>
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
