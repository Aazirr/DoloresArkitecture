import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import MDXContent from "@/components/MDXContent";
import { ViewerGate } from "@/components/three/ViewerGate";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.seo?.description ?? project.summary,
    openGraph: { images: project.seo?.ogImage ? [project.seo.ogImage] : [] },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIdx = allProjects.findIndex((p) => p.slug === slug);
  const prev = allProjects[currentIdx - 1] ?? null;
  const next = allProjects[currentIdx + 1] ?? null;

  return (
    <>
      {/* Header */}
      <section className="drafting-grid border-b border-white/[0.08] pb-16 pt-24">
        <Container>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-[#9e9b97] transition-colors hover:text-[#f0ede8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>

          <div className="flex flex-wrap items-start gap-3">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant="default">{project.status}</Badge>
          </div>

          <h1 className="display-condensed mt-4 max-w-4xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.82] text-[#f0ede8]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#9e9b97]">
            {project.summary}
          </p>

          {/* Meta grid */}
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-10 sm:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                Location
              </dt>
              <dd className="mt-1 text-sm text-[#f0ede8]">{project.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                Year
              </dt>
              <dd className="mt-1 text-sm text-[#f0ede8]">{project.year}</dd>
            </div>
            {project.area && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                  Area
                </dt>
                <dd className="mt-1 text-sm text-[#f0ede8]">{project.area}</dd>
              </div>
            )}
            {project.client && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                  Client
                </dt>
                <dd className="mt-1 text-sm text-[#f0ede8]">{project.client}</dd>
              </div>
            )}
          </dl>
        </Container>
      </section>

      {/* 3D Viewer — only rendered when a model is available */}
      {project.model && (
        <section className="border-b border-white/[0.06] bg-[#080808]">
          <div className="relative aspect-video w-full">
            <ViewerGate src={project.model} poster={project.modelPoster} />
          </div>
          <div className="border-t border-white/[0.04] px-4 py-3">
            <p className="mx-auto max-w-7xl font-mono text-[9px] uppercase tracking-[0.4em] text-[#5e5c59]">
              Interactive 3D model · Drag to orbit · Scroll to zoom
            </p>
          </div>
        </section>
      )}

      {/* MDX body */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <MDXContent code={project.content} />
        </Container>
      </section>

      {/* Services tags */}
      {project.services.length > 0 && (
        <section className="border-t border-white/[0.06] py-12">
          <Container>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
              Scope of work
            </p>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <Badge key={s} variant="default">
                  {s}
                </Badge>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="border-t border-white/[0.06] py-12">
          <Container className="flex justify-between gap-4">
            {prev ? (
              <Link href={prev.permalink} className="group flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5e5c59] transition-colors group-hover:text-[#c8a96e]">
                  ← Previous
                </span>
                <span className="text-sm text-[#f0ede8]">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={next.permalink}
                className="group flex flex-col items-end gap-1 text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5e5c59] transition-colors group-hover:text-[#c8a96e]">
                  Next →
                </span>
                <span className="text-sm text-[#f0ede8]">{next.title}</span>
              </Link>
            )}
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/[0.06] bg-[#161616] py-20">
        <Container className="flex flex-col items-center text-center">
          <h2 className="display-condensed text-4xl leading-none text-[#f0ede8]">
            Interested in working together?
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#9e9b97]">
            Tell us about your project and we&apos;ll get back to you within two
            business days.
          </p>
          <ButtonLink
            href="/contact"
            variant="primary"
            size="md"
            className="mt-8"
          >
            Start a conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
