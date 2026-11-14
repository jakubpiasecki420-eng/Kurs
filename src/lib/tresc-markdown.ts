/**
 * Renderowanie treści lekcji: Markdown połączony z rejestrem twierdzeń.
 *
 *   {{identyfikator}}  — wartość liczbowa twierdzenia (kwoty w zł, stawki w %),
 *   {{stan-na-dzien}}  — data stanu prawnego rejestru,
 *   [^identyfikator]   — przypis; numer = pozycja w polu `twierdzenia` nagłówka lekcji,
 *                        tak samo jak lista źródeł z `przypisy()` na stronie lekcji,
 *   <!-- dyrektywa -->  — przykład obliczeniowy z src/lib/przyklady.ts (osobny akapit).
 *
 * Każdy użyty identyfikator musi być zadeklarowany i mieć status P — inaczej budowanie się zatrzyma.
 * Ten sam renderer (marked) składa przewodnik PDF.
 */
import { Marked, type Tokens } from 'marked';
import dane from '../data/rejestr.json';
import { data, procent, zl } from './format';
import { dyrektywa } from './przyklady';

interface Twierdzenie {
  id: string;
  status: string;
  wartosc?: number;
  jednostka?: string;
}

export interface Naglowek {
  poziom: number;
  slug: string;
  tekst: string;
}

function sprawdzone(id: string, deklarowane: string[], plik: string): Twierdzenie {
  if (!deklarowane.includes(id)) throw new Error(`${plik}: „${id}” nie jest zadeklarowane w polu „twierdzenia”.`);
  const t = (dane.twierdzenia as Twierdzenie[]).find((x) => x.id === id);
  if (!t) throw new Error(`${plik}: brak twierdzenia „${id}” w rejestrze.`);
  if (t.status !== 'P') throw new Error(`${plik}: „${id}” ma status ${t.status}. Wolno użyć tylko statusu P.`);
  return t;
}

export function formatujWartosc(t: Twierdzenie): string {
  if (typeof t.wartosc !== 'number') throw new Error(`Twierdzenie „${t.id}” nie ma wartości liczbowej.`);
  if (t.jednostka === 'zł') return zl(t.wartosc);
  if (t.jednostka === 'stawka') return procent(t.wartosc);
  throw new Error(`Twierdzenie „${t.id}”: nieobsługiwana jednostka „${t.jednostka}”.`);
}

export const odnosnik = (nr: number) =>
  `<sup><a class="odn" href="#zrodlo-${nr}" aria-label="Źródło ${nr}">[${nr}]</a></sup>`;

/** Podstawia wartości, przypisy i dyrektywy w surowym Markdownie. */
export function podstaw(tekst: string, deklarowane: string[], plik = 'treść'): string {
  return tekst
    .replace(/^<!--\s*([a-z]+:[a-z-]+)\s*-->$/gm, (_c, nazwa: string) => dyrektywa(nazwa))
    .replace(/\{\{([a-z0-9-]+)\}\}/g, (_c, id: string) =>
      id === 'stan-na-dzien' ? data(dane.stanNaDzien) : formatujWartosc(sprawdzone(id, deklarowane, plik)),
    )
    .replace(/\[\^([a-z0-9-]+)\]/g, (_c, id: string) => {
      sprawdzone(id, deklarowane, plik);
      return odnosnik(deklarowane.indexOf(id) + 1);
    });
}

const POLSKIE: Record<string, string> = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

export function slug(tekst: string): string {
  return tekst
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => POLSKIE[z])
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

export const ETYKIETA_TABELI = 'Tabela. Jeśli nie mieści się na ekranie, przewiń ją w poziomie.';

/** Renderuje treść lekcji do HTML i zwraca listę nagłówków (do spisu sekcji). */
export function renderujTresc(tekst: string, deklarowane: string[], plik = 'treść'): { html: string; naglowki: Naglowek[] } {
  const naglowki: Naglowek[] = [];
  const uzyte = new Map<string, number>();
  const silnik = new Marked({ gfm: true });
  silnik.use({
    renderer: {
      heading(this: { parser: { parseInline(t: Tokens.Heading['tokens']): string } }, t: Tokens.Heading) {
        const tresc = this.parser.parseInline(t.tokens);
        const czysty = tresc.replace(/<[^>]+>/g, '').trim();
        let s = slug(czysty);
        const ile = uzyte.get(s) ?? 0;
        uzyte.set(s, ile + 1);
        if (ile > 0) s = `${s}-${ile}`;
        naglowki.push({ poziom: t.depth, slug: s, tekst: czysty });
        return `<h${t.depth} id="${s}">${tresc}</h${t.depth}>\n`;
      },
    },
  });
  const html = (silnik.parse(podstaw(tekst, deklarowane, plik), { async: false }) as string)
    // Tabele z Markdownu (nie z dyrektyw, które mają własne opakowanie) przewijają się w poziomie na wąskim ekranie.
    .replace(/<table>\n/g, `<div class="tabela-przewijana" tabindex="0" role="region" aria-label="${ETYKIETA_TABELI}"><table>\n`)
    .replace(/<\/table>\n/g, '</table>\n</div>\n');
  if (/\{\{|\[\^/.test(html)) throw new Error(`${plik}: w treści zostały nieprzetworzone znaczniki rejestru.`);
  return { html, naglowki };
}
