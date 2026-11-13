/** Formatowanie liczb zgodne z polską pisownią: spacja jako separator tysięcy, przecinek dziesiętny. */

const NBSP = ' ';

function grupuj(liczba: number, miejsca: number): string {
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: miejsca,
    maximumFractionDigits: miejsca,
    useGrouping: 'always',
  }).format(liczba);
}

/** Kwota w złotych. Grosze pokazujemy tylko wtedy, gdy kwota nie jest pełna. */
export function zl(kwota: number, opcje: { grosze?: boolean } = {}): string {
  const zGroszami = opcje.grosze ?? !Number.isInteger(Math.round(kwota * 100) / 100);
  return `${grupuj(kwota, zGroszami ? 2 : 0)}${NBSP}zł`;
}

/** Kwota zaokrąglona do pełnych złotych — dla wyników symulacji. */
export function zlPelne(kwota: number): string {
  // „|| 0” zamienia ujemne zero na zwykłe, żeby nie wyświetlać „-0 zł”.
  return `${grupuj(Math.round(kwota) || 0, 0)}${NBSP}zł`;
}

/** Ułamek jako procent, np. 0.085 → „8,5%”. */
export function procent(ulamek: number, maksMiejsc = 2): string {
  const wartosc = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maksMiejsc,
  }).format(ulamek * 100);
  return `${wartosc}%`;
}

/** Data ISO (RRRR-MM-DD) w zapisie „13 listopada 2026 r.”. */
export function data(iso: string): string {
  const [rok, miesiac, dzien] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(rok, miesiac - 1, dzien));
  const tekst = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
  return `${tekst}${NBSP}r.`;
}

/** Odmiana słowa „rok” po liczebniku: 1 rok, 2 lata, 5 lat. */
export function lata(n: number): string {
  if (n === 1) return '1 rok';
  const j = n % 10;
  const d = n % 100;
  if (j >= 2 && j <= 4 && !(d >= 12 && d <= 14)) return `${n} lata`;
  return `${n} lat`;
}
