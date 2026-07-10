import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0d0d0d]">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-72 overflow-hidden border-white/[0.08] p-6 sm:p-10 lg:border-r lg:p-12">
            <div className="drafting-grid absolute inset-0 opacity-25" />
            <div className="relative flex h-full flex-col justify-between gap-16">
              <Image src="/brand/d.ark-wordmark2.svg" alt="D.ARK+ Dolores Arkitecture" width={152} height={32} className="h-8 w-auto self-start brightness-0 invert" />
              <p className="display-condensed max-w-2xl text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.82] text-[#f0ede8]">Thoughtful spaces.<br /><span className="text-[#c8a96e]">Drawn for life.</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <nav className="divide-y divide-white/[0.08] border-r border-white/[0.08]">
              {LINKS.map((link) => <Link key={link.href} href={link.href} className="flex min-h-16 items-center px-6 font-display text-base font-semibold uppercase tracking-[0.08em] text-[#9e9b97] transition-colors hover:bg-[#c8a96e] hover:text-[#0d0d0d]">{link.label}</Link>)}
            </nav>
            <div className="flex flex-col justify-between p-6 text-xs leading-relaxed text-[#9e9b97]">
              <div><p className="technical-label mb-3 text-[#5e5c59]">Studio</p><p>Bay 2-A, Maryville Place<br />Kamputhaw, Cebu City</p></div>
              <div className="mt-10"><a href="mailto:info@darkplus.studio" className="hover:text-[#c8a96e]">info@darkplus.studio</a><br /><a href="tel:+63322529127" className="hover:text-[#c8a96e]">+63 32 252 9127</a></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/[0.08] px-6 py-5 technical-label text-[#5e5c59] sm:flex-row sm:px-10 lg:px-12">
          <span>© {new Date().getFullYear()} Dolores Arkitecture</span><span>Cebu, Philippines / Est. 2013</span>
        </div>
      </div>
    </footer>
  );
}
