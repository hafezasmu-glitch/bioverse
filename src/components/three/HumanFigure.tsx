"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { organMeshes, organMeshCenter, body } from "./humanBodyLayout";
import { findRealOrganNodes } from "./realOrganNodes";
import { processSkeletonScene, processMuscleScene, processSkinScene, applyLayerMaterial } from "./realBodyProcessing";
import { useSmoothedValue } from "./useSmoothedValue";
import { ORGANS_GLB_URL, SKELETON_GLB_URL, MUSCLES_GLB_URL, SKIN_GLB_URL, DRACO_DECODER_PATH } from "@/lib/assets/anatomyAssets";
import type { Organ } from "@/lib/content/types";

// organs.glb is plain (uncompressed) glTF; skeleton.glb/muscles.glb/skin.glb
// are Draco-compressed (decoded locally via /public/draco/, no CDN). Skin is
// visible by default, so it preloads eagerly like organs; skeleton/muscles
// only load once their (off-by-default) toolbar toggle is switched on — see
// LayerVisibility below.
useGLTF.preload(ORGANS_GLB_URL, false);
useGLTF.preload(SKIN_GLB_URL, DRACO_DECODER_PATH);
useGLTF.preload(SKELETON_GLB_URL, DRACO_DECODER_PATH);
useGLTF.preload(MUSCLES_GLB_URL, DRACO_DECODER_PATH);

export interface LayerVisibility {
  skin: boolean;
  skeletal: boolean;
  muscles: boolean;
  organs: boolean;
}

interface HumanFigureProps {
  layers: LayerVisibility;
  xray: number; // 0 = normal, 1 = full x-ray
  explode: number; // 0 = assembled, 1 = fully exploded
  alive: boolean;
  isolateOrganId: string | null;
  selectedOrganId: string | null;
  hoveredOrganId: string | null;
  onSelectOrgan: (slug: string) => void;
  onHoverOrgan: (slug: string | null) => void;
  organsBySlug: Record<string, Organ>;
  lang: "en" | "bn";
}

/**
 * Medically-motivated, per-organ material differentiation. Real organs
 * differ in how wet/fibrous/smooth they read — a single flat preset for
 * "every organ" is what made the layer look generic. These are
 * physically-plausible shading parameters (roughness/sheen/clearcoat), not
 * photographic surface detail — no texture data exists to derive exact
 * values from (see `/public/models/LICENSES.md`), so anatomical clarity
 * (silhouette, color, position — all unchanged) stays the source of truth,
 * not the material.
 */
interface OrganMaterialParams {
  roughness: number;
  metalness: number;
  sheen: number;
  sheenRoughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
}

const DEFAULT_ORGAN_MATERIAL: OrganMaterialParams = {
  roughness: 0.42,
  metalness: 0.04,
  sheen: 0.12,
  sheenRoughness: 0.5,
  clearcoat: 0.06,
  clearcoatRoughness: 0.45,
  envMapIntensity: 0.55,
};

const ORGAN_MATERIAL_OVERRIDES: Record<string, Partial<OrganMaterialParams>> = {
  // Moist, gyral surface — soft sheen, no hard specular.
  brain: { roughness: 0.48, sheen: 0.22, sheenRoughness: 0.45, clearcoat: 0.1, clearcoatRoughness: 0.4 },
  // Wet muscular surface — the most reflective organ, but still not glossy.
  heart: { roughness: 0.36, sheen: 0.28, sheenRoughness: 0.42, clearcoat: 0.14, clearcoatRoughness: 0.35 },
  // Spongy, matte — the least reflective organ tissue.
  lungs: { roughness: 0.55, sheen: 0.08, clearcoat: 0.03, envMapIntensity: 0.45 },
  // Smooth, glistening capsule.
  liver: { roughness: 0.4, sheen: 0.16, clearcoat: 0.12, clearcoatRoughness: 0.38 },
  kidney_l: { roughness: 0.38, sheen: 0.18, clearcoat: 0.12 },
  kidney_r: { roughness: 0.38, sheen: 0.18, clearcoat: 0.12 },
  stomach: { roughness: 0.5, sheen: 0.12, clearcoat: 0.06 },
};

function organMaterialParams(organId: string): OrganMaterialParams {
  return { ...DEFAULT_ORGAN_MATERIAL, ...ORGAN_MATERIAL_OVERRIDES[organId] };
}

const TORSO_CENTER = new THREE.Vector3(0, 1.15, 0);
// The real skeleton/muscle GLBs get fit into the same standing-figure frame
// the procedural skin mesh already uses (see humanBodyLayout.ts): feet at
// y=0, top of head at headCenter.y + headRadius.
const BODY_TARGET_HEIGHT = body.headCenter[1] + body.headRadius;
const BODY_FEET_Y = 0;

export function HumanFigure({
  layers,
  xray,
  explode,
  alive,
  isolateOrganId,
  selectedOrganId,
  hoveredOrganId,
  onSelectOrgan,
  onHoverOrgan,
  organsBySlug,
  lang,
}: HumanFigureProps) {
  const smoothXray = useSmoothedValue(xray, 0.12);
  const smoothExplode = useSmoothedValue(explode, 0.08);
  const skinOpacity = THREE.MathUtils.lerp(0.97, 0.05, smoothXray);
  const skeletonOpacity = THREE.MathUtils.lerp(0, 0.85, Math.max(0, (smoothXray - 0.15) / 0.85));
  const organOpacity = isolateOrganId ? 1 : THREE.MathUtils.lerp(0.04, 1, smoothXray);

  const showSkin = layers.skin && !isolateOrganId;
  const showSkeleton = layers.skeletal && !isolateOrganId;
  const showMuscles = layers.muscles && !isolateOrganId;
  const showOrgans = layers.organs;

  return (
    <group>
      {showSkin && <RealSkinLayer opacity={skinOpacity} />}
      {showSkeleton && <RealSkeletonLayer opacity={skeletonOpacity} />}
      {showMuscles && <RealMusclesLayer opacity={0.92} />}
      {showOrgans && (
        <OrgansLayer
          opacity={organOpacity}
          explode={smoothExplode}
          alive={alive}
          isolateOrganId={isolateOrganId}
          selectedOrganId={selectedOrganId}
          hoveredOrganId={hoveredOrganId}
          onSelectOrgan={onSelectOrgan}
          onHoverOrgan={onHoverOrgan}
          organsBySlug={organsBySlug}
          lang={lang}
        />
      )}
      {alive && !isolateOrganId && <CirculationLoop />}
    </group>
  );
}

/**
 * Real external body surface, loaded from skin.glb — the MakeHuman base
 * mesh (CC0; see /public/models/LICENSES.md), a neutral, anatomically-
 * proportioned full-body mesh built for exactly this purpose. Fit into the
 * same body frame as the skeleton/muscles/organs. Visual-only layer
 * (opacity driven by the X-ray slider, same as before) — no per-part
 * selection, matching the original layer's behavior.
 */
function RealSkinLayer({ opacity }: { opacity: number }) {
  const { scene } = useGLTF(SKIN_GLB_URL, DRACO_DECODER_PATH);
  const processed = useMemo(
    () => processSkinScene(scene, BODY_TARGET_HEIGHT, BODY_FEET_Y),
    [scene]
  );
  useEffect(() => {
    // Skin: mostly matte (roughness stays high — real skin is not shiny),
    // with a very slight clearcoat to read as a living, faintly moist
    // surface under specular/IBL light instead of a flat, chalky one.
    // metalness 0 and a small clearcoat/roughness gap are what keeps this
    // from tipping into "plastic mannequin."
    applyLayerMaterial(processed, "#e8b894", opacity, {
      roughness: 0.58,
      metalness: 0,
      clearcoat: 0.035,
      clearcoatRoughness: 0.65,
      envMapIntensity: 0.55,
    });
  }, [processed, opacity]);
  return <primitive object={processed} />;
}

/**
 * Real skeleton, loaded from skeleton.glb (BodyParts3D via HuBMAP-adjacent
 * export, CC BY-SA — see /public/models/LICENSES.md), mirrored to a full
 * bilateral skeleton and fit into the same body frame as the skin/organs.
 * Visual-only layer (opacity driven by the X-ray slider, same as before) —
 * no per-bone selection, matching the original layer's behavior.
 */
function RealSkeletonLayer({ opacity }: { opacity: number }) {
  const { scene } = useGLTF(SKELETON_GLB_URL, DRACO_DECODER_PATH);
  const processed = useMemo(
    () => processSkeletonScene(scene, BODY_TARGET_HEIGHT, BODY_FEET_Y),
    [scene]
  );
  useEffect(() => {
    // Bone: dry, chalky, low-reflectance — no clearcoat/sheen at all, and a
    // lower envMapIntensity than the wetter tissue layers so it doesn't
    // pick up bright studio reflections real bone wouldn't show.
    applyLayerMaterial(processed, "#f2f0e6", opacity, {
      roughness: 0.62,
      metalness: 0,
      envMapIntensity: 0.35,
    });
  }, [processed, opacity]);
  return <primitive object={processed} />;
}

/**
 * Real muscles, loaded from muscles.glb (same BodyParts3D source/license as
 * the skeleton). This is a new layer — the original build only had
 * Skin/Skeletal/Organs — added because the spec explicitly asked for
 * "separately controllable systems where available," and real muscle
 * data is available. Off by default; see the toolbar in
 * HumanBodyExplorer.tsx.
 */
function RealMusclesLayer({ opacity }: { opacity: number }) {
  const { scene } = useGLTF(MUSCLES_GLB_URL, DRACO_DECODER_PATH);
  const processed = useMemo(
    () => processMuscleScene(scene, BODY_TARGET_HEIGHT, BODY_FEET_Y),
    [scene]
  );
  useEffect(() => {
    // Muscle: fibrous and wetter than skin/bone — a soft `sheen` (fabric-
    // like grazing highlight, good for fibrous surfaces) plus a small
    // clearcoat reads as living tissue without any single highlight being
    // glossy on its own.
    applyLayerMaterial(processed, "#9c3b3b", opacity, {
      roughness: 0.46,
      metalness: 0.02,
      sheen: 0.12,
      sheenRoughness: 0.55,
      sheenColor: "#4a1414",
      clearcoat: 0.05,
      clearcoatRoughness: 0.5,
      envMapIntensity: 0.5,
    });
  }, [processed, opacity]);
  return <primitive object={processed} />;
}

function OrgansLayer({
  opacity,
  explode,
  alive,
  isolateOrganId,
  selectedOrganId,
  hoveredOrganId,
  onSelectOrgan,
  onHoverOrgan,
  organsBySlug,
  lang,
}: {
  opacity: number;
  explode: number;
  alive: boolean;
  isolateOrganId: string | null;
  selectedOrganId: string | null;
  hoveredOrganId: string | null;
  onSelectOrgan: (slug: string) => void;
  onHoverOrgan: (slug: string | null) => void;
  organsBySlug: Record<string, Organ>;
  lang: "en" | "bn";
}) {
  // organs.glb: real, anatomically-labeled organ meshes (brain, heart,
  // lung, liver, kidney_l/r, ...) from the HuBMAP Human Reference Atlas —
  // see realOrganNodes.ts for the node→organ mapping and
  // /public/models/LICENSES.md for the license (CC BY 4.0).
  const { scene: organsScene } = useGLTF(ORGANS_GLB_URL, false);

  return (
    <group>
      {organMeshes.map((spec) => {
        if (isolateOrganId && spec.organId !== isolateOrganId) return null;
        const organ = organsBySlug[spec.organId];
        const isSelected = selectedOrganId === spec.organId;
        const isHovered = hoveredOrganId === spec.organId;
        const center = organMeshCenter(spec);
        const dir = center.clone().sub(TORSO_CENTER);
        if (dir.lengthSq() < 0.0001) dir.set(0, 1, 0);
        dir.normalize();

        const realSpec = findRealOrganNodes(spec.organId);
        const label = organ ? (lang === "bn" ? organ.name.bn : organ.name.en) : spec.organId;

        // The lungs are one merged bilateral mesh in the source data, but
        // BioVerse defines two position slots for them (left/right) — use
        // the single real mesh once, spanning both slots, instead of
        // rendering two overlapping copies of it.
        if (realSpec && realSpec.nodeNames.length === 1 && spec.positions.length > 1) {
          const p0 = new THREE.Vector3(...spec.positions[0]);
          const p1 = new THREE.Vector3(...spec.positions[1]);
          const spanDiameter = p0.distanceTo(p1) + spec.radius * 2;
          const midpoint = organMeshCenter(spec);
          const p = midpoint.clone().add(dir.clone().multiplyScalar(explode * 0.55));
          return (
            <OrganMesh
              key={spec.organId}
              organId={spec.organId}
              position={p}
              radius={spec.radius}
              color={spec.color}
              shape={spec.shape}
              opacity={opacity}
              alive={alive}
              pulse={false}
              breathe={spec.organId === "lungs"}
              selected={isSelected}
              hovered={isHovered}
              onSelect={() => onSelectOrgan(spec.organId)}
              onHover={(v) => onHoverOrgan(v ? spec.organId : null)}
              label={label}
              showLabel={isHovered || isSelected}
              organsScene={organsScene}
              nodeName={realSpec.nodeNames[0]}
              spanDiameter={spanDiameter}
              rotation={realSpec.rotation}
            />
          );
        }

        return spec.positions.map((pos, i) => {
          const p = new THREE.Vector3(...pos).add(dir.clone().multiplyScalar(explode * 0.55));
          const nodeName = realSpec?.nodeNames[i];
          return (
            <OrganMesh
              key={`${spec.organId}-${i}`}
              organId={spec.organId}
              position={p}
              radius={spec.radius}
              color={spec.color}
              shape={spec.shape}
              opacity={opacity}
              alive={alive}
              pulse={spec.organId === "heart"}
              breathe={false}
              selected={isSelected}
              hovered={isHovered}
              onSelect={() => onSelectOrgan(spec.organId)}
              onHover={(v) => onHoverOrgan(v ? spec.organId : null)}
              label={label}
              showLabel={isHovered || isSelected}
              organsScene={nodeName ? organsScene : null}
              nodeName={nodeName}
              rotation={realSpec?.rotation}
            />
          );
        });
      })}
    </group>
  );
}

function OrganMesh({
  organId,
  position,
  radius,
  color,
  shape,
  opacity,
  alive,
  pulse,
  breathe,
  selected,
  hovered,
  onSelect,
  onHover,
  label,
  showLabel,
  organsScene,
  nodeName,
  spanDiameter,
  rotation,
}: {
  organId: string;
  position: THREE.Vector3;
  radius: number;
  color: string;
  shape: "sphere" | "capsule";
  opacity: number;
  alive: boolean;
  pulse: boolean;
  breathe: boolean;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
  label: string;
  showLabel: boolean;
  /** The loaded organs.glb scene, or null/undefined to force the
   * procedural fallback (used for organs with no verified real asset,
   * e.g. the stomach — see realOrganNodes.ts). */
  organsScene?: THREE.Object3D | null;
  nodeName?: string;
  spanDiameter?: number;
  rotation?: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const material = organMaterialParams(organId);

  // Build the real, correctly-scaled organ mesh once per (scene, nodeName)
  // pair: find the named node, clone it out of the shared cached scene,
  // re-center it on its own bounding-box center, and scale it to fit the
  // same footprint the procedural sphere/capsule used to occupy. radius/
  // color/spanDiameter/rotation come from static per-organ layout data
  // (humanBodyLayout.ts / realOrganNodes.ts) and never change at runtime,
  // so they're intentionally left out of the dependency array.
  const realNode = useMemo(() => {
    if (!organsScene || !nodeName) return null;
    const source = organsScene.getObjectByName(nodeName);
    if (!source) return null;
    const clone = source.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    if (box.isEmpty()) return null;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetDiameter = spanDiameter ?? radius * 2.1;
    const scale = targetDiameter / maxDim;

    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const geom = mesh.geometry as THREE.BufferGeometry | undefined;
      if (geom && !geom.getAttribute("normal")) geom.computeVertexNormals();
      mesh.material = new THREE.MeshPhysicalMaterial({
        color,
        roughness: material.roughness,
        metalness: material.metalness,
        sheen: material.sheen,
        sheenRoughness: material.sheenRoughness,
        clearcoat: material.clearcoat,
        clearcoatRoughness: material.clearcoatRoughness,
        envMapIntensity: material.envMapIntensity,
      });
    });
    clone.position.sub(center);

    const wrapper = new THREE.Group();
    wrapper.add(clone);
    wrapper.scale.setScalar(scale);
    if (rotation) wrapper.rotation.set(...rotation);
    return wrapper;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organsScene, nodeName]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    let scale = 1;
    if (alive && pulse) {
      scale = 1 + Math.sin(clock.elapsedTime * 4.2) * 0.09;
    } else if (alive && breathe) {
      scale = 1 + Math.sin(clock.elapsedTime * 1.4) * 0.14;
    }
    if (hovered || selected) scale *= 1.12;
    ref.current.scale.setScalar(scale);

    // Real-mesh materials aren't declarative JSX props, so keep opacity /
    // selected-highlight in sync here — cheap (a handful of meshes/organ).
    if (realNode) {
      realNode.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        mat.transparent = true;
        mat.opacity = opacity;
        mat.depthWrite = opacity > 0.5;
        mat.emissive.set(selected ? color : "#000000");
        mat.emissiveIntensity = selected ? 0.5 : 0;
      });
    }
  });

  return (
    <group position={position}>
      <group
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        {realNode ? (
          <primitive object={realNode} />
        ) : (
          <mesh>
            {shape === "sphere" ? (
              <sphereGeometry args={[radius, 20, 20]} />
            ) : (
              <capsuleGeometry args={[radius * 0.7, radius, 4, 12]} />
            )}
            <meshPhysicalMaterial
              color={color}
              transparent
              opacity={opacity}
              emissive={selected ? color : "#000000"}
              emissiveIntensity={selected ? 0.5 : 0}
              roughness={material.roughness}
              metalness={material.metalness}
              sheen={material.sheen}
              sheenRoughness={material.sheenRoughness}
              clearcoat={material.clearcoat}
              clearcoatRoughness={material.clearcoatRoughness}
              envMapIntensity={material.envMapIntensity}
            />
          </mesh>
        )}
      </group>
      {showLabel && (
        <Html distanceFactor={6} center className="pointer-events-none select-none">
          <div className="whitespace-nowrap rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function CirculationLoop() {
  const groupRef = useRef<THREE.Group>(null);
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.055, 1.24, 0.11),
        new THREE.Vector3(0.15, 1.26, 0.06),
        new THREE.Vector3(0.1, 1.0, 0.08),
        new THREE.Vector3(-0.1, 0.95, -0.05),
        new THREE.Vector3(-0.15, 1.26, 0.03),
        new THREE.Vector3(-0.055, 1.24, 0.11),
      ],
      true,
      "catmullrom"
    );
  }, []);

  const count = 6;
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const mesh = refs.current[i];
      if (!mesh) continue;
      const t = ((clock.elapsedTime * 0.12 + i / count) % 1 + 1) % 1;
      const p = curve.getPointAt(t);
      mesh.position.copy(p);
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#ff5c5c" emissive="#ff2d2d" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
