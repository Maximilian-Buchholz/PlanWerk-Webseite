"use client";

import Image from "next/image";
import { useRef } from "react";

/** Screenshot that opens full size in a dialog on click. */
export function ZoomImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="shot-img" onClick={() => dialog.current?.showModal()} aria-label={`${alt} vergrößern`}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 700px) 46vw, 260px" />
      </button>
      <dialog ref={dialog} className="zoom" onClick={() => dialog.current?.close()}>
        <Image src={src} alt={alt} width={width} height={height} sizes="min(90vw, 480px)" />
        <span className="zoom-hint">Klicken oder Esc zum Schließen</span>
      </dialog>
    </>
  );
}
