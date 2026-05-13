/**
 * HeroArches — full-viewport boho arch backdrop with scroll-retract behaviour.
 *
 * Mounted in src/app/layout.tsx so it sits behind every page.
 *
 * Layout:
 *   - Left arch is upright (peak top, legs down), offset slightly off the
 *     left edge so its body sits in the upper-left quadrant.
 *   - Right arch is inverted (peak bottom, legs up), offset slightly off
 *     the right edge so its body sits in the lower-right quadrant.
 *
 * Positioning:
 *   - Container is `position: fixed` to the viewport, so the arches follow
 *     the user across the whole page. This is required for the .glass
 *     surfaces above to have something to blur — backdrop-filter only
 *     blurs the same stacking context.
 *
 * Scroll retraction:
 *   - Both arches translate downward (left) / upward (right) as the user
 *     scrolls. Travel is clamped so the peak always stays visible.
 *   - Left arch starts further from its rest position, so it has a much
 *     longer travel cap (580px) than the right (220px).
 *   - Speeds are equal (0.6 × scrollY); only the caps differ. The right
 *     arch "finishes" retracting sooner because of the shorter cap.
 *   - No CSS transition — transforms update synchronously with scroll
 *     for a 1:1 feel. Adding a transition makes it feel sluggish.
 */

"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Arch from "./Arch";

const SPEED = 0.6;
const LEFT_MAX_TRAVEL = 580;
const RIGHT_MAX_TRAVEL = 220;

export default function HeroArches() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftTravel = Math.min(scrollY * SPEED, LEFT_MAX_TRAVEL);
  const rightTravel = Math.min(scrollY * SPEED, RIGHT_MAX_TRAVEL);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Arch
        maskId="arch-hero-l"
        direction="up"
        width={620}
        height={760}
        peakOffset={220}
        lines={6}
        gap={42}
        strokeWidth={3}
        style={{
          top: 0,
          left: -60,
          transform: `translateY(${leftTravel}px)`,
        }}
      />
      <Arch
        maskId="arch-hero-r"
        direction="down"
        width={620}
        height={760}
        peakOffset={220}
        lines={6}
        gap={42}
        strokeWidth={3}
        style={{
          top: 0,
          right: -60,
          transform: `translateY(-${rightTravel}px)`,
        }}
      />
    </div>
  );
}
