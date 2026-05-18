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
    <main className="mx-auto max-w-[760px] px-6 py-20 md:px-10 md:py-32">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
      >
        <span aria-hidden>←</span> Tilbage
      </Link>

      <div
        className="relative mt-10 aspect-[16/9] w-full overflow-hidden"
        style={{ borderRadius: "9999px 9999px 28px 28px" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 760px, 100vw"
        />
      </div>

      <p className="mt-10 text-xs uppercase tracking-[0.18em] text-nooni-sub">{post.date}</p>
      <h1 className="mt-3 font-editorial text-[clamp(32px,4vw,52px)] leading-[1.1] text-nooni-ink">
        {post.title}
      </h1>

      <div className="mt-10 space-y-6 font-editorial text-xl leading-relaxed text-nooni-ink-soft">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </main>
  );
}
