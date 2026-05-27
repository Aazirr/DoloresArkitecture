# Tech Stack

This document lists the chosen technologies and **why** each was selected for a 3D-heavy
marketing site that must be fast, SEO-friendly, and maintainable by a small team.

## Core framework

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 15 (App Router)** | Best-in-class for marketing sites: hybrid static/server rendering, image optimization, file-based routing, first-class Vercel support, and excellent SEO control via the Metadata API. |
| Language | **TypeScript** | Type safety across UI, content schemas, and 3D props. Reduces runtime errors. |
| Runtime/Node | **Node 20 LTS** | Matches Vercel's supported runtime. |
| Package manager | **pnpm** | Fast, disk-efficient, strict dependency resolution. |

## 3D showcase

| Concern | Choice | Why |
| --- | --- | --- |
| Renderer | **three.js** | The de-facto WebGL engine for the web. |
| React bindings | **@react-three/fiber (R3F)** | Lets us express the 3D scene declaratively as React components, integrating cleanly with the rest of the UI. |
| Helpers | **@react-three/drei** | Ready-made `OrbitControls` (pan/orbit/zoom), `useGLTF` loader, `Environment`, `Stage`, `Bounds`, loaders, and shadows. |
| Model format | **glTF 2.0 / GLB** | The "JPEG of 3D" — compact, web-optimized, PBR materials. |
| Compression | **Draco + Meshopt** | Shrinks geometry dramatically for fast loads on mobile/PH bandwidth. |
| Perf tooling | **gltfjsx, three.js DRACOLoader** | Generate typed components from models; decode compressed meshes. |

See [3d-showcase.md](./3d-showcase.md) for the full pipeline.

## UI & styling

| Concern | Choice | Why |
| --- | --- | --- |
| CSS | **Tailwind CSS** | Rapid, consistent styling with a small production bundle. |
| Animation | **Framer Motion** | Smooth page/section transitions and scroll reveals befitting a design firm. |
| Components | **Headless (Radix UI primitives)** | Accessible menus, dialogs, tabs without heavy opinionated styling. |
| Icons | **lucide-react** | Clean, consistent icon set. |
| Fonts | **next/font** (self-hosted) | No layout shift, no third-party requests. |

## Content

| Concern | Choice | Why |
| --- | --- | --- |
| Authoring | **MDX files in repo** | Per the decision to keep content local: projects, services, and blog posts are version-controlled files. |
| Content layer | **Velite** | Type-safe content: validates MDX frontmatter against **Zod** schemas at build time and emits typed data. Modern, actively maintained, simpler than legacy Contentlayer. |
| Markdown plugins | **rehype/remark** (rehype-pretty-code, remark-gfm) | Code highlighting and GitHub-flavored markdown for the blog. |

See [content-model.md](./content-model.md) for schemas.

## Forms & email

| Concern | Choice | Why |
| --- | --- | --- |
| Form state | **React Hook Form** | Performant, minimal re-renders. |
| Validation | **Zod** | Shared schema between client and the server Route Handler. |
| Email delivery | **Resend** | Simple transactional email API; sends inquiry notifications to the firm. |
| Spam protection | **Cloudflare Turnstile** (+ honeypot) | Privacy-friendly, low-friction bot protection. |

## SEO, analytics, quality

| Concern | Choice | Why |
| --- | --- | --- |
| Metadata | **Next.js Metadata API** | Per-route titles, OG images, canonical URLs. |
| Structured data | **JSON-LD** (`LocalBusiness` / `Architect`) | Helps Google show the firm in local/maps results. |
| Sitemap/robots | **next-sitemap** | Auto-generated sitemap & robots.txt. |
| Analytics | **Vercel Analytics + Vercel Speed Insights** | Privacy-friendly, zero-config Core Web Vitals tracking. |
| Linting | **ESLint + Prettier** | Consistent, clean code. |
| Unit tests | **Vitest + React Testing Library** | Fast component/logic testing. |
| E2E (later) | **Playwright** | Smoke-test critical flows (contact form, 3D viewer mount). |

## Why this stack

- **Performance-first:** Next.js static generation + image/3D lazy-loading keeps the
  experience fast even on mobile connections common in the Philippines.
- **3D without the pain:** R3F + drei give us a production-grade viewer in a fraction of
  the code raw three.js would require.
- **Low operational overhead:** No database, no CMS server to maintain — content is files,
  hosting is Vercel, email is a managed API.
- **Future-proof:** If the firm later wants non-technical editing, the Velite content layer
  can be swapped for a headless CMS (e.g. Sanity) without rewriting the UI.
