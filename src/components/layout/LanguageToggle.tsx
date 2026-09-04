"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Select language"
      className="flex items-center rounded-full border border-panel-border p-0.5 text-xs font-medium"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`bio-focus-ring rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("bn")}
        aria-pressed={lang === "bn"}
        className={`bio-focus-ring rounded-full px-2.5 py-1 transition-colors ${
          lang === "bn" ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
        }`}
      >
        বাং
      </button>
    </div>
  );
}
