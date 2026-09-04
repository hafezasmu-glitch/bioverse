"use client";

import dynamic from "next/dynamic";

const CellWorldExplorer = dynamic(
  () => import("./CellWorldExplorer").then((m) => m.CellWorldExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[50svh] min-h-[360px] w-full animate-pulse items-center justify-center rounded-2xl bg-bg-elevated text-sm text-fg-subtle sm:h-[60vh]">
        Loading Cell World…
      </div>
    ),
  }
);

export { CellWorldExplorer as CellWorldExplorerLazy };
