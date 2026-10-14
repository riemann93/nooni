# SEO and discoverability

How nooni.dk gets found on Google and in AI assistants (ChatGPT, Claude,
Perplexity, Gemini): the goals, what is already in place, and the open
issues.

## Goals

1. **#1 on Google for "Nooni".** Should follow soon after the basics
   below are live and Google has recrawled the site.
2. **#1 on Google for "Navnemærker".** The end goal. It is a competitive
   term with established shops, so we get there by first winning the
   long tail: searches like "navnemærker til lynlås", "navnemærker til
   børnetøj", "navnemærker til institution", "navnemærker uden strygning".
   Each won long-tail search builds the authority that the head term needs.
3. **Recommended by AI assistants** when someone asks for navnemærker or
   personal children's products in Denmark.

The content, E-E-A-T and link-building plan for these goals is in
`CONTENT-PLAN.md`.

## In place

Shipped on the `Discoverability` branch:

- Favicon, Apple touch icon and default share card, generated from the
  wordmark (`src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`).
- Titles and meta descriptions on every page, with "navnemærker" on the
  homepage and product listing.
- A canonical URL on every page, set per page (never in the root layout,
  where every page would inherit it).
- schema.org JSON-LD (`src/lib/seo.ts`): OnlineStore and WebSite
  site-wide; Product with Offer, shipping, return policy and
  BreadcrumbList on product pages; BlogPosting on blog posts.
- `sitemap.xml` built from Shopify, so new products appear on their own.
- `robots.txt` allows every crawler, AI crawlers included.
- `/llms.txt`: a plain summary of the shop for AI assistants, built from
  the live catalogue.
- Store policies on nooni.dk, linked from the footer with CVR, address,
  shipping and payment methods.
- `/llms-full.txt`: every product, policy and blog post in full.
- `robots.txt` names the AI crawlers (GPTBot, ClaudeBot, PerplexityBot
  and others) explicitly.
- IndexNow key (`public/<key>.txt`) and `npm run seo:indexnow`, which
  pushes every sitemap URL to Bing after a deploy.
- `pageMetadata()` in `src/lib/seo.ts` gives every page a canonical,
  og:url, site name, locale and share image. Use it for new pages.
- Sitemap only sends real dates (blog posts), never "now".
- Web app manifest, theme colour, branded 404, skip link ("Spring til
  indhold"), global keyboard focus ring and reduced-motion support.
- Security headers (nosniff, Referrer-Policy, X-Frame-Options,
  Permissions-Policy), AVIF images, cache headers on `/images`.

## Lighthouse

Mobile, run 2026-10-14 against a local production build.

| | Live site before | After this work |
|---|---|---|
| Performance (home) | 73 | 83 to 84 |
| Accessibility | 92 | 96 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Homepage weight | 13.8 MB | 2 MB |

After the webshop rebuild (same day, mobile, local production build,
performance / accessibility / best practices / SEO):

| Page | Scores |
|---|---|
| `/` | 88 / 96 / 100 / 100 |
| `/navnemaerker` | 88 / 96 / 100 / 100 |
| `/produkter` | 86 / 96 / 100 / 100 |
| `/produkter/dots-med-navn-3stk` | 89 / 97 / 100 / 100 |

Rich Results Test (code input): the product page passes Product
snippets, Merchant listings and Breadcrumbs, with only "review" and
"aggregateRating" missing (on purpose until reviews are real).
`/navnemaerker` passes Breadcrumbs. Its FAQPage is valid schema but
Google only shows FAQ rich results for government and health sites, so
it helps AI assistants rather than snippets.

What made the difference: the blog teaser video was a 13 MB HEVC file
(which Chrome often can't play) and is now a 1.4 MB H.264 file with a
poster. The photos in `public/images` were up to 12 MB each and are now
resized to at most 2400 px. A below-the-fold photo was preloaded and
competed with the hero. The closed cart drawer trapped keyboard focus.

Remaining Lighthouse items are below as issues 6 and 7.

## Open issues

### 1. The homepage never says "navnemærker" (fixed)

Fixed on the `Morten` branch: the hero holds the only H1 ("Personlige
navnemærker til børn"), the first product row is the name-tag family,
and a short text section about navnemærker links to `/navnemaerker`.

Original issue:

The homepage's only H1 is "Deks" (the card holder in the hero), and the
word "navnemærker" appears nowhere in the visible text. Google ranks a
page for words it actually shows, so the homepage cannot rank for
"navnemærker" today.

Fix:
- Give the homepage one H1 about Nooni and navnemærker, e.g. "Personlige
  navnemærker til børn". The hero can still feature Deks, as an H2.
- Add a short text section (a few paragraphs) about Nooni's navnemærker:
  what they are, what they fit on (lynlås, jakke, taske), why they don't
  get lost in the institution.
- Build long-tail content: product pages with fuller descriptions and
  blog posts answering real questions ("Hvordan mærker man børnetøj?",
  "Navnemærker til vuggestue: hvad skal mærkes?"). Link each one to the
  matching product.

### 2. www.nooni.dk does not exist

`www.nooni.dk` has no DNS record, so anyone who types "www" gets an
error, and links to the www address are lost.

Fix: add `www.nooni.dk` as a domain on the Vercel project and set it to
**redirect (308) to `nooni.dk`**. nooni.dk (no www) is the canonical
host. Then add the DNS record Vercel asks for at the domain registrar.

### 3. Search Console and Bing are not set up with the sitemap

Once the `Discoverability` work is on production:

- **Google Search Console** (the site is already verified via the meta
  tag in `layout.tsx`): submit `https://nooni.dk/sitemap.xml`, then use
  URL Inspection → "Request indexing" on the homepage and the product
  pages.
- **Bing Webmaster Tools**: add the site (it can import from Google
  Search Console) and submit the same sitemap. ChatGPT search and
  Copilot use Bing's index, so this matters for the AI goal too.
- Check the product pages in the
  [Rich Results Test](https://search.google.com/test/rich-results) to
  confirm the product schema is accepted.

### 4. Shopify product data needs cleaning up

These are edits in Shopify Admin, not code:

- The product with handle `emblem` is titled **"Loops - Navn"**. Either
  the handle or the title is wrong. The URL should describe the product.
- **"Pose til haps"** has the handle `uden-titel-17-jun-_10-36-17`
  (Shopify's "untitled" default) and no description. Give it a proper
  handle such as `pose-til-haps` and a description.
- Several descriptions lose the full stop between the heading line and
  the body ("...overtøjet Slut med forbyttede jakker..."). This shows up
  in Google's snippet.
- Add alt text to product images in Shopify. It is used as the image
  description for Google Images.

After changing a handle, update any hardcoded references in the code
(`src/components/ProductsGrid.tsx`, `src/lib/product-meta.ts`,
`src/components/Hero.tsx`).

### 5. Policy email in Shopify still says Gmail

The store policies (terms, shipping, returns, privacy) now render on
nooni.dk at `/handelsbetingelser`, `/levering`, `/returnering` and
`/privatlivspolitik`, linked from the footer. The footer also shows CVR,
shipping and payment methods.

Still open: the policy text in Shopify gives **hej.nooni@gmail.com** as
the contact address. nooni.dk swaps it for **hej@nooni.dk** when it
renders the policies (`src/lib/shopify/policies.ts`), but Shopify's own
checkout pages still show the Gmail address.

Fix: in Shopify Admin → Settings → Policies, replace hej.nooni@gmail.com
with hej@nooni.dk in every policy. Then the swap in `policies.ts` can go.

The shipping and return details in the product schema
(`SHIPPING_DETAILS`, `RETURN_POLICY` in `src/lib/seo.ts`) and the footer
line are copied from these policies: 55 kr. flat rate, Denmark only, 1
to 2 days production, 1 to 3 days delivery, 14 day returns paid by the
customer. Update them when the policies change.

### 6. Brand colours fail text contrast

Lighthouse's only remaining accessibility failure. Measured against the
cream backgrounds:

- White text on rose `#B48383` buttons (Kurv, Køb nu, Skriv til os):
  3.2:1. Needs 4.5:1 for normal text.
- Green `#678061` labels and outline buttons on `#F7EFE5`: 3.8:1.
- Rose `#B48383` italic accent words on `#F7EFE5`: 2.8:1. Large text
  needs 3:1.

Done (2026-10-14, pending brand sign-off): `--color-nooni-headline` is now
`#8F5F5F` and `--color-nooni-sub` is `#56704F` in `src/app/globals.css`.
Both pass 4.5:1 on white, `#FFFCF7` and `#F7EFE5` (rose 5.3, 5.2, 4.6;
green 5.5, 5.4, 4.8). The original `#B48383` lives on as
`--color-nooni-rose`, used only by the wordmark in `Logo.tsx`. Product
colour swatches and OG images keep the original hexes. To undo, put the
two old values back in `globals.css`.

### 7. Mobile LCP is still around 4.5 seconds in the lab

The hero image now loads first, but most of the time is "render delay":
the browser waiting for CSS and three web fonts (Fredoka in 4 weights,
Inter variable with italics, Cormorant in 4 styles) on a throttled
connection. Ideas, in order of payoff:

- Load only the font weights actually used (Fredoka is probably only
  700 for the logo).
- Turn on Vercel Speed Insights to see real visitors' numbers. Lab
  scores are pessimistic, and Google ranks on field data.

### 8. Search tooling for later

Patterns from exit1, day3 and sanktknuds worth copying when there is
traffic to analyse:

- Search Console and GA4 report script (`scripts/seo/pull-seo.mjs` in
  those repos): striking-distance queries, brand vs non-brand.
- FAQPage schema once the `/navnemaerker` hub has an FAQ.
- Visible breadcrumbs on product pages (the schema already has them).
- Bing Webmaster verification (`BingSiteAuth.xml`, as horadric does) if
  importing from Search Console doesn't work.
