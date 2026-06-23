"use client";

import { useState, useCallback, type ReactNode } from "react";
import ProductDescription from "@/components/ProductDescription";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/personalization/ProductPurchaseSection";
import ProductPreview, {
  PREVIEW_SUPPORTED_HANDLES,
} from "@/components/personalization/ProductPreview";
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

interface ProductPageClientProps {
  handle: string;
  images: ShopifyImage[];
  productTitle: string;
  variants: ProductVariant[];
  schema: PersonalizationSchema | null;
  tagline?: string;
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
  priceLabel,
  availableForSale,
  descriptionHtml,
}: ProductPageClientProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"billeder" | "preview">("billeder");

  const showPreview = schema !== null && PREVIEW_SUPPORTED_HANDLES.has(handle);
  const palette = paletteFromSchema(schema);

  const handleValuesChange = useCallback((next: Record<string, string>) => {
    setValues(next);
    // Auto-switch to preview when a symbol is chosen
    if (next.motif) {
      setActiveTab("preview");
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">

        {/* Left column: tabs + gallery or full-size preview */}
        <div>
          {showPreview && (
            <div className="mb-3 flex gap-1">
              <TabButton active={activeTab === "billeder"} onClick={() => setActiveTab("billeder")}>
                Billeder
              </TabButton>
              <TabButton active={activeTab === "preview"} onClick={() => setActiveTab("preview")}>
                Forhåndsvisning
              </TabButton>
            </div>
          )}

          {!showPreview || activeTab === "billeder" ? (
            <ProductGallery images={images} productTitle={productTitle} />
          ) : (
            <ProductPreview values={values} colors={palette} fullSize />
          )}
        </div>

        {/* Right column: title, price, form */}
        <div className="flex flex-col md:max-h-[calc(50vw-2.5rem)] md:min-h-0 md:overflow-y-auto md:pr-1">
          {!availableForSale && (
            <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
              Udsolgt
            </p>
          )}

          {tagline && (
            <p className="mb-3 font-editorial italic text-lg text-nooni-ink-soft">
              {tagline}
            </p>
          )}

          <h1 className="font-editorial text-5xl leading-[1.05] tracking-tight text-nooni-ink">
            {renderProductTitle(productTitle)}
          </h1>

          <p className="mt-4 font-editorial text-[1.7rem] font-medium text-nooni-ink">
            {priceLabel}
          </p>

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
      className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
        active
          ? "bg-nooni-headline text-white"
          : "bg-nooni-bg-warm text-nooni-ink-soft hover:text-nooni-headline"
      }`}
    >
      {children}
    </button>
  );
}
