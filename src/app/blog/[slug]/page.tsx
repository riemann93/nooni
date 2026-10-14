import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import AuthorBox from "@/components/AuthorBox";
import PostProductCTA from "@/components/PostProductCTA";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { blogPostJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

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
  const metadata = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: ["Camilla"],
      images: [{ url: post.image, alt: post.title }],
    },
  });
  return post.draft ? { ...metadata, robots: { index: false, follow: false } } : metadata;
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
        Tilbage til gode råd
      </Link>

      {post.draft && (
        <p className="mt-8 rounded-2xl border border-dashed border-nooni-headline bg-nooni-bg-warm px-5 py-4 text-sm leading-relaxed text-nooni-ink">
          <strong>Kladde.</strong> Kun synlig på preview, ikke på nooni.dk. Udfyld de
          markerede felter og tjek fakta, og flyt så filen fra content/drafts til
          content/posts for at udgive.
        </p>
      )}

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
              preload
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>

        {blocks.map((block, i) => renderBlock(block, i))}

        {/* Make sure floating image is contained — prevents overflow */}
        <div className="clear-both" />
      </div>

      <PostProductCTA handle={post.product} />
      <AuthorBox />
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
 *   - "### " heading lines → <h2> (the post title is the h1)
 *   - "<!-- ... -->" notes → a dashed note box (drafts use them for photo
 *     wishes; they never reach a published post)
 *   - "| a | b |" tables, with a "|---|" divider after the header row
 *   - Blocks where every line matches "N. " → <ol>, "- " → <ul>
 *     ("- [ ] " items get an empty checkbox, for checklists)
 *   - Everything else → <p>, preserving single-newline line breaks
 *
 * Inline `**bold**`, `[text](/link)` and `[CAMILLA: ...]` notes are
 * rendered inside any of the above. The codebase has no markdown
 * dependency by design; this stays tiny and easy to extend.
 */
function renderBlock(block: string, key: number): ReactNode {
  if (block.startsWith("<!--")) {
    const note = block.replace(/^<!--\s*/, "").replace(/\s*-->$/, "");
    return (
      <div
        key={key}
        className="my-6 whitespace-pre-line rounded-2xl border border-dashed border-nooni-sub px-5 py-4 font-sans text-sm leading-relaxed text-nooni-sub"
      >
        {note.split(/\s*-->\s*<!--\s*/).join("\n")}
      </div>
    );
  }

  if (block.startsWith("### ")) {
    return (
      <h2
        key={key}
        className="mt-10 mb-3 first:mt-0 font-editorial text-2xl leading-snug text-nooni-ink"
      >
        {renderInline(block.slice(4))}
      </h2>
    );
  }

  const lines = block.split(/\r?\n/);

  if (lines.every((l) => l.startsWith("|"))) {
    const rows = lines
      .filter((l) => !/^\|[\s|:-]+\|$/.test(l))
      .map((l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    const [head, ...body] = rows;
    return (
      <div key={key} className="clear-both my-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse font-sans text-sm leading-snug">
          <thead>
            <tr>
              {head.map((cell, i) => (
                <th key={i} className="border-b border-nooni-line px-3 py-2 text-left font-medium text-nooni-ink">
                  {renderInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, r) => (
              <tr key={r}>
                {row.map((cell, i) => (
                  <td key={i} className="border-b border-nooni-line px-3 py-2 align-top">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (lines.every((l) => /^\d+\.\s/.test(l))) {
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

  if (lines.every((l) => /^- /.test(l))) {
    const checklist = lines.every((l) => l.startsWith("- [ ] "));
    return (
      <ul key={key} className={checklist ? "my-6 space-y-2" : "my-6 ml-6 list-disc space-y-2"}>
        {lines.map((line, i) =>
          checklist ? (
            <li key={i} className="flex items-baseline gap-3">
              <span aria-hidden className="inline-block h-4 w-4 shrink-0 translate-y-0.5 rounded border border-nooni-sub" />
              <span>{renderInline(line.slice(6))}</span>
            </li>
          ) : (
            <li key={i} className="pl-1">
              {renderInline(line.slice(2))}
            </li>
          ),
        )}
      </ul>
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
    const tokenRegex = /\*\*([^*]+)\*\*|\[(CAMILLA:[^\]]*)\]|\[([^\]]+)\]\(([^)\s]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        out.push(line.slice(lastIndex, match.index));
      }
      if (match[1] !== undefined) {
        out.push(<strong key={`b${key++}`}>{match[1]}</strong>);
      } else if (match[2] !== undefined) {
        out.push(
          <mark key={`c${key++}`} className="rounded bg-nooni-bg-warm px-1 font-sans text-base text-nooni-headline">
            [{match[2]}]
          </mark>,
        );
      } else {
        out.push(
          <Link
            key={`a${key++}`}
            href={match[4]}
            className="text-nooni-headline underline underline-offset-4 hover:text-nooni-ink"
          >
            {match[3]}
          </Link>,
        );
      }
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
