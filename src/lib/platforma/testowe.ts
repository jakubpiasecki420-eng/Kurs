/** Dane testowe wspólne dla testów platformy. Nie są używane przez strony. */
import type { DaneKursu, DaneLekcji } from './model';

export const DANE_KURSU: DaneKursu = {
  id: 'testowy',
  tytul: 'Kurs testowy',
  opis: 'Opis',
  stan: 'aktywny',
  demonstracyjny: true,
  moduly: [
    { id: 'm1', tytul: 'Moduł 1', opis: 'A', wymaga: [], lekcje: ['a', 'b'] },
    { id: 'm2', tytul: 'Moduł 2', opis: 'B', wymaga: [], lekcje: ['c'] },
    { id: 'm3', tytul: 'Moduł 3', opis: 'C', wymaga: ['m2'], lekcje: ['d'] },
  ],
};

export const LEKCJE: DaneLekcji[] = [
  { id: 'a', kurs: 'testowy', modul: 'm1', tytul: 'Lekcja A', opis: '', czasMin: 5, demonstracyjna: true },
  { id: 'b', kurs: 'testowy', modul: 'm1', tytul: 'Lekcja B', opis: '', czasMin: 7, demonstracyjna: true },
  { id: 'c', kurs: 'testowy', modul: 'm2', tytul: 'Lekcja C', opis: '', czasMin: 3, demonstracyjna: true },
  { id: 'd', kurs: 'testowy', modul: 'm3', tytul: 'Lekcja D', opis: '', czasMin: 4, demonstracyjna: true },
];
