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
    <div className="flex flex-col rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Arch image placeholder */}
      <div
        className="relative flex items-end justify-center pb-8 pt-12"
        style={{ backgroundColor: accentColor }}
      >
        <div
          className="absolute inset-x-0 -top-1 h-full"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="relative z-10 font-display text-4xl font-semibold text-white/80 tracking-widest"
        >
          {name.toLowerCase()}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <p className="text-xs font-sans uppercase tracking-widest text-nooni-warm">
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
          className="mt-2 self-start rounded-full border border-nooni-sub px-5 py-2 text-sm text-nooni-sub hover:bg-nooni-sub hover:text-white transition-colors"
        >
          Se mere
        </Link>
      </div>
    </div>
  );
}
