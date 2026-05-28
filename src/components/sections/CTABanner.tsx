import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0d0d0d] py-40">
      {/* Background texture — very subtle */}
      <div aria-hidden className="absolute inset-0 opacity-25">
        <Image
          src="/brand/auth-background-dark.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* Fade top + bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]"
      />

      {/* Brand motif — right, very faint */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/brand-motif-curves.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-12 h-[130%] w-auto select-none opacity-[0.05]"
        draggable={false}
      />

      <Container className="relative z-10">
        {/* Eyebrow */}
        <Reveal>
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.55em] text-[#c8a96e]/60">
            Get in touch
          </p>
        </Reveal>

        {/* Large left-aligned headline */}
        <Reveal delay={0.1}>
          <h2 className="max-w-3xl text-[clamp(2.8rem,7vw,7rem)] font-extralight leading-[0.92] tracking-tight text-[#f0ede8]">
            Have a project
            <br />
            <span
              className="font-display italic text-[#c8a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              in mind?
            </span>
          </h2>
        </Reveal>

        {/* Amber rule */}
        <Reveal delay={0.2}>
          <div className="my-10 h-px w-16 bg-[#c8a96e]/40" />
        </Reveal>

        {/* CTA row */}
        <Reveal delay={0.3} className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Start a project
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/projects" variant="ghost" size="lg">
            Explore our work
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
