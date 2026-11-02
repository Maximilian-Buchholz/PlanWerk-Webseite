"use client";

import { useState } from "react";
import { Chat, Compare } from "./blocks";

export type CompareScreen = {
  id: string;
  label: string;
  /** Freunde had no Figma reference */
  noReference?: boolean;
  bild: string;
  text: string;
  prompt?: string;
};

/** All screens of the experiment in one place: tabs switch the screen, findings sit right below the images. */
export function ScreenCompare({ screens }: { screens: CompareScreen[] }) {
  const [current, setCurrent] = useState(screens[0].id);
  const s = screens.find((x) => x.id === current)!;

  return (
    <div className="screen-compare">
      <div className="seg-tabs" role="tablist" aria-label="Screen wählen">
        {screens.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === current} onClick={() => setCurrent(x.id)}>
            {x.label}
          </button>
        ))}
      </div>
      <Compare key={s.id} screen={s.id} kinds={s.noReference ? ["bild", "text"] : ["referenz", "bild", "text"]} />
      <dl className="findings">
        <div className="bild"><dt>Bildprompt</dt><dd>{s.bild}</dd></div>
        <div className="text"><dt>Textprompt</dt><dd>{s.text}</dd></div>
      </dl>
      {s.prompt && (
        <details className="prompt-details">
          <summary>Textprompt für „{s.label}“ anzeigen</summary>
          <Chat prompt={s.prompt} reply={["Umsetzung ohne Bildvorlage, Design und Styling hat die KI selbst festgelegt. Das Ergebnis siehst du oben als Textprompt-Variante."]} />
        </details>
      )}
    </div>
  );
}
