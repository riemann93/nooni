/**
 * DecksArt — stylised placeholder illustration for the Decks product card.
 *
 * Represents a card holder with three playing cards slotted into it.
 * Replace with real product photography when available.
 */

export default function DecksArt() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "color-mix(in oklab, var(--color-nooni-nude) 88%, var(--color-nooni-bg))" }}
    >
      <svg viewBox="0 0 320 320" className="relative w-[78%]">
        <rect x="40" y="200" width="240" height="80" rx="10" fill="var(--color-nooni-headline)" />
        <rect x="40" y="280" width="240" height="14" rx="3" fill="#9D6F6F" />
        <line x1="64" y1="220" x2="256" y2="220" stroke="#9D6F6F" strokeWidth="1" />
        <line x1="64" y1="238" x2="256" y2="238" stroke="#9D6F6F" strokeWidth="1" />

        <rect x="68"  y="60"  width="60" height="160" rx="6" fill="var(--color-nooni-bg)" stroke="#E8D9C9" strokeWidth="1" />
        <rect x="138" y="40"  width="60" height="180" rx="6" fill="var(--color-nooni-bg)" stroke="#E8D9C9" strokeWidth="1" />
        <rect x="208" y="70"  width="60" height="150" rx="6" fill="var(--color-nooni-bg)" stroke="#E8D9C9" strokeWidth="1" />

        <circle cx="98"  cy="90"  r="8" fill="var(--color-nooni-warm)" />
        <text x="98"  y="200" textAnchor="middle" fontFamily="Fredoka" fontSize={14} fontWeight={600} fill="var(--color-nooni-headline)">♥</text>
        <circle cx="168" cy="75"  r="8" fill="var(--color-nooni-cool)" />
        <text x="168" y="185" textAnchor="middle" fontFamily="Fredoka" fontSize={14} fontWeight={600} fill="var(--color-nooni-sub)">♣</text>
        <circle cx="238" cy="100" r="8" fill="var(--color-nooni-headline)" />
        <text x="238" y="200" textAnchor="middle" fontFamily="Fredoka" fontSize={14} fontWeight={600} fill="var(--color-nooni-headline)">♦</text>
      </svg>
    </div>
  );
}
