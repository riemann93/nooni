export default function Contact() {
  return (
    <section id="kontakt" className="relative z-[1]" data-screen-label="06 Kontakt">
      {/* Outer arch — full-width colored backdrop with curved top */}
      <div
        className="bg-nooni-cool/40 px-6 pt-20 pb-32 md:px-10 md:pt-28 md:pb-40"
        style={{ borderRadius: "80px 80px 0 0" }}
      >
        <div className="mx-auto max-w-[1280px]">
          {/* Inner arch — content container */}
          <div
            className="mx-auto max-w-[640px] overflow-hidden bg-nooni-bg px-10 pt-16 pb-14 text-center shadow-sm"
            style={{ borderRadius: "9999px 9999px 28px 28px" }}
          >
            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub after:h-px after:w-7 after:bg-nooni-sub">
              Sig hej
            </span>

            <h2 className="mt-5 font-editorial text-[clamp(36px,4vw,52px)] leading-[1.1] text-nooni-ink">
              Kontakt
            </h2>

            <p className="mx-auto mt-5 max-w-[380px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
              Spørgsmål, særlige ønsker, eller bare en god idé? Vi svarer hurtigt.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:hej@nooni.dk"
                className="flex items-center justify-center gap-3 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
              >
                <MailIcon />
                <span className="font-sans text-[15px]">hej@nooni.dk</span>
              </a>
              <a
                href="https://www.instagram.com/hej.nooni/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-nooni-ink-soft transition-colors hover:text-nooni-headline"
              >
                <InstagramIcon />
                <span className="font-sans text-[15px]">@hej.nooni</span>
              </a>
            </div>

            <p className="mt-14 text-xs tracking-[0.12em] text-nooni-arch">
              Lavet i Danmark med kærlighed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
