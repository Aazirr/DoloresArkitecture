import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#161616] py-24">
      {/* Brand motif curves — left side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/brand-motif-curves.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-12 h-[120%] w-auto select-none opacity-[0.08]"
        draggable={false}
      />
      {/* Horizontal motif — right side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/brand-motif-curves2.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-0 w-72 select-none opacity-[0.06]"
        draggable={false}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#c8a96e]">
          Get in touch
        </p>
        <h2 className="max-w-xl text-3xl font-extralight tracking-tight text-[#f0ede8] sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#9e9b97]">
          We'd love to hear about what you're building. Share your brief and
          let's start a conversation.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Start a project
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/projects" variant="ghost" size="lg">
            Explore our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
