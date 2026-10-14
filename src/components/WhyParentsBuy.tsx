/**
 * WhyParentsBuy: the five reasons parents buy Dots, as told in the
 * Instagram posts that sell. Sits right under the product row, so the
 * story follows the first look at the product.
 *
 * The first reason ("Det er min, den her!") gets the wide arched photo
 * card; the other four sit beside it as short text cards. Copy lives
 * in src/lib/why-parents-buy.ts.
 */

import Image from "next/image";
import { REASONS } from "@/lib/why-parents-buy";

export default function WhyParentsBuy() {
  const [lead, ...rest] = REASONS;

  return (
    <section className="bg-nooni-bg py-5 md:py-[45px]" data-screen-label="04 Why">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <p className="uppercase tracking-[0.22em] text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
          Derfor vælger forældre Dots
        </p>
        <h2
          className="mt-3 max-w-3xl font-editorial leading-[1.1] tracking-tight text-nooni-ink"
          style={{ fontSize: "var(--nooni-text-heading-md)" }}
        >
          Mere end et navn. Et barn, der{" "}
          <em className="italic text-nooni-headline">klarer det selv</em>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-[1.1fr_1fr] md:gap-6">
          <article className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
            <div
              className="relative mx-5 mt-5 aspect-[4/3] overflow-hidden md:mx-6 md:mt-6"
              style={{ borderRadius: "250px 250px 22px 22px" }}
            >
              <Image
                src="/images/dots_motif_lifestyle.jpg"
                alt="Dots med et blomstersymbol på lynlåsen af en lille rygsæk"
                fill
                sizes="(min-width: 768px) 560px, 90vw"
                className="object-cover object-[center_40%]"
              />
            </div>
            <div className="px-5 pt-5 pb-6 md:px-8 md:pb-8">
              <h3
                className="font-editorial italic leading-tight text-nooni-headline"
                style={{ fontSize: "var(--nooni-text-heading-sm)" }}
              >
                {lead.title}
              </h3>
              <p
                className="mt-2 font-editorial leading-relaxed text-nooni-ink-soft"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                {lead.body}
              </p>
            </div>
          </article>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {rest.map((reason, i) => (
              <li key={reason.key} className="flex flex-col rounded-[2rem] bg-nooni-bg-warm px-5 py-6 md:px-7 md:py-7">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-t-full rounded-b-[10px] bg-nooni-cool font-display text-lg font-medium text-nooni-sub"
                >
                  {i + 2}
                </span>
                <h3 className="mt-4 font-editorial text-xl italic font-medium leading-tight text-nooni-ink">
                  {reason.title}
                </h3>
                <p
                  className="mt-1.5 font-editorial leading-relaxed text-nooni-ink-soft"
                  style={{ fontSize: "var(--nooni-text-body)" }}
                >
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
