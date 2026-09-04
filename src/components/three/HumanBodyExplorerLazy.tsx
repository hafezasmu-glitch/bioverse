"use client";

import dynamic from "next/dynamic";

/**
 * `next/dynamic` with `ssr: false` must be invoked from a Client Component
 * in the App Router — this thin wrapper is that boundary, so the actual
 * route page can stay a Server Component (and keep its SEO-friendly
 * server-rendered organ list/metadata) while the heavy Three.js explorer
 * is still only ever loaded in the browser.
 */
const HumanBodyExplorer = dynamic(
  () => import("./HumanBodyExplorer").then((m) => m.HumanBodyExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[70svh] min-h-[440px] w-full animate-pulse items-center justify-center rounded-2xl bg-bg-elevated text-sm text-fg-subtle sm:h-[78vh]">
        Loading Human Body Explorer…
      </div>
    ),
  }
);

export { HumanBodyExplorer as HumanBodyExplorerLazy };
