"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, PROJECT_TYPES, type ContactFormData } from "@/lib/schemas/contact";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-6 py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c8a96e]/30 bg-[#c8a96e]/10">
          <CheckCircle className="h-5 w-5 text-[#c8a96e]" />
        </div>
        <div>
          <h3 className="text-lg font-extralight text-[#f0ede8]">
            Message received.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#9e9b97]">
            Thank you for reaching out. We&apos;ll get back to you within two
            business days.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#5e5c59] transition-colors hover:text-[#c8a96e]"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Honeypot — visually hidden, bots fill this */}
      <div aria-hidden="true" className="hidden">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name?.message}>
          <Input
            placeholder="Your name"
            error={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field label="Email address" required error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            error={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <Input
            type="tel"
            placeholder="+63 9xx xxx xxxx"
            {...register("phone")}
          />
        </Field>

        <Field label="Project type" required error={errors.projectType?.message}>
          <Select error={!!errors.projectType} {...register("projectType")}>
            <option value="" disabled selected>
              Select a type
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#161616]">
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Tell us about your project" required error={errors.message?.message}>
        <Textarea
          placeholder="Describe your project, timeline, and any specific requirements…"
          error={!!errors.message}
          {...register("message")}
        />
      </Field>

      {status === "error" && (
        <div className="flex items-start gap-3 rounded-sm border border-red-500/20 bg-red-500/5 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "inline-flex items-center gap-3 border border-[#c8a96e] bg-[#c8a96e] px-8 py-3.5 text-sm font-light tracking-wide text-[#0d0d0d] transition-all duration-300",
          "hover:bg-transparent hover:text-[#c8a96e]",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
