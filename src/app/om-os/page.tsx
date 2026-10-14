/**
 * /om-os — "Min historie" page.
 *
 * Dedicated long-form founder narrative, independent of the homepage's
 * Story teaser. Layout: heading on the left, portrait photo on the
 * right; the longer body copy flows underneath in a single readable
 * column. QuietCTA closes the page with a route back into products.
 */

import type { Metadata } from "next";
import Image from "next/image";
import QuietCTA from "@/components/QuietCTA";
import InstaNote from "@/components/InstaNote";

export const metadata: Metadata = {
  title: "Min historie",
  description:
    "Mød Camilla, personen bag Nooni. Personliggjorte produkter, printet hjemme i Danmark.",
};

export default function OmOs() {
  return (
    <>
      <section
        className="relative z-[1] bg-nooni-bg py-[45px]"
        data-screen-label="About"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-nooni-bg-warm px-8 py-14 md:px-16 md:py-20">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-20">
              <div>
                <InstaNote variant="blush" className="text-[clamp(14px,1.2vw,16px)]">
                  Min historie 💗
                </InstaNote>
                <h1
                  className="mt-5 font-editorial text-[clamp(56px,8vw,112px)] leading-[1.02] tracking-tight text-nooni-ink"
                  style={{ fontWeight: 200 }}
                >
                  Mød{" "}
                  <em className="italic text-nooni-headline">Camilla</em>
                </h1>
              </div>

              <div
                className="relative aspect-[4/5] w-full overflow-hidden"
                style={{ borderRadius: "9999px 9999px 22px 22px" }}
              >
                <Image
                  src="/images/familie_2.jpg"
                  alt="Camilla — personen bag Nooni"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 35vw, 90vw"
                  priority
                />
              </div>
            </div>

            <div className="mt-12 font-editorial text-[19px] leading-[1.65] text-nooni-ink-soft space-y-5 text-justify hyphens-auto md:mt-16">
              <p>
                Nooni er en lille dansk virksomhed, der er beliggende i Borris
                i Vestjylland.
              </p>
              <p>
                Hej! Jeg hedder Camilla, og det er mig, der har skabt Nooni.
                Jeg er 32 år og bor sammen med min mand og vores to små piger.
                Jeg er uddannet salgsassistent og lærer. Med min baggrund fra
                skolen går jeg meget op i, at børn kan og tør selv. Jeg vil
                gerne skabe produkter, som hjælper børn med at mestre de ting,
                de sætter sig for, ved hjælp af forskellige værktøjer til
                hverdagen. Det skal være med til at skabe gode oplevelser og
                styrke deres selvtillid.
              </p>
              <p>
                Firmaet Nooni er et kreativt, hjertevarmt og farverigt sted.
                Der er plads til alle idéer, men der bliver også nøje udtænkt,
                hvilke produkter familier og børn kan have brug for. Alle
                produkter er udtænkt og designet af mig. Jeg bruger mange
                forskellige programmer og maskiner til at skabe dem, og jeg
                bruger blandt andet programmet Blender til at 3D-designe mine
                idéer. Lige nu har jeg to 3D-printere, som jeg kalder Wall-E
                og EVA.
              </p>
              <p>
                Idéen til Nooni startede, da jeg desværre ikke skulle være
                lærer mere på en helt fantastisk skole. Jeg blev ramt af en
                depression og vidste, at der skulle ske noget nyt. Da jeg
                måtte sige farvel til lærerfaget, men slet ikke kunne
                forestille mig ikke at lave noget kreativt, øjnede jeg chancen
                for at starte mit eget. Min mand og jeg købte en 3D-printer,
                og jeg var solgt med det samme! Hjernen kørte derudaf med gode
                idéer til, hvordan jeg kunne bruge 3D-print til at gøre
                hverdagen lettere for mig og min familie. Det var dér, drømmen
                startede om at lave produkter, der kan gøre en forskel for
                andre børnefamilier.
              </p>
              <p>
                Jeg håber, du og din familie vil finde noget her på siden,
                der kan skabe glæde og succesoplevelser i jeres hverdag.
              </p>
              <p className="font-editorial italic text-nooni-headline text-2xl leading-snug">
                Velkommen til Nooni!
              </p>
            </div>
          </div>
        </div>
      </section>
      <QuietCTA />
    </>
  );
}
