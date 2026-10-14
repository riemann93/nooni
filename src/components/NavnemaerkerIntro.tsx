/**
 * NavnemaerkerIntro: the homepage's short text section about
 * navnemærker (SEO.md issue 1). Google ranks a page for the words it
 * shows, so this is plain, visible copy, not a hidden block.
 *
 * Every claim here is taken from the product descriptions in Shopify
 * (what the mærker fit on, the zipper grip, symbols for children who
 * can't read). No washing or durability claims until they're tested;
 * see SEARCH-GUIDE.md and "The intent problem" in CONTENT-PLAN.md.
 *
 * Links point at the /navnemaerker hub, which collects the authority.
 */

import Link from "next/link";

const linkClass =
  "text-nooni-headline underline decoration-nooni-line underline-offset-4 transition-colors hover:decoration-nooni-headline";

export default function NavnemaerkerIntro() {
  return (
    <section className="bg-nooni-bg py-20 md:py-28" data-screen-label="07 Om navnemærker">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mx-auto max-w-[640px] border-t border-nooni-line-soft pt-16 md:pt-20">
          <h2 className="text-center font-editorial leading-[1.15] tracking-[-0.01em] text-nooni-ink" style={{ fontSize: "var(--nooni-text-heading-sm)" }}>
            Navnemærker der sidder{" "}
            <em className="italic text-nooni-headline">uden på tøjet</em>
          </h2>

          <div
            className="mt-6 space-y-4 font-editorial leading-[1.7] text-nooni-ink-soft"
            style={{ fontSize: "var(--nooni-text-body)" }}
          >
            <p>
              Noonis navnemærker bliver ikke syet eller strøget ind i tøjet. De klikkes fast i
              lynlåsen på jakken og flyverdragten, i huen og vanterne eller på rygsækken og
              skoletasken. Så kan barnet, pædagogerne og lærerne se med det samme, hvis ting det er,
              også i en travl garderobe i vuggestuen, børnehaven eller skolen.
            </p>
            <p>
              Dots med navn har barnets navn skrevet tydeligt. Dots med motiv er til børn, der endnu
              ikke kan læse, men nemt kender deres eget symbol. Formen giver små hænder et bedre greb
              om lynlåsen, så barnet lettere kan lyne jakken selv. Loops hænger på tasken eller
              nøglerne, så den ikke bliver forbyttet med de andres.
            </p>
            <p>
              Du vælger selv farverne, så mærket passer til overtøjet, og hvert mærke bliver printet
              til dit barn hjemme hos os.{" "}
              <Link href="/navnemaerker" className={linkClass}>
                Se alle vores navnemærker
              </Link>{" "}
              og find dem, der passer til jeres hverdag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
