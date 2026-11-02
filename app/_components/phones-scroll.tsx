"use client";

import { useEffect } from "react";

// Faster than the page scrolls, so the phones really travel down the screen (net 0.4px per scrolled pixel).
const SPEED = 0.1;

/** The hero phones sink downwards while scrolling. */
export function PhonesScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.querySelector<HTMLElement>(".phones");
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      el.style.translate = `0 ${y * SPEED}px`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.translate = "";
    };
  }, []);
  return null;
}
