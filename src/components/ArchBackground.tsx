// Concentric outline arch decoration matching the Nooni logo motif.
// Three clusters of nested arch strokes, positioned to bleed off-screen edges.
export default function ArchBackground() {
  const stroke = "#DDD0C4";

  // Upright doorway arch: straight sides extend downward from springY,
  // semicircle arcs over the top. Peak sits at springY - r.
  function arch(cx: number, springY: number, r: number, legLen: number): string {
    const left = cx - r;
    const right = cx + r;
    return (
      `M ${left} ${springY + legLen} ` +
      `L ${left} ${springY} ` +
      `A ${r} ${r} 0 0 1 ${right} ${springY} ` +
      `L ${right} ${springY + legLen}`
    );
  }

  function cluster(
    cx: number,
    springY: number,
    maxR: number,
    count: number,
    gap: number,
    legLen: number,
  ): string[] {
    return Array.from({ length: count }, (_, i) =>
      arch(cx, springY, Math.max(10, maxR - i * gap), legLen),
    );
  }

  const paths = [
    // Cluster 1 — large, top-right, mostly off-screen above and right
    ...cluster(1100, -15, 330, 11, 27, 750),
    // Cluster 2 — medium, top-left/center, offset left and above
    ...cluster(210, -55, 250, 10, 21, 750),
    // Cluster 3 — smaller, lower area, only arch tops visible
    ...cluster(580, 690, 210, 8, 19, 80),
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="1.2" fill="none" />
      ))}
    </svg>
  );
}
