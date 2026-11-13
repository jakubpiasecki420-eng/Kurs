import { describe, expect, it } from 'vitest';
import { ikzeWzgledemIke, odliczenie } from './ikze';
import { wartosc } from '@/lib/rejestr';

const limit2027 = wartosc('ikze-limit-2027-dzialalnosc');
const podatekPrzyWyplacie = wartosc('ikze-wyplata-podatek');

describe('odliczenie', () => {
  it('liczy zmniejszenie podatku jako wpłatę razy stawkę', () => {
    const w = odliczenie({ wplata: 10_000, limit: limit2027, stawka: 0.19 });
    expect(w.kwotaOdliczenia).toBe(10_000);
    expect(w.zmniejszeniePodatku).toBeCloseTo(1900, 8);
  });

  it('ogranicza odliczenie do limitu', () => {
    const w = odliczenie({ wplata: 50_000, limit: limit2027, stawka: 0.12 });
    expect(w.kwotaOdliczenia).toBe(limit2027);
    expect(w.zmniejszeniePodatku).toBeCloseTo(2167.13, 2);
  });

  it.each([
    [0.085, 1535.05],
    [0.12, 2167.13],
    [0.19, 3431.29],
    [0.32, 5779.01],
  ])('dla stawki %f i pełnego limitu 2027 daje %f zł', (stawka, oczekiwane) => {
    const w = odliczenie({ wplata: limit2027, limit: limit2027, stawka });
    expect(w.zmniejszeniePodatku).toBeCloseTo(oczekiwane, 2);
  });

  it('odrzuca niepoprawne dane', () => {
    expect(() => odliczenie({ wplata: -1, limit: limit2027, stawka: 0.12 })).toThrow(RangeError);
    expect(() => odliczenie({ wplata: 100, limit: limit2027, stawka: 1.2 })).toThrow(RangeError);
  });
});

describe('ikzeWzgledemIke', () => {
  it('przy stawce równej podatkowi przy wypłacie daje dokładnie 1', () => {
    expect(ikzeWzgledemIke(0.1, podatekPrzyWyplacie)).toBeCloseTo(1, 12);
  });

  it.each([
    [0.085, 0.9836],
    [0.12, 1.0227],
    [0.19, 1.1111],
    [0.32, 1.3235],
  ])('dla stawki %f daje %f', (stawka, oczekiwane) => {
    expect(ikzeWzgledemIke(stawka, podatekPrzyWyplacie)).toBeCloseTo(oczekiwane, 4);
  });
});
