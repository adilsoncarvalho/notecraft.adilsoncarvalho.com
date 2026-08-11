/**
 * Locale registry for the site.
 *
 * `languages` is the single source of truth: adding a locale here, adding its
 * strings to `src/i18n/ui.ts`, and adding a `src/pages/<locale>/` directory is
 * the whole of what a new translation requires. The keys must match the
 * `i18n.locales` array in `astro.config.mjs` — they are the URL segments.
 */
export const languages = {
  en: { label: 'English', htmlLang: 'en-US', dir: 'ltr' },
  'pt-br': { label: 'Português', htmlLang: 'pt-BR', dir: 'ltr' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang = 'en' satisfies Lang;

export const localeKeys = Object.keys(languages) as Lang[];

/**
 * Resolves the locale from a URL pathname, falling back to the default locale
 * for unprefixed paths (which is where the default locale is served).
 */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return isLang(segment) ? segment : defaultLang;
}

/**
 * Returns the pathname with any locale prefix removed, with no leading or
 * trailing slash — the form `getRelativeLocaleUrl` expects as its `path`.
 * `/pt-br/method/` and `/method/` both yield `method`; a home page yields ''.
 */
export function stripLangFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLang(segments[0])) segments.shift();
  return segments.join('/');
}

function isLang(value: string | undefined): value is Lang {
  return value !== undefined && Object.hasOwn(languages, value);
}
