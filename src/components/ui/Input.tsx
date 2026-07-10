import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ─── Shared field wrapper ─────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, error, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#9e9b97]">
        {label}
        {required && <span className="ml-1 text-[#c8a96e]">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-mono text-[10px] text-[#c8a96e]">{error}</p>
      )}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full border border-white/[0.10] bg-[#0d0d0d] px-4 py-3.5 text-sm text-[#f0ede8] placeholder-[#9e9b97] outline-none transition-colors duration-200",
      error
        ? "border-[#c8a96e]"
        : "focus:border-[#c8a96e]",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={5}
    className={cn(
      "w-full resize-none border border-white/[0.10] bg-[#0d0d0d] px-4 py-3.5 text-sm text-[#f0ede8] placeholder-[#9e9b97] outline-none transition-colors duration-200",
      error
        ? "border-[#c8a96e]"
        : "focus:border-[#c8a96e]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(({ className, error, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "w-full cursor-pointer appearance-none border border-white/[0.10] bg-[#0d0d0d] px-4 py-3.5 text-sm text-[#f0ede8] outline-none transition-colors duration-200",
      error
        ? "border-[#c8a96e]"
        : "focus:border-[#c8a96e]",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
