/**
 * Model widoku kalkulatorów procentu składanego i inflacji: z założeń powstają kafle,
 * serie wykresu i wiersze tabeli. Używany przy budowaniu strony i w przeglądarce,
 * więc pierwszy wynik jest widoczny bez JavaScriptu.
 */
import { liczebnik, procent, zlPelne } from '../format';
import {
  przebiegInflacji,
  przebiegKapitalu,
  rokiTabeli,
  sprawdzPole,
  ZAKRESY_PROSTE,
  type Zakres,
} from './proste';
import type { SeriaLinii } from './wykres-linie';

export type RodzajProsty = 'procent-skladany' | 'inflacja';
export type PoleProste = 'kwota' | 'stopa' | 'lata';

export interface DaneProste {
  kwota: number;
  /** Ułamek roczny: stopa zwrotu albo inflacja. */
  stopa: number;
  lata: number;
}

export interface OpisPola {
  etykieta: string;
  jednostka: string;
  opis: string;
  zakres: Zakres;
  opisZakresu: string;
  procentowe: boolean;
  calkowite: boolean;
}

export interface Kafel {
  etykieta: string;
  wartosc: string;
  kolor?: string;
}

export interface WidokProsty {
  kafle: Kafel[];
  serie: SeriaLinii[];
  kolumny: string[];
  wiersze: { rok: number; komorki: string[] }[];
  tytulWykresu: string;
  opisWykresu: string;
}

const lat = (n: number) => (n === 1 ? 'roku' : 'latach');

export const POLA: Record<RodzajProsty, Record<PoleProste, OpisPola>> = {
  'procent-skladany': {
    kwota: {
      etykieta: 'Kwota początkowa',
      jednostka: 'zł',
      opis: 'Jednorazowa wpłata na początku okresu. Bez kolejnych wpłat.',
      zakres: ZAKRESY_PROSTE.kwota,
      opisZakresu: 'od 1 zł do 10 mln zł',
      procentowe: false,
      calkowite: false,
    },
    stopa: {
      etykieta: 'Roczna stopa zwrotu',
      jednostka: '%',
      opis: 'To Twoje założenie, nie prognoza. Sprawdź też wariant zerowy i ujemny.',
      zakres: ZAKRESY_PROSTE.stopa,
      opisZakresu: 'od −20% do 20%',
      procentowe: true,
      calkowite: false,
    },
    lata: {
      etykieta: 'Okres',
      jednostka: 'lat',
      opis: 'Pełna liczba lat, od 1 do 50.',
      zakres: ZAKRESY_PROSTE.lata,
      opisZakresu: 'od 1 do 50 lat',
      procentowe: false,
      calkowite: true,
    },
  },
  inflacja: {
    kwota: {
      etykieta: 'Kwota w dzisiejszych pieniądzach',
      jednostka: 'zł',
      opis: 'Na przykład miesięczny koszt życia albo cena koszyka zakupów.',
      zakres: ZAKRESY_PROSTE.kwota,
      opisZakresu: 'od 1 zł do 10 mln zł',
      procentowe: false,
      calkowite: false,
    },
    stopa: {
      etykieta: 'Roczna inflacja',
      jednostka: '%',
      opis: 'Stała w każdym roku. Rzeczywista inflacja zmienia się z roku na rok.',
      zakres: ZAKRESY_PROSTE.inflacja,
      opisZakresu: 'od −5% do 20%',
      procentowe: true,
      calkowite: false,
    },
    lata: {
      etykieta: 'Za ile lat',
      jednostka: 'lat',
      opis: 'Pełna liczba lat, od 1 do 50.',
      zakres: ZAKRESY_PROSTE.lata,
      opisZakresu: 'od 1 do 50 lat',
      procentowe: false,
      calkowite: true,
    },
  },
};

export const KOLEJNOSC_POL: readonly PoleProste[] = ['kwota', 'stopa', 'lata'];

export function walidujProste(rodzaj: RodzajProsty, d: DaneProste): Partial<Record<PoleProste, string>> {
  const bledy: Partial<Record<PoleProste, string>> = {};
  for (const pole of KOLEJNOSC_POL) {
    const o = POLA[rodzaj][pole];
    const blad = sprawdzPole(o.etykieta, d[pole], o.zakres, o.opisZakresu, o.calkowite);
    if (blad) bledy[pole] = blad;
  }
  return bledy;
}

function widokProcentu(d: DaneProste): WidokProsty {
  const p = przebiegKapitalu(d.kwota, d.stopa, d.lata);
  const k = p[p.length - 1];
  const strata = d.stopa < 0;
  // Przy ujemnej stopie „zysk” byłby mylący: pokazujemy stratę i porównanie ze stałą stratą roczną.
  const n = {
    wynik: strata ? 'Strata łącznie' : 'Zysk łącznie',
    prosty: strata ? 'Gdyby co roku tracić tę samą kwotę' : 'Gdyby zysk co roku wypłacać',
    roznica: strata ? 'O tyle mniejsza strata niż przy stałej kwocie' : 'Zysk od wcześniejszych zysków',
    seriaSkladany: strata ? 'Strata liczona od bieżącej wartości (procent składany)' : 'Zysk zostaje na koncie (procent składany)',
    seriaProsty: strata ? 'Strata liczona od kwoty początkowej (procent prosty)' : 'Zysk wypłacany co roku (procent prosty)',
    kolSkladany: strata ? 'Strata od bieżącej wartości' : 'Zysk zostaje na koncie',
    kolProsty: strata ? 'Strata od kwoty początkowej' : 'Zysk wypłacany co roku',
  };
  return {
    kafle: [
      { etykieta: `Wartość po ${d.lata} ${lat(d.lata)}`, wartosc: zlPelne(k.skladany), kolor: 'var(--seria-nominalna)' },
      { etykieta: n.wynik, wartosc: zlPelne(Math.abs(k.skladany - d.kwota)) },
      { etykieta: n.prosty, wartosc: zlPelne(k.prosty), kolor: 'var(--seria-wplaty)' },
      { etykieta: n.roznica, wartosc: zlPelne(k.skladany - k.prosty) },
    ],
    serie: [
      { nazwa: n.seriaSkladany, krotko: 'składany', kolor: 'var(--seria-nominalna)', wartosci: p.map((r) => r.skladany) },
      {
        nazwa: n.seriaProsty,
        krotko: 'prosty',
        kolor: 'var(--seria-wplaty)',
        wartosci: p.map((r) => r.prosty),
        przerywana: true,
      },
    ],
    kolumny: ['Rok', n.kolSkladany, n.kolProsty, 'Różnica'],
    wiersze: rokiTabeli(d.lata).map((rok) => ({
      rok,
      komorki: [zlPelne(p[rok].skladany), zlPelne(p[rok].prosty), zlPelne(p[rok].skladany - p[rok].prosty)],
    })),
    tytulWykresu: 'Wartość kwoty początkowej w kolejnych latach',
    opisWykresu: `Dwie linie: ${n.seriaSkladany.toLowerCase()} i ${n.seriaProsty.toLowerCase()}. Te same dane są w tabeli pod wykresem.`,
  };
}

function widokInflacji(d: DaneProste): WidokProsty {
  const p = przebiegInflacji(d.kwota, d.stopa, d.lata);
  const k = p[p.length - 1];
  return {
    kafle: [
      { etykieta: `Tyle będzie kosztować za ${liczebnik(d.lata, 'rok', 'lata', 'lat')}`, wartosc: zlPelne(k.koszt), kolor: 'var(--seria-nominalna)' },
      { etykieta: `Tyle dziś jest warte ${zlPelne(d.kwota)} otrzymane za ${liczebnik(d.lata, 'rok', 'lata', 'lat')}`, wartosc: zlPelne(k.silaNabywcza), kolor: 'var(--seria-realna)' },
      { etykieta: 'Siła nabywcza w porównaniu z dzisiejszą', wartosc: procent(k.silaNabywcza / d.kwota, 1) },
      {
        etykieta: `Łączny wzrost cen przez ${liczebnik(d.lata, 'rok', 'lata', 'lat')} (inflacja skumulowana)`,
        wartosc: procent(k.skumulowana, 1),
      },
    ],
    serie: [
      { nazwa: 'Cena tego samego koszyka', krotko: 'cena', kolor: 'var(--seria-nominalna)', wartosci: p.map((r) => r.koszt) },
      {
        nazwa: 'Wartość stałej kwoty w dzisiejszych pieniądzach',
        krotko: 'siła nabywcza',
        kolor: 'var(--seria-realna)',
        wartosci: p.map((r) => r.silaNabywcza),
      },
      { nazwa: 'Kwota dzisiaj', krotko: 'dziś', kolor: 'var(--seria-wplaty)', wartosci: p.map(() => d.kwota), przerywana: true },
    ],
    kolumny: ['Rok', 'Cena tego samego koszyka', 'Stała kwota w dzisiejszych pieniądzach'],
    wiersze: rokiTabeli(d.lata).map((rok) => ({
      rok,
      komorki: [zlPelne(p[rok].koszt), zlPelne(p[rok].silaNabywcza)],
    })),
    tytulWykresu: 'Cena i siła nabywcza w kolejnych latach',
    opisWykresu:
      'Trzy linie: cena koszyka, który dziś kosztuje podaną kwotę, wartość tej samej kwoty w dzisiejszych pieniądzach oraz kwota dzisiaj jako punkt odniesienia. Te same dane są w tabeli pod wykresem.',
  };
}

export function widokProsty(rodzaj: RodzajProsty, d: DaneProste): WidokProsty {
  return rodzaj === 'procent-skladany' ? widokProcentu(d) : widokInflacji(d);
}
