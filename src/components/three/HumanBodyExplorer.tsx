"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { HumanFigure, type LayerVisibility } from "./HumanFigure";
import { FocusController } from "./FocusController";
import { CanvasLoader } from "./CanvasLoader";
import { Canvas3DBoundary } from "./Canvas3DBoundary";
import { OrganDetailPanel } from "./OrganDetailPanel";
import { organCenter } from "./humanBodyLayout";
import { getAllOrgans } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Suspense } from "react";

export function HumanBodyExplorer({ initialFocus }: { initialFocus?: string }) {
  const { lang, t } = useLanguage();
  const organs = getAllOrgans();
  const organsBySlug = useMemo(() => Object.fromEntries(organs.map((o) => [o.slug, o])), [organs]);
  const copy = lang === "bn"
    ? { skin: "ত্বক", skeletal: "কঙ্কাল", muscles: "পেশি", organs: "অঙ্গসমূহ", fullscreen: "পূর্ণস্ক্রিন চালু বা বন্ধ করুন", xray: "এক্স-রে স্বচ্ছতা", instructions: "ঘোরাতে টানুন · জুম করতে স্ক্রল করুন · জানতে কোনো অঙ্গ নির্বাচন করুন", error: "পাতাটি পুনরায় লোড করুন অথবা আরও সক্ষম ডিভাইস/ব্রাউজারে মানবদেহ পাতাটি খুলুন।", loading: "মানবদেহের অঙ্গসংস্থান লোড হচ্ছে" }
    : { skin: "Skin", skeletal: "Skeleton", muscles: "Muscles", organs: "Organs", fullscreen: "Toggle fullscreen", xray: "X-ray transparency", instructions: "Drag to rotate · Scroll to zoom · Select an organ to learn more", error: "Try reloading the page, or open the Human Body page on a more capable device/browser.", loading: "Loading human anatomy" };

  const [layers, setLayers] = useState<LayerVisibility>({ skin: true, skeletal: false, muscles: false, organs: true });
  const [xray, setXray] = useState(0);
  const [explode, setExplode] = useState(0);
  const [alive, setAlive] = useState(false);
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(initialFocus ?? null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);
  const [isolate, setIsolate] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    if (initialFocus) return;
    const focus = new URLSearchParams(window.location.search).get("focus");
    if (!focus || !organsBySlug[focus]) return;
    const timer = window.setTimeout(() => setSelectedOrgan(focus), 0);
    return () => window.clearTimeout(timer);
  }, [initialFocus, organsBySlug]);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Adaptive quality scaling (mobile-performance requirement): drei's
  // PerformanceMonitor reports a 0..1 `factor` derived from measured frame
  // timing (1 = comfortably hitting the refresh rate, 0 = struggling).
  // There are no bitmap textures in this scene to drop resolution on (see
  // /public/models/LICENSES.md — no compliant texture set was available),
  // so the equivalent lever here is render/render-target resolution: pixel
  // ratio (device resolution), the contact-shadow render target, and the
  // baked environment cubemap all scale down together on slower devices
  // instead of the frame rate just quietly tanking.
  const [perfFactor, setPerfFactor] = useState(1);
  const onPerfChange = useCallback(({ factor }: { factor: number }) => setPerfFactor(factor), []);
  const dpr = useMemo<[number, number]>(() => [1, Math.max(1, 1 + 0.75 * perfFactor)], [perfFactor]);
  const shadowResolution = perfFactor > 0.6 ? 512 : perfFactor > 0.3 ? 256 : 128;
  const envResolution = perfFactor > 0.5 ? 64 : 32;
  const showContactShadows = perfFactor > 0.12;

  const focusPoint = selectedOrgan ? organCenter(selectedOrgan) : null;
  const isolateOrganId = isolate ? selectedOrgan : null;

  function selectOrgan(slug: string) {
    setSelectedOrgan(slug);
  }

  function closePanel() {
    setSelectedOrgan(null);
    setIsolate(false);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[70svh] min-h-[440px] w-full overflow-hidden rounded-2xl bg-bg-elevated sm:h-[78vh]"
    >
      <Canvas3DBoundary label={copy.error}>
        <Canvas
          shadows={false}
          dpr={dpr}
          camera={{ position: [0, 1.2, 2.6], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
        >
          <color attach="background" args={["transparent"]} />
          <PerformanceMonitor onChange={onPerfChange} flipflops={3} bounds={() => [40, 58]} />

          {/* Physically-plausible three-point lighting: a warm key light
              standing in for an overhead exam light, a cool fill from the
              opposite side, and a soft rim for edge/depth separation —
              plus a low ambient floor so shadowed skin never goes flat
              black. Kept deliberately soft/low-contrast: a "medical atlas"
              read wants even, legible illumination, not dramatic shadow. */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[2.2, 4.5, 3.2]} intensity={1.6} color="#fff4e8" />
          <directionalLight position={[-2.5, 1.5, -2]} intensity={0.45} color="#dce8ff" />
          <directionalLight position={[0, 3, -3.5]} intensity={0.35} color="#ffffff" />

          {/* Procedural studio-softbox environment (no external HDR/CDN
              fetch — this sandbox can't reliably reach most asset hosts,
              and it keeps the bundle self-contained anyway): gives PBR
              materials real reflections/specular response to shape
              themselves against instead of reading as flat matte cutouts.
              `frames={1}` bakes it once since the rig is static. */}
          <Environment resolution={envResolution} frames={1}>
            <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 4, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[6, 6, 1]} />
            <Lightformer form="rect" intensity={0.6} color="#dbe6ff" position={[-4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[4, 4, 1]} />
            <Lightformer form="rect" intensity={0.6} color="#fff1e0" position={[4, 1.2, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 4, 1]} />
            <Lightformer form="rect" intensity={0.25} color="#241f1c" position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[6, 6, 1]} />
          </Environment>

          <Suspense fallback={<CanvasLoader label={copy.loading} />}>
            <HumanFigure
              layers={layers}
              xray={xray}
              explode={explode}
              alive={alive}
              isolateOrganId={isolateOrganId}
              selectedOrganId={selectedOrgan}
              hoveredOrganId={hoveredOrgan}
              onSelectOrgan={selectOrgan}
              onHoverOrgan={setHoveredOrgan}
              organsBySlug={organsBySlug}
              lang={lang}
            />
          </Suspense>

          {/* Contact/depth cue: a soft, procedural blurred ground shadow
              under the figure's feet — no real shadow-mapped lights (which
              `shadows={false}` above deliberately avoids for mobile perf),
              just a cheap extra render pass that scales with perfFactor.
              Left continuously updating (no `frames` cap) since which
              layers are visible changes at runtime (toolbar toggles) and a
              baked-once shadow would go stale when they do; resolution is
              the lever that scales down for perf instead. */}
          {showContactShadows && (
            <ContactShadows
              position={[0, 0.003, 0]}
              opacity={0.5}
              scale={3}
              blur={2.6}
              far={1.1}
              resolution={shadowResolution}
              color="#000000"
            />
          )}

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={0.5}
            maxDistance={4}
            minPolarAngle={Math.PI * 0.15}
            maxPolarAngle={Math.PI * 0.85}
            makeDefault
          />
          <FocusController controlsRef={controlsRef} focusPoint={focusPoint} resetSignal={resetSignal} />
        </Canvas>
      </Canvas3DBoundary>

      {/* Toolbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-wrap items-start justify-between gap-2 p-3 sm:p-4">
        <div className="pointer-events-auto bio-panel flex flex-wrap items-center gap-1.5 rounded-full p-1.5">
          {(["skin", "skeletal", "muscles", "organs"] as const).map((layerKey) => (
            <button
              key={layerKey}
              onClick={() => setLayers((l) => ({ ...l, [layerKey]: !l[layerKey] }))}
              aria-pressed={layers[layerKey]}
              className={`bio-focus-ring rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                layers[layerKey] ? "bg-accent text-bg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {copy[layerKey]}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              setExplode((v) => (v > 0 ? 0 : 1));
            }}
            aria-pressed={explode > 0}
            className={`bio-focus-ring bio-panel rounded-full px-3 py-1.5 text-xs font-medium ${explode > 0 ? "text-accent" : "text-fg-muted"}`}
          >
            {explode > 0 ? t.common.assemble : t.common.explode}
          </button>
          <button
            onClick={() => setAlive((v) => !v)}
            aria-pressed={alive}
            className={`bio-focus-ring bio-panel rounded-full px-3 py-1.5 text-xs font-medium ${alive ? "text-accent" : "text-fg-muted"}`}
          >
            {alive ? `■ ${t.common.stop}` : `▶ ${t.common.makeItAlive}`}
          </button>
          <button
            onClick={() => {
              setSelectedOrgan(null);
              setIsolate(false);
              setExplode(0);
              setXray(0);
              setResetSignal((s) => s + 1);
            }}
            className="bio-focus-ring bio-panel rounded-full px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-fg"
          >
            {t.common.reset}
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label={copy.fullscreen}
            className="bio-focus-ring bio-panel rounded-full px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-fg"
          >
            ⛶
          </button>
        </div>
      </div>

      {/* X-ray slider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:p-4">
        <div className="pointer-events-auto bio-panel flex w-full max-w-md items-center gap-3 rounded-full px-4 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">{t.common.normal}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={xray}
            onChange={(e) => setXray(Number(e.target.value))}
            aria-label={copy.xray}
            className="w-full accent-[var(--accent)]"
          />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">{t.common.xray}</span>
        </div>
      </div>

      {selectedOrgan && organsBySlug[selectedOrgan] && (
        <>
          <OrganDetailPanel organ={organsBySlug[selectedOrgan]} onClose={closePanel} />
          <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 sm:bottom-4 sm:left-4 sm:translate-x-0">
            <button
              onClick={() => setIsolate((v) => !v)}
              className="bio-focus-ring bio-panel pointer-events-auto rounded-full px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-fg"
              aria-pressed={isolate}
            >
              {isolate ? t.common.showAll : t.common.isolate}
            </button>
          </div>
        </>
      )}

      <p className="pointer-events-none absolute left-3 top-1/2 hidden max-w-[110px] -translate-y-1/2 text-[10px] leading-tight text-fg-subtle sm:block">
        {copy.instructions}
      </p>
    </div>
  );
}
