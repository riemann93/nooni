import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { blogPostJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Indlæg ikke fundet" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const blocks = post.content.split(/\r?\n\r?\n+/).filter(Boolean);

  return (
    <article className="mx-auto max-w-[920px] px-6 pt-8 pb-16 md:px-10 md:pt-14 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogPostJsonLd(post)) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
      >
        Tilbage til bloggen
      </Link>

      <p className="mt-10 text-xs uppercase tracking-[0.18em] text-nooni-sub">
        {post.date}
      </p>
      <h1
        className="mt-3 mb-10 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.15] text-nooni-ink"
        style={{ textWrap: "balance" }}
      >
        {renderTitle(post.title)}
      </h1>

      <div className="font-editorial text-xl leading-[1.7] text-nooni-ink-soft">
        {/*
          On mobile: image renders full-width before the body.
          On desktop: image floats right and the article text wraps
          around and underneath it — classic editorial layout.
        */}
        <div className="mb-6 md:float-right md:mb-4 md:ml-8 md:w-[42%]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>

        {blocks.map((block, i) => renderBlock(block, i))}

        {/* Make sure floating image is contained — prevents overflow */}
        <div className="clear-both" />
      </div>
    </article>
  );
}

/**
 * Renders a post title with the trailing parenthetical (if any) styled
 * in the brand-accent treatment — italic Cormorant Light in the warm
 * headline colour, matching the homepage's `<em>` emphasis pattern.
 *
 * "Hvad er 3D-print? (Og hvordan…)" →
 *    [Hvad er 3D-print?]  [<em>(Og hvordan…)</em>]
 */
function renderTitle(title: string): ReactNode {
  const match = title.match(/^(.*?)\s*(\([^)]+\))\s*$/);
  if (!match) return title;
  const [, main, paren] = match;
  return (
    <>
      {main}
      <br />
      <em className="italic text-nooni-headline">{paren}</em>
    </>
  );
}

/**
 * Minimal markdown block renderer for blog content.
 *
 * Handles:
 *   - "### " heading lines → <h3>
 *   - Blocks where every line matches "N. " → <ol> with parsed items
 *   - Everything else → <p>, preserving single-newline line breaks
 *
 * Inline `**bold**` is rendered as <strong> inside any of the above.
 * The codebase has no markdown dependency by design; this stays tiny
 * and easy to extend if the post format grows.
 */
function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("### ")) {
    return (
      <h3
        key={key}
        className="mt-10 mb-3 first:mt-0 font-editorial text-2xl leading-snug text-nooni-ink"
      >
        {renderInline(block.slice(4))}
      </h3>
    );
  }

  const lines = block.split(/\r?\n/);
  if (lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l))) {
    return (
      <ol key={key} className="my-6 ml-6 list-decimal space-y-2">
        {lines.map((line, i) => (
          <li key={i} className="pl-1">
            {renderInline(line.replace(/^\d+\.\s/, ""))}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p key={key} className="mb-6 last:mb-0">
      {renderInline(block)}
    </p>
  );
}

function renderInline(text: string): ReactNode[] {
  const lines = text.split(/\r?\n/);
  const out: ReactNode[] = [];
  let key = 0;

  lines.forEach((line, lineIdx) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        out.push(line.slice(lastIndex, match.index));
      }
      out.push(<strong key={`b${key++}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      out.push(line.slice(lastIndex));
    }
    if (lineIdx < lines.length - 1) {
      out.push(<br key={`br${key++}`} />);
    }
  });

  return out;
}
