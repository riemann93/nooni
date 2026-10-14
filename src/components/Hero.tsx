/**
 * Hero — data loader for the homepage hero.
 *
 * Source: design/homepage-spec.md §1 ("Expanded state"), now built:
 * "Design dine Dots" unfolds a Dots med navn designer inside the hero,
 * so a visitor can write a name, pick two colours and add to cart
 * without leaving the homepage.
 *
 * This server component fetches the Dots med navn product, its
 * Shopify colour palette and personalization schema, and hands them
 * to <HeroClient />, which owns the open/closed state and the markup.
 *
 * If Shopify can't be reached or the product is missing, the hero
 * still renders and the CTA falls back to a link to the product page.
 *
 * The hero photo is itself the preview: the chosen colours and name
 * are painted onto the tag in the photo (<DotsPhotoPreview />).
 */

import HeroClient, { type HeroDesignerData } from "@/components/HeroClient";
import {
  getSchemaForHandle,
  withColorOptions,
} from "@/lib/shopify/personalization";
import { getProductByHandle, getProductColors } from "@/lib/shopify/products";

/** The product the hero designer sells. */
export const HERO_DESIGNER_HANDLE = "dots-med-navn-3stk";

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

async function loadDesigner(): Promise<HeroDesignerData | null> {
  try {
    const [product, colors] = await Promise.all([
      getProductByHandle(HERO_DESIGNER_HANDLE),
      getProductColors(HERO_DESIGNER_HANDLE),
    ]);
    const baseSchema = getSchemaForHandle(HERO_DESIGNER_HANDLE);
    if (!product || !baseSchema) return null;

    const price = product.priceRange.minVariantPrice;
    return {
      handle: HERO_DESIGNER_HANDLE,
      title: product.title,
      variants: product.variants.nodes,
      schema: withColorOptions(baseSchema, colors),
      priceLabel: formatPrice(price.amount, price.currencyCode),
      availableForSale: product.availableForSale,
    };
  } catch (err) {
    console.error("Hero designer: could not load Dots med navn", err);
    return null;
  }
}

export default async function Hero() {
  const designer = await loadDesigner();
  return <HeroClient designer={designer} />;
}
