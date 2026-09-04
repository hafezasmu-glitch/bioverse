"use client";

import { useState } from "react";
import Link from "next/link";
import { CellCanvas } from "./CellCanvas";
import { getCellOrganelles, getAllQuizzes } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Mode = "animal" | "plant" | "compare";

export function CellWorldExplorer() {
  const { lang, b, t } = useLanguage();
  const [mode, setMode] = useState<Mode>("animal");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isolate, setIsolate] = useState(false);
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [spin, setSpin] = useState(true);

  const cellQuiz = getAllQuizzes().find((q) => q.slug === "cell-quiz");
  const pool = getCellOrganelles(mode === "plant" ? "plant" : "animal");
  const selected = selectedId ? pool.find((o) => o.id === selectedId) ?? getCellOrganelles("plant").find((o) => o.id === selectedId) : null;
  const labels = lang === "bn"
    ? { animal: "প্রাণীকোষ", plant: "উদ্ভিদকোষ", compare: "তুলনা", stopSpin: "ঘোরা থামান", autoSpin: "স্বয়ংক্রিয় ঘূর্ণন", close: "তথ্য বন্ধ করুন", comparison: "গঠনগত তুলনা", present: "আছে", absent: "নেই" }
    : { animal: "Animal Cell", plant: "Plant Cell", compare: "Compare", stopSpin: "Stop Spin", autoSpin: "Auto Spin", close: "Close details", comparison: "Structure comparison", present: "Present", absent: "Absent" };
  const comparisonOrganelles = Array.from(
    new Map([...getCellOrganelles("animal"), ...getCellOrganelles("plant")].map((item) => [item.id, item])).values(),
  );

  function selectAndMaybeIsolate(id: string) {
    setSelectedId(id);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="bio-panel inline-flex rounded-full p-1">
          {(["animal", "plant", "compare"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setSelectedId(null);
                setIsolate(false);
              }}
              aria-pressed={mode === m}
              className={`bio-focus-ring rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {labels[m]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <ToolbarToggle active={showAllLabels} onClick={() => setShowAllLabels((v) => !v)}>
            {showAllLabels ? t.common.hideLabels : t.common.showLabels}
          </ToolbarToggle>
          <ToolbarToggle active={spin} onClick={() => setSpin((v) => !v)}>
            {spin ? labels.stopSpin : labels.autoSpin}
          </ToolbarToggle>
          {selectedId && (
            <ToolbarToggle active={isolate} onClick={() => setIsolate((v) => !v)}>
              {isolate ? t.common.showAll : t.common.isolate}
            </ToolbarToggle>
          )}
        </div>
      </div>

      {mode === "compare" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <CellCanvas
            cellType="animal"
            selectedId={selectedId}
            hoveredId={hoveredId}
            isolateId={isolate ? selectedId : null}
            showAllLabels={showAllLabels}
            spin={spin}
            lang={lang}
            onSelect={selectAndMaybeIsolate}
            onHover={setHoveredId}
            heightClass="h-[42svh] min-h-[300px] sm:h-[52vh]"
          />
          <CellCanvas
            cellType="plant"
            selectedId={selectedId}
            hoveredId={hoveredId}
            isolateId={isolate ? selectedId : null}
            showAllLabels={showAllLabels}
            spin={spin}
            lang={lang}
            onSelect={selectAndMaybeIsolate}
            onHover={setHoveredId}
            heightClass="h-[42svh] min-h-[300px] sm:h-[52vh]"
          />
        </div>
      ) : (
        <CellCanvas
          cellType={mode}
          selectedId={selectedId}
          hoveredId={hoveredId}
          isolateId={isolate ? selectedId : null}
          showAllLabels={showAllLabels}
          spin={spin}
          lang={lang}
          onSelect={selectAndMaybeIsolate}
          onHover={setHoveredId}
        />
      )}

      {selected && (
        <div className="bio-panel mt-4 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{b(selected.name)}</h3>
              <p className="mt-1 text-sm text-fg-muted">{b(selected.summary)}</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold text-accent">{t.common.function}: </span>
                <span className="text-fg-muted">{b(selected.function)}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedId(null);
                setIsolate(false);
              }}
              aria-label={labels.close}
              className="bio-focus-ring shrink-0 rounded-full p-1.5 text-fg-muted hover:text-fg"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      )}

      {cellQuiz && (
        <div className="mt-6 text-center">
          <Link
            href={`/quiz/${cellQuiz.slug}`}
            className="bio-focus-ring inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg"
          >
            {t.common.takeQuiz}: {b(cellQuiz.title)}
          </Link>
        </div>
      )}

      <section className="mt-8" aria-labelledby="cell-comparison-title">
        <h2 id="cell-comparison-title" className="text-xl font-semibold">{labels.comparison}</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-panel-border">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-bg-elevated text-fg">
              <tr>
                <th className="px-4 py-3 font-semibold">{lang === "bn" ? "অঙ্গাণু/গঠন" : "Organelle / structure"}</th>
                <th className="px-4 py-3 font-semibold">{labels.animal}</th>
                <th className="px-4 py-3 font-semibold">{labels.plant}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonOrganelles.map((organelle) => {
                const inAnimal = organelle.cellTypes.includes("animal");
                const inPlant = organelle.cellTypes.includes("plant");
                return (
                  <tr key={organelle.id} className="border-t border-panel-border">
                    <th scope="row" className="px-4 py-3 font-medium">{b(organelle.name)}</th>
                    <td className="px-4 py-3 text-fg-muted">{inAnimal ? labels.present : labels.absent}</td>
                    <td className="px-4 py-3 text-fg-muted">{inPlant ? labels.present : labels.absent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ToolbarToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`bio-focus-ring bio-panel rounded-full px-3 py-1.5 text-xs font-medium ${
        active ? "text-accent" : "text-fg-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
