import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

/**
 * The one card shell used everywhere (world portals, dictionary/quiz
 * results, organ grids): a `.bio-panel` surface with a hover lift and an
 * optional per-item accent (a thin top bar + a tinted hover glow keyed to
 * a hex color, e.g. a world or category color) — so every grid in the app
 * shares one visual system instead of each page hand-rolling its own
 * border/hover treatment. Renders as a `Link` when `href` is given,
 * otherwise a plain `div` (e.g. a static info card).
 */
export function BioCard({
  href,
  accent,
  className = "",
  children,
  ariaLabel,
}: {
  href?: string;
  accent?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const style: CSSProperties | undefined = accent ? ({ "--card-glow": accent } as CSSProperties) : undefined;
  const base =
    "bio-panel group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1" +
    (accent ? " hover:shadow-[0_10px_32px_-12px_var(--card-glow)]" : "");
  const interactive = href ? "bio-focus-ring" : "";

  const accentBar = accent ? (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[3px] opacity-80"
      style={{ backgroundColor: accent }}
    />
  ) : null;

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={`${base} ${interactive} ${className}`} style={style}>
        {accentBar}
        {children}
      </Link>
    );
  }

  return (
    <div className={`${base} ${className}`} style={style}>
      {accentBar}
      {children}
    </div>
  );
}
