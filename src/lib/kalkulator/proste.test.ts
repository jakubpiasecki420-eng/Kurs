import { describe, expect, it } from 'vitest';
import { liczbaZPola, przebiegInflacji, przebiegKapitalu, rokiTabeli, sprawdzPole, ZAKRESY_PROSTE } from './proste';

describe('liczbaZPola', () => {
  it('rozumie polski zapis', () => {
    expect(liczbaZPola('10 000')).toBe(10000);
    expect(liczbaZPola('10\u00a0000')).toBe(10000);
    expect(liczbaZPola('2,5')).toBe(2.5);
    expect(liczbaZPola('−2 %')).toBe(-2);
    expect(liczbaZPola('10 000 zł')).toBe(10000);
    expect(liczbaZPola('20 lat')).toBe(20);
    expect(liczbaZPola('abc')).toBeNaN();
    expect(liczbaZPola('')).toBeNaN();
  });
  it('kropkę w grupach po trzy cyfry traktuje jak separator tysięcy', () => {
    expect(liczbaZPola('10.000')).toBe(10000);
    expect(liczbaZPola('1.000.000')).toBe(1_000_000);
    expect(liczbaZPola('1.000,50')).toBe(1000.5);
    expect(liczbaZPola('2.500')).toBe(2500);
  });
  it('kropkę w innym miejscu traktuje jak przecinek dziesiętny', () => {
    expect(liczbaZPola('2.5')).toBe(2.5);
    expect(liczbaZPola('0.025')).toBe(0.025);
    expect(liczbaZPola('1,000')).toBe(1);
  });
  it('odrzuca zapis niejednoznaczny lub błędny', () => {
    expect(liczbaZPola('1,5.0')).toBeNaN();
    expect(liczbaZPola('1.2.3')).toBeNaN();
    expect(liczbaZPola('1e3')).toBeNaN();
    expect(liczbaZPola('10.00.0')).toBeNaN();
  });
});

describe('sprawdzPole', () => {
  it('zwraca komunikaty po polsku', () => {
    expect(sprawdzPole('Okres', 80, ZAKRESY_PROSTE.lata, 'od 1 do 50 lat', true)).toContain('od 1 do 50 lat');
    expect(sprawdzPole('Okres', 2.5, ZAKRESY_PROSTE.lata, 'od 1 do 50 lat', true)).toContain('pełną liczbę lat');
    expect(sprawdzPole('Kwota', Number.NaN, ZAKRESY_PROSTE.kwota, 'x')).toContain('wpisz liczbę');
    expect(sprawdzPole('Kwota', 100, ZAKRESY_PROSTE.kwota, 'x')).toBeNull();
  });
});

describe('przebiegKapitalu', () => {
  it('liczy procent składany i prosty', () => {
    const p = przebiegKapitalu(10_000, 0.05, 10);
    expect(p).toHaveLength(11);
    expect(p[0]).toEqual({ rok: 0, skladany: 10_000, prosty: 10_000 });
    expect(p[10].skladany).toBeCloseTo(16_288.95, 2);
    expect(p[10].prosty).toBeCloseTo(15_000, 8);
  });
  it('przy zerowej stopie oba warianty są równe', () => {
    przebiegKapitalu(1000, 0, 5).forEach((r) => expect(r.skladany).toBe(r.prosty));
  });
  it('przy ujemnej stopie wartość maleje', () => {
    const p = przebiegKapitalu(1000, -0.02, 3);
    expect(p[3].skladany).toBeLessThan(1000);
  });
  it('odrzuca błędne dane', () => {
    expect(() => przebiegKapitalu(0, 0.05, 5)).toThrow(RangeError);
    expect(() => przebiegKapitalu(100, 0.05, 2.5)).toThrow(RangeError);
  });
});

describe('przebiegInflacji', () => {
  it('koszt rośnie, a siła nabywcza maleje o ten sam czynnik', () => {
    const p = przebiegInflacji(1000, 0.025, 20);
    expect(p[20].koszt).toBeCloseTo(1638.62, 2);
    expect(p[20].silaNabywcza).toBeCloseTo(610.27, 2);
    expect(p[20].koszt * p[20].silaNabywcza).toBeCloseTo(1000 * 1000, 4);
  });
  it('przy zerowej inflacji nic się nie zmienia', () => {
    expect(przebiegInflacji(500, 0, 3)[3]).toEqual({ rok: 3, skumulowana: 0, koszt: 500, silaNabywcza: 500 });
  });
});

describe('rokiTabeli', () => {
  it('dla krótkich okresów każdy rok, dla długich co 5 lat i zawsze ostatni', () => {
    expect(rokiTabeli(4)).toEqual([1, 2, 3, 4]);
    expect(rokiTabeli(20)).toEqual([5, 10, 15, 20]);
    expect(rokiTabeli(23)).toEqual([5, 10, 15, 20, 23]);
  });
});

import { walidujProste, widokProsty } from './proste-widok';

/** Format kwot używa twardych spacji; w testach porównujemy zwykłe. */
const t = (x: string) => x.replace(/[\u00a0\u202f]/g, ' ');
const tt = (xs: string[]) => xs.map(t);

describe('widokProsty', () => {
  it('procent składany: kafle, serie i tabela są spójne', () => {
    const w = widokProsty('procent-skladany', { kwota: 10_000, stopa: 0.05, lata: 10 });
    expect(t(w.kafle[0].wartosc)).toBe('16 289 zł');
    expect(t(w.kafle[2].wartosc)).toBe('15 000 zł');
    expect(t(w.kafle[3].wartosc)).toBe('1 289 zł');
    expect(w.serie[0].wartosci).toHaveLength(11);
    expect(w.wiersze.map((r) => r.rok)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(tt(w.wiersze[9].komorki)).toEqual(['16 289 zł', '15 000 zł', '1 289 zł']);
  });
  it('inflacja: koszt rośnie, siła nabywcza spada', () => {
    const w = widokProsty('inflacja', { kwota: 1000, stopa: 0.025, lata: 20 });
    expect(t(w.kafle[0].wartosc)).toBe('1 639 zł');
    expect(t(w.kafle[1].wartosc)).toBe('610 zł');
    expect(t(w.kafle[2].wartosc)).toBe('61%');
    expect(w.wiersze.map((r) => r.rok)).toEqual([5, 10, 15, 20]);
    expect(w.serie[2].wartosci.every((v) => v === 1000)).toBe(true);
  });
  it('walidacja wskazuje pola spoza zakresu', () => {
    expect(walidujProste('inflacja', { kwota: 1000, stopa: 0.5, lata: 10 })).toHaveProperty('stopa');
    expect(walidujProste('procent-skladany', { kwota: 0, stopa: 0.05, lata: 60 })).toEqual({
      kwota: expect.any(String),
      lata: expect.any(String),
    });
    expect(walidujProste('procent-skladany', { kwota: 100, stopa: -0.02, lata: 3 })).toEqual({});
    expect(walidujProste('inflacja', { kwota: 100, stopa: 0.25, lata: 3 })).toHaveProperty('stopa');
  });
  it('przy ujemnej stopie nie nazywa straty zyskiem', () => {
    const w = widokProsty('procent-skladany', { kwota: 10_000, stopa: -0.02, lata: 20 });
    const etykiety = w.kafle.map((k) => k.etykieta).join(' | ');
    expect(etykiety).not.toMatch(/zysk/i);
    expect(w.kafle[1]).toMatchObject({ etykieta: 'Strata łącznie' });
    expect(t(w.kafle[1].wartosc)).toBe('3 324 zł');
    expect(w.kolumny.join(' ')).not.toMatch(/zysk/i);
  });
  it('odmienia liczbę lat w kalkulatorze inflacji', () => {
    const e = (lata: number) => widokProsty('inflacja', { kwota: 1000, stopa: 0.025, lata }).kafle[0].etykieta;
    expect(e(1)).toBe('Tyle będzie kosztować za 1 rok');
    expect(e(2)).toBe('Tyle będzie kosztować za 2 lata');
    expect(e(5)).toBe('Tyle będzie kosztować za 5 lat');
    expect(e(22)).toBe('Tyle będzie kosztować za 22 lata');
  });
});

import { stopaRealna } from './proste';

describe('kontrola niezależnymi obliczeniami (etap 2C)', () => {
  it('procent prosty przy stracie nie spada poniżej zera', () => {
    // 1 zł, −20% rocznie, 50 lat: 1 + 1 × (−0,2) × 50 = −9 → nie można stracić więcej niż kapitał.
    const p = przebiegKapitalu(1, -0.2, 50);
    expect(p[50].prosty).toBe(0);
    expect(p[5].prosty).toBeCloseTo(0, 10);
    expect(p[4].prosty).toBeCloseTo(0.2, 10);
    expect(p[50].skladany).toBeCloseTo(0.8 ** 50, 15);
    p.forEach((r) => expect(r.prosty).toBeGreaterThanOrEqual(0));
  });

  it('inflacja skumulowana to łączny wzrost cen, a nie suma rocznych stóp', () => {
    const p = przebiegInflacji(1000, 0.025, 20);
    expect(p[20].skumulowana).toBeCloseTo(1.025 ** 20 - 1, 12);
    expect(p[20].skumulowana).toBeGreaterThan(0.025 * 20);
    expect(p[0].skumulowana).toBe(0);
    const w = widokProsty('inflacja', { kwota: 1000, stopa: 0.025, lata: 20 });
    expect(w.kafle[3]).toMatchObject({ etykieta: 'Łączny wzrost cen przez 20 lat (inflacja skumulowana)', wartosc: '63,9%' });
  });

  it('stopa realna liczona dokładnie, a nie jako różnica', () => {
    expect(stopaRealna(0.05, 0.025)).toBeCloseTo(1.05 / 1.025 - 1, 12);
    expect(stopaRealna(0.025, 0.025)).toBeCloseTo(0, 12);
    expect(stopaRealna(0, 0.025)).toBeLessThan(0);
    expect(() => stopaRealna(-1, 0.02)).toThrow(RangeError);
  });

  it('kalkulator procentu przy stracie pokazuje wartości nieujemne', () => {
    const w = widokProsty('procent-skladany', { kwota: 1, stopa: -0.2, lata: 50 });
    w.serie.forEach((s) => s.wartosci.forEach((v) => expect(v).toBeGreaterThanOrEqual(0)));
  });
});
