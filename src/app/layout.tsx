/**
 * Root layout — production branch (under-construction posture).
 *
 * Stripped down vs main: no HeroArches, no Navbar, no Footer. Just the
 * fonts and a body that lets the page center itself. When this branch
 * is merged back to main at launch, the full layout from main wins.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Fredoka, Open_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  title: "Nooni — Kommer snart",
  description: "Smarte løsninger til familier. Vi åbner snart.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${fredoka.variable} ${openSans.variable} ${cormorant.variable} antialiased`}
    >
      <body className="bg-nooni-bg text-nooni-ink font-sans">{children}</body>
    </html>
  );
}
