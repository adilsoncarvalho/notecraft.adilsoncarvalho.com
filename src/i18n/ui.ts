import { defaultLang, type Lang } from './config';

/**
 * UI strings, keyed by locale. Every locale must define every key: the
 * `satisfies` clause below turns a missing or misspelled key into a build-time
 * type error rather than a blank spot on the rendered page.
 *
 * Page prose lives in Markdown under `src/content/`. This file is for chrome —
 * navigation, labels, and anything rendered outside a content entry.
 */
export const ui = {
  en: {
    'site.title': 'Notecraft',
    'lang.switcher.label': 'Language',

    'notFound.heading': 'Page not found',
    'notFound.body': 'That page does not exist — it may have been moved or renamed.',
    'notFound.cta': 'Back to the home page',
  },

  'pt-br': {
    'site.title': 'Notecraft',
    'lang.switcher.label': 'Idioma',

    'notFound.heading': 'Página não encontrada',
    'notFound.body': 'Essa página não existe — ela pode ter sido movida ou renomeada.',
    'notFound.cta': 'Voltar para a página inicial',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Returns a lookup function bound to `lang`, falling back to the default
 * locale for any key a translation has not yet filled in.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
