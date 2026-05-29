# Homepage — spec

Written from Camilla's hand sketches and Steffan's annotation pass,
then revised after implementation. This document is the current
source of truth for the homepage shape: what each section looks like
as built, what's intentionally deferred, and the open questions
remaining.

Source artwork:

- `design/sketch-homepage-layout.jpg` — hero + featured products + reviews
- `design/sketch-about-blog-contact.jpg` — about + blog/newsletter + contact

Both sketches differ from the final build in places — those drifts
are noted per section below. The sketches are kept for reference, not
treated as binding.

---

## Section order

The homepage scrolls top to bottom in this order:

1. Hero
2. "Sådan virker det" — three-step "how it works" explainer
3. "Mest populære" — three featured products
4. ~~"Mine kunder synes" — customer reviews~~ *(deferred — see §4)*
5. About — "Hvem står bag Nooni" / Familien bag
6. Blog

Every page (homepage and inner pages) then closes with the site-wide
arched `<Footer />` mounted in `src/app/layout.tsx`. There is no
separate "Contact" section — the footer absorbed that role. See §7
below.

---

## 1. Hero

**Status:** resting state shipped. Expand mechanism deferred.

### Resting state

- Container: a rounded frame, full content width. Aspect 4:5 on
  mobile, 3:2 on desktop (matches the placeholder photo's native 3:2)
- Background: full-bleed lifestyle photo. Currently
  `public/images/familie_1.jpg` as a placeholder until Camilla's new
  product shots are ready — same palette, same aspect ratio
- **Cream wash** — a left-to-right gradient veils the left third (or
  so) of the photo with `--color-nooni-bg-warm` so the headline copy
  stays legible
- Left-aligned content stack inside the frame:
  - Eyebrow: "Personlige mærker til dit tøj"
  - Headline: **Dots** (oversized italic editorial serif)
  - Short product description
  - Primary CTA: **Design din egen** → `/produkter/dots-med-navn-3stk`

### Sketch drift

The original sketch showed two thin vertical "arch-line" markers
outside the photo. Those were Camilla's pencil indicators for where
the photo edge would be — not a design element. They're not in the
build, and the early implementation that traced them has been
removed.

### Expanded state — deferred

Originally intended: click "Design din egen" → hero grows downward,
photo zooms in, configurator (form + live preview) appears, with
"Find inspiration" and "Tilføj til kurv" CTAs. A basketball-arc cart
animation visualises the add. **Deferred — possibly past Dalager
Marked.** Until it lands, the CTA just navigates to the product
detail page.

---

## 2. "Sådan virker det"

**Status:** shipped.

A three-step strip explaining what happens after a customer hits
"Design din egen". Lives between Hero and Mest populære. Numbered
01 / 02 / 03 in the Nooni headline tone, each with a short italic
heading and one sentence of body.

Current steps:

1. **Du designer selv** — vælg farver, motiv eller navn live på produktsiden
2. **Vi printer hjemme** — 3D-printet hos os i Danmark, kun det du har bestilt
3. **Holder til hverdagen** — mærkerne tåler vask, kulde og børneliv

Step 3 used to claim a "2–4 dages levering med PostNord" delivery
window. Both halves of that were dropped: delivery time is out of
Nooni's hands (depends on the carrier and the postal system) and
the carrier name is incidental. Replaced with the durability claim,
which is the unique value of 3D-printed thermoplastic over
traditional sticker labels and is provable.

This section is not in the original sketches. It was added to carry
the production-transparency facts that used to live in a stats row
inside the About section, and to fill the trust-signal slot until the
reviews section can be turned on.

The strip sits inside a cream rounded pill on the regular page
background (same pill treatment used by Story and BlogTeaser) — the
cream tone signals "content beat" without filling the full viewport
width. Step numbers use plain "1 / 2 / 3" (no leading zero).

---

## 3. "Mest populære"

**Status:** shipped.

Three pre-selected product cards on one row on desktop (1/2/3 column
breakpoints). Below the row, a centred outline link **"Se alle
produkter"** routes to `/produkter` — the new full-catalogue listing
page.

### Card composition

- One cream-tinted container (`--color-nooni-bg-warm`) shaped as a
  dome: a full semicircle top from the photo, 24 px rounded bottom
  corners under the info block
- Photo and info share the background, so the seam between them is
  just a clean horizontal transition inside one shape
- Warm two-tone drop shadow matching the hero palette; deepens on
  hover
- Info block holds an uppercase tagline (homepage only), product
  title, "fra X kr" price, and a "Se mere →" affordance

### Shared component

Cards render through `src/components/ProductCard.tsx`, which is also
used by the `/produkter` listing page. Visual changes to cards land
in one place.

### Current trio

Loops / Emblem / Deks single — hand-picked placeholder. Final trio
is still Camilla's call (see open questions).

---

## 4. "Mine kunder synes"

**Status:** deferred for soft launch.

Spec from sketch: a pill-shaped container with three customer
reviews side by side.

- **Toggleable** — hidden until enough reviews exist. Off by default.
- Source of reviews TBD. The recommended path for Nooni's stage is
  **Judge.me on Shopify** (free tier, automated invites, photo
  attachments) rather than Trustpilot, whose verified-review system
  is paid and disproportionately hurts brands with low star counts.

In the meantime, **§2 "Sådan virker det"** carries the pre-launch
trust-signal load.

---

## 5. About — "Hvem står bag Nooni"

**Status:** shipped (component name: `Story`).

A two-column section introducing the family behind Nooni.

- **Left** — family photo (`public/images/familie_2.jpg`) in an
  arched frame (full semicircle top, 22 px bottom corners), matching
  the dome shape used on the product cards
- **Right** — body copy: two paragraphs introducing the family and
  the print-on-demand process

Both columns sit inside a cream rounded pill on the regular page
background — same pill treatment used by HowItWorks and BlogTeaser,
so the warm tone reads as "content beat" and the page edges stay on
the lighter background.

Reused on `/om-os` (with `QuietCTA` appended).

### Sketch drift

The earlier build had a three-stat row below the body copy
("1.412 print sendt" / "2–4 dage" / "100% Danmark"). The first
number was fabricated. The whole row was removed — the two factual
stats moved to §2 "Sådan virker det" where they read as concrete
process steps rather than free-floating numbers.

The current headline copy ("Lavet derhjemme, med plads til
fingeraftryk.") differs from the sketch's "Hvem står bag Nooni?".
That's a content decision Camilla and Steffan made directly — leave
it alone unless they revisit.

---

## 6. Blog

**Status:** shipped.

A single rounded rectangular box previewing the newest blog post.

- **Left** — post title + short excerpt + **Læs mere** button
- **Right** — post hero image rendered as a **half-arch** (the right
  edge is cropped, hinting that more content lives behind it). The
  cropped edge invites the click.
- The **button** and the **image** are clickable and lead to the
  full blog post. The wrapping box itself is not a link — the two
  affordances are enough, and a full-box link would conflict with
  text selection inside the excerpt.

### Sketch drift

The original section heading in the sketch said **Blog / Nyhedsbrev**.
The Nyhedsbrev (newsletter) half was not built — there's no signup
form on the homepage. Treat the section as blog-only for now; if a
newsletter signup is added later, decide whether it lives here, in
the footer, or as its own section.

---

## 7. Footer

**Status:** shipped. Site-wide chrome, not a homepage section.

The arched closing element. Mounted once in `src/app/layout.tsx` so
every page (homepage, `/produkter`, `/produkter/[handle]`, `/om-os`,
`/kontakt`, `/blog/[slug]`) ends with the same footer. The arch's
bottom edge sits flush with the viewport bottom.

Content inside the arch, top to bottom:

- **Nooni wordmark**, links to `/`. On the homepage that's effectively
  "scroll to top"; from inner pages it takes the visitor home.
- **Short prompt**: "Spørgsmål, særlige ønsker, eller bare en god
  idé? Vi svarer hurtigt."
- **Primary CTA** "Skriv til os" → `/kontakt`
- **Inline contact links** — `hej@nooni.dk` (mailto) and `@hej.nooni`
  (Instagram), each with a small icon
- **Hairline divider**
- **Copyright line**: "© {year} Nooni — lavet med kærlighed i Danmark"

Shape: the same pill silhouette used by HowItWorks, Story and
BlogTeaser — top corners rounded with `2rem`, bottom corners square,
full content width (`max-w-[1280px]` + side padding). The flat
bottom edge sits flush against the viewport bottom so the footer
reads as the page's actual end. Background is `--color-nooni-bg-warm`.

A true 2:1 semi-circle dome was prototyped here and rejected — too
theatrical, didn't match the rhythm of the rest of the page. The
pill shape keeps the footer cohesive with everything above.

### History

This component replaced two earlier elements:

- A homepage-only `Contact` section (eyebrow + "Kontakt" headline +
  intro + CTA inside an arch)
- A separate 4-column rectangular `Footer` (logo + brand blurb +
  product list + om-Nooni links + follow-us + ©) mounted under it

The two have merged into one site-wide arched footer. The 4-column
content was dropped wholesale — utility nav lives in the Navbar, the
brand blurb duplicated the Hero, and the contact/social links
already exist inside the arch.

The "two arches" Camilla originally sketched for the Contact section
were iteration (she drew a corrected arch on top of the first
attempt), not stacked design elements — so the build keeps a single
arch, which also matches every other arch on the site.

### Backlog (accepted minor flaws)

- On `/kontakt`, the "Skriv til os" CTA loops back to the page the
  visitor is already on, and the intro prompt duplicates copy that's
  already on that page. Hide both conditionally on that route next
  time the footer gets touched.

---

## Routes added during build-out

- `/produkter` — full product listing page. Fetches every published
  product from Shopify via `getAllProducts()` and renders them with
  the shared `<ProductCard />`. No sorting/filtering/pagination yet
  — revisit when the catalogue outgrows one round-trip
- `/kontakt` — dedicated contact form page. Posts to a `sendContactEmail`
  server action that emails `hej@nooni.dk` via Resend. Requires
  `RESEND_API_KEY` in env; setup is parked until the
  receiving-mailbox question is resolved (see open questions)

---

## Notes for implementation (Steffan + Claude)

- **Hero expand animation** — deferred. When picked up: CSS
  `grid-template-rows: 0fr → 1fr` trick for the height transition,
  framer-motion only if needed for the photo zoom. Pick one direction
  up front.
- **The "Find inspiration" image protruding outside the hero frame**
  — when the expand state is built, the parent must not clip
  overflow. No conflict with the current build since the side-outline
  treatment that worried this is gone.
- **Cart "basketball" animation** — flourish, prototype in a
  low-stakes branch before committing to the motion design. Have a
  scale-and-fade fallback ready.
- **Reviews source** — pick before building §4. Strong preference for
  Judge.me on Shopify (or Loox) over Trustpilot at this brand stage.
- **Blog backend** — currently markdown / hand-curated via
  `src/lib/blog.ts`. Re-evaluate if posting cadence grows.
- **Contact form sending** — Resend chosen and wired in code.
  `RESEND_API_KEY` env var needed on Vercel; sending domain needs
  Resend DNS verification on `nooni.dk` for a clean From address.
  Whoever sets it up should also confirm `hej@nooni.dk` is a real
  receiving mailbox (or set up Cloudflare Email Routing → personal
  inbox, for free).

---

## Open product questions

- **Hero photo** — `familie_1.jpg` is the placeholder. Replace with
  one of Camilla's new product shots when they land. Same 3:2 aspect
  is ideal so the frame doesn't need re-tuning.
- **"Mest populære" trio** — Loops / Emblem / Deks single is the
  current pick. Camilla's call on the final three; could also be
  driven by a Shopify collection / product tag if curation becomes
  ongoing work.
- **Blog cadence** — does Nooni want to commit to a posting rhythm?
  The teaser only reads well when "newest post" is recent.
- **Contact info** — currently email + Instagram. Add phone /
  physical address / opening hours when relevant.
- **Receiving mailbox at `hej@nooni.dk`** — needed for the contact
  form to be useful. Resend handles sending only.
