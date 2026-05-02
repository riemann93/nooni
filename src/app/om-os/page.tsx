import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om os — Nooni",
  description: "Mød familien bag Nooni.",
};

export default function OmOs() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Arch decoration */}
      <div className="flex justify-center mb-12">
        <div
          className="w-32 h-48 opacity-40"
          style={{
            backgroundColor: "#D0E1C1",
            borderRadius: "9999px 9999px 0 0",
          }}
        />
      </div>

      <p className="font-sans text-sm uppercase tracking-widest text-nooni-sub text-center mb-4">
        Om os
      </p>
      <h1 className="font-display text-4xl font-semibold text-nooni-headline text-center mb-8">
        Bag Nooni
      </h1>
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
  );
}
