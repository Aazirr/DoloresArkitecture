"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

// ─── Architectural building composition ───────────────────────────────────────

function Building() {
  return (
    <group position={[0, 0, 0]}>
      {/* Base / plinth */}
      <mesh position={[0, 0.08, 0]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.16, 2]} />
        <meshStandardMaterial color="#111" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Main ground-floor volume */}
      <mesh position={[0, 0.55, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.6, 0.7, 1.7]} />
        <meshStandardMaterial color="#1a1818" roughness={0.88} metalness={0.12} />
      </mesh>

      {/* Second-floor setback */}
      <mesh position={[0.15, 1.15, 0]} castShadow>
        <boxGeometry args={[2, 0.7, 1.5]} />
        <meshStandardMaterial color="#141212" roughness={0.82} metalness={0.18} />
      </mesh>

      {/* Third-floor penthouse */}
      <mesh position={[0.05, 1.7, 0]} castShadow>
        <boxGeometry args={[1.3, 0.4, 1.2]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.75} metalness={0.25} />
      </mesh>

      {/* Rooftop mechanical box */}
      <mesh position={[-0.2, 1.95, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Amber accent strip — ground floor fascia */}
      <mesh position={[0, 0.905, 0.856]}>
        <boxGeometry args={[2.61, 0.03, 0.005]} />
        <meshStandardMaterial
          color="#c8a96e"
          roughness={0.15}
          metalness={0.9}
          emissive="#c8a96e"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Amber accent strip — second floor fascia */}
      <mesh position={[0.15, 1.505, 0.756]}>
        <boxGeometry args={[2.01, 0.025, 0.005]} />
        <meshStandardMaterial
          color="#c8a96e"
          roughness={0.15}
          metalness={0.9}
          emissive="#c8a96e"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Dark glazing — ground floor front */}
      <mesh position={[-0.55, 0.55, 0.857]}>
        <boxGeometry args={[0.7, 0.5, 0.005]} />
        <meshStandardMaterial
          color="#0d1420"
          roughness={0.0}
          metalness={0.95}
          opacity={0.85}
          transparent
        />
      </mesh>
      <mesh position={[0.45, 0.55, 0.857]}>
        <boxGeometry args={[0.5, 0.5, 0.005]} />
        <meshStandardMaterial
          color="#0d1420"
          roughness={0.0}
          metalness={0.95}
          opacity={0.85}
          transparent
        />
      </mesh>

      {/* Side windows */}
      <mesh position={[-1.301, 0.55, 0]}>
        <boxGeometry args={[0.005, 0.4, 0.6]} />
        <meshStandardMaterial
          color="#0d1420"
          roughness={0.0}
          metalness={0.95}
          opacity={0.7}
          transparent
        />
      </mesh>
    </group>
  );
}

// ─── Public component API ─────────────────────────────────────────────────────

export interface DemoSceneProps {
  autoRotate?: boolean;
  className?: string;
}

export default function DemoScene({
  autoRotate = true,
  className = "",
}: DemoSceneProps) {
  const orbitRef = useRef<React.ElementRef<typeof OrbitControls>>(null);
  const reduce = useReducedMotion();
  const [hintDismissed, setHintDismissed] = useState(false);

  return (
    <div className={`relative bg-[#080808] ${className}`}>
      <Canvas
        frameloop="demand"
        camera={{ position: [5, 3, 5], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[6, 9, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Warm amber fill from left */}
        <pointLight position={[-4, 3, -2]} intensity={0.6} color="#c8a96e" />
        {/* Cool blue rim from back */}
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#1a2840" />

        <Building />

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={5}
        />

        <Environment preset="city" />

        <OrbitControls
          ref={orbitRef}
          target={[0, 0.9, 0]}
          autoRotate={autoRotate && !reduce}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={4}
          maxDistance={14}
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
