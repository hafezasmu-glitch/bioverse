import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllOrgans, getOrgan, getTerm, getSystem } from "@/lib/content";
import { ReferenceList } from "@/components/ui/ReferenceList";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { WORLDS } from "@/lib/design/worlds";
import { PinIcon, LayersIcon, GearIcon, CheckShieldIcon, LightbulbIcon, WarningIcon } from "@/components/ui/MiscIcons";

export function generateStaticParams() {
  return getAllOrgans().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const organ = getOrgan(slug);
  if (!organ) return {};
  return {
    title: `${organ.name.en} (${organ.name.bn})`,
    description: organ.summary.en,
  };
}

export default async function OrganPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const organ = getOrgan(slug);
  if (!organ) notFound();

  const system = getSystem(organ.systemId);
  const world = WORLDS["human-body"];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-4 text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/human-body" className="hover:text-accent">
          Human Body
        </Link>{" "}
        / {organ.name.en}
      </nav>

      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {organ.name.en} <span className="text-fg-muted">· {organ.name.bn}</span>
        </h1>
        {organ.pronunciation && <p className="mt-1 text-sm italic text-fg-subtle">/{organ.pronunciation}/</p>}
      </header>

      <div
        className="mt-6 rounded-2xl border p-4"
        style={{
          borderColor: `color-mix(in srgb, ${world.color} 30%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${world.color} 10%, transparent)`,
        }}
      >
        <p className="font-medium">{organ.summary.en}</p>
        <p className="mt-1 text-fg-muted">{organ.summary.bn}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/human-body?focus=${organ.slug}`}
          className="bio-focus-ring rounded-full px-4 py-2 text-xs font-semibold text-bg"
          style={{ backgroundColor: world.color }}
        >
          View in 3D Explorer
        </Link>
        {organ.quizSlug && (
          <Link
            href={`/quiz/${organ.quizSlug}`}
            className="bio-focus-ring rounded-full border border-panel-border px-4 py-2 text-xs font-semibold hover:border-accent/50 hover:text-accent"
          >
            Take Quiz
          </Link>
        )}
        {system && <Badge tone={world.color}>System: {system.name.en}</Badge>}
      </div>

      <div className="mt-8 space-y-3">
        <Section icon={PinIcon} titleEn="Where is it?" titleBn="এটি কোথায়?" en={organ.facts.location.en} bn={organ.facts.location.bn} />
        <Section icon={LayersIcon} titleEn="What does it look like?" titleBn="গঠন" en={organ.facts.structure.en} bn={organ.facts.structure.bn} />
        <Section icon={GearIcon} titleEn="What does it do?" titleBn="কাজ" en={organ.facts.function.en} bn={organ.facts.function.bn} />
        <Section icon={CheckShieldIcon} titleEn="Why is it important?" titleBn="গুরুত্ব" en={organ.facts.importance.en} bn={organ.facts.importance.bn} />
        {organ.facts.interestingFact && (
          <Section icon={LightbulbIcon} titleEn="Interesting fact" titleBn="মজার তথ্য" en={organ.facts.interestingFact.en} bn={organ.facts.interestingFact.bn} accent />
        )}
        {organ.facts.commonMisconception && (
          <Section
            icon={WarningIcon}
            titleEn="Common misconception"
            titleBn="প্রচলিত ভুল ধারণা"
            en={organ.facts.commonMisconception.en}
            bn={organ.facts.commonMisconception.bn}
          />
        )}
        {organ.levelContent && (
          <section className="bio-panel rounded-xl p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">By reading level</h2>
            <dl className="mt-2 space-y-3">
              {organ.levelContent.beginner && <LevelRow label="Beginner" text={organ.levelContent.beginner} />}
              {organ.levelContent.ssc && <LevelRow label="SSC" text={organ.levelContent.ssc} />}
              {organ.levelContent.advanced && <LevelRow label="Advanced" text={organ.levelContent.advanced} />}
            </dl>
          </section>
        )}
      </div>

      {organ.relatedTermSlugs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">Related Terms</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {organ.relatedTermSlugs.map((s) => {
              const term = getTerm(s);
              if (!term) return null;
              return (
                <Link
                  key={s}
                  href={`/dictionary/${s}`}
                  className="bio-focus-ring rounded-full border border-panel-border px-3 py-1.5 text-sm text-fg-muted hover:border-accent/40 hover:text-accent"
                >
                  {term.name.en}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <ReferenceList sourceIds={organ.sourceIds} lastReviewed="2026-09-03" />

      <p className="mt-8 text-xs text-fg-subtle">{"BioVerse is an educational resource, not a substitute for professional medical diagnosis or treatment."}</p>
    </article>
  );
}

function Section({
  icon: Icon,
  titleEn,
  titleBn,
  en,
  bn,
  accent,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  titleEn: string;
  titleBn: string;
  en: string;
  bn: string;
  accent?: boolean;
}) {
  return (
    <section className="bio-panel flex gap-3 rounded-xl p-4">
      <IconTile icon={<Icon className="h-4 w-4" />} size="sm" color={accent ? "var(--accent)" : undefined} className="mt-0.5 shrink-0" />
      <div className="min-w-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">
          {titleEn} <span className="normal-case text-fg-subtle/70">· {titleBn}</span>
        </h2>
        <p className={`mt-1.5 ${accent ? "text-accent" : "text-fg-muted"}`}>{en}</p>
        <p className={`mt-1 text-sm ${accent ? "text-accent/80" : "text-fg-subtle"}`}>{bn}</p>
      </div>
    </section>
  );
}

function LevelRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-accent">{label}</dt>
      <dd className="text-sm text-fg-muted">{text}</dd>
    </div>
  );
}
