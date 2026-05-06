import type { Metadata } from "next";
import ArchBackground from "@/components/ArchBackground";

export const metadata: Metadata = {
  title: "Om os — Nooni",
  description: "Mød familien bag Nooni.",
};

export default function OmOs() {
  return (
    <>
      {/* Page header with arch background */}
      <div className="relative flex flex-col items-center justify-end text-center px-6 pt-20 pb-14 overflow-hidden min-h-[280px]">
        <ArchBackground />
        <div className="relative z-10">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-nooni-sub mb-3">
            Om os
          </p>
          <h1 className="font-display text-5xl font-semibold text-nooni-headline">
            Bag Nooni
          </h1>
        </div>
      </div>

    <div className="max-w-2xl mx-auto px-6 py-16">

      <div className="font-editorial text-nooni-ink/80 leading-relaxed space-y-5 text-lg">
        <p>
          Nooni er en lille dansk familivirksomhed, der laver personaliserede
          produkter til hverdagslivet med børn. Alt er 3D-printet hos os
          derhjemme — med omhu og præcision i hver eneste ordre.
        </p>
        <p>
          Idéen er enkel: ting til børn skal løse et rigtigt problem og stadig
          se godt ud. Ingen masseproduktion. Ingen kolde materialer. Bare
          varme, holdbare produkter med dit barns navn på.
        </p>
        <p>
          Vi er i gang med at bygge mere. Følg med på{" "}
          <a
            href="https://www.instagram.com/hej.nooni/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nooni-sub underline underline-offset-2 hover:text-nooni-headline transition-colors"
          >
            @hej.nooni
          </a>{" "}
          på Instagram.
        </p>
      </div>
    </div>
    </>
  );
}
