# Motif source SVGs

This folder holds the **source-of-truth** SVG files for the motifs that
appear on Dots and Emblem products (citron, kirsebær, bil, smiley, and
any future additions). The actual website renderer reads its motif
geometry from a hand-curated React map in
`src/components/personalization/motifs.tsx` — these files are what we
copy the path data **from**.

Why two places: the renderer needs to recolour the motif live based on
the customer's secondary-colour choice. A raw `<img src="lemon.svg">`
can't be recoloured. So the path data is inlined as React SVG, with
`fill` driven by props. These source files are the canonical export —
the React map is a derived view.

## File naming

One SVG per motif. Filename = motif `value` from
`src/lib/shopify/personalization.ts` → `MOTIFS`:

```
lemon.svg
cherry.svg
car.svg
smiley.svg
nooni_logo.svg     (used by Emblem)
```

When adding a new motif: pick the value/filename here, add an entry to
`MOTIFS` in `personalization.ts`, and add a renderer in `motifs.tsx`.

## How to export the SVG (Camilla)

The renderer expects clean, predictable SVG. Easiest path from any
design tool (Illustrator, Figma, Affinity, Inkscape):

1. **ViewBox: `0 0 100 100`** — square, 100-unit grid. The website
   draws the dot as a circle in this same viewBox, so the motif's
   coordinates are directly comparable.
2. **Centre the motif around (50, 50)** with breathing room — aim for
   the motif to take ~50–60% of the box width. The outer 20% on each
   side stays empty so the motif sits cleanly inside the circle.
3. **Single colour.** Any colour — we override it. Use plain `fill`
   attributes on shapes, no gradients, no patterns.
4. **Simplify paths.** Avoid stacked layers, transforms, or `<use>`
   references. A flat list of `<path>` / `<circle>` / `<g>` is ideal.
5. **No text elements** if avoidable — convert text to paths first so
   the renderer doesn't depend on system fonts.

## Integrating an exported SVG (developer)

When a new file lands in this folder:

1. Open the SVG in a text editor — strip XML prolog, comments,
   `<defs>` that aren't referenced, inline styles
2. Open `src/components/personalization/motifs.tsx`
3. Add or replace the entry in `MOTIF_SVGS` with the cleaned path data
4. Replace any hard-coded `fill="#xxx"` with `fill={color}` (or wrap
   in a parent `<g fill={color}>` and remove `fill` from children)
5. Visit `/produkter/dots-5stk` on the preview URL and confirm the
   motif renders correctly across all five colour swatches

## What lives outside this workflow

The Nooni wordmark is **not** a motif — it's a typographic logo
specified in `BRAND.md` at the repo root. There is no SVG file for it,
ever; it's always rendered live via the `<Logo />` React component.
