"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { DictionaryCategory, Term } from "@/lib/content/types";
import { CATEGORY_LIST, CATEGORY_META } from "@/lib/design/categories";
import { BioCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchIcon } from "@/components/ui/MiscIcons";

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

/**
 * Client-side search + category filter over the term list passed from the
 * server page. At the current sample scale (20 terms) this is instant;
 * at the spec's target scale (1,000+) this filtering would move to a real
 * search index / database query instead of filtering an in-memory array.
 */
export function DictionaryBrowser({ terms }: { terms: Term[] }) {
  const { lang, b, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DictionaryCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return terms
      .filter((term) => category === "all" || term.category === category)
      .filter((term) => {
        if (!q) return true;
        const haystacks = [term.name.en, term.name.bn, term.scientificTerm ?? "", ...(term.synonyms ?? [])];
        return haystacks.some((h) => normalize(h).includes(q));
      })
      .sort((a, b2) => a.name.en.localeCompare(b2.name.en));
  }, [terms, query, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, Term[]>();
    for (const term of filtered) {
      const letter = term.name.en[0]?.toUpperCase() ?? "#";
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(term);
    }
    return Array.from(map.entries()).sort(([a], [b2]) => a.localeCompare(b2));
  }, [filtered]);

  return (
    <div>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.common.searchPlaceholder}
          aria-label={t.common.search}
          className="bio-focus-ring w-full flex-1 rounded-full border border-panel-border bg-bg-elevated py-3 pl-11 pr-5 text-sm outline-none placeholder:text-fg-subtle"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label={t.common.allCategories}>
        {CATEGORY_LIST.map((id) => {
          const meta = id === "all" ? undefined : CATEGORY_META[id];
          const label = id === "all" ? "All" : meta!.label;
          const active = category === id;
          return (
            <button
              key={id}
              onClick={() => setCategory(id)}
              aria-pressed={active}
              className="bio-focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              style={
                active
                  ? {
                      borderColor: meta ? `color-mix(in srgb, ${meta.color} 45%, transparent)` : "var(--accent)",
                      backgroundColor: meta ? `color-mix(in srgb, ${meta.color} 16%, transparent)` : "var(--accent-soft)",
                      color: meta?.color ?? "var(--accent)",
                    }
                  : { borderColor: "var(--panel-border)", color: "var(--fg-muted)" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-fg-subtle">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<SearchIcon className="h-5 w-5" />}
            title={t.common.noResults}
            description="Try a different spelling, or clear the category filter above."
          />
        </div>
      ) : (
        <div className="mt-4 space-y-8">
          {grouped.map(([letter, group]) => (
            <div key={letter}>
              <h2 className="mb-2 text-sm font-bold text-accent">{letter}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((term) => {
                  const meta = CATEGORY_META[term.category];
                  return (
                    <BioCard key={term.slug} href={`/dictionary/${term.slug}`} accent={meta.color} className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{lang === "bn" ? term.name.bn : term.name.en}</h3>
                        <Badge tone={meta.color}>{meta.label}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-fg-subtle">
                        {lang === "bn" ? term.name.en : term.name.bn}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{b(term.simpleDefinition)}</p>
                    </BioCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
