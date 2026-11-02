import Link from "next/link";
import type { ReactNode } from "react";
import { PageTransition } from "../../_components/page-transition";
import { SiteFooter } from "../../_components/site-footer";
import { ProtocolPill, ProtocolSidebar } from "./protocol-nav";

export type Section = {
  id: string;
  short: string;
  title: string;
  /** sub-chapters (ids of elements inside the section), shown in the sidebar while the section is active */
  subs?: { id: string; short: string }[];
  body: ReactNode;
};

/** Frame of the protocol page: sidebar, numbered sections, footer. No top nav, the sidebar links back home. */
export function ProtocolShell({
  title,
  lead,
  sections,
}: {
  title: ReactNode;
  lead: ReactNode;
  sections: Section[];
}) {
  const items = sections.map(({ id, short, title, subs }) => ({ id, short, title, subs }));

  return (
    <PageTransition>
      <a className="skip" href="#protokoll">Zum Inhalt springen</a>

      <div className="ent">
        <ProtocolSidebar title="Entstehung" items={items} />

        <main className="ent-main" id="protokoll">
          <header className="ent-head" id="uebersicht">
            <Link href="/" className="ent-home" transitionTypes={["nav-back"]}>← Zur Startseite</Link>
            <h1>{title}</h1>
            <div className="ent-lead">{lead}</div>
          </header>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="ent-sec">
              <h2><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
              <div className="ent-body">{s.body}</div>
            </section>
          ))}

          <ProtocolPill items={items} />
        </main>
      </div>

      <SiteFooter home={false} plain />
    </PageTransition>
  );
}
