import { describe, expect, it } from 'vitest';
import { policzRezerwe, walidujRezerwe } from './rezerwa';

describe('kalkulator rezerwy', () => {
  it('liczy cel, brak, pokrycie i czas dojścia do celu', () => {
    const w = policzRezerwe({ wydatki: 6000, miesiace: 6, zgromadzone: 10_000, odkladane: 1000 });
    expect(w.cel).toBe(36_000);
    expect(w.brakuje).toBe(26_000);
    expect(w.pokrycie).toBeCloseTo(10_000 / 6000, 12);
    expect(w.miesiaceDoCelu).toBe(26);
  });
  it('zaokrągla czas dojścia w górę do pełnych miesięcy', () => {
    expect(policzRezerwe({ wydatki: 1000, miesiace: 3, zgromadzone: 0, odkladane: 700 }).miesiaceDoCelu).toBe(5);
  });
  it('gdy cel jest osiągnięty, brak wynosi zero', () => {
    const w = policzRezerwe({ wydatki: 1000, miesiace: 3, zgromadzone: 5000, odkladane: 0 });
    expect(w.brakuje).toBe(0);
    expect(w.miesiaceDoCelu).toBe(0);
    expect(w.pokrycie).toBe(5);
  });
  it('bez odkładania i z brakiem nie podaje czasu dojścia', () => {
    expect(policzRezerwe({ wydatki: 1000, miesiace: 3, zgromadzone: 0, odkladane: 0 }).miesiaceDoCelu).toBeNull();
  });
  it('waliduje zakresy i pełne miesiące', () => {
    expect(walidujRezerwe({ wydatki: 0, miesiace: 2.5, zgromadzone: -1, odkladane: 0 })).toEqual({
      wydatki: expect.stringContaining('Miesięczne wydatki'),
      miesiace: expect.stringContaining('pełną liczbę miesięcy'),
      zgromadzone: expect.stringContaining('Już odłożone'),
    });
    expect(() => policzRezerwe({ wydatki: 0, miesiace: 3, zgromadzone: 0, odkladane: 0 })).toThrow(RangeError);
  });
});
