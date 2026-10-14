/**
 * /navnemaerker: the name-tag category page and the page built to rank
 * for "navnemærker" (CONTENT-PLAN.md, Phase 1).
 *
 * Above the fold: H1, intro, rating and the name-tag grid, so a parent
 * who came to buy can start right away. Below: what fits where, a short
 * guide, the FAQ and related posts, so the page is also the best answer
 * for someone who came to learn. Copy lives in src/lib/navnemaerker.ts.
 *
 * Ratings come from src/lib/social-proof.ts, which is placeholder data.
 * They are shown but never put in the JSON-LD.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { getPublishedPosts } from "@/lib/blog";
import { FAQ, FIT_ROWS, GUIDE, HUB_INTRO, HUB_PATH, NAME_TAGS } from "@/lib/navnemaerker";
import { hubJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { getProductsByHandles } from "@/lib/shopify/products";
import { getProductRating, OVERALL_RATING } from "@/lib/social-proof";

export const revalidate = 60;

const TITLE = "Navnemærker til børn";
const DESCRIPTION =
  "Personlige navnemærker til lynlås, hue, vanter og taske. Med navn eller symbol, så børn kan kende deres ting. Designet og 3D-printet i Vestjylland.";

export const metadata: Metadata = pageMetadata({
  title: "Navnemærker til børn: til lynlås, hue og taske",
  description: DESCRIPTION,
  path: HUB_PATH,
});

const EYEBROW =
  "inline-flex items-center gap-3 uppercase tracking-[0.22em] text-nooni-sub font-medium before:h-px before:w-7 before:bg-nooni-sub";

/**
 * Anchors the footer links to (/navnemaerker#loops, #dots, #emblem).
 * Handle "emblem" is the product titled "Loops - Navn" until a real
 * Emblem product exists in Shopify.
 */
const ANCHORS: Record<string, string> = {
  loops: "loops",
  "dots-med-navn-3stk": "dots",
  emblem: "emblem",
};

function Check({ yes, label }: { yes: boolean; label: string }) {
  return yes ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-nooni-cool text-nooni-ink">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      <span className="sr-only">{label} passer</span>
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center text-nooni-arch">
      <span aria-hidden="true">–</span>
      <span className="sr-only">{label} passer ikke</span>
    </span>
  );
}

export default async function NavnemaerkerPage() {
  // A Shopify outage shows the guide and FAQ without the grid, not an error page.
  const products = await getProductsByHandles(NAME_TAGS.map((t) => t.handle)).catch(() => []);
  const taglines = Object.fromEntries(NAME_TAGS.map((t) => [t.handle, t.tagline]));
  const posts = getPublishedPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            hubJsonLd({ path: HUB_PATH, title: TITLE, description: DESCRIPTION, products, faq: FAQ }),
          ),
        }}
      />

      {/* Intro and products */}
      <section className="bg-nooni-bg pt-2 pb-6 md:py-[45px]" data-screen-label="Navnemærker">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          <div className="rounded-[2rem] bg-nooni-bg-warm px-5 py-6 md:px-12 md:py-12">
            <nav aria-label="Brødkrumme" className="text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-label)" }}>
              <Link href="/" className="hover:text-nooni-headline">Forside</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">Navnemærker</span>
            </nav>

            <div className="mt-3 max-w-3xl md:mt-6">
              <h1
                className="font-editorial leading-[1.05] tracking-tight text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-heading-lg)" }}
              >
                Navnemærker til <em className="italic text-nooni-headline">børn</em>
              </h1>
              <p
                className="mt-3 font-editorial leading-[1.55] text-nooni-ink-soft md:mt-5"
                style={{ fontSize: "var(--nooni-text-body)" }}
              >
                {HUB_INTRO}
              </p>
              <Stars
                rating={OVERALL_RATING.rating}
                count={OVERALL_RATING.count}
                className="mt-3 md:mt-5"
              />
            </div>

            {/* Cards use h3 titles; this keeps the heading order h1 > h2 > h3. */}
            {products.length > 0 && <h2 className="sr-only">Vælg dit navnemærke</h2>}
            {products.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-10 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
                {products.map((product, i) => {
                  const rating = getProductRating(product.handle);
                  return (
                    <li
                      key={product.handle}
                      id={ANCHORS[product.handle]}
                      className="flex scroll-mt-28 flex-col gap-2"
                    >
                      <ProductCard
                        product={product}
                        tagline={taglines[product.handle]}
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        eager={i < 2}
                      />
                      {rating && (
                        <Stars rating={rating.rating} count={rating.count} size={13} className="justify-center" />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* What fits where */}
      <section className="bg-nooni-bg py-6 md:py-[45px]" aria-labelledby="hvad-passer-hvor">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          <div className="mx-auto max-w-4xl">
            <span className={EYEBROW} style={{ fontSize: "var(--nooni-text-label)" }}>Sammenlign</span>
            <h2
              id="hvad-passer-hvor"
              className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              Hvilket navnemærke passer <em className="italic text-nooni-headline">hvor?</em>
            </h2>
            <p className="mt-4 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-body)" }}>
              Dots med navn sidder på lynlåsen på flyverdragten og overtøjet, og Dots med motiv er til
              børn, der ikke kan læse endnu. Loops hænger på tasken og nøglebundtet. Til tøj
              indvendigt skal du bruge noget andet, og det siger vi gerne ærligt.
            </p>

            <table className="mt-8 w-full border-collapse text-left" style={{ fontSize: "var(--nooni-text-body)" }}>
              <thead>
                <tr className="border-b border-nooni-line text-nooni-sub" style={{ fontSize: "var(--nooni-text-label)" }}>
                  <th scope="col" className="py-3 pr-3 font-medium uppercase tracking-[0.18em]">Hvor</th>
                  <th scope="col" className="w-16 py-3 text-center font-medium uppercase tracking-[0.18em] md:w-24">
                    <Link href="/produkter/dots-med-navn-3stk" className="hover:text-nooni-headline">Dots</Link>
                  </th>
                  <th scope="col" className="w-16 py-3 text-center font-medium uppercase tracking-[0.18em] md:w-24">
                    <Link href="/produkter/loops" className="hover:text-nooni-headline">Loops</Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {FIT_ROWS.map((row) => (
                  <tr key={row.place} className="border-b border-nooni-line-soft align-middle">
                    <th scope="row" className="py-4 pr-3 font-normal">
                      <span className="block font-medium text-nooni-ink">{row.place}</span>
                      <span className="mt-1 block text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                        {row.note}
                      </span>
                    </th>
                    <td className="py-4 text-center"><Check yes={row.dots} label="Dots" /></td>
                    <td className="py-4 text-center"><Check yes={row.loops} label="Loops" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guide */}
      <section className="bg-nooni-bg py-6 md:py-[45px]" aria-labelledby="guide">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          <div className="rounded-[2rem] bg-nooni-bg-warm px-5 py-8 md:px-12 md:py-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.7fr] md:gap-16">
              <div>
                <span className={EYEBROW} style={{ fontSize: "var(--nooni-text-label)" }}>Guide</span>
                <h2
                  id="guide"
                  className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                  style={{ fontSize: "var(--nooni-text-heading-md)" }}
                >
                  Sådan mærker du børnenes <em className="italic text-nooni-headline">ting</em>
                </h2>

                <div className="mt-8 space-y-9">
                  {GUIDE.map((section) => (
                    <div key={section.heading}>
                      <h3
                        className="font-editorial italic font-medium text-nooni-headline tracking-tight"
                        style={{ fontSize: "var(--nooni-text-heading-sm)" }}
                      >
                        {section.heading}
                      </h3>
                      <div
                        className="mt-3 space-y-3 font-editorial leading-[1.65] text-nooni-ink-soft"
                        style={{ fontSize: "var(--nooni-text-body)" }}
                      >
                        {section.paragraphs.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        {section.list && (
                          <ul className="space-y-1.5 pl-1">
                            {section.list.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-nooni-sub" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 md:pt-24">
                <figure>
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden"
                    style={{ borderRadius: "9999px 9999px 22px 22px" }}
                  >
                    <Image
                      src="/images/dots_name_lifestyle.jpg"
                      alt="Dots navnemærke med navnet Elvira, bundet i lynlåsen på en lille rygsæk"
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                    Dots med navn i lynlåsen på en rygsæk.
                  </figcaption>
                </figure>
                <figure className="hidden md:block">
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden"
                    style={{ borderRadius: "9999px 9999px 22px 22px" }}
                  >
                    <Image
                      src="/images/dots_motif_lifestyle.jpg"
                      alt="Dots navnemærke med blomstersymbol, bundet i lynlåsen på en rygsæk"
                      fill
                      sizes="30vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                    Dots med motiv, til børn der ikke kan læse endnu.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-nooni-bg py-6 md:py-[45px]" aria-labelledby="faq">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          <div className="mx-auto max-w-3xl">
            <span className={EYEBROW} style={{ fontSize: "var(--nooni-text-label)" }}>Spørgsmål og svar</span>
            <h2
              id="faq"
              className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
              style={{ fontSize: "var(--nooni-text-heading-md)" }}
            >
              Ofte stillede spørgsmål om <em className="italic text-nooni-headline">navnemærker</em>
            </h2>

            <div className="mt-8 border-t border-nooni-line">
              {FAQ.map((item) => (
                <details key={item.question} className="group border-b border-nooni-line">
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-nooni-ink [&::-webkit-details-marker]:hidden"
                    style={{ fontSize: "var(--nooni-text-body-lg)" }}
                  >
                    <h3 className="font-medium">{item.question}</h3>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-nooni-line text-nooni-sub transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="pb-6 pr-12 font-editorial leading-[1.65] text-nooni-ink-soft"
                    style={{ fontSize: "var(--nooni-text-body)" }}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {posts.length > 0 && (
        <section className="bg-nooni-bg py-6 md:py-[45px]" aria-labelledby="gode-raad">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <div className="mx-auto max-w-3xl">
              <span className={EYEBROW} style={{ fontSize: "var(--nooni-text-label)" }}>Gode råd</span>
              <h2
                id="gode-raad"
                className="mt-4 font-editorial leading-[1.1] tracking-tight text-nooni-ink"
                style={{ fontSize: "var(--nooni-text-heading-md)" }}
              >
                Læs mere fra <em className="italic text-nooni-headline">Camilla</em>
              </h2>
              <ul className="mt-8 space-y-4">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-center gap-4 rounded-[1.5rem] bg-nooni-bg-warm p-3 pr-5 transition-shadow hover:shadow-[0_18px_36px_-12px_rgba(180,131,131,0.28)]"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden" style={{ borderRadius: "9999px 9999px 14px 14px" }}>
                        <Image src={post.image} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-nooni-ink group-hover:text-nooni-headline" style={{ fontSize: "var(--nooni-text-body)" }}>
                          {post.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-nooni-ink-soft" style={{ fontSize: "var(--nooni-text-ui)" }}>
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
