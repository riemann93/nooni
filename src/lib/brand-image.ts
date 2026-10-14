/**
 * Shared pieces for the generated brand images (favicon, Apple touch
 * icon, Open Graph card). They all render the Nooni wordmark per
 * BRAND.md: Fredoka 700 in #B48383 on Nooni cream.
 *
 * Satori (behind next/og) can't read next/font, so the static Fredoka
 * Bold file lives in /assets and is read from disk at build time.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const BRAND_ROSE = "#B48383";
export const BRAND_CREAM = "#FFFCF7";

export async function fredokaBold() {
  const data = await readFile(join(process.cwd(), "assets/Fredoka-Bold.ttf"));
  return [{ name: "Fredoka", data, weight: 700 as const, style: "normal" as const }];
}
