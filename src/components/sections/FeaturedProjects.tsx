import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { getFeaturedProjects } from "@/lib/content";

function ProjectCard({ project }: { project: ReturnType<typeof getFeaturedProjects>[number] }) {
  return (
    <Link
      href={project.permalink}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#161616] transition-colors hover:border-white/[0.12]"
    >
      {/* Image placeholder — replaced with next/image once real photos are provided */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1f1f1f]">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, #1a1a1a 0%, #2a2820 50%, #1a1a18 100%)`,
          }}
        />
        {/* Corner label */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="accent">{project.category}</Badge>
        </div>
        {/* Arrow on hover */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#c8a96e] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4 text-[#0d0d0d]" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-light text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-[#5e5c59]">
          {project.location} · {project.year}
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
    <Section className="bg-[#0d0d0d]">
      <div className="flex items-end justify-between">
        <div>
          <Badge variant="accent" className="mb-3">
            Selected Work
          </Badge>
          <h2 className="text-3xl font-extralight tracking-tight text-[#f0ede8] sm:text-4xl">
            Featured projects
          </h2>
        </div>
        <ButtonLink href="/projects" variant="ghost" size="sm" className="hidden sm:flex">
          All projects
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <ButtonLink href="/projects" variant="secondary" size="md" className="w-full">
          View all projects
        </ButtonLink>
      </div>
    </Section>
  );
}
