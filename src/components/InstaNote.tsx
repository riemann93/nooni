/**
 * InstaNote — the rounded text box from Camilla's Instagram posts.
 *
 * On @hej.nooni every reel and post carries its hook in a soft box
 * laid over the photo ("58 navnemærker. 1 printer. 1 mor 😄"). This
 * component brings that same box to the website, so a visitor coming
 * from Instagram recognises the handwriting straight away.
 *
 * Each line of a wrapped note gets its own box (box-decoration-break:
 * clone), the way Instagram renders multi-line text.
 *
 * Variants:
 *   blush — pink box, dusty-rose text. The default.
 *   cream — warm cream box, dusty-rose text. Calmer, for busy photos.
 *   rose  — dusty-rose box, white text. For the one note that must pop.
 */

import type { ReactNode } from "react";

type Variant = "blush" | "cream" | "rose";

const VARIANT_CLASSES: Record<Variant, string> = {
  blush: "bg-nooni-blush/90 text-nooni-headline-deep",
  cream: "bg-nooni-bg/90 text-nooni-headline-deep",
  rose: "bg-nooni-headline/95 text-white",
};

interface InstaNoteProps {
  children: ReactNode;
  variant?: Variant;
  /** HTML element to render; defaults to a <p>. */
  as?: "p" | "span" | "h1" | "h2" | "h3";
  className?: string;
}

export default function InstaNote({
  children,
  variant = "blush",
  as: Component = "p",
  className = "",
}: InstaNoteProps) {
  return (
    <Component className={`insta-note leading-[1.55] ${className}`}>
      <span className={`insta-note__box ${VARIANT_CLASSES[variant]}`}>{children}</span>
    </Component>
  );
}
