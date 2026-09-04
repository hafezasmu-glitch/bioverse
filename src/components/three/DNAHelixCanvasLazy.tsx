"use client";

import dynamic from "next/dynamic";

const DNAHelixCanvas = dynamic(() => import("./DNAHelixCanvas").then((m) => m.DNAHelixCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-[56svh] min-h-[400px] w-full animate-pulse items-center justify-center rounded-2xl bg-bg-elevated text-sm text-fg-subtle sm:h-[64vh]">
      Loading DNA model…
    </div>
  ),
});

export { DNAHelixCanvas as DNAHelixCanvasLazy };
