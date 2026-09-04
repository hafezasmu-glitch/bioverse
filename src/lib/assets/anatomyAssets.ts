/**
 * Central manifest of real, licensed 3D anatomy assets and where BioVerse
 * expects to find them on disk — the "asset-loader architecture" the
 * visual-upgrade brief asked for.
 *
 * Every path below is a real, redistributable, license-verified GLB file
 * that already ships in `/public`. Full attribution and license text for
 * each one lives in `/public/models/LICENSES.md` — read that before
 * changing what's referenced here.
 *
 * `cell/` and `genetics/` are intentionally reserved-but-empty: no
 * open-licensed, individually-labeled organelle mesh set or molecular DNA
 * asset could be sourced and license-verified (see LICENSES.md for the
 * search that was done). Cell World and the Genetics Lab render upgraded
 * *procedural* 3D instead — drop real files at those paths and wire them
 * into `CellScene.tsx` / `DNAHelixReal.tsx` later without touching
 * anything else.
 */

export const ORGANS_GLB_URL = "/models/anatomy/organs/organs.glb";
export const SKELETON_GLB_URL = "/models/anatomy/human/skeleton.glb";
export const MUSCLES_GLB_URL = "/models/anatomy/human/muscles.glb";
export const SKIN_GLB_URL = "/models/anatomy/human/skin.glb";

/** Local Draco decoder (no CDN dependency) — skeleton.glb and muscles.glb
 * are Draco-compressed; organs.glb is not. */
export const DRACO_DECODER_PATH = "/draco/";

/** Reserved for future real assets — see the module comment above. */
export const CELL_ASSET_DIR = "/models/cell/";
export const GENETICS_ASSET_DIR = "/models/genetics/";
