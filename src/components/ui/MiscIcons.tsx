import type { SVGProps } from "react";
import { Base } from "@/components/ui/WorldIcons";

/** Small general-purpose icon set (not tied to a specific world) —
 * quizzes, search, dictionary/book, and the three CredibilityStrip
 * points — same stroke language as WorldIcons.tsx. */

export function QuizIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1.4 1-1.4 1.9" />
      <circle cx="12" cy="16.3" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20 20" />
    </Base>
  );
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4.5 5.2A2 2 0 0 1 6.5 3.6H12v16.8H6.5a2 2 0 0 0-2 2z" />
      <path d="M19.5 5.2a2 2 0 0 0-2-1.6H12v16.8h5.5a2 2 0 0 1 2 2z" />
    </Base>
  );
}

export function CheckShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 3.4 19 6v5.4c0 4.4-3 7.4-7 8.6-4-1.2-7-4.2-7-8.6V6z" />
      <path d="M8.8 12.1l2 2 4-4.4" />
    </Base>
  );
}

export function GlobeLangIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6c2.4 2.3 3.7 5.3 3.7 8.4s-1.3 6.1-3.7 8.4c-2.4-2.3-3.7-5.3-3.7-8.4s1.3-6.1 3.7-8.4z" />
    </Base>
  );
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 3.6 20 8l-8 4.4L4 8z" />
      <path d="M4 12.4 12 16.8l8-4.4" />
      <path d="M4 16.4 12 20.8l8-4.4" />
    </Base>
  );
}

export function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 3.6v2.3M12 18.1v2.3M20.4 12h-2.3M5.9 12H3.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" />
    </Base>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.8-6-6.8-11.2a6.8 6.8 0 1 1 13.6 0C18.8 15 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.2" />
    </Base>
  );
}

export function LightbulbIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M9 18.3h6" />
      <path d="M9.6 21h4.8" />
      <path d="M12 3.4a5.9 5.9 0 0 0-3.4 10.7c.6.5 1 1.2 1 2v1h4.8v-1c0-.8.4-1.5 1-2A5.9 5.9 0 0 0 12 3.4z" />
    </Base>
  );
}

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 3.6 21 19.4H3z" />
      <path d="M12 9.6v4.4" />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 20l.9-4L16.7 4.2a1.7 1.7 0 0 1 2.4 0l.7.7a1.7 1.7 0 0 1 0 2.4L8 19.1z" />
      <path d="M14.6 6.3l3.1 3.1" />
    </Base>
  );
}

export function ProcessArrowsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4.5 8.5h11.6" />
      <path d="M13 5l3.1 3.5L13 12" />
      <path d="M19.5 15.5H7.9" />
      <path d="M11 12l-3.1 3.5L11 19" />
    </Base>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4.5 12.5l5 5 10-10.5" />
    </Base>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 11v5.4" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}
