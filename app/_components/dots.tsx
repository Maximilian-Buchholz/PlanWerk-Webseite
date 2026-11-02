import type { CSSProperties } from "react";

const P: [number, number][] = [[0,0],[1,0],[2,0],[3,0],[0,1],[4,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3],[0,4],[0,5],[0,6]];
const W: [number, number][] = [[6,0],[10,0],[6,1],[10,1],[6,2],[10,2],[6,3],[10,3],[6,4],[8,4],[10,4],[6,5],[7,5],[9,5],[10,5],[7,6],[9,6]];

// A person like in every app: ring-shaped head, shoulders below.
const PERSON = ["..xxx..", "..xxx..", "..xxx..", ".......", "..ooo..", ".ooooo.", "ooooooo"] as const;

const PATTERNS = {
  stairs: ["o....", "oo...", "ooo..", "ooo..", "ooooo"],
  flag: ["xooo.", "xoooo", "xooo.", "x....", "x...."],
  board: ["o.x.x", "o.x.x", "o.x..", "o....", "....."],
  calendar: ["xxxxx", ".....", "..o..", ".....", "....."],
  person: PERSON,
  mail: ["ooooooo", "ox...xo", "o.x.x.o", "o..x..o", "ooooooo"],
  plus: [".o.", "ooo", ".o."],
  check: ["....o", "...o.", "o.o..", ".o...", "....."],
  phases: ["xxx..", "xx...", "xxxx.", "x....", "xxxxx"],
  cluster: ["..o..", ".ooo.", "ooxoo", ".ooo.", "..o.."],
} as const;

/** Every icon is drawn on the same 7×7 grid so all dots end up the same size. */
const GRID = 7;

export type PatternName = keyof typeof PATTERNS;

const INK = "var(--logo-ink)";
const ORANGE = "#E85A1A";

function Dot({ x, y, r, fill, i }: { x: number; y: number; r: number; fill: string; i: number }) {
  return <circle cx={x + 0.5} cy={y + 0.5} r={r} style={{ fill, "--i": i } as CSSProperties} />;
}

/** The app icon: P in ink, W in orange. */
export function Logo({ className = "logo", label }: { className?: string; label?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 11 7"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {[...P, ...W].map(([x, y], k) => (
        <Dot key={k} x={x} y={y} r={0.4} fill={k < P.length ? INK : ORANGE} i={k} />
      ))}
    </svg>
  );
}

/** Dot icon drawn from a small pattern: x = ink, o = accent, . = faint. */
export function DotPattern({
  pattern,
  color = ORANGE,
  className,
  big = false,
}: {
  pattern: PatternName;
  color?: string;
  className?: string;
  big?: boolean;
}) {
  const rows: readonly string[] = PATTERNS[pattern];
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const s = GRID;
  let i = 0;
  const dots: React.ReactNode[] = [];
  rows.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (ch === ".") {
        if (!big) dots.push(<Dot key={`${x}-${y}`} x={x} y={y} r={0.18} fill="rgba(44,44,44,.14)" i={i++} />);
        return;
      }
      dots.push(<Dot key={`${x}-${y}`} x={x} y={y} r={0.4} fill={ch === "o" ? color : INK} i={i++} />);
    }),
  );
  return (
    <svg className={className} viewBox={`${-(s - w) / 2} ${-(s - h) / 2} ${s} ${s}`} aria-hidden="true">
      {dots}
    </svg>
  );
}

export function DotIcon({ pattern, color }: { pattern: PatternName; color?: string }) {
  return (
    <span className="dot-ico">
      <DotPattern pattern={pattern} color={color} />
    </span>
  );
}
