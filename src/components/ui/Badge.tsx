import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}

export default function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[9px] font-medium uppercase tracking-[0.28em]",
        variant === "default" && "text-[#9e9b97]",
        variant === "accent" && "text-[#c8a96e]",
        variant === "outline" &&
          "border border-white/10 px-3 py-1 text-[#9e9b97]",
        className
      )}
    >
      {children}
    </span>
  );
}
