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

  const handleValuesChange = useCallback((next: Record<string, string>) => {
    setValues(next);
  }, []);

  const showPreview = schema !== null && PREVIEW_SUPPORTED_HANDLES.has(handle);
  const palette = paletteFromSchema(schema);

  const overlay = showPreview ? (
    <ProductPreview values={values} colors={palette} />
  ) : undefined;

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery
          images={images}
          productTitle={productTitle}
          overlay={overlay}
        />

        <div className="flex flex-col">
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

          <p className="mt-5 font-editorial text-[1.7rem] font-medium text-nooni-ink">
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
        <div className="mt-14 border-t border-nooni-line-soft pt-10">
          <ProductDescription
            html={descriptionHtml}
            className="font-editorial text-lg leading-relaxed text-nooni-ink-soft"
          />
        </div>
      )}
    </>
  );
}
