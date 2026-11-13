/**
 * Paleta marki. Te same wartości są zapisane w src/styles/tokeny.css;
 * test kolory.test.ts pilnuje zgodności obu plików i kontrastu.
 */
export const KOLORY = {
  granat: '#101D35',
  granatGleboki: '#0A1426',
  lupek: '#26364B',
  tekstCichy: '#4A5870',
  zloto: '#D5B875',
  zlotoCiemne: '#75581A',
  tlo: '#F5F6F8',
  biel: '#FFFFFF',
  linia: '#D6DBE4',
  liniaCiemna: '#2E3F5C',
  blad: '#A32018',
  // Serie wykresu w stałej kolejności: nominalna, realna, wpłaty.
  // Zestaw przeszedł walidację rozróżnialności (także dla daltonizmu) na białym tle.
  wykresNominalna: '#2F5DA8',
  wykresRealna: '#B07F1E',
  wykresWplaty: '#1F8A70',
} as const;
