/**
 * Przykłady obliczeniowe wstawiane do lekcji i do przewodnika PDF dyrektywą `<!-- nazwa -->`.
 *
 * Jedno źródło dla obu formatów: zmiana stawki w rejestrze aktualizuje przykłady wszędzie.
 * Moduł nie używa aliasów ścieżek, bo ładuje go także konfiguracja Astro (wtyczka Markdown).
 */
import dane from '../data/rejestr.json';
import { kapitalPoLatach, symuluj } from './kalkulator/oszczednosci';
import { stopaRealna } from './kalkulator/proste';
import { rysujWykres, SERIE } from './kalkulator/wykres';
import { lata, procent, zl, zlPelne } from './format';

interface TwierdzenieRejestru {
  id: string;
  status: string;
  wartosc?: number;
}

/** Wartość twierdzenia ze statusem P — przykłady nie mogą opierać się na niczym innym. */
export function wartoscP(id: string): number {
  const t = (dane.twierdzenia as TwierdzenieRejestru[]).find((x) => x.id === id);
  if (!t) throw new Error(`Przykłady: brak twierdzenia „${id}”.`);
  if (t.status !== 'P') throw new Error(`Przykłady: twierdzenie „${id}” ma status ${t.status}.`);
  if (typeof t.wartosc !== 'number') throw new Error(`Przykłady: twierdzenie „${id}” nie ma wartości.`);
  return t.wartosc;
}

export const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Tabela z podpisem. `kolumnyLiczbowe` — indeksy kolumn wyrównanych do prawej. */
function tabela(tytul: string, naglowki: string[], wiersze: string[][], podpis: string, kolumnyLiczbowe: number[]): string {
  const l = (i: number) => (kolumnyLiczbowe.includes(i) ? ' class="liczba l"' : '');
  const th = naglowki.map((n, i) => `<th scope="col"${l(i)}>${n}</th>`).join('');
  const tr = wiersze
    .map((w) => `<tr>${w.map((k, i) => (i === 0 ? `<th scope="row">${k}</th>` : `<td${l(i)}>${k}</td>`)).join('')}</tr>`)
    .join('');
  return (
    `<figure class="przyklad">` +
    `<div class="tabela-przewijana" tabindex="0" role="region" aria-label="${esc(tytul)}">` +
    `<table><caption class="wizualnie-ukryte">${esc(tytul)}</caption><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>` +
    `</div><figcaption>${podpis}</figcaption></figure>`
  );
}

export const WPLATA = 500;
export const STOPA_PRZYKLADOWA = 0.05;
const NIE_PROGNOZA = 'Przykład obliczeniowy, nie prognoza.';

export const DYREKTYWY: Record<string, () => string> = {
  'przyklad:zwrot-ike': () => {
    const wplaty = 40_000;
    const wartoscSrodkow = 50_000;
    const stawka = wartoscP('ike-zwrot-podatek');
    const dochod = wartoscSrodkow - wplaty;
    const podatek = dochod * stawka;
    return tabela(
      'Przykład: zwrot całkowity z IKE',
      ['Pozycja', 'Kwota'],
      [
        ['Suma Twoich wpłat', zl(wplaty)],
        ['Wartość środków w dniu zwrotu', zl(wartoscSrodkow)],
        ['Dochód', zl(dochod)],
        [`Podatek ${procent(stawka)} od dochodu`, zl(podatek)],
        ['Otrzymujesz', zl(wartoscSrodkow - podatek)],
      ],
      'Przykład obliczeniowy dla zwrotu całkowitego, który nie był poprzedzony zwrotami częściowymi. Gdyby wypłata nastąpiła po spełnieniu warunków ustawy, podatku by nie było.',
      [1],
    );
  },

  'przyklad:czesciowy-zwrot-ike': () => {
    const wplaty = 40_000;
    const wartoscSrodkow = 50_000;
    const kwotaZwrotu = 10_000;
    const stawka = wartoscP('ike-zwrot-podatek');
    const koszt = kwotaZwrotu * (wplaty / wartoscSrodkow);
    const dochod = kwotaZwrotu - koszt;
    const podatek = dochod * stawka;
    return tabela(
      'Przykład: częściowy zwrot z IKE',
      ['Pozycja', 'Kwota'],
      [
        ['Suma Twoich wpłat', zl(wplaty)],
        ['Wartość środków w dniu zwrotu', zl(wartoscSrodkow)],
        ['Kwota częściowego zwrotu', zl(kwotaZwrotu)],
        [`Przypadająca na zwrot część wpłat: ${zl(kwotaZwrotu)} × ${zl(wplaty)} ÷ ${zl(wartoscSrodkow)}`, zl(koszt)],
        ['Dochód', zl(dochod)],
        [`Podatek ${procent(stawka)} od dochodu`, zl(podatek)],
        ['Otrzymujesz', zl(kwotaZwrotu - podatek)],
      ],
      `Przykład obliczeniowy według zasady proporcji dla częściowego zwrotu. Na koncie zostaje ${zl(wartoscSrodkow - kwotaZwrotu)}; nie uwzględniamy opłat instytucji.`,
      [1],
    );
  },

  'przyklad:skladka-emerytalna': () => {
    const stawka = wartoscP('sus-skladka-emerytalna');
    const gr = (x: number) => zl(x, { grosze: true });
    const wiersze = [1000, 2000, 5000].map((podstawa) => [
      `${zl(podstawa)} więcej`,
      gr(podstawa * stawka),
      gr(podstawa * stawka * 12),
    ]);
    return tabela(
      'Ile składki emerytalnej dodaje wyższa podstawa',
      ['Podstawa wymiaru składek', 'Składka emerytalna miesięcznie', 'Składka emerytalna w roku'],
      wiersze,
      `Składka emerytalna to ${procent(stawka)} podstawy wymiaru. Tabela pokazuje tylko składkę emerytalną. Od tej samej podstawy liczy się też składki rentowe, wypadkową i — jeśli ją opłacasz — chorobową, więc całkowity koszt wyższej podstawy jest większy. Przykład obliczeniowy, nie prognoza wysokości emerytury.`,
      [1, 2],
    );
  },

  'tabela:stopa-realna': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    const wiersze = [0, i, STOPA_PRZYKLADOWA].map((r) => [
      procent(r),
      procent(i),
      procent(r - i, 2),
      procent(stopaRealna(r, i), 2),
    ]);
    return tabela(
      'Stopa nominalna, inflacja i stopa realna',
      ['Roczny zysk nominalny', 'Inflacja', 'Przybliżenie: zysk minus inflacja', 'Stopa realna: (1 + zysk) ÷ (1 + inflacja) − 1'],
      wiersze,
      `Założenie: inflacja ${procent(i)} rocznie, równa celowi NBP. Zysk ${procent(STOPA_PRZYKLADOWA)} to wariant hipotetyczny, nie prognoza. Przykład obliczeniowy.`,
      [0, 1, 2, 3],
    );
  },

  'tabela:zmiennosc': () => {
    const start = 10_000;
    const scenariusze: [string, number[]][] = [
      ['Co roku +5%', [0.05, 0.05]],
      ['Na zmianę +20% i −10%', [0.2, -0.1]],
      ['Na zmianę +35% i −25%', [0.35, -0.25]],
    ];
    const wiersze = scenariusze.map(([nazwa, [a, b]]) => {
      const mnoznik2 = (1 + a) * (1 + b);
      const wartosc = start * Math.pow(mnoznik2, 5);
      const srednia = (a + b) / 2;
      const faktyczna = Math.sqrt(mnoznik2) - 1;
      return [nazwa, procent(srednia, 2), procent(faktyczna, 2), zlPelne(wartosc)];
    });
    return tabela(
      'Ta sama średnia, różna zmienność',
      ['Scenariusz (10 lat)', 'Średnia z rocznych wyników', 'Faktyczny średni wzrost rocznie', `Wartość ${zl(start)} po 10 latach`],
      wiersze,
      `Dane umowne, nie dotyczą żadnego instrumentu. Bez kosztów i podatków. Przykład obliczeniowy, nie prognoza: pokazuje, że przy tej samej średniej większe wahania obniżają wynik.`,
      [1, 2, 3],
    );
  },

  'tabela:dywersyfikacja': () => {
    const start = 10_000;
    const x = [0.15, -0.1, 0.1];
    const y = [-0.05, 0.12, 0.03];
    const mix = x.map((v, i) => (v + y[i]) / 2);
    const koniec = (r: number[]) => start * r.reduce((m, v) => m * (1 + v), 1);
    const wiersz = (nazwa: string, r: number[]) => [nazwa, ...r.map((v) => procent(v, 1)), procent(Math.min(...r), 1), zlPelne(koniec(r))];
    return tabela(
      'Dywersyfikacja na danych umownych',
      ['Portfel', 'Rok 1', 'Rok 2', 'Rok 3', 'Najgorszy rok', `Wartość ${zl(start)} po 3 latach`],
      [wiersz('Tylko aktywo X', x), wiersz('Tylko aktywo Y', y), wiersz('Po połowie X i Y, wyrównywane co roku', mix)],
      `Aktywa X i Y są umowne — wyniki wymyślone do ilustracji, nie dotyczą żadnych instrumentów. Bez kosztów i podatków. Przykład obliczeniowy, nie prognoza.`,
      [1, 2, 3, 4, 5],
    );
  },

  'tabela:oplaty': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    const baza = { lata: 20, stopaZwrotu: STOPA_PRZYKLADOWA, inflacja: i };
    const bez = symuluj({ ...baza, wplataMiesieczna: WPLATA, koszty: 0 }).wartoscNominalna;
    const warianty: [string, number][] = [
      ['Bez opłat', bez],
      ['2% od każdej wpłaty', symuluj({ ...baza, wplataMiesieczna: WPLATA * 0.98, koszty: 0 }).wartoscNominalna],
      ['0,5% rocznie od zgromadzonych środków', symuluj({ ...baza, wplataMiesieczna: WPLATA, koszty: 0.005 }).wartoscNominalna],
      ['1% rocznie od zgromadzonych środków', symuluj({ ...baza, wplataMiesieczna: WPLATA, koszty: 0.01 }).wartoscNominalna],
    ];
    return tabela(
      'Opłata od wpłat a opłata roczna',
      ['Rodzaj opłaty', 'Wartość nominalna po 20 latach', 'Mniej niż bez opłat'],
      warianty.map(([n, v]) => [n, zlPelne(v), v === bez ? '—' : zlPelne(bez - v)]),
      `Założenia: ${zl(WPLATA)} miesięcznie przez 20 lat, zysk ${procent(STOPA_PRZYKLADOWA)} rocznie przed opłatami (wariant hipotetyczny), bez podatków. Wysokości opłat są przykładowe. Przykład obliczeniowy, nie prognoza.`,
      [1, 2],
    );
  },

  'tabela:dlug-a-oszczednosci': () => {
    const kwota = 10_000;
    const oprocentowanie = 0.12;
    const zysk = STOPA_PRZYKLADOWA;
    return tabela(
      'Koszt długu a zysk z oszczędności',
      ['Pozycja (pierwszy rok, ta sama kwota)', 'Kwota'],
      [
        [`Odsetki od długu ${zl(kwota)} oprocentowanego ${procent(oprocentowanie)} rocznie`, zl(kwota * oprocentowanie)],
        [`Zysk z oszczędności ${zl(kwota)} przy ${procent(zysk)} rocznie`, zl(kwota * zysk)],
        ['Różnica na niekorzyść, gdy dług zostaje, a oszczędności rosną', zl(kwota * (oprocentowanie - zysk))],
      ],
      `Liczby umowne: oprocentowanie długu i zysk z oszczędności są przykładowe. Uproszczenie bez podatków, kosztów i spłat w trakcie roku. Przykład obliczeniowy, nie prognoza.`,
      [1],
    );
  },

  'tabela:inflacja': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    return tabela(
      `Jak inflacja zmienia wartość ${zl(1000)}`,
      ['Po ilu latach', `Tyle kosztuje to, co dziś kosztuje ${zl(1000)}`, `Tyle w dzisiejszych pieniądzach jest warte ${zl(1000)}`],
      [10, 20, 30].map((n) => [lata(n), zlPelne(1000 * Math.pow(1 + i, n)), zlPelne(1000 / Math.pow(1 + i, n))]),
      `Założenie: inflacja ${procent(i)} w każdym roku. ${NIE_PROGNOZA}`,
      [1, 2],
    );
  },

  'tabela:procent-skladany': () =>
    tabela(
      `Procent składany na przykładzie ${zl(10_000)}`,
      ['Po ilu latach', 'Zysk zostaje na koncie', 'Zysk wypłacany co roku (kapitał i suma wypłat)'],
      [1, 10, 20, 30].map((n) => [
        lata(n),
        zlPelne(kapitalPoLatach(10_000, STOPA_PRZYKLADOWA, n)),
        zlPelne(10_000 + 10_000 * STOPA_PRZYKLADOWA * n),
      ]),
      `Założenia: jednorazowo ${zl(10_000)}, stały zysk ${procent(STOPA_PRZYKLADOWA)} rocznie, bez kosztów i podatków. Różnica między kolumnami to procent składany. ${NIE_PROGNOZA}`,
      [1, 2],
    ),

  'tabela:scenariusze': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    const wiersze = [10, 20, 30].flatMap((n) =>
      [0, i, STOPA_PRZYKLADOWA].map((s) => {
        const w = symuluj({ wplataMiesieczna: WPLATA, lata: n, stopaZwrotu: s, inflacja: i, koszty: 0 });
        return [lata(n), procent(s), zlPelne(w.sumaWplat), zlPelne(w.wartoscNominalna), zlPelne(w.wartoscRealna)];
      }),
    );
    return tabela(
      'Regularne oszczędzanie w trzech scenariuszach',
      ['Okres', 'Roczny zysk', 'Suma wpłat', 'Wartość nominalna', 'Wartość realna'],
      wiersze,
      `Założenia: wpłata ${zl(WPLATA)} na koniec każdego miesiąca, inflacja ${procent(i)} rocznie, bez kosztów i podatków. Wartość realna — w dzisiejszych pieniądzach. ${NIE_PROGNOZA}`,
      [1, 2, 3, 4],
    );
  },

  'wykres:scenariusz': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    const w = symuluj({ wplataMiesieczna: WPLATA, lata: 30, stopaZwrotu: STOPA_PRZYKLADOWA, inflacja: i, koszty: 0 });
    const legenda = SERIE.map((s) => `<li><span class="klucz" style="--k:${s.kolor}"></span>${s.nazwa}</li>`).join('');
    return (
      `<figure class="wykres przyklad-wykres"><p class="wykres__tytul">Przebieg w kolejnych latach</p>` +
      `<ul class="legenda" aria-label="Legenda">${legenda}</ul>${rysujWykres(w, 640, 'przyklad-wykres')}` +
      `<figcaption>Założenia: ${zl(WPLATA)} miesięcznie przez 30 lat, zysk ${procent(STOPA_PRZYKLADOWA)} rocznie, inflacja ${procent(i)} rocznie, bez kosztów i podatków. Wartości z wykresu są w tabeli powyżej (wiersz „30 lat”, zysk ${procent(STOPA_PRZYKLADOWA)}). ${NIE_PROGNOZA}</figcaption></figure>`
    );
  },

  'tabela:koszty': () => {
    const i = wartoscP('nbp-cel-inflacyjny');
    const bez = symuluj({ wplataMiesieczna: WPLATA, lata: 30, stopaZwrotu: STOPA_PRZYKLADOWA, inflacja: i, koszty: 0 });
    return tabela(
      'Wpływ rocznych kosztów na wynik po 30 latach',
      ['Roczne koszty', 'Wartość nominalna po 30 latach', 'Mniej niż bez kosztów'],
      [0, 0.005, 0.01, 0.02].map((k) => {
        const w = symuluj({ wplataMiesieczna: WPLATA, lata: 30, stopaZwrotu: STOPA_PRZYKLADOWA, inflacja: i, koszty: k });
        return [procent(k), zlPelne(w.wartoscNominalna), k === 0 ? '—' : zlPelne(bez.wartoscNominalna - w.wartoscNominalna)];
      }),
      `Założenia: ${zl(WPLATA)} miesięcznie przez 30 lat, zysk ${procent(STOPA_PRZYKLADOWA)} rocznie przed kosztami, koszty liczone od zgromadzonych środków, bez podatków. ${NIE_PROGNOZA}`,
      [1, 2],
    );
  },
};

export function dyrektywa(nazwa: string): string {
  const f = DYREKTYWY[nazwa];
  if (!f) throw new Error(`Nieznana dyrektywa „${nazwa}”.`);
  return f();
}
