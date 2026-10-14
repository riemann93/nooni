/**
 * ParentQuote: one parent's words, large and centred, instead of a
 * grid of review cards.
 *
 * The review comes from src/lib/social-proof.ts, which is PLACEHOLDER
 * data: the section renders nothing on the production deploy while
 * PLACEHOLDER_SOCIAL_PROOF is true, and never feeds JSON-LD.
 */

import Stars from "@/components/Stars";
import { OVERALL_RATING, PLACEHOLDER_SOCIAL_PROOF, REVIEWS } from "@/lib/social-proof";

const SHOW = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

export default function ParentQuote() {
  if (!SHOW) return null;
  const review = REVIEWS.find((r) => r.handle === "dots-med-navn-3stk" && r.stars === 5) ?? REVIEWS[0];

  return (
    <section className="bg-nooni-bg-warm py-20 md:py-32" data-screen-label="06 Quote">
      <figure className="mx-auto flex max-w-[860px] flex-col items-center px-6 text-center">
        <Stars rating={OVERALL_RATING.rating} count={OVERALL_RATING.count} size={16} />
        <blockquote
          className="mt-8 font-editorial leading-[1.25] tracking-[-0.01em] text-nooni-ink"
          style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
        >
          „{review.text}“
        </blockquote>
        <figcaption className="mt-6 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
          {review.name}, {review.town}
        </figcaption>
      </figure>
    </section>
  );
}
