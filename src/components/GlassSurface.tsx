/**
 * GlassSurface — reusable wrapper that applies the Nooni liquid-glass look.
 *
 * Implementation notes:
 *   - The visual is intentionally restrained: 32% cream + 3px backdrop blur.
 *     Heavier blurs and saturate() erased the delicate arch lines behind
 *     the glass into a flat white wash.
 *   - For the backdrop-filter to do anything visible, the element BEHIND
 *     this surface must be in the same stacking context. The arches use
 *     position: fixed and z-index: 0; this surface sits at z-index: 1 in
 *     the page body. Don't add `transform`/`filter`/`will-change` on any
 *     ancestor — they create new stacking contexts and break the effect.
 *
 * Usage:
 *   <GlassSurface as="section" className="p-9">…</GlassSurface>
 *   <GlassSurface as={Link} href="/x">…</GlassSurface>
 */

import * as React from "react";

type GlassSurfaceProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function GlassSurface<T extends React.ElementType = "div">({
  as,
  className = "",
  children,
  ...rest
}: GlassSurfaceProps<T>) {
  const Component = as ?? "div";
  return (
    <Component className={`nooni-glass ${className}`} {...rest}>
      {children}
    </Component>
  );
}
