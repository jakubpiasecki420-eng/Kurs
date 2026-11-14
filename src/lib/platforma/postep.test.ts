import { describe, expect, it } from 'vitest';
import { kursDlaKlienta, zbudujKurs } from './kurs';
import {
  cofnijUkonczenie,
  nastepnaLekcja,
  otworzLekcje,
  podsumowanie,
  pustyStan,
  statusModulu,
  ukonczLekcje,
  ustawNazwe,
  walidujStan,
  zapiszWynikQuizu,
} from './postep';
import { DANE_KURSU, LEKCJE } from './testowe';

const kurs = kursDlaKlienta(zbudujKurs(DANE_KURSU, LEKCJE));
const t = (n: number) => new Date(Date.UTC(2026, 10, 13, 10, n));

describe('statusy modułów', () => {
  it('na starcie: moduły bez wymagań dostępne, z wymaganiami niedostępne', () => {
    const s = pustyStan();
    expect(statusModulu(s, kurs, 'm1')).toBe('dostepny');
    expect(statusModulu(s, kurs, 'm2')).toBe('dostepny');
    expect(statusModulu(s, kurs, 'm3')).toBe('niedostepny');
  });

  it('otwarcie lekcji rozpoczyna moduł', () => {
    const s = otworzLekcje(pustyStan(), kurs, 'm1', 'a', t(0));
    expect(statusModulu(s, kurs, 'm1')).toBe('rozpoczety');
  });

  it('ukończenie wszystkich lekcji kończy moduł i odblokowuje zależny', () => {
    let s = ukonczLekcje(pustyStan(), kurs, 'm2', 'c', t(1));
    expect(statusModulu(s, kurs, 'm2')).toBe('ukonczony');
    expect(statusModulu(s, kurs, 'm3')).toBe('dostepny');
    expect(s.kursy.testowy.ukonczoneModuly.m2).toBe(t(1).toISOString());
    s = cofnijUkonczenie(s, kurs, 'm2', 'c');
    expect(statusModulu(s, kurs, 'm3')).toBe('niedostepny');
  });

  it('moduł bez lekcji jest niedostępny', () => {
    const pusty = { ...kurs, moduly: [{ ...kurs.moduly[0], lekcje: [] }] };
    expect(statusModulu(pustyStan(), pusty, 'm1')).toBe('niedostepny');
  });
});

describe('ukonczLekcje', () => {
  it('zapisuje datę i aktywność, nie dubluje przy ponownym wywołaniu', () => {
    const s1 = ukonczLekcje(pustyStan(), kurs, 'm1', 'a', t(2));
    const s2 = ukonczLekcje(s1, kurs, 'm1', 'a', t(3));
    expect(s2).toBe(s1);
    expect(s1.aktywnosci[0]).toMatchObject({ rodzaj: 'ukonczenie-lekcji', lekcja: 'a', opis: '1.1 Lekcja A' });
    expect(s1.ostatniaAktywnosc).toBe(t(2).toISOString());
  });

  it('nie zmienia stanu wejściowego', () => {
    const s0 = pustyStan();
    ukonczLekcje(s0, kurs, 'm1', 'a', t(0));
    expect(s0).toEqual(pustyStan());
  });

  it('odrzuca lekcję spoza kursu', () => {
    expect(() => ukonczLekcje(pustyStan(), kurs, 'm1', 'c', t(0))).toThrow(/nie zawiera lekcji/);
  });
});

describe('podsumowanie i kontynuacja', () => {
  it('liczy procent lekcji i moduły z lekcjami', () => {
    let s = ukonczLekcje(pustyStan(), kurs, 'm1', 'a', t(0));
    s = ukonczLekcje(s, kurs, 'm1', 'b', t(1));
    expect(podsumowanie(s, kurs)).toEqual({
      ukonczoneLekcje: 2,
      wszystkieLekcje: 4,
      ukonczoneModuly: 1,
      wszystkieModuly: 3,
      procent: 50,
    });
  });

  it('proponuje bieżącą lekcję, a po jej ukończeniu pierwszą nieukończoną w dostępnym module', () => {
    let s = otworzLekcje(pustyStan(), kurs, 'm1', 'b', t(0));
    expect(nastepnaLekcja(s, kurs)?.lekcja.id).toBe('b');
    s = ukonczLekcje(s, kurs, 'm1', 'b', t(1));
    expect(nastepnaLekcja(s, kurs)?.lekcja.id).toBe('a');
  });

  it('pomija moduł niedostępny i zwraca null po ukończeniu kursu', () => {
    let s = pustyStan();
    for (const [m, l] of [['m1', 'a'], ['m1', 'b']] as const) s = ukonczLekcje(s, kurs, m, l, t(0));
    expect(nastepnaLekcja(s, kurs)?.lekcja.id).toBe('c');
    for (const [m, l] of [['m2', 'c'], ['m3', 'd']] as const) s = ukonczLekcje(s, kurs, m, l, t(1));
    expect(nastepnaLekcja(s, kurs)).toBeNull();
  });
});

describe('otworzLekcje', () => {
  it('nie dubluje w historii kolejnych otwarć tej samej lekcji', () => {
    let s = otworzLekcje(pustyStan(), kurs, 'm1', 'a', t(0));
    s = otworzLekcje(s, kurs, 'm1', 'a', t(5));
    expect(s.aktywnosci).toHaveLength(1);
    expect(s.ostatniaAktywnosc).toBe(t(5).toISOString());
  });

  it('ogranicza historię do 30 wpisów', () => {
    let s = pustyStan();
    for (let i = 0; i < 40; i += 1) s = otworzLekcje(s, kurs, 'm1', i % 2 ? 'a' : 'b', t(i));
    expect(s.aktywnosci).toHaveLength(30);
  });
});

describe('zapiszWynikQuizu', () => {
  it('zapisuje ostatni wynik', () => {
    let s = zapiszWynikQuizu(pustyStan(), kurs, 'm1', 'a', 1, 3, t(0));
    s = zapiszWynikQuizu(s, kurs, 'm1', 'a', 3, 3, t(1));
    expect(s.kursy.testowy.wynikiQuizow.a).toEqual({ poprawne: 3, wszystkie: 3, data: t(1).toISOString() });
  });
  it('odrzuca nieprawidłowy wynik', () => {
    expect(() => zapiszWynikQuizu(pustyStan(), kurs, 'm1', 'a', 4, 3, t(0))).toThrow(RangeError);
    expect(() => zapiszWynikQuizu(pustyStan(), kurs, 'm1', 'a', 0, 0, t(0))).toThrow(RangeError);
  });
});

describe('walidujStan', () => {
  it('odtwarza poprawny stan bez zmian', () => {
    let s = ukonczLekcje(pustyStan(), kurs, 'm1', 'a', t(0));
    s = zapiszWynikQuizu(s, kurs, 'm1', 'a', 2, 3, t(1));
    s = ustawNazwe(s, 'Anna');
    expect(walidujStan(JSON.parse(JSON.stringify(s)))).toEqual(s);
  });

  it('dla śmieci i innej wersji zwraca pusty stan', () => {
    expect(walidujStan(null)).toEqual(pustyStan());
    expect(walidujStan('tekst')).toEqual(pustyStan());
    expect(walidujStan({ wersja: 99, kursy: {} })).toEqual(pustyStan());
  });

  it('pomija błędne pola, zachowując poprawne', () => {
    const s = walidujStan({
      wersja: 1,
      profil: { nazwa: 42 },
      kursy: {
        k: {
          ukonczoneLekcje: { a: '2026-11-13T10:00:00.000Z', b: 'nie-data' },
          wynikiQuizow: { a: { poprawne: 5, wszystkie: 3, data: '2026-11-13T10:00:00.000Z' } },
          biezaca: { modul: 1 },
        },
      },
      aktywnosci: [{ rodzaj: 'hakowanie', kurs: 'k', modul: 'm', opis: 'x', data: '2026-11-13' }],
    });
    expect(s.profil.nazwa).toBeNull();
    expect(s.kursy.k.ukonczoneLekcje).toEqual({ a: '2026-11-13T10:00:00.000Z' });
    expect(s.kursy.k.wynikiQuizow).toEqual({});
    expect(s.kursy.k.biezaca).toBeNull();
    expect(s.aktywnosci).toEqual([]);
  });
});

describe('ustawNazwe', () => {
  it('przycina, normalizuje odstępy i pusty tekst zamienia na brak nazwy', () => {
    expect(ustawNazwe(pustyStan(), '  Jan   Kowalski ').profil.nazwa).toBe('Jan Kowalski');
    expect(ustawNazwe(pustyStan(), '   ').profil.nazwa).toBeNull();
    expect(ustawNazwe(pustyStan(), 'x'.repeat(100)).profil.nazwa).toHaveLength(60);
  });
});

describe('wiele kursów', () => {
  // Drugi kurs o tych samych identyfikatorach modułów i lekcji — sprawdza, że postęp jest rozdzielony.
  const drugi = kursDlaKlienta(
    zbudujKurs(
      { ...DANE_KURSU, id: 'drugi-kurs', tytul: 'Drugi kurs testowy' },
      LEKCJE.map((l) => ({ ...l, kurs: 'drugi-kurs' })),
    ),
  );

  it('ukończenie lekcji w jednym kursie nie zmienia postępu w drugim', () => {
    const s = ukonczLekcje(pustyStan(), kurs, 'm1', 'a', t(0));
    expect(podsumowanie(s, kurs).ukonczoneLekcje).toBe(1);
    expect(podsumowanie(s, drugi).ukonczoneLekcje).toBe(0);
    expect(statusModulu(s, drugi, 'm1')).toBe('dostepny');
  });

  it('wyniki quizów i bieżąca lekcja są zapisywane osobno dla każdego kursu', () => {
    let s = zapiszWynikQuizu(pustyStan(), kurs, 'm1', 'a', 2, 3, t(1));
    s = otworzLekcje(s, drugi, 'm2', 'c', t(2));
    expect(s.kursy.testowy.wynikiQuizow.a).toMatchObject({ poprawne: 2, wszystkie: 3 });
    expect(s.kursy['drugi-kurs'].wynikiQuizow.a).toBeUndefined();
    expect(s.kursy.testowy.biezaca?.lekcja).not.toBe('c');
    expect(nastepnaLekcja(s, drugi)?.lekcja.id).toBe('c');
  });
});
