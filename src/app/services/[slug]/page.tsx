import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import MDXContent from "@/components/MDXContent";
import { getAllServices, getServiceBySlug } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.seo?.description ?? service.summary,
    openGraph: { images: service.seo?.ogImage ? [service.seo.ogImage] : [] },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = getAllServices();
  const currentIdx = allServices.findIndex((s) => s.slug === slug);
  const prev = allServices[currentIdx - 1] ?? null;
  const next = allServices[currentIdx + 1] ?? null;

  return (
    <>
      {/* Header */}
      <section className="border-b border-white/[0.06] pb-16 pt-32">
        <Container>
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#9e9b97] transition-colors hover:text-[#f0ede8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All services
          </Link>
          <Badge variant="accent" className="mb-4">
            Service
          </Badge>
          <h1 className="max-w-xl text-4xl font-extralight leading-[1.1] tracking-tight text-[#f0ede8] sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#9e9b97]">
            {service.summary}
          </p>
        </Container>
      </section>

      {/* MDX body */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <MDXContent code={service.content} />
        </Container>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="border-t border-white/[0.06] py-12">
          <Container className="flex justify-between gap-4">
            {prev ? (
              <Link
                href={prev.permalink}
                className="group flex flex-col gap-1"
              >
                <span className="text-xs uppercase tracking-widest text-[#5e5c59] transition-colors group-hover:text-[#c8a96e]">
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
                <span className="text-xs uppercase tracking-widest text-[#5e5c59] transition-colors group-hover:text-[#c8a96e]">
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
          <h2 className="text-2xl font-extralight tracking-tight text-[#f0ede8]">
            Interested in {service.title.toLowerCase()}?
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#9e9b97]">
            Tell us about your project and we'll get back to you within two
            business days.
          </p>
          <ButtonLink href="/contact" variant="primary" size="md" className="mt-8">
            Start a conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
