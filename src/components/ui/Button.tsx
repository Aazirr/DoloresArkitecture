import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-[#c8a96e] text-[#0d0d0d] hover:bg-[#b8965c]",
  secondary:
    "border border-white/15 text-[#f0ede8] hover:border-white/30 hover:bg-white/5",
  ghost: "text-[#9e9b97] hover:text-[#f0ede8]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-xs rounded-md",
  md: "h-11 px-6 text-sm rounded-md",
  lg: "h-13 px-8 text-sm rounded-lg",
};

function getClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={getClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={getClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
