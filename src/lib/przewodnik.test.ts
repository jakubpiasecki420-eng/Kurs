import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { czytajMetadane, przygotujRozdzial } from './przewodnik';
import { kapitalPoLatach } from './kalkulator/oszczednosci';

const naglowek = (twierdzenia: string[], blokady: string[] = []) =>
  [
    '---',
    "numer: 4",
    "tytul: 'IKE'",
    "cel: 'Czytelnik zna zasady IKE.'",
    'stanNaDzien: 2026-11-13',
    `twierdzenia: [${twierdzenia.join(', ')}]`,
    `blokady: [${blokady.join(', ')}]`,
    'status: szkic # komentarz',
    '---',
    '',
  ].join('\n');

describe('czytajMetadane', () => {
  it('odczytuje pola, listy i pomija komentarze', () => {
    const { metadane, tresc } = czytajMetadane(`${naglowek(['ike-limit-2027'])}Treść`);
    expect(metadane.numer).toBe('4');
    expect(metadane.tytul).toBe('IKE');
    expect(metadane.twierdzenia).toEqual(['ike-limit-2027']);
    expect(metadane.blokady).toEqual([]);
    expect(metadane.status).toBe('szkic');
    expect(tresc).toBe('Treść');
  });

  it('wymaga nagłówka', () => {
    expect(() => czytajMetadane('# Bez nagłówka')).toThrow(/nagłówka/);
  });
});

describe('przygotujRozdzial', () => {
  it('podstawia wartości z rejestru w polskim zapisie', () => {
    const r = przygotujRozdzial(`${naglowek(['ike-limit-2027', 'ike-zwrot-podatek'])}Limit: {{ike-limit-2027}}, podatek {{ike-zwrot-podatek}}.`);
    expect(r.markdown.replace(/ /g, ' ')).toBe('Limit: 30 099 zł, podatek 19%.');
  });

  it('numeruje przypisy w kolejności pierwszego użycia i nie dubluje ich', () => {
    const r = przygotujRozdzial(
      `${naglowek(['ike-limit-2027', 'ike-wiek-wplat'])}A[^ike-wiek-wplat] B[^ike-limit-2027] C[^ike-wiek-wplat]`,
    );
    expect(r.markdown).toBe('A<sup class="odn">1</sup> B<sup class="odn">2</sup> C<sup class="odn">1</sup>');
    expect(r.przypisy.map((p) => p.twierdzenie.id)).toEqual(['ike-wiek-wplat', 'ike-limit-2027']);
    expect(r.przypisy[0].zrodlo.publikator).toContain('Dz.U.');
  });

  it('wymaga deklaracji każdego użytego twierdzenia', () => {
    expect(() => przygotujRozdzial(`${naglowek([])}{{ike-limit-2027}}`)).toThrow(/nie jest zadeklarowane/);
  });

  it('odmawia twierdzeń spoza źródeł pierwotnych', () => {
    expect(() => przygotujRozdzial(`${naglowek(['rynek-ppk'])}Tekst`)).toThrow(/status W/);
    expect(() => przygotujRozdzial(`${naglowek(['z-ikze-wzgledem-ike'])}Tekst`)).toThrow(/status Z/);
  });

  it('odmawia składu rozdziału z blokadami', () => {
    expect(() => przygotujRozdzial(`${naglowek([], ['DP-1'])}Tekst`)).toThrow(/blokady/);
  });
});

describe('rozdziały przewodnika', () => {
  const katalog = new URL('../../produkt/przewodnik/rozdzialy/', import.meta.url);
  const pliki = readdirSync(katalog).filter((p) => p.endsWith('.md'));

  it('istnieją', () => {
    expect(pliki.length).toBeGreaterThan(0);
  });

  it.each(pliki)('%s używa wyłącznie zadeklarowanych twierdzeń ze statusem P', (plik) => {
    const r = przygotujRozdzial(readFileSync(new URL(plik, katalog), 'utf8'));
    expect(r.markdown).not.toMatch(/\{\{|\[\^/);
  });
});

describe('kapitalPoLatach', () => {
  it('liczy procent składany', () => {
    expect(kapitalPoLatach(10_000, 0.05, 10)).toBeCloseTo(16_288.95, 2);
    expect(kapitalPoLatach(10_000, 0, 30)).toBe(10_000);
  });
  it('odrzuca niepoprawne dane', () => {
    expect(() => kapitalPoLatach(100, -1, 5)).toThrow(RangeError);
  });
});
