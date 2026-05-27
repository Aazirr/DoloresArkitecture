# Content Model

All marketing content lives as **MDX files** in `content/`, validated at build time by
**Velite** against **Zod** schemas. This gives type-safe content with no CMS server.

## Collections

| Collection | Location | Route | Purpose |
| --- | --- | --- | --- |
| Projects | `content/projects/*.mdx` | `/projects/[slug]` | Showcased designs, each with a 3D model |
| Services | `content/services/*.mdx` | `/services/[slug]` | Services the firm offers |
| Blog | `content/blog/*.mdx` | `/blog/[slug]` | Articles, news, awards (SEO) |

## Project schema

```yaml
---
title: "Villa Mactan"
slug: "villa-mactan"              # = filename; drives URL
category: "Residential"           # Residential | Commercial | Institutional | Interior
location: "Mactan, Cebu"
year: 2024
status: "Completed"               # Concept | In Progress | Completed
featured: true                    # show on home page
summary: "A coastal villa blending tropical modernism with..."
coverImage: "/images/villa-mactan-cover.jpg"
gallery:
  - "/images/villa-mactan-1.jpg"
  - "/images/villa-mactan-2.jpg"
model: "/models/villa-mactan.glb" # optional: enables the 3D viewer
modelPoster: "/images/villa-mactan-render.jpg"  # fallback if 3D fails
client: "Private"                 # optional
area: "420 sqm"                   # optional
services: ["Architectural Design", "Interior Design"]
seo:
  description: "..."              # optional override
  ogImage: "/images/..."         # optional
---

MDX body: narrative about the project, design intent, materials…
```

## Service schema

```yaml
---
title: "Residential Design"
slug: "residential-design"
icon: "home"                      # lucide icon name
order: 1                          # sort order on the services page
summary: "Custom homes designed around how you live."
coverImage: "/images/services/residential.jpg"
---

MDX body: detailed description, process, deliverables…
```

## Blog post schema

```yaml
---
title: "How to Choose an Architect in Cebu"
slug: "choosing-an-architect"
date: 2026-03-01
author: "D.Ark+ Team"
excerpt: "What to look for when hiring an architecture firm…"
coverImage: "/images/blog/choosing-architect.jpg"
tags: ["guides", "hiring"]
draft: false                      # drafts excluded from production build
---

MDX body…
```

## Site-wide content

Static singletons (firm info, contact details, social links) live in a small typed config —
`content/site.ts` or `lib/site.ts` — used for the footer, contact page, and JSON-LD:

```ts
export const site = {
  name: "D.Ark+ — Dolores Arkitecture",
  tagline: "Architecture studio based in Cebu, Philippines",
  email: "hello@…",
  phone: "+63 …",
  address: { street: "…", city: "Cebu City", region: "Cebu", country: "PH" },
  socials: { instagram: "…", facebook: "…" },
};
```

## Validation rules (enforced by Zod via Velite)

- `slug` is required and unique per collection.
- `model` (if present) must point to an existing path under `/public/models/`.
- Dates must be valid ISO dates.
- Images referenced in frontmatter should exist under `/public`.
- `draft: true` posts are excluded from the production build.

## Authoring workflow

1. Create `content/<collection>/<slug>.mdx` with valid frontmatter.
2. Add referenced images to `public/images/` and (for projects) a GLB to `public/models/`.
3. Commit & push → Vercel rebuilds → content is live. Velite fails the build if a schema
   is violated, so broken content can't reach production.
