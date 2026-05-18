import Image from "next/image";
import Link from "next/link";
import { getLatestPost } from "@/lib/blog";

export default async function BlogTeaser() {
  const post = getLatestPost();
  if (!post) return null;

  return (
    <section id="blog" className="relative z-[1] bg-nooni-bg py-24" data-screen-label="05 Blog">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
          Fra bloggen
        </span>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr]">
            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-12 md:px-14 md:py-16">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-nooni-sub">
                {post.date}
              </p>
              <h2 className="mb-5 font-editorial text-[clamp(26px,3vw,40px)] leading-[1.15] text-nooni-ink">
                {post.title}
              </h2>
              <p className="mb-9 max-w-[440px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="self-start inline-flex items-center gap-2 rounded-full border border-nooni-sub px-6 py-2.5 text-sm text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
              >
                Læs mere
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Image — arched top, right edge cropped by the container */}
            <div className="relative min-h-[320px] md:min-h-0">
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: "9999px 9999px 0 0" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
