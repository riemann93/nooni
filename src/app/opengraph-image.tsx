/**
 * Default share card (Facebook, Messenger, LinkedIn, X, Slack, SMS
 * previews). Product and blog pages override it with their own photo.
 */

import { ImageResponse } from "next/og";
import { BRAND_CREAM, BRAND_ROSE, fredokaBold } from "@/lib/brand-image";

export const alt = "Nooni: personlige navnemærker og 3D-printede ting til børn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_CREAM,
          fontFamily: "Fredoka",
        }}
      >
        <div style={{ color: BRAND_ROSE, fontSize: 220, lineHeight: 1 }}>
          Nooni
        </div>
        <div style={{ marginTop: 36, color: "#5a4d40", fontSize: 44 }}>
          Personlige navnemærker til børn
        </div>
      </div>
    ),
    { ...size, fonts: await fredokaBold() },
  );
}
