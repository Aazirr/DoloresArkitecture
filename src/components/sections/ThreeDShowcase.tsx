"use client";

import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoViewer } from "@/components/three";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Monitor } from "lucide-react";

export default function ThreeDShowcase() {
  const isDesktop = useIsDesktop();

  return (
    <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-28">
      <Container>
        {/* Header */}
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
            Interactive 3D
          </p>
          <h2 className="text-4xl font-extralight tracking-tight text-[#f0ede8] sm:text-5xl">
            Experience your design{" "}
            <span
              className="font-display italic text-[#c8a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              in three dimensions.
            </span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#9e9b97]">
            Every D.ARK+ project can be explored as an interactive 3D model.
            Orbit, pan, and zoom at your own pace.
          </p>
        </Reveal>

        {/* Canvas — desktop only */}
        <Reveal delay={0.15}>
          <div className="relative aspect-video overflow-hidden border border-white/[0.06]">
            {isDesktop ? (
              <>
                <DemoViewer autoRotate className="absolute inset-0 h-full w-full" />
                {/* Live badge */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#c8a96e]/20 bg-black/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.35em] text-[#c8a96e]/70 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c8a96e]" />
                    Interactive Model
                  </span>
                </div>
              </>
            ) : (
              /* Mobile fallback — static, no WebGL */
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[#080808]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/brand-motif-curves.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-[0.04]"
                  draggable={false}
                />
                <Monitor className="relative h-7 w-7 text-[#c8a96e]/40" />
                <div className="relative text-center">
                  <p className="text-sm font-light text-[#9e9b97]">
                    3D models are best experienced on desktop.
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                    Visit on a larger screen to explore
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Caption */}
        <Reveal delay={0.25} className="mt-6 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
            Sample architectural composition · D.ARK+
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59] sm:block">
            Real project models available on each project page
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
