/**
 * Favicon: the "N" of the Nooni wordmark on a cream tile. Generated at
 * build time and served as /icon. Replaces the default Next.js
 * favicon.ico.
 */

import { ImageResponse } from "next/og";
import { BRAND_CREAM, BRAND_ROSE, fredokaBold } from "@/lib/brand-image";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_CREAM,
          borderRadius: 112,
          color: BRAND_ROSE,
          fontFamily: "Fredoka",
          fontSize: 420,
          lineHeight: 1,
          paddingBottom: 24,
        }}
      >
        N
      </div>
    ),
    { ...size, fonts: await fredokaBold() },
  );
}
