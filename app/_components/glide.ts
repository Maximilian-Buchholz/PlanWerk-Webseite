const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let travelling = false;

/**
 * Smooth "ride" to a scroll position with ease-in-out; longer distances take a bit longer (650–1300 ms).
 * Used by the start page nav and the sidebar on "Entstehung", independent of the browser's smooth-scroll setting.
 */
export function glideToY(to: number) {
  if (travelling) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return window.scrollTo(0, to);
  travelling = true;
  const from = window.scrollY;
  const dist = to - from;
  const dur = Math.min(1300, Math.max(650, Math.abs(dist) * 0.45));
  let t0: number | null = null;
  const step = (ts: number) => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    window.scrollTo(0, from + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
    else travelling = false;
  };
  requestAnimationFrame(step);
}
