# Nooni — Brand specification

Canonical reference for the Nooni visual identity. **This document is the
source of truth.** If anything on Instagram, in print, on the website, or in
a future asset disagrees with what's written here — this document wins, and
the disagreeing asset is wrong.

The colour palette and broader design system live in `VISION.md` § Design
System and the Tailwind tokens in `src/app/globals.css`. This file covers
the wordmark.

---

## Wordmark

The Nooni wordmark is a **typographic logo**. There is no SVG file, no PNG,
no separate logo asset to download. The wordmark is recreated live —
in code by a React component, anywhere else by typing the word in the right
font and colour.

### Specification (locked)

| Property | Value |
|---|---|
| **Text** | `Nooni` — capital N, lowercase o-o-n-i |
| **Font family** | Fredoka |
| **Font weight** | 700 (bold) |
| **Letter spacing** | 0 — normal, do not adjust |
| **Color** | `#B48383` — RGB(180, 131, 131) |
| **Background** | `#FFFCF7` Nooni cream, or pure white |

On the website the wordmark uses `--color-nooni-rose`. Body text, labels and
buttons use the darker `#8F5F5F` rose and `#56704F` green so they stay
readable (WCAG AA). The wordmark itself keeps `#B48383`.

That is the entire spec. Size, position, and surrounding negative space are
free choices made per surface. Everything else is fixed.

---

## How to recreate the wordmark

### In code (this repository)

Use the `<Logo />` component in `src/components/Logo.tsx`:

```tsx
import Logo from "@/components/Logo";

<Logo />                                  // span by default
<Logo as="h1" className="text-7xl" />     // heading variant for hero use
<Logo as="span" className="text-2xl" />   // navbar / footer use
```

The component locks every property in the spec table. You only choose the
HTML element (`as`) and the sizing (`className`). Never pass font, weight,
tracking, or colour overrides — that defeats the point of having a single
source of truth.

If you find an inline wordmark anywhere in the codebase
(`<span className="font-display ...">Nooni</span>` or similar), replace
it with `<Logo />` and remove the inline classes. There should be **zero**
such occurrences in `src/`.

### Anywhere else (Instagram, Canva, Figma, business cards, packaging, print, video)

1. Install the **Fredoka** font — free from Google Fonts:
   <https://fonts.google.com/specimen/Fredoka>
2. Set the weight to **Bold (700)**
3. Set the colour to **`#B48383`**
4. Type `Nooni` — capital N, lowercase ooni
5. Letter spacing: **0** / normal — do not tighten, do not loosen
6. Place on the Nooni cream background (`#FFFCF7`) or pure white

That's it. Anyone with these six values can recreate the wordmark from
scratch in under a minute, and it will be identical to every other Nooni
wordmark in the world.

---

## What you cannot do

- ❌ Use a different font (not even another rounded sans like Quicksand or
  Nunito — Fredoka specifically)
- ❌ Use a different weight (Regular, Medium, and Semibold are not Nooni)
- ❌ Use a different colour (no black, no gold, no pastel variants)
- ❌ Italicise, condense, stretch, or skew the wordmark
- ❌ Adjust the letter spacing (no `tracking-tight`, no `letter-spacing: 0.1em`)
- ❌ Add an icon, monogram, dot, or symbol next to it
- ❌ All-caps, all-lowercase, or sentence-case variants
- ❌ Place it on a busy photographic background without a solid backdrop
- ❌ Make a horizontal lockup with a tagline (the tagline lives separately)

If a use case genuinely needs one of the above, talk to the brand owner
before shipping it — and once a decision is made, **update this file** so
the next person doesn't have to ask the same question.

---

## Variants

There are none. The wordmark scales freely from favicon to billboard at
the same proportions and same colour. There is no monochrome version,
no icon-only "N" mark, and no horizontal lockup with a tagline. If a
single-letter "N" is ever needed (a favicon, a social avatar), it is the
same N from Fredoka Bold in `#B48383`.
