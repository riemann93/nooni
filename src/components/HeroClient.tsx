"use client";

/**
 * HeroClient — homepage hero markup plus the Dots designer.
 *
 * Resting state (desktop):
 *   - One rounded frame, full content width, filled edge to edge by a
 *     photo of a Dots med navn on a jacket zipper
 *   - A cream wash veils the left side so the copy stays legible: the
 *     profile picture + "Hej, jeg er Camilla" note, headline, a short
 *     line in Camilla's voice, and the "Design dine Dots" CTA
 *   - A reel-style note sits on the photo, bottom right
 * On mobile a square photo sits on top, fading into the cream copy below.
 *
 * Designing (after "Design dine Dots"), as one movement:
 *   - the intro fades into the same form and add-to-cart button the
 *     product page uses (<ProductPurchaseSection />), the cream wash
 *     deepens, and the hero grows smoothly to fit the form;
 *   - at the same time the photo zooms in on the tag and becomes the
 *     preview (<DotsPhotoPreview /> paints the chosen colours and name
 *     onto it).
 *   Closing runs it backwards. On desktop the photo stage is sized for
 *   the tallest state up front, so the hero growing never makes the
 *   photo re-fit mid-zoom (which reads as a jump).
 *   The page never navigates; the cart drawer opens as usual on add.
 *   Intro and form both stay rendered (the hidden one invisible and
 *   inert), so their heights can be measured and closing and reopening
 *   keeps what the visitor typed.
 *
 * Without designer data (Shopify unreachable), the CTA is a plain link
 * to the product page.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InstaNote from "@/components/InstaNote";
import DotsPhotoPreview from "@/components/personalization/DotsPhotoPreview";
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

const DESIGNER_ID = "hero-dots-designer";

/** How long the hero takes to grow or shrink. Runs alongside the zoom,
 *  so the two read as one movement. */
const UNFOLD_MS = 900;

/** Where the tag sits and lands on phones (photo above the copy). */
const MOBILE_REST = { x: 0.5, y: 0.5 };
const MOBILE_ZOOM = { x: 0.5, y: 0.5, tagWidth: 0.66 };
/** On desktop the form covers the photo's left half, so the zoomed tag
 *  lands in the right half. */
const DESKTOP_ZOOM_X = 0.76;
const DESKTOP_TAG_WIDTH = 0.28;

/** Tracks the md breakpoint, where the copy moves on top of the photo. */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** First colour field's options, for the live preview. */
function paletteFromSchema(schema: PersonalizationSchema): readonly ColorOption[] | undefined {
  for (const f of schema.fields) {
    if (f.type === "color" && f.options) return f.options;
  }
  return undefined;
}

export default function HeroClient({ designer }: { designer: HeroDesignerData | null }) {
  /** Designing: form shown, hero grown, photo zoomed — all at once. */
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [introHeight, setIntroHeight] = useState<number | null>(null);
  const [designerHeight, setDesignerHeight] = useState<number | null>(null);
  /** The copy column's min-height and vertical padding, in px (md up). */
  const [column, setColumn] = useState<{ minHeight: number; padding: number } | null>(null);
  const isDesktop = useIsDesktop();
  const introRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const palette = designer ? paletteFromSchema(designer.schema) : undefined;
  const productHref = `/produkter/${designer?.handle ?? "dots-med-navn-3stk"}`;

  // Track both panels' natural heights, so the hero can animate between
  // them, and the column's min-height and padding, to know the hero's
  // height in each state up front.
  useEffect(() => {
    const measure = () => {
      if (introRef.current) setIntroHeight(introRef.current.offsetHeight);
      if (designerRef.current) setDesignerHeight(designerRef.current.offsetHeight);
      if (columnRef.current) {
        const s = getComputedStyle(columnRef.current);
        setColumn({
          minHeight: parseFloat(s.minHeight) || 0,
          padding: parseFloat(s.paddingTop) + parseFloat(s.paddingBottom),
        });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    for (const el of [introRef.current, designerRef.current, columnRef.current]) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const openDesigner = useCallback(() => setOpen(true), []);

  const closeDesigner = useCallback(() => {
    setOpen(false);
    // Hand focus back to the button that opened the designer.
    requestAnimationFrame(() => ctaRef.current?.focus());
  }, []);

  const panelHeight = open ? designerHeight : introHeight;

  // Desktop: the photo stage is as tall as the hero ever gets and the
  // frame just reveals more or less of it. The photo then never re-fits
  // while the hero grows, so growing and zooming can run together.
  let stageHeight: number | undefined;
  let restFocus = MOBILE_REST;
  let zoomFocus = MOBILE_ZOOM;
  if (isDesktop && column && introHeight && designerHeight) {
    const restFrame = Math.max(column.minHeight, introHeight + column.padding);
    const openFrame = Math.max(column.minHeight, designerHeight + column.padding);
    stageHeight = Math.max(restFrame, openFrame);
    restFocus = { x: 0.5, y: restFrame / 2 / stageHeight };
    zoomFocus = { x: DESKTOP_ZOOM_X, y: openFrame / 2 / stageHeight, tagWidth: DESKTOP_TAG_WIDTH };
  }

  // Move focus into the designer once it shows, so keyboard and
  // screen-reader users land on the first field. No scrolling: the
  // designer opens in place, and a page scroll during the zoom reads as
  // a jolt.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      designerRef.current?.querySelector<HTMLElement>("input, select, button")?.focus({ preventScroll: true });
    }, 50);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-5 md:px-10 md:pt-4 md:pb-8 lg:pt-6 lg:pb-[45px]">
        <div
          className="relative overflow-hidden bg-nooni-bg-warm"
          style={{ borderRadius: 28 }}
        >
          {/* Photo: its own block on mobile, the whole frame from md up. */}
          <div
            className="relative aspect-[5/4] max-h-[420px] w-full md:absolute md:inset-x-0 md:top-0 md:aspect-auto md:max-h-none md:h-full"
            style={stageHeight ? { height: stageHeight } : undefined}
          >
            <DotsPhotoPreview
              values={values}
              colors={palette}
              active={open}
              restFocus={restFocus}
              zoomFocus={zoomFocus}
              priority
              sizes="(min-width: 1280px) 1232px, 100vw"
            />
            {/* Phone: the photo melts into the cream below it. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-nooni-bg-warm md:hidden"
            />
            {!open && (
              <InstaNote
                variant="cream"
                className="absolute bottom-4 right-4 hidden text-[clamp(14px,1.3vw,18px)] sm:block md:bottom-8 md:right-8"
              >
                I lige den farve der passer til dig
              </InstaNote>
            )}
          </div>

          {/* Cream wash behind the copy, deeper while designing. */}
          {/* Two layers cross-faded, since a gradient itself can't animate. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(247,239,229,0.96) 0%, rgba(247,239,229,0.88) 38%, rgba(247,239,229,0) 62%)",
            }}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 hidden transition-opacity duration-1000 ease-in-out md:block ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to right, rgba(247,239,229,0.98) 0%, rgba(247,239,229,0.95) 44%, rgba(247,239,229,0) 58%)",
            }}
          />

          <div
            ref={columnRef}
            className="relative flex px-5 pb-7 pt-2 md:min-h-[clamp(460px,46vw,620px)] md:w-[50%] md:items-center md:px-10 md:py-10 lg:w-[46%] lg:px-14">
            {/* Sized to the panel on show; the height change animates, and
                the frame (and photo) follow it smoothly. */}
            <div
              className="relative w-full"
              style={{
                height: panelHeight ?? undefined,
                transition: `height ${UNFOLD_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
              }}
            >
              {/* Intro */}
              <div
                ref={introRef}
                inert={open}
                className={`transition-opacity duration-500 ${
                  open ? "invisible opacity-0" : "visible opacity-100"
                }`}
              >
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
                      ref={ctaRef}
                      type="button"
                      onClick={openDesigner}
                      aria-expanded={open}
                      aria-controls={DESIGNER_ID}
                      className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3 text-white transition-colors hover:bg-[#9d6f6f]"
                      style={{ fontSize: "var(--nooni-text-ui)" }}
                    >
                      Design dine Dots
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

              {/* Designer */}
              {designer && (
                <div
                  id={DESIGNER_ID}
                  ref={designerRef}
                  inert={!open}
                  className={`absolute inset-x-0 top-0 transition-opacity duration-700 ${
                    open ? "visible opacity-100 delay-200" : "invisible opacity-0"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <InstaNote variant="blush" className="text-[clamp(14px,1.2vw,16px)]">
                      Design dine Dots
                    </InstaNote>
                    <button
                      type="button"
                      onClick={closeDesigner}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-nooni-ink-soft transition-colors hover:text-nooni-headline"
                    >
                      Luk
                      <span aria-hidden>×</span>
                    </button>
                  </div>
                  <h2
                    className="mt-3 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                    style={{ fontSize: "var(--nooni-text-heading-sm)" }}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
