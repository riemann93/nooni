import fs from "fs";
import path from "path";
import { LEAD_NAME_TAG } from "@/lib/product-meta";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  /** Shopify handle of the matching name-tag product (CTA card). */
  product: string;
  content: string;
  /** From content/drafts: waiting for Camilla, never on the live site. */
  draft: boolean;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { data, content: match[2].trim() };
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const DRAFTS_DIR = path.join(process.cwd(), "content/drafts");

/** Drafts show on previews and locally so Camilla can read them, never on nooni.dk. */
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== "production";

function readDir(dir: string, draft: boolean): BlogPost[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        image: data.image ?? "/images/dots_name_lifestyle.jpg",
        product: data.product ?? LEAD_NAME_TAG,
        content,
        draft,
      };
    });
}

/** Published posts, plus drafts where SHOW_DRAFTS allows. */
export function getAllPosts(): BlogPost[] {
  return [...readDir(POSTS_DIR, false), ...(SHOW_DRAFTS ? readDir(DRAFTS_DIR, true) : [])].sort(
    (a, b) => (a.date > b.date ? -1 : 1),
  );
}

/** Only posts that are out for real: for the sitemap, llms.txt and the hub. */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => !p.draft);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getLatestPost(): BlogPost | null {
  return getAllPosts()[0] ?? null;
}
