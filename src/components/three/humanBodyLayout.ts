import * as THREE from "three";

/**
 * Layout constants for the procedural Human Body Explorer figure.
 *
 * The figure is an original, stylized, procedurally-built model (spheres,
 * capsules, boxes) — not a scan of a real person or a licensed anatomy
 * asset. Total standing height ≈ 1.8 world units ≈ 1.8 m, which lines up
 * with the "Cell to Human" scale explorer on the homepage.
 */

export interface OrganMeshSpec {
  organId: string;
  /** One or more mesh positions (e.g. lungs/kidneys are paired). */
  positions: [number, number, number][];
  radius: number;
  color: string;
  shape: "sphere" | "capsule";
}

export const organMeshes: OrganMeshSpec[] = [
  { organId: "brain", positions: [[0, 1.66, 0.01]], radius: 0.09, color: "#f2a2c7", shape: "sphere" },
  { organId: "heart", positions: [[-0.055, 1.24, 0.11]], radius: 0.09, color: "#e5484d", shape: "sphere" },
  {
    organId: "lungs",
    positions: [
      [-0.15, 1.26, 0.04],
      [0.15, 1.26, 0.04],
    ],
    radius: 0.11,
    color: "#f4a896",
    shape: "capsule",
  },
  { organId: "stomach", positions: [[-0.1, 1.06, 0.1]], radius: 0.08, color: "#e0b45a", shape: "sphere" },
  { organId: "liver", positions: [[0.12, 1.1, 0.09]], radius: 0.1, color: "#a0522d", shape: "sphere" },
  {
    organId: "kidneys",
    positions: [
      [-0.11, 0.97, -0.08],
      [0.11, 0.97, -0.08],
    ],
    radius: 0.055,
    color: "#7a2e2e",
    shape: "sphere",
  },
];

export function organMeshCenter(spec: OrganMeshSpec): THREE.Vector3 {
  const acc = new THREE.Vector3();
  spec.positions.forEach((p) => acc.add(new THREE.Vector3(...p)));
  acc.divideScalar(spec.positions.length);
  return acc;
}

export function organCenter(organId: string): THREE.Vector3 {
  const spec = organMeshes.find((o) => o.organId === organId);
  return spec ? organMeshCenter(spec) : new THREE.Vector3(0, 1.1, 0);
}

/** Body silhouette landmarks (world units), used by both skin and skeleton layers. */
export const body = {
  headCenter: [0, 1.66, 0] as [number, number, number],
  headRadius: 0.12,
  neckTop: [0, 1.56, 0] as [number, number, number],
  neckBottom: [0, 1.47, 0] as [number, number, number],
  neckRadius: 0.05,
  chestTop: [0, 1.44, 0] as [number, number, number],
  chestBottom: [0, 1.15, 0] as [number, number, number],
  chestRadiusX: 0.22,
  chestRadiusZ: 0.14,
  pelvisCenter: [0, 0.95, 0] as [number, number, number],
  pelvisRadiusX: 0.18,
  hipY: 0.86,
  legLength: 0.86,
  legRadius: 0.075,
  legOffsetX: 0.09,
  armShoulderY: 1.38,
  armOffsetX: 0.26,
  armLength: 0.62,
  armRadius: 0.055,
};
