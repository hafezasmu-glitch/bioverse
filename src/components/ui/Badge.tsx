import type { ReactNode } from "react";

/**
 * Small colored pill — category chips, "Coming Soon" markers, system
 * badges. `tone` is a hex accent (from a category/world color map); when
 * omitted it renders the neutral gray variant already used for "Coming
 * Soon" pills. `color-mix()` derives soft background/border tints from a
 * single hex so callers don't have to precompute rgba() pairs by hand.
 */
export function Badge({
  children,
  tone,
  className = "",
}: {
  children: ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
        tone ? "" : "border-panel-border bg-fg-subtle/10 text-fg-subtle"
      } ${className}`}
      style={
        tone
          ? {
              color: tone,
              backgroundColor: `color-mix(in srgb, ${tone} 16%, transparent)`,
              borderColor: `color-mix(in srgb, ${tone} 32%, transparent)`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
