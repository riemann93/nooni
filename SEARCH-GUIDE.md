# Search presence guide

The short rulebook for anything that touches how Nooni is found: blog
posts, product pages, new pages, links. Read this before working on
search. Open work is tracked as GitHub Issues; the content plan and
keyword choices are kept with Camilla.

## The goal and the route

- **End goal:** #1 on Google for "navnemærker".
- **Route:** win specific long-tail searches first ("navnemærke til
  lynlås", "navnemærker der tåler maskinvask"), then point everything at
  the hub page `/navnemaerker`.
- **Also:** be the shop ChatGPT, Claude and Perplexity recommend for
  navnemærker in Denmark. They read the same pages Google does, plus
  `/llms.txt`.

## E-E-A-T in practice

Google judges a shop by Experience, Expertise, Authoritativeness and
Trust. What that means for Nooni:

| | What it means | What we do |
|---|---|---|
| **Experience** | We have actually used the thing | Our own photos, real tests (washing, wear), videos of mounting |
| **Expertise** | The writer knows the subject | Camilla: trained teacher, mum of two. Author box on every post |
| **Authority** | Others vouch for us | Links from press, parenting accounts, institutions, gift guides |
| **Trust** | We're a real, safe shop | Reviews, policies, CVR, address, contact (all but reviews done) |

Never claim what we haven't tested. A product claim ("tåler
maskinvask") needs a test behind it, and the test is the content.

## Writing a blog post

Every post answers **one question a parent types into Google**.

Before writing:
- [ ] Pick a keyword agreed with Camilla (or a new one seen in Search
      Console). Check no other page targets it.
- [ ] Search it on google.dk. What do the top results cover? Ours must
      cover more, or better, or from real experience.

The post:
- [ ] Title contains the keyword, reads like a human wrote it, under
      about 60 characters.
- [ ] Excerpt (used as the meta description) is 120 to 155 characters
      and makes someone want to click.
- [ ] First paragraph answers the question directly. Detail after.
- [ ] Written by Camilla in first person, from her own experience.
- [ ] Own photos. Image filenames and alt text describe the image.
- [ ] `###` subheadings that match the sub-questions people ask.
- [ ] Links to the matching product page and to `/navnemaerker`.
- [ ] Checklists, steps and comparisons beat long stories for search.

After publishing:
- [ ] Request indexing for the URL in Search Console.
- [ ] Share on Instagram with a link.
- [ ] Link to it from older related posts.

Cadence: **one good post a month** beats four thin ones. No generic AI
text; it ranks badly and readers notice.

Posts live in `content/posts/*.md` with `title`, `excerpt`, `date` and
`image` frontmatter. Metadata, BlogPosting schema, sitemap and
`/llms.txt` update by themselves.

## Product pages

Shopify owns the text, so most of this is done in Shopify Admin.

- [ ] Title says what it is: "Dots - Navnemærke til lynlås", not only
      "Dots".
- [ ] Handle (URL) is readable and matches the title. Never leave
      Shopify's `uden-titel-...` default.
- [ ] Description opens with one sentence on what it is and who it's
      for, then the benefits, then the facts: material, size, how to
      mount, washing, age.
- [ ] Every image has alt text.
- [ ] Product schema (price, stock, shipping, returns) is automatic. If
      shipping or return terms change, update `src/lib/seo.ts`.

## New pages

- [ ] `metadata` with `title`, `description` and
      `alternates: { canonical: "/the-path" }`. Never put a canonical
      in the root layout.
- [ ] Exactly one `<h1>`, containing the page's keyword.
- [ ] Add the path to `src/app/sitemap.ts` (products and posts are
      automatic).
- [ ] If it matters for AI assistants, add it to `src/app/llms.txt`.
- [ ] Link to it from somewhere: navbar, footer, or a relevant page.

## Links and mentions

Links from other sites are the single biggest lever for the head term.
Good sources, roughly in order of effort:

1. Google Business Profile, Krak, De Gule Sider, Trustpilot.
2. Market and fair pages where Nooni has a stand.
3. Danish parenting Instagram accounts and blogs (free set for an
   honest review with a link).
4. Gift guides before skolestart (pitch in spring) and Christmas (pitch
   in early autumn).
5. Local press: a mum in Borris who 3D-prints name tags is a story.
6. Institutions that use Dots and link to them for parents.

Never buy links or swap links in bulk. Google penalises it.

## Monthly routine (30 minutes)

In Google Search Console:
1. **Performance → Queries:** which searches are climbing? Note
   positions for the keyword map.
2. **High impressions, low clicks:** rewrite that page's title and
   description.
3. **New questions** people find us for: candidates for the next post.
4. **Pages → Not indexed:** fix anything that should be indexed.

Then pick next month's post.

## Don'ts

- Don't create two pages for the same keyword. They compete.
- Don't hide text or stuff keywords. Write for parents.
- Don't change a URL without a redirect.
- Don't claim what isn't tested or true.
- Don't block crawlers in `robots.ts` unless hiding the whole site on
  purpose.
