/**
 * /kontakt — dedicated contact page.
 *
 * Replaces the navbar's old anchor-jump behaviour. The page shell is
 * a server component; the form itself is a client component that
 * wires into the sendContactEmail server action.
 */

import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import InstaNote from "@/components/InstaNote";

export const metadata: Metadata = {
  title: "Kontakt — Nooni",
  description:
    "Spørgsmål, særlige ønsker eller en god idé? Skriv til Camilla bag Nooni, jeg svarer hurtigt.",
};

export default function KontaktPage() {
  return (
    <section
      className="bg-nooni-bg py-[45px]"
      data-screen-label="Kontakt"
    >
      <div className="mx-auto max-w-[640px] px-6 md:px-10">
        <div className="mb-12 text-center">
          <InstaNote variant="blush" className="text-[clamp(14px,1.2vw,16px)]">
            Sig hej 👋
          </InstaNote>
          <h1 className="mt-4 font-editorial text-[clamp(36px,4.5vw,60px)] leading-[1.08] tracking-tight text-nooni-ink">
            Skriv til{" "}
            <em className="italic text-nooni-headline">mig</em>
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] font-editorial text-lg leading-relaxed text-nooni-ink-soft">
            Spørgsmål, særlige ønsker, eller bare en god idé?
            Det er mig, Camilla, der læser din besked, og jeg svarer som regel inden for et døgn.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
