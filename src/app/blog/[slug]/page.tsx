import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-28">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
      >
        <span aria-hidden>←</span> Tilbage
      </Link>

      {/* Two-column layout: text left, image right */}
      <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_0.85fr] md:gap-20">
        {/* Left: article text */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-nooni-sub">{post.date}</p>
          <h1 className="mt-3 mb-10 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] text-nooni-ink">
            {post.title}
          </h1>
          <div className="space-y-6 font-editorial text-xl leading-relaxed text-nooni-ink-soft">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
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
