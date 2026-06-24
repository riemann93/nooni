"use client";

import { useState, useCallback, useRef, type ReactNode } from "react";
import ProductDescription from "@/components/ProductDescription";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/personalization/ProductPurchaseSection";
import ProductPreview, {
  PREVIEW_SUPPORTED_HANDLES,
  ProductShape,
  resolveColor,
  NEUTRAL_MAIN_HEX,
  NEUTRAL_SECONDARY_HEX,
} from "@/components/personalization/ProductPreview";
import MotifRenderer, { hasMotifRenderer } from "@/components/personalization/motifs";
import type { ColorOption, PersonalizationSchema } from "@/lib/shopify/personalization";
import type { ProductVariant, ShopifyImage } from "@/lib/shopify/types";

function renderProductTitle(title: string): ReactNode {
  const sep = " - ";
  const idx = title.indexOf(sep);
  if (idx === -1) return title;
  const main = title.slice(0, idx);
  const accent = title.slice(idx + sep.length);
  return (
    <>
      {main}{" "}
      <em className="italic text-nooni-headline">{accent}</em>
    </>
  );
}

function paletteFromSchema(
  schema: PersonalizationSchema | null,
): readonly ColorOption[] | undefined {
  if (!schema) return undefined;
  function find(fields: PersonalizationSchema["fields"]): readonly ColorOption[] | undefined {
    for (const f of fields) {
      if (f.type === "color" && f.options) return f.options;
      if (f.type === "choice") {
        for (const o of f.options) {
          const hit = find(o.fields);
          if (hit) return hit;
        }
      }
    }
    return undefined;
  }
  return find(schema.fields);
}

interface Snapshot {
  handle: string;
  values: Record<string, string>;
  colors: readonly ColorOption[] | undefined;
}

interface ProductPageClientProps {
  handle: string;
  images: ShopifyImage[];
  productTitle: string;
  variants: ProductVariant[];
  schema: PersonalizationSchema | null;
  tagline?: string;
  quantityNote?: string;
  priceLabel: string;
  availableForSale: boolean;
  descriptionHtml?: string;
}

export default function ProductPageClient({
  handle,
  images,
  productTitle,
  variants,
  schema,
  tagline,
  quantityNote,
  priceLabel,
  availableForSale,
  descriptionHtml,
}: ProductPageClientProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"billeder" | "preview">("billeder");
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [selectedSnapshotIdx, setSelectedSnapshotIdx] = useState<number | null>(null);
  const snapshotRef = useRef<HTMLDivElement>(null);

  const showPreview = schema !== null && PREVIEW_SUPPORTED_HANDLES.has(handle);
  const palette = paletteFromSchema(schema);

  const isDuplicate = snapshots.some(
    (s) => JSON.stringify(s.values) === JSON.stringify(values),
  );

  const handleValuesChange = useCallback((next: Record<string, string>) => {
    setValues(next);
    setSelectedSnapshotIdx(null);
    if (next.motif) setActiveTab("preview");
  }, []);

  const handleSave = useCallback(() => {
    setSnapshots((prev) => [...prev, { handle, values, colors: palette }]);
    setActiveTab("preview");
    requestAnimationFrame(() => {
      const container = snapshotRef.current;
      if (container) container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
    });
  }, [values, palette]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2 md:items-start">

        {/* Left column */}
        <div>
          <div className="relative">
            {!showPreview || activeTab === "billeder" ? (
              <ProductGallery images={images} productTitle={productTitle} />
            ) : (
              <ProductPreview
                handle={handle}
                values={selectedSnapshotIdx !== null ? snapshots[selectedSnapshotIdx].values : values}
                colors={selectedSnapshotIdx !== null ? snapshots[selectedSnapshotIdx].colors : palette}
                fullSize
                onSave={selectedSnapshotIdx !== null || isDuplicate ? undefined : handleSave}
              />
            )}
            {showPreview && (
              <div className="absolute left-3 top-3 flex gap-1">
                <TabButton active={activeTab === "billeder"} onClick={() => setActiveTab("billeder")}>
                  Billeder
                </TabButton>
                <TabButton active={activeTab === "preview"} onClick={() => setActiveTab("preview")}>
                  Forhåndsvisning
                </TabButton>
              </div>
            )}
          </div>

          {/* Snapshot carousel — only shown on preview tab, always reserves space so layout matches gallery */}
          <div className={`relative mt-4 ${activeTab !== "preview" || !showPreview ? "hidden" : snapshots.length === 0 ? "hidden md:block md:invisible md:pointer-events-none" : ""}`}>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-nooni-bg to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-nooni-bg to-transparent" />
            <div
              ref={snapshotRef}
              className="flex gap-3 overflow-x-auto px-1 py-1 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {snapshots.length === 0 ? (
                <div className="aspect-square w-[19%] flex-none" aria-hidden />
              ) : snapshots.map((snap, i) => {
                const selected = selectedSnapshotIdx === i;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Vis gemt eksempel ${i + 1}`}
                    aria-pressed={selected}
                    onClick={(e) => {
                      setSelectedSnapshotIdx(selected ? null : i);
                      setActiveTab("preview");
                      const btn = e.currentTarget;
                      const container = snapshotRef.current;
                      if (container) {
                        const btnRight = btn.offsetLeft + btn.offsetWidth;
                        const btnLeft = btn.offsetLeft;
                        const visibleRight = container.scrollLeft + container.clientWidth;
                        const visibleLeft = container.scrollLeft;
                        if (btnRight > visibleRight - btn.offsetWidth) {
                          container.scrollBy({ left: btn.offsetWidth * 2, behavior: "smooth" });
                        } else if (btnLeft < visibleLeft + btn.offsetWidth) {
                          container.scrollBy({ left: -btn.offsetWidth * 2, behavior: "smooth" });
                        }
                      }
                    }}
                    className={`relative aspect-square w-[19%] flex-none overflow-hidden rounded-lg bg-nooni-bg-warm transition-all [scroll-snap-align:start] ${
                      selected
                        ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <SnapshotDot handle={snap.handle} values={snap.values} colors={snap.colors} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col md:max-h-[calc(50vw-2.5rem)] md:min-h-0 md:overflow-y-auto md:pr-1">
          <h1 className={`font-editorial text-5xl leading-[1.05] tracking-tight text-nooni-ink ${showPreview && activeTab === "preview" ? "hidden md:block" : ""}`}>
            {renderProductTitle(productTitle)}
          </h1>
          {tagline && (
            <p className={`mt-2 font-editorial italic text-lg text-nooni-ink-soft ${showPreview && activeTab === "preview" ? "hidden md:block" : ""}`}>
              {tagline}
            </p>
          )}
          {!availableForSale && (
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Udsolgt
            </p>
          )}
          <div className={showPreview && activeTab === "preview" ? "hidden md:block" : ""}>
            <p className="mt-4 font-editorial text-[1.7rem] font-medium text-nooni-ink">
              {priceLabel}
            </p>
            {quantityNote && (
              <p className="mt-1 text-sm text-nooni-ink-soft">
                {quantityNote}
              </p>
            )}
          </div>
          <ProductPurchaseSection
            handle={handle}
            variants={variants}
            schema={schema}
            onValuesChange={handleValuesChange}
          />
        </div>
      </div>

      {descriptionHtml && (
        <div className="mt-8 border-t border-nooni-line-soft pt-6">
          <ProductDescription
            html={descriptionHtml}
            className="font-editorial text-lg leading-relaxed text-nooni-ink-soft"
          />
        </div>
      )}
    </>
  );
}

function SnapshotDot({
  handle,
  values,
  colors,
}: {
  handle: string;
  values: Record<string, string>;
  colors: readonly ColorOption[] | undefined;
}) {
  const palette = colors ?? [];
  const mainHex = resolveColor(palette, values.main_color, NEUTRAL_MAIN_HEX);
  const secondaryHex = resolveColor(palette, values.secondary_color, NEUTRAL_SECONDARY_HEX);
  const motifKey = values.motif;
  const showMotif = Boolean(motifKey && hasMotifRenderer(motifKey));
  const nameText = values.name?.trim() ?? "";
  const isPill = handle === "dots-med-navn-3stk";
  const nameFontSize = nameText.length === 0 ? 0 : isPill
    ? Math.min(24, Math.round(78 / (nameText.length * 0.58)))
    : Math.min(34, Math.round(90 / (nameText.length * 0.58)));
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <defs>
        <filter id="snap-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
      <ProductShape handle={handle} fill={mainHex} />
      {showMotif && motifKey && (
        <g transform="translate(5 5) scale(0.9)" filter="url(#snap-shadow)">
          <MotifRenderer motifKey={motifKey} color={secondaryHex} />
        </g>
      )}
      {nameText && (
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill={secondaryHex}
          fontSize={nameFontSize}
          fontFamily="Fredoka, system-ui, sans-serif"
          fontWeight="bold"
          filter="url(#snap-shadow)"
        >
          {nameText}
        </text>
      )}
    </svg>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors shadow-sm backdrop-blur-sm ${
        active
          ? "bg-nooni-headline text-white"
          : "bg-white/70 text-nooni-ink-soft hover:bg-white hover:text-nooni-headline"
      }`}
    >
      {children}
    </button>
  );
}
