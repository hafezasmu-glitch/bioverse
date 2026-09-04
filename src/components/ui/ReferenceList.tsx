import { getSourcesByIds } from "@/lib/content";

/**
 * Structured references block (spec §49): statement → source id → title,
 * organization, URL, dates. Renders nothing if there are no sources yet,
 * rather than fabricating one.
 */
export function ReferenceList({ sourceIds, lastReviewed }: { sourceIds: string[]; lastReviewed?: string }) {
  const sources = getSourcesByIds(sourceIds);
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby="references-heading" className="mt-10 border-t border-panel-border pt-6">
      <h2 id="references-heading" className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">
        Sources &amp; References
      </h2>
      <ul className="mt-3 space-y-2">
        {sources.map((s) => (
          <li key={s.id} className="text-sm text-fg-muted">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-focus-ring text-accent hover:underline"
            >
              {s.title}
            </a>
            <span> — {s.organization}</span>
            {s.publicationDate && <span> · Published {s.publicationDate}</span>}
            <span> · Accessed {s.accessDate}</span>
          </li>
        ))}
      </ul>
      {lastReviewed && (
        <p className="mt-3 text-xs text-fg-subtle">Last reviewed: {lastReviewed}</p>
      )}
    </section>
  );
}
