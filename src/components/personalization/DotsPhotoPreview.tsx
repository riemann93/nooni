"use client";

/**
 * DotsPhotoPreview — a real photo of a Dots med navn on a zipper, with
 * the customer's colours and name painted onto the tag live.
 *
 * The photo (public/images/dots-anne-jakke.jpg, 1600 × 2000) is turned
 * so the name reads left to right, and framed a little way back so the
 * jacket shows. It has a white Dots with "Anne" in pink. An SVG laid
 * exactly over the photo (same viewBox, same cover crop) repaints the
 * tag in the chosen main colour, writes the chosen name in Fredoka Bold
 * in the secondary colour, and adds a soft highlight and edge shade so
 * the tag keeps the look of printed plastic.
 *
 * While designing (`active`), the photo zooms in on the tag and the
 * overlay shows; otherwise the bare photo is shown at rest.
 *
 * TAG geometry is measured on the photo in its own pixels. A new photo
 * needs new numbers: the tag's bounding box, corner radius and the
 * rotation of the text (0 = reads left to right).
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
  width: 1600,
  height: 2000,
} as const;

/** The tag on the photo, in photo pixels. */
const TAG = { x: 658, y: 958, width: 288, height: 97, radius: 48, textRotation: 0 } as const;

/** How far the photo zooms in on the tag while designing. */
const ZOOM = 2.8;

/** What the photo shows before any choice: white tag, pink "Anne". */
const PHOTO_MAIN_HEX = "#F7F6F2";
const PHOTO_SECONDARY_HEX = "#E9837F";
const PHOTO_NAME = "Anne";

/** Length of the text run the tag has room for, and the tallest the
 *  letters may get, in photo pixels. */
const TAG_LONG = Math.max(TAG.width, TAG.height);
const TAG_SHORT = Math.min(TAG.width, TAG.height);
const TEXT_BUDGET = TAG_LONG * 0.8;
const MAX_FONT_SIZE = TAG_SHORT * 0.95;

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

  // Zoom towards the tag's centre, so it stays in place as it grows.
  const origin = `${(cx / DOTS_PHOTO.width) * 100}% ${(cy / DOTS_PHOTO.height) * 100}%`;

  return (
    <div
      className="relative h-full w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
      style={{ transform: `scale(${active ? ZOOM : 1})`, transformOrigin: origin }}
    >
      <Image
        src={DOTS_PHOTO.src}
        alt={DOTS_PHOTO.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />

      <svg
        viewBox={`0 0 ${DOTS_PHOTO.width} ${DOTS_PHOTO.height}`}
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        role={active ? "img" : undefined}
        aria-label={active ? `Din Dots med navnet ${name}` : undefined}
        aria-hidden={active ? undefined : true}
      >
          <defs>
            <clipPath id="dots-photo-tag">
              <rect x={TAG.x} y={TAG.y} width={TAG.width} height={TAG.height} rx={TAG.radius} />
            </clipPath>
            {/* Light from the top left, like the photo. */}
            <linearGradient id="dots-photo-light" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.16" />
            </linearGradient>
            <filter id="dots-photo-emboss" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0.8" dy="1.2" stdDeviation="0.7" floodColor="#000" floodOpacity="0.28" />
            </filter>
            <filter id="dots-photo-soft" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.4" />
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
            strokeWidth="1.5"
          />
      </svg>
    </div>
  );
}
