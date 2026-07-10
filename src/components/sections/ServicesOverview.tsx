import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getAllServices } from "@/lib/content";

export default function ServicesOverview() {
  const services = getAllServices();
  return (
    <section className="border-b border-white/[0.08] bg-[#161616]">
      <Container className="grid px-0 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal className="relative flex min-h-[28rem] flex-col justify-between border-white/[0.08] p-6 sm:p-10 lg:border-r lg:p-14">
          <div className="drafting-grid pointer-events-none absolute inset-0 opacity-35" />
          <p className="technical-label relative text-[#c8a96e]">Scope / Full service</p>
          <div className="relative">
            <h2 className="display-condensed text-[clamp(3.6rem,7vw,6.8rem)] leading-[0.8] text-[#f0ede8]">From first mark<br />to final form.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#9e9b97]">One continuous design process, from the earliest site reading through documentation and delivery.</p>
          </div>
        </Reveal>
        <div className="divide-y divide-white/[0.08]">
          {services.map((service, index) => (
            <Link key={service.slug} href={service.permalink} className="group grid min-h-36 grid-cols-[3rem_1fr_auto] items-center gap-5 px-6 py-8 transition-colors hover:bg-[#c8a96e] sm:grid-cols-[5rem_1fr_auto] sm:px-10">
              <span className="font-display text-2xl font-semibold text-[#c8a96e] group-hover:text-[#0d0d0d]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display-condensed text-3xl leading-none text-[#f0ede8] group-hover:text-[#0d0d0d] sm:text-4xl">{service.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9e9b97] group-hover:text-[#0d0d0d]/70">{service.summary}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#5e5c59] transition-transform group-hover:translate-x-2 group-hover:text-[#0d0d0d]" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
