"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { WORLD_LIST } from "@/lib/design/worlds";
import { BioCard } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WorldsGrid() {
  const { lang } = useLanguage();
  return (
    <section id="worlds" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Eight worlds, one platform"
        title="The Biology Universe"
        subtitle="Start anywhere — every world links back to the same dictionary, quizzes, and 3D architecture."
        className="mb-10"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WORLD_LIST.map((w) => (
          <BioCard key={w.href} href={w.href} accent={w.color} className="p-5" ariaLabel={lang === "bn" ? w.bnTitle : w.title}>
            <div className="flex items-start justify-between">
              <IconTile icon={<w.Icon className="h-6 w-6" />} color={w.color} />
              {!w.ready && <Badge>Coming Soon</Badge>}
            </div>
            <h3 className="mt-4 text-base font-semibold">{lang === "bn" ? w.bnTitle : w.title}</h3>
            <p className="mt-1.5 text-sm text-fg-muted">{lang === "bn" ? w.bnDescription : w.description}</p>
            <span
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: w.color }}
            >
              {lang === "bn" ? "অন্বেষণ করুন →" : "Explore →"}
            </span>
          </BioCard>
        ))}
      </div>
    </section>
  );
}
