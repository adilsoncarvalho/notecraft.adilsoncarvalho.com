# Notecraft

A note-taking method for paper and pixels — published at
**https://notecraft.adilsoncarvalho.com**

Built with [Astro](https://astro.build), statically generated, and deployed to GitHub Pages
by GitHub Actions on every push to `master`.

## Quick start

```sh
pnpm install
pnpm dev      # http://localhost:4321
```

| Command        | What it does                                        |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | Dev server with hot reload                          |
| `pnpm build`   | Static build into `dist/`                           |
| `pnpm preview` | Serve `dist/` locally, exactly as it will be served |
| `pnpm check`   | Astro + TypeScript diagnostics                      |

`pnpm` is the only supported package manager — `npm` and `yarn` would bypass `pnpm-lock.yaml`.

The Node version lives in `.tool-versions`. asdf reads it locally and `actions/setup-node`
reads the same file in CI, so there is one pin rather than two that can drift.

## Layout

```
src/
├── components/       LanguageSwitcher
├── content/
│   └── home/         Page prose as Markdown, one file per locale
├── content.config.ts Collection definitions and their frontmatter schema
├── i18n/
│   ├── config.ts     Locale registry and URL helpers
│   └── ui.ts         UI chrome strings, keyed by locale
├── layouts/          BaseLayout: head, hreflang, footer
├── pages/            Routes. Top level is English; pt-br/ is Portuguese
└── styles/           global.css — design tokens, light and dark
public/
├── CNAME             The custom domain. Deleting it breaks the domain
└── robots.txt
```

The site is currently a placeholder — one page per locale reading `notecraft (soon)` from
`src/content/home/`.

## Internationalisation

English is served from `/`, Brazilian Portuguese from `/pt-br/`. Routing is Astro's built-in
i18n, configured in `astro.config.mjs`; `prefixDefaultLocale: false` is what keeps English
un-prefixed.

Page prose lives in Markdown under `src/content/`, one file per locale, named for the locale
it serves. A page file looks its content up by locale and renders it, so a locale's page file
is only a routing shell. Chrome that sits outside a content entry — labels, the 404 — comes
from `src/i18n/ui.ts` instead. Every route uses the same slug in both locales, which is what
lets the language switcher and the `hreflang` tags map between them by swapping the prefix.

### Adding a language

1. Add the locale to `i18n.locales` in `astro.config.mjs` and to the sitemap's `i18n.locales` map.
2. Add it to `languages` in `src/i18n/config.ts`.
3. Add its block to `ui` in `src/i18n/ui.ts`. Missing keys are a build-time type error, not a
   blank space on the page.
4. Add a Markdown file named for the locale to each collection under `src/content/`.
5. Create `src/pages/<locale>/` with one shell page per route.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages. Pull requests run `.github/workflows/ci.yml` (type check and build) instead.

One-time repository setup and the DNS records are documented in
[`docs/hosting-and-dns.md`](docs/hosting-and-dns.md).

## Documentation

- [`docs/project-plan.md`](docs/project-plan.md) — milestones and their exit criteria
- [`docs/hosting-and-dns.md`](docs/hosting-and-dns.md) — GitHub Pages and Route 53 setup
- [`docs/analytics.md`](docs/analytics.md) — audience measurement: the options and the choice
