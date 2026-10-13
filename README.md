# Mehdi Chmiti — AI & Data Engineering portfolio

A French-first, bilingual single-page portfolio built with Next.js App Router, React, strict TypeScript, Tailwind CSS 4, Motion for React, and Lucide. Dark and light themes, a custom lightweight data-system illustration, a featured MIFA AI concept, 13 typed projects, accessible case-study dialogs, filters, experience disclosures, public GitHub activity, and email contact are implemented.

## Run locally

Requires Node.js 24, matching the version pinned for Vercel in `package.json`.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a reproducible install, use `npm ci` with the supplied `package-lock.json`.

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`next build` does not run ESLint; run the checks separately. Fonts are self-hosted from Fontsource and do not require a Google Fonts connection.

## Edit content

| File                                         | Purpose                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `src/data/profile.ts`                        | Identity, contact links, locale, availability, CV path, site origin, featured project selection         |
| `src/data/translations.ts`                   | French and English interface text                                                                       |
| `src/data/projects.ts`                       | Project categories, summaries, stacks, repository links, case studies and optional approved screenshots |
| `src/data/experience.ts`                     | Companies, dates, roles and contributions                                                               |
| `src/data/skills.ts`                         | Skills grouped by domain, applied versus academic, and supporting project                               |
| `src/data/education.ts`                      | Engineering progression                                                                                 |
| `src/app/globals.css`                        | Theme tokens, Tailwind theme, typography, responsive layout and effects                                 |
| `src/components/effects/system-visual.tsx`   | SVG/CSS concepts for the hero and project cards                                                         |
| `src/components/projects/project-detail.tsx` | Accessible case-study presentation                                                                      |

The main page is server-rendered with French/dark defaults. Language and theme preferences are saved in local storage when available. Project technology names and proper names remain unchanged across locales. The contact flow opens a real email client; there is no simulated submission form.

### CV version and future updates

A public copy of the updated AI & Data CV is available at `public/cv/Mehdi-Chmiti-CV.pdf`. It includes fifth-year status, MIFA AI and the confirmed internship dates. The original PDF is preserved outside the project. The public copy permanently removes the personal phone number, retains Casablanca and the professional email, and preserves the layout and portrait.

All CV actions download the current document directly, with `config.cvRevision` set to `current`. The earlier pre-MIFA copy remains as a historical artifact but is no longer linked from the interface. `scripts/prepare-current-cv.py` prepares the current public copy and verifies redaction, content and the original file hash; it uses PyMuPDF.

To replace it with an approved current CV:

1. Put the approved PDF at `public/cv/Mehdi-Chmiti-CV.pdf`.
2. In `src/data/profile.ts`, set `config.cvPath` to `/cv/Mehdi-Chmiti-CV.pdf`.
3. Set `config.cvRevision` to `current`.
4. Build again. All CV actions will download the updated file directly.

The directory is already supplied. Do not set a path until the actual file is present.

### Replace concept visuals

Hero and project visuals use SVG/CSS and remain available without external images. No portrait has been generated. The MIFA AI interface is explicitly labeled as an illustrative concept and contains no real company data.

For a project screenshot, add the approved asset under `public/projects/`, then set the corresponding project's `screenshot` to `/projects/your-file.webp`. The card uses `next/image` with a meaningful project name as alt text. Project case studies retain their conceptual diagrams. For a professional portrait, replace the monogram artwork in the About section with `next/image`, using the actual portrait and accurate alt text. Only add company visuals after obtaining publication approval.

The social preview is `public/social-preview.png`. Its source is in `scripts/create-social.mjs`; `npm run assets` regenerates it. This script uses Sharp provided by Next.js.

### Publication facts to confirm

- The MIFA internship dates were confirmed by Mehdi: 9 July through 9 September 2026. The role description is "Internship — MIFA AI project"; no unconfirmed official job title is claimed.
- Exact EMSI graduation dates are omitted; fifth-year status is supplied by the brief.
- MIFA test totals are omitted because the two supplied versions have not been reconciled against current project reports.
- MIFA deployment is described as pending infrastructure and company approval. Local implementation is distinguished from the production-target architecture.
- FraudGuard demo data may be synthetic; no validation on real banking transactions is claimed.
- Model scores, commercial impact, testimonials, awards, and deployment metrics have not been invented.
- The updated post-MIFA CV is integrated. Approved project screenshots remain owner-supplied assets. The real portrait is retained in the PDF and has not been extracted into the website.

MIFA AI has no public repository button. No private company repository is fetched. The public presentation contains high-level information supplied in the brief and neutral concepts. Have the company review that high-level description before publication if its disclosure authorization is not already established.

## GitHub activity

`/api/github` fetches only the public repository list for `mccrking`, without a token. It picks eligible curated public repositories, reports the upstream push date and language, and caches for an hour. On timeout, rate limiting, or other failure, the page shows curated supplied repository links. No contribution counts or language distribution are fabricated. No secret or client-side API key is needed.

## Deploy

This project is prepared for deployment; it has not been published to an external hosting service.

### Vercel

1. The GitHub repository is `https://github.com/mccrking/portfolio_personnel_it_mehdi_chmiti`, with production branch `master`.
2. Import that repository into Vercel and select Next.js. Root directory: `./`; install command: `npm ci`; build command: `npm run build`; output directory: use the Next.js default; Node.js: `24.x`.
3. Leave Vercel's automatic system environment variables enabled. The actual production URL is used automatically for canonical, sitemap and social metadata. If you later connect a custom domain, add `NEXT_PUBLIC_SITE_URL` with that actual HTTPS origin, without a trailing slash.
4. Build using `npm run build` and deploy.
5. Verify the French and English interfaces, CV asset, social preview, email links, robots.txt and sitemap.xml on the real origin.

### Node hosting

```bash
npm ci
# Set NEXT_PUBLIC_SITE_URL in the hosting environment before building.
npm run build
npm run start
```

Place the Node service behind your host's HTTPS reverse proxy. The GitHub API route requires a Node/serverless runtime, so a static-only export is not configured. `PORT` may be set by your host.

Canonical URL, sitemap entries and robots sitemap reference use `NEXT_PUBLIC_SITE_URL` first, then Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then its actual deployment URL. Outside Vercel, with all three unset, the sitemap is empty, canonical is omitted, and social metadata resolves against localhost for local development. Rebuild after changing the public origin. No deployment domain has been invented.

## Browser and accessibility checks

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Tests launch the production server if port 3000 is free. They cover the initial French selection, full directory and category filters, private project handling, modal Escape/focus restoration, direct current-CV download and valid PDF bytes, English/theme persistence, responsive widths (360, 390, 768, 1024 and 1440 px), mobile navigation, reduced motion, internal links, browser errors, and WCAG AA automated checks in both themes and a dialog.

Native modal dialogs provide focus containment and restore focus to the opening control. The mobile menu supports Escape and keyboard cycling. Navigation includes a skip link, active-section indication and visible focus states. Reduced-motion preferences disable floating visuals, smooth scrolling, transitions and role rotation. Section reveals move content gently without hiding it. Automated audits are useful evidence, not a substitute for manual assistive-technology testing.

Playwright screenshots are saved in `artifacts/`. To measure Lighthouse on the production build:

```bash
# In one terminal:
npm run start
# In another:
npm run audit
```

The audit writes desktop/mobile HTML and JSON reports under `artifacts/`. See `artifacts/QA.md` for recorded results, scope and remaining publication items.

## Dependency audit

`npm audit --omit=dev` reported zero production vulnerabilities at implementation time. The full audit reports five high-severity findings propagated from `braces` through the Next.js ESLint development dependency. The registry offered no patched `braces` release; the automated suggestion would downgrade the Next.js ESLint configuration across major versions. It was not applied. These packages are development tooling and are not used by the deployed application. Recheck the audit and update the affected development dependencies when a compatible fix is available.

## Framework references

- [Next.js App Router installation](https://nextjs.org/docs/app/getting-started/installation)
- [Motion accessibility and reduced motion](https://motion.dev/docs/react-use-reduced-motion)
