/**
 * Motif SVGs — small inline-rendered shapes used inside <ProductPreview />.
 *
 * Each motif is a React component that takes a colour and returns SVG
 * children sized to a 100x100 viewBox and roughly centred on (50, 50).
 * The parent (<ProductPreview />) draws the surrounding circle in the
 * main colour; these draw the motif on top in the secondary colour.
 *
 * Keep these simple. They're placeholder renderings for the live
 * preview, not final brand artwork — Camilla will hand-design proper
 * motif assets in a later iteration. The keys here MUST match the
 * motif `value` strings in src/lib/shopify/personalization.ts.
 */

import type { ReactNode } from "react";

interface MotifProps {
  color: string;
}

export const MOTIF_SVGS: Record<string, (props: MotifProps) => ReactNode> = {
  lemon: ({ color }) => (
    <g fill={color}>
      {/* Lemon body — softly pointed ellipse */}
      <path d="M50 30 C60 32 65 42 65 52 C65 64 58 73 50 73 C42 73 35 64 35 52 C35 42 40 32 50 30 Z" />
      {/* Leaf */}
      <path d="M50 28 Q57 22 60 28 Q55 30 50 28 Z" />
    </g>
  ),

  cherry: ({ color }) => (
    <g fill={color}>
      <circle cx="40" cy="60" r="11" />
      <circle cx="60" cy="60" r="11" />
      <path
        d="M40 49 Q45 36 50 30 Q55 36 60 49"
        stroke={color}
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tiny leaf at the join */}
      <path d="M50 28 Q58 24 60 30 Q54 30 50 28 Z" />
    </g>
  ),

  car: ({ color }) => (
    <g fill={color}>
      {/* Roof + body, single silhouette */}
      <path d="M28 56 L35 44 L65 44 L72 56 L76 56 L76 64 L24 64 L24 56 Z" />
      {/* Wheels */}
      <circle cx="35" cy="66" r="5" />
      <circle cx="65" cy="66" r="5" />
    </g>
  ),

  smiley: ({ color }) => (
    <g>
      <circle cx="42" cy="45" r="3" fill={color} />
      <circle cx="58" cy="45" r="3" fill={color} />
      <path
        d="M40 58 Q50 66 60 58"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
};

/** Returns true if we have a renderer for this motif value. */
export function hasMotifRenderer(motif: string): boolean {
  return motif in MOTIF_SVGS;
}
