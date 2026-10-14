/**
 * NameTagDesigner: the homepage hero's live Dots med navn designer.
 *
 * A parent types the child's name, taps two colours and adds the tag
 * to the cart without leaving the homepage. Built for one thumb on a
 * phone: one text field, big swatches, one button.
 *
 *   - The preview redraws on every keystroke (same SVG as the product
 *     page, via ProductShape).
 *   - The design is remembered in localStorage (DESIGN_STORAGE_KEY),
 *     so the name is still there when they come back, and the product
 *     page form picks it up too (see PersonalizationForm).
 *   - "Send til ..." shares a link to the product page with the design
 *     in the query string, for the partner or grandparent who decides.
 *   - A sticky bar on mobile keeps the design and the button in reach
 *     once the hero has scrolled away.
 *
 * Line item attributes come from the same schema as the product page
 * (toLineItemAttributes), so the order reads the same in Shopify admin.
 */

"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ProductShape } from "@/components/personalization/ProductPreview";
import {
  isSchemaValid,
  toLineItemAttributes,
  type ColorOption,
  type PersonalizationSchema,
} from "@/lib/shopify/personalization";
import { readStoredDesign, writeStoredDesign } from "@/lib/design-storage";

const MAX_NAME = 12;

/** Danish genitive: "Idas", but "Mads'" and "Felix'". */
function genitive(name: string): string {
  return /[sxz]$/i.test(name) ? `${name}'` : `${name}s`;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Lightest colour for the tag, darkest for the name: always readable. */
function defaultColors(palette: readonly ColorOption[]) {
  const sorted = [...palette].sort((a, b) => luminance(b.hex) - luminance(a.hex));
  return { main: sorted[0]?.value ?? "", secondary: sorted.at(-1)?.value ?? "" };
}

interface NameTagDesignerProps {
  handle: string;
  schema: PersonalizationSchema;
  palette: readonly ColorOption[];
  /** Null when Shopify is unreachable: the button then links to the product page. */
  variantId: string | null;
  priceLabel: string | null;
  quantityNote?: string;
  deliveryWindow: string;
  facts: string[];
}

export default function NameTagDesigner({
  handle,
  schema,
  palette,
  variantId,
  priceLabel,
  quantityNote,
  deliveryWindow,
  facts,
}: NameTagDesignerProps) {
  const { addLines, loading } = useCart();
  const defaults = useMemo(() => defaultColors(palette), [palette]);

  const [name, setName] = useState("");
  const [main, setMain] = useState(defaults.main);
  const [secondary, setSecondary] = useState(defaults.secondary);
  const [added, setAdded] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  // Bring back the last design, but only colours this palette still has.
  // localStorage only exists after hydration, so this has to be an effect.
  useEffect(() => {
    const stored = readStoredDesign();
    const has = (v?: string) => Boolean(v && palette.some((c) => c.value === v));
    /* eslint-disable react-hooks/set-state-in-effect */
    if (stored?.name) setName(stored.name.slice(0, MAX_NAME));
    if (has(stored?.main_color)) setMain(stored!.main_color!);
    if (has(stored?.secondary_color)) setSecondary(stored!.secondary_color!);
    /* eslint-enable react-hooks/set-state-in-effect */
    hydrated.current = true;
  }, [palette]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStoredDesign({ name: name.trim(), main_color: main, secondary_color: secondary });
  }, [name, main, secondary]);

  // Sticky bar once the designer has scrolled up and out of view.
  useEffect(() => {
    const el = designerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const trimmed = name.trim();
  const values = useMemo(
    () => ({ name: trimmed, main_color: main, secondary_color: secondary }),
    [trimmed, main, secondary],
  );
  const valid = isSchemaValid(schema, values);
  const mainHex = palette.find((c) => c.value === main)?.hex ?? "#EFE6D8";
  const secondaryHex = palette.find((c) => c.value === secondary)?.hex ?? "#8F5F5F";

  const shareUrl = useCallback(() => {
    const params = new URLSearchParams(values);
    return `${window.location.origin}/produkter/${handle}?${params.toString()}`;
  }, [handle, values]);

  const add = useCallback(async () => {
    if (!valid) {
      inputRef.current?.focus();
      designerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!variantId) {
      window.location.href = shareUrl();
      return;
    }
    try {
      await addLines([
        { variantId, quantity: 1, attributes: toLineItemAttributes(schema, values) },
      ]);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }, [addLines, schema, shareUrl, valid, values, variantId]);

  const share = useCallback(async () => {
    const url = shareUrl();
    const text = trimmed
      ? `Hvad siger du til de her navnemærker til ${trimmed}?`
      : "Hvad siger du til de her navnemærker?";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Dots med navn fra Nooni", text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote("Linket er kopieret");
    } catch (err) {
      // AbortError means they closed the share sheet: nothing to say.
      if ((err as Error)?.name !== "AbortError") setShareNote("Kunne ikke dele linket");
    }
    window.setTimeout(() => setShareNote(null), 2400);
  }, [shareUrl, trimmed]);

  const buttonLabel = loading
    ? "Lægger i kurven…"
    : added
      ? "Lagt i kurven ✓"
      : trimmed
        ? `Læg ${genitive(trimmed)} navnemærker i kurven`
        : "Skriv et navn for at bestille";

  return (
    <>
      <div ref={designerRef} className="grid gap-5 md:grid-cols-[1fr_1fr] md:gap-8 lg:gap-12">
        {/* Stage: the tag, big, on the brand's arch */}
        <div className="relative order-first md:order-last">
          <div
            className="relative flex aspect-[2/1] items-center justify-center overflow-hidden bg-nooni-bg md:aspect-square"
            style={{ borderRadius: "999px 999px 28px 28px" }}
          >
            <ArchLines />
            <TagPreview name={trimmed} mainHex={mainHex} secondaryHex={secondaryHex} />
            <p
              aria-live="polite"
              className="absolute bottom-3 left-0 right-0 text-center text-nooni-ink-soft md:bottom-6"
              style={{ fontSize: "var(--nooni-text-label)" }}
            >
              {trimmed ? `${quantityNote ?? "3 stk."} med ${trimmed}` : "Skriv et navn og se det her"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col">
          <label htmlFor="hero-name" className="font-medium text-nooni-ink" style={{ fontSize: "var(--nooni-text-body)" }}>
            Hvad hedder dit barn?
          </label>
          <div className="relative mt-2">
            <input
              ref={inputRef}
              id="hero-name"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="words"
              spellCheck={false}
              enterKeyHint="done"
              maxLength={MAX_NAME}
              placeholder="Fx Alma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              className="h-14 w-full rounded-2xl border border-nooni-line bg-white px-5 pr-16 font-display text-xl text-nooni-ink outline-none transition-colors placeholder:text-nooni-ink-soft/40 focus:border-nooni-headline"
            />
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs text-nooni-ink-soft/60">
              {name.length}/{MAX_NAME}
            </span>
          </div>

          <Swatches label="Mærkets farve" palette={palette} value={main} onChange={setMain} />
          <Swatches label="Navnets farve" palette={palette} value={secondary} onChange={setSecondary} />

          <div className="mt-6 flex items-baseline justify-between gap-3">
            {priceLabel && (
              <p className="text-nooni-ink" style={{ fontSize: "var(--nooni-text-body-lg)" }}>
                <span className="font-medium">{priceLabel}</span>
                {quantityNote && (
                  <span className="text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                    {" "}· {quantityNote}
                  </span>
                )}
              </p>
            )}
            <button
              type="button"
              onClick={share}
              className="inline-flex shrink-0 items-center gap-1.5 text-nooni-sub underline decoration-nooni-line underline-offset-4 transition-colors hover:decoration-nooni-sub"
              style={{ fontSize: "var(--nooni-text-ui)" }}
            >
              <ShareIcon />
              {shareNote ?? "Spørg far eller mor først"}
            </button>
          </div>

          <button
            type="button"
            onClick={add}
            disabled={loading}
            className={`mt-3 inline-flex h-14 w-full items-center justify-center rounded-full px-6 text-white transition-colors disabled:opacity-60 ${
              valid ? "bg-nooni-headline hover:bg-[#9d6f6f]" : "bg-nooni-headline/70"
            }`}
            style={{ fontSize: "var(--nooni-text-body)" }}
          >
            {buttonLabel}
          </button>

          <p className="mt-3 text-center text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
            Bestil i dag, så er de hos jer <span className="text-nooni-ink">{deliveryWindow}</span>
          </p>

          <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-label)" }}>
            {facts.map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5">
                <span aria-hidden className="h-1 w-1 rounded-full bg-nooni-sub" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/produkter/${handle}`}
            className="mt-4 self-center text-nooni-ink-soft underline decoration-nooni-line underline-offset-4 hover:text-nooni-headline"
            style={{ fontSize: "var(--nooni-text-ui)" }}
          >
            Se billeder og detaljer
          </Link>
        </div>
      </div>

      {/* Mobile sticky bar: the design and the button stay in reach */}
      <div
        aria-hidden={!showSticky}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-nooni-line-soft bg-nooni-bg/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(61,50,40,0.08)] backdrop-blur transition-transform duration-200 md:hidden ${
          showSticky ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg viewBox="0 30 100 40" className="h-9 w-[90px] shrink-0" aria-hidden>
            <ProductShape handle={handle} fill={mainHex} />
            {trimmed && <TagName name={trimmed} fill={secondaryHex} />}
          </svg>
          <p className="min-w-0 flex-1 truncate text-sm text-nooni-ink-soft">
            {priceLabel ?? "Dots med navn"}
          </p>
          <button
            type="button"
            tabIndex={showSticky ? 0 : -1}
            onClick={add}
            disabled={loading}
            className="shrink-0 rounded-full bg-nooni-headline px-5 py-3 text-sm text-white disabled:opacity-60"
          >
            {added ? "Lagt i kurven ✓" : valid ? "Læg i kurv" : "Skriv navnet"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Pieces ───────────────────────────────────────────────────────── */

function TagName({ name, fill }: { name: string; fill: string }) {
  // Same fit rule as ProductPreview: width budget / chars, capped.
  const size = Math.min(26, Math.round(84 / (name.length * 0.58)));
  return (
    <text
      x="52"
      y={/[gjpqy]/i.test(name) ? "48" : "50"}
      textAnchor="middle"
      dominantBaseline="central"
      fill={fill}
      fontSize={size}
      fontFamily="var(--font-fredoka-var), Fredoka, system-ui, sans-serif"
      fontWeight="bold"
    >
      {name}
    </text>
  );
}

function TagPreview({ name, mainHex, secondaryHex }: { name: string; mainHex: string; secondaryHex: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      overflow="visible"
      role="img"
      aria-label={name ? `Dots med navnet ${name}` : "Dots med navn"}
      className="nooni-tag-float relative w-[68%] max-w-[360px]"
    >
      <defs>
        <filter id="hero-tag-shadow" filterUnits="userSpaceOnUse" x="-15" y="-15" width="130" height="130">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(80,45,30,0.35)" />
        </filter>
      </defs>
      {/* The ring that clips onto the zipper pull */}
      <circle cx="4" cy="50" r="7" fill="none" stroke="#C9B8A4" strokeWidth="2.2" />
      <g filter="url(#hero-tag-shadow)" style={{ transition: "fill 200ms" }}>
        <ProductShape handle="dots-med-navn-3stk" fill={mainHex} />
      </g>
      {name ? (
        <TagName name={name} fill={secondaryHex} />
      ) : (
        <text x="52" y="50" textAnchor="middle" dominantBaseline="central" fill={secondaryHex} opacity="0.35" fontSize="16" fontFamily="var(--font-fredoka-var), Fredoka, system-ui, sans-serif" fontWeight="bold">
          Navn
        </text>
      )}
    </svg>
  );
}

function Swatches({
  label,
  palette,
  value,
  onChange,
}: {
  label: string;
  palette: readonly ColorOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const current = palette.find((c) => c.value === value);
  return (
    <fieldset className="mt-5">
      <legend className="text-nooni-ink" style={{ fontSize: "var(--nooni-text-ui)" }}>
        {label}
        {current && <span className="text-nooni-ink-soft">: {current.label}</span>}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2.5" role="radiogroup" aria-label={label}>
        {palette.map((c) => {
          const selected = c.value === value;
          return (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={c.label}
              onClick={() => onChange(c.value)}
              className={`h-10 w-10 rounded-full transition-transform active:scale-95 ${
                selected
                  ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg-warm"
                  : "ring-1 ring-black/10 hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

/** Six concentric arch lines, the brand's signature, behind the tag. */
function ArchLines() {
  return (
    <svg aria-hidden viewBox="0 0 200 240" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 6 }, (_, i) => {
        const r = 92 - i * 12;
        const sy = 108 + i * 12;
        return (
          <path
            key={i}
            d={`M ${100 - r} 240 L ${100 - r} ${sy} A ${r} ${r} 0 0 1 ${100 + r} ${sy} L ${100 + r} 240`}
            fill="none"
            stroke="#C9B8A4"
            strokeOpacity={0.35 - i * 0.04}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v13M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}
