import Link from "next/link";
import type { ReactNode } from "react";
import { WORLDS, type WorldId } from "@/lib/design/worlds";
import { IconTile } from "@/components/ui/IconTile";
import { Badge } from "@/components/ui/Badge";

/**
 * Honest placeholder for unbuilt sections (spec §62: no placeholder
 * deception — never a dead button pretending to work). Pass `world` for
 * one of the eight homepage worlds to pick up its icon + accent color
 * from src/lib/design/worlds.ts automatically; for a stub outside that
 * set (AI Tutor, Dashboard, Virtual Microscope) pass `icon`/`color`
 * directly instead. Either way, each unbuilt page reads as its own place
 * — not an identical gray card with different words — without inventing
 * any functionality that isn't actually there yet.
 */
export function ComingSoon({
  title,
  bnTitle,
  description,
  plannedFeatures,
  world,
  icon,
  color,
}: {
  title: string;
  bnTitle: string;
  description: string;
  plannedFeatures: string[];
  world?: WorldId;
  icon?: ReactNode;
  color?: string;
}) {
  const meta = world ? WORLDS[world] : undefined;
  const resolvedColor = meta?.color ?? color;
  const resolvedIcon = meta ? <meta.Icon className="h-8 w-8" /> : icon;

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden px-4 py-20 text-center sm:px-6">
      {resolvedColor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: resolvedColor }}
        />
      )}

      <div className="relative">
        {resolvedIcon && <IconTile icon={resolvedIcon} color={resolvedColor} size="lg" className="mx-auto" />}
        <div className="mt-4">
          <Badge tone={resolvedColor}>Coming Soon</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-1 text-lg text-fg-muted">{bnTitle}</p>
        <p className="mx-auto mt-6 max-w-xl text-fg-muted">{description}</p>

        {plannedFeatures.length > 0 && (
          <div className="bio-panel relative mx-auto mt-8 max-w-md overflow-hidden rounded-2xl p-6 text-left">
            {resolvedColor && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ backgroundColor: resolvedColor }}
              />
            )}
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg-subtle">
              Planned for this {world ? "world" : "page"}
            </h2>
            <ul className="space-y-2 text-sm text-fg-muted">
              {plannedFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: resolvedColor ?? "var(--accent)" }}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href="/"
          className="bio-focus-ring mt-8 inline-block rounded-full border border-panel-border px-5 py-2.5 text-sm font-medium hover:border-accent/50 hover:text-accent"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
