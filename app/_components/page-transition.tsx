import { type ReactNode, ViewTransition } from "react";

/**
 * Wraps a whole page so it slides when navigating between the start page and "Entstehung".
 * Links opt in with transitionTypes={["nav-forward"]} or {["nav-back"]}; anything else (browser back,
 * theme switch) does not animate the page. The slide itself is defined in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
