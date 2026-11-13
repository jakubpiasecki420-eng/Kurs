/**
 * Mechanika podatkowa IKZE — WYŁĄCZNIE BIBLIOTEKA, NIEPODŁĄCZONA DO INTERFEJSU.
 *
 * Wymaga recenzji doradcy podatkowego przed jakimkolwiek użyciem publicznym
 * (zob. docs/kwestie-do-weryfikacji.md, pytania DP-1 do DP-4).
 *
 * Podstawy prawne mechanizmu (rejestr twierdzeń):
 *  - odliczenie wpłat: ikze-odliczenie-skala, ikze-odliczenie-liniowy, ikze-odliczenie-ryczalt,
 *  - podatek przy wypłacie: ikze-wyplata-podatek.
 * Wnioski porównawcze mają status Z (z-ikze-wzgledem-ike).
 */

export interface DaneOdliczenia {
  /** Roczna wpłata na IKZE w złotych. */
  wplata: number;
  /** Limit wpłat właściwy dla podatnika i roku, z rejestru. */
  limit: number;
  /** Stawka, według której podatnik płaci podatek od odliczanej kwoty (ułamek). */
  stawka: number;
}

export interface WynikOdliczenia {
  /** Wpłata uwzględniona w odliczeniu — nie więcej niż limit. */
  kwotaOdliczenia: number;
  /** O tyle zmniejsza się podatek za rok wpłaty. */
  zmniejszeniePodatku: number;
}

export function odliczenie({ wplata, limit, stawka }: DaneOdliczenia): WynikOdliczenia {
  if (![wplata, limit, stawka].every(Number.isFinite)) throw new RangeError('Podaj liczby.');
  if (wplata < 0 || limit < 0) throw new RangeError('Wpłata i limit nie mogą być ujemne.');
  if (stawka < 0 || stawka >= 1) throw new RangeError('Stawka musi być ułamkiem z przedziału od 0 do 1.');
  const kwotaOdliczenia = Math.min(wplata, limit);
  return { kwotaOdliczenia, zmniejszeniePodatku: kwotaOdliczenia * stawka };
}

/**
 * Stosunek wartości końcowej IKZE do IKE przy tym samym koszcie netto z własnej kieszeni.
 * Założenia: te same inwestycje i koszty, wypłata po spełnieniu warunków, przepisy bez zmian,
 * ulga w całości zainwestowana.
 */
export function ikzeWzgledemIke(stawka: number, podatekPrzyWyplacie: number): number {
  if (stawka < 0 || stawka >= 1) throw new RangeError('Stawka musi być ułamkiem z przedziału od 0 do 1.');
  if (podatekPrzyWyplacie < 0 || podatekPrzyWyplacie >= 1) {
    throw new RangeError('Podatek przy wypłacie musi być ułamkiem z przedziału od 0 do 1.');
  }
  return (1 - podatekPrzyWyplacie) / (1 - stawka);
}
