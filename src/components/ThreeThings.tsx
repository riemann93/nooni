/**
 * ThreeThings: "3 ting jeg ville ønske, jeg havde vidst", tips from
 * one parent to another in Camilla's voice. Modelled on her best
 * Instagram post, which was advice, not an ad, so this section sells
 * nothing directly. The quiet link at the end goes to the blog.
 *
 * Copy lives in THREE_THINGS in src/lib/why-parents-buy.ts.
 */

import Image from "next/image";
import Link from "next/link";
import { THREE_THINGS } from "@/lib/why-parents-buy";

export default function ThreeThings() {
  return (
    <section className="bg-nooni-bg py-5 md:py-[45px]" data-screen-label="06 Tips">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm md:grid md:grid-cols-[0.8fr_1.2fr]">
          <div
            className="relative min-h-[240px] md:min-h-[420px]"
            style={{ borderRadius: "0 250px 0 0", overflow: "hidden" }}
          >
            <Image
              src="/images/familie_1.jpg"
              alt="En far og to små piger ved et træ i skoven"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>

          <div className="px-5 py-7 md:px-10 md:py-12 lg:px-14">
            <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
              Fra mor til mor
            </p>
            <h2
              className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              3 ting, jeg ville ønske, jeg havde vidst{" "}
              <em className="italic text-nooni-headline">som ny mor</em>
            </h2>

            <ol className="mt-6 space-y-5 md:mt-8 md:space-y-6">
              {THREE_THINGS.map((tip, i) => (
                <li key={tip.title} className="flex gap-4">
                  <span className="w-7 shrink-0 font-display text-3xl font-medium leading-none text-nooni-headline md:text-4xl">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-editorial text-xl italic font-medium leading-tight text-nooni-ink">
                      {tip.title}
                    </h3>
                    <p
                      className="mt-1.5 font-editorial leading-relaxed text-nooni-ink-soft"
                      style={{ fontSize: "var(--nooni-text-body)" }}
                    >
                      {tip.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-7 font-editorial text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
              Kærlig hilsen Camilla.{" "}
              <Link href="/blog" className="text-nooni-sub underline underline-offset-4 hover:text-nooni-headline">
                Flere gode råd
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
