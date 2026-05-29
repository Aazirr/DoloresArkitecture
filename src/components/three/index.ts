"use client";

import dynamic from "next/dynamic";
import type { ModelViewerProps } from "./ModelViewer";
import type { DemoSceneProps } from "./DemoScene";

/**
 * Full GLB model viewer — orbit/pan/zoom a real project model.
 * Lazy-loaded: three.js never ships in the initial bundle.
 */
export const ModelViewer = dynamic<ModelViewerProps>(
  () => import("./ModelViewer"),
  { ssr: false }
);

/**
 * Procedural demo scene — shows the D.ARK+ 3D UI without a GLB file.
 * Used on the home page showcase and as a fallback while real models are pending.
 */
export const DemoViewer = dynamic<DemoSceneProps>(
  () => import("./DemoScene"),
  { ssr: false }
);
