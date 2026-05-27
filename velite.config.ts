import { defineConfig, defineCollection, s } from "velite";

// ─── Shared field groups ──────────────────────────────────────────────────────

const seoFields = {
  seo: s
    .object({
      description: s.string().optional(),
      ogImage: s.string().optional(),
    })
    .optional(),
};

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("projects"),
      category: s.enum([
        "Residential",
        "Commercial",
        "Institutional",
        "Interior",
        "Masterplanning",
      ]),
      location: s.string(),
      year: s.number().int().min(1990).max(2100),
      status: s.enum(["Concept", "In Progress", "Completed"]),
      featured: s.boolean().default(false),
      summary: s.string(),
      coverImage: s.string(),
      gallery: s.array(s.string()).default([]),
      model: s.string().optional(),
      modelPoster: s.string().optional(),
      client: s.string().optional(),
      area: s.string().optional(),
      services: s.array(s.string()).default([]),
      ...seoFields,
    })
    .transform((data) => ({
      ...data,
      permalink: `/projects/${data.slug}`,
    })),
});

// ─── Services ─────────────────────────────────────────────────────────────────

const services = defineCollection({
  name: "Service",
  pattern: "services/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("services"),
      icon: s.string(),
      order: s.number().int().default(99),
      summary: s.string(),
      coverImage: s.string(),
      ...seoFields,
    })
    .transform((data) => ({
      ...data,
      permalink: `/services/${data.slug}`,
    })),
});

// ─── Blog ─────────────────────────────────────────────────────────────────────

const blog = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("blog"),
      date: s.isodate(),
      author: s.string().default("D.Ark+ Team"),
      excerpt: s.string(),
      coverImage: s.string(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      ...seoFields,
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/${data.slug}`,
    })),
});

// ─── Config ───────────────────────────────────────────────────────────────────

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8].[ext]",
    clean: true,
  },
  collections: { projects, services, blog },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
