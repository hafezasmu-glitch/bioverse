import type { Source } from "../types";

/**
 * Structured reference library (spec §49).
 *
 * Every URL below was checked to exist at the time this file was written
 * (2026-09-03) before being added here — see the session's research pass.
 * `accessDate` records when BioVerse content was last checked against it.
 * This is a small, hand-picked set backing the sample content shipped in
 * this build; it is designed to grow the same way the rest of the content
 * layer does (see README "Content architecture").
 */
export const sources: Source[] = [
  {
    id: "openstax-ap2e-heart-anatomy",
    title: "19.1 Heart Anatomy — Anatomy and Physiology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-ap2e-respiratory-organs",
    title:
      "22.1 Organs and Structures of the Respiratory System — Anatomy and Physiology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/22-1-organs-and-structures-of-the-respiratory-system",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-ap2e-nervous-tissue",
    title: "12.2 Nervous Tissue — Anatomy and Physiology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-ap2e-ch14-intro",
    title: "Chapter 14 Introduction (The Brain and Cranial Nerves) — Anatomy and Physiology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/14-introduction",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-bio2e-cell-intro",
    title: "Chapter 4 Introduction (The Cell) — Biology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/biology-2e/pages/4-introduction",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-bio2e-cell-summary",
    title: "Chapter 4 Chapter Summary (The Cell) — Biology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/biology-2e/pages/4-chapter-summary",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-bio2e-laws-of-inheritance",
    title: "12.3 Laws of Inheritance — Biology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/biology-2e/pages/12-3-laws-of-inheritance",
    accessDate: "2026-09-03",
  },
  {
    id: "openstax-bio2e-dna-intro",
    title: "Chapter 14 Introduction (DNA Structure and Function) — Biology 2e",
    organization: "OpenStax",
    url: "https://openstax.org/books/biology-2e/pages/14-introduction",
    accessDate: "2026-09-03",
  },
  {
    id: "medlineplus-heart-diseases",
    title: "Heart Diseases",
    organization: "MedlinePlus, U.S. National Library of Medicine (NIH)",
    url: "https://medlineplus.gov/heartdiseases.html",
    accessDate: "2026-09-03",
  },
  {
    id: "medlineplus-neurosciences",
    title: "Neurosciences — MedlinePlus Medical Encyclopedia",
    organization: "MedlinePlus, U.S. National Library of Medicine (NIH)",
    url: "https://medlineplus.gov/ency/article/007456.htm",
    accessDate: "2026-09-03",
  },
];
