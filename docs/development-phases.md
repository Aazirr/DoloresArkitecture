# Development Phases

Phased delivery plan. Check off items as they're completed.

---

## Phase 0 — Project setup & foundations

- [ ] Initialize Next.js (App Router) + TypeScript project with pnpm
- [ ] Configure Tailwind CSS + base design tokens (colors, typography, spacing)
- [ ] Set up ESLint + Prettier + tsconfig path aliases (`@/…`)
- [ ] Add Velite content layer + Zod schemas (projects, services, blog)
- [ ] Create base layout: Header, Footer, navigation, mobile menu
- [ ] Connect repo to GitHub and deploy a "hello world" to Vercel
- [ ] Define `.env.example` and configure Vercel environment variables

## Phase 1 — Design system & core pages (static)

- [ ] Build UI primitives (Button, Container, Card, Input, Badge, Section)
- [ ] Implement Home page layout (hero, sections, CTA) with placeholder content
- [ ] Implement About / Team page
- [ ] Implement Services overview + service detail (`/services/[slug]`) from MDX
- [ ] Implement global SEO defaults (Metadata API) + favicon/OG image scaffold
- [ ] Responsive pass across breakpoints

## Phase 2 — 3D showcase (the signature feature)

- [ ] Install three.js + @react-three/fiber + @react-three/drei
- [ ] Build `ModelViewer` (Canvas, Stage/Bounds, OrbitControls, Environment)
- [ ] Add Suspense loader + error/poster fallback (`ViewerFallback`)
- [ ] Wire OrbitControls: orbit/pan/zoom, distance/polar limits, reset, auto-rotate
- [ ] Code-split viewer via `next/dynamic` (`ssr: false`); lazy mount on view/click
- [ ] Establish model pipeline: GLB export → Draco/Meshopt compression → `public/models/`
- [ ] Add `frameloop="demand"` + reduced-motion handling
- [ ] Load one real sample model end-to-end and QA on desktop + mobile

## Phase 3 — Projects content & showcase pages

- [ ] Build Projects index (`/projects`) gallery with light category grouping
- [ ] Build Project detail (`/projects/[slug]`) integrating the 3D viewer + gallery
- [ ] Author real project MDX content (3–6 flagship projects)
- [ ] Optimize and add project images (next/image) and GLB models
- [ ] Feature flagship projects + a 3D model on the Home page

## Phase 4 — Contact / lead capture

- [ ] Build Contact page UI + firm details / map embed
- [ ] Implement ContactForm (React Hook Form + shared Zod schema)
- [ ] Add `/api/contact` Route Handler: validate, send email via Resend
- [ ] Integrate Cloudflare Turnstile + honeypot; add rate limiting
- [ ] Success/error states; test end-to-end delivery to the firm inbox

## Phase 5 — Blog / Insights

- [ ] Build Blog index (`/blog`) with cards + tags
- [ ] Build Blog post page (`/blog/[slug]`) with MDX rendering + code/typography styles
- [ ] Draft handling (exclude `draft: true` in production)
- [ ] Author 1–2 launch articles

## Phase 6 — SEO, performance & accessibility hardening

- [ ] JSON-LD `LocalBusiness` / `Architect` structured data
- [ ] `next-sitemap` (sitemap.xml + robots.txt); canonical URLs
- [ ] Per-page OG images; verify social previews
- [ ] Lighthouse pass: meet mobile targets (Perf ≥ 90, A11y ≥ 95, SEO ≥ 95)
- [ ] Accessibility audit: keyboard nav, focus states, contrast, reduced motion
- [ ] Add Vercel Analytics + Speed Insights

## Phase 7 — QA, content polish & launch

- [ ] Cross-browser / cross-device QA (incl. iOS Safari & Android Chrome 3D)
- [ ] Vitest unit tests for critical logic (content access, form validation, viewer fallback)
- [ ] (Optional) Playwright smoke test: contact flow + viewer mount
- [ ] Final content & copy review with the firm
- [ ] Configure custom domain + HTTPS on Vercel
- [ ] Pre-launch checklist (404 page, redirects, analytics live) → **Go live**

## Post-launch (backlog / later phases)

- [ ] Optional headless CMS (e.g. Sanity) for non-technical editing
- [ ] Project filtering/search if the catalog grows
- [ ] i18n (English / Cebuano / Filipino)
- [ ] Model hotspots / annotations in the 3D viewer
- [ ] Newsletter signup
