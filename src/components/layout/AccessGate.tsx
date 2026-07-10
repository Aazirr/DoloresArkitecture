"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { UnderConstruction } from "./UnderConstruction";

const ACCESS_KEY = "dark-studio-access";
const ACCESS_EVENT = "dark-studio-access-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(ACCESS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(ACCESS_EVENT, callback);
  };
}

function getAccessSnapshot() {
  return localStorage.getItem(ACCESS_KEY) === "granted";
}

interface AuthCtx {
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({ logout: () => {} });

/** Use inside any client component to get the logout function. */
export function useAuth() {
  return useContext(AuthContext);
}

export function AccessGate({ children }: { children: React.ReactNode }) {
  const unlocked = useSyncExternalStore(subscribe, getAccessSnapshot, () => false);

  function handleUnlock() {
    localStorage.setItem(ACCESS_KEY, "granted");
    window.dispatchEvent(new Event(ACCESS_EVENT));
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_KEY);
    window.dispatchEvent(new Event(ACCESS_EVENT));
  }

  if (!unlocked) {
    return <UnderConstruction onUnlock={handleUnlock} />;
  }

  return (
    <AuthContext.Provider value={{ logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
