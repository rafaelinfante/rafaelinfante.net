# rafaelinfante.net — Personal CV & Portfolio

Personal CV / portfolio site for Rafael Infante — Senior Fullstack Java Engineer & Team Lead. A fast, accessible, bilingual (English / Brazilian Portuguese) single-page Angular app, prerendered to static HTML and deployed on AWS (S3 + CloudFront + Route 53).

🔗 Live: https://rafaelinfante.net

## Tech stack

- Angular 22 (standalone components, signals) · TypeScript
- Tailwind CSS (design + dark mode) with a light touch of Angular Material (tooltips, ripples)
- Transloco for internationalization (English default + `pt-BR`), translations bundled at build time
- Static prerendering (SSG) via `@angular/ssr` with client hydration — real content + meta in the HTML
- Static output → AWS S3 + CloudFront (HTTPS via ACM) + Route 53

## Features

- Responsive, mobile-first, accessible (semantic HTML, ARIA, keyboard nav, reduced-motion)
- Instant language toggle (EN / PT-BR), persisted across visits, with `<html lang>` + `hreflang`
- Light / dark mode toggle (persisted, no-flash)
- Sections: hero · highlights · about · experience · projects · skills · education · contact · footer
- One-click CV download; live links to projects and former employers
- SEO-ready: per-language `<title>` / meta, Open Graph + Twitter Card, OG image, JSON-LD `Person`, sitemap, robots, manifest — all present in the prerendered HTML

## Prerequisites

- Node 22 (pinned in `.nvmrc`). With nvm: `nvm use` (or `nvm install 22`).

## Local development

```bash
nvm use           # selects Node 22
npm install       # first time only
npm start         # dev server at http://localhost:4200 (SSR + hydration)
```

## Build & test

```bash
npm run build               # static prerender → dist/rafaelinfante-net/browser/
npm test -- --watch=false   # run unit tests once (Vitest)
```

## Editing content

- Copy lives in the translation files — edit these to change any visible text:
  - `src/i18n/en.json` — English (default, source of truth)
  - `src/i18n/pt-BR.json` — Brazilian Portuguese
  - Every UI string is keyed; keep both files in sync (English first, then translated). They're bundled into the app at build time, so a rebuild picks up changes.
- Links, icons, and ordering (language-neutral) live in `src/app/data/site.ts` (email, GitHub/LinkedIn URLs, CV path, section order, group icons).

## Project structure

```
src/
├── app/
│   ├── components/             # header, hero, highlights, about, experience,
│   │                           #   projects, skills, education, contact, footer
│   ├── shared/                 # icon, reveal directive, theme / language / seo services
│   ├── data/site.ts            # language-neutral config (links, icons, order)
│   ├── transloco-loader.ts     # bundles src/i18n/*.json
│   ├── app.config.ts           # browser providers (Transloco, hydration)
│   ├── app.config.server.ts    # server providers (prerender)
│   └── app.routes.server.ts    # render modes (Prerender)
├── i18n/                       # en.json, pt-BR.json  (translations, bundled)
├── main.ts · main.server.ts    # browser + prerender entry points
└── index.html                  # base meta, OG/Twitter, JSON-LD, hreflang, no-flash theme/lang
public/                         # static assets copied as-is
├── Rafael_Infante_CV.pdf       # CV download asset
├── og-image.png · favicon.svg · favicon.ico
└── manifest.webmanifest · robots.txt · sitemap.xml
```

## Deployment (AWS)

Prerendered static files served from a private S3 bucket via CloudFront (Origin Access Control, HTTPS through ACM) with Route 53 DNS for `rafaelinfante.net`.

```bash
npm run build
aws s3 sync dist/rafaelinfante-net/browser/ s3://<bucket>/ --delete
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

CI/CD: `.github/workflows/deploy.yml` builds, tests, and deploys on push to `main` via GitHub OIDC (no stored AWS keys). Set these repository variables before the first deploy: `AWS_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.

Day-to-day work happens on `develop`; merging `develop → main` publishes to production.

## License

MIT — see [LICENSE](LICENSE).
