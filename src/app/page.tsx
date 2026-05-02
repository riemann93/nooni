import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Dots",
    tagline: "Til tøjet",
    description:
      "Små runde mærker på ~1,5 cm. Vælg farver og motiv — eller skriv et navn, der former sig til en aflang oval med afrundede ender. Perfekte til børnetøj i børnehaven.",
    accentColor: "#D9B4A7",
    href: "/produkter/dots",
  },
  {
    name: "Loops",
    tagline: "Til tasker & nøgler",
    description:
      "Større tags på ~2×5 cm. Bruges som navneskilte på tasker, penalhuse eller som nøglering. Vælg farver og tilpas med navn eller motiv.",
    accentColor: "#D0E1C1",
    href: "/produkter/loops",
  },
  {
    name: "Decks",
    tagline: "Til kortspil",
    description:
      "En korteholder designet til børn. Vælges i én eller to rækker afhængigt af kortspillet. Fås i Nooonis klassiske farver.",
    accentColor: "#B48383",
    href: "/produkter/decks",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-16 pb-24 overflow-hidden">
        {/* Decorative arch behind headline */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[340px] -z-10 opacity-30"
          style={{
            backgroundColor: "#D9B4A7",
            borderRadius: "0 0 9999px 9999px",
          }}
        />
        <p className="font-sans text-sm uppercase tracking-widest text-nooni-sub mb-4">
          Smarte løsninger til familier
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold text-nooni-headline leading-tight max-w-xl">
          Hej, vi er Nooni
        </h1>
        <p className="mt-5 font-editorial text-lg text-nooni-ink/70 max-w-md leading-relaxed">
          Vi laver personaliserede 3D-printede produkter — lavet med omhu,
          direkte fra vores hjem i Danmark.
        </p>
        <a
          href="#produkter"
          className="mt-8 rounded-full bg-nooni-sub px-8 py-3 text-sm text-white hover:bg-nooni-headline transition-colors"
        >
          Se vores produkter
        </a>
      </section>

      {/* Products */}
      <section
        id="produkter"
        className="px-6 pb-24 max-w-6xl mx-auto w-full"
      >
        <h2 className="font-display text-3xl font-semibold text-nooni-sub text-center mb-12">
          Vores produkter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
