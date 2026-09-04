"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Badge } from "@/components/ui/Badge";

interface ScaleStep {
  key: string;
  en: string;
  bn: string;
  sizeMeters: number;
  sizeLabel: string;
  note: string;
  glyph: string;
}

const steps: ScaleStep[] = [
  { key: "human", en: "Human", bn: "মানুষ", sizeMeters: 1.7, sizeLabel: "≈ 1.7 m", note: "Average adult height.", glyph: "◇" },
  { key: "organ", en: "Organ (Heart)", bn: "অঙ্গ (হৃদপিণ্ড)", sizeMeters: 0.12, sizeLabel: "≈ 12 cm", note: "Roughly fist-sized.", glyph: "◍" },
  { key: "tissue", en: "Tissue", bn: "টিস্যু", sizeMeters: 0.01, sizeLabel: "≈ 1 cm sample", note: "A group of similar cells working together.", glyph: "▤" },
  { key: "cell", en: "Cell", bn: "কোষ", sizeMeters: 0.00002, sizeLabel: "≈ 20 μm", note: "Typical human cell diameter.", glyph: "◉" },
  { key: "organelle", en: "Organelle (Mitochondrion)", bn: "অঙ্গাণু (মাইটোকন্ড্রিয়া)", sizeMeters: 0.000001, sizeLabel: "≈ 1 μm", note: "A functional structure inside the cell.", glyph: "●" },
  { key: "nucleus", en: "Nucleus", bn: "নিউক্লিয়াস", sizeMeters: 0.000006, sizeLabel: "≈ 6 μm", note: "Houses the cell's chromosomes.", glyph: "○" },
  { key: "chromosome", en: "Chromosome", bn: "ক্রোমোজোম", sizeMeters: 0.000005, sizeLabel: "≈ 5 μm (condensed)", note: "Tightly packaged DNA, visible during cell division.", glyph: "✕" },
  { key: "dna", en: "DNA", bn: "ডিএনএ", sizeMeters: 0.000000002, sizeLabel: "≈ 2 nm wide", note: "The double helix width.", glyph: "⧉" },
  { key: "molecule", en: "Molecule (base pair)", bn: "অণু (ক্ষার জোড়া)", sizeMeters: 0.000000001, sizeLabel: "≈ 1 nm", note: "A single rung of the DNA ladder.", glyph: "·" },
];

const LOG_MIN = -9.5;
const LOG_MAX = 0.5;

function logPercent(sizeMeters: number): number {
  const log = Math.log10(sizeMeters);
  return ((log - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

export function ScaleExplorer() {
  const [index, setIndex] = useState(0);
  const { lang } = useLanguage();
  const step = steps[index];
  const percent = useMemo(() => logPercent(step.sizeMeters), [step]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bio-panel rounded-3xl p-6 sm:p-10">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">Cell to Human</h2>
          <Badge>Real order-of-magnitude sizes</Badge>
        </div>
        <p className="mb-8 max-w-2xl text-sm text-fg-muted">
          Drag the slider to travel from a whole human down to a single molecule. The marker
          below moves along a real logarithmic scale — sizes are not exaggerated for effect.
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-4xl text-accent sm:h-32 sm:w-32"
            aria-hidden="true"
          >
            {step.glyph}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold">{lang === "bn" ? step.bn : step.en}</h3>
            <p className="mt-1 font-mono text-sm text-accent">{step.sizeLabel}</p>
            <p className="mt-1 text-sm text-fg-muted">{step.note}</p>
          </div>
        </div>

        <div className="mt-8">
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-label="Scale: human to molecule"
            aria-valuetext={lang === "bn" ? step.bn : step.en}
            className="w-full accent-[var(--accent)]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-fg-subtle">
            <span>HUMAN</span>
            <span>MOLECULE</span>
          </div>
        </div>

        {/* Real logarithmic scale bar (spec §9: always show a scale indicator) */}
        <div className="relative mt-8 h-2 rounded-full bg-fg-subtle/10">
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-bg bg-accent shadow"
            style={{ left: `calc(${percent}% - 8px)` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-subtle">
          <span>10⁰ m (meter)</span>
          <span>10⁻³ (mm)</span>
          <span>10⁻⁶ (μm)</span>
          <span>10⁻⁹ m (nm)</span>
        </div>
      </div>
    </section>
  );
}
