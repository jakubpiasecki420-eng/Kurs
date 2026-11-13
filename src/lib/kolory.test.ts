import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KOLORY } from './kolory';
import { kontrast } from './kontrast';

const css = readFileSync(new URL('../styles/tokeny.css', import.meta.url), 'utf8');

describe('paleta', () => {
  it('zawiera kolory z briefu marki', () => {
    expect(KOLORY.granat).toBe('#101D35');
    expect(KOLORY.zloto).toBe('#D5B875');
    expect(KOLORY.tlo).toBe('#F5F6F8');
    expect(KOLORY.lupek).toBe('#26364B');
    expect(KOLORY.biel).toBe('#FFFFFF');
  });

  it('jest zgodna z plikiem tokenów CSS', () => {
    Object.values(KOLORY).forEach((hex) => {
      expect(css.toUpperCase(), hex).toContain(hex.toUpperCase());
    });
  });
});

describe('kontrast tekstu (WCAG AA: co najmniej 4,5:1)', () => {
  const pary: Array<[string, string, string]> = [
    ['tekst główny na jasnym tle', KOLORY.granat, KOLORY.tlo],
    ['tekst pomocniczy na jasnym tle', KOLORY.lupek, KOLORY.tlo],
    ['tekst cichy na jasnym tle', KOLORY.tekstCichy, KOLORY.tlo],
    ['tekst cichy na bieli', KOLORY.tekstCichy, KOLORY.biel],
    ['ciemne złoto na jasnym tle', KOLORY.zlotoCiemne, KOLORY.tlo],
    ['ciemne złoto na bieli', KOLORY.zlotoCiemne, KOLORY.biel],
    ['biel na granacie', KOLORY.biel, KOLORY.granat],
    ['złoto na granacie', KOLORY.zloto, KOLORY.granat],
    ['złoto na głębokim granacie', KOLORY.zloto, KOLORY.granatGleboki],
    ['komunikat błędu na bieli', KOLORY.blad, KOLORY.biel],
    ['granat na złocie (przycisk)', KOLORY.granat, KOLORY.zloto],
  ];
  it.each(pary)('%s', (_nazwa, a, b) => {
    expect(kontrast(a, b)).toBeGreaterThanOrEqual(4.5);
  });

  it('jasne złoto na jasnym tle nie nadaje się na tekst', () => {
    expect(kontrast(KOLORY.zloto, KOLORY.tlo)).toBeLessThan(3);
  });
});

describe('kontrast elementów graficznych (co najmniej 3:1)', () => {
  it.each([
    ['seria: wartość nominalna', KOLORY.wykresNominalna],
    ['seria: wartość realna', KOLORY.wykresRealna],
    ['seria: suma wpłat', KOLORY.wykresWplaty],
  ])('%s na bieli', (_nazwa, hex) => {
    expect(kontrast(hex, KOLORY.biel)).toBeGreaterThanOrEqual(3);
  });
});
