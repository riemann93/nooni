import Link from "next/link";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  href: string;
}

export default function ProductCard({
  name,
  tagline,
  description,
  accentColor,
  href,
}: ProductCardProps) {
  return (
    <div className="flex flex-col">
      {/* Boho arch image placeholder — portrait with fully rounded top */}
      <div
        className="w-full"
        style={{
          height: "300px",
          backgroundColor: accentColor,
          borderRadius: "9999px 9999px 0 0",
        }}
      />

      {/* Card content */}
      <div
        className="flex flex-col flex-1 px-6 pt-6 pb-8 gap-2"
        style={{
          backgroundColor: accentColor + "22", // 13% opacity tint
          borderRadius: "0 0 24px 24px",
        }}
      >
        <p className="text-xs font-sans uppercase tracking-widest text-nooni-sub">
          {tagline}
        </p>
        <h3 className="font-display text-2xl font-semibold text-nooni-headline">
          {name}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-nooni-ink/70 flex-1">
          {description}
        </p>
        <Link
          href={href}
          className="mt-3 self-start rounded-full border border-nooni-headline px-5 py-2 text-sm text-nooni-headline hover:bg-nooni-headline hover:text-white transition-colors"
        >
          Se mere →
        </Link>
      </div>
    </div>
  );
}
