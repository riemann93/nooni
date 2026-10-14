/**
 * Homepage: calm, Scandinavian, one idea per screen.
 *
 * Big type, lots of air, a few large photos, no boxes inside boxes.
 * Dots med navn leads; the rest of the shop follows quietly.
 *
 *   <Hero />               the only H1, one line, two actions, one large photo
 *   <Statement />          "Ti ens flyverdragter...", reason 1 said big
 *   <NameTagTiles />       the name-tag family as four large tiles
 *   <Everyday />           four small facts with thin line icons
 *   <Maker />              Camilla, in the brand's single arch
 *   <ParentQuote />        one parent review, large (placeholder, preview only)
 *   <NavnemaerkerIntro />  short SEO text about navnemærker, links /navnemaerker
 *   <MoreFromNooni />      Deks, Box, Tic Tac Take, secondary and smaller
 *
 * Every section below the hero uses H2 and H3 only. The page closes
 * with the site-wide <Footer /> mounted in layout.tsx.
 */

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";
import Statement from "@/components/home/Statement";
import NameTagTiles from "@/components/home/NameTagTiles";
import Everyday from "@/components/home/Everyday";
import Maker from "@/components/home/Maker";
import ParentQuote from "@/components/home/ParentQuote";
import NavnemaerkerIntro from "@/components/NavnemaerkerIntro";
import MoreFromNooni from "@/components/MoreFromNooni";

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
      <Statement />
      <NameTagTiles />
      <Everyday />
      <Maker />
      <ParentQuote />
      <NavnemaerkerIntro />
      <MoreFromNooni />
    </>
  );
}
