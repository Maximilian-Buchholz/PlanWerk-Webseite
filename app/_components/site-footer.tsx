import Link from "next/link";
import { Logo } from "./dots";
import { Spotlight } from "./spotlight";
import { Wordmark } from "./wordmark";

/** Dark footer with the dot wordmark. `plain` drops the extra top space the start page needs for the overlapping CTA. */
export function SiteFooter({ home = true, plain = false }: { home?: boolean; plain?: boolean }) {
  const base = home ? "" : "/";
  return (
    <footer id="support" data-spotlight className={plain ? "plain" : undefined}>
      <Spotlight />
      <Wordmark />
      <div className="wrap">
        <div className="foot">
          <div>
            <a className="brand" href={`${base}#top`}><span className="logo-tile"><Logo /></span>PlanWerk</a>
            <p>Projektmanagement in Phasen, für kleine Teams und alle, die den Überblick behalten wollen.</p>
          </div>
          <div>
            <h4>Produkt</h4>
            <ul>
              <li><a href={`${base}#funktionen`}>Funktionen</a></li>
              <li><a href={`${base}#so-gehts`}>So geht&apos;s</a></li>
              <li><a href={`${base}#preise`}>Preise</a></li>
              <li><Link href="/entstehung" transitionTypes={["nav-forward"]}>Entstehung</Link></li>
            </ul>
          </div>
          <div><h4>Rechtliches</h4><ul><li><a href="#impressum">Impressum</a></li><li><a href="#datenschutz">Datenschutz</a></li><li><a href="#agb">AGB</a></li></ul></div>
          <div><h4>Kontakt</h4><ul><li><span className="mail">hallo@planwerk.app</span></li><li><span className="mail">support@planwerk.app</span></li></ul></div>
        </div>
        <div className="legal"><span>© 2026 PlanWerk. Alle Rechte vorbehalten.</span><span>Made in Germany</span></div>
      </div>
    </footer>
  );
}
