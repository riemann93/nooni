"use client";

import { useState, useCallback } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/personalization/ProductPurchaseSection";
import ProductPreview, {
  PREVIEW_SUPPORTED_HANDLES,
} from "@/components/personalization/ProductPreview";
import type { ColorOption, PersonalizationSchema } from "@/lib/shopify/personalization";
import type { ProductVariant, ShopifyImage } from "@/lib/shopify/types";

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
}

export default function ProductPageClient({
  handle,
  images,
  productTitle,
  variants,
  schema,
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
    <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
      <ProductGallery
        images={images}
        productTitle={productTitle}
        overlay={overlay}
      />

      <div className="flex flex-col">
        <ProductPurchaseSection
          handle={handle}
          variants={variants}
          schema={schema}
          onValuesChange={handleValuesChange}
        />
      </div>
    </div>
  );
}
