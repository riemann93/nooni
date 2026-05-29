/**
 * /om-os — "Min historie" page.
 *
 * The homepage's Story section becomes the body of this page; QuietCTA
 * gives visitors who land here directly a clear way back to the
 * product flow.
 *
 * Kept as a separate route (not a one-pager anchor) so the site has
 * room to grow without scroll-cluttering the homepage.
 */

import type { Metadata } from "next";
import QuietCTA from "@/components/QuietCTA";
import Story from "@/components/Story";

export const metadata: Metadata = {
  title: "Min historie",
  description:
    "Mød Camilla, personen bag Nooni. Personliggjorte produkter, printet hjemme i Danmark.",
};

export default function OmOs() {
  return (
    <>
      <Story />
      <QuietCTA />
    </>
  );
}
