import { describe, expect, it } from 'vitest';
import { kursDlaKlienta, lacznyCzas, lekcjeKursu, sasiedzi, zbudujKurs } from './kurs';
import { DANE_KURSU, LEKCJE } from './testowe';

describe('zbudujKurs', () => {
  const kurs = zbudujKurs(DANE_KURSU, LEKCJE);

  it('zachowuje kolejność programu, numeruje lekcje i tworzy adresy', () => {
    expect(kurs.moduly.map((m) => m.id)).toEqual(['m1', 'm2', 'm3']);
    expect(lekcjeKursu(kurs).map((l) => l.numer)).toEqual(['1.1', '1.2', '2.1', '3.1']);
    expect(kurs.moduly[0].lekcje[1].adres).toBe('/platforma/kurs/testowy/m1/b/');
    expect(kurs.moduly[2].adres).toBe('/platforma/kurs/testowy/m3/');
  });

  it('sumuje czas lekcji', () => {
    expect(lacznyCzas(kurs)).toBe(19);
  });

  it('odrzuca brakującą lekcję', () => {
    expect(() => zbudujKurs(DANE_KURSU, LEKCJE.slice(0, 3))).toThrow(/brak pliku lekcji „d”/);
  });

  it('odrzuca lekcję przypisaną do innego modułu', () => {
    const lekcje = LEKCJE.map((l) => (l.id === 'c' ? { ...l, modul: 'm1' } : l));
    expect(() => zbudujKurs(DANE_KURSU, lekcje)).toThrow(/deklaruje moduł/);
  });

  it('odrzuca lekcje spoza programu', () => {
    const lekcje = [...LEKCJE, { ...LEKCJE[0], id: 'zbedna' }];
    expect(() => zbudujKurs(DANE_KURSU, lekcje)).toThrow(/spoza programu: zbedna/);
  });

  it('odrzuca wymaganie modułu, który nie występuje wcześniej', () => {
    const dane = { ...DANE_KURSU, moduly: [{ ...DANE_KURSU.moduly[0], wymaga: ['m3'] }, ...DANE_KURSU.moduly.slice(1)] };
    expect(() => zbudujKurs(dane, LEKCJE)).toThrow(/wymaga „m3”/);
  });
});

describe('sasiedzi', () => {
  const kurs = zbudujKurs(DANE_KURSU, LEKCJE);
  it('przechodzi przez granice modułów', () => {
    const s = sasiedzi(kurs, 'b');
    expect(s.poprzednia?.id).toBe('a');
    expect(s.nastepna?.id).toBe('c');
    expect(s.nastepna?.modul.id).toBe('m2');
    expect(s.pozycja).toBe(2);
    expect(s.wszystkie).toBe(4);
  });
  it('na końcach zwraca null', () => {
    expect(sasiedzi(kurs, 'a').poprzednia).toBeNull();
    expect(sasiedzi(kurs, 'd').nastepna).toBeNull();
  });
});

describe('kursDlaKlienta', () => {
  it('nie przenosi opisów lekcji, tylko strukturę', () => {
    const k = kursDlaKlienta(zbudujKurs(DANE_KURSU, LEKCJE));
    expect(Object.keys(k.moduly[0].lekcje[0]).sort()).toEqual(['adres', 'id', 'numer', 'tytul']);
  });
});
