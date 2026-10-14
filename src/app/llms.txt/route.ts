/**
 * /llms.txt: a short Markdown index of Nooni for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini). /llms-full.txt has everything
 * in full. Shared content lives in src/lib/llms.ts. Regenerated hourly.
 */

import { getAllPosts } from "@/lib/blog";
import { ABOUT_LINKS, getCatalogue, hubSection, INTRO, priceText } from "@/lib/llms";
import { metaDescription, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const products = await getCatalogue();

  // da-DK prices already end in "kr.", so no extra full stop.
  const productLines = products.map((p) =>
    `- [${p.title}](${SITE_URL}/produkter/${p.handle}): ${priceText(p)} ${metaDescription(p.description, 220)}`.trimEnd(),
  );

  const postLines = getAllPosts().map(
    (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`,
  );

  const body = `${INTRO}

${hubSection({ full: false })}

## Produkter

${productLines.join("\n")}

## Om Nooni

${ABOUT_LINKS}

## Blog

${postLines.join("\n")}

## Optional

- [Alt indhold i fuld længde](${SITE_URL}/llms-full.txt)
- [Alle produkter](${SITE_URL}/produkter)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
