/**
 * ProductDescription — expandable product copy on the detail page.
 *
 * Shopify owns the raw HTML; the component just clamps the rendered
 * height to roughly thirteen lines on first render and reveals the
 * rest via a "Læs mere" toggle. A soft fade hints that there's more
 * text below the cut.
 *
 * The clamp uses max-height (not webkit-line-clamp) because the
 * description is a multi-paragraph block — line-clamp only works on
 * inline content inside a single -webkit-box.
 *
 * Pixel target derives from the body type used on the product page:
 *   text-lg (18 px) × leading-relaxed (1.625) ≈ 29 px per line.
 * Thirteen lines is therefore ~380 px; the 400 px constant adds a
 * touch of slack so the last visible line isn't half-cropped.
 *
 * If the description is shorter than the clamp on first mount, the
 * toggle button hides itself so we don't offer a "read more" with
 * nothing to read.
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface ProductDescriptionProps {
  html: string;
  className?: string;
}

const COLLAPSED_HEIGHT_PX = 300;

export default function ProductDescription({
  html,
  className = "",
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // After mount (and whenever the inner content changes size), check
  // whether the natural content height actually exceeds the clamp.
  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    setNeedsToggle(node.scrollHeight > COLLAPSED_HEIGHT_PX + 8);
  }, [html]);

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{
          maxHeight: expanded || !needsToggle
            ? "5000px"
            : `${COLLAPSED_HEIGHT_PX}px`,
        }}
      >
        <div
          ref={innerRef}
          className="[&>p:first-child]:text-nooni-headline [&>p:first-child]:text-2xl [&>p:first-child]:mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && needsToggle && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-nooni-bg to-transparent"
          />
        )}
      </div>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-5 inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
          aria-expanded={expanded}
        >
          {expanded ? "Skjul" : "Læs mere"}
        </button>
      )}
    </div>
  );
}
