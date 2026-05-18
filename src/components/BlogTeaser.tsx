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

        {/*
          overflow-hidden on this container clips the half-arch on the right:
          the image column's inner div is 200% wide on desktop so the arch
          peak lands right at the container's right edge — only the left
          half of the arch is visible, acting as a visual teaser.
        */}
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

            {/* Half-arch image column — clicking links to the post */}
            <Link
              href={`/blog/${post.slug}`}
              className="group relative block min-h-[320px] md:min-h-0"
              tabIndex={-1}
              aria-hidden
            >
              {/*
                overflow-hidden on this div is what contains the zoom —
                the arch shape stays perfectly still; only the image
                inside scales on hover.
                w-full on mobile → full arch visible.
                w-[200%] on desktop → image is twice the column width so
                the outer container clips the right half (half-arch teaser).
              */}
              <div
                className="absolute top-0 bottom-0 left-0 w-full overflow-hidden md:w-[200%]"
                style={{ borderRadius: "9999px 9999px 0 0" }}
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover object-left transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(min-width: 768px) 80vw, 100vw"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
