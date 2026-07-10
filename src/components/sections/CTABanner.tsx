import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#c8a96e] text-[#0d0d0d]">
      <div className="drafting-grid absolute inset-0 opacity-25" />
      <Container className="relative grid min-h-[36rem] py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:py-24">
        <Reveal>
          <p className="technical-label mb-8 text-[#0d0d0d]/65">New commissions / 2026–27</p>
          <h2 className="display-condensed max-w-5xl text-[clamp(4rem,9vw,8.5rem)] leading-[0.76] text-[#0d0d0d]">
            Bring the first line.<br />We’ll shape the rest.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-[#0d0d0d]/70">Tell us about the site, the people, and the life the project needs to hold.</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 lg:mt-0">
          <ButtonLink href="/contact" size="lg" className="border-[#0d0d0d] bg-[#0d0d0d] text-[#f0ede8] hover:bg-transparent hover:text-[#0d0d0d]">
            Start a conversation <ArrowUpRight className="ml-3 h-4 w-4" />
          </ButtonLink>
        </Reveal>
        <div className="absolute bottom-6 right-6 hidden h-20 w-20 items-center justify-center rounded-full border border-[#0d0d0d]/25 font-display text-2xl font-semibold lg:flex">D+</div>
      </Container>
    </section>
  );
}
