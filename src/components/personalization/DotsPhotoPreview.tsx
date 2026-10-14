"use client";

/**
 * DotsPhotoPreview — a real photo of a Dots med navn on a zipper, with
 * the customer's colours and name painted onto the tag live.
 *
 * The photo (public/images/dots-anne-jakke.jpg, 1200 × 1500) shows a
 * white Dots with "Anne" in pink. An SVG laid exactly over the photo
 * (same viewBox, same cover crop) repaints the tag in the chosen main
 * colour, writes the chosen name in Fredoka Bold in the secondary
 * colour, and adds a soft highlight and edge shade so the tag keeps
 * the look of printed plastic.
 *
 * Until the visitor starts designing (`active` false), the photo is
 * shown untouched.
 *
 * TAG geometry is measured on the photo in its own pixels. A new photo
 * needs new numbers: the tag's bounding box, corner radius and the
 * rotation of the text (90 = reads top to bottom, as a tag hanging
 * from a zipper pull).
 *
 * Sample photo: an old jacket with a licensed cartoon print and a
 * visible clothing brand label. Swap it for a photo on plain fabric
 * before launch.
 */

import Image from "next/image";
import type { ColorOption } from "@/lib/shopify/personalization";
import { resolveColor } from "@/components/personalization/ProductPreview";

export const DOTS_PHOTO = {
  src: "/images/dots-anne-jakke.jpg",
  alt: "Dots med navn i hvid og lyserød på lynlåsen af en børnejakke",
  width: 1200,
  height: 1500,
} as const;

/** The tag on the photo, in photo pixels. */
const TAG = { x: 509, y: 792, width: 177, height: 491, radius: 88, textRotation: 90 } as const;

/** What the photo shows before any choice: white tag, pink "Anne". */
const PHOTO_MAIN_HEX = "#F7F6F2";
const PHOTO_SECONDARY_HEX = "#E9837F";
const PHOTO_NAME = "Anne";

/** Length of the text run the tag has room for, in photo pixels. */
const TEXT_BUDGET = TAG.height * 0.8;
const MAX_FONT_SIZE = 165;

interface DotsPhotoPreviewProps {
  values: Record<string, string>;
  colors?: readonly ColorOption[];
  /** Paint the overlay. False shows the bare photo. */
  active: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function DotsPhotoPreview({
  values,
  colors = [],
  active,
  priority = false,
  sizes,
}: DotsPhotoPreviewProps) {
  const mainHex = resolveColor(colors, values.main_color, PHOTO_MAIN_HEX);
  const secondaryHex = resolveColor(colors, values.secondary_color, PHOTO_SECONDARY_HEX);
  const name = values.name?.trim() || PHOTO_NAME;

  // 0.6 ≈ average glyph width of Fredoka Bold, in ems.
  const fontSize = Math.min(MAX_FONT_SIZE, TEXT_BUDGET / (name.length * 0.6));
  const cx = TAG.x + TAG.width / 2;
  const cy = TAG.y + TAG.height / 2;

  return (
    <div className="relative h-full w-full">
      <Image
        src={DOTS_PHOTO.src}
        alt={DOTS_PHOTO.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />

      {active && (
        <svg
          viewBox={`0 0 ${DOTS_PHOTO.width} ${DOTS_PHOTO.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Din Dots med navnet ${name}`}
        >
          <defs>
            <clipPath id="dots-photo-tag">
              <rect x={TAG.x} y={TAG.y} width={TAG.width} height={TAG.height} rx={TAG.radius} />
            </clipPath>
            {/* Light from the top left, like the photo. */}
            <linearGradient id="dots-photo-light" x1="0" y1="0" x2="1" y2="0.25">
              <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.16" />
            </linearGradient>
            <filter id="dots-photo-emboss" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="3" stdDeviation="1.6" floodColor="#000" floodOpacity="0.28" />
            </filter>
            <filter id="dots-photo-soft" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>

          <g clipPath="url(#dots-photo-tag)" filter="url(#dots-photo-soft)">
            <rect x={TAG.x} y={TAG.y} width={TAG.width} height={TAG.height} fill={mainHex} />
            <text
              x={cx}
              y={cy}
              transform={`rotate(${TAG.textRotation} ${cx} ${cy})`}
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
            x={TAG.x + 1}
            y={TAG.y + 1}
            width={TAG.width - 2}
            height={TAG.height - 2}
            rx={TAG.radius - 1}
            fill="none"
            stroke="#000"
            strokeOpacity="0.18"
            strokeWidth="3"
          />
        </svg>
      )}
    </div>
  );
}
