/**
 * Hero: the homepage's only H1, and the shop's front counter.
 *
 * The first thing a parent meets is "Hvad hedder dit barn?" and a Dots
 * med navn that draws the name as they type (<NameTagDesigner />). They
 * can pick colours and add it to the cart right here, so the most
 * common order takes one screen on a phone.
 *
 *   - H1, eyebrow and stars are server-rendered for search. The
 *     designer is the client part.
 *   - Price, variant and colours are live from Shopify. If Shopify is
 *     unreachable the designer still draws, with the code palette, and
 *     the button goes to the product page instead of the cart.
 *   - Stars come from src/lib/social-proof.ts, which is placeholder
 *     data: hidden on the production deploy, never in JSON-LD.
 *   - Delivery and the small facts come from the store facts, so the
 *     hero can't promise what checkout doesn't. The wash fact is
 *     tested (Dots stay on in the machine); never add a temperature
 *     until Camilla has one.
 */

import Image from "next/image";
import Stars from "@/components/Stars";
import NameTagDesigner from "@/components/home/NameTagDesigner";
import { getProductMeta, LEAD_NAME_TAG } from "@/lib/product-meta";
import { OVERALL_RATING, PLACEHOLDER_SOCIAL_PROOF } from "@/lib/social-proof";
import { deliveryWindow, STORE_FACTS } from "@/lib/store-facts";
import {
  getSchemaForHandle,
  NOONI_COLORS,
  withColorOptions,
} from "@/lib/shopify/personalization";
import { getProductByHandle, getProductColors } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";

export const revalidate = 60;

const SHOW_STARS = !(PLACEHOLDER_SOCIAL_PROOF && process.env.VERCEL_ENV === "production");

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

async function getLead(): Promise<Product | null> {
  try {
    return await getProductByHandle(LEAD_NAME_TAG);
  } catch {
    return null;
  }
}

export default async function Hero() {
  const [lead, colors] = await Promise.all([getLead(), getProductColors(LEAD_NAME_TAG)]);
  const schema = withColorOptions(getSchemaForHandle(LEAD_NAME_TAG)!, colors);
  const palette = colors.length > 0 ? colors : NOONI_COLORS;
  const variant = lead?.variants.nodes.find((v) => v.availableForSale) ?? null;
  const price = variant?.price ?? lead?.priceRange.minVariantPrice;
  const photo = lead?.images.nodes[1] ?? lead?.images.nodes[0];

  return (
    <section className="relative" data-screen-label="01 Hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-6 md:px-10 md:pt-4 md:pb-10">
        <div className="rounded-[28px] bg-nooni-bg-warm px-4 pt-6 pb-6 md:px-10 md:pt-12 md:pb-10 lg:px-14">
          <div className="md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-[640px]">
              <p
                className="uppercase tracking-[0.22em] text-nooni-sub"
                style={{ fontSize: "var(--nooni-text-label)" }}
              >
                „Det er min, den her!“
              </p>
              <h1
                className="mt-2 font-editorial italic leading-[1.05] text-nooni-headline"
                style={{ fontSize: "var(--nooni-text-heading-lg)" }}
              >
                Personlige navnemærker til børn
              </h1>
              <p
                className="mt-3 max-w-[520px] font-editorial leading-snug text-nooni-ink-soft"
                style={{ fontSize: "var(--nooni-text-body-lg)" }}
              >
                Dots sidder på lynlåsen, så dit barn selv finder sin flyverdragt i garderoben og
                har noget at tage fat i, når det lyner.
              </p>
              {SHOW_STARS && (
                <Stars rating={OVERALL_RATING.rating} count={OVERALL_RATING.count} size={16} className="mt-3" />
              )}
            </div>

            {photo && (
              <figure className="mt-5 hidden shrink-0 items-center gap-3 md:flex">
                <div className="relative h-20 w-20 overflow-hidden rounded-t-full rounded-b-[14px]">
                  <Image src={photo.url} alt={photo.altText ?? "Dots med navn på en lynlås"} fill sizes="80px" className="object-cover" />
                </div>
                <figcaption className="max-w-[140px] text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-label)" }}>
                  Sådan sidder den på lynlåsen
                </figcaption>
              </figure>
            )}
          </div>

          <div className="mt-4 md:mt-10">
            <NameTagDesigner
              handle={LEAD_NAME_TAG}
              schema={schema}
              palette={palette}
              variantId={variant?.id ?? null}
              priceLabel={price ? formatPrice(price.amount, price.currencyCode) : null}
              quantityNote={getProductMeta(LEAD_NAME_TAG).quantityNote}
              deliveryWindow={deliveryWindow()}
              facts={["Kan blive siddende i vask", STORE_FACTS.shippingPrice, STORE_FACTS.withdrawal, "Betal med MobilePay"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
