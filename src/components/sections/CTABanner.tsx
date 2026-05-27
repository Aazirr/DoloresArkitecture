import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="border-t border-white/[0.06] bg-[#161616] py-24">
      <Container className="flex flex-col items-center text-center">
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
