"use client";

import { Html, useProgress } from "@react-three/drei";

/** Meaningful loading progress for heavy 3D assets (spec §43). */
export function CanvasLoader({ label }: { label: string }) {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex w-56 flex-col items-center gap-3 text-center">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all"
            style={{ width: `${Math.max(6, progress)}%` }}
          />
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">
          {label} · {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}
