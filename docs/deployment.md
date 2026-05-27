# Deployment

## Hosting: Vercel

The site deploys to **Vercel**, the native platform for Next.js (global CDN, automatic
HTTPS, preview deployments, zero-config builds).

## Environments

| Environment | Trigger | URL |
| --- | --- | --- |
| **Production** | Push/merge to `main` | custom domain (e.g. `dolores-ark.com`) |
| **Preview** | Any push to a non-`main` branch / PR | auto-generated `*.vercel.app` URL |
| **Local** | `pnpm dev` | `http://localhost:3000` |

Because content is local MDX, **publishing = pushing to git** → Vercel rebuilds and deploys.

## Git workflow

- Repository: `https://github.com/Aazirr/DoloresArkitecture.git`
- `main` is the production branch (protected; deploys to production).
- Feature branches → Pull Request → Vercel preview deploy for review → merge to `main`.
- Conventional, descriptive commits.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and mirror in
`.env.local` for development). Document them in `.env.example` (committed, no secrets).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send contact-form inquiry emails |
| `CONTACT_TO_EMAIL` | Destination inbox for inquiries |
| `CONTACT_FROM_EMAIL` | Verified sender (Resend domain) |
| `TURNSTILE_SECRET_KEY` | Server-side Cloudflare Turnstile verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client-side Turnstile widget |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (SEO, sitemap, OG) |

## Build & commands

```bash
pnpm install        # install deps
pnpm dev            # local dev server
pnpm build          # production build (runs Velite + next build)
pnpm start          # serve production build locally
pnpm lint           # ESLint
pnpm test           # Vitest
```

Vercel build command: `pnpm build` · Output: `.next` · Install: `pnpm install`.

## Large 3D assets

- GLB models live in `public/models/`. Keep them compressed (Draco/Meshopt).
- If total model size grows large, enable **Git LFS** for `*.glb` to keep the repo lean,
  or host models on a CDN/object storage and reference absolute URLs.

## Domain & DNS

1. Purchase/keep domain at a registrar.
2. Add the domain in Vercel → Domains; point DNS (A/CNAME) per Vercel instructions.
3. Vercel auto-provisions and renews the TLS certificate.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Pre-launch checklist

- [ ] Production env vars set in Vercel
- [ ] Custom domain connected + HTTPS verified
- [ ] Contact form delivers to the firm's real inbox
- [ ] `robots.txt` + `sitemap.xml` correct; not blocking production
- [ ] OG/social previews render correctly
- [ ] Analytics + Speed Insights enabled
- [ ] 404/error pages styled
