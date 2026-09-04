import type { SVGProps } from "react";

/**
 * Consistent line-art SVG icon set — one per BioVerse "world" — used
 * anywhere a single Unicode glyph used to stand in (homepage world cards,
 * Coming Soon stub pages, nav where relevant). Deliberately NOT emoji and
 * NOT photographic: simple stroke icons (24x24, currentColor stroke) in
 * one consistent visual language, each just distinctive enough to serve
 * as that world's mark. See src/lib/design/worlds.ts for how these pair
 * with each world's accent color.
 */

/** Exported so other icon sets (MiscIcons.tsx) share the exact same
 * stroke/size defaults instead of redefining them. */
export function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function HumanBodyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="4.5" r="2.15" />
      <path d="M12 6.8v6.4" />
      <path d="M12 8.6 7.6 12" />
      <path d="M12 8.6 16.4 12" />
      <path d="M9.3 13.2h5.4" />
      <path d="M12 13.2 8.6 20.2" />
      <path d="M12 13.2 15.4 20.2" />
    </Base>
  );
}

export function CellWorldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.3" />
      <circle cx="10" cy="10.3" r="2.9" fillOpacity={0.15} fill="currentColor" />
      <circle cx="15.6" cy="14.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="15.6" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="9" r="0.7" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function GeneticsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M8 2.2c3 2.5 3 3.6 0 6.1S5 12 8 14.4s3 3.6 0 6.1" transform="translate(0.5 0)" />
      <path d="M16 2.2c-3 2.5-3 3.6 0 6.1s3 3.1 0 5.6-3 3.6 0 6.1" transform="translate(-0.5 0)" />
      <path d="M9.2 5.1h5.6" />
      <path d="M8.5 11.3h7" />
      <path d="M9.2 17.5h5.6" />
    </Base>
  );
}

export function NeuroscienceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="9" cy="9.2" r="2.3" />
      <path d="M7.3 7.5 5 5.2" />
      <path d="M6.7 9.2H3.8" />
      <path d="M7.4 11 5.3 13.4" />
      <path d="M11.2 9.2H18" />
      <path d="M18 9.2 20.3 7" />
      <path d="M18 9.2 20.3 11.4" />
      <path d="M9 11.5v7.3" />
    </Base>
  );
}

/** An amoeba-like microorganism — Micro World is about the organisms
 * themselves (bacteria/viruses/blood cells), not the instrument that
 * views them (that's VirtualMicroscopeIcon, below). */
export function MicroWorldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <ellipse cx="10.5" cy="12.5" rx="6.6" ry="3.2" transform="rotate(-20 10.5 12.5)" />
      <circle cx="8.7" cy="11.6" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.1" r="0.75" fill="currentColor" stroke="none" />
      <path d="M17.2 9 Q19 7.9 20.8 9.4" />
      <path d="M18 12 Q19.9 11.6 21 13.1" />
      <path d="M17.3 14.9 Q18.7 15.9 19.1 17.5" />
    </Base>
  );
}

/** The instrument, for Virtual Microscope — distinct from MicroWorldIcon
 * above (the organisms it's used to view). */
export function VirtualMicroscopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6.2 21h9.2" />
      <path d="M10.4 21v-3.6" />
      <path d="M7 17.4h6.8" />
      <path d="M14.4 3.4 17 6" />
      <path d="M14.9 5.9 9.6 13.6" />
      <circle cx="8.4" cy="15" r="1.55" />
    </Base>
  );
}

export function AiTutorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4 3.5V15.5H6.5a2 2 0 0 1-2-2z" />
      <circle cx="9.2" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="10" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function DashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 16v-4.5" />
      <path d="M12 16V8" />
      <path d="M16 16v-7" />
    </Base>
  );
}

export function PlantBiologyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 2.8c4.6 1 7.4 4.6 7.4 9 0 4.6-3.5 8-7.4 8s-7.4-3.4-7.4-8c0-4.4 2.8-8 7.4-9z" />
      <path d="M12 4.4v16.4" />
      <path d="M12 8.4 8.3 11.2" />
      <path d="M12 8.4 15.7 11.2" />
      <path d="M12 13.6 9 16.1" />
      <path d="M12 13.6 15 16.1" />
    </Base>
  );
}

export function VirtualLabIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M9.3 2.8h5.4" />
      <path d="M10.3 2.8v5.6l-4.6 8.2a1.9 1.9 0 0 0 1.66 2.84h9.4a1.9 1.9 0 0 0 1.66-2.84l-4.6-8.2V2.8" />
      <path d="M7.6 14.6h8.8" />
      <circle cx="10.2" cy="17.6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.6" cy="16.6" r="0.45" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function EcologyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 4.3a7.7 7.7 0 0 1 6.5 3.6" />
      <path d="M17.3 6.4 19 7.9l.5-2.3" />
      <path d="M19.6 10.9a7.7 7.7 0 0 1-3.2 7.1" />
      <path d="M18.6 16.4l.4 2.3 2.2-.9" />
      <path d="M9.7 19.7A7.7 7.7 0 0 1 5.5 12.6" />
      <path d="M7.6 16.9l-2.3.3 1 2.1" />
      <circle cx="12" cy="12" r="1.7" />
    </Base>
  );
}
