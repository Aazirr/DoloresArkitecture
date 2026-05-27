# D.Ark+ Marketing Website — Documentation

Marketing website for **D.Ark+ (Dolores Arkitecture)**, an architecture firm based in
Cebu, Philippines. The site's signature feature is an interactive **3D showcase** that lets
visitors pan, orbit, and zoom around 3D models of the firm's sample designs and projects.

## Document index

| Doc | Purpose |
| --- | --- |
| [tech-stack.md](./tech-stack.md) | Chosen technologies and the rationale for each |
| [architecture.md](./architecture.md) | System architecture, rendering strategy, data flow |
| [folder-structure.md](./folder-structure.md) | Repository layout and conventions |
| [3d-showcase.md](./3d-showcase.md) | The 3D viewer: model pipeline, performance, UX |
| [content-model.md](./content-model.md) | MDX content schemas for projects, blog, services |
| [scope.md](./scope.md) | What's in and out of scope; pages & features |
| [development-phases.md](./development-phases.md) | Phased delivery plan with checkboxes |
| [deployment.md](./deployment.md) | Hosting, CI/CD, environments, domains |

## At a glance

- **Framework:** Next.js (App Router) + TypeScript
- **3D:** React Three Fiber + drei (three.js) rendering glTF/GLB models
- **Styling:** Tailwind CSS + Framer Motion
- **Content:** Local MDX files, type-checked with Velite (Zod schemas)
- **Forms:** React Hook Form + Zod, email via Resend
- **Hosting:** Vercel

## Core goals

1. **Showcase the firm's design quality** through a fast, polished, image- and 3D-rich site.
2. **Generate inquiries** via a clear contact/lead-capture flow.
3. **Rank well locally** ("architecture firm Cebu") through strong SEO and performance.
4. **Stay maintainable** by a small team — content lives as files in the repo, deployed on push.
