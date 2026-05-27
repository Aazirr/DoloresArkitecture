# 3D Showcase

The 3D showcase is the site's signature feature: visitors can **orbit, pan, and zoom** around
3D models of the firm's sample designs and projects, directly in the browser.

## Goals

- Smooth, intuitive interaction on **desktop and mobile** (touch).
- Fast loading even on modest Philippine mobile connections.
- Graceful degradation — never block the page if WebGL/model fails.
- Reusable: one `<ModelViewer>` component drives every project page.

## Technology

| Layer | Tool |
| --- | --- |
| WebGL engine | three.js |
| React renderer | @react-three/fiber |
| Helpers | @react-three/drei (`OrbitControls`, `Stage`, `Bounds`, `Environment`, `useGLTF`, `Html`) |
| Model format | glTF 2.0 / **GLB** (binary, single file) |
| Compression | Draco (geometry) + Meshopt; KTX2/Basis for textures |

## Interaction model (controls)

Implemented with drei's `OrbitControls`:

- **Orbit:** left-drag / one-finger drag rotates the camera around the model.
- **Pan:** right-drag / two-finger drag moves the target.
- **Zoom:** scroll / pinch, clamped with `minDistance` / `maxDistance`.
- **Auto-frame:** drei `<Bounds>` fits the model in view on load.
- **Optional auto-rotate** when idle for an attractive "showroom" feel.
- **Reset view** button returns to the default camera.
- Polar-angle limits prevent the camera from going under the floor.

## Asset pipeline

```
Architect's model (Revit / SketchUp / Blender / 3ds Max)
        │  export
        ▼
   glTF / GLB  ──▶  optimize: gltf-transform / gltfpack
                     • Draco + Meshopt compression
                     • texture resize + KTX2/Basis
                     • prune unused nodes/materials
        │
        ▼
   public/models/<slug>.glb   (committed or via Git LFS if large)
        │  optional
        ▼
   gltfjsx  ──▶  typed React component (for fine control / hotspots)
```

**Authoring guidelines for the team:**
- Keep each model under a sensible budget (target **≤ 5–10 MB** compressed; ideally lower).
- Decimate high-poly geometry; bake details into textures where possible.
- Texture max ~2K; convert to KTX2 for GPU-friendly memory use.
- Center the model near the origin and use real-world scale (meters).
- Name the GLB after the project slug (`villa-mactan.glb`).

## Performance strategy

- **Code-split:** `<ModelViewer>` is loaded via `next/dynamic` with `ssr: false`; three.js
  never ships in the initial bundle and never runs on the server.
- **Lazy mount:** the canvas mounts on scroll-into-view (IntersectionObserver) or on a
  "View in 3D" click, not on initial paint.
- **On-demand frameloop:** `frameloop="demand"` so the GPU renders only during interaction —
  saves battery and CPU.
- **DRACO/Meshopt decoders** loaded from a stable CDN/worker path; cached after first use.
- **Suspense** boundary shows a lightweight loader while the GLB streams in.
- **Single canvas per page** to avoid multiple WebGL contexts.

## UX & accessibility

- Loading state with a branded spinner / progress (drei `useProgress`).
- Clear on-screen hint ("Drag to rotate · Scroll to zoom") that dismisses after first interaction.
- **Reduced motion:** if `prefers-reduced-motion`, disable auto-rotate and intro animation.
- **Fallback:** if WebGL is unavailable or the model errors, show a high-quality static render
  image instead, so the page still communicates the design.
- Touch targets and the reset button are keyboard-focusable.

## Component contract

```tsx
// components/three/ModelViewer.tsx (client, dynamically imported)
<ModelViewer
  src="/models/villa-mactan.glb"
  poster="/images/villa-mactan-render.jpg"  // fallback / pre-load image
  autoRotate
  environment="city"                          // drei Environment preset
/>
```

Internally: `Canvas` → `Suspense` → `Stage`/`Bounds` → `Model (useGLTF)` + `OrbitControls`
+ `Environment`, with `ViewerFallback` for loading/error.

## Testing

- Unit-test the loader/fallback logic (model error → poster shown).
- Manual cross-device QA: desktop (mouse), iOS Safari, Android Chrome (touch).
- Verify no second WebGL context leaks when navigating between project pages.
