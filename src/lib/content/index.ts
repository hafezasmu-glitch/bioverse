import { organs } from "./data/organs";
import { bodySystems } from "./data/systems";
import { terms } from "./data/terms";
import { quizzes } from "./data/quizzes";
import { sources } from "./data/sources";
import { cellOrganelles } from "./data/cellOrganelles";
import type { Organ, BodySystem, Term, Quiz, Source, DictionaryCategory } from "./types";

/**
 * Query layer over the content data. UI components should import from
 * here, not from `./data/*` directly — that keeps a future swap to a real
 * database (Prisma/Postgres, a CMS, etc.) to this one file.
 */

export function getAllOrgans(): Organ[] {
  return organs;
}

export function getOrgan(slug: string): Organ | undefined {
  return organs.find((o) => o.slug === slug);
}

export function getSystem(slug: string): BodySystem | undefined {
  return bodySystems.find((s) => s.slug === slug);
}

export function getAllSystems(): BodySystem[] {
  return bodySystems;
}

export function getAllTerms(): Term[] {
  return terms;
}

export function getTerm(slug: string): Term | undefined {
  return terms.find((t) => t.slug === slug);
}

export function getTermsByCategory(category: DictionaryCategory): Term[] {
  return terms.filter((t) => t.category === category);
}

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

/** Simple bilingual substring + light fuzzy search across name/definition fields. */
export function searchTerms(query: string): Term[] {
  const q = normalize(query);
  if (!q) return [];
  return terms.filter((t) => {
    const haystacks = [
      t.name.en,
      t.name.bn,
      t.scientificTerm ?? "",
      t.simpleDefinition.en,
      t.simpleDefinition.bn,
      ...(t.synonyms ?? []),
    ].map(normalize);
    return haystacks.some((h) => h.includes(q) || levenshteinClose(h, q));
  });
}

/** Very small typo-tolerance check: true if q is within edit distance 1 of any word in h. */
function levenshteinClose(h: string, q: string): boolean {
  if (q.length < 4) return false;
  const words = h.split(/\s+/);
  return words.some((w) => editDistance(w, q) <= 1);
}

function editDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

export function getAllQuizzes(): Quiz[] {
  return quizzes;
}

export function getQuiz(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getSourcesByIds(ids: string[]): Source[] {
  return sources.filter((s) => ids.includes(s.id));
}

export function getAllSources(): Source[] {
  return sources;
}

export function getCellOrganelles(cellType: "animal" | "plant") {
  return cellOrganelles.filter((o) => o.cellTypes.includes(cellType));
}

export { organs, bodySystems, terms, quizzes, sources, cellOrganelles };
