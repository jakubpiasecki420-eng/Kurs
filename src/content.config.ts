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

/**
 * Kursy platformy. Plik kursu wyznacza program: kolejność modułów i lekcji oraz warunki dostępu.
 * Spójność programu z plikami lekcji sprawdza `zbudujKurs()` (src/lib/platforma/kurs.ts).
 */
const kursy = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/kursy' }),
  schema: z.object({
    tytul: z.string().min(5),
    opis: z.string().min(20),
    stan: z.enum(['aktywny', 'w-przygotowaniu']),
    demonstracyjny: z.boolean(),
    moduly: z
      .array(
        z.object({
          id: z.string().regex(/^[a-z0-9-]+$/),
          tytul: z.string().min(3),
          opis: z.string().min(10),
          wymaga: z.array(z.string()).default([]),
          lekcje: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
        }),
      )
      .min(1),
  }),
});

/**
 * Lekcje. Plik: src/content/lekcje/<kurs>/<lekcja>.md. Sekcje lekcji to nagłówki `##`.
 * Liczby i przepisy w lekcjach podlegają tym samym zasadom co strona: tylko twierdzenia ze statusem P.
 */
const lekcje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lekcje' }),
  schema: z.object({
    kurs: z.string(),
    modul: z.string(),
    tytul: z.string().min(3),
    opis: z.string().min(10).max(220),
    czasMin: z.number().int().min(1).max(120),
    demonstracyjna: z.boolean(),
    twierdzenia: z.array(z.string()).default([]),
    ilustracja: z.object({ opis: z.string(), podpis: z.string() }).optional(),
    narzedzie: z.enum(['oszczedzanie']).optional(),
    materialy: z
      .array(z.object({ tytul: z.string(), opis: z.string(), adres: z.string().optional() }))
      .default([]),
    quiz: z
      .object({
        pytania: z
          .array(
            z
              .object({
                pytanie: z.string(),
                odpowiedzi: z.array(z.string()).min(2).max(5),
                poprawna: z.number().int().min(0),
                wyjasnienie: z.string(),
              })
              .refine((p) => p.poprawna < p.odpowiedzi.length, 'Indeks poprawnej odpowiedzi poza listą.'),
          )
          .min(1),
      })
      .optional(),
  }),
});

export const collections = { artykuly, kursy, lekcje };
