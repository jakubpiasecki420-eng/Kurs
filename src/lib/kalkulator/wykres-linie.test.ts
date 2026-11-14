import { describe, expect, it } from 'vitest';
import { rysujLinie } from './wykres-linie';

const serie = [
  { nazwa: 'A', krotko: 'a', kolor: 'red', wartosci: [100, 110, 121] },
  { nazwa: 'B <b>', krotko: 'b & c', kolor: 'blue', wartosci: [100, 105, 110], przerywana: true },
];

describe('rysujLinie', () => {
  it('buduje dostępny SVG z unikalnymi identyfikatorami', () => {
    const svg = rysujLinie({ serie, szerokosc: 640, prefiks: 'test', tytul: 'Tytuł', opis: 'Opis <x>' });
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-labelledby="test-tytul test-opis"');
    expect(svg).toContain('<desc id="test-opis">Opis &lt;x&gt;</desc>');
    expect(svg).toContain('stroke-dasharray');
    expect(svg).toContain('b &amp; c');
    expect(svg).not.toContain('NaN');
    expect((svg.match(/<path /g) ?? []).length).toBe(2);
  });
  it('na wąskim ekranie pomija etykiety końcowe', () => {
    const svg = rysujLinie({ serie, szerokosc: 320, prefiks: 't', tytul: 'T', opis: 'O' });
    expect(svg).not.toContain('wykres__etykieta');
  });
  it('odrzuca dane bez przebiegu albo z NaN', () => {
    expect(() =>
      rysujLinie({ serie: [{ ...serie[0], wartosci: [1] }], szerokosc: 640, prefiks: 't', tytul: 'T', opis: 'O' }),
    ).toThrow(RangeError);
    expect(() =>
      rysujLinie({ serie: [{ ...serie[0], wartosci: [1, Number.NaN] }], szerokosc: 640, prefiks: 't', tytul: 'T', opis: 'O' }),
    ).toThrow(RangeError);
  });
});
