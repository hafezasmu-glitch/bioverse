"use client";

/**
 * High-fidelity primary DNA visualization.
 *
 * There is no open-licensed "DNA GLB" to load here — professional molecular
 * visualization (PyMOL, ChimeraX, Mol*, textbook diagrams) is itself
 * procedural/schematic geometry (ribbons, tubes, ball-and-stick), not a
 * scan of a physical object, so a hand-built procedural double helix *is*
 * the correct, professional approach for this piece — the upgrade here is
 * in geometric and material accuracy, not in swapping to a mesh file:
 *
 *  - The two backbone strands are offset by the real B-DNA groove angle
 *    (≈150°/≈210°, not a naive 180°/180°), which is what actually produces
 *    the asymmetric major/minor groove real DNA has.
 *  - Small phosphate "bead" spheres mark each backbone nucleotide position,
 *    the same way ball-and-stick backbones are drawn in molecular software.
 *  - Base-pair rungs are two half-cylinders (one per nucleotide, correctly
 *    colored/tapered to its own base) meeting at a small hydrogen-bond
 *    connector bead at the center, instead of one uniformly-colored rod.
 *  - Materials are `meshPhysicalMaterial` with clearcoat + adjusted
 *    roughness/metalness for real material depth under the scene's PBR
 *    lighting, instead of flat `meshStandardMaterial`.
 *
 * `DNAHelix.tsx` (the original, simpler version) is kept in the codebase
 * unchanged as the documented fallback — see its file header and
 * `DNAHelixCanvas.tsx`.
 */

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { BASE_COLORS, BASE_NAME, PAIR, SEQUENCE } from "./DNAHelix";

interface DnaHelixProps {
  spin: boolean;
  turns?: number;
  onHoverBase: (info: { base: string; pairBase: string; index: number } | null) => void;
}

// Real B-DNA: ~10.5 base pairs per full turn, and the two backbone strands
// are NOT diametrically opposite — the phase offset between them is what
// creates the asymmetric major/minor groove (minor ≈ 150°, major ≈ 210°).
const GROOVE_MINOR_RAD = (150 * Math.PI) / 180;

export function DNAHelixReal({ spin, turns = 6, onHoverBase }: DnaHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const steps = SEQUENCE.length;
  const height = 3.2;
  const radius = 0.42;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((_, delta) => {
    if (spin && groupRef.current) groupRef.current.rotation.y += delta * 0.32;
  });

  const points = useMemo(() => {
    const arr: { p1: THREE.Vector3; p2: THREE.Vector3; y: number; angle: number }[] = [];
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = height / 2 - t * height;
      const p1 = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const p2 = new THREE.Vector3(
        Math.cos(angle + GROOVE_MINOR_RAD) * radius,
        y,
        Math.sin(angle + GROOVE_MINOR_RAD) * radius
      );
      arr.push({ p1, p2, y, angle });
    }
    return arr;
  }, [steps, turns]);

  const backboneCurve1 = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => p.p1)), [points]);
  const backboneCurve2 = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => p.p2)), [points]);

  return (
    <group ref={groupRef}>
      {/* Sugar-phosphate backbones — glassy PBR tube */}
      <mesh>
        <tubeGeometry args={[backboneCurve1, 220, 0.034, 10, false]} />
        <meshPhysicalMaterial color="#8b98ab" roughness={0.28} metalness={0.15} clearcoat={0.6} clearcoatRoughness={0.35} />
      </mesh>
      <mesh>
        <tubeGeometry args={[backboneCurve2, 220, 0.034, 10, false]} />
        <meshPhysicalMaterial color="#8b98ab" roughness={0.28} metalness={0.15} clearcoat={0.6} clearcoatRoughness={0.35} />
      </mesh>

      {/* Phosphate "bead" markers along each backbone, every other step */}
      {points.map((pt, i) =>
        i % 2 === 0 ? (
          <group key={`phos-${i}`}>
            <mesh position={pt.p1}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshPhysicalMaterial color="#cbd5e1" roughness={0.2} metalness={0.35} clearcoat={0.8} />
            </mesh>
            <mesh position={pt.p2}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshPhysicalMaterial color="#cbd5e1" roughness={0.2} metalness={0.35} clearcoat={0.8} />
            </mesh>
          </group>
        ) : null
      )}

      {/* Base-pair rungs: two half-cylinders (each colored by its own base) + a
          central connector bead standing in for the hydrogen bond(s). */}
      {points.map((pt, i) => {
        if (i % 2 !== 0) return null; // thin the rungs a bit for readability
        const base = SEQUENCE[i];
        const pairBase = PAIR[base];
        const mid = pt.p1.clone().lerp(pt.p2, 0.5);
        const dir = pt.p2.clone().sub(pt.p1);
        const len = dir.length();
        const halfLen = len / 2 - 0.045; // leave a small gap for the connector bead
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        const q1 = pt.p1.clone().lerp(mid, 0.5 - 0.02);
        const q2 = pt.p2.clone().lerp(mid, 0.5 - 0.02);
        const isHovered = hoveredIndex === i;
        const hoverScale: [number, number, number] = isHovered ? [1.6, 1, 1.6] : [1, 1, 1];
        return (
          <group key={i}>
            <group
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
            >
              <mesh position={q1} quaternion={quaternion} scale={hoverScale}>
                <cylinderGeometry args={[0.03, 0.026, halfLen, 10]} />
                <meshPhysicalMaterial
                  color={BASE_COLORS[base]}
                  roughness={0.35}
                  metalness={0.05}
                  clearcoat={0.4}
                  emissive={isHovered ? BASE_COLORS[base] : "#000000"}
                  emissiveIntensity={isHovered ? 0.6 : 0}
                />
              </mesh>
              <mesh position={q2} quaternion={quaternion} scale={hoverScale}>
                <cylinderGeometry args={[0.026, 0.03, halfLen, 10]} />
                <meshPhysicalMaterial
                  color={BASE_COLORS[pairBase]}
                  roughness={0.35}
                  metalness={0.05}
                  clearcoat={0.4}
                  emissive={isHovered ? BASE_COLORS[pairBase] : "#000000"}
                  emissiveIntensity={isHovered ? 0.6 : 0}
                />
              </mesh>
              <mesh position={mid} scale={isHovered ? 1.5 : 1}>
                <sphereGeometry args={[0.032, 10, 10]} />
                <meshPhysicalMaterial color="#fef9c3" roughness={0.15} metalness={0.1} clearcoat={0.9} />
              </mesh>
            </group>
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
