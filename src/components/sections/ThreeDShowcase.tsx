"use client";

import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DemoViewer } from "@/components/three";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Monitor } from "lucide-react";

export default function ThreeDShowcase() {
  const isDesktop = useIsDesktop();

  return (
    <section className="border-b border-white/[0.08] bg-[#0d0d0d] py-24 lg:py-32">
      <Container>
        {/* Header */}
        <Reveal className="mb-14 grid gap-8 border-b border-white/[0.08] pb-8 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
          <p className="technical-label mb-4 text-[#c8a96e]">
            Spatial study / Interactive 3D
          </p>
          <h2 className="display-condensed text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.82] text-[#f0ede8]">
            Walk through the <span className="text-[#c8a96e]">idea.</span>
          </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#9e9b97] md:justify-self-end">
            Every D.ARK+ project can be explored as an interactive 3D model.
            Orbit, pan, and zoom at your own pace.
          </p>
        </Reveal>

        {/* Canvas — desktop only */}
        <Reveal delay={0.15}>
          <div className="relative aspect-video overflow-hidden border border-white/[0.10] bg-[#080808]">
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
