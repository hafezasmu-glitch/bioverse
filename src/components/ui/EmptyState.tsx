import type { ReactNode } from "react";

/**
 * Shared "nothing here yet" presentation — search-with-no-results today;
 * written generically enough for favorites/history/saved-lessons lists
 * later, per the design-consistency requirement, without fabricating any
 * of those features now.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="bio-panel mx-auto flex max-w-md flex-col items-center rounded-2xl p-8 text-center">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-fg-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
