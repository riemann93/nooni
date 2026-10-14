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

## Open issues

### 1. The homepage never says "navnemærker"

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

### 5. Store policies are not on nooni.dk, and their details disagree

The shipping, return, terms and privacy policies exist only as Shopify
checkout pages. nooni.dk has no link to them. Customers and Google both
look for these on the site itself.

- Add footer links to the policies (or pages on nooni.dk that show them).
- The policies give **hej.nooni@gmail.com** as the contact address. The
  site uses **hej@nooni.dk**. Pick one and use it everywhere.
- The return address is **Storegade 47, 6900 Skjern**. The site and the
  schema say the business is in **Borris**. If Skjern is the business
  address, update the address in `src/lib/seo.ts` (and add the street
  and postcode, which helps local search).
- The shipping and return details in the product schema
  (`SHIPPING_DETAILS`, `RETURN_POLICY` in `src/lib/seo.ts`) are copied
  from the Shopify policies: 55 kr. flat rate, Denmark only, 1 to 2 days
  production, 1 to 3 days delivery, 14 day returns paid by the customer.
  Update them when the policies change.
