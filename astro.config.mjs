// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://notecraft.adilsoncarvalho.com',

  // The default locale is served from the root (`/`); every other locale is
  // served from its own prefix (`/pt-br/`). Locale keys double as URL segments,
  // so a page at `src/pages/pt-br/method.astro` answers `/pt-br/method/`.
  i18n: {
    locales: ['en', 'pt-br'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Maps each URL segment to the language attribute emitted in the
      // sitemap's hreflang annotations.
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          'pt-br': 'pt-BR',
        },
      },
    }),
  ],
});
