import * as THREE from "three";

/**
 * Shared processing for the real skeleton/muscle GLBs (see
 * `/public/models/LICENSES.md`): both are sourced from BodyParts3D, which
 * only models the right half of the body plus midline structures (a
 * standard way to ship a bilaterally-symmetric skeleton/musculature
 * without doubling file size) — so the left side has to be generated at
 * runtime by mirroring, and the whole assembly then needs to be scaled and
 * positioned into BioVerse's existing body frame (`body` in
 * `humanBodyLayout.ts`) so it lines up with everything else in the scene.
 */

const SKELETON_MIRROR_GROUP_NAMES = ["Bones_right", "Cartilages_right"];

function cloneMaterialsDeep(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((m) => (m as THREE.Material).clone())
      : (mesh.material as THREE.Material).clone();
  });
}

/** The BodyParts3D skeleton/muscle source GLBs are authored facing away
 * from BioVerse's default camera (verified by rendering: the spine/
 * scapulae read as the front of the mesh) — rotate 180° around Y so the
 * figure faces the camera, same as the procedural organ layer already
 * does. This is the default for `fitToFrame`; other sources (e.g. the
 * skin mesh, a different upstream project) may already face the right
 * way and can pass `rotationY: 0`. */
const FACE_CAMERA_ROTATION_Y = Math.PI;

/** Uniformly scale + position `root` so its bounding box has world-space
 * height `targetHeight` with its lowest point at `feetY`, centered on X/Z,
 * then apply a Y rotation to correct which way the source mesh faces.
 * Matches the standard "fit a GLB into a known frame" technique. */
function fitToFrame(
  root: THREE.Object3D,
  targetHeight: number,
  feetY: number,
  rotationY: number = FACE_CAMERA_ROTATION_Y
): THREE.Group {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const scale = size.y > 0 ? targetHeight / size.y : 1;

  const outer = new THREE.Group();
  outer.add(root);
  outer.scale.setScalar(scale);
  outer.position.set(-center.x * scale, -box.min.y * scale + feetY, -center.z * scale);

  const facing = new THREE.Group();
  facing.rotation.y = rotationY;
  facing.add(outer);
  return facing;
}

/** skeleton.glb: mirror the two named "…_right" groups across X to
 * generate the left side, then fit the full assembly into `body`'s frame. */
export function processSkeletonScene(scene: THREE.Object3D, targetHeight: number, feetY: number): THREE.Group {
  const root = scene.clone(true) as THREE.Group;

  const mirror = new THREE.Group();
  mirror.name = "MirrorLeft";
  for (const gname of SKELETON_MIRROR_GROUP_NAMES) {
    const g = root.getObjectByName(gname);
    if (g) mirror.add(g.clone(true));
  }
  mirror.scale.x = -1;
  root.add(mirror);

  cloneMaterialsDeep(root);
  return fitToFrame(root, targetHeight, feetY);
}

/** muscles.glb: right-side structures are individually named with a `.r`
 * suffix instead of living under one wrapping group like the skeleton's
 * "…_right" groups do (verified: their parent organizational groups, e.g.
 * "Arm - muscles", carry no transform of their own, so reparenting a leaf
 * node directly is safe). Collect every `.r`-suffixed node into one shared
 * mirror group and flip that group's X scale — mirroring the *group*
 * (not each node individually) is what correctly reflects each node's
 * position across the body's midline, not just its geometry in place. */
export function processMuscleScene(scene: THREE.Object3D, targetHeight: number, feetY: number): THREE.Group {
  const root = scene.clone(true) as THREE.Group;

  // THREE's GLTFLoader runs every node name through
  // PropertyBinding.sanitizeNodeName, which replaces whitespace with `_`
  // and *strips* punctuation like `.` outright (it doesn't substitute a
  // separator) — so "Adductor longus.r" arrives here as
  // "Adductor_longusr", not "Adductor_longus.r". Verified directly against
  // the shipped muscles.glb: 158 of its 160 mesh nodes end with `.r`/`.r.`
  // in the source glTF, and after that sanitization every one of those 158
  // (and only those) ends in a bare "r" — the 2 genuinely bilateral/midline
  // exceptions ("…biceps femoris", "…metacarpal lig.") don't.
  const toMirror: THREE.Object3D[] = [];
  root.traverse((obj) => {
    if (obj !== root && /r$/i.test(obj.name)) toMirror.push(obj);
  });

  const mirror = new THREE.Group();
  mirror.name = "MirrorLeft";
  for (const node of toMirror) {
    mirror.add(node.clone(true));
  }
  mirror.scale.x = -1;
  root.add(mirror);

  cloneMaterialsDeep(root);
  return fitToFrame(root, targetHeight, feetY);
}

/** skin.glb: a single, already-whole (not right-half-only) external body
 * surface — the MakeHuman base mesh (CC0; see LICENSES.md), a neutral,
 * anatomically-proportioned full-body mesh designed for exactly this kind
 * of use. No mirroring needed; just fit it into `body`'s frame. */
export function processSkinScene(scene: THREE.Object3D, targetHeight: number, feetY: number): THREE.Group {
  const root = scene.clone(true) as THREE.Group;
  cloneMaterialsDeep(root);
  // Verified by rendering: unlike the BodyParts3D skeleton/muscles, this
  // mesh already faces BioVerse's default camera — no extra Y rotation.
  return fitToFrame(root, targetHeight, feetY, 0);
}

/** Apply a shared, opacity-driven material to every mesh under `root`
 * (skeleton/muscle layers are visual-only, not individually selectable).
 *
 * Uses `MeshPhysicalMaterial` (a superset of `MeshStandardMaterial`) so
 * layers can opt into a thin `clearcoat` (a subtle moist/varnish-like
 * top layer — real skin and organ surfaces aren't perfectly matte) and
 * `sheen` (soft, grazing-angle micro-highlight, useful for fibrous/wet
 * tissue) without becoming glossy/plastic: both default to 0, so a caller
 * that only passes roughness/metalness gets the exact same flat-PBR look
 * as before. No texture maps are applied here — see
 * `/public/models/LICENSES.md` for why (no license-verified, UV-compatible
 * texture set could be sourced) — so these are shading-parameter-only
 * "material treatment," per the brief, not invented surface detail. */
export function applyLayerMaterial(
  root: THREE.Object3D,
  color: string,
  opacity: number,
  options?: {
    roughness?: number;
    metalness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
    sheen?: number;
    sheenRoughness?: number;
    sheenColor?: string;
    envMapIntensity?: number;
  }
) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    // A missing/degenerate normal attribute reads as flat under real
    // specular + IBL lighting (no smooth curvature shading) — make sure
    // every mesh actually has one before it's lit this way.
    const geom = mesh.geometry as THREE.BufferGeometry | undefined;
    if (geom && !geom.getAttribute("normal")) {
      geom.computeVertexNormals();
    }
    const mat = new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness: options?.roughness ?? 0.45,
      metalness: options?.metalness ?? 0.05,
      clearcoat: options?.clearcoat ?? 0,
      clearcoatRoughness: options?.clearcoatRoughness ?? 0.5,
      sheen: options?.sheen ?? 0,
      sheenRoughness: options?.sheenRoughness ?? 0.5,
      sheenColor: options?.sheenColor,
      envMapIntensity: options?.envMapIntensity ?? 0.6,
      depthWrite: opacity > 0.5,
    });
    mesh.material = mat;
  });
}
