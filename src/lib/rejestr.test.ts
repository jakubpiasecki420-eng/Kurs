import { describe, expect, it } from 'vitest';
import { przypisy, STAN_NA_DZIEN, TWIERDZENIA, twierdzenie, wartosc, ZRODLA } from './rejestr';

const DATA_ISO = /^\d{4}-\d{2}-\d{2}$/;

describe('rejestr twierdzeń', () => {
  it('ma datę stanu prawnego', () => {
    expect(STAN_NA_DZIEN).toMatch(DATA_ISO);
  });

  it('nie zawiera zdublowanych identyfikatorów', () => {
    const ids = TWIERDZENIA.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(TWIERDZENIA.map((t) => [t.id, t] as const))('%s ma komplet pól', (_id, t) => {
    expect(t.tresc.length).toBeGreaterThan(20);
    expect(['P', 'W', 'Z']).toContain(t.status);
    expect(t.sprawdzono).toMatch(DATA_ISO);
    expect(t.przeglad).toMatch(DATA_ISO);
    expect(t.przeglad > t.sprawdzono).toBe(true);
    expect(t.przepis.length).toBeGreaterThan(0);
    expect(ZRODLA[t.zrodlo], `źródło ${t.zrodlo}`).toBeDefined();
  });

  it('twierdzenia o statusie P wskazują akt prawny lub urząd z adresem', () => {
    TWIERDZENIA.filter((t) => t.status === 'P').forEach((t) => {
      const z = ZRODLA[t.zrodlo];
      expect(['akt prawny', 'urząd'], t.id).toContain(z.rodzaj);
      expect(z.url, t.id).toMatch(/^https:\/\//);
    });
  });

  it('założenia własne nie udają źródeł zewnętrznych', () => {
    TWIERDZENIA.filter((t) => t.status === 'Z').forEach((t) => {
      expect(t.zrodlo, t.id).toBe('analiza-wlasna');
    });
  });

  it('limity wynikają ze wspólnej prognozy wynagrodzenia', () => {
    // 2027: 10 033 zł → IKE 3×, IKZE 1,2× i 1,8×
    expect(wartosc('ike-limit-2027')).toBe(10033 * 3);
    expect(wartosc('ikze-limit-2027')).toBeCloseTo(10033 * 1.2, 2);
    expect(wartosc('ikze-limit-2027-dzialalnosc')).toBeCloseTo(10033 * 1.8, 2);
    // 2026: 9 420 zł
    expect(wartosc('ike-limit-2026')).toBe(9420 * 3);
    expect(wartosc('ikze-limit-2026')).toBeCloseTo(9420 * 1.2, 2);
    expect(wartosc('ikze-limit-2026-dzialalnosc')).toBeCloseTo(9420 * 1.8, 2);
  });
});

describe('przypisy', () => {
  it('numeruje twierdzenia w kolejności deklaracji', () => {
    const p = przypisy(['ike-limit-2027', 'ike-wyplata-warunki']);
    expect(p.nr('ike-limit-2027')).toBe(1);
    expect(p.nr('ike-wyplata-warunki')).toBe(2);
    expect(p.lista[1].zrodlo.publikator).toContain('Dz.U.');
  });

  it('odmawia twierdzeń niepotwierdzonych w źródle pierwotnym', () => {
    expect(() => przypisy(['rynek-ppk'])).toThrow(/status W/);
    expect(() => przypisy(['z-ikze-wzgledem-ike'])).toThrow(/status Z/);
  });

  it('zgłasza nieznany identyfikator', () => {
    expect(() => twierdzenie('nie-ma-takiego')).toThrow(/brak twierdzenia/);
  });
});
