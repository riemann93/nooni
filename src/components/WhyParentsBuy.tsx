/**
 * WhyParentsBuy: the five reasons parents buy Dots, as told in the
 * Instagram posts that sell. Right under the hero, so the story backs
 * up the tag they just designed.
 *
 * One real photo with the first reason on it, the other four as a
 * quiet numbered list with hairlines. No cards: it should read like a
 * parent explaining, not a feature grid. Copy lives in
 * src/lib/why-parents-buy.ts.
 */

import Image from "next/image";
import { REASONS } from "@/lib/why-parents-buy";

export default function WhyParentsBuy() {
  const [lead, ...rest] = REASONS;

  return (
    <section className="bg-nooni-bg py-8 md:py-16" data-screen-label="02 Why">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:grid-cols-[1fr_1fr] md:items-center md:gap-14 md:px-10">
        <figure className="relative overflow-hidden" style={{ borderRadius: "999px 999px 28px 28px" }}>
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/dots_name_lifestyle.jpg"
              alt="Dots med navn på lynlåsen af en lille rygsæk"
              fill
              sizes="(min-width: 768px) 560px, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute inset-x-3 bottom-3 rounded-[20px] bg-nooni-bg/90 px-5 py-4 backdrop-blur md:inset-x-5 md:bottom-5 md:px-6 md:py-5">
            <p className="font-editorial italic text-nooni-headline" style={{ fontSize: "var(--nooni-text-heading-sm)" }}>
              {lead.title}
            </p>
            <p className="mt-1 font-editorial leading-relaxed text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
              {lead.body}
            </p>
          </figcaption>
        </figure>

        <div>
          <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
            Derfor vælger forældre Dots
          </p>
          <h2
            className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
            style={{ fontSize: "var(--nooni-text-heading-md)" }}
          >
            Mere end et navn. Et barn, der{" "}
            <em className="italic text-nooni-headline">klarer det selv</em>
          </h2>

          <ol className="mt-6 divide-y divide-nooni-line-soft border-y border-nooni-line-soft md:mt-8">
            {rest.map((reason) => (
              <li key={reason.key} className="flex gap-4 py-5">
                <span
                  aria-hidden
                  className="mt-1 h-5 w-4 shrink-0 rounded-t-full rounded-b-[5px] bg-nooni-cool"
                />
                <div>
                  <h3 className="font-editorial text-lg font-medium leading-tight text-nooni-ink md:text-xl">
                    {reason.title}
                  </h3>
                  <p className="mt-1 font-editorial leading-relaxed text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
