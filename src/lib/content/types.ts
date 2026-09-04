/**
 * BioVerse content architecture.
 *
 * These types define the shape of every piece of educational content in the
 * platform (organs, body systems, dictionary terms, quizzes, sources, ...).
 * They are intentionally storage-agnostic: today the data behind them lives
 * in plain TypeScript modules under `src/lib/content/data/*`, but every
 * field here is JSON-serializable, so swapping the data layer for a real
 * database (Postgres/Prisma, a headless CMS, etc.) later means writing a
 * fetch layer that returns these same shapes — no UI code has to change.
 */

/** A bilingual string: standard scientific terms are preserved, not translated away. */
export interface Bilingual {
  en: string;
  bn: string;
}

export type EducationLevel = "beginner" | "school" | "ssc" | "advanced";

/**
 * A structured citation. Every non-obvious scientific claim in BioVerse
 * should be traceable to one of these rather than asserted bare.
 */
export interface Source {
  id: string;
  title: string;
  organization: string;
  url: string;
  /** Date the source was published or last updated, if known. ISO 8601. */
  publicationDate?: string;
  /** Date BioVerse content was checked against this source. ISO 8601. */
  accessDate: string;
}

export interface LevelContent {
  beginner?: string;
  school?: string;
  ssc?: string;
  advanced?: string;
}

/** A single clickable hotspot on a 3D model, positioned in model-local space. */
export interface Hotspot {
  id: string;
  label: Bilingual;
  /** [x, y, z] position in the model's local coordinate space. */
  position: [number, number, number];
  /** id of the Organ this hotspot opens. */
  organId: string;
}

export type BodyLayer =
  | "skin"
  | "muscular"
  | "skeletal"
  | "nervous"
  | "circulatory"
  | "respiratory"
  | "digestive"
  | "urinary"
  | "endocrine"
  | "organs";

export interface OrganFacts {
  location: Bilingual;
  structure: Bilingual;
  function: Bilingual;
  importance: Bilingual;
  interestingFact?: Bilingual;
  commonMisconception?: Bilingual;
}

/** A major anatomical structure explorable in the Human Body Explorer. */
export interface Organ {
  slug: string;
  name: Bilingual;
  scientificName?: string;
  pronunciation?: string;
  systemId: string;
  layer: BodyLayer;
  summary: Bilingual;
  facts: OrganFacts;
  levelContent?: LevelContent;
  relatedTermSlugs: string[];
  relatedOrganSlugs: string[];
  quizSlug?: string;
  educationLevel: EducationLevel[];
  sourceIds: string[];
  /** Whether this organ has an "enter" cutaway view / "make it alive" animation available. */
  hasAnimation?: boolean;
}

export interface BodySystem {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  organSlugs: string[];
  sourceIds: string[];
}

export type DictionaryCategory =
  | "cell-biology"
  | "genetics"
  | "anatomy"
  | "physiology"
  | "microbiology"
  | "plant-biology"
  | "ecology"
  | "neuroscience";

/** A single entry in the Biological Dictionary. */
export interface Term {
  slug: string;
  name: Bilingual;
  scientificTerm?: string;
  pronunciation?: string;
  category: DictionaryCategory;
  simpleDefinition: Bilingual;
  detailedExplanation: Bilingual;
  structure?: Bilingual;
  function?: Bilingual;
  location?: Bilingual;
  importance?: Bilingual;
  relatedProcess?: Bilingual;
  synonyms?: string[];
  interestingFact?: Bilingual;
  commonMisconception?: Bilingual;
  examNote?: Bilingual;
  educationLevel: EducationLevel[];
  relatedTermSlugs: string[];
  /** Deep links into the rest of BioVerse. */
  links: {
    organSlug?: string;
    quizSlug?: string;
    systemSlug?: string;
  };
  sourceIds: string[];
}

export interface QuizOption {
  id: string;
  text: Bilingual;
  correct: boolean;
  explanation: Bilingual;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "true-false";
  prompt: Bilingual;
  options: QuizOption[];
}

export interface Quiz {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  educationLevel: EducationLevel[];
  questions: QuizQuestion[];
  relatedOrganSlug?: string;
  sourceIds: string[];
}

/** A guided multi-stop journey through the body (e.g. "Digestive Journey"). */
export interface JourneyStop {
  organSlug: string;
  caption: Bilingual;
}

export interface Journey {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  stops: JourneyStop[];
}

export interface CellOrganelle {
  id: string;
  name: Bilingual;
  cellTypes: Array<"animal" | "plant">;
  summary: Bilingual;
  function: Bilingual;
  position: [number, number, number];
  color: string;
  radius: number;
  shape: "sphere" | "capsule" | "torus" | "blob";
}
