export interface NavLink {
  href: string;
  labelKey: keyof typeof import("@/lib/i18n/strings").ui.en.nav;
  ready: boolean;
}

export const worldLinks: NavLink[] = [
  { href: "/human-body", labelKey: "humanBody", ready: true },
  { href: "/cell-world", labelKey: "cellWorld", ready: true },
  { href: "/genetics", labelKey: "genetics", ready: true },
  { href: "/micro-world", labelKey: "microWorld", ready: true },
  { href: "/plant-biology", labelKey: "plantBiology", ready: true },
  { href: "/neuroscience", labelKey: "neuroscience", ready: true },
  { href: "/ecology", labelKey: "ecology", ready: true },
];

export const labLinks: NavLink[] = [
  { href: "/virtual-lab", labelKey: "virtualLab", ready: true },
  { href: "/virtual-microscope", labelKey: "microscope", ready: true },
];

export const primaryLinks: NavLink[] = [
  { href: "/dictionary", labelKey: "dictionary", ready: true },
  { href: "/quiz", labelKey: "quiz", ready: true },
  { href: "/ai-tutor", labelKey: "aiTutor", ready: true },
  { href: "/dashboard", labelKey: "dashboard", ready: true },
];
