# Scope

## Purpose

A marketing website for **D.Ark+ (Dolores Arkitecture)** that showcases the firm's design
work — especially through an interactive **3D showcase** — and converts visitors into
inquiries.

## In scope (v1)

### Pages

| Page | Route | Notes |
| --- | --- | --- |
| Home | `/` | Hero, featured projects, services snapshot, a flagship 3D model, CTA |
| Projects (showcase) | `/projects` | Gallery of projects; light category grouping |
| Project detail | `/projects/[slug]` | Full project + **interactive 3D viewer** |
| Services | `/services` | Overview of what the firm offers |
| Service detail | `/services/[slug]` | Individual service page |
| About / Team | `/about` | Firm story, philosophy, team bios |
| Blog / Insights | `/blog`, `/blog/[slug]` | Articles, news, awards (SEO) |
| Contact | `/contact` | Inquiry form + firm details / map |

### Features

- **Interactive 3D showcase** — orbit/pan/zoom of GLB models on project pages and the home page.
- **Contact / inquiry form** — validated, spam-protected, emails the firm via Resend.
- **Responsive design** — mobile-first; great on phones, tablets, desktops.
- **SEO** — per-page metadata, JSON-LD `LocalBusiness`, sitemap, OG images.
- **Performance** — static generation, lazy-loaded media and 3D, Core Web Vitals targets.
- **Accessibility** — semantic HTML, keyboard support, reduced-motion fallbacks.
- **Local MDX content** — projects, services, and blog authored as files in the repo.

## Out of scope (v1)

- Headless CMS / visual editor (content is local MDX; CMS is a possible later phase).
- E-commerce, online payments, or booking.
- User accounts, authentication, or a client portal.
- Multi-language / i18n (English only for launch).
- Heavy project filtering/search UI (light grouping only in v1).
- VR/AR (WebXR) experiences.
- Real-time / configurator-style 3D (visitors view, not edit, models).

## Non-functional targets

- **Lighthouse (mobile):** Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- **Initial load:** fast first paint with three.js excluded from the initial bundle.
- **3D budget:** models ideally ≤ 5–10 MB compressed; viewer mounts lazily.
- **Browser support:** latest 2 versions of Chrome, Safari, Edge, Firefox (desktop + mobile);
  graceful static-image fallback where WebGL is unavailable.

## Success criteria

- Visitors can browse projects and smoothly interact with at least one 3D model on mobile.
- Inquiry form reliably delivers leads to the firm's inbox.
- Site is discoverable for searches like "architecture firm Cebu".
- The team can publish a new project (text + images + GLB) by adding files and pushing.

## Assumptions & dependencies

- The firm can provide **3D models** in a convertible format (Revit/SketchUp/Blender → glTF/GLB)
  and project photos/renders. Asset prep effort depends on source model quality.
- Brand assets (logo, colors, fonts) are available or to be defined in early design.
- Accounts to provision: Vercel, Resend, Cloudflare Turnstile, domain registrar.
