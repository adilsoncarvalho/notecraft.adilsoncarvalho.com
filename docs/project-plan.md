# Project plan

**Notecraft** — publishing a note-taking method for paper and digital notes at
`notecraft.adilsoncarvalho.com`.

Milestones are ordered by dependency, not by date. Each one lists what "done" means, so a
milestone can be picked up cold without reconstructing the intent.

## Milestone 0 — Foundations ✅ (2026-08-11)

Repository, toolchain, and the deployment path, with placeholder content proving each part
works end to end.

- Git repository, author `Adilson Carvalho <lc.adilson@gmail.com>`
- Astro static site, pnpm, TypeScript strict
- i18n: English at `/`, Brazilian Portuguese at `/pt-br/`, with a language switcher,
  `hreflang` alternates, and an i18n-aware sitemap
- GitHub Actions: build and type check on pull requests, deploy on push to `master`
- `public/CNAME`, `robots.txt`, custom favicon, 404 page

**Exit criteria:** `pnpm check` and `pnpm build` both clean; every route generated in both
locales; cross-locale links resolve to the matching page.

## Milestone 1 — Live on the domain ✅ (2026-08-11)

The site reachable at its address over HTTPS, deployed by the pipeline rather than by hand.

- `master` pushed to `adilsoncarvalho/notecraft.adilsoncarvalho.com`
- Pages serving from GitHub Actions; the workflow provisions Pages itself via
  `configure-pages`, so the repository does not depend on a manual settings change
- Route 53 `CNAME`, custom domain, and enforced HTTPS all live

**Exit criteria met:** both locales serve 200 over HTTPS, HTTP redirects to HTTPS, unmatched
paths return a real 404, and `hreflang` on the live pages cross-links the locales correctly.

## Milestone 2 — The actual method

Replace placeholder prose with the real method. This is the milestone that matters; the rest
is scaffolding around it.

- Move page bodies into Astro content collections with a typed frontmatter schema, so writing
  is Markdown rather than markup
- Draft the method in English: capture, marking conventions, the weekly pass, filing
- The margin-symbol system needs images or inline SVG — a notation is hard to describe in
  prose alone
- Translate to Portuguese once the English text has settled, not in parallel with editing it

**Exit criteria:** a reader can follow the method end to end from the site alone, in both
languages, without a section reading as a stub.

**Decision to make:** whether translations should ever be allowed to lag. Recommended yes —
mark a page as English-only rather than blocking a publish on translation. Cheaper than the
alternative, which is not publishing.

## Milestone 3 — Identity and design

Current styling is deliberately plain: system fonts, one accent colour, light and dark.
Enough to read, not yet a thing with a look.

- A typographic choice worth the bytes — this is a site about writing, and a self-hosted
  font would carry that better than the system stack
- Diagrams for the notation, consistent in both themes
- Open Graph images per page, so a shared link renders as something

**Exit criteria:** the site is recognisable in a screenshot, and a shared link previews with
a real image.

## Milestone 4 — Audience measurement

Decision recorded in [`analytics.md`](analytics.md): **Umami Cloud**, cookieless, no consent
banner, ~2 KB.

- Umami account and site, tracking ID supplied as a build-time environment variable
- Script in `BaseLayout.astro` behind `import.meta.env.PROD`
- Footer line stating that analytics are anonymous
- Confirm `/` and `/pt-br/` report separately — the Portuguese readership number is the one
  that changes future decisions

**Exit criteria:** pageviews and referrers visible for both locales, no consent banner, no
cookies set.

## Milestone 5 — Discoverability

- RSS feed, once there is anything published on a cadence
- Structured data (`Article`, `HowTo`) — this content maps onto `HowTo` unusually well
- Submit to Search Console, verify both locales are indexed and that `hreflang` is accepted

**Exit criteria:** both locales indexed and reported without `hreflang` errors.

## Milestone 6 — Optional directions

Not committed. Recorded so they are decisions rather than drift.

- **A printable version.** A method about paper that cannot be printed is an irony worth
  avoiding. Likely the highest-value item here.
- **Newsletter.** Only worth it if Milestone 5 shows returning readers.
- **Comments.** Adds moderation work and third-party JavaScript to a site whose selling point
  is neither. Default is no.
- **More languages.** The structure supports it; adding one costs a `ui.ts` block and a pages
  directory. Wait for evidence anyone wants it.

## Standing decisions

| Decision                          | Rationale                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Astro, static output              | Content site with no server-side needs; ships zero JavaScript by default        |
| GitHub Pages over S3 + CloudFront | Free, automatic TLS, no infrastructure to own — see `hosting-and-dns.md`        |
| pnpm only                         | One lockfile; mixing package managers is how supply-chain surprises get in      |
| English as the default locale     | Wider reach for a method with no local dependency; Portuguese is a full peer    |
| Identical slugs across locales    | Lets the switcher and `hreflang` map by prefix swap alone. Localised slugs would need a route map |
| Dependencies pinned to mature releases | A machine-level `minimum-release-age` guard blocks brand-new packages; `--frozen-lockfile` makes CI match |

## Known constraints

- **TypeScript is held at 6.x.** TypeScript 7's native compiler does not expose the
  programmatic API `astro check` uses. Revisit when
  [withastro/roadmap#1321](https://github.com/withastro/roadmap/discussions/1321) resolves.
- **Astro is held at 7.1.x** rather than 7.2, which had not aged past the local
  `minimum-release-age` threshold at setup. A routine bump, not a compatibility issue.
