/**
 * Shared layout for the four policy pages. Renders the Shopify policy
 * HTML in a readable column, styled with the site's editorial type.
 */

import { notFound } from "next/navigation";
import { getPolicy, type PolicyKind } from "@/lib/shopify/policies";

interface PolicyPageProps {
  kind: PolicyKind;
  title: string;
}

export default async function PolicyPage({ kind, title }: PolicyPageProps) {
  const policy = await getPolicy(kind);
  if (!policy) notFound();

  return (
    <section className="bg-nooni-bg py-[45px]" data-screen-label={title}>
      <div className="mx-auto max-w-[760px] px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-nooni-sub">
          Vilkår
        </p>
        <h1 className="mt-4 mb-10 font-editorial text-[clamp(36px,4.5vw,56px)] leading-[1.08] tracking-tight text-nooni-ink">
          {title}
        </h1>
        <div
          className="font-editorial text-lg leading-relaxed text-nooni-ink-soft [&_b]:text-nooni-ink [&_strong]:text-nooni-ink [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-nooni-ink [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_a]:text-nooni-headline [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      </div>
    </section>
  );
}
