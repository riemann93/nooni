/**
 * Stars: a star rating with an optional review count, in brand colours.
 *
 * Filled stars use --color-nooni-headline, empty ones --color-nooni-line.
 * Fractional ratings fill the last star partially (4.9 shows 4 full
 * stars and one 90% filled).
 *
 * Purely visual. Never pair it with Review or AggregateRating JSON-LD
 * while the numbers come from src/lib/social-proof.ts (placeholder).
 */

const STAR_PATH =
  "M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z";

interface StarsProps {
  /** Average rating, 0 to 5. */
  rating: number;
  /** Number of reviews. Hidden when omitted. */
  count?: number;
  /** Star size in px. */
  size?: number;
  /** Show the numeric rating (e.g. "4,9") before the count. */
  showRating?: boolean;
  /** Show the count as "(148)" instead of "148 anmeldelser", for narrow cards. */
  compact?: boolean;
  className?: string;
}

const formatRating = (n: number) =>
  n.toLocaleString("da-DK", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Stars({ rating, count, size = 16, showRating = true, compact = false, className = "" }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const label =
    `${formatRating(clamped)} ud af 5 stjerner` +
    (count !== undefined ? `, ${count.toLocaleString("da-DK")} anmeldelser` : "");

  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex items-center gap-2 text-[length:var(--nooni-text-ui)] text-nooni-ink-soft ${className}`}
    >
      <span className="inline-flex gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, clamped - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox="0 0 24 24" className="absolute inset-0 fill-nooni-line">
                <path d={STAR_PATH} />
              </svg>
              {fill > 0 && (
                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                  <svg width={size} height={size} viewBox="0 0 24 24" className="fill-nooni-headline">
                    <path d={STAR_PATH} />
                  </svg>
                </span>
              )}
            </span>
          );
        })}
      </span>
      {(showRating || count !== undefined) && (
        <span aria-hidden="true" className="tracking-[0.02em]">
          {showRating && <span className="font-medium text-nooni-ink">{formatRating(clamped)}</span>}
          {count !== undefined && (
            <span>
              {showRating ? " · " : ""}
              {compact ? `(${count.toLocaleString("da-DK")})` : `${count.toLocaleString("da-DK")} anmeldelser`}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
