import { describe, expect, it } from 'vitest';
import { liczbaZPola, przebiegInflacji, przebiegKapitalu, rokiTabeli, sprawdzPole, ZAKRESY_PROSTE } from './proste';

describe('liczbaZPola', () => {
  it('rozumie polski zapis', () => {
    expect(liczbaZPola('10 000')).toBe(10000);
    expect(liczbaZPola('2,5')).toBe(2.5);
    expect(liczbaZPola('−2 %')).toBe(-2);
    expect(liczbaZPola('abc')).toBeNaN();
    expect(liczbaZPola('')).toBeNaN();
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
    expect(przebiegInflacji(500, 0, 3)[3]).toEqual({ rok: 3, koszt: 500, silaNabywcza: 500 });
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
  });
});
