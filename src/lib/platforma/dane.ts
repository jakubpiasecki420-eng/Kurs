/**
 * Dostęp do kursów i lekcji z kolekcji treści Astro. Używany wyłącznie przy budowaniu stron.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { zbudujKurs } from './kurs';
import type { DaneLekcji, Kurs } from './model';

export type WpisLekcji = CollectionEntry<'lekcje'>;

/** „kurs-demonstracyjny/jak-zbudowana-jest-lekcja” → „jak-zbudowana-jest-lekcja”. */
function slugLekcji(wpis: WpisLekcji): string {
  const czesci = wpis.id.split('/');
  if (czesci.length !== 2 || czesci[0] !== wpis.data.kurs) {
    throw new Error(`Lekcja „${wpis.id}” musi leżeć w katalogu swojego kursu: src/content/lekcje/${wpis.data.kurs}/.`);
  }
  return czesci[1];
}

export async function wszystkieLekcje(): Promise<Array<{ wpis: WpisLekcji; dane: DaneLekcji }>> {
  return (await getCollection('lekcje')).map((wpis) => ({
    wpis,
    dane: {
      id: slugLekcji(wpis),
      kurs: wpis.data.kurs,
      modul: wpis.data.modul,
      tytul: wpis.data.tytul,
      opis: wpis.data.opis,
      czasMin: wpis.data.czasMin,
      demonstracyjna: wpis.data.demonstracyjna,
    },
  }));
}

export async function wszystkieKursy(): Promise<Kurs[]> {
  const [kursy, lekcje] = await Promise.all([getCollection('kursy'), wszystkieLekcje()]);
  const dane = lekcje.map((l) => l.dane);
  return kursy.map((k) => zbudujKurs({ id: k.id, ...k.data }, dane));
}

/**
 * Kurs wyróżniony w menu „Mój kurs”, na pulpicie i na stronie /program/.
 * Pozostałe kursy są dostępne w katalogu /platforma/kursy/ (zob. docs/architektura-wielokursowa.md).
 */
export const ID_KURSU_AKTYWNEGO = 'emerytura-pod-kontrola';

/** Wszystkie kursy w kolejności katalogu: najpierw kursy właściwe, kurs demonstracyjny na końcu. */
export async function kursyWKolejnosci(): Promise<Kurs[]> {
  return (await wszystkieKursy()).sort(
    (a, b) => Number(a.demonstracyjny) - Number(b.demonstracyjny) || a.kolejnosc - b.kolejnosc || a.tytul.localeCompare(b.tytul, 'pl'),
  );
}

export async function kurs(id: string): Promise<Kurs> {
  const k = (await wszystkieKursy()).find((x) => x.id === id);
  if (!k) throw new Error(`Brak kursu „${id}”.`);
  return k;
}
