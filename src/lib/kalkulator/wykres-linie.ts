/**
 * Prosty wykres liniowy dla kalkulatorów procentu składanego i inflacji.
 * Ta sama funkcja działa przy budowaniu strony i w przeglądarce. Wykres nie ma
 * interakcji — dokładne wartości są w tabeli pod nim.
 */
import { etykietaOsi, krokLat, kroki, rozsun } from './wykres';

export interface SeriaLinii {
  nazwa: string;
  /** Krótka etykieta przy końcu linii. */
  krotko: string;
  kolor: string;
  /** Wartość dla roku 0, 1, 2… */
  wartosci: number[];
  przerywana?: boolean;
}

export interface OpcjeWykresu {
  serie: SeriaLinii[];
  szerokosc: number;
  /** Rozróżnia identyfikatory, gdy na stronie jest więcej niż jeden wykres. */
  prefiks: string;
  tytul: string;
  opis: string;
  osCzasu?: string;
}

const z = (n: number) => (Math.round(n * 10) / 10).toString();
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rysujLinie(o: OpcjeWykresu): string {
  const lata = Math.max(...o.serie.map((s) => s.wartosci.length)) - 1;
  if (!(lata >= 1) || o.serie.some((s) => s.wartosci.some((v) => !Number.isFinite(v)))) {
    throw new RangeError('Wykres wymaga co najmniej dwóch skończonych punktów w każdej serii.');
  }
  const etykietyKoncowe = o.szerokosc >= 560;
  const wysokosc = o.szerokosc < 480 ? 240 : 300;
  const lewy = 58;
  const prawy = etykietyKoncowe ? 104 : 14;
  const gora = 26;
  const dol = 44;
  const maks = Math.max(...o.serie.flatMap((s) => s.wartosci));
  const osY = kroki(maks);
  const maksOsi = osY[osY.length - 1];
  const w = o.szerokosc - lewy - prawy;
  const h = wysokosc - gora - dol;
  const x = (r: number) => lewy + (r / lata) * w;
  const y = (v: number) => gora + h - (v / maksOsi) * h;

  const krok = krokLat(lata);
  const osX: number[] = [];
  for (let r = 0; r <= lata; r += krok) osX.push(r);
  if (osX[osX.length - 1] !== lata && lata - osX[osX.length - 1] >= krok / 2) osX.push(lata);

  const siatka = osY
    .map(
      (v) =>
        `<line x1="${lewy}" x2="${z(o.szerokosc - prawy)}" y1="${z(y(v))}" y2="${z(y(v))}" class="wykres__siatka${v === 0 ? ' wykres__siatka--os' : ''}"/>` +
        `<text x="${lewy - 10}" y="${z(y(v))}" dy="0.32em" text-anchor="end" class="wykres__os">${etykietaOsi(v, maksOsi)}</text>`,
    )
    .join('');
  const czas = osX
    .map((r) => `<text x="${z(x(r))}" y="${wysokosc - dol + 20}" text-anchor="middle" class="wykres__os">${r}</text>`)
    .join('');
  const linie = o.serie
    .map(
      (s) =>
        `<path d="${s.wartosci.map((v, r) => `${r === 0 ? 'M' : 'L'}${z(x(r))} ${z(y(v))}`).join('')}" fill="none" stroke="${s.kolor}" stroke-width="2"${s.przerywana ? ' stroke-dasharray="5 4"' : ''} stroke-linejoin="round" stroke-linecap="round"/>`,
    )
    .join('');
  const yKoncowe = o.serie.map((s) => y(s.wartosci[s.wartosci.length - 1]));
  const kropki = o.serie
    .map(
      (s, i) =>
        `<circle cx="${z(x(lata))}" cy="${z(yKoncowe[i])}" r="4.5" fill="${s.kolor}" stroke="var(--powierzchnia)" stroke-width="2"/>`,
    )
    .join('');
  let etykiety = '';
  if (etykietyKoncowe) {
    const yE = rozsun(yKoncowe, 17, gora + 6, wysokosc - dol - 2);
    etykiety = o.serie
      .map((s, i) => {
        const lacznik =
          Math.abs(yE[i] - yKoncowe[i]) > 3
            ? `<line x1="${z(x(lata) + 6)}" y1="${z(yKoncowe[i])}" x2="${z(x(lata) + 13)}" y2="${z(yE[i])}" class="wykres__lacznik"/>`
            : '';
        return `${lacznik}<text x="${z(x(lata) + 16)}" y="${z(yE[i])}" dy="0.32em" class="wykres__etykieta">${esc(s.krotko)}</text>`;
      })
      .join('');
  }

  return (
    `<svg class="wykres__svg" viewBox="0 0 ${o.szerokosc} ${wysokosc}" width="${o.szerokosc}" height="${wysokosc}" role="img" aria-labelledby="${o.prefiks}-tytul ${o.prefiks}-opis">` +
    `<title id="${o.prefiks}-tytul">${esc(o.tytul)}</title><desc id="${o.prefiks}-opis">${esc(o.opis)}</desc>` +
    `<g>${siatka}</g>` +
    `<text x="${lewy}" y="${wysokosc - 6}" class="wykres__os wykres__os--tytul">${esc(o.osCzasu ?? 'Lata')}</text>` +
    `<text x="${lewy - 10}" y="11" text-anchor="end" class="wykres__os wykres__os--tytul">zł</text>` +
    `<g>${czas}</g><g>${linie}</g><g>${kropki}</g><g>${etykiety}</g></svg>`
  );
}
