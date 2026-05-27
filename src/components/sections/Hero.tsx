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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* Background texture */}
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
          className="scale-110 object-cover opacity-30"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay gradient to ensure text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#0d0d0d]/30 to-[#0d0d0d]/80"
      />

      {/* Brand motif curves — right side atmospheric */}
      <motion.img
        src="/brand/brand-motif-curves.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-auto select-none opacity-[0.12]"
        draggable={false}
        initial={{ opacity: 0, x: reduce ? 0 : 40 }}
        animate={{ opacity: 0.12, x: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      {/* Subtle amber radial glow at centre */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 65%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      />

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="relative z-10 w-full"
      >
        <Container className="flex flex-col items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.p
              variants={item}
              className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[#c8a96e]"
            >
              Architecture Studio · Cebu, Philippines
            </motion.p>

            <motion.h1
              variants={item}
              className="max-w-3xl text-5xl font-extralight leading-[1.1] tracking-tight text-[#f0ede8] sm:text-7xl lg:text-8xl"
            >
              Crafting spaces
              <br />
              <span className="italic text-[#c8a96e]">that speak.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-lg text-base leading-relaxed text-[#9e9b97] sm:text-lg"
            >
              Dolores Arkitecture is a studio dedicated to thoughtful
              architecture and interior design — where every detail is
              considered, every space is intentional.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
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
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
      >
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-transparent to-[#c8a96e]/40"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#5e5c59]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
