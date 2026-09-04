"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { worldLinks, labLinks, primaryLinks } from "./nav-data";
import { NavDropdown } from "./NavDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-panel-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="bio-focus-ring flex items-center gap-2" aria-label="BioVerse home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-black text-bg">
            B
          </span>
          <span className="text-lg font-bold tracking-tight">
            BIO<span className="text-gradient">VERSE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          <Link href="/" className="bio-focus-ring rounded-md px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg">
            {t.nav.home}
          </Link>
          <NavDropdown label="Worlds" links={worldLinks} />
          <NavDropdown label="Labs" links={labLinks} />
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bio-focus-ring flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg"
            >
              {t.nav[link.labelKey]}
              {!link.ready && (
                <span className="rounded-full bg-fg-subtle/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-fg-subtle">
                  soon
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <button
            type="button"
            className="bio-focus-ring rounded-md p-2 text-fg-muted hover:text-fg md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
