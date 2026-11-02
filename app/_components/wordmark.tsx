"use client";

import { useEffect, useRef } from "react";
import { F } from "./glyphs";

const WORD = "PLANWERK";
const COLS = WORD.length * 6 - 1;

const dim = (werk: boolean) => (werk ? "rgba(232,90,26,.55)" : "rgba(255,255,255,.13)");
const bright = (werk: boolean) => (werk ? "#FF7A3D" : "rgba(255,255,255,.55)");

/** Dot-matrix wordmark in the footer; random lit dots flash. */
export function Wordmark() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lit = Array.from(ref.current!.querySelectorAll<SVGCircleElement>("circle[data-lit]"));
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const id = setInterval(() => {
      const c = lit[Math.floor(Math.random() * lit.length)];
      const werk = c.dataset.werk === "1";
      c.setAttribute("fill", bright(werk));
      const t = setTimeout(() => {
        c.setAttribute("fill", dim(werk));
        timeouts.delete(t);
      }, 700);
      timeouts.add(t);
    }, 180);
    return () => {
      clearInterval(id);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <svg ref={ref} className="wordmark" viewBox={`0 0 ${COLS} 7`} aria-hidden="true">
      {WORD.split("").flatMap((ch, n) =>
        F[ch].flatMap((row, y) =>
          row.split("").map((c, x) => {
            const werk = n >= 4;
            const cx = n * 6 + x + 0.5;
            const cy = y + 0.5;
            return c === "X" ? (
              <circle key={`${n}-${x}-${y}`} cx={cx} cy={cy} r={0.38} fill={dim(werk)} data-lit="" data-werk={werk ? "1" : "0"} />
            ) : null;
          }),
        ),
      )}
    </svg>
  );
}
