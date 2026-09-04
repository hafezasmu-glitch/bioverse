"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { worldLinks, labLinks, primaryLinks } from "./nav-data";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useIsClient } from "@/lib/useIsClient";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const mounted = useIsClient();
  if (!open || !mounted) return null;

  const allLinks = [...worldLinks, ...labLinks, ...primaryLinks];

  // Rendered via a portal straight onto <body>: the header it's triggered
  // from uses backdrop-blur, which (like `transform` or `filter`) creates a
  // new containing block for `position: fixed` descendants — without the
  // portal this drawer would be positioned relative to the header's own
  // ~64px-tall box instead of the viewport.
  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="bio-panel absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto p-5 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">BIOVERSE</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="bio-focus-ring rounded-full p-2 text-fg-muted hover:text-fg"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          <Link href="/" onClick={onClose} className="bio-focus-ring rounded-lg px-3 py-3 text-base font-medium hover:bg-accent-soft">
            {t.nav.home}
          </Link>
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="bio-focus-ring flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-accent-soft"
            >
              <span>{t.nav[link.labelKey]}</span>
              {!link.ready && (
                <span className="rounded-full bg-fg-subtle/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-fg-subtle">
                  {t.common.comingSoon}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-3 border-t border-panel-border pt-5">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </div>,
    document.body
  );
}
