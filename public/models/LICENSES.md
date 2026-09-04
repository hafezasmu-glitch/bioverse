# 3D model licenses & attribution

Every real (non-procedural) anatomical mesh shipped in this folder is
redistributed under its original open license, with attribution below, as
required by those licenses. This file is the single source of truth — keep
it in sync if models are added, replaced, or removed.

## `anatomy/organs/organs.glb`

- **Content**: brain, heart, lungs, liver, kidneys (L/R), spleen, pancreas,
  small intestine, large intestine, urinary bladder — anatomically
  segmented, spatially co-registered real organ meshes.
- **Source**: HuBMAP Human Reference Atlas (derived from the NLM Visible
  Human Project).
- **License**: **CC BY 4.0** (Creative Commons Attribution 4.0
  International) — <https://creativecommons.org/licenses/by/4.0/>.
  Commercial use permitted; attribution required.
- **Attribution**: "Organ meshes from the HuBMAP Human Reference Atlas
  (derived from the NLM Visible Human Project), licensed CC BY 4.0."
- **Not included**: the stomach is not present in this dataset. BioVerse
  keeps the original procedural stomach mesh as an explicit, labeled
  placeholder (see `HumanFigure.tsx`) until a compliant open-licensed
  stomach model is sourced. Re-checked during the rendering-quality pass
  (searched again for an open-licensed stomach GLB, and for whether the
  BodyParts3D dataset behind `skeleton.glb`/`muscles.glb` has a
  visceral-organ export reachable the same way) — still nothing compliant
  found, so the procedural stomach remains, now with the same tuned PBR
  material treatment as the real organ meshes (see below).

## `anatomy/human/skin.glb`

- **Content**: the external body surface (skin) — a single, whole-body,
  anatomically-proportioned mesh (not right-half-only, unlike the skeleton/
  muscles below).
- **Source**: the **MakeHuman** project's base mesh
  (`makehuman/data/3dobjs/base.obj` in
  <https://github.com/makehumancommunity/makehuman>), the neutral starting
  mesh the MakeHuman character tool builds every figure from.
- **License**: **CC0 1.0** (public domain) —
  <https://creativecommons.org/publicdomain/zero/1.0/>. Confirmed directly
  from the header comment inside the source file itself: *"This asset was
  explicitly released as CC0 in september 2020"*, naming the copyright
  holders (Data Collection AB, Joel Palmius, Jonas Hauquier) who made that
  release. No attribution is legally required, but is given anyway.
- **Attribution**: "Body mesh derived from the MakeHuman project's base
  mesh, released CC0 by Data Collection AB, Joel Palmius, and Jonas
  Hauquier."
- **What changed from the source file**: the original `base.obj` is one
  export containing the visible skin *and* many non-visible rigging/helper
  groups (joint markers, eyes, teeth, tongue, eyelash and clothing-fit
  helper geometry — none of them meant to be rendered). Only the `body`
  group (the actual skin surface, ~13.4k triangles) was extracted, then
  exported to glTF and Draco-compressed (2.57 MB → 127 KB) with
  `@gltf-transform/cli`. No geometry was altered, invented, or reshaped —
  only non-visible groups were dropped and the remaining mesh was
  re-encoded.
- Draco-compressed (`KHR_draco_mesh_compression`); decoded at runtime using
  the bundled decoder in `/public/draco/` (no CDN dependency).
- **Texture search (re-checked during the rendering-quality pass)**: no
  bitmap texture is applied to this mesh. A real, license-verified,
  UV-compatible skin texture set was searched for again specifically for
  that pass — including checking MakeHuman's own official data repo (the
  same CC0 source as the mesh itself) for its bundled default skin
  material. That material (`makehuman/data/skins/default.mhmat`) confirmed
  the same CC0 release, but has `shaderConfig diffuse false`: MakeHuman's
  own default skin has no diffuse/normal/roughness texture file at all — it
  shades via procedural vertex-color ethnicity blending and shader-level
  subsurface-scattering parameters instead. The actual downloadable
  ethnicity-specific texture packs MakeHuman ships live in a separate asset
  repo this build's sandboxed environment can't reach, and every
  third-party "MakeHuman-compatible" texture pack found is a commercial
  listing with no verifiable open license — so none is redistributed here.
  In-app, the mesh instead gets a tuned, texture-less
  `MeshPhysicalMaterial` (roughness/clearcoat only, no invented texture
  detail) — see `HumanFigure.tsx` / `realBodyProcessing.ts`.

## `anatomy/human/skeleton.glb` and `anatomy/human/muscles.glb`

- **Content**: `skeleton.glb` — 147 individually named bone/cartilage
  meshes (right half of the body plus midline bones; the left side is
  generated at runtime by mirroring, since the source data only models
  one side for a bilaterally symmetric skeleton). `muscles.glb` — 165
  named muscle/tendon meshes, mirrored the same way.
- **Source**: **BodyParts3D**, © The Database Center for Life Science
  (DBCLS) — <https://lifesciencedb.jp/bp3d/> — redistributed via an
  Open3DModel-format export.
- **License**: **CC BY-SA 2.1 Japan** (Creative Commons
  Attribution-ShareAlike 2.1 Japan) —
  <https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en>. Commercial
  use is permitted; attribution is required, and any redistributed version
  of *these specific mesh files* (including edited/re-exported copies)
  must stay under the same CC BY-SA license. This share-alike condition
  applies to the mesh assets themselves — it does not extend to the rest
  of the BioVerse codebase.
- **Attribution**: "Skeletal and muscular meshes derived from BodyParts3D,
  © The Database Center for Life Science, licensed CC BY-SA 2.1 Japan."
- Draco-compressed (`KHR_draco_mesh_compression`); decoded at runtime using
  the bundled decoder in `/public/draco/` (no CDN dependency).

## `/public/draco/`

- **Content**: the Draco WASM decoder (`draco_decoder.js`,
  `draco_decoder.wasm`, `draco_wasm_wrapper.js`), used by `three.js`'s
  `DRACOLoader` to decompress `skin.glb`, `skeleton.glb`, and `muscles.glb`
  client-side.
- **License**: Apache License 2.0 (Google, part of the open-source
  `three.js`/`glTF-Pipeline` tooling ecosystem).

## `cell/` and `genetics/`

Empty on purpose. No open-licensed, anatomically-labeled organelle mesh
set (nucleus/mitochondria/Golgi/ER/ribosomes as distinct, individually
identifiable GLB assets) or molecular DNA asset could be located and
license-verified. Cell World and the Genetics Lab use upgraded
**procedural** 3D geometry instead — see the code comments in
`src/components/three/CellScene.tsx` and `src/components/three/DNAHelixReal.tsx`
for why, and `src/lib/assets/anatomyAssets.ts` for the loader paths these
directories are wired to, ready to receive real assets later without any
further code changes.
