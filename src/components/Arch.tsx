/**
 * Arch — renders one concentric-line boho arch in its own SVG.
 *
 * Geometry (direction='up' = upright arch, peak at top, legs going down):
 *
 *   - SVG box is `width` × `height`
 *   - Outer line has radius `maxR = width/2 - strokeWidth`
 *   - For each line `i` (0 = outermost):
 *       r       = maxR - i * gap
 *       sy      = peakOffset + r + i * gap    ← springline y-coordinate
 *       peak y  = sy - r = peakOffset + i*gap ← top of the arc
 *
 *     The vertical offset `i * gap` on sy is THE crucial detail that
 *     makes the arches read as a rainbow cascade. Without it all lines
 *     share one springline and visually "meet at a point in the middle".
 *
 *   - Path per line:
 *       Move to (left,  height)             ← bottom of left leg
 *       Line  to (left,  sy)                ← up the left leg
 *       Arc   to (right, sy) radius r       ← over the top
 *       Line  to (right, height)            ← down the right leg
 *
 * direction='down' is the vertical mirror: legs run from y=0 down to
 * the springline, then arc UNDER (sweep flag 0), then back up. Used
 * for the right-side inverted arch.
 *
 * Legs fade out via an SVG <mask> with a linear gradient so they
 * never end abruptly — they dissolve into the background.
 */

import * as React from "react";

export interface ArchProps {
  /** 'up' = upright (peak top, legs down); 'down' = inverted (peak bottom, legs up). */
  direction?: "up" | "down";
  /** SVG box width in pixels. */
  width?: number;
  /** SVG box height in pixels — controls how far the legs reach. */
  height?: number;
  /** Number of concentric arch lines. 6 is the canonical Nooni value. */
  lines?: number;
  /** Horizontal AND vertical inset between consecutive lines. */
  gap?: number;
  /** Distance from the frame edge to the outermost line's peak. */
  peakOffset?: number;
  /** Stroke colour. */
  stroke?: string;
  /** Stroke width in pixels. 3 is the canonical Nooni value (anything thinner gets erased by the .glass blur). */
  strokeWidth?: number;
  /** Fraction of the leg length at which the fade-out starts (0..1). */
  fadeFrom?: number;
  /** REQUIRED — unique id for this arch's <mask>; lets multiple arches coexist on a page. */
  maskId: string;
  /** Pass-through style — absolute positioning, transforms, etc. */
  style?: React.CSSProperties;
  /** Pass-through className. */
  className?: string;
}

export default function Arch({
  direction = "up",
  width = 620,
  height = 760,
  lines = 6,
  gap = 42,
  peakOffset = 220,
  stroke = "var(--color-nooni-arch)",
  strokeWidth = 3,
  fadeFrom = 0.4,
  maskId,
  style,
  className,
}: ArchProps) {
  const cx = width / 2;
  const maxR = width / 2 - strokeWidth;
  const paths: string[] = [];

  for (let i = 0; i < lines; i++) {
    const r = Math.max(10, maxR - i * gap);
    const left = cx - r;
    const right = cx + r;

    if (direction === "up") {
      const sy = peakOffset + r + i * gap;
      paths.push(
        `M ${left} ${height} L ${left} ${sy} A ${r} ${r} 0 0 1 ${right} ${sy} L ${right} ${height}`,
      );
    } else {
      const sy = height - peakOffset - r - i * gap;
      paths.push(
        `M ${left} 0 L ${left} ${sy} A ${r} ${r} 0 0 0 ${right} ${sy} L ${right} 0`,
      );
    }
  }

  const fadeStart = `${(fadeFrom * 100).toFixed(0)}%`;
  const fadeEnd = `${(100 - fadeFrom * 100).toFixed(0)}%`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{
        position: "absolute",
        pointerEvents: "none",
        overflow: "visible",
        ...style,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${maskId}-grad`} x1="0" y1="0" x2="0" y2="1">
          {direction === "up" ? (
            <>
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset={fadeStart} stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset={fadeEnd} stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </>
          )}
        </linearGradient>
        <mask id={maskId}>
          <rect width={width} height={height} fill={`url(#${maskId}-grad)`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="square"
          />
        ))}
      </g>
    </svg>
  );
}
