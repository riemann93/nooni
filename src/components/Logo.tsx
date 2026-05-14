/**
 * Logo — the Nooni wordmark.
 *
 * Single source of truth for the wordmark. Specification is locked here
 * and documented in BRAND.md (repo root). If you find yourself writing
 * `<span className="font-display ...">Nooni</span>` somewhere, replace
 * it with this component.
 *
 * Locked properties:
 *   Text:           Nooni  (capital N, lowercase o-o-n-i)
 *   Font:           Fredoka
 *   Weight:         700 (bold)
 *   Letter spacing: 0 (normal)
 *   Color:          #B48383  (--color-nooni-headline)
 *   Line height:    1 (none)  — keeps the bounding box tight at any size
 *
 * Configurable:
 *   `as`        — HTML element (default: span). Use h1 for hero usage.
 *   `className` — sizing only (text-Nxl, leading-*). Do NOT pass font,
 *                 weight, tracking, or colour overrides.
 */

import * as React from "react";

type LogoProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Logo<T extends React.ElementType = "span">({
  as,
  className = "",
  ...rest
}: LogoProps<T>) {
  const Component = as ?? "span";
  return (
    <Component
      className={`font-display font-bold tracking-normal leading-none text-nooni-headline ${className}`}
      {...rest}
    >
      Nooni
    </Component>
  );
}
