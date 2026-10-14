/**
 * InstagramStrip: a row of photos that links to @hej.nooni, where the
 * Dots story is told and where most orders start.
 *
 * Instagram images and reels cannot be hotlinked, so the tiles are
 * local photos. Swap them for stills from the posts when Camilla sends
 * them. Every tile is one link to the profile.
 */

import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/why-parents-buy";

const TILES = [
  { src: "/images/dots_name_lifestyle.jpg", alt: "Dots med navn på lynlåsen af en rygsæk" },
  { src: "/images/blog-teaser-poster.jpg", alt: "Printerne i Borris, hvor navnemærkerne bliver til" },
  { src: "/images/dots_motif_lifestyle.jpg", alt: "Dots med blomstersymbol på en rygsæk" },
  { src: "/images/familie_1.jpg", alt: "En far og to små piger ved et træ i skoven" },
];

const SHAPES = [
  "250px 250px 22px 22px",
  "22px",
  "250px 250px 22px 22px",
  "22px",
];

export default function InstagramStrip() {
  return (
    <section className="bg-nooni-bg py-5 md:py-[45px]" data-screen-label="10 Instagram">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
              Følg med på Instagram
            </p>
            <h2
              className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              Hverdagen bag{" "}
              <em className="italic text-nooni-headline">@{INSTAGRAM_HANDLE}</em>
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="self-start rounded-full border border-nooni-sub px-6 py-2.5 text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white md:self-auto"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Følg @{INSTAGRAM_HANDLE}
          </a>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          aria-label={`Se @${INSTAGRAM_HANDLE} på Instagram`}
          className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-5"
        >
          {TILES.map((tile, i) => (
            <div
              key={tile.src}
              className="group relative aspect-square overflow-hidden"
              style={{ borderRadius: SHAPES[i] }}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </a>
      </div>
    </section>
  );
}
