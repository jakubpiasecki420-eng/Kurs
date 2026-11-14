/**
 * Obliczenia dla kalkulatorów procentu składanego i inflacji.
 * Symulacje matematyczne przy stałych założeniach — nie prognozy.
 */

export interface Zakres {
  min: number;
  max: number;
}

/**
 * Odczyt liczby z pola tekstowego w polskim zapisie.
 * Przecinek to separator dziesiętny; spacje (także twarde) i kropki w grupach po trzy cyfry
 * to separatory tysięcy („10 000”, „10.000”, „1.000,50”). Kropka w innym miejscu („2.5”) jest
 * traktowana jak przecinek. Pomija znak %, „zł”, „lat” i akceptuje minus typograficzny.
 * Zwraca NaN, gdy zapis jest niejednoznaczny lub błędny.
 */
export function liczbaZPola(tekst: string): number {
  let t = tekst
    .toLowerCase()
    .replace(/zł|lat|%/g, '')
    .replace(/[\s\u00a0\u202f]/g, '')
    .replace(/^[−–]/, '-');
  if (t === '') return Number.NaN;
  // Kropki jako separatory tysięcy: pierwsza grupa 1–3 cyfr (nie od zera), dalej grupy po 3 cyfry.
  if (/^-?[1-9]\d{0,2}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, '');
  if (t.includes('.') && t.includes(',')) return Number.NaN;
  t = t.replace(',', '.');
  if (!/^-?(\d+(\.\d+)?|\.\d+)$/.test(t)) return Number.NaN;
  return Number(t);
}

/** Komunikat błędu albo null, gdy wartość jest poprawna. */
export function sprawdzPole(nazwa: string, v: number, z: Zakres, opisZakresu: string, calkowita = false): string | null {
  if (!Number.isFinite(v)) return `${nazwa}: wpisz liczbę.`;
  if (v < z.min || v > z.max) return `${nazwa}: podaj wartość ${opisZakresu}.`;
  if (calkowita && !Number.isInteger(v)) return `${nazwa}: podaj pełną liczbę lat.`;
  return null;
}

export const ZAKRESY_PROSTE = {
  kwota: { min: 1, max: 10_000_000 },
  stopa: { min: -0.2, max: 0.2 },
  inflacja: { min: -0.05, max: 0.2 },
  lata: { min: 1, max: 50 },
} as const;

// ---------- Procent składany ----------

export interface RokKapitalu {
  rok: number;
  /** Zysk pozostaje na koncie i pracuje razem z kapitałem. */
  skladany: number;
  /** Zysk wypłacany co roku: kapitał plus suma wypłaconych zysków. */
  prosty: number;
}

export function przebiegKapitalu(kwota: number, stopa: number, lata: number): RokKapitalu[] {
  if (!(kwota > 0) || !(stopa > -1) || !Number.isInteger(lata) || lata < 0) {
    throw new RangeError('Nieprawidłowe dane procentu składanego.');
  }
  return Array.from({ length: lata + 1 }, (_, rok) => ({
    rok,
    skladany: kwota * Math.pow(1 + stopa, rok),
    prosty: kwota + kwota * stopa * rok,
  }));
}

// ---------- Inflacja ----------

export interface RokInflacji {
  rok: number;
  /** Ile będzie kosztować to, co dziś kosztuje `kwota`. */
  koszt: number;
  /** Ile w dzisiejszych pieniądzach będzie warta `kwota` otrzymana w danym roku. */
  silaNabywcza: number;
}

export function przebiegInflacji(kwota: number, inflacja: number, lata: number): RokInflacji[] {
  if (!(kwota > 0) || !(inflacja > -1) || !Number.isInteger(lata) || lata < 0) {
    throw new RangeError('Nieprawidłowe dane inflacji.');
  }
  return Array.from({ length: lata + 1 }, (_, rok) => {
    const m = Math.pow(1 + inflacja, rok);
    return { rok, koszt: kwota * m, silaNabywcza: kwota / m };
  });
}

/** Lata pokazywane w tabeli: każdy rok dla krótkich okresów, co 5 lat dla dłuższych, zawsze ostatni. */
export function rokiTabeli(lata: number): number[] {
  const krok = lata <= 10 ? 1 : 5;
  const wynik: number[] = [];
  for (let r = krok; r <= lata; r += krok) wynik.push(r);
  if (wynik[wynik.length - 1] !== lata) wynik.push(lata);
  return wynik;
}
