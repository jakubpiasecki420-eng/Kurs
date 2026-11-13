import konfiguracja from '@/config/serwis.json';

export interface RecenzjaEksperta {
  kto: string;
  numerWpisu: string;
  data: string;
  zakres: string;
}

export interface Serwis {
  marka: string;
  haslo: string;
  opis: string;
  produkt: { nazwa: string; podtytul: string; status: string; wersja: string };
  operator: {
    nazwa: string | null;
    formaPrawna: string | null;
    nip: string | null;
    adres: string | null;
  };
  kontakt: { email: string | null };
  publikacja: {
    indeksowanie: boolean;
    recenzjaEksperta: RecenzjaEksperta | null;
    politykaPrywatnosci: boolean;
    regulamin: boolean;
    opiniaPrawna: boolean;
  };
  zapis: { aktywny: boolean; adresFormularza: string | null; nazwaPolaEmail: string };
}

export const SERWIS = konfiguracja as Serwis;

/** Materiały nie przeszły jeszcze recenzji doradcy podatkowego. */
export const PRZED_RECENZJA = SERWIS.publikacja.recenzjaEksperta === null;

/** Wyszukiwarki mogą indeksować serwis dopiero po recenzji i świadomej decyzji właściciela. */
export const INDEKSOWANIE = SERWIS.publikacja.indeksowanie && !PRZED_RECENZJA;

/** Formularz zapisu wolno pokazać tylko z polityką prywatności i skonfigurowanym adresem. */
export const ZAPIS_DOSTEPNY =
  SERWIS.zapis.aktywny && Boolean(SERWIS.zapis.adresFormularza) && SERWIS.publikacja.politykaPrywatnosci;

export const NAWIGACJA = [
  { adres: '/program/', etykieta: 'Program' },
  { adres: '/jak-uczymy/', etykieta: 'Jak uczymy' },
  { adres: '/biblioteka/', etykieta: 'Biblioteka' },
  { adres: '/kalkulator/', etykieta: 'Kalkulator' },
  { adres: '/zrodla/', etykieta: 'Źródła' },
] as const;

/** Darmowe materiały — stopka i biblioteka. */
export const NAWIGACJA_WIEDZY = [
  { adres: '/ike/', etykieta: 'IKE' },
  { adres: '/ikze/', etykieta: 'IKZE' },
  { adres: '/oki/', etykieta: 'OKI' },
  { adres: '/jdg-b2b/', etykieta: 'JDG i B2B' },
  { adres: '/artykuly/', etykieta: 'Artykuły' },
  { adres: '/kalkulator/', etykieta: 'Kalkulator' },
] as const;

export const NAWIGACJA_STOPKI = [
  { adres: '/program/', etykieta: 'Program' },
  { adres: '/jak-uczymy/', etykieta: 'Jak uczymy' },
  { adres: '/platforma/', etykieta: 'Strefa kursanta' },
  { adres: '/o-projekcie/', etykieta: 'O projekcie' },
  { adres: '/zrodla/', etykieta: 'Źródła i metodologia' },
  { adres: '/kontakt/', etykieta: 'Kontakt' },
] as const;
