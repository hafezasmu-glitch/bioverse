"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getTerm } from "@/lib/content";
import { ReferenceList } from "@/components/ui/ReferenceList";
import type { Organ, EducationLevel } from "@/lib/content/types";

const LEVELS: EducationLevel[] = ["beginner", "school", "ssc", "advanced"];
const LEVEL_LABEL: Record<EducationLevel, string> = {
  beginner: "Beginner",
  school: "School",
  ssc: "SSC",
  advanced: "Advanced",
};

export function OrganDetailPanel({ organ, onClose }: { organ: Organ; onClose: () => void }) {
  const { b, lang, t } = useLanguage();
  const [level, setLevel] = useState<EducationLevel>("school");
  const availableLevels = LEVELS.filter((l) => organ.educationLevel.includes(l));
  const levelText = organ.levelContent?.[level];

  return (
    <aside
      className="bio-panel absolute right-0 top-0 z-30 flex h-full w-full max-w-sm flex-col overflow-y-auto rounded-l-2xl p-5 shadow-2xl sm:p-6"
      aria-label={`${b(organ.name)} details`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{b(organ.name)}</h2>
          <p className="text-sm text-fg-muted">
            {lang === "bn" ? organ.name.en : organ.name.bn}
            {organ.pronunciation && <span className="ml-2 italic text-fg-subtle">/{organ.pronunciation}/</span>}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close organ details"
          className="bio-focus-ring rounded-full p-1.5 text-fg-muted hover:text-fg"
        >
          ✕
        </button>
      </div>

      <p className="mt-3 text-sm text-fg-muted">{b(organ.summary)}</p>

      {availableLevels.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{t.common.readingLevel}</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {availableLevels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`bio-focus-ring rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  level === l
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-panel-border text-fg-muted hover:text-fg"
                }`}
              >
                {LEVEL_LABEL[l]}
              </button>
            ))}
          </div>
          {levelText && <p className="mt-2 text-sm text-fg-muted">{levelText}</p>}
        </div>
      )}

      <dl className="mt-5 space-y-4 text-sm">
        <Fact label={t.common.location} value={b(organ.facts.location)} />
        <Fact label={t.common.structure} value={b(organ.facts.structure)} />
        <Fact label={t.common.function} value={b(organ.facts.function)} />
        <Fact label={t.common.importance} value={b(organ.facts.importance)} />
        {organ.facts.interestingFact && <Fact label={t.common.interestingFact} value={b(organ.facts.interestingFact)} accent />}
        {organ.facts.commonMisconception && (
          <Fact label={t.common.commonMisconception} value={b(organ.facts.commonMisconception)} />
        )}
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {organ.quizSlug && (
          <Link
            href={`/quiz/${organ.quizSlug}`}
            className="bio-focus-ring rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg"
          >
            {t.common.takeQuiz}
          </Link>
        )}
        <Link
          href={`/human-body/${organ.slug}`}
          className="bio-focus-ring rounded-full border border-panel-border px-4 py-2 text-xs font-semibold hover:border-accent/50 hover:text-accent"
        >
          Full page
        </Link>
      </div>

      {organ.relatedTermSlugs.length > 0 && (
        <div className="mt-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{t.common.relatedTerms}</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {organ.relatedTermSlugs.map((slug) => {
              const term = getTerm(slug);
              if (!term) return null;
              return (
                <Link
                  key={slug}
                  href={`/dictionary/${slug}`}
                  className="bio-focus-ring rounded-full border border-panel-border px-2.5 py-1 text-xs text-fg-muted hover:border-accent/40 hover:text-accent"
                >
                  {b(term.name)}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <ReferenceList sourceIds={organ.sourceIds} />
    </aside>
  );
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{label}</dt>
      <dd className={`mt-0.5 ${accent ? "text-accent" : "text-fg-muted"}`}>{value}</dd>
    </div>
  );
}
