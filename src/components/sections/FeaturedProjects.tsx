import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/lib/content";

function ProjectCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={project.permalink}
      className="group relative flex h-full flex-col overflow-hidden border border-white/[0.06] bg-[#0d0d0d] transition-all duration-500 hover:border-[#c8a96e]/25"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        {/* Placeholder gradient — swap for next/image when photos are ready */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #1e1a14 0%, #111 60%, #0a0a0a 100%)",
          }}
        />
        {/* Large amber number overlay */}
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-7xl font-light leading-none text-[#c8a96e]/[0.12] transition-all duration-500 group-hover:text-[#c8a96e]/[0.22] group-hover:-translate-y-1">
          {num}
        </span>
        {/* Bottom-left category */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="accent">{project.category}</Badge>
        </div>
        {/* Arrow reveal */}
        <div className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#c8a96e] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4 text-[#0d0d0d]" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        {/* Thin amber top-border on hover */}
        <div className="mb-4 h-px w-0 bg-[#c8a96e]/50 transition-all duration-500 group-hover:w-8" />
        <h3 className="text-base font-light tracking-wide text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-[#5e5c59]">
          {project.location} &nbsp;·&nbsp; {project.year}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#9e9b97]">
          {project.summary}
        </p>
      </div>
    </Link>
  );
}

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-28">
      <Container>
        {/* Section header */}
        <Reveal className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
              Selected Work
            </p>
            <h2 className="text-4xl font-extralight tracking-tight text-[#f0ede8] sm:text-5xl">
              Featured{" "}
              <span
                className="font-display italic text-[#c8a96e]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                projects
              </span>
            </h2>
          </div>
          <ButtonLink
            href="/projects"
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
          >
            All projects
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </ButtonLink>
        </Reveal>

        {/* Grid */}
        <StaggerGroup className="grid gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-8 sm:hidden">
          <ButtonLink href="/projects" variant="secondary" size="md" className="w-full">
            View all projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
