import { DotHeadline } from "./_components/dot-headline";
import { DotIcon, Logo } from "./_components/dots";
import { Nav } from "./_components/nav";
import { PageTransition } from "./_components/page-transition";
import { PhonesScroll } from "./_components/phones-scroll";
import { Phone } from "./_components/screens";
import { SiteFooter } from "./_components/site-footer";

const PHASES = ["Briefing", "Planung", "Umsetzung", "Review", "Abschluss"];
const STEPS = [
  { ic: "#2C6ADE", icon: "plus", color: "#2C6ADE", phase: "Briefing", title: "Projekt anlegen", text: "Name, Beschreibung und Zieldatum. Die fünf Phasen sind sofort da.", n: 1 },
  { ic: "#E8520A", icon: "person", phase: "Umsetzung", title: "Team dazuholen", text: "Tasks erstellen und mit Priorität und Frist an Freunde oder dein Team verteilen.", n: 3 },
  { ic: "#006E10", icon: "check", color: "#006E10", phase: "Abschluss", title: "Phase für Phase abhaken", text: "Tasks weiterschieben, im Verlauf abstimmen, abhaken. Ist alles erledigt, wird der Balken grün.", n: 5 },
] as const;
const INCLUDES = ["Projekte mit fünf Phasen", "Liste und Kanban-Board", "Prioritäten und Fälligkeiten", "Kalender im Monatsblick", "Postfach mit Benachrichtigungen", "Synchron auf iPhone und Android"];

export default function Home() {
  return (
    <PageTransition>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <Nav />
      <PhonesScroll />

      <main id="main">
        <div className="wrap hero-zone">
          <div className="hero">
            <h1 className="rise d2 dot-h1"><span className="sr-only">Plan more. Werk less.</span><DotHeadline /></h1>
            <p className="sub rise d3">Von der ersten Idee bis zum fertigen Projekt: PlanWerk bringt Aufgaben, Team und Fortschritt an einen Ort. Weniger koordinieren. Mehr schaffen.</p>
            <div className="hero-actions rise d4">
              <a className="btn btn-primary" href="#download">App laden</a>
              <a className="btn btn-secondary" href="#funktionen">Funktionen ansehen</a>
            </div>
            <div className="phones rise d5" aria-label="App-Ansichten" role="group">
              <Phone screen="projekte" className="phone side left" preload />
              <Phone screen="projekt" className="phone center" preload />
              <Phone screen="kalender" className="phone side right" preload />
            </div>
          </div>
        </div>

        <section id="funktionen">
          <div className="wrap">
            <div className="head">
              <h2>Einmal planen, <em>entspannt abhaken.</em></h2>
              <p>PlanWerk nimmt dir das Sortieren ab. Du siehst, was ansteht, wer dran ist und in welcher Phase jedes Projekt gerade steckt.</p>
            </div>
            <div className="bento">
              <article className="tile c1">
                <DotIcon pattern="stairs" />
                <h3>Fünf klare Phasen</h3>
                <p>Briefing, Planung, Umsetzung, Review, Abschluss. Der Phasenbalken zeigt bei jedem Task, wie weit er ist.</p>
                <div className="phase-dots" aria-hidden="true">
                  {PHASES.map((name, i) => <i key={name} className={i < 3 ? "on" : undefined} style={{ "--n": i } as React.CSSProperties} />)}
                  {PHASES.map((name, i) => <span key={name} className={i < 3 ? "on" : undefined} style={{ "--n": i } as React.CSSProperties}>{name}</span>)}
                </div>
              </article>
              <article className="tile c2">
                <DotIcon pattern="flag" />
                <h3>Prioritäten und Fristen</h3>
                <p>Jeder Task bekommt eine Priorität und ein Datum. Was morgen fällig ist, wird rot.</p>
                <div className="mini" aria-hidden="true"><span className="prio high">HIGH</span><span className="prio medium">MEDIUM</span><span className="prio low">LOW</span></div>
              </article>
              <article className="tile feature c3">
                <DotIcon pattern="board" />
                <h3>Kanban-Board</h3>
                <p>Halten, ziehen, loslassen. Tasks wandern per Drag &amp; Drop in die nächste Phase.</p>
                <Phone screen="board" />
              </article>
              <article className="tile c4">
                <DotIcon pattern="calendar" />
                <h3>Kalender</h3>
                <p>Alle Fälligkeiten und Projektabschlüsse im Monatsblick.</p>
              </article>
              <article className="tile c5">
                <DotIcon pattern="person" />
                <h3>Teams und Freunde</h3>
                <p>Leute per E-Mail einladen, Teams bilden, Tasks zuweisen. „Nicht stören“ und „Out of office“ zeigen, wer gerade erreichbar ist.</p>
              </article>
              <article className="tile c6">
                <DotIcon pattern="mail" />
                <h3>Postfach und Verlauf</h3>
                <p>Zuweisungen und Nachrichten landen im Postfach. Jeder Task hat seinen eigenen Kommentarverlauf.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="so-gehts" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="panel">
              <div className="head center">
                <h2>In drei Schritten <em>zum Abschluss.</em></h2>
                <p>Vom ersten Gedanken bis zum fertigen Projekt.</p>
              </div>
              <ol className="steps">
                {STEPS.map((s) => (
                  <li key={s.phase} style={{ "--ic": s.ic } as React.CSSProperties}>
                    <DotIcon pattern={s.icon} color={"color" in s ? s.color : undefined} />
                    <span className="phase">{s.phase}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <div className="flow" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= s.n ? "on" : undefined} />)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="preise" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="head center">
              <h2>Zwei Pläne, <em>ein Ziel.</em></h2>
              <p>Starte kostenlos und wechsle, wenn dein Team wächst. Preise in Euro.</p>
            </div>
            <div className="plans">
              <article className="plan">
                <h3>Free</h3><div className="amount">0 €</div><div className="per">für immer</div>
                <p className="desc">Für den Einstieg und kleine private Projekte.</p>
                <a className="btn btn-secondary" href="#download">Kostenlos starten</a>
              </article>
              <article className="plan best">
                <span className="tag">Beliebt</span>
                <h3>Pro</h3><div className="amount">4,99 €</div><div className="per">pro Monat</div>
                <p className="desc">Unbegrenzte Projekte, Teams bis 10 Personen.</p>
                <a className="btn btn-primary" href="#download">Pro wählen</a>
              </article>
            </div>
            <div className="includes">
              <h3>In jedem Plan enthalten</h3>
              <ul>{INCLUDES.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        <div className="wrap cta-wrap" id="download">
          <div className="cta" data-spotlight>
            <div>
              <h2>Dein nächstes Projekt ist eine Phase entfernt.</h2>
              <p>Lade PlanWerk herunter, leg dein erstes Projekt an und hol dein Team noch heute dazu.</p>
              <a className="btn btn-dark" href="#download">App laden</a>
            </div>
            <div className="cta-side">
              <div className="app-tile"><Logo className="logo pop" label="PlanWerk App-Icon" /></div>
              <span className="note">Für iPhone und Android</span>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </PageTransition>
  );
}
