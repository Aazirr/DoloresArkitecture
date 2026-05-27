import Link from "next/link";

const LINKS = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services/residential-design", label: "Residential Design" },
    { href: "/services/commercial-design", label: "Commercial Design" },
    { href: "/services/interior-design", label: "Interior Design" },
    { href: "/services/masterplanning", label: "Masterplanning" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#161616]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <p className="text-lg font-semibold tracking-[0.2em] text-[#f0ede8]">
              D.ARK+
            </p>
            <p className="mt-2 text-sm text-[#9e9b97]">Dolores Arkitecture</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5e5c59]">
              Architecture studio crafting thoughtful spaces in Cebu, Philippines.
            </p>
            <p className="mt-6 text-sm text-[#5e5c59]">
              hello@doloresarkitecture.com
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#5e5c59]">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#9e9b97] transition-colors hover:text-[#f0ede8]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[#5e5c59]">
            © {new Date().getFullYear()} Dolores Arkitecture. All rights reserved.
          </p>
          <p className="text-xs text-[#5e5c59]">Cebu, Philippines</p>
        </div>
      </div>
    </footer>
  );
}
