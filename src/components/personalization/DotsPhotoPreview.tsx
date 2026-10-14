"use client";

/**
 * DotsPhotoPreview — a real photo of a Dots med navn on a zipper, with
 * the customer's colours and name painted onto the tag live.
 *
 * The photo (public/images/dots-anne-jakke.jpg, 2400 × 1600) is a wide
 * shot of a jacket with a white Dots ("Anne" in pink) on the zipper. It
 * fills whatever box it is given, like object-fit: cover, anchored on
 * the tag so the tag stays in view at any width. An SVG laid exactly
 * over the photo repaints the tag in the chosen main colour, writes the
 * chosen name in Fredoka Bold in the secondary colour, and adds a soft
 * highlight and edge shade so the tag keeps the look of printed
 * plastic.
 *
 * While designing (`active`), the photo zooms in on the tag and the
 * overlay shows; at rest the bare photo is shown.
 *
 * Cover layout is computed in JS (not object-fit) so photo, overlay and
 * zoom origin share one set of numbers. Until the box is measured, the
 * photo falls back to plain object-cover on the same anchor.
 *
 * TAG geometry is measured on the photo in its own pixels. A new photo
 * needs new numbers here: the tag's bounding box and corner radius.
 *
 * Sample photo: an old jacket with a licensed cartoon print and a
 * visible clothing brand label. Swap it for a photo on plain fabric
 * before launch.
 */

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ColorOption } from "@/lib/shopify/personalization";
import { resolveColor } from "@/components/personalization/ProductPreview";

export const DOTS_PHOTO = {
  src: "/images/dots-anne-jakke.jpg",
  alt: "Dots med navn i hvid og lyserød på lynlåsen af en børnejakke",
  width: 2400,
  height: 1600,
} as const;

/** The tag on the photo, in photo pixels. */
const TAG = { x: 1504, y: 883, width: 188, height: 64, radius: 32 } as const;
const TAG_CX = TAG.x + TAG.width / 2;
const TAG_CY = TAG.y + TAG.height / 2;

/** What the photo shows before any choice: white tag, pink "Anne". */
const PHOTO_MAIN_HEX = "#F7F6F2";
const PHOTO_SECONDARY_HEX = "#E9837F";
const PHOTO_NAME = "Anne";

/** Room for the name along the tag, and the tallest the letters may get. */
const TEXT_BUDGET = TAG.width * 0.8;
const MAX_FONT_SIZE = TAG.height * 0.95;

interface Box {
  width: number;
  height: number;
}

interface DotsPhotoPreviewProps {
  values: Record<string, string>;
  colors?: readonly ColorOption[];
  /** Zoom in and paint the overlay. False shows the bare photo. */
  active: boolean;
  priority?: boolean;
  sizes?: string;
}

/** Where the zoomed tag lands, as a fraction of the box. In a wide box
 *  the left side holds the form, so the tag moves into the right side. */
const WIDE_BOX_RATIO = 1.2;
const ZOOM_TARGET = {
  wide: { x: 0.76, y: 0.5, tagWidth: 0.28 },
  narrow: { x: 0.5, y: 0.5, tagWidth: 0.62 },
} as const;
const MAX_ZOOM = 4.5;

/** Slow start, long soft landing: reads as a camera move, not a jump. */
const ZOOM_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const ZOOM_MS = 1400;

export default function DotsPhotoPreview({
  values,
  colors = [],
  active,
  priority = false,
  sizes,
}: DotsPhotoPreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mainHex = resolveColor(colors, values.main_color, PHOTO_MAIN_HEX);
  const secondaryHex = resolveColor(colors, values.secondary_color, PHOTO_SECONDARY_HEX);
  const name = values.name?.trim() || PHOTO_NAME;
  // 0.6 ≈ average glyph width of Fredoka Bold, in ems.
  const fontSize = Math.min(MAX_FONT_SIZE, TEXT_BUDGET / (name.length * 0.6));

  // Cover the box, then shift the photo so the tag sits as close to the
  // box centre as the photo's edges allow.
  const anchorX = TAG_CX / DOTS_PHOTO.width;
  const anchorY = TAG_CY / DOTS_PHOTO.height;
  let layer: React.CSSProperties | null = null;
  // Zoomed state as translate + scale from the top-left corner, so the
  // move and the zoom animate together along one smooth path.
  let zoomTransform = "translate(0px, 0px) scale(1)";
  if (box && box.width > 0 && box.height > 0) {
    const scale = Math.max(box.width / DOTS_PHOTO.width, box.height / DOTS_PHOTO.height);
    const w = DOTS_PHOTO.width * scale;
    const h = DOTS_PHOTO.height * scale;
    const left = clamp(box.width / 2 - TAG_CX * scale, box.width - w, 0);
    const top = clamp(box.height / 2 - TAG_CY * scale, box.height - h, 0);
    layer = { position: "absolute", left, top, width: w, height: h };

    const target = box.width / box.height > WIDE_BOX_RATIO ? ZOOM_TARGET.wide : ZOOM_TARGET.narrow;
    const zoom = clamp((target.tagWidth * box.width) / (TAG.width * scale), 1, MAX_ZOOM);
    const tagX = left + TAG_CX * scale;
    const tagY = top + TAG_CY * scale;
    // Move the tag to its target, but never so far that the photo's edge
    // comes into view.
    const tx = clamp(target.x * box.width - zoom * tagX, box.width - zoom * (left + w), -zoom * left);
    const ty = clamp(target.y * box.height - zoom * tagY, box.height - zoom * (top + h), -zoom * top);
    if (active) zoomTransform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
  }

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 motion-reduce:!transition-none"
        style={{
          transform: zoomTransform,
          transformOrigin: "0 0",
          transition: `transform ${ZOOM_MS}ms ${ZOOM_EASING}`,
          willChange: "transform",
        }}
      >
        <div style={layer ?? { position: "absolute", inset: 0 }}>
          <Image
            src={DOTS_PHOTO.src}
            alt={DOTS_PHOTO.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={layer ? undefined : { objectPosition: `${anchorX * 100}% ${anchorY * 100}%` }}
          />

          {layer && (
            <svg
              viewBox={`0 0 ${DOTS_PHOTO.width} ${DOTS_PHOTO.height}`}
              // Paint the new colours once the camera has nearly arrived;
              // drop them at once when zooming back out.
              className={`absolute inset-0 h-full w-full transition-opacity ${
                active ? "opacity-100 delay-[900ms] duration-500" : "opacity-0 duration-200"
              }`}
              role={active ? "img" : undefined}
              aria-label={active ? `Din Dots med navnet ${name}` : undefined}
              aria-hidden={active ? undefined : true}
            >
              <defs>
                <clipPath id="dots-photo-tag">
                  <rect x={TAG.x} y={TAG.y} width={TAG.width} height={TAG.height} rx={TAG.radius} />
                </clipPath>
                {/* Light from the top, like the photo. */}
                <linearGradient id="dots-photo-light" x1="0" y1="0" x2="0.25" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
                  <stop offset="1" stopColor="#000" stopOpacity="0.16" />
                </linearGradient>
                <filter id="dots-photo-emboss" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.45" floodColor="#000" floodOpacity="0.28" />
                </filter>
              </defs>

              <g clipPath="url(#dots-photo-tag)">
                <rect x={TAG.x} y={TAG.y} width={TAG.width} height={TAG.height} fill={mainHex} />
                <text
                  x={TAG_CX}
                  y={TAG_CY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={secondaryHex}
                  fontSize={fontSize}
                  fontWeight="bold"
                  style={{ fontFamily: "var(--font-display)" }}
                  filter="url(#dots-photo-emboss)"
                >
                  {name}
                </text>
                <rect
                  x={TAG.x}
                  y={TAG.y}
                  width={TAG.width}
                  height={TAG.height}
                  fill="url(#dots-photo-light)"
                  style={{ mixBlendMode: "soft-light" }}
                />
              </g>

              {/* Edge, so the tag reads as a solid object on the fabric. */}
              <rect
                x={TAG.x + 0.5}
                y={TAG.y + 0.5}
                width={TAG.width - 1}
                height={TAG.height - 1}
                rx={TAG.radius - 0.5}
                fill="none"
                stroke="#000"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
