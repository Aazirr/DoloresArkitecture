"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import ArchitecturalDrawing from "@/components/sections/ArchitecturalDrawing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const sequence: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden border-b border-white/[0.08] bg-[#0d0d0d]">
      <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-[100rem] lg:grid-cols-[minmax(22rem,0.78fr)_minmax(38rem,1.22fr)]">
        <motion.div
          variants={sequence}
          initial={false}
          animate="show"
          className="relative z-10 flex flex-col justify-between border-white/[0.08] px-5 pb-8 pt-10 sm:px-8 lg:border-r lg:px-12 lg:pb-10 lg:pt-16"
        >
          <motion.div variants={item} className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="technical-label text-[#c8a96e]">D.ARK+ / Studio</span>
            <span className="technical-label text-[#5e5c59]">Cebu · 10.3157° N</span>
          </motion.div>

          <div className="py-12 lg:py-8">
            <motion.p variants={item} className="mb-6 max-w-sm text-sm leading-relaxed text-[#9e9b97]">
              Architecture and interiors shaped through climate, material, and the rituals of everyday life.
            </motion.p>
            <motion.h1
              variants={item}
              className="display-condensed max-w-2xl text-[clamp(4rem,7.6vw,7.6rem)] leading-[0.78] text-[#f0ede8]"
            >
              Space begins
              <br />
              <span className="text-[#c8a96e]">with a line.</span>
            </motion.h1>
            <motion.div variants={item} className="architectural-rule mt-9 h-px w-full max-w-md bg-white/[0.14]" />
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary" size="lg">
                Explore the work <ArrowRight className="ml-3 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Start a project
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-4">
            <div>
              <span className="technical-label block text-[#5e5c59]">Practice</span>
              <span className="mt-2 block text-xs text-[#9e9b97]">Architecture · Interiors</span>
            </div>
            <a href="#selected-work" className="group flex items-end justify-end gap-3 text-right text-xs text-[#9e9b97] transition-colors hover:text-[#c8a96e]">
              Selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative min-h-[34rem] bg-[#10100f] lg:min-h-full"
          initial={false}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: reduce ? 0 : 1.25, delay: 0.25, ease: EASE }}
        >
          <ArchitecturalDrawing />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(200,169,110,0.08),transparent_36%)]" />
          <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-[#c8a96e]/30 font-display text-xl font-semibold text-[#c8a96e]">
            A+
          </div>
        </motion.div>
      </div>
    </section>
  );
}
