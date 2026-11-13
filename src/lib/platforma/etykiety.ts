import type { StatusModulu } from './model';

/** Etykiety statusów — wspólne dla stron i skryptów w przeglądarce. */
export const ETYKIETY_STATUSU: Record<StatusModulu, string> = {
  niedostepny: 'Niedostępny',
  dostepny: 'Dostępny',
  rozpoczety: 'Rozpoczęty',
  ukonczony: 'Ukończony',
};
