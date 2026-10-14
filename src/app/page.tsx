/**
 * Homepage: navnemærker first, everything else after.
 *
 * The story is why parents buy, as told in the Instagram posts that
 * sell (src/lib/why-parents-buy.ts), inside the usual shop layout.
 *
 *   <Hero />               the only H1, "Det er min, den her!", rating, price, CTA
 *   <ValueStrip />         USP band from the store facts
 *   <ProductsGrid />       "Vores navnemærker": the name-tag family only
 *   <WhyParentsBuy />      the five reasons from the Instagram posts
 *   <ReviewsBand />        overall rating + three parent reviews
 *   <ThreeThings />        "3 ting, jeg ville ønske, jeg havde vidst", parent to parent
 *   <HowItWorks />         "Sådan virker det", three short steps
 *   <NavnemaerkerIntro />  short SEO text about navnemærker, links /navnemaerker
 *   <MoreFromNooni />      Deks, Box, Tic Tac Take, secondary and smaller
 *   <Story />              founder trust beat with the proof line, links /om-os
 *   <InstagramStrip />     photos linking to @hej.nooni
 *
 * Every section below the hero uses H2 and H3 only. The page closes
 * with the site-wide arched <Footer /> mounted in layout.tsx.
 */

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";
import ValueStrip from "@/components/ValueStrip";
import ProductsGrid from "@/components/ProductsGrid";
import ReviewsBand from "@/components/ReviewsBand";
import HowItWorks from "@/components/HowItWorks";
import NavnemaerkerIntro from "@/components/NavnemaerkerIntro";
import MoreFromNooni from "@/components/MoreFromNooni";
import Story from "@/components/Story";
import WhyParentsBuy from "@/components/WhyParentsBuy";
import ThreeThings from "@/components/ThreeThings";
import InstagramStrip from "@/components/InstagramStrip";

// Canonical is set per page, never in the root layout: a layout
// canonical would be inherited by every page that forgets its own.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Nooni · Personlige navnemærker og smarte løsninger til børn",
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  // The homepage title is the full brand line, not "x · Nooni".
  title: { absolute: "Nooni · Personlige navnemærker og smarte løsninger til børn" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ProductsGrid />
      <WhyParentsBuy />
      <ReviewsBand />
      <ThreeThings />
      <HowItWorks />
      <NavnemaerkerIntro />
      <MoreFromNooni />
      <Story />
      <InstagramStrip />
    </>
  );
}
