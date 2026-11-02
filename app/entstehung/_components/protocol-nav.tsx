"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "../../_components/dots";
import { glideToY } from "../../_components/glide";

export type NavItem = { id: string; short: string; title: string; subs?: { id: string; short: string }[] };

/** Id of the section currently at the top of the viewport, plus which phase-bar segments are filled (0/1). */
function useReading(ids: string[]) {
  const [active, setActive] = useState("uebersicht");
  const [fills, setFills] = useState<number[]>(() => ids.map(() => 0));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      const els = ids.map((id) => document.getElementById(id));
      let cur = "uebersicht";
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) cur = ids[i];
      });
      setActive(cur);

      // like the phase bar in the app: every section up to the current one is filled, all of them at the end
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const current = ids.indexOf(cur);
      setFills(ids.map((_, i) => (atBottom || i <= current ? 1 : 0)));
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
    };
  }, [ids]);

  return { active, fills };
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Last of the given elements whose top has passed the reading line (same line as the sections). */
function useActiveSub(ids: string[]) {
  const [sub, setSub] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let cur: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setSub(cur);
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
    };
  }, [ids]);
  return sub;
}

/** Ride to a section like the start page nav does, instead of jumping; scroll-margin-top keeps the spacing. */
function glideTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  glideToY(Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin));
  history.replaceState(null, "", `#${id}`);
}

/** Left sidebar: numbered sections; the app's phase bar shows one segment per section, green once all are read. */
export function ProtocolSidebar({ title, items }: { title: string; items: NavItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const { active, fills } = useReading(ids);
  const subIds = useMemo(() => items.flatMap((i) => i.subs?.map((s) => s.id) ?? []), [items]);
  const activeSub = useActiveSub(subIds);
  const done = fills.every((f) => f >= 0.999);
  const side = useRef<HTMLElement>(null);

  // the card sticks vertically centred, so its height is handed to CSS
  useEffect(() => {
    const el = side.current;
    if (!el) return;
    const ro = new ResizeObserver(() => el.style.setProperty("--side-h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const read = Math.round((fills.reduce((a, b) => a + b, 0) / fills.length) * 100);

  return (
    <aside ref={side} className="ent-side" aria-label="Abschnitte">
      <div className="ent-side-head">
        <span className="logo-tile"><Logo /></span>
        <b>{title}</b>
      </div>
      <div className={`ent-progress${done ? " done" : ""}`} aria-label={`${read} % gelesen`} role="img">
        {items.map((it, i) => (
          <i key={it.id} title={it.short}>
            <span style={{ transform: `scaleX(${fills[i] ?? 0})` }} />
          </i>
        ))}
      </div>

      <nav className="ent-side-list">
        {items.map((it, i) => (
          <div key={it.id}>
            <a href={`#${it.id}`} onClick={(e) => glideTo(e, it.id)} className={`ent-item${active === it.id ? " active" : ""}`}>
              <span className="ent-item-text"><small>{num(i)}</small>{it.short}</span>
            </a>
            {it.subs && (
              // sub-chapters fold open while their section is the active one
              <div className={`ent-subs${active === it.id ? " open" : ""}`} aria-hidden={active !== it.id}>
                <div>
                  {it.subs.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      tabIndex={active === it.id ? undefined : -1}
                      onClick={(e) => glideTo(e, s.id)}
                      className={activeSub === s.id ? "active" : undefined}
                    >
                      {s.short}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      <Link href="/" className="ent-item ent-back" transitionTypes={["nav-back"]}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        Zur Startseite
      </Link>
    </aside>
  );
}

/** On small screens the sidebar is gone; a floating pill at the bottom takes over. */
export function ProtocolPill({ items }: { items: NavItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const { active } = useReading(ids);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = bar.current;
    const el = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!nav || !el) return;
    nav.scrollTo({ left: el.offsetLeft - nav.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav ref={bar} className="ent-pill" aria-label="Abschnitte">
      {items.map((it, i) => (
        <a key={it.id} href={`#${it.id}`} onClick={(e) => glideTo(e, it.id)} data-id={it.id} className={active === it.id ? "active" : undefined} title={it.title}>
          <span>{num(i)}</span>{it.short}
        </a>
      ))}
    </nav>
  );
}
