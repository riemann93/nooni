/**
 * BlackFridayGuide — seasonal strip at the very top of the homepage for
 * visitors arriving from the Black Friday reel (27.–30. nov 2026).
 *
 * Tells them their code gives free shipping (DK + SE) and points straight
 * to the three things the reel showed. The code itself is follower-only,
 * so it is not printed here. Seasonal: remove <BlackFridayGuide /> from
 * src/app/page.tsx after 30 Nov.
 */

import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/1039/4196/4106/files";

const PICKS = [
  {
    href: "/produkter/dots-med-navn-3stk",
    src: `${CDN}/DSC04411.jpg?v=1779396572`,
    title: "Navnemærker til tøj",
    price: "70 kr.",
  },
  {
    href: "/produkter/emblem",
    src: `${CDN}/20260623_135033.jpg?v=1782216202`,
    title: "Nøgleringe med navn",
    price: "50 kr.",
  },
  {
    href: "/produkter/juleby",
    src: `${CDN}/juleby-kirke.jpg`,
    title: "Juleby",
    price: "Fra 15 kr.",
  },
];

export default function BlackFridayGuide() {
  return (
    <section className="bg-nooni-bg pt-3 md:pt-6" data-screen-label="Black Friday">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="rounded-[2rem] bg-nooni-bg-warm px-5 py-6 md:px-12 md:py-10">
          <p
            className="uppercase tracking-[0.22em] text-nooni-sub"
            style={{ fontSize: "var(--nooni-text-label)" }}
          >
            Black Friday · 27.–30. nov
          </p>
          <h2
            className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
            style={{ fontSize: "var(--nooni-text-heading-md)" }}
          >
            Gratis fragt med{" "}
            <em className="italic text-nooni-headline">din kode</em>
          </h2>
          <p
            className="mt-3 max-w-xl font-editorial leading-snug text-nooni-ink-soft"
            style={{ fontSize: "var(--nooni-text-body-lg)" }}
          >
            Find det du så i videoen her. Skriv koden i kassen, så er fragten
            gratis til Danmark og Sverige.
          </p>

          <ul className="mt-5 grid grid-cols-3 gap-2 md:gap-5">
            {PICKS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group block">
                  <span className="relative block aspect-square overflow-hidden rounded-xl bg-nooni-bg">
                    <Image
                      src={p.src}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 360px, 30vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-2 block text-sm leading-tight text-nooni-ink md:text-base">
                    {p.title}
                  </span>
                  <span className="block text-sm text-nooni-ink-soft">{p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
