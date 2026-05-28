import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { getAllServices } from "@/lib/content";

export default function ServicesOverview() {
  const services = getAllServices();

  return (
    <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-28">
      <Container>
        {/* Section header */}
        <Reveal className="mb-16">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
            What we do
          </p>
          <h2 className="text-4xl font-extralight tracking-tight text-[#f0ede8] sm:text-5xl">
            Our{" "}
            <span
              className="font-display italic text-[#c8a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              services
            </span>
          </h2>
        </Reveal>

        {/* Numbered list */}
        <StaggerGroup className="divide-y divide-white/[0.06]">
          {services.map((service, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={service.permalink}
                  className="group flex items-center gap-6 py-7 transition-colors sm:gap-10"
                >
                  {/* Number */}
                  <span className="w-10 shrink-0 font-mono text-sm text-[#c8a96e]/40 transition-colors group-hover:text-[#c8a96e]">
                    {num}
                  </span>

                  {/* Title + desc */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-extralight tracking-wide text-[#f0ede8] transition-colors group-hover:text-[#c8a96e] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-1 hidden text-sm text-[#5e5c59] sm:block">
                      {service.summary}
                    </p>
                  </div>

                  {/* Expanding rule */}
                  <div className="hidden flex-1 sm:block">
                    <div className="h-px w-full origin-left scale-x-0 bg-[#c8a96e]/25 transition-transform duration-500 group-hover:scale-x-100" />
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#5e5c59] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c8a96e]" />
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
