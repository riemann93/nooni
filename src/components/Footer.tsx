/**
 * Footer — four-column footer. Solid background, sits above the arches.
 *
 * Mounted in src/app/layout.tsx so it appears on every page.
 */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-nooni-line-soft bg-nooni-bg pb-10 pt-14">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 font-display text-2xl font-medium leading-none text-nooni-headline">
              nooni
            </div>
            <p className="text-sm leading-loose text-nooni-ink-soft">
              Smarte løsninger til familier. Personliggjort, 3D-printet og
              pakket hjemme i Danmark.
            </p>
          </div>

          <FooterCol heading="Produkter">
            <FooterLink href="/produkter/dots">Dots</FooterLink>
            <FooterLink href="/produkter/loops">Loops</FooterLink>
            <FooterLink href="/produkter/decks">Decks</FooterLink>
            <FooterLink href="#">Gavekort</FooterLink>
          </FooterCol>

          <FooterCol heading="Om Nooni">
            <FooterLink href="/om-os">Vores historie</FooterLink>
            <FooterLink href="#">Sådan printer vi</FooterLink>
            <FooterLink href="#">Levering & retur</FooterLink>
            <FooterLink href="#">Kontakt</FooterLink>
          </FooterCol>

          <FooterCol heading="Følg med">
            <FooterLink href="https://www.instagram.com/hej.nooni/">
              Instagram — @hej.nooni
            </FooterLink>
            <FooterLink href="#">Nyhedsbrev</FooterLink>
            <FooterLink href="mailto:hej@nooni.dk">hej@nooni.dk</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-nooni-line-soft pt-7 text-xs text-nooni-ink-soft">
          <span>© {new Date().getFullYear()} Nooni ApS — lavet med kærlighed i Danmark</span>
          <span>CVR 4242 4242 · MobilePay · DKK</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-nooni-sub">
        {heading}
      </h5>
      <div className="flex flex-col gap-1 text-sm leading-loose text-nooni-ink-soft">
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="transition-colors hover:text-nooni-headline">
      {children}
    </Link>
  );
}
