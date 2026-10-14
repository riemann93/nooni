/**
 * Root layout — defines the site chrome that wraps every page:
 *   - <Navbar />      sticky liquid-glass nav (z-index: 2)
 *   - <main>          page content
 *   - <Footer />      site-wide utility footer with the © line
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

import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Fredoka, Inter } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import {
  jsonLdScript,
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka-var",
  subsets: ["latin"],
  // 700 is required for the canonical Nooni wordmark (see BRAND.md).
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  // No weight array → loads the Inter variable font, so any weight
  // between 100–900 (including non-standard values like 150) renders
  // smoothly. Tailwind weight utilities still work; arbitrary values
  // like font-[150] / inline fontWeight also work.
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

// GA4 property "nooni.dk". Only loaded on the production deploy so
// local dev and Vercel preview URLs don't pollute the numbers.
const GA_MEASUREMENT_ID = "G-F9LMB8H0TG";
const loadAnalytics = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nooni · Personlige navnemærker og smarte løsninger til børn",
    template: "%s · Nooni",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: SITE_NAME,
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "TQIGTEQEtx6fQ12dCcdpXGJIFihUicZxFuIvwS4IZRs",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFCF7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${fredoka.variable} ${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-nooni-bg text-nooni-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }}
        />
        <a href="#indhold" className="skip-link">
          Spring til indhold
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main id="indhold" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
      {loadAnalytics && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
