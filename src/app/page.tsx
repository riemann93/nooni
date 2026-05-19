/**
 * Homepage — top-level composition.
 *
 *   <Hero />          big photo + name-Dots CTA
 *   <HowItWorks />    three-step "Sådan virker det" strip — pre-launch
 *                     trust signal in the slot where reviews will
 *                     eventually live
 *   <ProductsGrid />  three featured products + "Se alle produkter"
 *   <Story />         family / process narrative
 *   <BlogTeaser />    newest blog post preview
 *   <Contact />       contact info + social links (closing section)
 *
 * Each section owns its own background and spacing. No glass / arch
 * stacking constraints at this level — the Hero handles its own
 * decoration.
 *
 * ValueStrip is disabled for now — it was overlapping the Hero and
 * was already on the chopping board. Re-enable (and probably
 * redesign) if/when we want trust signals back on the homepage.
 */

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductsGrid from "@/components/ProductsGrid";
import Story from "@/components/Story";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ProductsGrid />
      <Story />
      <BlogTeaser />
      <Contact />
    </>
  );
}
