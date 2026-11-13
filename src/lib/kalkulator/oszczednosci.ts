/**
 * Kalkulator scenariuszy regularnego oszczędzania.
 *
 * To symulacja matematyczna, a nie prognoza. Nie zawiera żadnych zasad
 * podatkowych — te wymagają osobnej weryfikacji (zob. docs/kalkulator-wymagania.md).
 *
 * Metoda:
 *  1. Roczny mnożnik netto = (1 + stopa zwrotu) × (1 − koszty roczne).
 *  2. Mnożnik miesięczny = pierwiastek 12. stopnia z mnożnika rocznego.
 *  3. Wpłata trafia na konto na koniec każdego miesiąca i jest stała nominalnie.
 *  4. Wartość realna = wartość nominalna / (1 + inflacja)^(liczba lat).
 */

export interface Zalozenia {
  /** Wpłata miesięczna w złotych. */
  wplataMiesieczna: number;
  /** Okres oszczędzania w pełnych latach. */
  lata: number;
  /** Roczna stopa zwrotu przed kosztami, jako ułamek (0.04 = 4%). */
  stopaZwrotu: number;
  /** Roczna inflacja jako ułamek. */
  inflacja: number;
  /** Roczne koszty jako ułamek wartości zgromadzonych środków. */
  koszty: number;
}

export interface PunktRoczny {
  rok: number;
  sumaWplat: number;
  wartoscNominalna: number;
  wartoscRealna: number;
}

export interface Wynik {
  sumaWplat: number;
  wartoscNominalna: number;
  wartoscRealna: number;
  /** Wartość nominalna minus suma wpłat. Może być ujemna. */
  roznica: number;
  /** Stan na koniec każdego roku; punkt 0 to chwila startu. */
  przebieg: PunktRoczny[];
}

export const ZAKRESY = {
  wplataMiesieczna: { min: 1, max: 100_000 },
  lata: { min: 1, max: 50 },
  stopaZwrotu: { min: -0.2, max: 0.2 },
  inflacja: { min: -0.05, max: 0.2 },
  koszty: { min: 0, max: 0.05 },
} as const;

export type Pole = keyof Zalozenia;
export type Bledy = Partial<Record<Pole, string>>;

const NAZWY: Record<Pole, string> = {
  wplataMiesieczna: 'Wpłata miesięczna',
  lata: 'Okres oszczędzania',
  stopaZwrotu: 'Stopa zwrotu',
  inflacja: 'Inflacja',
  koszty: 'Koszty roczne',
};

function zakres(pole: Pole): string {
  const { min, max } = ZAKRESY[pole];
  if (pole === 'wplataMiesieczna') return `od ${min} do ${max.toLocaleString('pl-PL')} zł`;
  if (pole === 'lata') return `od ${min} do ${max} lat`;
  const p = (x: number) => `${(x * 100).toLocaleString('pl-PL', { maximumFractionDigits: 1 })}%`;
  return `od ${p(min)} do ${p(max)}`;
}

/** Zwraca komunikaty błędów dla pól spoza zakresu. Pusty obiekt oznacza poprawne dane. */
export function waliduj(z: Zalozenia): Bledy {
  const bledy: Bledy = {};
  (Object.keys(ZAKRESY) as Pole[]).forEach((pole) => {
    const v = z[pole];
    const { min, max } = ZAKRESY[pole];
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      bledy[pole] = `${NAZWY[pole]}: wpisz liczbę.`;
    } else if (v < min || v > max) {
      bledy[pole] = `${NAZWY[pole]}: podaj wartość ${zakres(pole)}.`;
    } else if (pole === 'lata' && !Number.isInteger(v)) {
      bledy[pole] = `${NAZWY[pole]}: podaj pełną liczbę lat.`;
    }
  });
  return bledy;
}

/** Miesięczny mnożnik wartości po uwzględnieniu kosztów. */
export function mnoznikMiesieczny(stopaZwrotu: number, koszty: number): number {
  return Math.pow((1 + stopaZwrotu) * (1 - koszty), 1 / 12);
}

export function symuluj(z: Zalozenia): Wynik {
  const bledy = waliduj(z);
  const pierwszy = Object.values(bledy)[0];
  if (pierwszy) throw new RangeError(pierwszy);

  const m = mnoznikMiesieczny(z.stopaZwrotu, z.koszty);
  const przebieg: PunktRoczny[] = [
    { rok: 0, sumaWplat: 0, wartoscNominalna: 0, wartoscRealna: 0 },
  ];

  let wartosc = 0;
  for (let rok = 1; rok <= z.lata; rok += 1) {
    for (let miesiac = 0; miesiac < 12; miesiac += 1) {
      wartosc = wartosc * m + z.wplataMiesieczna;
    }
    przebieg.push({
      rok,
      sumaWplat: z.wplataMiesieczna * 12 * rok,
      wartoscNominalna: wartosc,
      wartoscRealna: wartosc / Math.pow(1 + z.inflacja, rok),
    });
  }

  const ostatni = przebieg[przebieg.length - 1];
  return {
    sumaWplat: ostatni.sumaWplat,
    wartoscNominalna: ostatni.wartoscNominalna,
    wartoscRealna: ostatni.wartoscRealna,
    roznica: ostatni.wartoscNominalna - ostatni.sumaWplat,
    przebieg,
  };
}
