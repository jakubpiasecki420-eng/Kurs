/**
 * Model danych platformy: KURS → MODUŁ → LEKCJA → SEKCJE → ĆWICZENIA.
 *
 * Typy są niezależne od Astro, żeby tę samą strukturę mogły czytać strony,
 * skrypty w przeglądarce, testy i w przyszłości serwer (zob. docs/architektura-platformy.md).
 */

export type StanKursu = 'aktywny' | 'w-przygotowaniu';

/** Status modułu z perspektywy kursanta. */
export type StatusModulu = 'niedostepny' | 'dostepny' | 'rozpoczety' | 'ukonczony';

export interface Lekcja {
  /** Identyfikator unikalny w obrębie kursu. */
  id: string;
  tytul: string;
  opis: string;
  czasMin: number;
  /** Adres strony lekcji. */
  adres: string;
  /** Numer w zapisie „1.2”. */
  numer: string;
  demonstracyjna: boolean;
}

export interface Modul {
  id: string;
  numer: number;
  tytul: string;
  opis: string;
  /** Moduły, które trzeba ukończyć, zanim ten stanie się dostępny. */
  wymaga: string[];
  lekcje: Lekcja[];
  adres: string;
}

export interface Kurs {
  id: string;
  tytul: string;
  opis: string;
  stan: StanKursu;
  /** Kurs z przykładowymi danymi, służący do pokazania działania platformy. */
  demonstracyjny: boolean;
  moduly: Modul[];
  adres: string;
}

/** Dane wejściowe kursu (plik src/content/kursy/*.json). */
export interface DaneKursu {
  id: string;
  tytul: string;
  opis: string;
  stan: StanKursu;
  demonstracyjny: boolean;
  moduly: Array<{ id: string; tytul: string; opis: string; wymaga: string[]; lekcje: string[] }>;
}

/** Metadane lekcji (nagłówek pliku src/content/lekcje/<kurs>/<lekcja>.md). */
export interface DaneLekcji {
  id: string;
  kurs: string;
  modul: string;
  tytul: string;
  opis: string;
  czasMin: number;
  demonstracyjna: boolean;
}

export const ADRES_PLATFORMY = '/platforma/';
export const adresKursu = (kurs: string) => `${ADRES_PLATFORMY}kurs/${kurs}/`;
export const adresModulu = (kurs: string, modul: string) => `${adresKursu(kurs)}${modul}/`;
export const adresLekcji = (kurs: string, modul: string, lekcja: string) => `${adresModulu(kurs, modul)}${lekcja}/`;
