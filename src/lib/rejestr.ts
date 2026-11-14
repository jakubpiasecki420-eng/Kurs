import dane from '@/data/rejestr.json';

/**
 * Rejestr źródeł i twierdzeń — jedyne miejsce, w którym zapisujemy limity,
 * stawki i przepisy. Strony pobierają wartości wyłącznie stąd.
 *
 * Status twierdzenia:
 *   P — przeczytane w źródle pierwotnym (akt prawny, strona urzędu),
 *   W — źródło wtórne (media, serwis branżowy),
 *   Z — założenie lub wniosek własny.
 * Na stronach publicznych wolno używać wyłącznie twierdzeń o statusie P.
 */
export type Status = 'P' | 'W' | 'Z';

/**
 * Charakter twierdzenia ze statusem P. Status P potwierdza, że przepis istnieje i został przeczytany —
 * nie potwierdza interpretacji. Dlatego osobno zaznaczamy:
 *   brzmienie — twierdzenie streszcza treść przepisu bez wyciągania wniosków,
 *   wniosek   — twierdzenie łączy przepisy albo wyciąga z nich wniosek; wymaga potwierdzenia przez eksperta
 *               (powód w polu `uwagi`).
 */
export type Interpretacja = 'brzmienie' | 'wniosek';

export interface Zrodlo {
  tytul: string;
  publikator: string;
  url: string | null;
  rodzaj: string;
}

export interface Twierdzenie {
  id: string;
  obszar: string;
  tresc: string;
  wartosc?: number;
  jednostka?: string;
  rok?: number;
  zrodlo: string;
  przepis: string;
  status: Status;
  sprawdzono: string;
  przeglad: string;
  /** Wymagane dla statusu P. */
  interpretacja?: Interpretacja;
  /** Ograniczenia interpretacji — wymagane, gdy interpretacja to „wniosek”. */
  uwagi?: string;
  /** Data, od której przepis stosuje się, jeśli jeszcze nie obowiązuje albo jest to istotne (ISO). */
  obowiazujeOd?: string;
}

export const STAN_NA_DZIEN: string = dane.stanNaDzien;
export const ZRODLA = dane.zrodla as Record<string, Zrodlo>;
export const TWIERDZENIA = dane.twierdzenia as Twierdzenie[];

const indeks = new Map(TWIERDZENIA.map((t) => [t.id, t]));

export const OPISY_STATUSU: Record<Status, string> = {
  P: 'źródło pierwotne',
  W: 'źródło wtórne',
  Z: 'założenie własne',
};

export function twierdzenie(id: string): Twierdzenie {
  const t = indeks.get(id);
  if (!t) throw new Error(`Rejestr: brak twierdzenia „${id}”.`);
  return t;
}

export function zrodlo(klucz: string): Zrodlo {
  const z = ZRODLA[klucz];
  if (!z) throw new Error(`Rejestr: brak źródła „${klucz}”.`);
  return z;
}

/** Wartość liczbowa twierdzenia. Rzuca błąd, jeśli twierdzenie jej nie ma. */
export function wartosc(id: string): number {
  const t = twierdzenie(id);
  if (typeof t.wartosc !== 'number') {
    throw new Error(`Rejestr: twierdzenie „${id}” nie ma wartości liczbowej.`);
  }
  return t.wartosc;
}

export interface Przypis {
  nr: number;
  twierdzenie: Twierdzenie;
  zrodlo: Zrodlo;
}

/**
 * Buduje numerowaną listę przypisów dla jednej strony.
 * Odmawia twierdzeń o statusie innym niż P, żeby na stronę publiczną
 * nie trafiła informacja niepotwierdzona w źródle pierwotnym.
 */
export function przypisy(ids: readonly string[]) {
  const lista: Przypis[] = ids.map((id, i) => {
    const t = twierdzenie(id);
    if (t.status !== 'P') {
      throw new Error(
        `Rejestr: twierdzenie „${id}” ma status ${t.status}. Na stronie wolno użyć tylko statusu P.`,
      );
    }
    return { nr: i + 1, twierdzenie: t, zrodlo: zrodlo(t.zrodlo) };
  });
  const numery = new Map(lista.map((p) => [p.twierdzenie.id, p.nr]));
  return {
    lista,
    nr(id: string): number {
      const n = numery.get(id);
      if (!n) throw new Error(`Przypisy: „${id}” nie zostało zadeklarowane na tej stronie.`);
      return n;
    },
    wartosc,
  };
}
