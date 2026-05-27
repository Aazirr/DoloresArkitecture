import Link from "next/link";
import { Home, Building2, Sofa, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { getAllServices } from "@/lib/content";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  "building-2": Building2,
  sofa: Sofa,
};

export default function ServicesOverview() {
  const services = getAllServices();

  return (
    <Section className="border-t border-white/[0.06] bg-[#0d0d0d]">
      <div className="mb-12">
        <Badge variant="accent" className="mb-3">
          What we do
        </Badge>
        <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8] sm:text-4xl">
          Our services
        </h2>
      </div>

      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = ICON_MAP[service.icon] ?? Home;
          return (
            <Link
              key={service.slug}
              href={service.permalink}
              className="group flex flex-col gap-5 bg-[#0d0d0d] p-8 transition-colors hover:bg-[#161616]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#1f1f1f] text-[#c8a96e] transition-colors group-hover:border-[#c8a96e]/30 group-hover:bg-[#c8a96e]/10">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#5e5c59] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div>
                <h3 className="text-base font-medium text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9e9b97]">
                  {service.summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
