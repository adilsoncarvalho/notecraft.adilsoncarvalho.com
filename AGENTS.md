# Notecraft — agent context

Static Astro site publishing a note-taking method, served from GitHub Pages at
`notecraft.adilsoncarvalho.com`. English at `/`, Brazilian Portuguese at `/pt-br/`.

## Conventions that are not obvious from the tree

- **`pnpm` only.** `npm` or `yarn` would bypass `pnpm-lock.yaml`.
- **No user-facing string is written inline in a component.** Page prose belongs in Markdown
  under `src/content/`, one file per locale, named for the locale it serves. Chrome rendered
  outside a content entry — labels, the 404 — belongs in `src/i18n/ui.ts`, whose
  `satisfies Record<Lang, …>` clause turns a key missing from one locale into a build error.
  Inlining a string silently opts that text out of translation either way.
- **Page files are routing shells.** A file under `src/pages/` looks its content entry up by
  locale and hands it to the layout. Adding a page means a Markdown file per locale plus one
  shell per locale — no markup in between.
- **Routes use the same slug in every locale.** The language switcher and the `hreflang` tags
  map between locales by swapping the path prefix (`stripLangFromPath` in `src/i18n/config.ts`).
  Localised slugs would break both and need an explicit route map first.
- **`zod` is a direct dependency on purpose.** `astro:content` still re-exports `z`, but that
  export is deprecated in Astro 7, so `src/content.config.ts` imports from `zod` itself.
  pnpm's strict linking means the transitive copy is not importable — the direct entry in
  `package.json` is what makes the import resolve.
- **`public/CNAME` is load-bearing.** GitHub reads it on every deploy; a build without it
  un-sets the custom domain. It lands a short while after the deploy job reports success.
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
