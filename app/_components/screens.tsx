import Image from "next/image";

/** Real screenshots of the PlanWerk app (public/screens, 900×1957). */
const SCREENS = {
  projekte: "Projektübersicht mit Begrüßung, Überblick und Projektkarten",
  projekt: "Projektansicht mit Tasks, Prioritäten und Phasenbalken",
  kalender: "Kalender im Monatsblick mit markierten Fälligkeiten",
  board: "Kanban-Board mit den Phasen als Spalten",
} as const;

/** Phone frame showing one screen of the real app. */
export function Phone({ screen, className = "phone", preload = false }: { screen: keyof typeof SCREENS; className?: string; preload?: boolean }) {
  return (
    <div className={className}>
      <div className="screen">
        <Image src={`/screens/${screen}.png`} alt={`PlanWerk: ${SCREENS[screen]}`} width={900} height={1957} sizes="(max-width: 820px) 240px, 420px" preload={preload} />
      </div>
    </div>
  );
}
