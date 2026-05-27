import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center">

      {/* Background texture */}
      <Image
        src="/brand/auth-background-dark.webp"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      {/* Dark overlay gradient to ensure text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#0d0d0d]/30 to-[#0d0d0d]/80"
      />

      {/* Brand motif curves — right side atmospheric */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/brand-motif-curves.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-auto select-none opacity-[0.12]"
        draggable={false}
      />

      {/* Subtle amber radial glow at centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <Container className="relative z-10 flex flex-col items-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[#c8a96e]">
          Architecture Studio · Cebu, Philippines
        </p>

        <h1 className="max-w-3xl text-5xl font-extralight leading-[1.1] tracking-tight text-[#f0ede8] sm:text-7xl lg:text-8xl">
          Crafting spaces
          <br />
          <span className="italic text-[#c8a96e]">that speak.</span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-[#9e9b97] sm:text-lg">
          Dolores Arkitecture is a studio dedicated to thoughtful architecture
          and interior design — where every detail is considered, every space is
          intentional.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/projects" variant="primary" size="lg">
            View Projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-12 w-px bg-gradient-to-b from-transparent to-[#c8a96e]/40" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#5e5c59]">
          Scroll
        </span>
      </div>
    </section>
  );
}
