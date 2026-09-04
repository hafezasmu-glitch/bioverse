"use client";

import { useTheme } from "next-themes";
import { useIsClient } from "@/lib/useIsClient";

const THEMES = ["light", "dark", "system"] as const;
type ThemeName = (typeof THEMES)[number];

const ICON: Record<ThemeName, string> = { light: "☀", dark: "☾", system: "◑" };
const LABEL: Record<ThemeName, string> = { light: "Light", dark: "Dark", system: "System" };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();

  const current = (mounted ? (theme as ThemeName) : undefined) ?? "system";

  const cycle = () => {
    const idx = THEMES.indexOf(current);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="bio-focus-ring flex items-center gap-1.5 rounded-full border border-panel-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg hover:border-accent/40"
      aria-label={`Theme: ${LABEL[current]}. Activate to change.`}
      title={`Theme: ${LABEL[current]}`}
    >
      <span aria-hidden="true">{ICON[current]}</span>
      <span className="hidden sm:inline">{LABEL[current]}</span>
    </button>
  );
}
