"use client";

/**
 * Cell World's organelles are — and stay — procedural geometry. No
 * open-licensed, individually-labeled organelle mesh set (nucleus,
 * mitochondria, Golgi, ER, ribosomes, ...) could be found and license-
 * verified anywhere reachable from this build (see
 * /public/models/LICENSES.md for the search). That's also simply how this
 * kind of illustration is normally made: textbook and museum cell diagrams
 * (Visible Body, Amgen Biointeractive, any histology atlas) are schematic
 * illustrations, not photographic scans — a cell's organelles don't have a
 * single fixed "real" geometry to scan the way an organ does. So the
 * upgrade here is entirely in geometric and material fidelity:
 *
 *  - Membrane-bound organelles get an organic, noise-perturbed surface
 *    (`buildOrganicGeometry`) instead of a perfect primitive sphere/
 *    icosahedron — real membranes aren't geometrically perfect.
 *  - The nucleus renders its nuclear envelope *and* a visible nucleolus
 *    (a real, commonly-taught sub-structure), not a single flat sphere.
 *  - Mitochondria get folded inner-membrane ridges (cristae) — the
 *    single most recognizable real feature of a mitochondrion.
 *  - The Golgi apparatus renders as a curved stack of flattened sacs
 *    (cisternae), not one donut.
 *  - Ribosomes render as two touching subunits (large + small), matching
 *    real ribosome structure.
 *  - Materials are `meshPhysicalMaterial` with clearcoat/transmission for
 *    real membranous/fluid material depth under the scene's PBR lighting.
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { CellOrganelle } from "@/lib/content/types";

interface CellSceneProps {
  organelles: CellOrganelle[];
  selectedId: string | null;
  hoveredId: string | null;
  isolateId: string | null;
  showAllLabels: boolean;
  spin: boolean;
  lang: "en" | "bn";
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function CellScene({
  organelles,
  selectedId,
  hoveredId,
  isolateId,
  showAllLabels,
  spin,
  lang,
  onSelect,
  onHover,
}: CellSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spin && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {organelles.map((o) => {
        if (isolateId && o.id !== isolateId && o.id !== "cell-membrane" && o.id !== "cell-wall") return null;
        const isMembraneLike = o.id === "cell-membrane" || o.id === "cell-wall";
        const isSelected = selectedId === o.id;
        const isHovered = hoveredId === o.id;
        const dim = isolateId && isMembraneLike;
        return (
          <OrganelleMesh
            key={o.id}
            organelle={o}
            opacity={dim ? 0.08 : isMembraneLike ? 0.16 : 1}
            wireframeOnly={isMembraneLike}
            selected={isSelected}
            hovered={isHovered}
            showLabel={showAllLabels || isSelected || isHovered}
            label={lang === "bn" ? o.name.bn : o.name.en}
            onSelect={() => !isMembraneLike && onSelect(o.id)}
            onHover={(v) => !isMembraneLike && onHover(v ? o.id : null)}
          />
        );
      })}
    </group>
  );
}

/** Deterministic, dependency-free pseudo-noise (layered sines) — enough to
 * break up a primitive's perfect symmetry into something organic-looking,
 * without pulling in a Perlin/Simplex noise library for a handful of
 * low-poly organelles. */
function pseudoNoise3(x: number, y: number, z: number, seed: number): number {
  return (
    Math.sin(x * 2.1 + seed) * Math.cos(y * 1.7 + seed * 1.3) * 0.5 +
    Math.sin(y * 3.3 - seed * 0.7) * Math.cos(z * 2.6 + seed) * 0.3 +
    Math.sin(z * 1.9 + x * 1.1 - seed * 2.1) * 0.2
  );
}

function seedFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 10000;
  return h / 1000;
}

function buildOrganicGeometry(radius: number, seed: number, amount: number, detail = 3): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    n.copy(v).normalize();
    const offset = pseudoNoise3(v.x, v.y, v.z, seed) * amount * radius;
    v.addScaledVector(n, offset);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function OrganelleMesh({
  organelle,
  opacity,
  wireframeOnly,
  selected,
  hovered,
  showLabel,
  label,
  onSelect,
  onHover,
}: {
  organelle: CellOrganelle;
  opacity: number;
  wireframeOnly: boolean;
  selected: boolean;
  hovered: boolean;
  showLabel: boolean;
  label: string;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => seedFromId(organelle.id), [organelle.id]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const base = 1 + (hovered || selected ? 0.08 : 0);
    const pulse = wireframeOnly ? 1 : 1 + Math.sin(clock.elapsedTime * 1.6 + organelle.position[0] * 5) * 0.01;
    ref.current.scale.setScalar(base * pulse);
  });

  const handlers = {
    onClick: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onSelect();
    },
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onHover(true);
      if (!wireframeOnly) document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      onHover(false);
      document.body.style.cursor = "auto";
    },
  };

  const emissive = selected ? organelle.color : "#000000";
  const emissiveIntensity = selected ? 0.6 : 0;

  return (
    <group position={organelle.position}>
      <group ref={ref} {...handlers}>
        <OrganelleGeometry organelle={organelle} seed={seed} opacity={opacity} wireframeOnly={wireframeOnly} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </group>
      {showLabel && (
        <Html distanceFactor={7} center className="pointer-events-none select-none">
          <div className="whitespace-nowrap rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium text-white shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function OrganelleGeometry({
  organelle,
  seed,
  opacity,
  wireframeOnly,
  emissive,
  emissiveIntensity,
}: {
  organelle: CellOrganelle;
  seed: number;
  opacity: number;
  wireframeOnly: boolean;
  emissive: string;
  emissiveIntensity: number;
}) {
  const { color, radius, shape, id } = organelle;

  // Membrane / cell wall: a thin translucent wireframe shell — organelles
  // need to stay visible through it, so this one intentionally stays a
  // simple smooth sphere rather than getting organic surface noise.
  if (wireframeOnly) {
    return (
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} wireframe roughness={0.5} />
      </mesh>
    );
  }

  const baseMat = {
    color,
    transparent: true,
    opacity,
    emissive,
    emissiveIntensity,
    roughness: 0.4,
    metalness: 0.04,
    clearcoat: 0.5,
    clearcoatRoughness: 0.4,
  };

  // Nucleus: nuclear envelope + a visible nucleolus, the way it's actually
  // drawn in a real cell diagram.
  if (id === "cell-nucleus") {
    const envelopeGeo = buildOrganicGeometry(radius, seed, 0.06, 3);
    return (
      <group>
        <mesh geometry={envelopeGeo}>
          <meshPhysicalMaterial {...baseMat} transmission={0.15} thickness={0.3} />
        </mesh>
        <mesh position={[radius * 0.28, radius * 0.15, radius * 0.2]}>
          <sphereGeometry args={[radius * 0.32, 20, 20]} />
          <meshPhysicalMaterial
            color="#4c5fb0"
            roughness={0.35}
            metalness={0.05}
            clearcoat={0.6}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      </group>
    );
  }

  // Mitochondria: elongated organic body + folded inner-membrane ridges
  // (cristae) — the single most recognizable real feature.
  if (shape === "capsule") {
    const bodyGeo = buildOrganicGeometry(radius, seed, 0.1, 3);
    const cristaeCount = 4;
    return (
      <group scale={[1.9, 0.62, 0.62]}>
        <mesh geometry={bodyGeo}>
          <meshPhysicalMaterial {...baseMat} clearcoat={0.6} />
        </mesh>
        {Array.from({ length: cristaeCount }).map((_, i) => {
          const t = (i + 1) / (cristaeCount + 1) - 0.5;
          return (
            <mesh key={i} position={[t * radius * 1.6, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius * 0.62, radius * 0.09, 6, 16, Math.PI * 1.3]} />
              <meshStandardMaterial color={color} roughness={0.5} transparent opacity={opacity * 0.9} />
            </mesh>
          );
        })}
      </group>
    );
  }

  // Golgi apparatus: a curved stack of flattened sacs (cisternae), not a
  // single donut.
  if (shape === "torus") {
    const sacCount = 5;
    return (
      <group rotation={[Math.PI / 2.4, 0.3, 0]}>
        {Array.from({ length: sacCount }).map((_, i) => {
          const t = i / (sacCount - 1) - 0.5;
          const r = radius * (1 - Math.abs(t) * 0.35);
          return (
            <mesh key={i} position={[t * radius * 0.5, t * radius * 0.18, 0]}>
              <torusGeometry args={[r, radius * 0.14, 8, 22]} />
              <meshPhysicalMaterial {...baseMat} clearcoat={0.55} />
            </mesh>
          );
        })}
      </group>
    );
  }

  // Ribosome: two touching subunits (large + small), matching real
  // ribosome structure, instead of one uniform sphere.
  if (id === "cell-ribosomes") {
    return (
      <group>
        <mesh position={[0, radius * 0.25, 0]}>
          <sphereGeometry args={[radius, 12, 12]} />
          <meshPhysicalMaterial {...baseMat} />
        </mesh>
        <mesh position={[0, -radius * 0.55, 0]}>
          <sphereGeometry args={[radius * 0.72, 12, 12]} />
          <meshPhysicalMaterial {...baseMat} />
        </mesh>
      </group>
    );
  }

  // ER / chloroplast / vacuole / any other "blob": organic noise-perturbed
  // surface, with a translucent, fluid/membranous material.
  const blobGeo = buildOrganicGeometry(radius, seed, 0.16, 3);
  return (
    <mesh geometry={blobGeo}>
      <meshPhysicalMaterial {...baseMat} transmission={id === "cell-vacuole" ? 0.4 : 0.1} thickness={0.4} />
    </mesh>
  );
}
