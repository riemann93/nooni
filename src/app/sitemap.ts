/**
 * sitemap.xml for nooni.dk.
 *
 * Products come straight from Shopify, so a newly published product
 * shows up here within the hour without a code change. Blog posts come
 * from content/posts. Handles in UNINDEXED_PRODUCT_HANDLES (the dev
 * test product) are left out.
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL, UNINDEXED_PRODUCT_HANDLES } from "@/lib/seo";
import { getAllProducts } from "@/lib/shopify/products";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // A Shopify outage must not take the whole sitemap down with it.
  const products = await getAllProducts().catch(() => []);

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/produkter`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...products
      .filter((p) => !UNINDEXED_PRODUCT_HANDLES.has(p.handle))
      .map((p) => ({
        url: `${SITE_URL}/produkter/${p.handle}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    { url: `${SITE_URL}/om-os`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...["handelsbetingelser", "levering", "returnering", "privatlivspolitik"].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
