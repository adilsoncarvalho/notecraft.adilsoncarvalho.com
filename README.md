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
├── components/     Reusable markup; *Content.astro files hold shared page bodies
├── i18n/
│   ├── config.ts   Locale registry and URL helpers
│   └── ui.ts       Every UI string, keyed by locale
├── layouts/        BaseLayout: head, nav, footer, hreflang
├── pages/          Routes. Top level is English; pt-br/ is Portuguese
└── styles/         global.css — design tokens, light and dark
public/
├── CNAME           The custom domain. Deleting it breaks the domain
└── robots.txt
```

## Internationalisation

English is served from `/`, Brazilian Portuguese from `/pt-br/`. Routing is Astro's built-in
i18n, configured in `astro.config.mjs`; `prefixDefaultLocale: false` is what keeps English
un-prefixed.

Page bodies live once in `src/components/*Content.astro` and read their strings from
`src/i18n/ui.ts`, so a locale's page file is only a routing shell. Every route uses the same
slug in both locales, which is what lets the language switcher and the `hreflang` tags map
between them by swapping the prefix.

### Adding a language

1. Add the locale to `i18n.locales` in `astro.config.mjs` and to the sitemap's `i18n.locales` map.
2. Add it to `languages` in `src/i18n/config.ts`.
3. Add its block to `ui` in `src/i18n/ui.ts`. Missing keys are a build-time type error, not a
   blank space on the page.
4. Create `src/pages/<locale>/` with one shell page per route.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages. Pull requests run `.github/workflows/ci.yml` (type check and build) instead.

One-time repository setup and the DNS records are documented in
[`docs/hosting-and-dns.md`](docs/hosting-and-dns.md).

## Documentation

- [`docs/project-plan.md`](docs/project-plan.md) — milestones and their exit criteria
- [`docs/hosting-and-dns.md`](docs/hosting-and-dns.md) — GitHub Pages and Route 53 setup
- [`docs/analytics.md`](docs/analytics.md) — audience measurement: the options and the choice
