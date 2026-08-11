import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * Page content, one Markdown file per locale. The file name is the entry id and
 * must match a locale key in `src/i18n/config.ts` — that is what lets a page
 * look up its own content by locale.
 */
const home = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { home };
