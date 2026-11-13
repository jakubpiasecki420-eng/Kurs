/**
 * Rejestr narzędzi finansowych. Każde narzędzie — także planowane — ma opis, założenia,
 * źródła, datę aktualizacji i zastrzeżenie, zanim dostanie interfejs.
 */
import { twierdzenie } from '@/lib/rejestr';

export type StanNarzedzia = 'dostepne' | 'planowane' | 'po-recenzji';

export interface Narzedzie {
  id: string;
  nazwa: string;
  opis: string;
  stan: StanNarzedzia;
  /** Adres w strefie kursanta; tylko dla narzędzi dostępnych. */
  adres: string | null;
  /** Gdzie jest logika obliczeń (istniejąca albo planowana). */
  biblioteka: string;
  zalozenia: string[];
  /** Identyfikatory twierdzeń z rejestru, na których opiera się narzędzie. */
  zrodla: string[];
  /** Data ostatniej zmiany metody lub danych (ISO). */
  zaktualizowano: string;
  zastrzezenie: string;
  /** Dlaczego narzędzie nie jest jeszcze dostępne. */
  uwaga?: string;
}

const ZASTRZEZENIE =
  'Narzędzie edukacyjne. Wynik pokazuje skutki wpisanych założeń, nie jest prognozą, rekomendacją inwestycyjną ani poradą podatkową.';

export const NARZEDZIA: readonly Narzedzie[] = [
  {
    id: 'oszczedzanie',
    nazwa: 'Kalkulator regularnego oszczędzania',
    opis: 'Suma wpłat, wartość nominalna i wartość w dzisiejszych pieniądzach przy stałej miesięcznej wpłacie.',
    stan: 'dostepne',
    adres: '/platforma/narzedzia/oszczedzanie/',
    biblioteka: 'src/lib/kalkulator/oszczednosci.ts',
    zalozenia: [
      'Wpłata na koniec każdego miesiąca, stała nominalnie przez cały okres.',
      'Stała roczna stopa zwrotu i stała inflacja w każdym roku.',
      'Koszty liczone rocznie od zgromadzonych środków.',
      'Bez podatków i bez opłat jednorazowych.',
    ],
    zrodla: ['nbp-cel-inflacyjny'],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
  },
  {
    id: 'procent-skladany',
    nazwa: 'Kalkulator procentu składanego',
    opis: 'Wartość jednorazowej kwoty po latach przy stałej stopie.',
    stan: 'planowane',
    adres: null,
    biblioteka: 'src/lib/kalkulator/oszczednosci.ts (funkcja kapitalPoLatach)',
    zalozenia: ['Jednorazowa wpłata, stała roczna stopa, zysk pozostaje na koncie.'],
    zrodla: [],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
    uwaga: 'Obliczenia są gotowe i przetestowane; brakuje interfejsu.',
  },
  {
    id: 'inflacja',
    nazwa: 'Kalkulator inflacji',
    opis: 'Ile w przyszłości będzie kosztować dzisiejsza kwota i ile dzisiejszych pieniędzy jest warta kwota przyszła.',
    stan: 'planowane',
    adres: null,
    biblioteka: 'do przygotowania',
    zalozenia: ['Stała roczna inflacja przez cały okres.'],
    zrodla: ['nbp-cel-inflacyjny'],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
  },
  {
    id: 'ikze',
    nazwa: 'Kalkulator ulgi IKZE',
    opis: 'Kwota odliczenia, zmniejszenie podatku w roku wpłaty i podatek przy wypłacie dla wybranej formy opodatkowania.',
    stan: 'po-recenzji',
    adres: null,
    biblioteka: 'src/lib/kalkulator/ikze.ts',
    zalozenia: ['Wpłata do wysokości limitu właściwego dla podatnika i roku.', 'Stawka podatku podana przez użytkownika.'],
    zrodla: ['ikze-odliczenie-skala', 'ikze-odliczenie-liniowy', 'ikze-odliczenie-ryczalt', 'ikze-wyplata-podatek'],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
    uwaga: 'Biblioteka obliczeń istnieje; interfejs zostanie udostępniony po recenzji doradcy podatkowego.',
  },
  {
    id: 'ike-ikze',
    nazwa: 'Porównanie IKE i IKZE',
    opis: 'Zestawienie wartości końcowej obu kont przy tym samym koszcie netto.',
    stan: 'po-recenzji',
    adres: null,
    biblioteka: 'src/lib/kalkulator/ikze.ts (funkcja ikzeWzgledemIke)',
    zalozenia: ['Te same inwestycje i koszty na obu kontach.', 'Wypłata po spełnieniu warunków ustawowych.'],
    zrodla: ['ike-zwolnienie', 'ikze-wyplata-podatek'],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
    uwaga: 'Metoda porównania ma status założenia własnego i czeka na recenzję doradcy podatkowego.',
  },
  {
    id: 'symulator-emerytalny',
    nazwa: 'Symulator scenariuszy emerytalnych',
    opis: 'Zestawienie hipotetycznej emerytury z ZUS, własnych oszczędności i wydatków w kilku scenariuszach.',
    stan: 'planowane',
    adres: null,
    biblioteka: 'do zaprojektowania',
    zalozenia: ['Do ustalenia razem z metodą.'],
    zrodla: ['zus-hipotetyczna-warianty'],
    zaktualizowano: '2026-11-13',
    zastrzezenie: ZASTRZEZENIE,
  },
];

export const OPIS_STANU: Record<StanNarzedzia, string> = {
  dostepne: 'Dostępne',
  planowane: 'Planowane',
  'po-recenzji': 'Po recenzji podatkowej',
};

export function narzedzie(id: string): Narzedzie {
  const n = NARZEDZIA.find((x) => x.id === id);
  if (!n) throw new Error(`Brak narzędzia „${id}”.`);
  return n;
}

/** Źródła narzędzia — wyłącznie twierdzenia potwierdzone w źródłach pierwotnych. */
export function zrodlaNarzedzia(n: Narzedzie) {
  return n.zrodla.map((id) => {
    const t = twierdzenie(id);
    if (t.status !== 'P') throw new Error(`Narzędzie „${n.id}”: źródło „${id}” ma status ${t.status}.`);
    return t;
  });
}
