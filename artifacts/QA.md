# Portfolio validation — 13 October 2026

Validated locally against the Next.js production build, using Node 24.16.0 on Windows, Playwright Chromium 156, Axe and Lighthouse 13.5.0.

## Lighthouse measurements

The recorded run uses the default simulated mobile profile and the actual Lighthouse desktop configuration. Reports were captured sequentially without concurrent browser testing before the subsequent historical-CV integration; they are a baseline, not a new measurement of that content update.

| Category       | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |     90 |     100 |
| Accessibility  |    100 |     100 |
| Best practices |    100 |     100 |
| SEO            |    100 |     100 |

| Metric                   | Mobile | Desktop |
| ------------------------ | -----: | ------: |
| First contentful paint   |  1.0 s |   0.3 s |
| Largest contentful paint |  3.0 s |   0.7 s |
| Total blocking time      | 230 ms |   60 ms |
| Cumulative layout shift  |      0 |       0 |
| Speed index              |  2.1 s |   0.5 s |

Reports: [mobile](lighthouse-mobile.html), [desktop](lighthouse-desktop.html). Machine-readable JSON accompanies each report. Run `npm run audit` while the production server is running to reproduce. These are local lab measurements from a recorded run, not guarantees for every device, connection, run or future deployment. Performance varied during development. Measure again on the deployed HTTPS origin. Lighthouse still reports some unused framework JavaScript; the measured performance target was met after reducing initial work.

Performance refinements include self-hosted preloaded fonts, independent section hydration boundaries, browser-managed offscreen rendering, CSS animation for initial content and filters, on-demand Motion dialogs, on-demand screenshot components, and isolated role/GitHub updates. GitHub requests wait until the activity section approaches the viewport.

## Functional coverage

The Playwright suite covers:

- French as the initial language and eight initially curated projects.
- Category filtering and the full 13-project directory.
- Private MIFA case study, accurate deployment limitations, and absence of a public repository link.
- Case-study Escape handling and focus restoration.
- Direct download of the current AI & Data CV, verified filename and PDF bytes, without a historical-version dialog.
- English translation and light-theme persistence after reload.
- Responsive widths of 360, 390, 768, 1024 and 1440 px without horizontal overflow.
- Mobile menu navigation, Escape and focus behavior.
- Reduced-motion settings.
- Automated WCAG AA audits in both themes and a project dialog.
- Valid internal anchor targets and absence of browser/console errors.

The live GitHub endpoint was also checked separately and returned eligible public repositories with language and push dates. The browser suite deliberately substitutes an empty response to test the curated fallback without depending on upstream availability.

Screenshots: [desktop dark](desktop-dark.png), [desktop light](desktop-light.png), [mobile dark](mobile-dark.png). The rendered desktop and mobile layouts were visually inspected during development. Automated accessibility checks do not replace assistive-technology testing.

## Publication items

The site is running locally and has not been published externally.

- The supplied updated AI & Data CV is now enabled. It includes fifth-year status and MIFA AI, distinguishes local SQLite from the target PostgreSQL architecture, and downloads directly. The public copy removes the personal phone, preserves the professional email and portrait, and has been checked by text extraction and visual rendering. A hash check confirms the supplied original was not modified.
- On Vercel, the platform-provided production URL now supplies the canonical, sitemap and social origin automatically. For custom domains or other hosts, set `NEXT_PUBLIC_SITE_URL` to the actual public origin before building. Unconfigured local canonical and sitemap entries remain absent.
- MIFA internship dates are now owner-confirmed and published: 9 July through 9 September 2026. Its official job title and academic graduation dates remain unconfirmed.
- Reconcile current MIFA test totals against owner-supplied reports before adding those figures.
- Use only approved company assets. Current MIFA visuals are illustrative concepts, with no internal screenshots, conversations, credentials or private repository links.
- Add the optional real portrait and approved project screenshots when available.

No production dependency vulnerabilities were reported by `npm audit --omit=dev`. Five high-severity findings in the Next.js ESLint development dependency chain remain; see the README for the dependency path and why a major-version downgrade was not applied.
