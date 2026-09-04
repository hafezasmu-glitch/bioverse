"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CellScene } from "./CellScene";
import { CanvasLoader } from "./CanvasLoader";
import { Canvas3DBoundary } from "./Canvas3DBoundary";
import { getCellOrganelles } from "@/lib/content";

export function CellCanvas({
  cellType,
  selectedId,
  hoveredId,
  isolateId,
  showAllLabels,
  spin,
  lang,
  onSelect,
  onHover,
  heightClass = "h-[50svh] min-h-[360px] sm:h-[60vh]",
}: {
  cellType: "animal" | "plant";
  selectedId: string | null;
  hoveredId: string | null;
  isolateId: string | null;
  showAllLabels: boolean;
  spin: boolean;
  lang: "en" | "bn";
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  heightClass?: string;
}) {
  const organelles = getCellOrganelles(cellType);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-bg-elevated ${heightClass}`}>
      <Canvas3DBoundary label="Try reloading the page, or view Cell World on a more capable device/browser.">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [3.2, 1.6, 3.2], fov: 45 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 4, 2]} intensity={1} />
          <directionalLight position={[-3, -1, -2]} intensity={0.3} />
          <Suspense fallback={<CanvasLoader label={`Loading ${cellType} cell`} />}>
            <CellScene
              organelles={organelles}
              selectedId={selectedId}
              hoveredId={hoveredId}
              isolateId={isolateId}
              showAllLabels={showAllLabels}
              spin={spin}
              lang={lang}
              onSelect={onSelect}
              onHover={onHover}
            />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={1.5} maxDistance={7} makeDefault />
        </Canvas>
      </Canvas3DBoundary>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        {cellType === "animal" ? "Animal Cell" : "Plant Cell"}
      </span>
    </div>
  );
}
