# Nooni — Project Vision

> **"Smart solutions for families"**

---

## Project Status

A snapshot for anyone joining the project — for the long-form spec keep
reading.

- **Live:** `nooni.dk` serves a branded under-construction page (the
  `production` branch). The full site lives on `main` and gets a Vercel
  preview URL on every push.
- **Shopify:** integrated headless via the Storefront API. Cart, line
  items, personalization properties, and Shopify-hosted checkout all
  work end-to-end. Test purchases verified.
- **Personalization:** schema-driven form per product handle (see
  `src/lib/shopify/personalization.ts`). Customer choices flow through
  cart → checkout → order admin as Shopify line item properties.
- **Brand wordmark:** locked in `BRAND.md` and the `<Logo />` component.
- **What's next:** real products in Shopify (Dots / Loops / Emblem /
  Decks / Tic Tac Take), shipping rates + MOMS configured, legal pages,
  then a design polish pass and merge `main` → `production` for launch.

For the day-to-day reading order: `BRAND.md` → this file → `AGENTS.md`
→ `README.md`.

---

## Brand Overview

Nooni is a small Danish family business creating personalized, 3D-printed products for everyday family life. The brand lives at the intersection of Nordic calm and warm, Boho character — functional objects that feel considered and personal, not mass-produced.

nooni — friendly, approachable, a little playful. This is a brand that speaks to parents who care about the details, who want their children's things to feel special without being loud about it.

**Domain:** [nooni.dk](https://nooni.dk)  
**Instagram:** [@hej.nooni](https://www.instagram.com/hej.nooni/)  
**Platform:** Shopify

---

## Products (Current)

All products are produced in-house on **Bambu P2S** 3D printers. Small-batch, locally made, with craft and precision behind every order. The personalization workflow is central to the business — every product is configured by the customer, printed on demand, and fulfilled from home.

### Dots
Small custom circles, ~1,5 cm diameter. Used to personalize children's clothing items (e.g. for daycare). Customer configures:
- **Main color**
- **Secondary color**
- **Logo** (lemon, cherry, car, smiley, etc.) — or —
- **Name** (transforms the dot into an elongated oval with rounded ends to fit the text, same design language)

### Loops
Larger than Dots, ~2 cm x 5 cm. Multi-purpose: bag tags, pencil case labels, keychains. Customer configures:
- **Main color**
- **Secondary color**
- **Name or logo**

### Decks
A card holder designed for kids. Comes in one or two layers depending on the card game. Customer configures:
- **Color** (standard Nooni palette)
- **Configuration** (single row / double row)

---

### Product Roadmap Note
Dots, Loops, and Decks are the core v1 lineup. New products will be added over time. The product configurator UI and data model should be designed to accommodate new product types without structural changes.

---

## Target Audience

- Parents of young children (primary)
- Gift-givers looking for something personal and meaningful
- Danish/Nordic market first, potential EU expansion

**Psychographic:** Values quality over quantity. Prefers calm aesthetics over loud branding. Wants products that solve a real problem (lost keys, mixed-up clothes at daycare) but still look good.

---

## Design System

### Colors

| Role | Hex | Usage |
|---|---|---|
| Background | `#FFFCF7` | Page backgrounds, cards — warm off-white, never cold |
| Secondary (warm) | `#D9B4A7` | Accents, buttons, warm highlights |
| Secondary (cool) | `#D0E1C1` | Complementary accents, tags, badges |
| Headline | `#B48383` | Primary headings — dusty rose, grounded |
| Sub-headline | `#678061` | Section titles, links — muted sage green |

All colors should feel like they belong together in a sun-lit Danish home in October.

### Typography

| Role | Font | Notes |
|---|---|---|
| Logo / brand mark | Fredoka 700 | Rounded, friendly — wordmark only, never in copy |
| Body, eyebrows, headlines | Inter (300 for editorial headings, 400 for body) | Modern Nordic sans by Rasmus Andersson — one workhorse face across the site |
| Italic accent words | Cormorant Garamond Light 300 italic | Only on `italic + text-nooni-headline` highlights (the warm-coloured emphasis words in a headline). Bumped to 1.12em on inline `<em>`/`<span>` to optically match the surrounding sans |

**Principle:** Inter does the heavy lifting so the page reads clean and uncluttered. Cormorant Light steps in as a small editorial flourish — only on the dusty-rose italic accent words inside a headline. Fredoka is reserved strictly for the Nooni wordmark.

### Visual Style

- **Boho arches** are the primary graphic motif — use them in section dividers, image frames, decorative overlays, and UI containers where appropriate
- Photography and product imagery should feel warm, natural, slightly soft — no harsh studio lighting
- Negative space is intentional; resist the urge to fill every pixel
- Props in lifestyle imagery: natural textures (linen, wood, dried florals), not plastic or cold surfaces
- Illustrations or icons, if used, should be simple line drawings that echo the rounded, organic shapes of the arch motif

---

## Experience Principles

1. **Personal first** — Every touchpoint should feel like it was made for *you*. Product customization UX must be frictionless and delightful, not a form to fill in.

2. **Trust through craft** — Communicate that products are made by hand, in Denmark, with care. Show the process. Show the machines. Demystify 3D printing in a warm way.

3. **Family-friendly flow** — Ordering should work for a parent with one hand free. Fast, clear, no surprises at checkout.

4. **Calm by default** — No aggressive countdown timers, no pop-up stacks, no "SALE 70% OFF" banners. Promotions should feel like a friendly suggestion, not a shout.

5. **Nordic restraint** — Less is more. One clear call to action per section. White space is not wasted space.

---

## Technical Architecture

### Approach: Headless Shopify

Nooni runs **headless** — Shopify as the commerce backend (catalog, checkout, payments, inventory, orders), with a custom frontend that owns the full user experience.

**Why headless:**
- The long-term vision includes a real-time 3D product configurator (Three.js / React Three Fiber) — impossible inside a Shopify theme
- Full control over the personalization UX; no app limitations or theme hacks
- The brand's design system is specific enough that a theme would require so many overrides it'd be easier to start fresh

**Stack:**
- **Frontend:** Next.js (App Router) — deployed on Vercel
- **Commerce backend:** Shopify with Storefront API
- **3D configurator (v2+):** React Three Fiber — live product preview as customer selects colors, name, and logo
- **Checkout:** Shopify hosted checkout (trusted, battle-tested, handles MobilePay via Nets/Stripe)
- **Language:** TypeScript throughout

### Shopify Configuration
- **Product types:** Made-to-order, personalized — custom line item properties carry configuration data (color, name, logo) through to order details
- **Collections:** Dots / Loops / Decks — expand as products grow
- **Markets:** Danish primary (`nooni.dk`, DKK, Danish language), structured for EU from day one
- **Payments:** MobilePay via Nets or Stripe — non-negotiable for Danish market

### Release Strategy

**v1 — Market launch (3-week deadline)**
The goal is something live before the local market appearance. Scope is deliberately minimal:
- Homepage with brand introduction
- Product pages for Dots, Loops, Decks with text/dropdown personalization (no 3D yet)
- Cart + Shopify hosted checkout
- Basic about/contact page
- Mobile-first — parents at a market will pull out their phones

**v2 — 3D Configurator**
- Real-time 3D product preview in the browser
- Customer sees their color choices and name/logo applied to the model live
- This is the signature feature that sets nooni.dk apart from any competitor

**v2+ — Post-purchase delight**
- After-checkout thank-you experience that mirrors the brand's hand-made warmth
- Idea on the table: a small pixel-art animation of a 3D printer starting up
  and beginning to print the customer's product. Plays once on the thank-you
  page after a successful order — quiet, charming, tells the production
  story visually.
- Implementation will depend on whether Shopify Checkout Extensibility allows
  enough customisation of the thank-you page, or whether we route customers
  to a `/tak` page on `nooni.dk` post-purchase (set in Shopify checkout
  settings) and own the experience fully.

### Design Assets
- SVG source files live in `/design/` in the repository — version controlled, used directly in the frontend
- PNGs alongside SVGs for any assets where visual reference is needed during development

---

## Content & Tone of Voice

- Language: Danish primary, English for EU expansion
- Voice: Warm, direct, a little playful — like a text from a friend who happens to make beautiful things
- Avoid: Corporate language, urgency tactics, overuse of exclamation points
- Use: Short sentences. Real situations ("Finally, no more unlabeled lunch boxes"). The word "hej" is on-brand.

---

## Open Questions

Status as of mid-development. Items struck through have been answered.

- [ ] **Payment methods.** MobilePay activated through Shopify Payments.
      Test-mode checkout verified end-to-end. Real-money verification not
      yet done — needs a live 1 DKK transaction before launch.
- [ ] **Shipping.** PostNord vs GLS, zones, rates, free-shipping
      threshold. Still TBD — your wife's territory in Shopify admin.
- [ ] **Production lead time.** "2–4 dage" appears throughout the site
      copy as a placeholder. Confirm before launch.
- [ ] **Photography.** Lifestyle shots vs the current stylised SVG
      product-art placeholders. Open.
- [x] **VAT/MOMS.** Decision: 25% inclusive in displayed prices
      (Danish standard). Configuration still pending in Shopify Markets.
- [x] **Custom font licensing.** Filena licence not pursued for v1.
      The page consolidated onto **Inter** (Google Fonts, free) for
      body, eyebrows, and headings — one Nordic-modern sans across the
      site. **Cormorant Garamond Light italic** remains loaded purely
      as the editorial accent on `italic + text-nooni-headline`
      highlight words (see `.italic.text-nooni-headline` in
      `globals.css`). Fredoka 700 still owns the wordmark.
- [ ] **Sender email.** Order confirmations currently come from
      Shopify's generic `t.shopifyemail.com` address. Plan: configure
      `hej@nooni.dk` (forward to existing Gmail) + DKIM/SPF/DMARC so
      Shopify can send as the Nooni domain.

---

## Definition of a Successful Launch

A first version of the store is successful when:

- A Danish parent can discover a product, personalize it, pay in DKK with MobilePay, and receive a confirmation email — all without friction
- The store *looks* like Nooni without the buyer knowing anything about the brand first
- The production team can read every order and know exactly what to print

---

*This document is the source of truth for the Nooni brand and project. All design, development, and content decisions should be weighed against the principles here. When in doubt: calm, warm, personal.*
