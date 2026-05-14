import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
