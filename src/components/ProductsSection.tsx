/**
 * ProductsSection — first paint of the homepage.
 *
 * Sits over the fixed <HeroArches /> backdrop. Contains:
 *   - A liquid-glass header (eyebrow + lead headline + meta paragraph)
 *   - The three-card products grid
 *
 * Z-index discipline: this whole section lives at z-index: 1 so it
 * paints above the z-index: 0 fixed arches. Do not add transform/filter
 * to any wrapping element — those create stacking contexts and break
 * the .glass backdrop-filter blur.
 */

import GlassSurface from "./GlassSurface";
import ProductCard from "./ProductCard";
import DotsArt from "./product-art/DotsArt";
import LoopsArt from "./product-art/LoopsArt";
import DecksArt from "./product-art/DecksArt";

// Note: the homepage card for Dots and Decks each points to one of the
// two Shopify products in that family (the motif variant for Dots, the
// single-row variant for Decks). The other variants are reachable via
// the footer and (eventually) a /produkter listing page. Revisit during
// the design polish phase — may want to expand to one card per Shopify
// product, or build a small family/category surface.
const PRODUCTS = [
  {
    key: "dots",
    name: "Dots",
    tag: "Til tøjet",
    price: "Fra 59 kr.",
    description:
      "Små runde mærker på ~1,5 cm. Vælg farver og motiv — eller skriv et navn, der former sig til en aflang oval.",
    href: "/produkter/dots-5stk",
    art: <DotsArt />,
  },
  {
    key: "loops",
    name: "Loops",
    tag: "Til tasker & nøgler",
    price: "39 kr.",
    description:
      "Større tags på ~2×5 cm. Bruges som navneskilte på tasker, penalhuse eller som nøglering.",
    href: "/produkter/loops",
    art: <LoopsArt />,
  },
  {
    key: "deks",
    name: "Deks",
    tag: "Til kortspil",
    price: "Fra 69 kr.",
    description:
      "En korteholder til børn — fås i én række (single) eller to rækker (duo). I Noonis klassiske farver.",
    href: "/produkter/deks-single",
    art: <DecksArt />,
  },
];

export default function ProductsSection() {
  return (
    <section
      id="produkter"
      className="relative z-[1] py-40"
      data-screen-label="01 Products"
    >
      <div className="mx-auto max-w-[1280px] px-10">
        <GlassSurface className="mb-12 grid grid-cols-1 items-end gap-y-4 gap-x-14 px-10 py-9 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub">
              Kollektionen
            </span>
            <h2 className="mt-4 font-editorial text-[clamp(36px,4.5vw,60px)] leading-[1.05] text-nooni-ink tracking-tight">
              Tre små ting{" "}
              <em className="italic text-nooni-sub">der gør en stor forskel</em>{" "}
              i familielivet.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-nooni-ink-soft md:justify-self-end max-w-md">
            Hvert produkt printes på bestilling i de farver og med det navn, du
            vælger. Ingen kasser på lager, ingen masseproduktion.
          </p>
        </GlassSurface>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map(({ key, ...p }) => (
            <ProductCard key={key} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
