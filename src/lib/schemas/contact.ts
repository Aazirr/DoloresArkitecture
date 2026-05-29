import { z } from "zod";

export const PROJECT_TYPES = [
  "Residential Design",
  "Commercial Design",
  "Interior Design",
  "Masterplanning",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.enum(PROJECT_TYPES, {
    error: "Please select a project type",
  }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be under 2000 characters"),
  // Honeypot — must remain empty; bots fill this automatically
  website: z.string().max(0, "Invalid submission").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
