"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { searchTerms } from "@/lib/content";
import { CATEGORY_META } from "@/lib/design/categories";
import { SearchIcon } from "@/components/ui/MiscIcons";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DictionaryTeaser() {
  const [query, setQuery] = useState("");
  const { lang, t } = useLanguage();
  const results = useMemo(() => (query.trim() ? searchTerms(query).slice(0, 5) : []), [query]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Biological Dictionary"
        subtitle={`Search in English or বাংলা — try "heart", "মাইটোকন্ড্রিয়া", or "dna".`}
      />

      <div className="relative mx-auto mt-6 max-w-xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.common.searchPlaceholder}
          aria-label={t.common.search}
          className="bio-focus-ring w-full rounded-full border border-panel-border bg-bg-elevated py-3 pl-11 pr-5 text-sm shadow-sm outline-none placeholder:text-fg-subtle"
        />
        {results.length > 0 && (
          <ul className="bio-panel absolute z-20 mt-2 w-full rounded-2xl p-2 text-left shadow-xl">
            {results.map((term) => (
              <li key={term.slug}>
                <Link
                  href={`/dictionary/${term.slug}`}
                  className="bio-focus-ring flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm hover:bg-accent-soft"
                >
                  <span>
                    {lang === "bn" ? term.name.bn : term.name.en}
                    <span className="ml-2 text-xs text-fg-subtle">
                      {lang === "bn" ? term.name.en : term.name.bn}
                    </span>
                  </span>
                  <Badge tone={CATEGORY_META[term.category].color}>{CATEGORY_META[term.category].label}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {query.trim() && results.length === 0 && (
          <div className="bio-panel absolute z-20 mt-2 w-full rounded-2xl p-4 text-center text-sm text-fg-muted shadow-xl">
            {t.common.noResults}
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link href="/dictionary" className="bio-focus-ring text-sm font-medium text-accent hover:underline">
          Browse the full dictionary →
        </Link>
      </div>
    </section>
  );
}
