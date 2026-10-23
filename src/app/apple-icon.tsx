/**
 * Apple touch icon (home-screen bookmark). Same "N" tile as icon.tsx,
 * but square: iOS rounds the corners itself.
 */

import { ImageResponse } from "next/og";
import { BRAND_CREAM, BRAND_ROSE, fredokaBold } from "@/lib/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          color: BRAND_ROSE,
          fontFamily: "Fredoka",
          fontSize: 140,
          lineHeight: 1,
          paddingBottom: 8,
        }}
      >
        N
      </div>
    ),
    { ...size, fonts: await fredokaBold() },
  );
}
