import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Każdy artykuł musi mieć daty i listę źródeł. Bez nich strona się nie zbuduje.
 * `twierdzenia` to identyfikatory z rejestru (src/data/rejestr.json); artykuł bez
 * twierdzeń prawnych lub podatkowych wpisuje pustą listę i podaje `zrodlaDodatkowe`.
 */
const artykuly = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artykuly' }),
  schema: z.object({
    tytul: z.string().min(10),
    opis: z.string().min(40).max(200),
    opublikowano: z.coerce.date(),
    zaktualizowano: z.coerce.date(),
    seria: z.enum([
      'Finansowa Podstawa',
      'Emerytura bez tajemnic',
      'IKE czy IKZE?',
      'Liczby przyszłości',
      'Finansowy Audyt',
      'Plan na przyszłość',
    ]),
    twierdzenia: z.array(z.string()),
    zrodlaDodatkowe: z
      .array(z.object({ tytul: z.string(), url: z.url().optional() }))
      .default([]),
    szkic: z.boolean().default(true),
  }),
});

export const collections = { artykuly };
