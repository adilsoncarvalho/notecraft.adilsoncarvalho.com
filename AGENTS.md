# Notecraft — agent context

Static Astro site publishing a note-taking method, served from GitHub Pages at
`notecraft.adilsoncarvalho.com`. English at `/`, Brazilian Portuguese at `/pt-br/`.

## Conventions that are not obvious from the tree

- **`pnpm` only.** `npm` or `yarn` would bypass `pnpm-lock.yaml`.
- **Every user-facing string goes in `src/i18n/ui.ts`,** never inline in a component. The
  `satisfies Record<Lang, …>` clause turns a key missing from one locale into a build error;
  inlining a string silently opts that text out of translation.
- **Page bodies live once.** `src/components/*Content.astro` holds the markup; files under
  `src/pages/<locale>/` are routing shells that pick a locale and pass it to the layout. Adding
  a page means one content component and one shell per locale.
- **Routes use the same slug in every locale.** The language switcher and the `hreflang` tags
  map between locales by swapping the path prefix (`stripLangFromPath` in `src/i18n/config.ts`).
  Localised slugs would break both and need an explicit route map first.
- **`public/CNAME` is load-bearing.** GitHub reads it on every deploy; a build without it
  un-sets the custom domain.
- **Locale keys are URL segments.** A key in `languages` must match `i18n.locales` in
  `astro.config.mjs` and the sitemap's locale map.

## Versions are pinned deliberately

- **TypeScript 6.x**, not 7 — TS 7's native compiler drops the programmatic API `astro check`
  needs, and `pnpm check` fails outright on it.
- **Astro 7.1.x** — the machine running this repo sets pnpm `minimum-release-age`, so a
  just-published version cannot be installed. Prefer the newest release older than that
  threshold over weakening the setting.

## Before calling a change done

```sh
pnpm check && pnpm build
```

Both run in CI on every pull request. When touching i18n, also confirm the built output:
a page under `dist/pt-br/` should carry `<html lang="pt-BR">` and an `hreflang` alternate
pointing at its English counterpart.

## Orientation

- [`docs/project-plan.md`](docs/project-plan.md) — milestones, standing decisions, constraints
- [`docs/hosting-and-dns.md`](docs/hosting-and-dns.md) — Pages and Route 53, and the failure modes
- [`docs/analytics.md`](docs/analytics.md) — analytics choice and its reasoning
