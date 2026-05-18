/**
 * Homepage — top-level composition.
 *
 *   <Hero />          big photo + name-Dots CTA + contained arches
 *   <ValueStrip />    trust signals
 *   <ProductsGrid />  the four non-Dots products (Loops, Emblem,
 *                     Deks, Tic Tac Take), fetched from Shopify
 *   <Story />         family / process narrative
 *   <BlogTeaser />    newest blog post preview
 *   <Contact />       contact info + social links (closing section)
 *
 * Each section owns its own background and spacing. No glass / arch
 * stacking constraints at this level — the Hero handles its own
 * decoration.
 */

import Hero from "@/components/Hero";
import ProductsGrid from "@/components/ProductsGrid";
import Story from "@/components/Story";
import ValueStrip from "@/components/ValueStrip";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ProductsGrid />
      <Story />
      <BlogTeaser />
      <Contact />
    </>
  );
}
