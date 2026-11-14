/**
 * Kalkulator rezerwy finansowej: ile pieniędzy pokrywa wybraną liczbę miesięcy wydatków,
 * ile brakuje i ile miesięcy zajmie uzupełnienie przy stałej kwocie odkładanej.
 * Bez inflacji i bez odsetek — to rachunek planistyczny, nie symulacja inwestycji.
 */
import { sprawdzPole, type Zakres } from './proste';

export interface DaneRezerwy {
  /** Miesięczne wydatki, które rezerwa ma pokryć (zł). */
  wydatki: number;
  /** Na ile miesięcy ma wystarczyć rezerwa — wybór kursanta. */
  miesiace: number;
  /** Ile już jest odłożone na rezerwę (zł). */
  zgromadzone: number;
  /** Ile miesięcznie kursant może dokładać do rezerwy (zł). */
  odkladane: number;
}

export interface WynikRezerwy {
  cel: number;
  brakuje: number;
  /** Na ile miesięcy wydatków wystarcza dziś zgromadzona kwota. */
  pokrycie: number;
  /** Ile pełnych miesięcy potrzeba do celu; null, gdy kwota odkładana wynosi zero, a cel nie jest osiągnięty. */
  miesiaceDoCelu: number | null;
}

export type PoleRezerwy = keyof DaneRezerwy;

export const POLA_REZERWY: Record<PoleRezerwy, { etykieta: string; zakres: Zakres; opisZakresu: string; calkowite: boolean }> = {
  wydatki: { etykieta: 'Miesięczne wydatki', zakres: { min: 1, max: 1_000_000 }, opisZakresu: 'od 1 zł do 1 mln zł', calkowite: false },
  miesiace: { etykieta: 'Na ile miesięcy', zakres: { min: 1, max: 36 }, opisZakresu: 'od 1 do 36 miesięcy', calkowite: true },
  zgromadzone: { etykieta: 'Już odłożone', zakres: { min: 0, max: 100_000_000 }, opisZakresu: 'od 0 zł do 100 mln zł', calkowite: false },
  odkladane: { etykieta: 'Odkładane co miesiąc', zakres: { min: 0, max: 1_000_000 }, opisZakresu: 'od 0 zł do 1 mln zł', calkowite: false },
};

export const KOLEJNOSC_POL_REZERWY: readonly PoleRezerwy[] = ['wydatki', 'miesiace', 'zgromadzone', 'odkladane'];

export function walidujRezerwe(d: DaneRezerwy): Partial<Record<PoleRezerwy, string>> {
  const bledy: Partial<Record<PoleRezerwy, string>> = {};
  for (const p of KOLEJNOSC_POL_REZERWY) {
    const o = POLA_REZERWY[p];
    const b = sprawdzPole(o.etykieta, d[p], o.zakres, o.opisZakresu, false);
    if (b) bledy[p] = b;
    else if (o.calkowite && !Number.isInteger(d[p])) bledy[p] = `${o.etykieta}: podaj pełną liczbę miesięcy.`;
  }
  return bledy;
}

export function policzRezerwe(d: DaneRezerwy): WynikRezerwy {
  const bledy = walidujRezerwe(d);
  const pierwszy = Object.values(bledy)[0];
  if (pierwszy) throw new RangeError(pierwszy);
  const cel = d.wydatki * d.miesiace;
  const brakuje = Math.max(0, cel - d.zgromadzone);
  const pokrycie = d.zgromadzone / d.wydatki;
  const miesiaceDoCelu = brakuje === 0 ? 0 : d.odkladane > 0 ? Math.ceil(brakuje / d.odkladane) : null;
  return { cel, brakuje, pokrycie, miesiaceDoCelu };
}
