import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with D.ARK+ (Dolores Arkitecture). Share your brief and start a conversation about your residential, commercial, or interior design project.",
};

const DETAILS = [
  {
    icon: MapPin,
    label: "Studio",
    value: "Bay 2-A, Maryville Place\nC.S. Rosal cor. Acacia St.\nKamputhaw, Cebu City",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 32 252 9127",
    href: "tel:+63322529127",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@darkplus.studio",
    href: "mailto:info@darkplus.studio",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Friday\n9:00 AM – 6:00 PM PHT",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="drafting-grid border-b border-white/[0.08] pb-20 pt-24">
        <Container>
          <Reveal>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em] text-[#c8a96e]/60">
              Get in touch
            </p>
            <h1 className="display-condensed max-w-4xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] text-[#f0ede8]">
              Let&apos;s talk about
              <br />
              <span className="text-[#c8a96e]">
                your project.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#9e9b97]">
              We take on a small number of projects each year to ensure every
              client gets our full attention. Share your brief and we&apos;ll get
              back to you within two business days.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Two-column layout */}
      <section className="py-24">
        <Container>
          <div className="grid gap-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">

            {/* Left — studio details */}
            <Reveal direction="left" className="space-y-10">
              <div>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[#5e5c59]">
                  Studio details
                </p>
                <div className="space-y-8">
                  {DETAILS.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-4">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-white/[0.06] bg-[#161616]">
                        <Icon className="h-3.5 w-3.5 text-[#c8a96e]/70" />
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#5e5c59]">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1 block whitespace-pre-line text-sm text-[#9e9b97] transition-colors hover:text-[#c8a96e]"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-1 whitespace-pre-line text-sm text-[#9e9b97]">
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/[0.06]" />

              {/* Established note */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59]">
                  Est. 2013
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#9e9b97]">
                  Dolores Arkitecture has been crafting thoughtful spaces in
                  Cebu and the Philippines for over a decade.
                </p>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal direction="right" delay={0.1}>
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[#5e5c59]">
                Send an enquiry
              </p>
              <ContactForm />
            </Reveal>

          </div>
        </Container>
      </section>
    </>
  );
}
