import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dolores Arkitecture is an architecture and interior design studio based in Cebu, Philippines. Founded in 2013 by John Kenneth Dolores, we design residential, commercial, and institutional spaces with care for craft and context.",
};

const VALUES = [
  {
    heading: "Contextual",
    body: "Every building we design responds to its specific place — the climate, the culture, the landscape, the street. We don't bring a house style to every project; we bring a process.",
  },
  {
    heading: "Considered",
    body: "Good architecture emerges from deep listening. We spend as much time understanding how our clients live, work, and move through space as we spend drawing.",
  },
  {
    heading: "Crafted",
    body: "The details matter. We believe architecture is made or unmade at the junction between two materials, in the proportion of a window, in the sequence of rooms.",
  },
];

const TEAM = [
  {
    name: "John Kenneth Dolores",
    title: "Principal Architect",
    initial: "JK",
  },
  {
    name: "Peter Leslie Salva",
    title: "Jr. Architect",
    initial: "PL",
  },
  {
    name: "Lemuel Roque",
    title: "Jr. Architect",
    initial: "LR",
  },
  {
    name: "Hannah Mae Vito",
    title: "Architectural Apprentice",
    initial: "HM",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/[0.06] pb-24 pt-32">
        <Container>
          <Badge variant="accent" className="mb-6">
            About the studio
          </Badge>
          <h1 className="max-w-2xl text-5xl font-extralight leading-[1.1] tracking-tight text-[#f0ede8] sm:text-6xl">
            Architecture shaped
            <br />
            <span className="italic text-[#c8a96e]">by intention.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#9e9b97]">
            D.ARK+ (Dolores Arkitecture) is an architecture and interior design
            studio based in Cebu, Philippines. Founded in 2013, we design spaces
            that are rooted in place, built with care, and shaped around the
            people who use them.
          </p>
        </Container>
      </section>

      {/* Studio story */}
      <Section className="bg-[#0d0d0d]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Badge variant="accent" className="mb-4">
              Our story
            </Badge>
            <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8]">
              Born from a love of making
            </h2>
            <p className="mt-4 text-sm text-[#5e5c59]">Est. 2013 · Cebu, Philippines</p>
          </div>
          <div className="space-y-5 text-[#9e9b97]">
            <p className="text-base leading-relaxed">
              Founded by Principal Architect John Kenneth Dolores in 2013, the
              studio was built on a simple conviction: that the built environment
              shapes how we feel, how we connect, and how we move through the
              world. Architecture done well is invisible — it simply enables life
              to unfold.
            </p>
            <p className="text-base leading-relaxed">
              Based in Kamputhaw, Cebu City, we work across residential,
              commercial, and institutional projects throughout the Philippines.
              Our team is small by design — it lets us stay closely involved in
              every project, from the first sketch to the last site visit.
            </p>
            <p className="text-base leading-relaxed">
              We believe that good work comes from honest relationships. We ask
              a lot of questions, we share our thinking openly, and we stay
              involved through construction.
            </p>
            <div className="pt-4">
              <Image
                src="/brand/signature.png"
                alt="John Kenneth Dolores signature"
                width={160}
                height={64}
                className="opacity-60"
                draggable={false}
              />
              <p className="mt-2 text-xs text-[#5e5c59]">John Kenneth Dolores · Principal Architect</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <section className="border-t border-white/[0.06] py-24">
        <Container>
          <Badge variant="accent" className="mb-12">
            How we work
          </Badge>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            {VALUES.map(({ heading, body }) => (
              <div key={heading} className="bg-[#0d0d0d] p-8">
                <h3 className="mb-3 text-lg font-light text-[#c8a96e]">
                  {heading}
                </h3>
                <p className="text-sm leading-relaxed text-[#9e9b97]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <Section className="border-t border-white/[0.06] bg-[#161616]">
        <div className="mb-12">
          <Badge variant="accent" className="mb-4">
            The team
          </Badge>
          <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8]">
            The people behind the work
          </h2>
        </div>
        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map(({ name, title, initial }) => (
            <div key={name} className="flex flex-col gap-5 bg-[#161616] p-8">
              {/* Avatar placeholder — replace src with real photo when available */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2a2a] text-sm font-light tracking-wide text-[#c8a96e]">
                {initial}
              </div>
              <div>
                <p className="text-sm font-medium text-[#f0ede8]">{name}</p>
                <p className="mt-1 text-xs text-[#5e5c59]">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8]">
            Work with us
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#9e9b97]">
            We take on a small number of projects each year to ensure every
            client receives our full attention.
          </p>
          <ButtonLink href="/contact" variant="primary" size="lg" className="mt-8">
            Get in touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
