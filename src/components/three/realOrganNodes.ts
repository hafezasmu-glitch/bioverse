/**
 * Maps BioVerse organ IDs (see `organMeshes` in `humanBodyLayout.ts`, which
 * still owns *where* each organ sits and how big it is) to the named nodes
 * inside `/models/anatomy/organs/organs.glb` that hold the real mesh for
 * that organ. See `/public/models/LICENSES.md` for the asset's license
 * (HuBMAP Human Reference Atlas / Visible Human, CC BY 4.0).
 *
 * `organs.glb` was inspected node-by-node (glTF JSON, not guessed) to build
 * this table — each organ is one top-level named node in the file:
 * brain, heart, lung, liver, kidney_l, kidney_r, spleen, pancreas,
 * small_intestine, large_intestine, bladder.
 */

export interface RealOrganNodeSpec {
  /** BioVerse organ id — matches `organMeshes[].organId` / `Organ.slug`. */
  organId: string;
  /**
   * Node name(s) in organs.glb, aligned index-for-index with that organ's
   * `positions` array in `humanBodyLayout.ts` — EXCEPT when there are
   * fewer real nodes than position slots (the lungs are one merged
   * bilateral mesh in the source data, but BioVerse defines two position
   * slots for them); in that case the single real mesh is rendered once,
   * spanning both slots, instead of being duplicated.
   */
  nodeNames: string[];
  /**
   * Optional per-organ rotation correction (radians), applied after
   * re-centering and before scaling, in case the source mesh's authored
   * orientation doesn't already read as "facing forward" once dropped
   * into BioVerse's body frame. Tuned by eye against the live viewer.
   */
  rotation?: [number, number, number];
}

export const REAL_ORGAN_NODES: RealOrganNodeSpec[] = [
  { organId: "brain", nodeNames: ["brain"] },
  { organId: "heart", nodeNames: ["heart"] },
  // One merged bilateral mesh — see the note on `nodeNames` above.
  { organId: "lungs", nodeNames: ["lung"] },
  { organId: "liver", nodeNames: ["liver"] },
  // kidney_r goes to BioVerse's first ("-x") position slot and kidney_l to
  // the second ("+x") slot: the figure faces the camera (+Z), so the
  // patient's own right side sits on the viewer's left (-x) and vice versa.
  { organId: "kidneys", nodeNames: ["kidney_r", "kidney_l"] },
  // "stomach" is intentionally absent: organs.glb (and every other
  // open-licensed source checked) doesn't include one. HumanFigure.tsx
  // keeps the original procedural stomach mesh, clearly commented, until a
  // compliant asset is found — see LICENSES.md.
];

export function findRealOrganNodes(organId: string): RealOrganNodeSpec | undefined {
  return REAL_ORGAN_NODES.find((s) => s.organId === organId);
}
