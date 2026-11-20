/**
 * JuleBanner — seasonal section on the homepage pointing to Juleby.
 *
 * Shows a short pitch, a "Se julebyen" button and a strip of house
 * photos from Shopify. Seasonal: remove <JuleBanner /> from
 * src/app/page.tsx after Christmas.
 */

import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/1039/4196/4106/files";

const HOUSES = [
  { src: `${CDN}/juleby-kirke.jpg`, alt: "Gul kirke fra Noonis juleby" },
  { src: `${CDN}/juleby-hoejt-hus.jpg`, alt: "Højt lilla hus fra Noonis juleby" },
  { src: `${CDN}/juleby-lille-hus-roed.jpg`, alt: "Lille rødt hus fra Noonis juleby" },
  { src: `${CDN}/juleby-lille-hus-rosa.jpg`, alt: "Højt lyserødt hus fra Noonis juleby" },
];

export default function JuleBanner() {
  return (
    <section className="bg-nooni-bg py-3 md:py-6" data-screen-label="Jul">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="grid items-center gap-5 rounded-[2rem] bg-nooni-bg-warm px-5 py-6 md:grid-cols-[1fr_1.2fr] md:gap-10 md:px-12 md:py-10">
          <div>
            <p
              className="uppercase tracking-[0.22em] text-nooni-sub"
              style={{ fontSize: "var(--nooni-text-label)" }}
            >
              Nyhed til jul
            </p>
            <h2
              className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              Byg jeres egen{" "}
              <em className="italic text-nooni-headline">juleby</em>
            </h2>
            <p
              className="mt-3 max-w-md font-editorial leading-snug text-nooni-ink-soft"
              style={{ fontSize: "var(--nooni-text-body-lg)" }}
            >
              Ét hus ad gangen. Børnene stiller selv byen op og flytter rundt
              på den hele december.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <Link
                href="/produkter/juleby"
                className="inline-flex items-center rounded-full bg-nooni-headline px-7 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
                style={{ fontSize: "var(--nooni-text-ui)" }}
              >
                Se julebyen
              </Link>
              <span className="text-sm text-nooni-ink-soft">Fra 15 kr.</span>
            </div>
          </div>

          <Link
            href="/produkter/juleby"
            aria-label="Se julebyen"
            className="grid grid-cols-4 gap-2 md:gap-3"
          >
            {HOUSES.map((h) => (
              <span
                key={h.src}
                className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-nooni-bg"
              >
                <Image
                  src={h.src}
                  alt={h.alt}
                  fill
                  sizes="(min-width: 768px) 160px, 22vw"
                  className="object-cover scale-[1.6] object-[50%_42%]"
                />
              </span>
            ))}
          </Link>
        </div>
      </div>
    </section>
  );
}
