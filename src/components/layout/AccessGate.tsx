"use client";

import { useState, useEffect } from "react";
import { UnderConstruction } from "./UnderConstruction";

const ACCESS_KEY = "dark-studio-access";

export function AccessGate({ children }: { children: React.ReactNode }) {
  // Start locked — switches to unlocked after localStorage check on mount.
  // Authorised users see at most one frame of the construction page.
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(ACCESS_KEY) === "granted");
    setChecked(true);
  }, []);

  function handleUnlock() {
    localStorage.setItem(ACCESS_KEY, "granted");
    setUnlocked(true);
  }

  // Before the localStorage check completes, show nothing to avoid any flash.
  if (!checked) return null;

  if (!unlocked) {
    return <UnderConstruction onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
}
