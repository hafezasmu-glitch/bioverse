"use client";

/**
 * Simple procedural DNA double helix. Kept as the documented fallback per
 * the visual-upgrade brief — `DNAHelixReal.tsx` is the primary version
 * rendered by `DNAHelixCanvas.tsx`. This file also still exports the
 * shared base-pair data (`BASE_COLORS`, `BASE_NAME`, `PAIR`, `SEQUENCE`)
 * that both versions and the on-screen legend use.
 */

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const BASE_COLORS: Record<string, string> = {
  A: "#38bdf8", // Adenine
  T: "#f59e0b", // Thymine
  G: "#4ade80", // Guanine
  C: "#f472b6", // Cytosine
};
const BASE_NAME: Record<string, string> = {
  A: "Adenine",
  T: "Thymine",
  G: "Guanine",
  C: "Cytosine",
};
// A pairs with T, G pairs with C — real Watson-Crick base pairing.
const PAIR: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

const SEQUENCE = "ATGCGTACGATCGGCTAACGTGACCTAGGCATCGATCGATCGTAGCTAGGCTACG".split("");

interface DnaHelixProps {
  spin: boolean;
  turns?: number;
  onHoverBase: (info: { base: string; pairBase: string; index: number } | null) => void;
}

export function DNAHelix({ spin, turns = 6, onHoverBase }: DnaHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const steps = SEQUENCE.length;
  const height = 3.2;
  const radius = 0.42;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((_, delta) => {
    if (spin && groupRef.current) groupRef.current.rotation.y += delta * 0.35;
  });

  const points = useMemo(() => {
    const arr: { p1: THREE.Vector3; p2: THREE.Vector3; y: number; angle: number }[] = [];
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = height / 2 - t * height;
      const p1 = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      arr.push({ p1, p2, y, angle });
    }
    return arr;
  }, [steps, turns]);

  const backboneCurve1 = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => p.p1)), [points]);
  const backboneCurve2 = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => p.p2)), [points]);

  return (
    <group ref={groupRef}>
      {/* Sugar-phosphate backbones */}
      <mesh>
        <tubeGeometry args={[backboneCurve1, 200, 0.035, 8, false]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} />
      </mesh>
      <mesh>
        <tubeGeometry args={[backboneCurve2, 200, 0.035, 8, false]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} />
      </mesh>

      {/* Base-pair rungs */}
      {points.map((pt, i) => {
        if (i % 2 !== 0) return null; // thin the rungs a bit for readability
        const base = SEQUENCE[i];
        const pairBase = PAIR[base];
        const mid = pt.p1.clone().lerp(pt.p2, 0.5);
        const dir = pt.p2.clone().sub(pt.p1);
        const len = dir.length();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        const isHovered = hoveredIndex === i;
        return (
          <group key={i}>
            <mesh
              position={mid}
              quaternion={quaternion}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIndex(i);
                onHoverBase({ base, pairBase, index: i });
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHoveredIndex(null);
                onHoverBase(null);
                document.body.style.cursor = "auto";
              }}
              scale={isHovered ? [1.6, 1, 1.6] : [1, 1, 1]}
            >
              <cylinderGeometry args={[0.028, 0.028, len, 8]} />
              <meshStandardMaterial
                color={BASE_COLORS[base]}
                emissive={isHovered ? BASE_COLORS[base] : "#000000"}
                emissiveIntensity={isHovered ? 0.7 : 0}
              />
            </mesh>
            {isHovered && (
              <Html position={mid} distanceFactor={6} center className="pointer-events-none select-none">
                <div className="whitespace-nowrap rounded-lg bg-black/85 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg">
                  {BASE_NAME[base]} ({base}) — {BASE_NAME[pairBase]} ({pairBase})
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export { BASE_COLORS, BASE_NAME, PAIR, SEQUENCE };
