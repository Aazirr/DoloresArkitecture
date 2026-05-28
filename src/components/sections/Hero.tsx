"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const lineItem: Variants = {
    hidden: { opacity: 0, scaleX: 0 },
    show: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 1, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ y: reduce ? 0 : bgY }}
      >
        <Image
          src="/brand/auth-background-dark.webp"
          alt=""
          fill
          priority
          className="scale-110 object-cover opacity-50"
          sizes="100vw"
        />
      </motion.div>

      {/* Radial vignette — darkens corners, keeps centre open */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 50%, transparent 20%, rgba(13,13,13,0.65) 65%, rgba(13,13,13,0.97) 100%)",
        }}
      />
      {/* Top + bottom hard fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-transparent to-[#0d0d0d]/80"
      />

      {/* Brand motif curves — right */}
      <motion.img
        src="/brand/brand-motif-curves.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-auto select-none opacity-[0.07]"
        draggable={false}
        initial={{ opacity: 0, x: reduce ? 0 : 60 }}
        animate={{ opacity: 0.07, x: 0 }}
        transition={{ duration: 2, ease: EASE, delay: 0.3 }}
      />

      {/* Amber atmospheric glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 60%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: EASE }}
      />

      {/* Content */}
      <motion.div
        style={{
          y: reduce ? 0 : contentY,
          opacity: reduce ? 1 : contentOpacity,
        }}
        className="relative z-10 w-full px-6"
      >
        <Container className="flex flex-col items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Film-credit eyebrow */}
            <motion.p
              variants={item}
              className="mb-12 font-mono text-[10px] uppercase tracking-[0.55em] text-[#c8a96e]/60"
            >
              Architecture Studio &nbsp;·&nbsp; Cebu &nbsp;·&nbsp; Est.&thinsp;2013
            </motion.p>

            {/* Headline — large, tight, mixed typefaces */}
            <motion.h1
              variants={item}
              className="max-w-5xl font-sans text-[clamp(3.2rem,10vw,9.5rem)] font-extralight leading-[0.9] tracking-tighter text-[#f0ede8]"
            >
              Crafting spaces
              <br />
              <span
                className="font-display italic text-[#c8a96e]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                that speak.
              </span>
            </motion.h1>

            {/* Amber rule */}
            <motion.div
              variants={lineItem}
              className="my-10 h-px w-20 origin-left bg-[#c8a96e]/50"
            />

            {/* Sub-copy — minimal */}
            <motion.p
              variants={item}
              className="max-w-xs text-sm leading-loose tracking-wide text-[#9e9b97]"
            >
              Where every detail is considered,
              <br />
              every space is intentional.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
            >
              <ButtonLink href="/projects" variant="primary" size="lg">
                View Projects
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: EASE }}
      >
        <motion.div
          className="h-14 w-px bg-gradient-to-b from-transparent to-[#c8a96e]/40"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#5e5c59]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
