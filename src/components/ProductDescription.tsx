/**
 * ProductDescription — expandable product copy on the detail page.
 *
 * Shopify owns the raw HTML; we just split it around a "Det vigtigste:"
 * fold so the customer sees the intro + that marker line on first
 * render, and reveals the rest by clicking "Læs mere". If the marker
 * isn't present, falls back to rendering the whole description.
 *
 * The split is done by paragraph boundary (</p>) so we never cut a tag
 * in half. The marker is expected to live inside its own paragraph;
 * everything below that paragraph becomes the collapsible part.
 *
 * Smooth expand uses the grid-template-rows 0fr→1fr trick so we get a
 * real CSS height transition without measuring scrollHeight.
 */

"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  html: string;
  className?: string;
}

const MARKER_REGEX = /Det\s+vigtigste/i;

export default function ProductDescription({
  html,
  className = "",
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const { visibleHtml, hiddenHtml } = splitOnFoldMarker(html);

  if (!hiddenHtml) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: visibleHtml }}
      />
    );
  }

  return (
    <div className={className}>
      <div dangerouslySetInnerHTML={{ __html: visibleHtml }} />

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden">
          <div
            className="pt-2"
            dangerouslySetInnerHTML={{ __html: hiddenHtml }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-5 inline-flex items-center gap-2 text-sm text-nooni-sub transition-colors hover:text-nooni-headline"
        aria-expanded={expanded}
      >
        {expanded ? "Skjul" : "Læs mere"}
        <span
          aria-hidden
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
    </div>
  );
}

/**
 * Split the HTML at the paragraph that contains "Det vigtigste".
 * Returns `{ visibleHtml, hiddenHtml }` — `hiddenHtml` is undefined if
 * the marker isn't found (or sits in the very last paragraph, in which
 * case there's nothing to hide).
 */
function splitOnFoldMarker(html: string): {
  visibleHtml: string;
  hiddenHtml?: string;
} {
  const parts = html.split(/<\/p>/i);
  let cutoff = -1;
  for (let i = 0; i < parts.length; i++) {
    if (MARKER_REGEX.test(parts[i])) {
      cutoff = i;
      break;
    }
  }
  if (cutoff === -1 || cutoff >= parts.length - 1) {
    return { visibleHtml: html };
  }
  const visible = parts.slice(0, cutoff + 1).join("</p>") + "</p>";
  const hidden = parts.slice(cutoff + 1).join("</p>");
  return { visibleHtml: visible, hiddenHtml: hidden };
}
