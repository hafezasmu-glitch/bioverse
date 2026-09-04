"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BASE_COLORS, BASE_NAME } from "./DNAHelix";
import { DNAHelixReal } from "./DNAHelixReal";
import { CanvasLoader } from "./CanvasLoader";
import { Canvas3DBoundary } from "./Canvas3DBoundary";

export function DNAHelixCanvas() {
  const [spin, setSpin] = useState(true);
  const [hover, setHover] = useState<{ base: string; pairBase: string; index: number } | null>(null);

  return (
    <div className="relative h-[56svh] min-h-[400px] w-full overflow-hidden rounded-2xl bg-bg-elevated sm:h-[64vh]">
      <Canvas3DBoundary label="Try reloading the page to view the 3D DNA model.">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 3.4], fov: 45 }} gl={{ antialias: true }}>
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[2, 3, 2]} intensity={1.15} color="#fff7ed" />
          <directionalLight position={[-2, -1, -2]} intensity={0.35} color="#7dd3fc" />
          <Suspense fallback={<CanvasLoader label="Loading DNA model" />}>
            <DNAHelixReal spin={spin} onHoverBase={setHover} />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={1.6} maxDistance={6} makeDefault />
        </Canvas>
      </Canvas3DBoundary>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
        <div className="pointer-events-auto bio-panel flex flex-wrap gap-2 rounded-full px-3 py-1.5 text-[11px]">
          {Object.entries(BASE_NAME).map(([code, name]) => (
            <span key={code} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: BASE_COLORS[code] }} />
              <span className="text-fg-muted">
                {code} = {name}
              </span>
            </span>
          ))}
        </div>
        <button
          onClick={() => setSpin((v) => !v)}
          className="bio-focus-ring bio-panel pointer-events-auto rounded-full px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-fg"
        >
          {spin ? "Stop" : "Rotate"}
        </button>
      </div>

      {hover && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-3 py-1.5 text-xs text-white sm:hidden">
          {BASE_NAME[hover.base]} – {BASE_NAME[hover.pairBase]}
        </div>
      )}
    </div>
  );
}
