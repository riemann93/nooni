import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const blocks = post.content.split(/\r?\n\r?\n+/).filter(Boolean);

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-28">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
      >
        <span aria-hidden>←</span> Tilbage til bloggen
      </Link>

      {/* Two-column layout: text left, image right */}
      <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_0.85fr] md:gap-20">
        {/* Left: article text */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-nooni-sub">{post.date}</p>
          <h1 className="mt-3 mb-10 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] text-nooni-ink">
            {post.title}
          </h1>
          <div className="font-editorial text-xl leading-relaxed text-nooni-ink-soft">
            {blocks.map((block, i) => renderBlock(block, i))}
          </div>
        </div>

        {/* Right: image — no arch, plain rounded rectangle */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl md:sticky md:top-28">
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
    </main>
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
        className="mt-12 mb-4 first:mt-0 font-editorial text-2xl text-nooni-ink"
      >
        {renderInline(block.slice(4))}
      </h3>
    );
  }

  const lines = block.split(/\r?\n/);
  if (lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l))) {
    return (
      <ol key={key} className="my-6 ml-6 list-decimal space-y-3">
        {lines.map((line, i) => (
          <li key={i}>{renderInline(line.replace(/^\d+\.\s/, ""))}</li>
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
