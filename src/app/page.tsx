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
 *   <InstagramStrip /> three post-style tiles linking to @hej.nooni
 *
 * The page closes with the site-wide arched <Footer /> mounted in
 * layout.tsx — no per-page Contact section anymore. Each section
 * owns its own background and spacing.
 */

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductsGrid from "@/components/ProductsGrid";
import Story from "@/components/Story";
import BlogTeaser from "@/components/BlogTeaser";
import InstagramStrip from "@/components/InstagramStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsGrid />
      <Story />
      <BlogTeaser />
      <HowItWorks />
      <InstagramStrip />
    </>
  );
}
