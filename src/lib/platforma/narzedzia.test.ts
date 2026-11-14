import { describe, expect, it } from 'vitest';
import { NARZEDZIA, narzedzie, zrodlaNarzedzia } from './narzedzia';

describe('rejestr narzędzi', () => {
  it('ma unikalne identyfikatory', () => {
    const ids = NARZEDZIA.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(NARZEDZIA.map((n) => [n.id, n] as const))('%s ma komplet informacji', (_id, n) => {
    expect(n.opis.length).toBeGreaterThan(20);
    expect(n.zalozenia.length).toBeGreaterThan(0);
    expect(n.zaktualizowano).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(n.zastrzezenie).toMatch(/nie jest prognozą/);
    expect(() => zrodlaNarzedzia(n)).not.toThrow();
    if (n.stan === 'dostepne') expect(n.adres).toMatch(/^\/platforma\/narzedzia\//);
    else {
      expect(n.adres).toBeNull();
    }
  });

  it('obejmuje narzędzia zapowiedziane w planie', () => {
    expect(NARZEDZIA.map((n) => n.id)).toEqual([
      'rezerwa',
      'oszczedzanie',
      'procent-skladany',
      'inflacja',
      'ikze',
      'ike-ikze',
      'symulator-emerytalny',
    ]);
  });

  it('kalkulator IKZE nie jest dostępny przed recenzją', () => {
    expect(narzedzie('ikze').stan).toBe('po-recenzji');
    expect(narzedzie('ike-ikze').stan).toBe('po-recenzji');
  });
});
