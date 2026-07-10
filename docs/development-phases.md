# Development Phases

Phased delivery plan. Check off items as they're completed.

---

## Phase 0 — Project setup & foundations

- [x] Initialize Next.js (App Router) + TypeScript project with pnpm
- [x] Configure Tailwind CSS + base design tokens (colors, typography, spacing)
- [x] Set up ESLint + Prettier + tsconfig path aliases (`@/…`)
- [x] Add Velite content layer + Zod schemas (projects, services, blog)
- [x] Create base layout: Header, Footer, navigation, mobile menu
- [x] Connect repo to GitHub and deploy a "hello world" to Vercel
- [ ] Define `.env.example` and configure Vercel environment variables

## Phase 1 — Design system & core pages (static)

- [x] Build UI primitives (Button, Container, Card, Input, Badge, Section, Reveal)
- [x] Implement Home page layout (hero, sections, CTA) with placeholder content
- [x] Implement About / Team page (real team members, founding year, signature)
- [x] Implement Services overview + service detail (`/services/[slug]`) from MDX
- [x] Implement global SEO defaults (Metadata API) + favicon/OG image scaffold
- [x] Whole-frontend "Measured Night" redesign — Barlow Condensed display type, technical ruled layouts, square controls, and warm-amber drafting details
- [x] Interactive architectural elevation hero with precise SVG linework, dimension marks, pointer parallax, and reduced-motion support
- [x] Redesign Home, Projects, Services, About, Contact, project detail, and service detail surfaces while preserving the access gate and v1 scope
- [x] Add project design context (`PRODUCT.md`) and Impeccable live-mode configuration
- [x] Scroll-reveal animations (Reveal / StaggerGroup / StaggerItem) with reduced-motion support
- [ ] Full responsive pass across breakpoints (ongoing)
- [x] Verify redesigned hero and access gate in-browser; ensure motion never hides default content

## Phase 2 — 3D showcase (the signature feature)

- [x] Install three.js + @react-three/fiber + @react-three/drei
- [x] Build `ModelViewer` (Canvas, Stage, OrbitControls, Environment, useGLTF)
- [x] Add Suspense progress loader + error boundary / poster fallback (`ViewerErrorBoundary`)
- [x] Wire OrbitControls: orbit/pan/zoom, distance/polar limits, reset button, auto-rotate
- [x] Code-split viewer via `next/dynamic` (`ssr: false`) — three.js never in initial bundle
- [x] Add `frameloop="demand"` + reduced-motion handling (no auto-rotate if prefers-reduced-motion)
- [x] Mobile detection via `useIsDesktop` hook — 3D disabled on < 1024 px, branded static fallback shown
- [x] `DemoScene` — procedural architectural building for home page showcase (no GLB needed)
- [x] `ThreeDShowcase` home page section with desktop/mobile gate
- [x] `ViewerGate` client component used on project detail pages
- [ ] Establish model pipeline: GLB export → Draco/Meshopt compression → `public/models/`
- [ ] Load one real GLB model end-to-end and QA on desktop + mobile

## Phase 3 — Projects content & showcase pages

- [x] Build Projects index (`/projects`) gallery with numbered editorial cards
- [x] Build Project detail (`/projects/[slug]`) with meta grid, 3D viewer, MDX body, scope tags, prev/next nav
- [ ] Author real project MDX content (3–6 flagship projects with real details)
- [ ] Add real project cover images and gallery photos (next/image)
- [ ] Supply GLB models for featured projects and place in `public/models/`
- [ ] Remove placeholder projects (villa-mactan, cebu-it-park-office) once real content is ready

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

- [ ] Cross-browser / cross-device QA (incl. iOS Safari & Android Chrome)
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
