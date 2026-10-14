/**
 * ReviewsBand: overall rating plus three parent reviews about
 * navnemærker, between the product row and "Sådan virker det".
 *
 * Everything shown comes from src/lib/social-proof.ts, which is
 * PLACEHOLDER data. So:
 *   - no Review or AggregateRating JSON-LD here, ever, while the flag
 *     is on;
 *   - on a Vercel production build the band renders nothing while
 *     PLACEHOLDER_SOCIAL_PROOF is true (same rule as ProductCard).
 */

import Stars from "@/components/Stars";
import {
  FAMILY_COUNT,
  OVERALL_RATING,
  PLACEHOLDER_SOCIAL_PROOF,
  REVIEWS,
  type ParentReview,
} from "@/lib/social-proof";

const SHOW_REVIEWS = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

/** Three five-star reviews, one per product, so the band shows the range. */
function pickReviews(count: number): ParentReview[] {
  const picked: ParentReview[] = [];
  const handles = new Set<string>();
  for (const review of REVIEWS) {
    if (review.stars < 5 || handles.has(review.handle)) continue;
    picked.push(review);
    handles.add(review.handle);
    if (picked.length === count) break;
  }
  return picked;
}

export default function ReviewsBand() {
  if (!SHOW_REVIEWS) return null;
  const reviews = pickReviews(3);

  return (
    <section className="bg-nooni-bg py-5 md:py-[45px]" data-screen-label="04 Reviews">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="flex flex-col items-center text-center">
          <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
            Det siger forældrene
          </p>
          <h2 className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-md)" }}>
            {FAMILY_COUNT.toLocaleString("da-DK")} familier bruger{" "}
            <em className="italic text-nooni-headline">Nooni</em>
          </h2>
          <Stars rating={OVERALL_RATING.rating} count={OVERALL_RATING.count} size={20} className="mt-4" />
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.town}`}
              className="flex flex-col rounded-[24px] border border-nooni-line-soft bg-nooni-bg-warm px-6 py-6 md:px-7 md:py-7"
            >
              <Stars rating={review.stars} size={15} showRating={false} />
              <blockquote
                className="mt-3 flex-1 font-editorial leading-relaxed text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                “{review.text}”
              </blockquote>
              <p className="mt-4 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                {review.name}, {review.town}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
