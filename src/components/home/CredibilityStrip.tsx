import { CheckShieldIcon, GlobeLangIcon, LayersIcon } from "@/components/ui/MiscIcons";
import { IconTile } from "@/components/ui/IconTile";
import type { ComponentType, SVGProps } from "react";

const items: { title: string; body: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  {
    title: "Scientific accuracy first",
    body: "Content is checked against sources like OpenStax Biology, OpenStax Anatomy & Physiology, and MedlinePlus (NIH) — see the Sources & References section on every content page.",
    Icon: CheckShieldIcon,
  },
  {
    title: "Bilingual by design",
    body: "English and বাংলা side by side, with standard scientific terminology preserved rather than carelessly translated.",
    Icon: GlobeLangIcon,
  },
  {
    title: "Levels for every learner",
    body: "Beginner, School, SSC/NCTB-aligned, and Advanced explanations — content complexity adapts to where you are.",
    Icon: LayersIcon,
  },
];

export function CredibilityStrip() {
  return (
    <section className="border-y border-panel-border bg-bg-elevated/50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <IconTile icon={<item.Icon className="h-5 w-5" />} size="sm" className="mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-accent">{item.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
