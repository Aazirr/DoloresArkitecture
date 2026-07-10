import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/lib/content";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section id="selected-work" className="border-b border-white/[0.08] bg-[#0d0d0d] py-24 lg:py-32">
      <Container>
        <Reveal className="mb-12 grid gap-8 border-b border-white/[0.08] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="technical-label mb-4 text-[#c8a96e]">Selected work / Built & imagined</p>
            <h2 className="display-condensed max-w-4xl text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.82] text-[#f0ede8]">
              Projects drawn from <span className="text-[#c8a96e]">place.</span>
            </h2>
          </div>
          <Link href="/projects" className="group flex items-center gap-3 font-display text-base font-semibold uppercase tracking-[0.08em] text-[#9e9b97] transition-colors hover:text-[#c8a96e]">
            Full archive <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <StaggerGroup className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
          {projects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <Link href={project.permalink} className="group relative grid min-h-48 gap-6 py-6 sm:grid-cols-[5rem_1fr_auto] sm:items-center lg:min-h-56">
                <span className="font-display text-5xl font-semibold leading-none text-[#c8a96e]/25 transition-colors group-hover:text-[#c8a96e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3 technical-label text-[#5e5c59]">
                    <span>{project.category}</span><span>—</span><span>{project.location}</span><span>{project.year}</span>
                  </div>
                  <h3 className="display-condensed text-[clamp(2.2rem,4vw,4.4rem)] leading-[0.9] text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#9e9b97]">{project.summary}</p>
                </div>
                <div className="hidden h-32 w-48 overflow-hidden border border-white/[0.08] bg-[#111] lg:block">
                  <div className="drafting-grid h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <svg viewBox="0 0 190 128" className="h-full w-full fill-none stroke-[#c8a96e]/40 stroke-[0.8]">
                      <path d="M16 102h158M32 102V55l40-28 84 32v43M32 55l40 12 84-8M72 27v75M104 64v38M132 62v40" />
                      <circle cx="72" cy="27" r="4" />
                    </svg>
                  </div>
                </div>
                <ArrowUpRight className="absolute right-0 top-8 h-5 w-5 text-[#5e5c59] sm:static sm:justify-self-end lg:hidden" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
