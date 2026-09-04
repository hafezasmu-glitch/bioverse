"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Allele = "A" | "a";
type Genotype = "AA" | "Aa" | "aa";

const GENOTYPES: Genotype[] = ["AA", "Aa", "aa"];

function gametes(g: Genotype): [Allele, Allele] {
  return [g[0] as Allele, g[1] as Allele];
}

function combine(a: Allele, b: Allele): Genotype {
  // Convention: dominant (uppercase) allele written first.
  return (a === "A" || b === "A" ? (a === "A" && b === "A" ? "AA" : "Aa") : "aa") as Genotype;
}

function zygosity(g: Genotype): "homozygous dominant" | "heterozygous" | "homozygous recessive" {
  if (g === "AA") return "homozygous dominant";
  if (g === "aa") return "homozygous recessive";
  return "heterozygous";
}

export function PunnettSquare() {
  const [parentA, setParentA] = useState<Genotype>("Aa");
  const [parentB, setParentB] = useState<Genotype>("Aa");
  const [dominantTrait, setDominantTrait] = useState("Purple flowers");
  const [recessiveTrait, setRecessiveTrait] = useState("White flowers");

  const gA = gametes(parentA);
  const gB = gametes(parentB);

  const grid = useMemo(
    () => gA.map((a) => gB.map((b) => combine(a, b))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parentA, parentB]
  );

  const counts = useMemo(() => {
    const flat = grid.flat();
    const AA = flat.filter((g) => g === "AA").length;
    const Aa = flat.filter((g) => g === "Aa").length;
    const aa = flat.filter((g) => g === "aa").length;
    const dominantPhenotype = AA + Aa;
    const recessivePhenotype = aa;
    return { AA, Aa, aa, dominantPhenotype, recessivePhenotype };
  }, [grid]);

  function simplifyRatio(a: number, b: number): string {
    if (a === 0 || b === 0) return `${a}:${b}`;
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const d = gcd(a, b);
    return `${a / d}:${b / d}`;
  }

  return (
    <div className="bio-panel relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-accent-2 opacity-80" />
      <h2 className="text-xl font-bold">Punnett Square Simulator</h2>
      <p className="mt-1 text-sm text-fg-muted">
        A classic Mendelian single-gene cross, using complete dominance. Change either parent&apos;s
        genotype and the grid updates instantly.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <GenotypePicker label="Parent A" value={parentA} onChange={setParentA} />
        <GenotypePicker label="Parent B" value={parentB} onChange={setParentB} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <TraitInput
          label="Dominant trait (A)"
          value={dominantTrait}
          onChange={setDominantTrait}
        />
        <TraitInput
          label="Recessive trait (a)"
          value={recessiveTrait}
          onChange={setRecessiveTrait}
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-1 text-center">
          <thead>
            <tr>
              <th className="h-10 w-16" />
              {gB.map((b, j) => (
                <th key={j} className="h-10 w-16 text-sm font-semibold text-accent-2">
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                <th className="w-16 text-sm font-semibold text-accent-2">{gA[i]}</th>
                {row.map((cellGenotype, j) => (
                  <td
                    key={j}
                    className={`h-16 w-16 rounded-lg border text-sm font-bold ${
                      cellGenotype === "aa"
                        ? "border-fg-subtle/30 bg-fg-subtle/10 text-fg-muted"
                        : "border-accent-2/30 bg-accent-2-soft text-accent-2"
                    }`}
                    title={zygosity(cellGenotype)}
                  >
                    {cellGenotype}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard
          title="Genotype ratio"
          rows={[
            [`AA (homozygous dominant)`, counts.AA],
            [`Aa (heterozygous)`, counts.Aa],
            [`aa (homozygous recessive)`, counts.aa],
          ]}
        />
        <ResultCard
          title="Phenotype ratio"
          rows={[
            [dominantTrait || "Dominant trait", counts.dominantPhenotype],
            [recessiveTrait || "Recessive trait", counts.recessivePhenotype],
          ]}
          ratio={simplifyRatio(counts.dominantPhenotype, counts.recessivePhenotype)}
        />
      </div>

      <div className="mt-6 rounded-xl border border-panel-border p-4 text-xs text-fg-muted">
        <p>
          This model assumes <strong>complete dominance</strong> at a single gene — the pattern
          Gregor Mendel described from his pea plant experiments. Many real human traits (like
          height, skin tone, or eye color) are <strong>polygenic</strong> (influenced by many
          genes) and shaped by environment too, so they don&apos;t follow a simple ratio like this.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["genotype", "phenotype", "allele", "homozygous", "heterozygous"].map((slug) => (
            <Link
              key={slug}
              href={`/dictionary/${slug}`}
              className="bio-focus-ring rounded-full border border-panel-border px-2.5 py-1 capitalize text-fg-muted hover:border-accent-2/40 hover:text-accent-2"
            >
              {slug}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenotypePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Genotype;
  onChange: (g: Genotype) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{label}</label>
      <div className="mt-1.5 flex gap-1.5">
        {GENOTYPES.map((g) => (
          <button
            key={g}
            onClick={() => onChange(g)}
            aria-pressed={value === g}
            className={`bio-focus-ring flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              value === g ? "border-accent-2 bg-accent-2-soft text-accent-2" : "border-panel-border text-fg-muted hover:text-fg"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <p className="mt-1 text-[11px] text-fg-subtle">{zygosity(value)}</p>
    </div>
  );
}

function TraitInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bio-focus-ring mt-1.5 w-full rounded-lg border border-panel-border bg-bg-elevated px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}

function ResultCard({
  title,
  rows,
  ratio,
}: {
  title: string;
  rows: [string, number][];
  ratio?: string;
}) {
  return (
    <div className="rounded-xl border border-panel-border p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-fg-muted">
        {rows.map(([label, count]) => (
          <li key={label} className="flex items-center justify-between gap-2">
            <span>{label}</span>
            <span className="font-mono text-fg">{count} / 4</span>
          </li>
        ))}
      </ul>
      {ratio && <p className="mt-2 text-xs font-semibold text-accent-2">Ratio ≈ {ratio}</p>}
    </div>
  );
}
