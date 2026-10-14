/**
 * InstagramStrip — "Følg med på @hej.nooni".
 *
 * The bridge back to Instagram, so the site and the feed read as one
 * place. Three square tiles styled like Camilla's posts: a photo with
 * her reel-style text box (<InstaNote />) on top. Every tile links to
 * the Instagram profile.
 *
 * The photos are the site's own images for now. When Camilla picks
 * her favourite posts, drop the pictures in /public/images and swap
 * the `src` values below. The notes are her real hooks from the feed.
 */

import Image from "next/image";
import InstaNote from "@/components/InstaNote";

const INSTAGRAM_URL = "https://www.instagram.com/hej.nooni/";

interface Tile {
  src: string;
  alt: string;
  note: string;
  /** object-position for the square crop. */
  position: string;
}

const TILES: Tile[] = [
  {
    src: "/images/familie_1.jpg",
    alt: "Camilla med sine to piger, familien bag Nooni",
    note: "Kan I finde jeres egen jakke?",
    position: "22% center",
  },
  {
    src: "/images/familie_2.jpg",
    alt: "Camilla, personen bag Nooni",
    note: "Fra bestilling til færdig pakke",
    position: "center 20%",
  },
  {
    src: "/images/dots_motif_lifestyle.jpg",
    alt: "Dots med blomst på lynlåsen af en rygsæk",
    note: "Den perfekte personlige gaveidé",
    position: "center 45%",
  },
];

export default function InstagramStrip() {
  return (
    <section className="relative z-[1] bg-nooni-bg py-5 md:py-[45px]" data-screen-label="06 Instagram">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="mb-6 flex flex-col items-center text-center md:mb-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Camilla på Instagram, @hej.nooni"
            className="mb-4 rounded-full bg-gradient-to-tr from-nooni-warm via-nooni-headline to-nooni-blush p-[3px]"
          >
            <Image
              src="/images/camilla-profil.png"
              alt="Camilla"
              width={80}
              height={80}
              className="h-16 w-16 rounded-full ring-2 ring-nooni-bg md:h-20 md:w-20"
            />
          </a>
          <InstaNote variant="blush" className="text-[clamp(14px,1.2vw,16px)]">
            Kig med i hverdagen
          </InstaNote>
          <h2
            className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
            style={{ fontSize: "var(--nooni-text-heading-md)" }}
          >
            Følg med på{" "}
            <span className="italic text-nooni-headline">@hej.nooni</span>
          </h2>
        </div>

        <ul className="grid grid-cols-3 gap-2 md:gap-4">
          {TILES.map((tile) => (
            <li key={tile.src}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tile.note}. Se opslaget på Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-[1rem] md:rounded-[1.5rem]"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ objectPosition: tile.position }}
                />
                <InstaNote
                  as="span"
                  variant="blush"
                  className="absolute inset-x-2 top-3 hidden text-center text-[clamp(12px,1.2vw,17px)] sm:block md:inset-x-4 md:top-5"
                >
                  {tile.note}
                </InstaNote>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center md:mt-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-nooni-sub px-7 py-3 text-sm text-nooni-sub transition-colors hover:bg-nooni-sub hover:text-white"
          >
            Se mere på Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
