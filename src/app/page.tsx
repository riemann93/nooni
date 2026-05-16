/**
 * Homepage — products grid, value strip, closing CTA.
 *
 * Site chrome (<HeroArches />, <Navbar />, <Footer />) lives in
 * src/app/layout.tsx and wraps every page. This file owns only the
 * page-specific sections.
 *
 * Note: each section sets its own `relative z-[1]` so it paints above
 * the fixed arches at z-index: 0. Do not wrap them in anything with
 * `transform`/`filter`/`will-change` — that creates a stacking context
 * which silently breaks the .nooni-glass backdrop-filter blur.
 */

import ProductsSection from "@/components/ProductsSection";
import QuietCTA from "@/components/QuietCTA";
import ValueStrip from "@/components/ValueStrip";

export default function Home() {
  return (
    <>
      <ProductsSection />
      <ValueStrip />
      <QuietCTA />
    </>
  );
}
