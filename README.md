# BioVerse — Explore Life From Cell to Human

An interactive 3D biology learning platform: a real WebGL Human Body Explorer,
a Cell World with animal/plant cells, a Genetics Lab (3D DNA helix + a working
Punnett Square simulator), a bilingual (English/বাংলা) Biological Dictionary,
and a quiz engine — built on Next.js 16, React 19, TypeScript, Tailwind CSS 4
and React Three Fiber (Three.js).

## Why this build looks the way it does

The full BioVerse specification describes a production platform with
thousands of dictionary entries, licensed anatomical scan data, a real
backend/database, user accounts, an AI tutor, and roughly a dozen fully
built "worlds." That is a multi-month project for a team. This build is a
**real, working codebase** — not a mockup — that implements a vertical slice
of that vision end-to-end (data → 3D rendering → UI → SEO), with an
architecture explicitly designed so every unbuilt piece is an *extension*,
not a rewrite.

**Fully working in this build:**

- Human Body Explorer — real Three.js/WebGL 3D, built on real, licensed
  anatomical mesh data (see "3D asset strategy" below): Skin/Skeletal/
  Muscles/Organs layer toggles, an X-ray transparency slider, Explode/
  Assemble, "Make It Alive" (heartbeat, breathing, a simplified circulation
  loop), clickable organ hotspots with camera focus transitions, isolate
  mode, fullscreen, and a full detail panel (facts, reading levels, related
  terms, references) — for 6 verified organs across 5 systems.
- Cell World — animal vs. plant cell in 3D, rotate/isolate/label organelles,
  side-by-side Compare mode.
- Genetics Lab — an animated, hoverable 3D DNA double helix, and a fully
  functional Punnett Square simulator (real genetics logic: genotype/phenotype
  ratios, zygosity, custom trait labels).
- Biological Dictionary — 20 verified bilingual sample entries, English/বাংলা
  search with basic typo tolerance, category filters, rich cross-linked entry
  pages with structured references.
- Quiz engine — MCQ/true-false with a per-answer explanation (never just
  "right/wrong"), used for a Heart quiz and a Cell Biology quiz.
- Bilingual UI (EN/বাং), light/dark/system theme, responsive down to 360px,
  keyboard focus states, semantic HTML, `prefers-reduced-motion` support,
  per-page SEO metadata, sitemap.xml/robots.txt.
- Functional lightweight learning tools for Micro World, Plant Biology,
  Virtual Lab, Virtual Microscope, Ecology and Brain Explorer, plus a
  local-first Dashboard and bounded BioVerse Study Guide.

**Deliberately not built** (see "Extending this build" below): a real
database, user accounts, the AI tutor backend, NCTB chapter-by-chapter
curriculum mapping, and the dictionary's remaining ~980+ entries.

## Content accuracy

Organ, cell and genetics content in this build was written from established
biology knowledge and cross-checked against OpenStax *Biology 2e*, OpenStax
*Anatomy & Physiology 2e*, and MedlinePlus (NIH) — see the "Sources &
References" section on every organ, dictionary and quiz page for the exact
citations. This is a **small, hand-verified sample**, not the full 1,000+
entry dictionary the spec describes — see `src/lib/content/data/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
npm run lint
```

Requires Node.js 20.9+ (Next.js 16 minimum).

> Note: this build intentionally does not use `next/font/google` (it needs a
> live connection to fonts.googleapis.com at build time, which isn't
> guaranteed in every environment) — it ships a clean system-font stack
> instead. Swap in `next/font/google` or `next/font/local` freely.

## Architecture

```
src/
  app/                        Next.js App Router routes
    human-body/                3D explorer + /human-body/[slug] SEO pages
    cell-world/                animal/plant/compare cell explorer
    genetics/                  DNA helix + Punnett Square
    dictionary/                 browse/search + /dictionary/[slug]
    quiz/                       quiz index + /quiz/[slug]
    micro-world, plant-biology, virtual-lab, virtual-microscope,
    ecology, neuroscience, ai-tutor, dashboard   interactive learning routes
    sitemap.ts, robots.ts
  components/
    three/                     all Three.js/React Three Fiber code
    genetics/                  PunnettSquare (pure logic + UI, no 3D)
    dictionary/, quiz/, home/, layout/, ui/
  lib/
    content/
      types.ts                 the content schema (see below)
      data/*.ts                 the actual sample data
      index.ts                  query layer — UI imports from here, not data/*
    i18n/                       bilingual system (LanguageProvider, strings.ts)
    assets/
      anatomyAssets.ts          real-model path manifest (see "3D asset strategy")
public/
  models/
    anatomy/human/               skeleton.glb, muscles.glb (BodyParts3D, CC BY-SA)
    anatomy/organs/               organs.glb (HuBMAP HRA, CC BY 4.0)
    cell/, genetics/               reserved, empty — see LICENSES.md
    LICENSES.md                   full license/attribution for every real asset
  draco/                         local Draco decoder (no CDN dependency)
```

### Content architecture (spec-critical)

Nothing is hard-coded into UI components. `src/lib/content/types.ts` defines
storage-agnostic, JSON-serializable entities — `Organ`, `Term`, `BodySystem`,
`Quiz`, `Source`, `CellOrganelle` — every bilingual field is `{ en, bn }`.
Today's "database" is plain TypeScript modules in `src/lib/content/data/`;
`src/lib/content/index.ts` is the only place UI code queries from. **To move
to a real database** (Postgres/Prisma, a headless CMS, etc.), rewrite the
functions in `index.ts` to fetch from that source — no component changes
needed.

### 3D asset strategy

The Human Body Explorer's skin, skeleton, muscles, and six organs are
**real, license-verified anatomical meshes** (GLB/glTF, PBR materials) —
not procedural primitives:

| Asset | Source | License |
|---|---|---|
| `public/models/anatomy/human/skin.glb` — external body surface | MakeHuman project base mesh | CC0 1.0 |
| `public/models/anatomy/organs/organs.glb` — brain, heart, lungs, liver, kidneys (+ spleen, pancreas, intestines, bladder, unused today) | HuBMAP Human Reference Atlas (NLM Visible Human Project) | CC BY 4.0 |
| `public/models/anatomy/human/skeleton.glb` — 147 named bones/cartilage | BodyParts3D, © DBCLS | CC BY-SA 2.1 Japan |
| `public/models/anatomy/human/muscles.glb` — 165 named muscles/tendons | BodyParts3D, © DBCLS (same source as skeleton) | CC BY-SA 2.1 Japan |

Full attribution, license text, and a description of how each file was
verified (for the skin mesh: the CC0 release notice embedded directly in
the source file's header, naming the people who released it — not just a
wrapping repo's own license claim) lives in `public/models/LICENSES.md` —
read that before adding, replacing, or redistributing any model file.

### Rendering quality (Human Body Explorer)

The skin/skeleton/muscle/organ *meshes and their positions are unchanged*
from the asset-strategy work above — this pass is shading, lighting, and
render-pipeline only, in `HumanBodyExplorer.tsx` (renderer/lighting) and
`HumanFigure.tsx` / `realBodyProcessing.ts` (materials):

- **Tone mapping & renderer**: ACES Filmic tone mapping (matches how film/
  game/medical-viz renderers compress highlights instead of clipping them)
  at a restrained exposure, sRGB output — set explicitly on the R3F
  `<Canvas gl={{...}}>` rather than left implicit.
- **Lighting**: a soft three-point rig (warm key, cool fill, neutral rim)
  replaces the old single flat ambient + two directionals, plus a
  procedural studio-softbox `<Environment>` (drei `<Lightformer>` panels,
  not an external HDR file — this keeps the bundle self-contained and
  doesn't depend on reaching an asset CDN) for real specular/IBL response.
  Deliberately low-contrast: an anatomy atlas wants even, legible light,
  not dramatic shadow.
- **Contact/depth cue**: a soft procedural `<ContactShadows>` blurred
  ground shadow under the figure's feet — no real shadow-mapped lights
  (`shadows={false}` stays off for perf), just a cheap extra render pass.
- **Materials**: every layer moved from a flat `MeshStandardMaterial` to
  `MeshPhysicalMaterial` with small, layer-appropriate `clearcoat`/`sheen`
  amounts — skin gets a faint moist clearcoat (not glossy), muscle gets a
  soft fibrous sheen, bone stays dry/matte with no clearcoat/sheen at all,
  and each of the six real organs gets its own tuned roughness/sheen/
  clearcoat (heart and liver read wetter/more reflective; lungs read
  spongier/more matte; brain in between) instead of one shared preset —
  see `ORGAN_MATERIAL_OVERRIDES` in `HumanFigure.tsx`. No texture maps are
  used anywhere in this pass — see "What's still procedural" below and
  `LICENSES.md` for why, and why that's the correct, non-invented choice
  rather than a shortcut.
- **Adaptive quality scaling**: drei's `PerformanceMonitor` reports a 0..1
  performance factor from measured frame timing; `HumanBodyExplorer.tsx`
  uses it to scale device pixel ratio, the `ContactShadows` render-target
  resolution, and the baked `Environment` cubemap resolution down together
  on slower devices, rather than the frame rate just silently dropping.
  There are no bitmap textures in this scene to resolution-tier (the point
  above), so render/render-target resolution is the applicable lever here.

**What's still procedural, and why:**

- **Stomach** — the only one of BioVerse's 6 organs missing from
  `organs.glb`; no other compliant (non-NC) source was found, including on
  a second targeted search during the rendering-quality pass. Kept as the
  original procedural mesh, clearly commented in `HumanFigure.tsx` — now
  with the same tuned PBR material treatment as the real organ meshes, so
  it doesn't look out of place next to them, without pretending to be a
  scan.
- **Cell World organelles** (`CellScene.tsx`) — no open-licensed,
  individually-labeled organelle mesh set exists anywhere reachable during
  this build (verified search, see `LICENSES.md`). This is also simply how
  this content is normally illustrated — a cell diagram is schematic, not a
  scan — so the upgrade here is procedural: organic noise-perturbed
  surfaces, a nucleus with a real nucleolus, mitochondrial cristae, a
  Golgi rendered as a stacked-cisternae, two-subunit ribosomes, and PBR
  (`meshPhysicalMaterial`, clearcoat/transmission) instead of flat
  `meshStandardMaterial`.
- **DNA** (`DNAHelixReal.tsx`, primary; `DNAHelix.tsx`, kept as the
  documented fallback) — professional molecular visualization is itself
  procedural/schematic (ribbons, tubes, ball-and-stick — the same approach
  PyMOL/ChimeraX/Mol* use), so a hand-built double helix is the correct
  approach here, not a placeholder. The upgrade is geometric accuracy (a
  real ~150°/210° B-DNA groove offset instead of a naive 180°, phosphate
  backbone beads, two-tone base-pair rungs) and PBR materials.

  **Not yet in scope**: the Human Body Explorer's most recent pass (see
  "Rendering quality" above — ACES tone mapping, the studio `Environment`/
  `ContactShadows` lighting rig, and `PerformanceMonitor`-driven adaptive
  quality) is deliberately scoped to that world only and hasn't been
  applied to Cell World's or the Genetics Lab's own `<Canvas>` yet. Their
  meshes already use `meshPhysicalMaterial`, but their renderer/lighting
  setup is the older, simpler one — treat their current look as a
  placeholder for that upgrade, not the finished visual bar.

**Asset-loader architecture**: `src/lib/assets/anatomyAssets.ts` centralizes
every model path (`/models/anatomy/human/`, `/models/anatomy/organs/`,
`/models/cell/`, `/models/genetics/` — the last two intentionally empty
today) plus the local Draco decoder path. `src/components/three/
realOrganNodes.ts` maps BioVerse organ IDs to the named nodes inside
`organs.glb`; `realBodyProcessing.ts` handles mirroring the (right-half-only)
skeleton/muscle source data to a full body, fitting the whole (already-
whole) skin mesh, and positioning all three into the same body frame. Drop
a real cell/DNA asset at the reserved paths later and wire it into
`CellScene.tsx`/`DNAHelixReal.tsx` without touching anything else.

**Performance**: `organs.glb` and `skin.glb` load eagerly (both visible by
default); `skeleton.glb`/`muscles.glb` are Draco-compressed and only load
the first time their toolbar toggle is switched on (both start off), so a
visitor who never looks at the skeleton/muscle layers never downloads them.
All three human-body meshes are Draco-compressed except `organs.glb`, which
was small enough uncompressed (3.1 MB) not to need it.

### Performance choices

- Every 3D explorer is `next/dynamic`-loaded with `ssr: false` behind a thin
  client-only wrapper (`*Lazy.tsx`) — the homepage never pays for a Three.js
  bundle, and each world's JS only loads when you visit it.
- `Canvas3DBoundary` checks WebGL support up front and catches render errors,
  always showing a real fallback (message + retry), never a blank canvas.
- `CanvasLoader` shows real load progress via drei's `useProgress`.
- Explode/Assemble and the X-ray slider ease via a per-frame lerp
  (`useSmoothedValue`) instead of snapping.

### Bilingual system

`src/lib/i18n/strings.ts` holds UI chrome strings for `en`/`bn`;
`LanguageProvider` exposes `t` (UI strings) and `b(bilingualField)` (picks the
right language out of any content object's `{ en, bn }` field), persisted to
`localStorage` via `useSyncExternalStore` (hydration-safe, no
effect-triggered re-render). Scientific terms are **not** casually
translated — English scientific names are preserved alongside বাংলা, per the
spec.

### Design system & visual identity

A cross-page visual-consistency pass (homepage, dictionary, and every
world's surrounding page chrome — not the locked 3D architecture, see "3D
asset strategy" above) introduced a small set of reusable primitives so
every card/badge/icon in the app draws from one system instead of each
page hand-rolling its own styling:

- **`src/components/ui/Card.tsx` (`BioCard`)** — the one card shell used
  for world portals, dictionary/quiz results, and organ grids: a
  `.bio-panel` surface with a hover lift and an optional per-item accent
  (a thin top bar + a tinted hover glow keyed to a hex color).
- **`src/components/ui/Badge.tsx`, `IconTile.tsx`, `SectionHeading.tsx`,
  `EmptyState.tsx`** — the pill/icon-tile/heading/empty-state patterns
  that used to be copy-pasted per page.
- **`src/components/ui/WorldIcons.tsx` / `MiscIcons.tsx`** — a consistent
  line-art SVG icon set (24×24, `currentColor` stroke) replacing the
  single-Unicode-glyph icons the homepage world cards and Coming Soon
  pages used before. Deliberately not emoji, and not per-page one-offs.
- **`src/lib/design/worlds.ts`** — the single source of truth for each of
  the eight homepage "worlds"' accent color + icon + card copy + ready
  state; both `WorldsGrid` (homepage) and `ComingSoon` (stub pages) key
  off it so a world's identity can't drift between the two. Colors are
  deliberately restrained (mostly the existing `--accent`/`--accent-2`
  cyan/violet plus a handful of muted world-specific hues) — used only as
  small accents (an icon tile, a top bar, a hover glow) on top of the
  existing `.bio-panel` system, never a full section re-theme.
- **`src/lib/design/categories.ts`** — the same idea for the Biological
  Dictionary's 8 categories, reusing each matching world's color
  (cell-biology↔Cell World, genetics↔Genetics Lab, anatomy↔Human Body,
  etc.) so a term's category badge and its "Explore the 3D world" link
  read as the same color system.

None of this touches the Human Body Explorer's own Canvas/materials
(`HumanFigure.tsx`, `HumanBodyExplorer.tsx`, `realBodyProcessing.ts`) —
only the ordinary HTML page chrome around it (the organ grid on
`/human-body`, headers, breadcrumbs) picked up the new primitives.

**Not done in this pass** (scoped out — see the git history/PR notes for
why, not silently dropped): no page-transition choreography between
routes (Next.js App Router page transitions are a meaningfully bigger,
riskier architectural change than a styling pass, and "transitions must
stay fast" argued against it); no PWA/offline caching strategy (none
existed before either); no device-lab performance profiling beyond the
existing adaptive-dpr/PerformanceMonitor work already in the Human Body
Explorer. The five still-unbuilt "worlds" (Ecology, Micro World, Plant
Biology, Virtual Lab, full Brain Explorer) and AI Tutor/Dashboard/Virtual
The microscope route now provides slide selection, four magnification levels,
focus control and a structure-identification prompt. Its visuals are explicitly
schematic rather than represented as real microscopy imagery.

## Extending this build

- **More dictionary entries / organs**: add objects to
  `src/lib/content/data/{terms,organs}.ts` matching the existing shape —
  the dictionary search, filters, and detail pages all pick them up
  automatically.
- **The remaining procedural pieces** (stomach, cell organelles, DNA — see
  "3D asset strategy" above for why each stayed procedural):
  drop a real, license-verified GLB at the relevant reserved path
  (`public/models/anatomy/human/`, `.../organs/`, `public/models/cell/`,
  `public/models/genetics/`) and wire it in following the same pattern
  `realOrganNodes.ts` / `realBodyProcessing.ts` already use — keep the
  hotspot/layer/opacity props the same shape.
- **A real database**: implement the functions exported from
  `src/lib/content/index.ts` against your data source.
- **NCTB curriculum mode**: this build never fabricates chapter/curriculum
  mappings it hasn't verified — `levelContent.ssc` fields exist as the hook
  for this, but real NCTB chapter numbers need to be sourced from the actual
  textbooks before publishing.
- **AI Tutor / accounts**: `/ai-tutor` is intentionally a bounded, deterministic
  study guide until a referenced retrieval backend exists. `/dashboard` stores
  user-marked progress locally and does not fabricate account data.

## What was intentionally left out (and why)

Per the spec's own priority order (accuracy > learning value > interactivity
> real 3D > mobile > accessibility > performance > beauty > animation
complexity), and to avoid publishing fabricated content or fake
functionality:

- No invented NCTB chapter numbers or curriculum mappings.
- No fabricated user counts, reviews, or institutional endorsements.
- No unlicensed anatomy assets, ever — every real mesh's license is verified
  against its actual source (not just a wrapping repo's claim) and recorded
  in `public/models/LICENSES.md`; pieces with no compliant source available
  (stomach, cell organelles, DNA) stay clearly-labeled procedural work
  instead of being passed off as scans.
- Broad future expansion remains documented in `COMPLETION_TRACKER.md`; deployed
  controls are functional and unfinished advanced scope is not disguised.
