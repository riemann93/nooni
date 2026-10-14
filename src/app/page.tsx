/**
 * Homepage: the shop's front counter, built for a parent on a phone.
 *
 * The page opens with the designer: type the child's name, see the
 * tag, add it to the cart. Everything after it answers "why" and
 * "who", then offers the rest of the range.
 *
 *   <Hero />               the only H1, plus the live Dots med navn designer
 *   <WhyParentsBuy />      the five reasons from the Instagram posts that sell
 *   <ProductsGrid />       "Vores navnemærker": the name-tag family only
 *   <ReviewsBand />        overall rating + three parent reviews
 *   <Workshop />           Camilla, the printers and the three steps
 *   <NavnemaerkerIntro />  short SEO text about navnemærker, links /navnemaerker
 *   <MoreFromNooni />      Deks, Box, Tic Tac Take, secondary and smaller
 *   <InstagramStrip />     photos linking to @hej.nooni
 *
 * Every section below the hero uses H2 and H3 only. The page closes
 * with the site-wide arched <Footer /> mounted in layout.tsx.
 */

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";
import ProductsGrid from "@/components/ProductsGrid";
import ReviewsBand from "@/components/ReviewsBand";
import NavnemaerkerIntro from "@/components/NavnemaerkerIntro";
import MoreFromNooni from "@/components/MoreFromNooni";
import Workshop from "@/components/Workshop";
import WhyParentsBuy from "@/components/WhyParentsBuy";
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
      <WhyParentsBuy />
      <ProductsGrid />
      <ReviewsBand />
      <Workshop />
      <NavnemaerkerIntro />
      <MoreFromNooni />
      <InstagramStrip />
    </>
  );
}
