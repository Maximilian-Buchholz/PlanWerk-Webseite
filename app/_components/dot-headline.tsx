"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { F } from "./glyphs";

const LINES = [
  { text: "PLAN MORE", color: "var(--logo-ink)", scale: 1, top: 0 },
  { text: "WERK LESS", color: "#E85A1A", scale: 0.55, top: 8.5 },
] as const;
const SPACE = 3; // a word space is narrower than a letter (6 columns)

const advance = (ch: string) => (ch === " " ? SPACE : 6);
const lineCols = (text: string) => text.split("").reduce((w, ch) => w + advance(ch), 0) - 1;
const INK = { light: "#1E1E1C", dark: "#F1EDE5" } as const; // same as --logo-ink in each theme
const COLS = lineCols(LINES[0].text);
const ROWS = LINES[1].top + 7 * LINES[1].scale;

/** Deterministic pseudo-random so server and client render the same markup. */
function rnd(i: number, k: number) {
  let h = Math.imul(i + 1, 374761393) ^ Math.imul(k, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Survives client-side navigation: coming back to the start page shows the headline already built.
let built = false;

/** Two lines of dot-matrix text; each line pops up dot by dot, the second one a bit later (only on the first visit). */
export function DotHeadline() {
  const [shown, setShown] = useState(() => (built ? 2 : 0)); // number of visible lines
  const svgRef = useRef<SVGSVGElement>(null);

  const dots = useMemo(
    () =>
      LINES.flatMap((line, l) => {
        let i = 0;
        let ox = (COLS - lineCols(line.text) * line.scale) / 2;
        return line.text.split("").flatMap((ch) => {
          const x0 = ox;
          ox += advance(ch) * line.scale;
          return F[ch].flatMap((row, y) =>
            ch === " "
              ? []
              : row.split("").flatMap((c, x) =>
                  c === "X"
                    ? [{
                        line: l,
                        x: Math.round((x0 + x * line.scale) * 1000) / 1000,
                        y: Math.round((line.top + y * line.scale) * 1000) / 1000,
                        r: Math.round(0.4 * line.scale * 1000) / 1000,
                        delay: Math.round(rnd(i++, l + 1) * 90) / 100,
                        color: line.color,
                      }]
                    : [],
                ),
          );
        });
      }),
    [],
  );

  useEffect(() => {
    if (built) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      built = true;
      setShown(2);
      return;
    }
    const t1 = setTimeout(() => setShown(1), 250);
    const t2 = setTimeout(() => {
      setShown(2);
      built = true; // marked only once it has played (effects can run twice in development)
    }, 1650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // On a theme change the old dots stay as they are and dots in the new color grow on top of them, one after another.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const root = document.documentElement;
    const theme = (): keyof typeof INK => (root.dataset.theme === "dark" ? "dark" : "light");
    let prev = theme();
    let overlays: SVGCircleElement[] = [];
    let base: SVGCircleElement[] = [];

    const finish = () => {
      overlays.forEach((o) => o.remove());
      base.forEach((c) => {
        c.style.fill = "var(--logo-ink)";
        c.style.transition = "";
      });
      overlays = [];
      base = [];
    };

    const observer = new MutationObserver(() => {
      const next = theme();
      if (next === prev) return;
      finish();
      const from = INK[prev];
      const to = INK[next];
      prev = next;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      base = Array.from(svg.querySelectorAll<SVGCircleElement>("circle[data-ink]")).filter((c) =>
        c.style.transform.includes("scale(1)"),
      );
      const anims = base.map((c) => {
        c.style.transition = "none";
        c.style.fill = from; // keep the old color until the new dot covers it
        const o = c.cloneNode() as SVGCircleElement;
        o.removeAttribute("data-ink");
        o.style.transition = "none";
        o.style.fill = to;
        o.style.transform = c.style.transform.replace("scale(1)", "scale(0)");
        svg.appendChild(o);
        overlays.push(o);
        return o.animate(
          [{ transform: o.style.transform }, { transform: c.style.transform }],
          { duration: 400, delay: Number(c.dataset.delay) * 550, easing: "cubic-bezier(.3,1.5,.5,1)", fill: "forwards" },
        );
      });
      const mine = overlays;
      Promise.all(anims.map((a) => a.finished)).then(() => {
        if (mine === overlays) finish();
      }, () => {});
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      observer.disconnect();
      finish();
    };
  }, []);

  return (
    <svg ref={svgRef} className="dot-headline" viewBox={`0 0 ${COLS} ${ROWS}`} aria-hidden="true">
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={0}
          cy={0}
          r={d.r}
          data-ink={d.color === "var(--logo-ink)" ? "" : undefined}
          data-delay={d.delay}
          style={
            {
              fill: d.color,
              transform: `translate(${d.x + 0.5}px,${d.y + 0.5}px) scale(${shown > d.line ? 1 : 0})`,
              "--delay": `${d.delay}s`,
              "--dur": ".5s",
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
