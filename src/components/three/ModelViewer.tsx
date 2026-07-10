"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

// ─── Progress loader (renders inside Canvas via Html) ─────────────────────────

// ─── GLB model primitive ──────────────────────────────────────────────────────

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}

// ─── Public component API ─────────────────────────────────────────────────────

export interface ModelViewerProps {
  src: string;
  poster?: string;
  autoRotate?: boolean;
  environment?: string;
  className?: string;
}

export default function ModelViewer({
  src,
  poster,
  autoRotate = true,
  environment = "city",
  className = "",
}: ModelViewerProps) {
  const orbitRef = useRef<React.ElementRef<typeof OrbitControls>>(null);
  const reduce = useReducedMotion();
  const [hintDismissed, setHintDismissed] = useState(false);
  const [error, setError] = useState(false);

  // Fallback to poster if WebGL errors
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#0a0a0a] ${className}`}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="Project render" className="h-full w-full object-cover opacity-70" />
        ) : (
          <p className="font-mono text-xs text-[#5e5c59]">3D unavailable</p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative bg-[#080808] ${className}`}>
      <Canvas
        frameloop="demand"
        camera={{ position: [4, 2, 5], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        shadows
        onError={() => setError(true)}
      >
        <Stage
          environment={environment as Parameters<typeof Stage>[0]["environment"]}
          adjustCamera={1.2}
          shadows="contact"
          intensity={0.4}
        >
          <Model src={src} />
        </Stage>

        <OrbitControls
          ref={orbitRef}
          autoRotate={autoRotate && !reduce}
          autoRotateSpeed={0.6}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          enablePan
          makeDefault
          onStart={() => setHintDismissed(true)}
        />
      </Canvas>

      {/* Reset camera */}
      <button
        onClick={() => orbitRef.current?.reset()}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/60 text-[#9e9b97] backdrop-blur-sm transition-colors hover:border-[#c8a96e]/40 hover:text-[#c8a96e]"
        aria-label="Reset camera"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>

      {/* Drag hint */}
      <div
        className={`pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${hintDismissed ? "opacity-0" : "opacity-100"}`}
      >
        <p className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.4em] text-[#5e5c59]">
          Drag to explore · Scroll to zoom
        </p>
      </div>
    </div>
  );
}
