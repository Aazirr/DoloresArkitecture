"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/layout/AccessGate";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled || open
          ? "border-white/[0.10] bg-[#0d0d0d]/94 backdrop-blur-md"
          : "border-white/[0.08] bg-[#0d0d0d]"
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-[100rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-70"
          onClick={() => setOpen(false)}
          aria-label="D.ARK+ — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/d.ark-wordmark2.svg"
            alt="D.ARK+"
            className="h-6 w-auto brightness-0 invert"
            draggable={false}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden h-full items-center md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex h-full items-center border-x border-transparent px-5 font-display text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
                    active
                      ? "border-white/[0.08] bg-white/[0.025] text-[#c8a96e]"
                      : "text-[#9e9b97] hover:border-white/[0.08] hover:text-[#f0ede8]"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout — desktop */}
        <button
          onClick={logout}
          title="Lock site"
          aria-label="Log out"
          className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.28em] text-[#5e5c59] transition-colors hover:text-[#c8a96e] md:flex"
        >
          <LogOut className="h-3 w-3" />
          Lock
        </button>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-[#9e9b97] transition-colors hover:text-[#f0ede8] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#0d0d0d] md:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm tracking-wide transition-colors",
                      active
                        ? "text-[#c8a96e]"
                        : "text-[#9e9b97] hover:text-[#f0ede8]"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-white/[0.06] px-4 py-3 sm:px-6">
            <button
              onClick={logout}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#5e5c59] transition-colors hover:text-[#c8a96e]"
            >
              <LogOut className="h-3 w-3" />
              Lock site
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
