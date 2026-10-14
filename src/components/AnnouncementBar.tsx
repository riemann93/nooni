/**
 * AnnouncementBar: slim USP strip above the navbar. Scrolls away with
 * the page. The navbar below is the sticky element.
 */

import { STORE_FACTS } from "@/lib/store-facts";

export default function AnnouncementBar() {
  return (
    <div className="bg-nooni-bg-warm text-center text-[12px] leading-tight text-nooni-ink-soft md:text-[13px]">
      <ul className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2">
        <li>{STORE_FACTS.madeIn}</li>
        <li>{STORE_FACTS.shippingPrice}</li>
        <li className="hidden sm:block">{STORE_FACTS.delivery}</li>
      </ul>
    </div>
  );
}
