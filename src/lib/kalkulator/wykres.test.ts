import { describe, expect, it } from 'vitest';
import { symuluj } from './oszczednosci';
import { etykietaOsi, geometria, krokLat, kroki, rozsun, rysujWykres } from './wykres';

const wynik = symuluj({ wplataMiesieczna: 500, lata: 20, stopaZwrotu: 0.04, inflacja: 0.025, koszty: 0 });

describe('kroki', () => {
  it('zaczyna od zera i obejmuje wartość maksymalną', () => {
    [1, 37, 950, 12_345, 182_000, 2_600_000].forEach((maks) => {
      const k = kroki(maks);
      expect(k[0]).toBe(0);
      expect(k[k.length - 1]).toBeGreaterThanOrEqual(maks);
      expect(k.length).toBeGreaterThanOrEqual(3);
      expect(k.length).toBeLessThanOrEqual(7);
    });
  });
  it('daje okrągłe odstępy', () => {
    expect(kroki(182_000)).toEqual([0, 50_000, 100_000, 150_000, 200_000]);
    expect(kroki(120_000)).toEqual([0, 50_000, 100_000, 150_000]);
  });
});

describe('etykietaOsi', () => {
  it('stosuje jeden styl na całej osi', () => {
    expect(etykietaOsi(0, 200_000)).toBe('0');
    expect(etykietaOsi(50_000, 200_000)).toBe('50 tys.');
    expect(etykietaOsi(2500, 7500).replace(/\s/g, ' ')).toBe('2 500');
    expect(etykietaOsi(1_500_000, 2_000_000)).toBe('1,5 mln');
  });
});

describe('krokLat', () => {
  it('rzadziej opisuje dłuższe okresy', () => {
    expect(krokLat(5)).toBe(1);
    expect(krokLat(10)).toBe(2);
    expect(krokLat(20)).toBe(5);
    expect(krokLat(45)).toBe(10);
  });
});

describe('rozsun', () => {
  it('zachowuje pozycje, które się nie stykają', () => {
    expect(rozsun([10, 60, 120], 17, 0, 300)).toEqual([10, 60, 120]);
  });
  it('rozsuwa nachodzące etykiety na wymagany odstęp', () => {
    const r = rozsun([100, 104, 108], 17, 0, 300);
    const posortowane = [...r].sort((a, b) => a - b);
    expect(posortowane[1] - posortowane[0]).toBeGreaterThanOrEqual(17);
    expect(posortowane[2] - posortowane[1]).toBeGreaterThanOrEqual(17);
  });
  it('nie wychodzi poza dolną krawędź', () => {
    const r = rozsun([290, 295, 299], 17, 0, 300);
    expect(Math.max(...r)).toBeLessThanOrEqual(300);
  });
});

describe('geometria i rysunek', () => {
  it('umieszcza zero na dole, a maksimum osi na górze obszaru wykresu', () => {
    const g = geometria(wynik, 720);
    expect(g.y(0)).toBeCloseTo(g.wysokosc - g.dol, 6);
    expect(g.y(g.maksOsi)).toBeCloseTo(g.gora, 6);
    expect(g.x(0)).toBe(g.lewy);
    expect(g.x(20)).toBeCloseTo(720 - g.prawy, 6);
  });
  it('na wąskim ekranie rezygnuje z etykiet końcowych', () => {
    expect(geometria(wynik, 320).etykietyKoncowe).toBe(false);
    expect(geometria(wynik, 720).etykietyKoncowe).toBe(true);
  });
  it('rysuje trzy linie i opis dla czytników ekranu', () => {
    const svg = rysujWykres(wynik, 720);
    expect(svg.match(/<path /g)).toHaveLength(3);
    expect(svg).toContain('role="img"');
    expect(svg).toContain('<title');
    expect(svg).not.toContain('NaN');
  });
});
