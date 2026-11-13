import {
  adresKursu,
  adresLekcji,
  adresModulu,
  type DaneKursu,
  type DaneLekcji,
  type Kurs,
  type Lekcja,
  type Modul,
} from './model';

/**
 * Składa kurs z pliku kursu i metadanych lekcji. Rzuca błąd przy niespójności,
 * żeby błędny program kursu zatrzymał budowanie strony, zamiast trafić do kursanta.
 */
export function zbudujKurs(dane: DaneKursu, lekcje: DaneLekcji[]): Kurs {
  const doKursu = lekcje.filter((l) => l.kurs === dane.id);
  const indeks = new Map(doKursu.map((l) => [l.id, l]));
  const idModulow = new Set<string>();
  const uzyte = new Set<string>();

  const moduly: Modul[] = dane.moduly.map((m, i) => {
    if (idModulow.has(m.id)) throw new Error(`Kurs „${dane.id}”: powtórzony moduł „${m.id}”.`);
    idModulow.add(m.id);
    m.wymaga.forEach((w) => {
      if (!idModulow.has(w)) {
        throw new Error(`Kurs „${dane.id}”: moduł „${m.id}” wymaga „${w}”, który nie występuje wcześniej w programie.`);
      }
    });
    const lista: Lekcja[] = m.lekcje.map((idLekcji, j) => {
      const l = indeks.get(idLekcji);
      if (!l) throw new Error(`Kurs „${dane.id}”: brak pliku lekcji „${idLekcji}”.`);
      if (l.modul !== m.id) {
        throw new Error(`Lekcja „${idLekcji}” deklaruje moduł „${l.modul}”, a program umieszcza ją w „${m.id}”.`);
      }
      if (uzyte.has(idLekcji)) throw new Error(`Kurs „${dane.id}”: lekcja „${idLekcji}” występuje dwa razy.`);
      uzyte.add(idLekcji);
      return {
        id: l.id,
        tytul: l.tytul,
        opis: l.opis,
        czasMin: l.czasMin,
        demonstracyjna: l.demonstracyjna,
        numer: `${i + 1}.${j + 1}`,
        adres: adresLekcji(dane.id, m.id, l.id),
      };
    });
    return { id: m.id, numer: i + 1, tytul: m.tytul, opis: m.opis, wymaga: m.wymaga, lekcje: lista, adres: adresModulu(dane.id, m.id) };
  });

  const sieroty = doKursu.filter((l) => !uzyte.has(l.id)).map((l) => l.id);
  if (sieroty.length) throw new Error(`Kurs „${dane.id}”: lekcje spoza programu: ${sieroty.join(', ')}.`);

  return {
    id: dane.id,
    tytul: dane.tytul,
    opis: dane.opis,
    stan: dane.stan,
    demonstracyjny: dane.demonstracyjny,
    moduly,
    adres: adresKursu(dane.id),
  };
}

/** Wszystkie lekcje kursu w kolejności programu. */
export function lekcjeKursu(kurs: Kurs): Array<Lekcja & { modul: Modul }> {
  return kurs.moduly.flatMap((modul) => modul.lekcje.map((l) => ({ ...l, modul })));
}

/** Poprzednia i następna lekcja względem wskazanej — także przez granice modułów. */
export function sasiedzi(kurs: Kurs, idLekcji: string) {
  const lista = lekcjeKursu(kurs);
  const i = lista.findIndex((l) => l.id === idLekcji);
  if (i < 0) throw new Error(`Kurs „${kurs.id}” nie zawiera lekcji „${idLekcji}”.`);
  return { poprzednia: lista[i - 1] ?? null, nastepna: lista[i + 1] ?? null, pozycja: i + 1, wszystkie: lista.length };
}

export function lacznyCzas(kurs: Kurs): number {
  return lekcjeKursu(kurs).reduce((s, l) => s + l.czasMin, 0);
}

/** Struktura przekazywana skryptom w przeglądarce — bez treści lekcji. */
export interface KursKlienta {
  id: string;
  moduly: Array<{ id: string; tytul: string; wymaga: string[]; adres: string; lekcje: Array<{ id: string; tytul: string; numer: string; adres: string }> }>;
}

export function kursDlaKlienta(kurs: Kurs): KursKlienta {
  return {
    id: kurs.id,
    moduly: kurs.moduly.map((m) => ({
      id: m.id,
      tytul: m.tytul,
      wymaga: m.wymaga,
      adres: m.adres,
      lekcje: m.lekcje.map((l) => ({ id: l.id, tytul: l.tytul, numer: l.numer, adres: l.adres })),
    })),
  };
}
