import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTerms, getTerm, getOrgan, getQuiz } from "@/lib/content";
import { ReferenceList } from "@/components/ui/ReferenceList";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { CATEGORY_META } from "@/lib/design/categories";
import {
  LayersIcon,
  GearIcon,
  PinIcon,
  CheckShieldIcon,
  ProcessArrowsIcon,
  LightbulbIcon,
  WarningIcon,
  PencilIcon,
  InfoIcon,
} from "@/components/ui/MiscIcons";

export function generateStaticParams() {
  return getAllTerms().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};
  return {
    title: `${term.name.en} (${term.name.bn})`,
    description: term.simpleDefinition.en,
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const linkedOrgan = term.links.organSlug ? getOrgan(term.links.organSlug) : undefined;
  const linkedQuiz = term.links.quizSlug ? getQuiz(term.links.quizSlug) : undefined;
  const meta = CATEGORY_META[term.category];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/dictionary" className="hover:text-accent">
          Dictionary
        </Link>{" "}
        / {term.name.en}
      </nav>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold sm:text-4xl">{term.name.en}</h1>
          <Badge tone={meta.color}>{meta.label}</Badge>
        </div>
        <p className="mt-1 text-xl text-fg-muted">{term.name.bn}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-subtle">
          {term.scientificTerm && <span className="italic">{term.scientificTerm}</span>}
          {term.pronunciation && <span>/{term.pronunciation}/</span>}
        </div>
      </header>

      <div
        className="relative mt-6 overflow-hidden rounded-2xl border p-4"
        style={{
          borderColor: `color-mix(in srgb, ${meta.color} 30%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${meta.color} 10%, transparent)`,
        }}
      >
        <p className="font-medium">{term.simpleDefinition.en}</p>
        <p className="mt-1 text-fg-muted">{term.simpleDefinition.bn}</p>
      </div>

      <div className="mt-6 space-y-3">
        <Field icon={InfoIcon} label="Detailed Explanation" bnLabel="বিস্তারিত ব্যাখ্যা" en={term.detailedExplanation.en} bn={term.detailedExplanation.bn} />
        {term.structure && <Field icon={LayersIcon} label="Structure" bnLabel="গঠন" en={term.structure.en} bn={term.structure.bn} />}
        {term.function && <Field icon={GearIcon} label="Function" bnLabel="কাজ" en={term.function.en} bn={term.function.bn} />}
        {term.location && <Field icon={PinIcon} label="Location" bnLabel="অবস্থান" en={term.location.en} bn={term.location.bn} />}
        {term.importance && (
          <Field icon={CheckShieldIcon} label="Biological Importance" bnLabel="জৈবিক গুরুত্ব" en={term.importance.en} bn={term.importance.bn} />
        )}
        {term.relatedProcess && (
          <Field icon={ProcessArrowsIcon} label="Related Process" bnLabel="সম্পর্কিত প্রক্রিয়া" en={term.relatedProcess.en} bn={term.relatedProcess.bn} />
        )}
        {term.interestingFact && (
          <Field icon={LightbulbIcon} label="Interesting Fact" bnLabel="মজার তথ্য" en={term.interestingFact.en} bn={term.interestingFact.bn} accent />
        )}
        {term.commonMisconception && (
          <Field icon={WarningIcon} label="Common Misconception" bnLabel="প্রচলিত ভুল ধারণা" en={term.commonMisconception.en} bn={term.commonMisconception.bn} />
        )}
        {term.examNote && <Field icon={PencilIcon} label="Exam Note" bnLabel="পরীক্ষার নোট" en={term.examNote.en} bn={term.examNote.bn} />}
      </div>

      {/* Deep links into the rest of BioVerse (spec §24) */}
      <div className="mt-8 flex flex-wrap gap-2">
        {linkedOrgan && (
          <Link
            href={`/human-body/${linkedOrgan.slug}`}
            className="bio-focus-ring rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg"
          >
            Open 3D {linkedOrgan.name.en}
          </Link>
        )}
        {linkedQuiz && (
          <Link
            href={`/quiz/${linkedQuiz.slug}`}
            className="bio-focus-ring rounded-full border border-panel-border px-4 py-2 text-xs font-semibold hover:border-accent/50 hover:text-accent"
          >
            Take related quiz
          </Link>
        )}
      </div>

      {term.relatedTermSlugs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">Related Terms</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {term.relatedTermSlugs.map((s) => {
              const related = getTerm(s);
              if (!related) return null;
              return (
                <Link
                  key={s}
                  href={`/dictionary/${s}`}
                  className="bio-focus-ring rounded-full border border-panel-border px-3 py-1.5 text-sm text-fg-muted hover:border-accent/40 hover:text-accent"
                >
                  {related.name.en}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <ReferenceList sourceIds={term.sourceIds} lastReviewed="2026-09-03" />
    </article>
  );
}

function Field({
  icon: Icon,
  label,
  bnLabel,
  en,
  bn,
  accent,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  bnLabel: string;
  en: string;
  bn: string;
  accent?: boolean;
}) {
  return (
    <section className="bio-panel flex gap-3 rounded-xl p-4">
      <IconTile icon={<Icon className="h-4 w-4" />} size="sm" color={accent ? "var(--accent)" : undefined} className="mt-0.5 shrink-0" />
      <div className="min-w-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">
          {label} <span className="normal-case text-fg-subtle/70">· {bnLabel}</span>
        </h2>
        <p className={`mt-1.5 ${accent ? "text-accent" : "text-fg-muted"}`}>{en}</p>
        <p className={`mt-1 text-sm ${accent ? "text-accent/80" : "text-fg-subtle"}`}>{bn}</p>
      </div>
    </section>
  );
}
