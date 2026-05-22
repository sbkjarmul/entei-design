"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Consent = "granted" | "denied" | null;

const STORAGE_KEY = "entei-cookie-consent";

interface ConsentContextValue {
  /** Current consent decision, or null if the user has not chosen yet. */
  consent: Consent;
  /** True once the provider has read the stored value on the client. */
  mounted: boolean;
  /** True when the user re-opened the banner to change their choice. */
  isBannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  openBanner: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") {
        setConsent(stored);
      }
    } catch {
      // localStorage may be unavailable (e.g. private mode) — ignore.
    }
    setMounted(true);
  }, []);

  const persist = useCallback((value: Exclude<Consent, null>) => {
    setConsent(value);
    setIsBannerOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage errors — consent still applies for this session.
    }
  }, []);

  const accept = useCallback(() => persist("granted"), [persist]);
  const reject = useCallback(() => persist("denied"), [persist]);
  const openBanner = useCallback(() => setIsBannerOpen(true), []);

  return (
    <ConsentContext.Provider
      value={{ consent, mounted, isBannerOpen, accept, reject, openBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
