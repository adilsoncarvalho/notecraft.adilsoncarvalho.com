# Audience measurement

**Decision: Umami Cloud.** Implementation is Milestone 4 — nothing is wired into the site yet.

## What this site actually needs to know

The questions worth answering for a personal method site are narrow:

- Which pages hold attention, and which are opened and abandoned.
- Whether the Portuguese half of the site is read at all, which decides whether translating
  future writing is worth the effort.
- Where readers arrive from — a link somewhere is worth more than an aggregate visit count.

Nothing on that list needs a user identity, a cookie, or cross-site tracking. That rules the
choice more than feature count does: a tool that collects less is not a compromise here,
it is a better fit.

## The options

| Tool                         | Cost                | Cookies    | Weight | Notes                                                                |
| ---------------------------- | ------------------- | ---------- | ------ | -------------------------------------------------------------------- |
| **Umami Cloud**              | Free tier, then ~$9 | None       | ~2 KB  | Open source, self-hostable later on the same schema                   |
| **Plausible**                | ~$9/mo, no free tier | None      | ~1 KB  | Best dashboard; goals and funnels                                     |
| **Cloudflare Web Analytics** | Free                | None       | ~1 KB  | Works without moving DNS to Cloudflare; very few features             |
| **GoatCounter**              | Free for personal   | None       | ~3 KB  | Minimal and donation-funded; smallest feature set and thinnest support |
| **Google Analytics 4**       | Free                | Yes        | ~50 KB | Needs a consent banner in the EU; widely blocked, so counts under-report |

## Why Umami

**No consent banner.** Umami is cookieless and stores no personal data, so under GDPR it
needs no consent interstitial. That is not only a legal nicety — a banner is the first thing
a reader sees, and on a site whose whole argument is about reducing friction, it undercuts
the point. GA4 fails here on its own terms: it needs the banner, and the readers most likely
to enjoy this subject are the most likely to block it, so the numbers under-report exactly
the audience being measured.

**It fits the site's weight.** ~2 KB against GA4's ~50 KB, on a site that otherwise ships no
JavaScript at all. Adding a tracker heavier than the entire page would be an odd trade.

**No lock-in.** Umami is open source and self-hostable on the same schema, so outgrowing the
free tier means moving the data, not abandoning it. Cloudflare Web Analytics is free but
gives no export and little beyond pageviews; Plausible is the better product but costs from
day one, and this site has no traffic to justify that yet.

**The honest trade:** Plausible's dashboard is nicer and its goal tracking is more capable.
If the site grows into something with conversions worth optimising, switching is a script-tag
change.

## Implementation notes for Milestone 4

- One `<script>` in `BaseLayout.astro`, behind `import.meta.env.PROD` so local development
  does not pollute the data.
- The tracking ID belongs in an environment variable read at build time, not committed. It is
  not a secret — it is public in the page source — but keeping it out of the repo means a
  fork does not report into this account.
- Umami's script is `defer`; do not make it blocking.
- Add a note to the footer stating that analytics are cookieless and anonymous. On this site
  that is a statement of values, and it costs one line.
- Verify after deploy that `/` and `/pt-br/` register as distinct pages, which is the whole
  reason for measuring in the first place.
