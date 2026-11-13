/**
 * Postęp kursanta: czyste funkcje na niezmiennym stanie.
 *
 * Funkcje nie wiedzą, gdzie stan jest przechowywany — to zadanie magazynu (magazyn.ts).
 * Dzięki temu przejście z pamięci przeglądarki na serwer nie zmienia logiki ani widoków.
 */
import type { KursKlienta } from './kurs';
import type { StatusModulu } from './model';

export const WERSJA_STANU = 1;
const LIMIT_AKTYWNOSCI = 30;

export interface WynikQuizu {
  poprawne: number;
  wszystkie: number;
  data: string;
}

export interface PostepKursu {
  /** Identyfikator lekcji → data ukończenia (ISO). */
  ukonczoneLekcje: Record<string, string>;
  /** Identyfikator modułu → data ukończenia (ISO). */
  ukonczoneModuly: Record<string, string>;
  /** Ostatnio otwarta lekcja. */
  biezaca: { modul: string; lekcja: string } | null;
  /** Identyfikator lekcji → ostatni wynik quizu. */
  wynikiQuizow: Record<string, WynikQuizu>;
}

export type RodzajAktywnosci = 'otwarcie-lekcji' | 'ukonczenie-lekcji' | 'ukonczenie-modulu' | 'quiz';

export interface Aktywnosc {
  rodzaj: RodzajAktywnosci;
  kurs: string;
  modul: string;
  lekcja?: string;
  data: string;
  /** Opis do wyświetlenia, np. tytuł lekcji. */
  opis: string;
}

export interface StanPostepu {
  wersja: typeof WERSJA_STANU;
  profil: { nazwa: string | null };
  kursy: Record<string, PostepKursu>;
  aktywnosci: Aktywnosc[];
  ostatniaAktywnosc: string | null;
}

export function pustyStan(): StanPostepu {
  return { wersja: WERSJA_STANU, profil: { nazwa: null }, kursy: {}, aktywnosci: [], ostatniaAktywnosc: null };
}

const pustyPostepKursu = (): PostepKursu => ({ ukonczoneLekcje: {}, ukonczoneModuly: {}, biezaca: null, wynikiQuizow: {} });

const jestObiektem = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const jestData = (v: unknown): v is string => typeof v === 'string' && !Number.isNaN(Date.parse(v));

function mapaDat(v: unknown): Record<string, string> {
  if (!jestObiektem(v)) return {};
  return Object.fromEntries(Object.entries(v).filter(([, d]) => jestData(d))) as Record<string, string>;
}

/**
 * Odtwarza stan z niezaufanych danych (np. z pamięci przeglądarki albo pliku importu).
 * Błędne pola są pomijane; całkowicie błędne dane dają pusty stan zamiast wyjątku.
 */
export function walidujStan(dane: unknown): StanPostepu {
  if (!jestObiektem(dane) || dane.wersja !== WERSJA_STANU) return pustyStan();
  const stan = pustyStan();
  if (jestObiektem(dane.profil) && typeof dane.profil.nazwa === 'string') {
    stan.profil.nazwa = dane.profil.nazwa.slice(0, 60);
  }
  if (jestObiektem(dane.kursy)) {
    for (const [idKursu, k] of Object.entries(dane.kursy)) {
      if (!jestObiektem(k)) continue;
      const wyniki: Record<string, WynikQuizu> = {};
      if (jestObiektem(k.wynikiQuizow)) {
        for (const [idLekcji, w] of Object.entries(k.wynikiQuizow)) {
          if (
            jestObiektem(w) &&
            Number.isInteger(w.poprawne) &&
            Number.isInteger(w.wszystkie) &&
            (w.wszystkie as number) > 0 &&
            (w.poprawne as number) >= 0 &&
            (w.poprawne as number) <= (w.wszystkie as number) &&
            jestData(w.data)
          ) {
            wyniki[idLekcji] = { poprawne: w.poprawne as number, wszystkie: w.wszystkie as number, data: w.data };
          }
        }
      }
      const b = k.biezaca;
      stan.kursy[idKursu] = {
        ukonczoneLekcje: mapaDat(k.ukonczoneLekcje),
        ukonczoneModuly: mapaDat(k.ukonczoneModuly),
        biezaca:
          jestObiektem(b) && typeof b.modul === 'string' && typeof b.lekcja === 'string'
            ? { modul: b.modul, lekcja: b.lekcja }
            : null,
        wynikiQuizow: wyniki,
      };
    }
  }
  if (Array.isArray(dane.aktywnosci)) {
    const rodzaje: RodzajAktywnosci[] = ['otwarcie-lekcji', 'ukonczenie-lekcji', 'ukonczenie-modulu', 'quiz'];
    stan.aktywnosci = dane.aktywnosci
      .filter(
        (a): a is Aktywnosc =>
          jestObiektem(a) &&
          rodzaje.includes(a.rodzaj as RodzajAktywnosci) &&
          typeof a.kurs === 'string' &&
          typeof a.modul === 'string' &&
          typeof a.opis === 'string' &&
          jestData(a.data),
      )
      .slice(0, LIMIT_AKTYWNOSCI);
  }
  stan.ostatniaAktywnosc = jestData(dane.ostatniaAktywnosc) ? dane.ostatniaAktywnosc : null;
  return stan;
}

export function postepKursu(stan: StanPostepu, idKursu: string): PostepKursu {
  return stan.kursy[idKursu] ?? pustyPostepKursu();
}

function zmienKurs(stan: StanPostepu, idKursu: string, zmiana: (k: PostepKursu) => PostepKursu): StanPostepu {
  const obecny = postepKursu(stan, idKursu);
  return { ...stan, kursy: { ...stan.kursy, [idKursu]: zmiana(obecny) } };
}

function dodajAktywnosc(stan: StanPostepu, a: Aktywnosc): StanPostepu {
  return { ...stan, aktywnosci: [a, ...stan.aktywnosci].slice(0, LIMIT_AKTYWNOSCI), ostatniaAktywnosc: a.data };
}

function znajdzLekcje(kurs: KursKlienta, idModulu: string, idLekcji: string) {
  const modul = kurs.moduly.find((m) => m.id === idModulu);
  const lekcja = modul?.lekcje.find((l) => l.id === idLekcji);
  if (!modul || !lekcja) throw new Error(`Kurs „${kurs.id}” nie zawiera lekcji „${idModulu}/${idLekcji}”.`);
  return { modul, lekcja };
}

export function lekcjaUkonczona(stan: StanPostepu, idKursu: string, idLekcji: string): boolean {
  return Boolean(postepKursu(stan, idKursu).ukonczoneLekcje[idLekcji]);
}

export function statusModulu(stan: StanPostepu, kurs: KursKlienta, idModulu: string): StatusModulu {
  const modul = kurs.moduly.find((m) => m.id === idModulu);
  if (!modul) throw new Error(`Kurs „${kurs.id}” nie zawiera modułu „${idModulu}”.`);
  const p = postepKursu(stan, kurs.id);
  if (modul.lekcje.length === 0) return 'niedostepny';
  const wymagane = modul.wymaga.every((w) => statusModulu(stan, kurs, w) === 'ukonczony');
  if (!wymagane) return 'niedostepny';
  const ukonczone = modul.lekcje.filter((l) => p.ukonczoneLekcje[l.id]).length;
  if (ukonczone === modul.lekcje.length) return 'ukonczony';
  if (ukonczone > 0 || p.biezaca?.modul === modul.id) return 'rozpoczety';
  return 'dostepny';
}

export interface Podsumowanie {
  ukonczoneLekcje: number;
  wszystkieLekcje: number;
  ukonczoneModuly: number;
  wszystkieModuly: number;
  procent: number;
}

export function podsumowanie(stan: StanPostepu, kurs: KursKlienta): Podsumowanie {
  const p = postepKursu(stan, kurs.id);
  const lekcje = kurs.moduly.flatMap((m) => m.lekcje);
  const ukonczone = lekcje.filter((l) => p.ukonczoneLekcje[l.id]).length;
  const modulyZLekcjami = kurs.moduly.filter((m) => m.lekcje.length > 0);
  return {
    ukonczoneLekcje: ukonczone,
    wszystkieLekcje: lekcje.length,
    ukonczoneModuly: modulyZLekcjami.filter((m) => statusModulu(stan, kurs, m.id) === 'ukonczony').length,
    wszystkieModuly: modulyZLekcjami.length,
    procent: lekcje.length === 0 ? 0 : Math.round((ukonczone / lekcje.length) * 100),
  };
}

/**
 * Lekcja, od której warto kontynuować: bieżąca, jeśli nie jest ukończona,
 * w przeciwnym razie pierwsza nieukończona w dostępnym module. `null` — kurs ukończony.
 */
export function nastepnaLekcja(stan: StanPostepu, kurs: KursKlienta) {
  const p = postepKursu(stan, kurs.id);
  if (p.biezaca && !p.ukonczoneLekcje[p.biezaca.lekcja]) {
    const m = kurs.moduly.find((x) => x.id === p.biezaca?.modul);
    const l = m?.lekcje.find((x) => x.id === p.biezaca?.lekcja);
    if (m && l && statusModulu(stan, kurs, m.id) !== 'niedostepny') return { modul: m, lekcja: l };
  }
  for (const m of kurs.moduly) {
    if (statusModulu(stan, kurs, m.id) === 'niedostepny') continue;
    const l = m.lekcje.find((x) => !p.ukonczoneLekcje[x.id]);
    if (l) return { modul: m, lekcja: l };
  }
  return null;
}

export function otworzLekcje(stan: StanPostepu, kurs: KursKlienta, idModulu: string, idLekcji: string, teraz: Date): StanPostepu {
  const { lekcja } = znajdzLekcje(kurs, idModulu, idLekcji);
  const data = teraz.toISOString();
  const poZmianie = zmienKurs(stan, kurs.id, (k) => ({ ...k, biezaca: { modul: idModulu, lekcja: idLekcji } }));
  const ostatnia = stan.aktywnosci[0];
  // Ponowne otwarcie tej samej lekcji nie zaśmieca historii.
  if (ostatnia?.rodzaj === 'otwarcie-lekcji' && ostatnia.lekcja === idLekcji && ostatnia.kurs === kurs.id) {
    return { ...poZmianie, ostatniaAktywnosc: data };
  }
  return dodajAktywnosc(poZmianie, {
    rodzaj: 'otwarcie-lekcji',
    kurs: kurs.id,
    modul: idModulu,
    lekcja: idLekcji,
    data,
    opis: `${lekcja.numer} ${lekcja.tytul}`,
  });
}

export function ukonczLekcje(stan: StanPostepu, kurs: KursKlienta, idModulu: string, idLekcji: string, teraz: Date): StanPostepu {
  const { modul, lekcja } = znajdzLekcje(kurs, idModulu, idLekcji);
  if (lekcjaUkonczona(stan, kurs.id, idLekcji)) return stan;
  const data = teraz.toISOString();
  let nowy = zmienKurs(stan, kurs.id, (k) => ({ ...k, ukonczoneLekcje: { ...k.ukonczoneLekcje, [idLekcji]: data } }));
  nowy = dodajAktywnosc(nowy, {
    rodzaj: 'ukonczenie-lekcji',
    kurs: kurs.id,
    modul: idModulu,
    lekcja: idLekcji,
    data,
    opis: `${lekcja.numer} ${lekcja.tytul}`,
  });
  const p = postepKursu(nowy, kurs.id);
  if (modul.lekcje.every((l) => p.ukonczoneLekcje[l.id]) && !p.ukonczoneModuly[modul.id]) {
    nowy = zmienKurs(nowy, kurs.id, (k) => ({ ...k, ukonczoneModuly: { ...k.ukonczoneModuly, [modul.id]: data } }));
    nowy = dodajAktywnosc(nowy, { rodzaj: 'ukonczenie-modulu', kurs: kurs.id, modul: modul.id, data, opis: modul.tytul });
  }
  return nowy;
}

/** Cofa ukończenie lekcji — kursant może wrócić do materiału. Ukończenie modułu też jest cofane. */
export function cofnijUkonczenie(stan: StanPostepu, kurs: KursKlienta, idModulu: string, idLekcji: string): StanPostepu {
  znajdzLekcje(kurs, idModulu, idLekcji);
  return zmienKurs(stan, kurs.id, (k) => {
    const lekcje = { ...k.ukonczoneLekcje };
    const moduly = { ...k.ukonczoneModuly };
    delete lekcje[idLekcji];
    delete moduly[idModulu];
    return { ...k, ukonczoneLekcje: lekcje, ukonczoneModuly: moduly };
  });
}

export function zapiszWynikQuizu(
  stan: StanPostepu,
  kurs: KursKlienta,
  idModulu: string,
  idLekcji: string,
  poprawne: number,
  wszystkie: number,
  teraz: Date,
): StanPostepu {
  const { lekcja } = znajdzLekcje(kurs, idModulu, idLekcji);
  if (!Number.isInteger(poprawne) || !Number.isInteger(wszystkie) || wszystkie <= 0 || poprawne < 0 || poprawne > wszystkie) {
    throw new RangeError('Nieprawidłowy wynik quizu.');
  }
  const data = teraz.toISOString();
  const nowy = zmienKurs(stan, kurs.id, (k) => ({
    ...k,
    wynikiQuizow: { ...k.wynikiQuizow, [idLekcji]: { poprawne, wszystkie, data } },
  }));
  return dodajAktywnosc(nowy, {
    rodzaj: 'quiz',
    kurs: kurs.id,
    modul: idModulu,
    lekcja: idLekcji,
    data,
    opis: `${lekcja.numer} ${lekcja.tytul}: ${poprawne}/${wszystkie}`,
  });
}

export function ustawNazwe(stan: StanPostepu, nazwa: string): StanPostepu {
  const czysta = nazwa.replace(/\s+/g, ' ').trim().slice(0, 60);
  return { ...stan, profil: { nazwa: czysta || null } };
}
