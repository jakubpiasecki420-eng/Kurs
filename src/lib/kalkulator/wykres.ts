/**
 * Wykres liniowy przebiegu symulacji. Jedna funkcja buduje znaczniki SVG
 * zarówno przy budowaniu strony, jak i w przeglądarce, więc wykres jest
 * widoczny także bez JavaScriptu.
 */
import type { PunktRoczny, Wynik } from './oszczednosci';

export interface Seria {
  klucz: 'wartoscNominalna' | 'wartoscRealna' | 'sumaWplat';
  nazwa: string;
  krotko: string;
  kolor: string;
}

/** Stała kolejność serii — kolor jest przypisany do serii, nie do pozycji. */
export const SERIE: readonly Seria[] = [
  { klucz: 'wartoscNominalna', nazwa: 'Wartość nominalna', krotko: 'nominalna', kolor: 'var(--seria-nominalna)' },
  {
    klucz: 'wartoscRealna',
    nazwa: 'Wartość w dzisiejszych pieniądzach',
    krotko: 'realna',
    kolor: 'var(--seria-realna)',
  },
  { klucz: 'sumaWplat', nazwa: 'Suma wpłat', krotko: 'wpłaty', kolor: 'var(--seria-wplaty)' },
];

/** Okrągłe wartości osi od zera do co najmniej `maks`. */
export function kroki(maks: number, cel = 4): number[] {
  if (!(maks > 0)) return [0, 1];
  const surowy = maks / cel;
  const rzad = Math.pow(10, Math.floor(Math.log10(surowy)));
  const ulamek = surowy / rzad;
  const mnoznik = ulamek <= 1 ? 1 : ulamek <= 2 ? 2 : ulamek <= 2.5 ? 2.5 : ulamek <= 5 ? 5 : 10;
  const krok = mnoznik * rzad;
  const wynik: number[] = [];
  for (let v = 0; v < maks + krok * 0.999; v += krok) wynik.push(Math.round(v * 1e6) / 1e6);
  return wynik;
}

/** Etykieta osi wartości: pełna poniżej 10 tys., dalej skrócona — jeden styl na całej osi. */
export function etykietaOsi(v: number, maksOsi: number): string {
  const f = (x: number, miejsca: number) =>
    x.toLocaleString('pl-PL', { maximumFractionDigits: miejsca, useGrouping: 'always' } as Intl.NumberFormatOptions);
  if (v === 0) return '0';
  if (maksOsi >= 1_000_000) return `${f(v / 1_000_000, 2)} mln`;
  if (maksOsi >= 10_000) return `${f(v / 1000, 1)} tys.`;
  return f(v, 0);
}

/** Co ile lat stawiamy znacznik na osi czasu. */
export function krokLat(lata: number): number {
  if (lata <= 6) return 1;
  if (lata <= 12) return 2;
  if (lata <= 30) return 5;
  return 10;
}

export interface Geometria {
  szerokosc: number;
  wysokosc: number;
  lewy: number;
  prawy: number;
  gora: number;
  dol: number;
  maksOsi: number;
  x: (rok: number) => number;
  y: (wartosc: number) => number;
  etykietyKoncowe: boolean;
}

export function geometria(wynik: Wynik, szerokosc: number): Geometria {
  const etykietyKoncowe = szerokosc >= 560;
  const wysokosc = szerokosc < 480 ? 260 : 340;
  const lewy = 58;
  const prawy = etykietyKoncowe ? 92 : 14;
  const gora = 30;
  const dol = 44;
  const maks = Math.max(
    ...wynik.przebieg.map((p) => Math.max(p.sumaWplat, p.wartoscNominalna, p.wartoscRealna)),
  );
  const osie = kroki(maks);
  const maksOsi = osie[osie.length - 1];
  const lata = wynik.przebieg.length - 1;
  const w = szerokosc - lewy - prawy;
  const h = wysokosc - gora - dol;
  return {
    szerokosc,
    wysokosc,
    lewy,
    prawy,
    gora,
    dol,
    maksOsi,
    etykietyKoncowe,
    x: (rok) => lewy + (lata === 0 ? 0 : (rok / lata) * w),
    y: (v) => gora + h - (v / maksOsi) * h,
  };
}

const z = (n: number) => (Math.round(n * 10) / 10).toString();

function sciezka(punkty: PunktRoczny[], klucz: Seria['klucz'], g: Geometria): string {
  return punkty.map((p, i) => `${i === 0 ? 'M' : 'L'}${z(g.x(p.rok))} ${z(g.y(p[klucz]))}`).join('');
}

/** Rozsuwa etykiety końcowe, żeby na siebie nie nachodziły. Zwraca pozycje w kolejności wejściowej. */
export function rozsun(pozycje: number[], odstep: number, min: number, maks: number): number[] {
  const kolejnosc = pozycje.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < kolejnosc.length; k += 1) {
    if (kolejnosc[k].y - kolejnosc[k - 1].y < odstep) kolejnosc[k].y = kolejnosc[k - 1].y + odstep;
  }
  const nadmiar = kolejnosc[kolejnosc.length - 1].y - maks;
  if (nadmiar > 0) kolejnosc.forEach((e) => (e.y -= nadmiar));
  for (let k = kolejnosc.length - 2; k >= 0; k -= 1) {
    if (kolejnosc[k + 1].y - kolejnosc[k].y < odstep) kolejnosc[k].y = kolejnosc[k + 1].y - odstep;
  }
  const wynik = new Array<number>(pozycje.length);
  kolejnosc.forEach((e) => (wynik[e.i] = Math.max(min, e.y)));
  return wynik;
}

export function rysujWykres(wynik: Wynik, szerokosc: number): string {
  const g = geometria(wynik, szerokosc);
  const lata = wynik.przebieg.length - 1;
  const ostatni = wynik.przebieg[lata];
  const osY = kroki(g.maksOsi === 0 ? 1 : g.maksOsi).filter((v) => v <= g.maksOsi + 1e-9);
  const krok = krokLat(lata);
  const osX: number[] = [];
  for (let r = 0; r <= lata; r += krok) osX.push(r);
  if (osX[osX.length - 1] !== lata && lata - osX[osX.length - 1] >= krok / 2) osX.push(lata);

  const siatka = osY
    .map((v) => {
      const y = z(g.y(v));
      return (
        `<line x1="${g.lewy}" x2="${z(g.szerokosc - g.prawy)}" y1="${y}" y2="${y}" class="wykres__siatka${v === 0 ? ' wykres__siatka--os' : ''}"/>` +
        `<text x="${g.lewy - 10}" y="${y}" dy="0.32em" text-anchor="end" class="wykres__os">${etykietaOsi(v, g.maksOsi)}</text>`
      );
    })
    .join('');

  const czas = osX
    .map(
      (r) =>
        `<text x="${z(g.x(r))}" y="${g.wysokosc - g.dol + 20}" text-anchor="middle" class="wykres__os">${r}</text>`,
    )
    .join('');

  const linie = SERIE.map(
    (s) =>
      `<path d="${sciezka(wynik.przebieg, s.klucz, g)}" fill="none" stroke="${s.kolor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`,
  ).join('');

  const xKoniec = g.x(lata);
  const yKoncowe = SERIE.map((s) => g.y(ostatni[s.klucz]));
  const kropki = SERIE.map(
    (s, i) =>
      `<circle cx="${z(xKoniec)}" cy="${z(yKoncowe[i])}" r="4.5" fill="${s.kolor}" stroke="var(--powierzchnia)" stroke-width="2"/>`,
  ).join('');

  let etykiety = '';
  if (g.etykietyKoncowe) {
    const yEtykiet = rozsun(yKoncowe, 17, g.gora + 6, g.wysokosc - g.dol - 2);
    etykiety = SERIE.map((s, i) => {
      const przesuniete = Math.abs(yEtykiet[i] - yKoncowe[i]) > 3;
      const lacznik = przesuniete
        ? `<line x1="${z(xKoniec + 6)}" y1="${z(yKoncowe[i])}" x2="${z(xKoniec + 13)}" y2="${z(yEtykiet[i])}" class="wykres__lacznik"/>`
        : '';
      return `${lacznik}<text x="${z(xKoniec + 16)}" y="${z(yEtykiet[i])}" dy="0.32em" class="wykres__etykieta">${s.krotko}</text>`;
    }).join('');
  }

  return (
    `<svg class="wykres__svg" viewBox="0 0 ${g.szerokosc} ${g.wysokosc}" width="${g.szerokosc}" height="${g.wysokosc}" role="img" aria-labelledby="wykres-tytul wykres-opis">` +
    `<title id="wykres-tytul">Przebieg symulacji w kolejnych latach</title>` +
    `<desc id="wykres-opis">Trzy linie: wartość nominalna, wartość w dzisiejszych pieniądzach i suma wpłat. Te same dane są w tabeli pod wykresem.</desc>` +
    `<g>${siatka}</g>` +
    `<text x="${g.lewy}" y="${g.wysokosc - 6}" class="wykres__os wykres__os--tytul">Lata oszczędzania</text>` +
    `<text x="${g.lewy - 10}" y="11" text-anchor="end" class="wykres__os wykres__os--tytul">zł</text>` +
    `<g>${czas}</g>` +
    `<g data-kursor hidden><line class="wykres__kursor" y1="${g.gora}" y2="${g.wysokosc - g.dol}"/>` +
    SERIE.map(
      (s) =>
        `<circle data-kursor-punkt="${s.klucz}" r="4.5" fill="${s.kolor}" stroke="var(--powierzchnia)" stroke-width="2"/>`,
    ).join('') +
    `</g>` +
    `<g>${linie}</g><g>${kropki}</g><g>${etykiety}</g>` +
    `</svg>`
  );
}
