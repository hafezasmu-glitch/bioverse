"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { NavLink } from "./nav-data";

export function NavDropdown({ label, links }: { label: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="bio-focus-ring flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="bio-panel absolute left-0 top-full z-40 mt-1 min-w-[220px] rounded-xl p-2 shadow-xl"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className="bio-focus-ring flex items-center justify-between rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-accent-soft hover:text-fg"
              onClick={() => setOpen(false)}
            >
              <span>{t.nav[link.labelKey]}</span>
              {!link.ready && (
                <span className="rounded-full bg-fg-subtle/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-fg-subtle">
                  {t.common.comingSoon}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
