"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./dots";
import { glideToY } from "./glide";

const LINKS = [
  ["top", "Start"],
  ["funktionen", "Funktionen"],
  ["so-gehts", "So geht's"],
  ["preise", "Preise"],
  ["support", "Support"],
] as const;
const SECTIONS = ["funktionen", "so-gehts", "preise", "support"];

// Space kept above the target: "funktionen" has its own top padding, so its section edge is the right stop;
// "support" (footer) sits flush. Sections without top padding need room for the floating nav.
const OFFSET: Record<string, number> = { funktionen: 0, support: 0 };

function targetY(id: string) {
  if (id === "top") return 0;
  const el = document.getElementById(id);
  if (!el) return null;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - (OFFSET[id] ?? 96));
}


/** Floating nav with scroll-spy, plus smooth scrolling for every in-page link. */
export function Nav() {
  const [active, setActive] = useState("top");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = dark ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
    };
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();

    if (!document.startViewTransition) {
      // fallback: let colors cross-fade
      root.classList.add("theme-fade");
      apply();
      setTimeout(() => root.classList.remove("theme-fade"), 500);
      return;
    }

    // the browser cross-fades the old and the new theme; .theme-switching scopes the CSS to this transition
    root.classList.add("theme-switching");
    document.startViewTransition(apply).finished.finally(() => root.classList.remove("theme-switching"));
  }

  useEffect(() => {

    function glide(id: string) {
      const to = targetY(id);
      if (to !== null) glideToY(to);
    }

    function onClick(e: MouseEvent) {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || (id !== "top" && !document.getElementById(id))) return;
      e.preventDefault();
      glide(id);
    }

    function spy() {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = "top";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = "support";
      setActive(cur);
    }

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    spy();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, []);

  return (
    <div className="nav-shell" id="top">
      <nav className="nav" aria-label="Hauptnavigation">
        <a className="brand" href="#top" aria-label="PlanWerk Startseite">
          <span className="logo-tile"><Logo /></span>PlanWerk
        </a>
        <ul>
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "active" : undefined}>{label}</a>
            </li>
          ))}
          <li>
            <Link href="/entstehung" transitionTypes={["nav-forward"]}>Entstehung</Link>
          </li>
        </ul>
        <button type="button" role="switch" aria-checked={dark} aria-label="Dunkelmodus" className="theme-switch" onClick={toggleTheme}>
          <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg className="moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
          <span className="knob" />
        </button>
        <a className="btn btn-primary btn-sm" href="#download">App laden</a>
      </nav>
    </div>
  );
}
