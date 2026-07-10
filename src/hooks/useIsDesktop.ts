"use client";

import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

/**
 * Returns true only on desktop-width viewports (≥ 1024 px).
 * Defaults to false so SSR and mobile never trigger WebGL / heavy canvas work.
 * Reacts to viewport resize (e.g. tablet rotation).
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    const timer = window.setTimeout(() => setIsDesktop(mq.matches), 0);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener("change", handler);
    };
  }, []);

  return isDesktop;
}
