import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, Sofa, Map, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { getAllServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architectural and interior design services for residential, commercial, and institutional projects in Cebu and throughout the Philippines.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  "building-2": Building2,
  sofa: Sofa,
  map: Map,
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/[0.06] pb-24 pt-32">
        <Container>
          <Badge variant="accent" className="mb-6">
            What we offer
          </Badge>
          <h1 className="max-w-xl text-5xl font-extralight leading-[1.1] tracking-tight text-[#f0ede8] sm:text-6xl">
            Our services
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#9e9b97]">
            From concept to construction, we offer a complete range of
            architectural and interior design services tailored to each
            project's unique requirements.
          </p>
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <Container>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
            {services.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Home;
              return (
                <Link
                  key={service.slug}
                  href={service.permalink}
                  className="group flex flex-col gap-6 bg-[#0d0d0d] p-10 transition-colors hover:bg-[#161616]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1f1f1f] text-[#c8a96e] transition-colors group-hover:border-[#c8a96e]/30 group-hover:bg-[#c8a96e]/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[#5e5c59] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h2 className="text-xl font-light text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#9e9b97]">
                      {service.summary}
                    </p>
                  </div>
                  <span className="mt-auto text-xs font-medium tracking-widest text-[#5e5c59] uppercase transition-colors group-hover:text-[#c8a96e]">
                    Learn more
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process strip */}
      <section className="border-t border-white/[0.06] bg-[#161616] py-24">
        <Container>
          <div className="mb-12">
            <Badge variant="accent" className="mb-4">
              How it works
            </Badge>
            <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8]">
              Our process
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Discovery", desc: "We listen before we design — understanding how you live, your goals, and the constraints of the site." },
              { step: "02", title: "Concept", desc: "We develop a spatial strategy and present schematic options with plans, sections, and 3D studies." },
              { step: "03", title: "Development", desc: "The chosen concept is refined into detailed drawings, material selections, and engineering coordination." },
              { step: "04", title: "Delivery", desc: "We prepare permit documents and remain closely involved through construction to ensure quality." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-[#c8a96e]">
                  {step}
                </span>
                <h3 className="text-base font-medium text-[#f0ede8]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#9e9b97]">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
