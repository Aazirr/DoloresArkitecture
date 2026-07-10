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
      <section className="drafting-grid border-b border-white/[0.08] pb-24 pt-24">
        <Container>
          <Badge variant="accent" className="mb-6">
            What we offer
          </Badge>
          <h1 className="display-condensed max-w-4xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] text-[#f0ede8]">
            Design from <span className="text-[#c8a96e]">first principles.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#9e9b97]">
            From concept to construction, we offer a complete range of
            architectural and interior design services tailored to each
            project&apos;s unique requirements.
          </p>
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <Container>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {services.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Home;
              return (
                <Link
                  key={service.slug}
                  href={service.permalink}
                  className="group grid min-h-40 grid-cols-[4rem_1fr_auto] items-center gap-5 bg-[#0d0d0d] px-4 py-8 transition-colors hover:bg-[#c8a96e] sm:px-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-[#1f1f1f] text-[#c8a96e] transition-colors group-hover:border-[#0d0d0d]/30 group-hover:bg-[#0d0d0d]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="display-condensed text-3xl text-[#f0ede8] transition-colors group-hover:text-[#0d0d0d] sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#9e9b97] group-hover:text-[#0d0d0d]/70">
                      {service.summary}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#5e5c59] transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0d0d0d]" />
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
