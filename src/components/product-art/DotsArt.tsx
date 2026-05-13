/**
 * DotsArt — stylised placeholder illustration for the Dots product card.
 *
 * Represents a child's clothing label with a name dot stitched onto it.
 * Replace with real product photography when available.
 */

export default function DotsArt() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "color-mix(in oklab, var(--color-nooni-warm) 75%, var(--color-nooni-bg))" }}
    >
      <svg viewBox="0 0 320 320" className="relative w-[78%]">
        <rect x="40" y="60" width="240" height="200" rx="16"
              fill="var(--color-nooni-bg)" stroke="#E8D9C9" strokeWidth="1.2" />
        <rect x="52" y="72" width="216" height="176" rx="10"
              fill="none" stroke="#EAD9CB" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="78" y="130" width="164" height="62" rx="31"
              fill="var(--color-nooni-headline)" />
        <text x="160" y="172" textAnchor="middle"
              fontFamily="Fredoka, sans-serif" fontWeight={600} fontSize={28}
              fill="var(--color-nooni-bg)">
          Alma
        </text>
        <circle cx="240" cy="98" r="14" fill="var(--color-nooni-sub)" />
        <circle cx="240" cy="98" r="5" fill="var(--color-nooni-bg)" />
      </svg>
    </div>
  );
}
