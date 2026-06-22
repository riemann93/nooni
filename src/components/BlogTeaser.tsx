import Link from "next/link";
import { getLatestPost } from "@/lib/blog";

export default async function BlogTeaser() {
  const post = getLatestPost();
  if (!post) return null;

  return (
    <section id="blog" className="relative z-[1] bg-nooni-bg py-5 md:py-[45px]" data-screen-label="05 Blog">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        {/*
          overflow-hidden on this container clips the half-arch on the right:
          the image column's inner div is 200% wide on desktop so the arch
          peak lands right at the container's right edge — only the left
          half of the arch is visible, acting as a visual teaser.
        */}
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr]">
            {/* Text */}
            <div className="flex flex-col justify-center px-5 py-7 md:px-14 md:py-16">
              <span className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
                Fra bloggen
              </span>
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
                className="absolute top-0 bottom-0 left-0 w-full overflow-hidden"
                style={{ borderRadius: "150px 32px 0 0" }}
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  >
                    <source src="/images/20260610_212110.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
