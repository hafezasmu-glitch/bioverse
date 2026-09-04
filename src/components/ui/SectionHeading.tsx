/**
 * Consistent section header — eyebrow + title + subtitle — for every
 * major page/section so heading hierarchy and spacing stop being
 * reinvented per component.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className={`mt-2 text-fg-muted ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
