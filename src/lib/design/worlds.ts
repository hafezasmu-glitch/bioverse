/**
 * Single source of truth for each BioVerse "world"'s visual identity —
 * accent color + icon + homepage card copy + ready state. Both
 * `WorldsGrid` (homepage) and `ComingSoon` (stub pages) key off this so a
 * world's color/icon can't drift between the two, and so giving an
 * unbuilt world its own visual identity (spec: every world should look
 * distinct, not just eight identical gradient tiles) is a one-place edit.
 *
 * Colors are deliberately restrained and mostly green/blue-family (per the
 * "avoid a rainbow" guidance) — each is distinct enough to recognize at a
 * glance, not a full re-theme of the page it's used on. `--accent`/
 * `--accent-2` (cyan/violet) remain the site's two primary brand colors;
 * these are a *third*, per-world layer used only for small accents (an
 * icon badge, a top border, a hover glow) on top of the existing bio-panel
 * system, never as a full section recolor.
 */

import type { ComponentType, SVGProps } from "react";
import {
  HumanBodyIcon,
  CellWorldIcon,
  GeneticsIcon,
  NeuroscienceIcon,
  MicroWorldIcon,
  PlantBiologyIcon,
  VirtualLabIcon,
  EcologyIcon,
} from "@/components/ui/WorldIcons";

export type WorldId =
  | "human-body"
  | "cell-world"
  | "genetics"
  | "micro-world"
  | "plant-biology"
  | "virtual-lab"
  | "ecology"
  | "neuroscience";

export interface WorldMeta {
  id: WorldId;
  href: string;
  title: string;
  bnTitle: string;
  /** Short, homepage-card-length description. */
  description: string;
  bnDescription: string;
  ready: boolean;
  /** Hex accent used for icon color / top accent bar / hover glow. */
  color: string;
  /** Precomputed low-alpha wash of `color`, for badge/icon backgrounds. */
  soft: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const WORLDS: Record<WorldId, WorldMeta> = {
  "human-body": {
    id: "human-body",
    href: "/human-body",
    title: "Human Body Explorer",
    bnTitle: "মানব শরীর",
    description: "Real WebGL 3D anatomy — layers, X-ray, organ hotspots, and Make It Alive animation.",
    bnDescription: "বাস্তব WebGL 3D অ্যানাটমি—স্তর, এক্স-রে, অঙ্গ নির্বাচন ও সচল অ্যানিমেশন।",
    ready: true,
    color: "#22d3ee",
    soft: "rgba(34,211,238,0.14)",
    Icon: HumanBodyIcon,
  },
  "cell-world": {
    id: "cell-world",
    href: "/cell-world",
    title: "Cell World",
    bnTitle: "কোষ জগৎ",
    description: "Explore animal and plant cells in 3D — isolate, label and compare organelles.",
    bnDescription: "3D-তে প্রাণী ও উদ্ভিদকোষের অঙ্গাণু আলাদা করুন, লেবেল দেখুন ও তুলনা করুন।",
    ready: true,
    color: "#34d399",
    soft: "rgba(52,211,153,0.14)",
    Icon: CellWorldIcon,
  },
  genetics: {
    id: "genetics",
    href: "/genetics",
    title: "Genetics Lab",
    bnTitle: "জিনতত্ত্ব",
    description: "A rotating 3D DNA helix and a fully interactive Punnett Square simulator.",
    bnDescription: "ঘূর্ণায়মান 3D DNA হেলিক্স ও কার্যকর Punnett Square সিমুলেটর।",
    ready: true,
    color: "#a78bfa",
    soft: "rgba(167,139,250,0.14)",
    Icon: GeneticsIcon,
  },
  "micro-world": {
    id: "micro-world",
    href: "/micro-world",
    title: "Micro World",
    bnTitle: "অণুজগৎ",
    description: "Bacteria, viruses, and blood cells at microscopic scale.",
    bnDescription: "অণুবীক্ষণিক স্কেলে ব্যাকটেরিয়া, ভাইরাস ও রক্তকণিকার তুলনা।",
    ready: true,
    color: "#2dd4bf",
    soft: "rgba(45,212,191,0.14)",
    Icon: MicroWorldIcon,
  },
  "plant-biology": {
    id: "plant-biology",
    href: "/plant-biology",
    title: "Plant Biology",
    bnTitle: "উদ্ভিদবিজ্ঞান",
    description: "Roots, stems, leaves, and the photosynthesis simulator.",
    bnDescription: "উদ্ভিদের গঠন এবং সালোকসংশ্লেষণের সীমাবদ্ধ উপাদানের সিমুলেশন।",
    ready: true,
    color: "#a3e635",
    soft: "rgba(163,230,53,0.14)",
    Icon: PlantBiologyIcon,
  },
  "virtual-lab": {
    id: "virtual-lab",
    href: "/virtual-lab",
    title: "Virtual Lab",
    bnTitle: "ভার্চুয়াল ল্যাব",
    description: "Guided experiments: diffusion, osmosis, enzyme activity and more.",
    bnDescription: "উদ্দেশ্য, পদ্ধতি, পর্যবেক্ষণ ও উপসংহারসহ নির্দেশিত অভিস্রবণ পরীক্ষা।",
    ready: true,
    color: "#fbbf24",
    soft: "rgba(251,191,36,0.14)",
    Icon: VirtualLabIcon,
  },
  ecology: {
    id: "ecology",
    href: "/ecology",
    title: "Ecology World",
    bnTitle: "বাস্তুবিদ্যা",
    description: "Food webs, energy flow and the carbon and water cycles.",
    bnDescription: "খাদ্যশৃঙ্খল ও ট্রফিক স্তরে শক্তিপ্রবাহের ইন্টারঅ্যাক্টিভ মডেল।",
    ready: true,
    color: "#4ade80",
    soft: "rgba(74,222,128,0.14)",
    Icon: EcologyIcon,
  },
  neuroscience: {
    id: "neuroscience",
    href: "/neuroscience",
    title: "Brain Explorer",
    bnTitle: "স্নায়ুবিজ্ঞান",
    description: "An interactive 3D brain with simplified functional regions.",
    bnDescription: "প্রধান মস্তিষ্ক কাঠামো ও তাদের নেটওয়ার্কভিত্তিক কাজের সতর্ক ব্যাখ্যা।",
    ready: true,
    color: "#60a5fa",
    soft: "rgba(96,165,250,0.14)",
    Icon: NeuroscienceIcon,
  },
};

export const WORLD_LIST: WorldMeta[] = Object.values(WORLDS);
