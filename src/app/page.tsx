/**
 * Homepage: navnemærker first, everything else after.
 *
 *   <Hero />               the page's only H1, rating, Dots med navn CTA
 *   <ValueStrip />         USP band from the store facts
 *   <ProductsGrid />       "Vores navnemærker": the name-tag family only
 *   <ReviewsBand />        overall rating + three parent reviews
 *   <HowItWorks />         "Sådan virker det", three short steps
 *   <NavnemaerkerIntro />  short SEO text about navnemærker, links /navnemaerker
 *   <MoreFromNooni />      Deks, Box, Tic Tac Take, secondary and smaller
 *   <Story />              short founder trust beat, links /om-os
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
      <ReviewsBand />
      <HowItWorks />
      <NavnemaerkerIntro />
      <MoreFromNooni />
      <Story />
    </>
  );
}
