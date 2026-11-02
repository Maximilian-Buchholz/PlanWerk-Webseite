"use client";

import { useEffect } from "react";

const RADIUS = 190;

/**
 * Tracks the pointer over the whole page and writes it into --mx/--my/--mr on every
 * [data-spotlight] element, so their background dots light up around the pointer
 * (also across the border between neighbouring areas) and fade out when it leaves.
 */
export function Spotlight() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-spotlight]"));
    const move = (e: PointerEvent) => {
      for (const el of els) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--mr", `${RADIUS}px`);
      }
    };
    const leave = () => els.forEach((el) => el.style.setProperty("--mr", "0px"));
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}
