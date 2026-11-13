import { describe, expect, it } from 'vitest';
import { mnoznikMiesieczny, symuluj, waliduj, type Zalozenia } from './oszczednosci';

const bazowe: Zalozenia = {
  wplataMiesieczna: 500,
  lata: 20,
  stopaZwrotu: 0.04,
  inflacja: 0.025,
  koszty: 0,
};

/** Wzór zamknięty na wartość przyszłą renty płatnej z dołu. */
function wzorZamkniety(z: Zalozenia): number {
  const m = Math.pow((1 + z.stopaZwrotu) * (1 - z.koszty), 1 / 12);
  const n = z.lata * 12;
  return m === 1 ? z.wplataMiesieczna * n : (z.wplataMiesieczna * (Math.pow(m, n) - 1)) / (m - 1);
}

describe('symuluj', () => {
  it('przy zerowej stopie zwrotu i zerowych kosztach zwraca dokładnie sumę wpłat', () => {
    const w = symuluj({ ...bazowe, stopaZwrotu: 0 });
    expect(w.sumaWplat).toBe(500 * 12 * 20);
    expect(w.wartoscNominalna).toBeCloseTo(120_000, 6);
    expect(w.roznica).toBeCloseTo(0, 6);
  });

  it('zgadza się ze wzorem zamkniętym', () => {
    const w = symuluj(bazowe);
    expect(w.wartoscNominalna).toBeCloseTo(wzorZamkniety(bazowe), 4);
  });

  it('po roku przy 12% rocznie daje znaną wartość', () => {
    // mnożnik miesięczny = 1,12^(1/12); 12 wpłat po 100 zł z dołu
    const z: Zalozenia = { ...bazowe, wplataMiesieczna: 100, lata: 1, stopaZwrotu: 0.12, inflacja: 0 };
    const m = Math.pow(1.12, 1 / 12);
    const oczekiwane = (100 * (Math.pow(m, 12) - 1)) / (m - 1);
    expect(symuluj(z).wartoscNominalna).toBeCloseTo(oczekiwane, 8);
    expect(oczekiwane).toBeCloseTo(1264.62, 1);
  });

  it('wartość realna to wartość nominalna podzielona przez skumulowaną inflację', () => {
    const w = symuluj(bazowe);
    expect(w.wartoscRealna).toBeCloseTo(w.wartoscNominalna / Math.pow(1.025, 20), 6);
    expect(w.wartoscRealna).toBeLessThan(w.wartoscNominalna);
  });

  it('przy zerowej inflacji wartość realna równa się nominalnej', () => {
    const w = symuluj({ ...bazowe, inflacja: 0 });
    expect(w.wartoscRealna).toBeCloseTo(w.wartoscNominalna, 8);
  });

  it('koszty obniżają wynik', () => {
    const bez = symuluj(bazowe);
    const z = symuluj({ ...bazowe, koszty: 0.01 });
    expect(z.wartoscNominalna).toBeLessThan(bez.wartoscNominalna);
  });

  it('stopa zwrotu równa kosztom daje wynik bliski sumie wpłat, ale nie wyższy', () => {
    // (1 + 0,02) × (1 − 0,02) = 0,9996 — mnożnik netto minimalnie poniżej 1
    const w = symuluj({ ...bazowe, stopaZwrotu: 0.02, koszty: 0.02 });
    expect(w.wartoscNominalna).toBeLessThan(w.sumaWplat);
    expect(w.sumaWplat - w.wartoscNominalna).toBeLessThan(w.sumaWplat * 0.01);
  });

  it('ujemna stopa zwrotu daje wynik niższy od sumy wpłat', () => {
    const w = symuluj({ ...bazowe, stopaZwrotu: -0.03 });
    expect(w.roznica).toBeLessThan(0);
  });

  it('przebieg ma punkt startowy i po jednym punkcie na każdy rok', () => {
    const w = symuluj(bazowe);
    expect(w.przebieg).toHaveLength(21);
    expect(w.przebieg[0]).toEqual({ rok: 0, sumaWplat: 0, wartoscNominalna: 0, wartoscRealna: 0 });
    expect(w.przebieg[20].sumaWplat).toBe(w.sumaWplat);
    expect(w.przebieg[20].wartoscNominalna).toBe(w.wartoscNominalna);
  });

  it('suma wpłat rośnie liniowo', () => {
    const w = symuluj(bazowe);
    w.przebieg.forEach((p) => expect(p.sumaWplat).toBe(6000 * p.rok));
  });

  it('wynik skaluje się liniowo z wysokością wpłaty', () => {
    const a = symuluj(bazowe);
    const b = symuluj({ ...bazowe, wplataMiesieczna: 1500 });
    expect(b.wartoscNominalna).toBeCloseTo(a.wartoscNominalna * 3, 4);
  });

  it('odrzuca dane spoza zakresu', () => {
    expect(() => symuluj({ ...bazowe, lata: 0 })).toThrow(RangeError);
    expect(() => symuluj({ ...bazowe, wplataMiesieczna: Number.NaN })).toThrow(RangeError);
  });
});

describe('mnoznikMiesieczny', () => {
  it('podniesiony do 12. potęgi daje roczny mnożnik netto', () => {
    expect(Math.pow(mnoznikMiesieczny(0.05, 0.01), 12)).toBeCloseTo(1.05 * 0.99, 10);
  });
});

describe('waliduj', () => {
  it('przepuszcza poprawne dane', () => {
    expect(waliduj(bazowe)).toEqual({});
  });

  it('zwraca komunikat po polsku dla każdego błędnego pola', () => {
    const b = waliduj({ wplataMiesieczna: 0, lata: 80, stopaZwrotu: 0.5, inflacja: -0.2, koszty: 0.2 });
    expect(Object.keys(b).sort()).toEqual(['inflacja', 'koszty', 'lata', 'stopaZwrotu', 'wplataMiesieczna']);
    expect(b.lata).toContain('od 1 do 50 lat');
  });

  it('wymaga pełnej liczby lat', () => {
    expect(waliduj({ ...bazowe, lata: 2.5 }).lata).toContain('pełną liczbę lat');
  });
});
