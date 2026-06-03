"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { UnderConstruction } from "./UnderConstruction";

const ACCESS_KEY = "dark-studio-access";

interface AuthCtx {
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({ logout: () => {} });

/** Use inside any client component to get the logout function. */
export function useAuth() {
  return useContext(AuthContext);
}

export function AccessGate({ children }: { children: React.ReactNode }) {
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

  function handleLogout() {
    localStorage.removeItem(ACCESS_KEY);
    setUnlocked(false);
  }

  if (!checked) return null;

  if (!unlocked) {
    return <UnderConstruction onUnlock={handleUnlock} />;
  }

  return (
    <AuthContext.Provider value={{ logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
