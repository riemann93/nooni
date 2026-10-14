import { PLACEHOLDER_SOCIAL_PROOF } from "@/lib/social-proof";

/** Placeholder reviews must never reach the live shop (see social-proof.ts). */
export const SHOW_REVIEWS = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

/** Unknown product facts are only flagged to Camilla outside production. */
export const SHOW_UNKNOWN_FACTS = process.env.VERCEL_ENV !== "production";
