/**
 * robots.txt — production branch (under-construction posture).
 *
 * Disallow everything while the holder page is live so search engines
 * don't index "Kommer snart" as our title. The main branch keeps the
 * open-crawl version; when we merge main → production at launch, that
 * version wins and indexing resumes.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
