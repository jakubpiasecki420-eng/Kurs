/**
 * Przygotowanie rozdziałów przewodnika „Emerytura pod kontrolą” do składu.
 *
 * Rozdział to plik Markdown z nagłówkiem metadanych (zob. produkt/przewodnik/szablon-rozdzialu.md).
 * W treści:
 *   {{identyfikator}}   — wartość liczbowa twierdzenia z rejestru, sformatowana po polsku,
 *   {{stan-na-dzien}}   — data stanu prawnego rejestru,
 *   [^identyfikator]    — przypis do twierdzenia; numeracja w obrębie rozdziału.
 * Każdy użyty identyfikator musi być zadeklarowany w polu `twierdzenia` i mieć status P.
 */
import { data, procent, zl } from '@/lib/format';
import { STAN_NA_DZIEN, twierdzenie, zrodlo, type Twierdzenie, type Zrodlo } from '@/lib/rejestr';

export interface Metadane {
  numer: string;
  tytul: string;
  cel: string;
  stanNaDzien: string;
  twierdzenia: string[];
  blokady: string[];
  status: string;
}

export interface PrzypisRozdzialu {
  nr: number;
  twierdzenie: Twierdzenie;
  zrodlo: Zrodlo;
}

export interface Rozdzial {
  metadane: Metadane;
  markdown: string;
  przypisy: PrzypisRozdzialu[];
}

function wartoscPola(surowa: string): string | string[] {
  const v = surowa.replace(/\s+#.*$/, '').trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map((e) => e.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return v.replace(/^['"]|['"]$/g, '');
}

/** Odczytuje nagłówek metadanych ograniczony liniami `---`. */
export function czytajMetadane(tekst: string): { metadane: Metadane; tresc: string } {
  const m = tekst.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error('Rozdział nie ma nagłówka metadanych.');
  const pola: Record<string, string | string[]> = {};
  for (const linia of m[1].split('\n')) {
    const p = linia.match(/^([A-Za-z]+):\s*(.*)$/);
    if (p) pola[p[1]] = wartoscPola(p[2]);
  }
  const tekstowe = (k: string) => {
    const v = pola[k];
    if (typeof v !== 'string' || v === '') throw new Error(`Brak pola „${k}” w nagłówku rozdziału.`);
    return v;
  };
  const lista = (k: string) => {
    const v = pola[k];
    if (!Array.isArray(v)) throw new Error(`Pole „${k}” musi być listą w nawiasach kwadratowych.`);
    return v;
  };
  return {
    metadane: {
      numer: tekstowe('numer'),
      tytul: tekstowe('tytul'),
      cel: tekstowe('cel'),
      stanNaDzien: tekstowe('stanNaDzien'),
      twierdzenia: lista('twierdzenia'),
      blokady: lista('blokady'),
      status: tekstowe('status'),
    },
    tresc: tekst.slice(m[0].length),
  };
}

/** Wartość twierdzenia w zapisie do tekstu: kwoty w złotych, stawki w procentach. */
export function formatujWartosc(t: Twierdzenie): string {
  if (typeof t.wartosc !== 'number') throw new Error(`Twierdzenie „${t.id}” nie ma wartości liczbowej.`);
  if (t.jednostka === 'zł') return zl(t.wartosc);
  if (t.jednostka === 'stawka') return procent(t.wartosc);
  throw new Error(`Twierdzenie „${t.id}”: nieobsługiwana jednostka „${t.jednostka}”.`);
}

function sprawdzone(id: string, metadane: Metadane): Twierdzenie {
  if (!metadane.twierdzenia.includes(id)) {
    throw new Error(`Rozdział ${metadane.numer}: „${id}” nie jest zadeklarowane w polu „twierdzenia”.`);
  }
  const t = twierdzenie(id);
  if (t.status !== 'P') {
    throw new Error(`Rozdział ${metadane.numer}: „${id}” ma status ${t.status}. W przewodniku wolno użyć tylko statusu P.`);
  }
  return t;
}

/** Podstawia wartości i numeruje przypisy. Zatrzymuje się na pierwszym naruszeniu zasad rejestru. */
export function przygotujRozdzial(tekst: string): Rozdzial {
  const { metadane, tresc } = czytajMetadane(tekst);
  if (metadane.blokady.length > 0) {
    throw new Error(
      `Rozdział ${metadane.numer} ma nierozstrzygnięte blokady: ${metadane.blokady.join(', ')}. Nie wolno go składać.`,
    );
  }
  metadane.twierdzenia.forEach((id) => sprawdzone(id, metadane));

  const numery = new Map<string, number>();
  const przypisy: PrzypisRozdzialu[] = [];

  let markdown = tresc.replace(/\{\{([a-z0-9-]+)\}\}/g, (_c, id: string) => {
    if (id === 'stan-na-dzien') return data(STAN_NA_DZIEN);
    return formatujWartosc(sprawdzone(id, metadane));
  });

  markdown = markdown.replace(/\[\^([a-z0-9-]+)\]/g, (_c, id: string) => {
    const t = sprawdzone(id, metadane);
    let nr = numery.get(id);
    if (!nr) {
      nr = numery.size + 1;
      numery.set(id, nr);
      przypisy.push({ nr, twierdzenie: t, zrodlo: zrodlo(t.zrodlo) });
    }
    return `<sup class="odn">${nr}</sup>`;
  });

  return { metadane, markdown, przypisy };
}
