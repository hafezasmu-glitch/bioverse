import type { ReactNode } from "react";

const SIZES = {
  sm: "h-8 w-8",
  md: "h-11 w-11",
  lg: "h-14 w-14",
} as const;

/**
 * The rounded, tinted square that houses a world/category icon — reused
 * across world cards, Coming Soon pages, dictionary category chips, and
 * detail-page field icons so the same "icon in a soft color tile" motif
 * reads consistently everywhere instead of being hand-rolled per page.
 */
export function IconTile({
  icon,
  color,
  size = "md",
  className = "",
}: {
  icon: ReactNode;
  color?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl ${SIZES[size]} ${className}`}
      style={
        color
          ? { color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }
          : { color: "var(--accent)", backgroundColor: "var(--accent-soft)" }
      }
    >
      {icon}
    </span>
  );
}
