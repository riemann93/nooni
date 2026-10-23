/**
 * Web app manifest: name, colours and icons for "Add to home screen"
 * on Android and for browsers that read it. Icons are the generated
 * ones from icon.tsx and apple-icon.tsx.
 */

import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nooni",
    short_name: "Nooni",
    description: SITE_DESCRIPTION,
    lang: "da",
    start_url: "/",
    display: "browser",
    background_color: "#FFFCF7",
    theme_color: "#FFFCF7",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
