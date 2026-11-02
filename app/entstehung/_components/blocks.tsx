import type { ReactNode } from "react";
import { ZoomImage } from "./zoom-image";

type Kind = "referenz" | "bild" | "text";
const KIND_LABEL: Record<Kind, string> = { referenz: "Referenz (Figma)", bild: "Bildprompt", text: "Textprompt" };

/** Image sizes of the screenshots taken from the thesis (public/entstehung). */
const SIZES: Record<string, [number, number]> = {
  "dashboard-bild": [445, 968], "dashboard-referenz": [395, 862], "dashboard-text": [443, 963],
  "details-bild": [425, 923], "details-referenz": [396, 873], "details-text": [424, 921],
  "freunde-bild": [626, 1360], "freunde-text": [633, 1377],
  "login-bild": [394, 857], "login-referenz": [390, 760], "login-text": [391, 851],
  "postfach-bild": [409, 890], "postfach-referenz": [397, 756], "postfach-text": [410, 892],
  "profil-bild": [397, 862], "profil-referenz": [395, 756], "profil-text": [399, 867],
  "task-bild": [399, 867], "task-referenz": [396, 755], "task-text": [401, 873],
};

/** Screens side by side: Figma reference, image prompt, text prompt. */
export function Compare({ screen, kinds = ["referenz", "bild", "text"], figure }: { screen: string; kinds?: Kind[]; figure?: string }) {
  return (
    <figure className="compare">
      <div className={`shots n${kinds.length}`}>
        {kinds.map((k) => {
          const [w, h] = SIZES[`${screen}-${k}`];
          return (
            <div key={k} className={`shot ${k}`}>
              <ZoomImage src={`/entstehung/${screen}-${k}.png`} alt={`${KIND_LABEL[k]}: ${screen}`} width={w} height={h} />
              <span className="shot-chip">{KIND_LABEL[k]}</span>
            </div>
          );
        })}
      </div>
      {figure && <figcaption>{figure}</figcaption>}
    </figure>
  );
}

/** A prompt as it was sent to Claude Code. */
export function Prompt({ label, children }: { label: string; children: string }) {
  return (
    <div className="prompt">
      <div className="prompt-head">
        <span className="prompt-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{label}</span>
      </div>
      <pre>{children.trim()}</pre>
    </div>
  );
}

/** Highlighted remark with an optional source. */
export function Note({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <aside className="note-box">
      <p>{children}</p>
      {source && <span className="note-source">{source}</span>}
    </aside>
  );
}

/** Small key/value chips, e.g. tool, model, stack. */
export function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="facts">
      {items.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

/** Numbered steps of a process. */
export function Steps({ items }: { items: [string, ReactNode][] }) {
  return (
    <ol className="ent-steps">
      {items.map(([title, body], i) => (
        <li key={title}>
          <span className="ent-step-num">{String(i + 1).padStart(2, "0")}</span>
          <div><b>{title}</b><p>{body}</p></div>
        </li>
      ))}
    </ol>
  );
}

/** One exchange from the chat with Claude Code: my prompt (verbatim) and what was built. */
export function Chat({ prompt, reply }: { prompt: string; reply: string[] }) {
  return (
    <div className="chat">
      <div className="chat-me">
        <span className="chat-who">Prompt</span>
        <p>{prompt}</p>
      </div>
      <div className="chat-ai">
        <span className="chat-who">Claude Code</span>
        <ul>{reply.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </div>
  );
}

/** Screenshots of the finished app (public/entstehung/app, all 603×1311). */
export function AppShots({ shots }: { shots: [file: string, label: string][] }) {
  return (
    <div className={`shots app n${shots.length}`}>
      {shots.map(([file, label]) => (
        <div key={file} className="shot">
          <ZoomImage src={`/entstehung/app/${file}.png`} alt={`PlanWerk: ${label}`} width={603} height={1311} />
          <span className="shot-chip">{label}</span>
        </div>
      ))}
    </div>
  );
}
