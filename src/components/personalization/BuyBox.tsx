"use client";

/**
 * Standard buy-box pieces for the product page: breadcrumbs, the
 * "Laves til dig" status with a delivery estimate, and the trust row
 * under add-to-cart. All shipping and return numbers come from
 * src/lib/store-facts.ts so they match the footer, llms.txt and JSON-LD.
 */

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getProductMeta, isNametag, NAMETAG_HUB_PATH, splitTitle } from "@/lib/product-meta";
import {
  deliveryWindow,
  PAYMENT_METHODS,
  RETURNS,
  SHIPPING,
  STORE_FACTS,
} from "@/lib/store-facts";

/**
 * Short product name for the last crumb: the name set in product-meta
 * ("Dots med navn"), else the title up to its first separator.
 */
export function crumbName(handle: string, title: string): string {
  return getProductMeta(handle).crumbName ?? splitTitle(title).name;
}

export function Breadcrumbs({ handle, title }: { handle: string; title: string }) {
  const crumbs = [
    { label: "Forside", href: "/" },
    isNametag(handle)
      ? { label: "Navnemærker", href: NAMETAG_HUB_PATH }
      : { label: "Produkter", href: "/produkter" },
  ];
  return (
    <nav aria-label="Brødkrumme" className="mb-5 text-[length:var(--nooni-text-label)] text-nooni-ink-soft">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c) => (
          <li key={c.href + c.label} className="flex items-center gap-2">
            <Link href={c.href} className="underline-offset-4 hover:text-nooni-headline hover:underline">
              {c.label}
            </Link>
            <span aria-hidden="true" className="text-nooni-arch">›</span>
          </li>
        ))}
        <li aria-current="page" className="text-nooni-ink">{crumbName(handle, title)}</li>
      </ol>
    </nav>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 flex-none text-nooni-sub"
    >
      {children}
    </svg>
  );
}

const noopSubscribe = () => () => {};

/** "Laves til dig" status plus an estimated delivery window. */
export function MadeForYou() {
  // The date depends on today, so fill it in after mount to avoid a
  // server/client mismatch.
  const window_ = useSyncExternalStore(
    noopSubscribe,
    () => deliveryWindow(),
    () => null,
  );
  return (
    <div className="mt-4 rounded-2xl bg-nooni-bg-warm px-4 py-3 text-[length:var(--nooni-text-ui)] text-nooni-ink-soft">
      <p className="flex items-center gap-2 font-medium text-nooni-ink">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-nooni-sub" />
        Laves til dig
        <span className="font-normal text-nooni-ink-soft">· printes og pakkes på {SHIPPING.handlingDays.min} til {SHIPPING.handlingDays.max} hverdage</span>
      </p>
      <p className="mt-1">
        {window_ ? <>Bestil i dag, så er den hos dig {window_}.</> : <>{STORE_FACTS.delivery}.</>}
      </p>
    </div>
  );
}

export function TrustRow({ personalised }: { personalised: boolean }) {
  return (
    <ul className="mt-5 space-y-3 border-t border-nooni-line-soft pt-5 text-[length:var(--nooni-text-ui)] text-nooni-ink-soft">
      <li className="flex gap-3">
        <Icon>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </Icon>
        <span>
          {STORE_FACTS.shippingPrice} · {STORE_FACTS.delivery}.{" "}
          <Link href="/levering" className="underline underline-offset-4 hover:text-nooni-headline">
            Levering
          </Link>
        </span>
      </li>
      <li className="flex gap-3">
        <Icon>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
        </Icon>
        <span>
          {personalised && RETURNS.personalisedExempt
            ? `Laves efter dine valg, så den almindelige fortrydelsesret på ${RETURNS.withdrawalDays} dage gælder ikke. Fejl dækkes af ${RETURNS.complaintMonths} måneders reklamationsret. `
            : `${RETURNS.withdrawalDays} dages fortrydelsesret og ${RETURNS.complaintMonths} måneders reklamationsret. `}
          <Link href="/returnering" className="underline underline-offset-4 hover:text-nooni-headline">
            Returnering
          </Link>
        </span>
      </li>
      <li className="flex gap-3">
        <Icon>
          <path d="M5 11V8a7 7 0 0 1 14 0v3M5 11h14v10H5z" />
        </Icon>
        <span>
          Sikker betaling
          <span className="mt-2 flex flex-wrap gap-2" role="img" aria-label={`Vi tager imod ${PAYMENT_METHODS.join(", ")}`}>
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                aria-hidden="true"
                className="rounded-lg border border-nooni-line bg-white px-2.5 py-1 text-[length:var(--nooni-text-label)] font-medium text-nooni-ink"
              >
                {m}
              </span>
            ))}
          </span>
        </span>
      </li>
    </ul>
  );
}
