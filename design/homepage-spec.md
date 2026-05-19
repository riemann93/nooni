# Homepage redesign — spec

Written from Camilla's hand sketches and Steffan's annotation pass.
Source artwork:

- `design/sketch-homepage-layout.jpg` — hero + featured products + reviews
- `design/sketch-about-blog-contact.jpg` — continues the same homepage:
  about + blog/newsletter + contact

This document is the design intent. When we implement, we ship one
section at a time and check the result against this spec.

---

## Section order

The homepage scrolls top to bottom in this order:

1. Hero
2. "Mest populære" — three featured products
3. "Mine kunder synes" — customer reviews (toggleable)
4. About — "Hvem står bag Nooni"
5. Blog / Nyhedsbrev — newest post teaser
6. Contact

---

## 1. Hero

### Resting state

- Container: a rounded-square frame, full content width
- Two thin vertical borders, one on each side, in the arch-line tone
  (`--color-nooni-arch`). They span the **vertical** edges of the
  hero only — they curve inward toward the middle at the top and
  bottom and **do not** wrap around the horizontal edges
- Background: full-bleed lifestyle photo showing a Dot in active use
  (a child's jacket, bag, etc.)
- **Photo overlay** — the left third (or so) of the photo is veiled by
  a cream-coloured transparent wash so the headline copy on top of
  it stays legible
- Left-aligned content stack inside the frame:
  - Headline: **Dots**
  - Short product description
  - Primary CTA: **Design din egen**

### Expanded state (after clicking "Design din egen")

The hero grows downward in a smooth animation; the lifestyle photo
zooms in on the product. The expanded area below the original
content shows:

- **Left** — personalization form (same fields used on the product
  detail page: colours, motif/name)
- **Right** — live product preview reflecting the current configuration
- **Bottom-left** — secondary CTA **Find inspiration**. A small example
  product image protrudes outside the hero frame attached to this
  button; clicking the button navigates to the product detail page
  (which itself shows many example configurations as inspiration)
- **Bottom-right** — primary CTA **Tilføj til kurv** that adds the
  currently-configured product to the cart

### Add-to-cart animation

When "Tilføj til kurv" is clicked, the configured product visually
"travels" from the hero up to the cart pill in the top-right of the
navbar — like a basketball arcing into a hoop. The cart count
increments at the end of the animation.

---

## 2. "Mest populære"

Three pre-selected product cards on one row, each sized so all three
fit horizontally on desktop.

- Card composition: product photo with an **arched top**, a separate
  box of product info below (title, short tag, price)
- Below the row: a **"Se alle produkter"** link or button (not in the
  sketch, but called out as needed) that navigates to a dedicated
  `/produkter` listing page
- The `/produkter` page reuses the same product card component, so
  any visual change to the card propagates automatically

---

## 3. "Mine kunder synes"

A rounded **pill-shaped** container showing three customer reviews
side by side.

- **Toggleable** — hidden until enough reviews exist. Off by default
  for soft launch.
- Source of reviews TBD: a Shopify reviews app, Trustpilot integration,
  or a hand-curated list to start. Decide before turning the section
  on.

---

## 4. About — "Hvem står bag Nooni"

A two-column section introducing the family behind Nooni.

- **Left** — family photo in the same arched frame as the product
  cards (arched top, square-ish bottom)
- **Right** — about-us body copy

This section grows / links into a fuller `/om-os` page later; the
homepage version is the short introduction.

---

## 5. Blog / Nyhedsbrev

A single rounded rectangular box previewing the newest blog post.

- **Left** — post title + short excerpt + **Læs mere** button
- **Right** — post hero image rendered as a **half-arch** (the right
  edge is cropped, hinting that more content lives behind it). The
  cropped edge invites the click.
- The **button** and the **image** are clickable and lead to the
  full blog post. The wrapping box itself is not a link — the two
  affordances are enough, and a full-box link would conflict with
  text selection inside the excerpt.

---

## 6. Contact

- A medium-sized arch containing contact info + social media links
- Sits inside a **larger coloured arch that spans the full page
  width** — same edge alignment as the other sections above it. The
  outer arch is the section's background; the inner arch is the
  content container.

---

## Notes for implementation (Steffan + Claude)

Things to plan before coding:

- **Hero expand animation** — height transition + photo zoom + content
  fade-in. Probably needs CSS `grid-template-rows: 0fr → 1fr` trick
  for height, with framer-motion for the photo zoom if CSS isn't
  enough. Picks one direction up front so iteration cycles are quick.
- **The "Find inspiration" image protruding outside the hero frame**
  needs the parent to not clip overflow. Worth checking against the
  border treatment doesn't conflict.
- **Cart "basketball" animation** is a flourish — easy to do badly.
  Worth prototyping in a low-stakes branch before committing to the
  motion design.
- **Reviews source** — pick before building Section 3. App, API, or
  hand-rolled JSON?
- **Blog backend** — Markdown files in the repo? A headless CMS (Sanity,
  Contentful)? Shopify's built-in blog? Affects how Section 5 is wired.
- **Border treatment in the hero** (the two side-only curved lines) is
  unusual — worth a small CSS prototype before committing the rest of
  the hero.

---

## Open product questions

- The default lifestyle photo for the hero — same `dots_name_lifestyle`
  shot, or a new one? The sketch doesn't specify.
- The three "Mest populære" products — hand-curated by Camilla, or
  driven by Shopify product tags / collections?
- About-section family photo — does it exist yet, or pending?
- First blog post — does any content exist yet, or is the section
  parked until it does?
- Contact info to show — email (`hej@nooni.dk`), Instagram, anything
  else (phone, physical address)?
