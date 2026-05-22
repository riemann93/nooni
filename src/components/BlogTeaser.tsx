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
                The photo is rendered as a background image (not <Image>)
                so it can be zoomed + panned independently of the arch
                frame — object-cover gave no zoom-out control. The arch
                geometry is unchanged:
                  w-full on mobile → full arch visible.
                  w-[200%] on desktop → arch is twice the column width so
                  the outer container clips the right half (half-arch teaser).

                Two knobs for framing the photo (don't touch the arch):
                  backgroundSize     — zoom. Smaller value = objects look
                                       smaller / more of the photo shows.
                  backgroundPosition — pan. Lower first % = shifted further
                                       left (more of the bag in frame).
                The cream backgroundColor fills any gap seamlessly since
                the whole section is already cream.
              */}
              <div
                className="absolute top-0 bottom-0 left-0 w-full overflow-hidden md:w-[200%]"
                style={{
                  borderRadius: "9999px 9999px 0 0",
                  backgroundColor: "var(--color-nooni-bg-warm)",
                  backgroundImage: `url(${post.image})`,
                  backgroundRepeat: "no-repeat",
                  // Desktop box is 200% of the column; only the left half
                  // is visible. backgroundSize is a % of that full box
                  // WIDTH, so 50% ≈ the visible half-arch width — the
                  // photo spans the visible arch, bag shown whole (zoomed
                  // out from the old hard crop). Raise the % for a bigger
                  // bag, lower it for smaller.
                  backgroundSize: "50% auto",
                  // Vertical > 100% pushes the photo below the arch base
                  // (moves it down, cropping a sliver off the bottom).
                  // Raise toward 150% to move further down, back to
                  // "bottom"/100% to sit flush at the base.
                  backgroundPosition: "left 125%",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
