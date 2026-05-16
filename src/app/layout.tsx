/**
 * Root layout — defines the site chrome that wraps every page:
 *   - <Navbar />      sticky liquid-glass nav (z-index: 2)
 *   - <main>          page content
 *   - <Footer />      site footer
 *   - <CartDrawer />  slide-in cart (lives at z-index: 11 when open)
 *
 * Note on the Boho-arch backdrop:
 *   Previously this layout mounted a fixed-viewport <HeroArches /> behind
 *   every page. We moved the arches inside the <Hero /> component so
 *   they appear only at the top of the homepage and scroll out
 *   naturally — keeps the brand signature where it matters and lets
 *   the product grid below sit on a clean background.
 *
 * Note on .nooni-glass (used by Navbar):
 *   backdrop-filter only blurs what's painted underneath it. The navbar
 *   blurs whatever scrolls behind it in the body — that still works
 *   without the fixed arches. Don't add transform/filter/will-change
 *   on body or main; either creates a stacking context that breaks the
 *   blur.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Fredoka, Open_Sans } from "next/font/google";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka-var",
  subsets: ["latin"],
  // 700 is required for the canonical Nooni wordmark (see BRAND.md).
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-opensans-var",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nooni.dk"),
  title: {
    default: "Nooni — Smarte løsninger til familier",
    template: "%s · Nooni",
  },
  description:
    "Personaliserede 3D-printede mærker, tags og holdere til børn. Lavet hjemme i Danmark.",
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "Nooni",
    url: "https://nooni.dk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${fredoka.variable} ${openSans.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-nooni-bg text-nooni-ink font-sans">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
