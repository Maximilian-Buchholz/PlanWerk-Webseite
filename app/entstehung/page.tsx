import type { Metadata } from "next";
import { AppShots, Chat, Facts, Note, Steps } from "./_components/blocks";
import { type CompareScreen, ScreenCompare } from "./_components/screen-compare";
import { ProtocolShell, type Section } from "./_components/shell";

export const metadata: Metadata = {
  title: "Entstehung – PlanWerk",
  description: "Wie PlanWerk entstanden ist: vom Vergleich von Bild- und Textprompts in meiner Bachelorarbeit zur fertigen App.",
};

/** Findings per screen, condensed from chapter 3.3 of the thesis. */
const SCREENS: CompareScreen[] = [
  {
    id: "login",
    label: "Login",
    bild: "Nahezu pixelgenau: vorbefüllte Felder, Checkbox, „Vergessen?“-Link und Button wie im Entwurf.",
    text: "Leerer, funktionaler Zustand. Ergänzt von sich aus einen Umschalter, der das Passwort sichtbar macht.",
    prompt: `Erstelle mir einen Login Screen für meine App mit folgenden Anforderungen:
- Username aus der Supabase-Session
- Login mit E-Mail und Passwort (signInWithPassword), inkl. Fehler-Handling
  und Navigation nach erfolgreichem Login
- Session-Persistenz abhängig von "Angemeldet bleiben"
  (AsyncStorage bzw. SecureStore als Alternative prüfen)
- SSO-Login (signInWithOAuth, Provider noch offen)
- Navigation zur Registrierung (signUp)
- Navigation zum Passwort-Reset`,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    bild: "Übernimmt Struktur, Überblickskarten und Mock-Inhalte fast unverändert.",
    text: "Eigene Karten und Gliederung, Emojis und Icons gemischt in der Tab-Bar, dafür aufgeräumter und besser lesbar.",
    prompt: `Erstelle mir einen Dashboard Screen für meine App mit folgenden Anforderungen:
- Begrüßung mit Namen des aktuellen Users und aktuellem Datum
- Überblick mit drei Kennzahlen: Anzahl Projekte, offene Tasks, heute fällige Tasks
- Liste "Heute fällig" (Tasks mit due_date = heute)
- Liste "Projekte" (übrige offene Tasks, sortiert nach due_date)
- Button zum Anlegen eines neuen Tasks → Navigation zu "Task erstellen"`,
  },
  {
    id: "details",
    label: "Aufgabendetails",
    bild: "Auch die komplexe, aufgeklappte Karte mit Phasenbalken, Avataren und Zählern stimmt mit dem Entwurf überein.",
    text: "Alle Informationen sind da, aber Designentscheidungen wie die farbige Markierung der Frist fehlen.",
  },
  {
    id: "postfach",
    label: "Postfach",
    bild: "Pixelgenau, übernimmt aber auch den schlichten Funktionsumfang: zwei Filter, drei Nachrichten.",
    text: "Visuell abweichend, aber funktional reicher: Filter „Erwähnungen“, „Alle gelesen“, verschiedene Benachrichtigungstypen.",
  },
  {
    id: "task",
    label: "Task erstellen",
    bild: "Karten für Fälligkeit und Zuweisung samt Inhalten korrekt übernommen.",
    text: "Einspaltiges Formular, Priorität als drei Auswahlfelder statt farbig gekennzeichnet.",
  },
  {
    id: "profil",
    label: "Profil",
    bild: "Stimmiges Design, hat aber die Platzhalter-E-Mail aus dem Entwurf statt der echten Daten übernommen.",
    text: "Funktional und pragmatisch, wirkt aber generisch und bricht mit der Designsprache.",
  },
  {
    id: "freunde",
    label: "Freunde",
    noReference: true,
    bild: "Ohne Vorlage: orientiert sich an den übrigen Screens und baut eine CI-treue Funktion zum Hinzufügen.",
    text: "Umfangreiches Freundschaftssystem mit Anfragen und Suche, alles sofort sichtbar und dadurch überladen.",
  },
];

/**
 * One continuous story: the experiment from the thesis (chapters 1–3), then how the finished app was built with
 * Claude Code (chapter 4 and the chat log, prompts quoted verbatim), then a shared conclusion.
 */
const SECTIONS: Section[] = [
  {
    id: "frage",
    short: "Forschungsfrage",
    title: "Die Frage hinter der App",
    body: (
      <>
        <p>
          84&nbsp;% der Entwickler:innen nutzen KI-Werkzeuge oder planen es (Stack Overflow, 2025). Kaum erforscht ist,
          wie stark die Art der Prompts das Ergebnis prägt. Genau das untersucht meine Bachelorarbeit, und
          PlanWerk ist die App, an der ich es ausprobiert habe.
        </p>
        <Note source="Forschungsfrage">
          Welchen Einfluss haben unterschiedliche Prompting-Strategien auf die Qualität KI-generierter mobiler
          Anwendungen im Kontext des Vibe Codings?
        </Note>
      </>
    ),
  },
  {
    id: "aufbau",
    short: "Versuchsaufbau",
    title: "Ein Entwurf, zwei Strategien",
    body: (
      <>
        <p>
          Grundlage war ein Figma-Entwurf von PlanWerk. Daraus hat Claude Code denselben Prototyp zweimal erzeugt, jeweils
          in einem Durchlauf ohne Nachbesserung:
        </p>
        <Steps
          items={[
            ["Bildprompt", "Eine umfassende Anweisung mit den Figma-Screenshots, Farbwerten, Schriften und Komponenten. Ziel: möglichst pixelgenau."],
            ["Textprompts", "Ein schlanker Prompt pro Screen, der nur die Funktionen beschreibt. Design und Styling sollte die KI selbst festlegen."],
          ]}
        />
        <Facts
          items={[
            ["Werkzeug", "Claude Code"],
            ["Modell", "Sonnet 5.5, Medium Effort"],
            ["Stack", "Expo + TypeScript"],
            ["Bewertung", "Heuristisch, nach Nielsen & Norman"],
          ]}
        />
      </>
    ),
  },
  {
    id: "vergleich",
    short: "Vergleich",
    subs: [
      { id: "screens", short: "Screen für Screen" },
      { id: "ergebnis", short: "Was der Vergleich zeigt" },
    ],
    title: "Bild vs. Text, Screen für Screen",
    body: (
      <>
        <p id="screens" className="ent-anchor">Links der Figma-Entwurf, daneben die beiden KI-Varianten. Klick auf ein Bild vergrößert es.</p>
        <ScreenCompare screens={SCREENS} />
        <h3 className="ent-h3 ent-anchor" id="ergebnis">Was der Vergleich zeigt</h3>
        <div className="two-col">
          <div>
            <h3>Bildprompt</h3>
            <p>Hohe Treue zur Corporate Identity und durchgängige Konsistenz. Übernimmt aber auch die Lücken des Entwurfs.</p>
          </div>
          <div>
            <h3>Textprompts</h3>
            <p>Eigene, sinnvolle Ergänzungen wie zusätzliche Filter. Weil das Design offen war, wirkt jeder Screen anders.</p>
          </div>
        </div>
        <Note source="Interpretation">
          Ein Figma-Entwurf enthält nur die Entscheidungen, die beim Entwerfen getroffen wurden. Der Bildprompt bildet sie
          ab, inklusive ihrer Lücken. Ein Textprompt beschreibt Funktionen und lässt Raum für Lösungen, die im Entwurf
          fehlten.
        </Note>
        <p>
          Daraus folgt die zentrale Annahme: Beide Strategien ergänzen sich. Genau so ist im nächsten Schritt die fertige
          App entstanden.
        </p>
      </>
    ),
  },
  {
    id: "planwerk",
    short: "PlanWerk",
    subs: [
      { id: "grundgeruest", short: "Erst Bild, dann Text" },
      { id: "supabase", short: "Datenbank" },
      { id: "projekte", short: "Projekte & Tasks" },
      { id: "stille-fehler", short: "Stille Fehler" },
      { id: "teams", short: "Teams" },
      { id: "postfach", short: "Postfach" },
      { id: "kalender", short: "Kalender" },
      { id: "sicherheit", short: "Sicherheit" },
    ],
    title: "PlanWerk: von der Studie zur fertigen App",
    body: (
      <>
        <div className="ent-part" id="grundgeruest">
          <h3 className="ent-h3">Erst Bild, dann Text</h3>
          <p>
            Aus dem Vergleich wurde die Methode für die echte App: Zuerst ein Bildprompt mit dem Figma-Entwurf für Screens,
            Navigation, Farben und Komponenten. Alles Weitere entstand per Textprompt im laufenden Dialog mit Claude Code,
            oft erst, nachdem ein erstes Ergebnis sichtbar war. So wurde aus dem Prototyp eine vollständige App mit
            Supabase-Backend.
          </p>
          <AppShots shots={[["login", "Anmeldung"], ["dashboard", "Projekte"], ["projekt", "Projektansicht"]]} />
          <Facts
            items={[
              ["App", "React Native + Expo Router"],
              ["Backend", "Supabase: Postgres, Auth, RLS"],
              ["Sprache", "TypeScript"],
              ["Design", "DM Sans, DM Mono, eigene Icons"],
            ]}
          />
        </div>
        <div className="ent-part" id="supabase">
          <h3 className="ent-h3">Die Datenbank zum Laufen bringen</h3>
          <p>
            Die erste große Hürde war Supabase. Die KI hat den Code geschrieben und die Zusammenhänge erklärt, aber vieles
            funktionierte erst nach mehreren Runden:
          </p>
          <Steps
            items={[
              ["Fehlende Zugriffsregeln", "Row-Level-Security-Policies fehlten für fast alle Tabellen, von Profilen bis Kommentaren."],
              ["Endlosschleife", "Eine Policy auf den Projektmitgliedern rief sich selbst auf. Gelöst über eine Hilfsfunktion is_project_member()."],
              ["Keine Profile", "Neu registrierte Nutzer bekamen kein Profil, weil ein Datenbank-Trigger fehlte."],
            ]}
          />
        </div>
        <div className="ent-part" id="projekte">
          <h3 className="ent-h3">Projekte, Tasks und Fristen</h3>
          <p>
            Projekte und Tasks wurden getrennt: Projekte werden separat angelegt, Tasks darin. Dazu kamen Phasen, ein
            Kanban-Board und Fristen, alles Funktionen, die im Figma-Entwurf noch fehlten.
          </p>
          <Chat
            prompt="Kannst du beim Projekt erstellen hinzufügen, dass man auch ein Datum erstellen kann, wann das Projekt abgeschlossen wird. Zusätzlich ist auch wichtig, dass die Tasks die in dem Projekt erstellt werden den Zeitraum vom datum des Projekts nicht überschreiten darf"
            reply={[
              "Neues Feld „Abschluss bis“ beim Erstellen eines Projekts",
              "Beim Task: Hinweis auf das Projektende, Datumsauswahl begrenzt, zusätzliche Prüfung mit Fehlermeldung",
            ]}
          />
          <AppShots shots={[["projekt-erstellen", "Projekt erstellen"], ["task-erstellen", "Task erstellen"], ["board", "Board"]]} />
        </div>
        <div className="ent-part" id="stille-fehler">
          <h3 className="ent-h3">Wenn nichts passiert</h3>
          <p>Ein Muster tauchte mehrfach auf: Die App meldete Erfolg, aber in der Datenbank änderte sich nichts.</p>
          <Chat
            prompt="Wenn ichs gelöscht habe passiert nichts. Also keine Fehlermeldung, aber das Projekt bleibt trotzdem weiterhin bestehen"
            reply={[
              "Ursache: fehlende Lösch-Regeln in der Datenbank. Supabase blockiert dann still, ohne Fehler",
              "Fix im Code: Nach dem Löschen wird geprüft, ob wirklich eine Zeile entfernt wurde, sonst erscheint ein Fehler",
              "Dazu die passenden SQL-Regeln, nur für den Ersteller des Projekts",
            ]}
          />
          <Note source="Gelernt">
            „Funktioniert“ heißt nicht „funktioniert wirklich“. Das beschreibt auch die Arbeit: Die KI meldete Code als
            fertig, der erst nach meinen Hinweisen tatsächlich lief.
          </Note>
        </div>
        <div className="ent-part" id="teams">
          <h3 className="ent-h3">Freunde und Teams</h3>
          <p>
            Der ursprüngliche „AI-Agent“-Tab wurde durch Teams ersetzt: Freunde per E-Mail finden, Anfragen annehmen, Gruppen
            bilden und ganzen Teams Tasks zuweisen. Beim Look and Feel kam es auf Details an:
          </p>
          <Chat
            prompt="Ich finde dieses swipen von dem dunkleren Hintergrund sieht bisschen billig aus, kann der Hintergrund besser einfach dunkler faden?"
            reply={[
              "Eigene Animation statt der Standard-Animation: Der Hintergrund blendet weich ein, nur das Fenster fährt von unten hoch",
            ]}
          />
          <p>
            Danach wurden „Freund hinzufügen“ und „Team erstellen“ in ein gemeinsames Fenster mit Umschalter zusammengelegt.
          </p>
          <AppShots shots={[["teams", "Teams"], ["freund-hinzufuegen", "Freund hinzufügen"], ["team-erstellen", "Team erstellen"]]} />
        </div>
        <div className="ent-part" id="postfach">
          <h3 className="ent-h3">Nachrichten und Postfach</h3>
          <p>
            Im Vergleich hatte die Textprompt-Variante das reichere Postfach gebaut. In der App kamen solche Funktionen jetzt
            gezielt per Textprompt dazu:
          </p>
          <Chat
            prompt="Kannst du mir ein Feature einbauen, dass ich Freunden auch nachrichten schreiben kann? […] Und es fehlt noch die Funktion, dass ich Nachrichten im Postfachen löschenkann, vielleicht durch längeres drücken, dass ich auch mehrere Nachrichten auswählen kann und dann löschen kann"
            reply={[
              "Nachricht-Symbol neben jedem Freund öffnet einen eigenen Screen zum Schreiben",
              "Langes Drücken im Postfach startet die Mehrfachauswahl, Löschen mit Bestätigung",
            ]}
          />
          <p>
            Später kam der Reiter „Gesendet“ dazu. Gesendete Nachrichten tauchten dort zuerst nicht auf, weil die Datenbank
            nur dem Empfänger das Lesen erlaubte.
          </p>
          <AppShots shots={[["postfach", "Postfach"]]} />
        </div>
        <div className="ent-part" id="kalender">
          <h3 className="ent-h3">Kalender statt Profil-Tab</h3>
          <Chat
            prompt="Könntest du eine Änderung so machen, dass wenn man oben rechts auf die initialien auf das Profil kommt und statt den Profil in der Tabbar, dass man dort einen Kalender macht, wo man sieht wann an welchem Tag beispeilweise ein Projekt oder ein Task angelegt ist."
            reply={[
              "Profil über die Initialen oben rechts erreichbar, in der Tab-Bar jetzt der Kalender",
              "Monatsansicht mit Punkten an Tagen mit Terminen, Antippen zeigt die fälligen Tasks und Projekte",
              "Offen kommuniziert: „angelegt“ als Fälligkeitsdatum interpretiert, mit der Bitte um Rückmeldung",
            ]}
          />
          <AppShots shots={[["kalender", "Kalender"], ["profil", "Profil"]]} />
        </div>
        <div className="ent-part" id="sicherheit">
          <h3 className="ent-h3">Ein Blick auf die Sicherheit</h3>
          <Chat
            prompt="Gibt es sicherheitslücken in meiner app?"
            reply={[
              "Keine Geheimnisse im Repository, keine Angriffsflächen für Code-Injection",
              "Gefunden: Nachrichten konnten per direktem Aufruf an beliebige Nutzer gehen, nicht nur an Freunde. Dafür gab es eine neue Regel",
              "Empfehlung: die Regeln live in Supabase prüfen statt sich auf den Chatverlauf zu verlassen",
            ]}
          />
          <p>
            Funktionsfähigkeit ist kein Nachweis für Sicherheit. Die Verantwortung dafür bleibt beim Menschen (Hohn &amp;
            Loydl, 2026).
          </p>
        </div>
      </>
    ),
  },
  {
    id: "fazit",
    short: "Fazit",
    title: "Fazit: Was Studie und App gemeinsam zeigen",
    body: (
      <>
        <p>
          Prompting-Strategien haben einen deutlichen Einfluss auf die Qualität der App, aber keine ist allein besser.
          Bildprompts sorgen für CI-Treue und Konsistenz, Textprompts für Funktionen und eigene Lösungen. Die fertige App
          bestätigt die Annahme aus dem Vergleich: Am besten funktioniert die Kombination, erst Bild, dann Text.
        </p>
        <Note source="Was ich mitnehme">
          Die KI schreibt den Code schnell, aber Steuern, Testen und Prüfen bleiben beim Menschen. Gerade bei Datenbank und
          Sicherheit war eigenes Verständnis unverzichtbar. Vibe Coding senkt Einstiegshürden, ersetzt aber kein Wissen über
          Design, Programmierung und Datenbanken.
        </Note>
        <p className="ent-small">
          Grenzen: ein Durchlauf je Strategie im Vergleich, heuristische Bewertung durch mich, keine Nutzertests. Die
          Ergebnisse zeigen Tendenzen, lassen sich aber nicht ohne Weiteres verallgemeinern.
        </p>
      </>
    ),
  },
];

export default function Entstehung() {
  return (
    <ProtocolShell
      title={<>Wie PlanWerk <em>entstanden ist.</em></>}
      lead={
        <p>
          PlanWerk ist im Rahmen meiner Bachelorarbeit an der Fachhochschule Südwestfalen entstanden. Erst habe ich
          untersucht, wie sich Bild- und Textprompts auf eine KI-generierte App auswirken. Mit diesen Erkenntnissen ist
          dann die fertige App entstanden, im Dialog mit Claude Code, Prompt für Prompt.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
