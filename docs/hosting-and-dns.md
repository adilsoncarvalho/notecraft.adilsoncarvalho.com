# Hosting and DNS

The site is a static build published to **GitHub Pages** at
`notecraft.adilsoncarvalho.com`. GitHub Pages terminates TLS, so no certificate work is
needed.

## Why not S3

GitHub Pages and S3 are alternative hosts, not layers of one stack — S3 cannot serve content
that lives in Pages. Serving from AWS instead would mean S3 + CloudFront + an ACM certificate,
with the Actions workflow syncing to the bucket and invalidating the distribution. That is
more moving parts, an AWS bill, and certificate renewal to own, in exchange for capabilities
this site does not use. Pages is the choice here; the only thing AWS does is answer DNS.

Should the site ever need edge redirects, signed URLs, or per-request logic, revisit it —
the build output is a plain directory and would move without changes to the site itself.

## One-time repository setup

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** Without this the
   deploy workflow fails at the `deploy-pages` step.
2. **Settings → Pages → Custom domain:** `notecraft.adilsoncarvalho.com`.
   `public/CNAME` already carries this value into every build, so GitHub re-reads it on each
   deploy. Deleting that file un-sets the domain.
3. Once DNS resolves, tick **Enforce HTTPS**. It stays greyed out until GitHub has issued the
   certificate, which takes a few minutes after the record propagates.

## DNS record (Route 53)

In the `adilsoncarvalho.com` hosted zone:

| Name                            | Type    | Value                       | TTL |
| ------------------------------- | ------- | --------------------------- | --- |
| `notecraft.adilsoncarvalho.com` | `CNAME` | `adilsoncarvalho.github.io` | 300 |

A subdomain takes a `CNAME` pointing at the GitHub Pages host. The apex `A`/`AAAA` records
that GitHub documents are only for a root domain, which this is not.

Verify before enabling HTTPS:

```sh
dig +short notecraft.adilsoncarvalho.com
curl -sI https://notecraft.adilsoncarvalho.com | head -1
```

## Failure modes worth recognising

- **404 on every path after a deploy** — Pages source is set to "Deploy from a branch" rather
  than "GitHub Actions".
- **The custom domain empties itself** — a build shipped without `public/CNAME`. GitHub treats
  the file as the source of truth on each deploy.
- **A certificate error that outlives DNS propagation** — remove and re-add the custom domain
  in Settings to force certificate re-issuance.
- **CSS and links break under a path prefix** — only happens if `site` in `astro.config.mjs`
  stops matching the served origin. The custom domain serves from the root, so no `base` is set.
