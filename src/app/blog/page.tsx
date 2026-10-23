/**
 * /blog — index of all blog posts.
 *
 * Section rhythm follows the rest of the site (py-[45px] = 90 px gaps).
 * Each post renders as a horizontal card matching the homepage
 * BlogTeaser style, so a returning reader recognises the visual.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Nyheder, indblik og fortællinger fra Nooni om 3D-print, design og hverdagsliv med børn.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section
      className="relative z-[1] bg-nooni-bg py-[45px]"
      data-screen-label="Blog"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-8 py-14 md:px-16 md:py-20">
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
            Bloggen
          </span>
          <h1 className="mt-5 mb-12 font-editorial text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-tight text-nooni-ink md:mb-16">
            Nyt fra{" "}
            <em className="italic text-nooni-headline">Nooni</em>
          </h1>

          {posts.length === 0 ? (
            <p className="font-editorial text-lg text-nooni-ink-soft">
              Der er ikke nogen indlæg endnu — kig forbi igen snart.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-[1.5rem] bg-nooni-bg transition-shadow hover:shadow-[0_18px_36px_-12px_rgba(180,131,131,0.28)]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-nooni-bg-warm">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 600px, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="px-8 py-7">
                      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-nooni-sub">
                        {post.date}
                      </p>
                      <h2 className="mb-3 font-editorial text-[clamp(22px,2.4vw,30px)] leading-[1.2] text-nooni-ink">
                        {post.title}
                      </h2>
                      <p className="font-editorial text-base leading-relaxed text-nooni-ink-soft">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm text-nooni-headline">
                        Læs mere
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
