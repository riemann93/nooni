"use client";

/**
 * HeroClient — homepage hero markup plus the unfolding Dots designer.
 *
 * Resting state:
 *   - A cream rounded pill, full content width
 *   - Left: profile picture + "Hej, jeg er Camilla" note, headline, a
 *     short line in Camilla's voice, and the "Design dine Dots" CTA
 *   - Right: a Dots lifestyle photo in the brand's arch frame, with a
 *     reel-style note laid over its bottom edge
 *
 * Expanded state (after "Design dine Dots"):
 *   - The pill grows downward (CSS grid-template-rows 0fr → 1fr, per
 *     the implementation note in design/homepage-spec.md) and shows a
 *     live preview next to the same form and add-to-cart button the
 *     product page uses (<ProductPurchaseSection />). The page never
 *     navigates; the cart drawer opens as usual on add.
 *   - The designer mounts on first open only, so the resting homepage
 *     ships no form state and stays as light as before.
 *
 * Without designer data (Shopify unreachable), the CTA is a plain link
 * to the product page.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InstaNote from "@/components/InstaNote";
import ProductPreview from "@/components/personalization/ProductPreview";
import ProductPurchaseSection from "@/components/personalization/ProductPurchaseSection";
import type { ColorOption, PersonalizationSchema } from "@/lib/shopify/personalization";
import type { ProductVariant } from "@/lib/shopify/types";

export interface HeroDesignerData {
  handle: string;
  title: string;
  variants: ProductVariant[];
  schema: PersonalizationSchema;
  priceLabel: string;
  availableForSale: boolean;
}

const HERO_PHOTO = {
  src: "/images/dots_name_lifestyle.jpg",
  alt: "Dots med navnet Elvira på lynlåsen af en børnerygsæk",
};

const DESIGNER_ID = "hero-dots-designer";

/** First colour field's options, for the live preview. */
function paletteFromSchema(schema: PersonalizationSchema): readonly ColorOption[] | undefined {
  for (const f of schema.fields) {
    if (f.type === "color" && f.options) return f.options;
  }
  return undefined;
}

export default function HeroClient({ designer }: { designer: HeroDesignerData | null }) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  const palette = designer ? paletteFromSchema(designer.schema) : undefined;
  const productHref = `/produkter/${designer?.handle ?? "dots-med-navn-3stk"}`;

  const openDesigner = useCallback(() => {
    setHasOpened(true);
    setOpen(true);
  }, []);

  // Bring the unfolded designer into view once it has started to open.
  useEffect(() => {
    if (!open) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    }, 150);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-5 md:px-10 md:pt-4 md:pb-8 lg:pt-6 lg:pb-[45px]">
        <div className="overflow-hidden rounded-[2rem] bg-nooni-bg-warm">
          <div className="grid grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/camilla-profil.png"
                  alt="Camilla"
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full ring-2 ring-nooni-bg md:h-14 md:w-14"
                />
                <InstaNote variant="blush" className="text-[clamp(15px,1.4vw,19px)]">
                  Hej, jeg er Camilla
                </InstaNote>
              </div>

              <h1
                className="mt-5 font-editorial leading-[1.05] tracking-tight text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-heading-lg)" }}
              >
                Små hjælpere, så dit barn{" "}
                <span className="italic text-nooni-headline">kan selv</span>
              </h1>

              <p
                className="mt-5 max-w-[460px] font-editorial leading-relaxed text-nooni-ink-soft"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                Jeg er mor til to små piger og tidligere lærer. Jeg designer og
                3D-printer ting, der hjælper børn med at klare lidt mere selv.
                Alt bliver printet hjemme hos mig, i lige de farver, du vælger.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                {designer ? (
                  <button
                    type="button"
                    onClick={open ? () => setOpen(false) : openDesigner}
                    aria-expanded={open}
                    aria-controls={DESIGNER_ID}
                    className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
                    style={{ fontSize: "var(--nooni-text-ui)" }}
                  >
                    {open ? "Luk designeren" : "Design dine Dots"}
                    <span
                      aria-hidden
                      className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    >
                      ↓
                    </span>
                  </button>
                ) : (
                  <Link
                    href={productHref}
                    className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
                    style={{ fontSize: "var(--nooni-text-ui)" }}
                  >
                    Design dine Dots
                  </Link>
                )}
                <Link
                  href="/produkter"
                  className="inline-flex items-center gap-1 py-3 text-nooni-sub transition-colors hover:text-nooni-headline"
                  style={{ fontSize: "var(--nooni-text-ui)" }}
                >
                  Se alle produkter
                  <span aria-hidden>›</span>
                </Link>
              </div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[520px] md:order-2">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_18px_40px_-20px_rgba(120,80,70,0.45)]"
                style={{ borderRadius: "9999px 9999px 28px 28px" }}
              >
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 520px, 90vw"
                  className="object-cover object-[center_45%] scale-110"
                />
              </div>

              <InstaNote
                variant="cream"
                className="absolute bottom-6 left-1/2 w-max max-w-[90%] -translate-x-1/2 text-center text-[clamp(14px,1.3vw,18px)]"
              >
                I lige den farve der passer til dig
              </InstaNote>
            </div>
          </div>

          {designer && (
            <div
              id={DESIGNER_ID}
              ref={panelRef}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                {hasOpened && (
                  <div className="mx-5 mb-8 border-t border-nooni-line pt-8 md:mx-10 md:mb-12 md:pt-10 lg:mx-14">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 md:items-start">
                      <div className="mx-auto w-full max-w-[460px] md:sticky md:top-24">
                        <ProductPreview handle={designer.handle} values={values} colors={palette} fullSize />
                      </div>

                      <div>
                        <InstaNote variant="blush" className="text-[clamp(14px,1.2vw,16px)]">
                          Design dine Dots
                        </InstaNote>
                        <h2
                          className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                          style={{ fontSize: "var(--nooni-text-heading-md)" }}
                        >
                          Skriv navnet, og vælg{" "}
                          <span className="italic text-nooni-headline">farverne</span>
                        </h2>
                        <p className="mt-3 font-editorial text-[1.4rem] font-medium text-nooni-ink">
                          {designer.priceLabel}
                          <span className="ml-2 text-sm font-normal text-nooni-ink-soft">for 3 stk.</span>
                        </p>

                        {designer.availableForSale ? (
                          <ProductPurchaseSection
                            handle={designer.handle}
                            variants={designer.variants}
                            schema={designer.schema}
                            onValuesChange={setValues}
                          />
                        ) : (
                          <p className="mt-5 text-sm text-nooni-ink-soft">
                            Dots med navn er udsolgt lige nu.
                          </p>
                        )}

                        <Link
                          href={productHref}
                          className="mt-6 inline-flex items-center gap-1 text-nooni-sub transition-colors hover:text-nooni-headline"
                          style={{ fontSize: "var(--nooni-text-ui)" }}
                        >
                          Se billeder og flere detaljer
                          <span aria-hidden>›</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
