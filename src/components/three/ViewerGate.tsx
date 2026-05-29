"use client";

import { Monitor } from "lucide-react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ModelViewer } from "@/components/three";
import { ViewerErrorBoundary } from "@/components/three/ViewerErrorBoundary";

interface ViewerGateProps {
  src: string;
  poster?: string;
}

/**
 * Renders the 3D model viewer on desktop only.
 * On mobile, shows a static fallback to avoid loading WebGL/three.js.
 */
export function ViewerGate({ src, poster }: ViewerGateProps) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#080808]">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt="Project render"
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <>
            <Monitor className="h-6 w-6 text-[#c8a96e]/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
              View on desktop to explore in 3D
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <ViewerErrorBoundary poster={poster}>
      <ModelViewer
        src={src}
        poster={poster}
        autoRotate
        environment="city"
        className="absolute inset-0 h-full w-full"
      />
    </ViewerErrorBoundary>
  );
}
