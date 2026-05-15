/**
 * Root layout — defines the site chrome that wraps every page:
 *   - <HeroArches />  fixed boho-arch backdrop (z-index: 0)
 *   - <Navbar />      sticky liquid-glass nav (z-index: 2)
 *   - <main>          page content; sections inside sit at z-index: 1
 *   - <Footer />      site footer (z-index: 1)
 *
 * Stacking-context discipline (load-bearing — read before editing):
 *   The body must NOT create a stacking context. Anything with
 *   `transform`, `filter`, `will-change`, or `perspective` on the body,
 *   <main>, or any wrapping element will isolate the backdrop-filter
 *   blur and silently break the liquid-glass effect on .nooni-glass.
 *   `flex` and `position: sticky` on siblings are fine.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Fredoka, Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import HeroArches from "@/components/HeroArches";
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
          <HeroArches />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
