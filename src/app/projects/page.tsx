import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse D.ARK+ completed and in-progress architectural projects across Cebu and the Philippines — residential, commercial, and institutional.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Header */}
      <section className="drafting-grid border-b border-white/[0.08] pb-20 pt-24">
        <Container>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
            Portfolio
          </p>
          <h1 className="display-condensed max-w-4xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] text-[#f0ede8]">
            Selected{" "}
            <span className="text-[#c8a96e]">
              work
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#9e9b97]">
            Architecture and interior design projects across Cebu and the
            Philippines — residential, commercial, and institutional.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-20">
        <Container>
          {projects.length === 0 ? (
            <p className="font-mono text-sm text-[#5e5c59]">
              Projects coming soon.
            </p>
          ) : (
            <div className="grid gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <Link
                    key={project.slug}
                    href={project.permalink}
                    className="group relative flex h-full flex-col overflow-hidden border border-white/[0.06] bg-[#0d0d0d] transition-all duration-500 hover:border-[#c8a96e]/40"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                      <div className="drafting-grid absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" />
                      <span className="pointer-events-none absolute right-4 top-4 font-mono text-7xl font-light leading-none text-[#c8a96e]/[0.1] transition-all duration-500 group-hover:text-[#c8a96e]/[0.2]">
                        {num}
                      </span>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="accent">{project.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#c8a96e] opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-[#0d0d0d]" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 h-px w-0 bg-[#c8a96e]/50 transition-all duration-500 group-hover:w-8" />
                      <h2 className="text-base font-light tracking-wide text-[#f0ede8] transition-colors group-hover:text-[#c8a96e]">
                        {project.title}
                      </h2>
                      <p className="mt-1 font-mono text-xs text-[#5e5c59]">
                        {project.location} &nbsp;·&nbsp; {project.year}
                      </p>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#9e9b97]">
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
