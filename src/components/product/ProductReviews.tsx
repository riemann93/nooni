/**
 * ProductReviews: rating summary, distribution bars and review cards for
 * one product. Reads src/lib/social-proof.ts, which is PLACEHOLDER data,
 * so the section is hidden on the live shop and emits no Review or
 * AggregateRating JSON-LD.
 */

import Stars from "@/components/Stars";
import { getProductRating, getRatingDistribution, getReviewsFor } from "@/lib/social-proof";
import { SHOW_REVIEWS } from "./showPlaceholders";

export default function ProductReviews({ handle }: { handle: string }) {
  const rating = getProductRating(handle);
  if (!SHOW_REVIEWS || !rating) return null;

  const reviews = getReviewsFor(handle);
  const distribution = getRatingDistribution(rating);

  return (
    <section aria-labelledby="anmeldelser" className="mt-16 md:mt-24">
      <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
        Anmeldelser
      </p>
      <h2
        id="anmeldelser"
        className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
        style={{ fontSize: "var(--nooni-text-heading-md)" }}
      >
        Det siger <em className="italic text-nooni-headline">forældrene</em>
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-6 py-6">
          <p className="font-display text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-lg)", lineHeight: 1 }}>
            {rating.rating.toLocaleString("da-DK", { minimumFractionDigits: 1 })}
          </p>
          <Stars rating={rating.rating} count={rating.count} size={18} showRating={false} className="mt-3" />
          <ul className="mt-5 flex flex-col gap-2" aria-label="Fordeling af stjerner">
            {[5, 4, 3, 2, 1].map((star) => {
              const n = distribution[star - 1];
              const pct = rating.count ? (n / rating.count) * 100 : 0;
              return (
                <li key={star} className="flex items-center gap-3 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                  <span className="w-12 shrink-0">{star} stjerner</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-nooni-line-soft">
                    <span className="block h-full rounded-full bg-nooni-headline" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-8 shrink-0 text-right">{n}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <li key={`${r.name}-${r.town}`} className="flex flex-col gap-3 rounded-[1.5rem] border border-nooni-line-soft bg-nooni-bg px-5 py-5">
              <Stars rating={r.stars} size={15} showRating={false} />
              <p className="font-editorial italic leading-snug text-nooni-ink" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                {r.text}
              </p>
              <p className="mt-auto text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                {r.name}, {r.town}
              </p>
            </li>
          ))}
          {reviews.length === 0 && (
            <li className="text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
              Anmeldelserne kommer snart.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
