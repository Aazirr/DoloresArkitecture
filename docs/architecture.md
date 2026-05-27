# Architecture

## Overview

The site is a **statically-generated Next.js application** with a handful of dynamic edges
(the contact form's API route). There is **no database and no CMS server** — content lives
as MDX files compiled at build time, and the only runtime backend is a serverless function
that relays contact inquiries via email.

```
                          ┌─────────────────────────────────────────────┐
                          │                  Vercel                      │
                          │                                              │
  Visitor ──── HTTPS ───▶ │  Next.js (App Router)                        │
                          │   ├─ Static pages (SSG)  ── Global CDN        │
                          │   ├─ React Three Fiber 3D viewer (client)     │
                          │   └─ /api/contact (Serverless Route Handler)  │
                          └───────────────┬──────────────────────────────┘
                                          │
                       ┌──────────────────┼─────────────────────┐
                       ▼                                          ▼
                 Resend (email)                          Cloudflare Turnstile
              inquiry → firm inbox                          bot verification

  Build time:
   MDX content ──▶ Velite (Zod validation) ──▶ typed data ──▶ static pages
   GLB models  ──▶ /public/models (served from CDN, lazy-loaded on demand)
```

## Rendering strategy

| Page type | Strategy | Reason |
| --- | --- | --- |
| Home, About, Services | **SSG** (static) | Content rarely changes; fastest possible delivery. |
| Project detail / showcase | **SSG** | Generated from MDX at build; 3D assets lazy-loaded client-side. |
| Blog index & posts | **SSG** | Generated from MDX; rebuild on content push. |
| Contact form submit | **Serverless function** (`/api/contact`) | Needs server-side email + spam verification. |
| 3D viewer | **Client Components** (`"use client"`) | WebGL requires the browser; mounted lazily below the fold or on interaction. |

Static pages are revalidated by **redeploying on git push** (content is in the repo, so a
push that changes MDX triggers a fresh build). No ISR needed for v1.

## Component layering

```
app/                     Routes, layouts, page-level data fetching (server components)
 └─ page.tsx             Server component: reads Velite data, renders sections
     └─ sections/        Marketing sections (Hero, FeaturedProjects, CTA …)
         └─ ui/          Reusable primitives (Button, Card, Container …)
         └─ three/       Client-only 3D components (ModelViewer, Scene, Controls)
```

- **Server Components by default.** Data reading (Velite content) happens on the server.
- **Client Components only where needed:** the 3D canvas, interactive forms, animated
  menus. These are isolated so the static HTML stays light.
- **The 3D viewer is code-split.** It is dynamically imported (`next/dynamic`, `ssr: false`)
  so three.js (~hundreds of KB) never blocks initial page load and never runs on the server.

## Data flow

1. **Authoring:** A team member adds/edits an MDX file under `content/` and drops a GLB into
   `public/models/`.
2. **Build:** Velite validates frontmatter against Zod schemas and generates typed JSON +
   typed imports. Next.js statically renders all pages.
3. **Serve:** Vercel's CDN serves pre-rendered HTML and static assets globally.
4. **Interact:** When a visitor opens a project, the client-side 3D viewer fetches the GLB on
   demand, decodes Draco/Meshopt geometry, and renders it with OrbitControls.
5. **Inquire:** The contact form posts to `/api/contact`, which verifies the Turnstile token
   and sends an email via Resend to the firm.

## Cross-cutting concerns

- **SEO:** Per-route metadata (Metadata API), JSON-LD `LocalBusiness` schema, OG images,
  `next-sitemap`. Static rendering guarantees crawlable HTML.
- **Performance budget:** Initial route JS kept lean; 3D and below-the-fold media lazy-loaded.
  Target Lighthouse ≥ 90 on mobile. See [3d-showcase.md](./3d-showcase.md) for 3D budgets.
- **Accessibility:** Semantic HTML, Radix primitives for interactive widgets, keyboard
  controls and reduced-motion fallbacks for the 3D viewer.
- **Error handling:** App Router `error.tsx` / `not-found.tsx` boundaries; the 3D viewer has
  a Suspense fallback and a graceful "couldn't load model" state.
- **Security:** Form input validated with Zod on the server; secrets (Resend, Turnstile keys)
  in Vercel environment variables; rate-limiting on the contact route.

## Decisions deliberately deferred

- **Headless CMS** — not needed for launch (content is local files). The Velite content layer
  isolates content access so a CMS can replace it later without UI changes.
- **i18n (English/Cebuano/Filipino)** — English-only for v1; the App Router supports adding
  locale segments later if desired.
- **ISR / on-demand revalidation** — unnecessary while content ships via git.
