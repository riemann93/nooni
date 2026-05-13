/**
 * LoopsArt — stylised placeholder illustration for the Loops product card.
 *
 * Represents a tag hanging from a cord with a name printed on it.
 * Replace with real product photography when available.
 */

export default function LoopsArt() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "color-mix(in oklab, var(--color-nooni-cool) 70%, var(--color-nooni-bg))" }}
    >
      <svg viewBox="0 0 320 320" className="relative w-[70%]">
        <path d="M 160 20 Q 130 60 160 100" stroke="#9DAE8E" strokeWidth="1.5" fill="none" />
        <rect x="60" y="100" width="200" height="100" rx="50"
              fill="var(--color-nooni-bg)" stroke="#9DAE8E" strokeWidth="1.5" />
        <circle cx="92" cy="150" r="9" fill="none" stroke="#9DAE8E" strokeWidth="1.5" />
        <circle cx="92" cy="150" r="4" fill="var(--color-nooni-cool)" />
        <text x="180" y="160" textAnchor="middle"
              fontFamily="Fredoka, sans-serif" fontWeight={600} fontSize={30}
              fill="var(--color-nooni-sub)">
          Viggo
        </text>
        <rect x="100" y="220" width="140" height="60" rx="30"
              fill="var(--color-nooni-headline)" opacity={0.85} />
        <circle cx="124" cy="250" r="6" fill="var(--color-nooni-bg)" />
      </svg>
    </div>
  );
}
