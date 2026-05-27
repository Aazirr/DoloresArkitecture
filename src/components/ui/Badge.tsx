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
        "inline-block text-xs font-medium uppercase tracking-widest",
        variant === "default" && "text-[#9e9b97]",
        variant === "accent" && "text-[#c8a96e]",
        variant === "outline" &&
          "rounded-full border border-white/10 px-3 py-1 text-[#9e9b97]",
        className
      )}
    >
      {children}
    </span>
  );
}
