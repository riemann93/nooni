import type { NextConfig } from "next";
import { PLACEHOLDER_SOCIAL_PROOF } from "./src/lib/social-proof";

/**
 * Ship blocker: invented reviews must never reach nooni.dk. Fails any
 * Vercel production build (and any build run with NODE_ENV=production
 * on the production branch) while the placeholder flag is still true.
 */
if (PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production") {
  throw new Error(
    "PLACEHOLDER_SOCIAL_PROOF is true in src/lib/social-proof.ts. Replace the made-up reviews with real ones before building for production.",
  );
}

/**
 * Baseline security headers for every route. Checkout runs on Shopify's
 * own domain, so nothing here needs to allow framing or third-party
 * forms. No CSP yet: GA and the Shopify CDN would need a careful
 * allowlist, and a wrong CSP breaks the shop silently.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first: roughly 20% smaller than WebP for photos.
    formats: ["image/avif", "image/webp"],
    // 90 is used for the Story portrait; Next 16 only allows listed values.
    qualities: [75, 90],
    // Shopify-hosted product images come from the CDN. Allow them
    // through next/image so the optimizer can serve resized/AVIF/WebP
    // variants instead of the raw originals.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Photos and video in /public/images. A day in the browser,
        // since files are sometimes replaced under the same name.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
