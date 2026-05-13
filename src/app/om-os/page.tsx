/**
 * /om-os — "Vores historie" page.
 *
 * The handoff designs the story as a section on a one-page site. We
 * want separate pages so the site can grow without cluttering one
 * scroll. So: same Story component, given a thin intro band above it
 * that lets the fixed <HeroArches /> backdrop breathe before the
 * warm Story background takes over.
 *
 * Closing CTA reused from the homepage so visitors who arrive here
 * directly still get a path back to the product grid.
 */

import type { Metadata } from "next";
import QuietCTA from "@/components/QuietCTA";
import Story from "@/components/Story";

export const metadata: Metadata = {
  title: "Vores historie",
  description:
    "Mød familien bag Nooni. Personliggjorte produkter, printet hjemme hos os i Danmark.",
};

export default function OmOs() {
  return (
    <>
      {/* Intro band — short, lets the arch backdrop show through */}
      <section className="relative z-[1] pt-24 pb-12 text-center">
        <div className="mx-auto max-w-[1280px] px-10">
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
            Om Nooni
          </span>
        </div>
      </section>

      <Story />
      <QuietCTA />
    </>
  );
}
