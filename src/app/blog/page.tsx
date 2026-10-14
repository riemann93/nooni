/**
 * /blog: "Gode råd", a simple guide list.
 *
 * The URL stays /blog (no redirects). The page supports search quietly
 * and points readers at the name tags: a plain list of guides, and one
 * calm pointer to /navnemaerker below it.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gode råd om navnemærker og hverdagen med børn",
  description:
    "Gode råd fra Camilla, lærer og mor til to: navnemærker, vuggestue og skolestart, og hvordan Noonis ting bliver til.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section
      className="relative z-[1] bg-nooni-bg py-[45px]"
      data-screen-label="Gode råd"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-8 py-14 md:px-16 md:py-20">
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
            Fra Camilla
          </span>
          <h1
            className="mt-5 mb-4 font-editorial leading-[1.05] tracking-tight text-nooni-ink"
            style={{ fontSize: "var(--nooni-text-heading-lg)" }}
          >
            Gode <em className="italic text-nooni-headline">råd</em>
          </h1>
          <p
            className="mb-12 max-w-[560px] font-editorial leading-relaxed text-nooni-ink-soft md:mb-14"
            style={{ fontSize: "var(--nooni-text-body-lg)" }}
          >
            Korte guides om navnemærker og hverdagen med børn i vuggestue,
            børnehave og skole.
          </p>

          {posts.length === 0 ? (
            <p className="font-editorial text-lg text-nooni-ink-soft">
              Der er ingen guides endnu. Kig forbi igen snart.
            </p>
          ) : (
            <ul className="divide-y divide-nooni-line border-y border-nooni-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-7 md:py-8"
                  >
                    <h2
                      className="font-editorial leading-[1.2] text-nooni-ink transition-colors group-hover:text-nooni-headline"
                      style={{ fontSize: "var(--nooni-text-heading-sm)" }}
                    >
                      {post.draft && (
                        <span className="mr-3 inline-block -translate-y-1 rounded-full border border-dashed border-nooni-headline px-3 py-0.5 align-middle font-sans text-xs uppercase tracking-[0.18em] text-nooni-headline">
                          Kladde
                        </span>
                      )}
                      {post.title}
                    </h2>
                    <p
                      className="mt-2 max-w-[720px] font-editorial leading-relaxed text-nooni-ink-soft"
                      style={{ fontSize: "var(--nooni-text-body)" }}
                    >
                      {post.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/navnemaerker"
              className="inline-flex items-center rounded-full bg-nooni-headline px-6 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
              style={{ fontSize: "var(--nooni-text-ui)" }}
            >
              Se vores navnemærker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
