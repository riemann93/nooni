import ArchBackground from "@/components/ArchBackground";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Dots",
    tagline: "Til tøjet",
    description:
      "Små runde mærker på ~1,5 cm. Vælg farver og motiv — eller skriv et navn, der former sig til en aflang oval. Perfekte til børnetøj i børnehaven.",
    accentColor: "#D9B4A7",
    href: "/produkter/dots",
  },
  {
    name: "Loops",
    tagline: "Til tasker & nøgler",
    description:
      "Større tags på ~2×5 cm. Bruges som navneskilte på tasker, penalhuse eller som nøglering. Vælg farver og navn eller motiv.",
    accentColor: "#D0E1C1",
    href: "/produkter/loops",
  },
  {
    name: "Decks",
    tagline: "Til kortspil",
    description:
      "En korteholder til børn — i én eller to rækker afhængigt af kortspillet. Fås i Nooonis klassiske farver.",
    accentColor: "#B48383",
    href: "/produkter/decks",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 overflow-hidden min-h-[600px]">
        <ArchBackground />

        <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-nooni-sub">
            Smarte løsninger til familier
          </p>

          <h1 className="font-display text-6xl sm:text-7xl font-semibold text-nooni-headline leading-none">
            Nooni
          </h1>

          <p className="font-editorial text-lg text-nooni-ink/65 max-w-sm leading-relaxed">
            Personaliserede 3D-printede produkter — lavet med omhu, direkte fra
            vores hjem i Danmark.
          </p>

          <a
            href="#produkter"
            className="mt-2 rounded-full bg-nooni-sub px-8 py-3 text-sm text-white hover:bg-nooni-headline transition-colors"
          >
            Se vores produkter
          </a>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────── */}
      <section id="produkter" className="px-6 pb-28 max-w-5xl mx-auto w-full">
        <div className="text-center mb-14">
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-nooni-warm mb-3">
            Kollektionen
          </p>
          <h2 className="font-display text-3xl font-semibold text-nooni-sub">
            Vores produkter
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
