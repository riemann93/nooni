import type { Metadata } from "next";
import { Fredoka, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka-var",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const openSans = Open_Sans({
  variable: "--font-opensans-var",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nooni — Smarte løsninger til familier",
  description:
    "Personaliserede nøgleringe og navneskilte til børn. Håndlavede i Danmark med 3D-print.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${fredoka.variable} ${openSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-nooni-bg text-nooni-ink font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="py-8 text-center text-sm text-nooni-warm">
          © {new Date().getFullYear()} Nooni — lavet med kærlighed i Danmark
        </footer>
      </body>
    </html>
  );
}
