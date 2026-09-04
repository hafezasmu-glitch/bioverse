"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-panel-border bg-bg-elevated/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="text-lg font-bold tracking-tight">
              BIO<span className="text-gradient">VERSE</span>
            </span>
            <p className="mt-3 max-w-sm text-sm text-fg-muted">{t.footer.about}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-fg-muted">
              <li><Link className="bio-focus-ring hover:text-fg" href="/human-body">{t.nav.humanBody}</Link></li>
              <li><Link className="bio-focus-ring hover:text-fg" href="/cell-world">{t.nav.cellWorld}</Link></li>
              <li><Link className="bio-focus-ring hover:text-fg" href="/genetics">{t.nav.genetics}</Link></li>
              <li><Link className="bio-focus-ring hover:text-fg" href="/dictionary">{t.nav.dictionary}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Learn</h3>
            <ul className="mt-3 space-y-2 text-sm text-fg-muted">
              <li><Link className="bio-focus-ring hover:text-fg" href="/quiz">{t.nav.quiz}</Link></li>
              <li><Link className="bio-focus-ring hover:text-fg" href="/ai-tutor">{t.nav.aiTutor}</Link></li>
              <li><Link className="bio-focus-ring hover:text-fg" href="/dashboard">{t.nav.dashboard}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-panel-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.disclaimer}</p>
          <p>&copy; {new Date().getFullYear()} BioVerse. Built for education.</p>
        </div>
      </div>
    </footer>
  );
}
