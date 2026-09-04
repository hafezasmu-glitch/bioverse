/**
 * Color/label map for the Biological Dictionary's 8 categories — reuses
 * each matching world's color where one exists (cell-biology↔Cell World,
 * genetics↔Genetics Lab, anatomy↔Human Body, microbiology↔Micro World,
 * plant-biology/ecology/neuroscience↔their worlds) so a term's category
 * badge and "Explore the 3D world" link feel like the same color system,
 * not two unrelated palettes. `physiology` has no matching world, so it
 * gets the spec's explicit "warm red for circulation/heart" instead.
 */
import type { DictionaryCategory } from "@/lib/content/types";
import { WORLDS } from "@/lib/design/worlds";

export interface CategoryMeta {
  label: string;
  color: string;
}

export const CATEGORY_META: Record<DictionaryCategory, CategoryMeta> = {
  "cell-biology": { label: "Cell Biology", color: WORLDS["cell-world"].color },
  genetics: { label: "Genetics", color: WORLDS.genetics.color },
  anatomy: { label: "Anatomy", color: WORLDS["human-body"].color },
  physiology: { label: "Physiology", color: "#f87171" },
  microbiology: { label: "Microbiology", color: WORLDS["micro-world"].color },
  "plant-biology": { label: "Plant Biology", color: WORLDS["plant-biology"].color },
  ecology: { label: "Ecology", color: WORLDS.ecology.color },
  neuroscience: { label: "Neuroscience", color: WORLDS.neuroscience.color },
};

export const CATEGORY_LIST: (DictionaryCategory | "all")[] = [
  "all",
  "cell-biology",
  "genetics",
  "anatomy",
  "physiology",
  "microbiology",
  "plant-biology",
  "ecology",
  "neuroscience",
];
