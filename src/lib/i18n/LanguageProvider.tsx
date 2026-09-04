"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { ui, type Lang, type UiStrings } from "./strings";
import type { Bilingual } from "@/lib/content/types";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: UiStrings;
  /** Pick the right side of a Bilingual field for the current language. */
  b: (value: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "bioverse-lang";

function noopSubscribe() {
  return () => {};
}

/** Reads the persisted language once React checks the client snapshot post-hydration. */
function getStoredLangSnapshot(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bn") return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall through to default
  }
  return "en";
}

function getServerLangSnapshot(): Lang {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore (rather than an effect that calls setState) is the
  // React-sanctioned way to read an external source like localStorage that
  // may differ between the server-rendered HTML and the client: it renders
  // the server snapshot first (avoiding a hydration mismatch) and swaps to
  // the real client value as soon as React checks it after mount.
  const storedLang = useSyncExternalStore(noopSubscribe, getStoredLangSnapshot, getServerLangSnapshot);
  // Explicit in-session choice (e.g. clicking the language toggle) overrides
  // the stored value immediately, without waiting on a storage round-trip.
  const [override, setOverride] = useState<Lang | null>(null);
  const lang = override ?? storedLang;

  const setLang = (next: Lang) => {
    setOverride(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore persistence failures
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "bn" : "en"),
      t: ui[lang],
      b: (value: Bilingual) => value[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
