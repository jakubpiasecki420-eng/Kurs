# Raport — etap 2B: weryfikacja i naprawa kursu po audycie

| | |
| --- | --- |
| Data | 14 listopada 2026 r. |
| Dokument wyjściowy | `docs/audyt-jakosci-kursu-etap-2a.md` (commit `13ae313`) |
| Zakres | 12 lekcji kursu „Emerytura pod kontrolą”, trzy kalkulatory, przykłady obliczeniowe, rejestr twierdzeń. Te same potwierdzone błędy poprawiono też w rozdziałach PDF i na stronach `/ike/` oraz `/jdg-b2b/` |
| Poza zakresem (zachowane bez zmian) | Design, architektura, technologia, moduły, logowanie, płatności, blokady publikacji, oznaczenie „Przed recenzją eksperta”, flagi w `src/config/serwis.json` |

**Ważne:** audyt i poprawki wykonał ten sam model, który napisał lekcje. Nie jest to recenzja niezależna ani opinia prawna czy podatkowa.

---

## 1. Uwagi z audytu i ich status

Każdą uwagę sprawdziłem ponownie w tekście przepisu albo w kodzie. Żadna z 42 uwag nie okazała się błędna.

Statusy:

- **Naprawione** — błąd potwierdzony i usunięty.
- **Naprawione + ekspert** — poprawione; interpretację w lekcji oznaczono akapitem „Do potwierdzenia przez eksperta”.
- **Częściowo** — poprawiono część; reszta wymaga decyzji albo nowej funkcji.
- **Ekspert** — bez zmian w treści, czeka na opinię.
- **Odłożone** — dotyczy modułu, którego jeszcze nie ma.

| ID | Waga | Weryfikacja | Status | Co zrobiono |
| --- | --- | --- | --- | --- |
| K-01 | KRYTYCZNA | Potwierdzone: sus art. 50 ust. 2 odsyła do art. 40 ust. 1, który wyłącza subkonto; FUS art. 25 ust. 1 wlicza subkonto | Naprawione + ekspert | 1.1: podział składki na konto i subkonto. 2.1: stan subkonta w informacji. 2.2: sekcja „Czego hipotetyczna emerytura nie obejmuje”. 12.1 i 9.3: luka opisana jako liczba orientacyjna. PDF rozdz. 2 i strona `/jdg-b2b/`. Oznaczenie: praktyka ZUS i metoda doliczenia subkonta |
| K-02 | KRYTYCZNA | Potwierdzone: PIT art. 34 ust. 1; ustawa o świadczeniach opieki zdrowotnej art. 66 ust. 1 pkt 16 i art. 79 ust. 1 (nowelizacje po t.j. sprawdzone — tych przepisów nie zmieniają) | Naprawione | 2.2 i 12.1: „to kwota brutto”, zaliczka na podatek i składka zdrowotna. PDF rozdz. 2, `/jdg-b2b/`. Przeliczenia na netto świadomie nie dodano (P-04) |
| W-01 | WYSOKA | Potwierdzone: sus art. 18c ust. 1–3 i 12 pkt 2 | Naprawione | 1.3: tabela trzech sposobów ustalania podstawy (zwykły, preferencyjny, mały ZUS plus), zasada dla ryczałtu |
| W-02 | WYSOKA | Potwierdzone: sus art. 18c ust. 2; FUS art. 87 ust. 3. Ulga na start zweryfikowana: Prawo przedsiębiorców art. 18 ust. 1–2 (t.j. Dz.U. 2026 poz. 1484) | Naprawione + ekspert | 1.2: mały ZUS plus i ulga na start; przykład 0,3 miesiąca. Oznaczenie: wpływ miesięcy ulgi na staż |
| W-03 | WYSOKA | Potwierdzone: FUS art. 5 ust. 2, art. 87 ust. 1 | Naprawione | 1.2: limit okresów nieskładkowych do jednej trzeciej, definicje okresów |
| W-04 | WYSOKA | Potwierdzone: FUS art. 87 ust. 5, art. 104 ust. 1 | Naprawione + ekspert | 1.2: sekcja „Kiedy podwyższenia nie ma mimo stażu”. Oznaczenie: stosowanie do JDG po przejściu na emeryturę |
| W-05 | WYSOKA | Potwierdzone: PIT art. 30a ust. 8, 8a, 8b; ustawa o IKE art. 37 ust. 1 i 1a | Naprawione + ekspert | 4.2: zwrot całkowity i częściowy, nowy przykład częściowego zwrotu (podatek 380 zł). `/ike/` i PDF rozdz. 4. Oznaczenie: opłaty instytucji, wartość środków w dniu zwrotu |
| W-06 | WYSOKA | Potwierdzone (ryzyko błędnego wniosku) | Naprawione | 12.1: usunięto rachunek „liczby lat”. Zastąpiono zestawieniem luki i oszczędności bez dzielenia, z wyjaśnieniem, od czego zależy zamiana kapitału na wypłaty |
| W-07 | WYSOKA | Potwierdzone: `liczbaZPola('10.000')` dawało 10 | Naprawione | Nowy parser polskiego zapisu, wspólny dla trzech kalkulatorów. Testy jednostkowe i w przeglądarce |
| W-08 | WYSOKA | Potwierdzone: ustawa o IKE art. 18 i art. 40 ust. 1 | Ekspert | Bez zmian; pytanie P-08 do prawnika. Blokada publikacji pozostaje |
| S-01 | ŚREDNIA | Potwierdzone: sus art. 22 ust. 3, art. 40 ust. 1 | Naprawione | 1.1 |
| S-02 | ŚREDNIA | Potwierdzone: FUS art. 25 ust. 3 i 6 | Naprawione | 1.1: sekcja o waloryzacji; nowe pytanie w quizie |
| S-03 | ŚREDNIA | Potwierdzone: FUS art. 26 ust. 6 | Naprawione | 1.1 |
| S-04 | ŚREDNIA | Potwierdzone: sus art. 20 ust. 1, art. 11 ust. 2, art. 12 ust. 1 | Naprawione | Podpis tabeli w `przyklady.ts` i akapit w 1.3 |
| S-05 | ŚREDNIA | Potwierdzone: sus art. 18 ust. 8a, art. 19 ust. 1 | Naprawione | 1.3; zaktualizowane twierdzenie `sus-podstawa-wyzsza` |
| S-06 | ŚREDNIA | Potwierdzone: zdanie bez źródła; FUS art. 25 ust. 2; ustawa o IKE art. 34 ust. 1 pkt 2 | Naprawione | Usunięto zdanie bez źródła. Dodano opis różnicy w dziedziczeniu na podstawie przepisów |
| S-07 | ŚREDNIA | Potwierdzone: sus art. 50 ust. 1a pkt 2a, 4, 5 | Naprawione | 2.1 i PDF rozdz. 2 |
| S-08 | ŚREDNIA | Potwierdzone: sus art. 50 ust. 1a pkt 3 | Naprawione + ekspert | 2.1: nowa sekcja „Jak czytać zestawienie”. Oznaczenie: wygląd dokumentu ZUS |
| S-09 | ŚREDNIA | Potwierdzone: ustawa o IKE art. 3 ust. 2, art. 13 ust. 7 | Naprawione | 4.1, quiz, `/ike/`, PDF rozdz. 4 |
| S-10 | ŚREDNIA | Potwierdzone: ustawa o IKE art. 34 ust. 2, 4, 5 | Naprawione | 4.2 i PDF rozdz. 4 |
| S-11 | ŚREDNIA | Potwierdzone (dane: 10 000 zł, −2%, 20 lat) | Naprawione | Etykiety „Strata łącznie” itd. przy ujemnej stopie; test |
| S-12 | ŚREDNIA | Interpretacja (zakotwiczenie oczekiwań), nie błąd | Częściowo | Kalkulator procentu składanego: domyślna stopa = cel NBP z opisem. 9.2: uzasadnienie wyboru 5% w przykładach. Przycisk 7% w kalkulatorze oszczędzania pozostawiony — decyzja właściciela |
| S-13 | ŚREDNIA | Potwierdzone | Naprawione | 12.1: zalecenia zamienione na pytania i opcje; usunięte pytanie quizu z odpowiedzią normatywną; 1.3: pytanie o rezerwę przeformułowane |
| S-14 | ŚREDNIA | Potwierdzone | Częściowo | 12.1 mówi wprost, że porównania kont jeszcze nie ma. Moduły 5–7 nadal wstrzymane |
| S-15 | ŚREDNIA | Interpretacja niejednoznaczna | Naprawione + ekspert | 12.2: złagodzone sformułowanie, oznaczenie (P-05) |
| S-16 | ŚREDNIA | Potwierdzone | Naprawione | 12.2: nowe brzmienie pytania |
| S-17 | ŚREDNIA | Potwierdzone | Częściowo | Objaśnienia przy pierwszym użyciu: podstawa wymiaru, okresy składkowe i nieskładkowe, płaca minimalna a prognozowane przeciętne wynagrodzenie, subkonto. Osobnego słowniczka brak |
| S-18 | ŚREDNIA | Potwierdzone (25 z 29) | Naprawione | Nowe quizy: 33 pytania, każde z 3 odpowiedziami. Poprawne na pozycjach 1/2/3: 10/12/11. Poprawna jest jedyną najdłuższą w 9 z 33 (27%). Test pilnuje progów |
| S-19 | ŚREDNIA | Potwierdzone | Częściowo | PDF: usunięte odwołania do nieistniejącego zeszytu ćwiczeń. Miejsca na notatki na platformie nie dodano — byłaby to nowa funkcja |
| S-20 | ŚREDNIA | Potwierdzone | Naprawione | PDF rozdz. 0: usunięta niedookreślona obietnica aktualizacji |
| S-21 | ŚREDNIA | Potwierdzone | Naprawione | PDF rozdz. 2, 4, 9: formy neutralne i poprawki merytoryczne jak w lekcjach |
| N-01 | NISKA | Potwierdzone: FUS art. 174 ust. 3 | Naprawione | 1.1 |
| N-02 | NISKA | Potwierdzone | Naprawione | 1.2 |
| N-03 | NISKA | Potwierdzone: sus art. 50 ust. 1d | Naprawione | 2.2 |
| N-04 | NISKA | Potwierdzone: ustawa o IKE art. 13 ust. 1a | Naprawione | 4.1 |
| N-05 | NISKA | Potwierdzone | Naprawione | Kalkulator inflacji: „za 2 lata”; test |
| N-06 | NISKA | Potwierdzone | Naprawione | Kalkulator inflacji: inflacja od −5% do 20%, jak w kalkulatorze oszczędzania |
| N-07 | NISKA | Potwierdzone | Naprawione | Tabela składki z groszami (390,40 zł × 12 = 4 684,80 zł) |
| N-08 | NISKA | Potwierdzone | Naprawione | Oś wykresu: „mld” od miliarda; test |
| N-09 | NISKA | Potwierdzone | Naprawione | Linki do M.P. 2025 poz. 1202 i 1156 prowadzą do ELI |
| N-10 | NISKA | Potwierdzone | Naprawione | PDF rozdz. 0: złagodzone zdanie |
| N-11 | NISKA | — | Odłożone | Dotyczy modułu 10, który nie istnieje |

**Podsumowanie:**

| Status | Liczba uwag |
| --- | --- |
| Naprawione | 30 |
| Naprawione + ekspert | 6 |
| Częściowo | 4 |
| Ekspert | 1 |
| Odłożone | 1 |
| **Razem** | **42** |

Dwie uwagi (S-12, S-15) okazały się kwestią interpretacji, nie błędem — mimo to je poprawiono lub oznaczono.

---

## 2. Wykonane poprawki

### 2.1. Lekcje

| Lekcja | Zmiany |
| --- | --- |
| 1.1 Skąd bierze się emerytura z ZUS | Konto i subkonto; sekcja o waloryzacji (≥ wskaźnik cen, stan konta nie może spaść); tablice korzystniejsze; kapitał początkowy a dawne zarobki; nowy quiz |
| 1.2 Wiek emerytalny i najniższa emerytura | Definicje okresów; limit nieskładkowych; brak podwyższenia przy przychodzie z działalności; mały ZUS plus; ulga na start; przykład 0,3 miesiąca; 2 oznaczenia; nowy quiz |
| 1.3 Podstawa składek i własne oszczędności | Tabela trzech sposobów ustalania podstawy; ryczałt; limit roczny; brak korekty deklaracji; składki chorobowa i wypadkowa; dziedziczenie; usunięte zdanie bez źródła; nowy quiz |
| 2.1 Informacja o stanie konta | Stan subkonta i OFE; jak czytać zestawienie 12 miesięcy; oznaczenie; nowy quiz |
| 2.2 Hipotetyczna emerytura | Warianty +1…+5 lat; sekcja „Czego nie obejmuje” (subkonto, kwota brutto); nowe „Zrób to teraz”; oznaczenie; nowy quiz |
| 4.1 IKE: zasady i limit | Małoletni; limit nie niższy niż w poprzednim roku; nowy quiz |
| 4.2 IKE: wypłata i zwrot | Wypłata jednorazowa i w ratach oraz jej skutki; zwrot całkowity i częściowy; dwa przykłady; oznaczenie; nowy quiz |
| 9.1 Inflacja | Nowy quiz (treść bez zmian) |
| 9.2 Procent składany | Uzasadnienie stopy 5%; ćwiczenie z nową wartością domyślną; nowy quiz |
| 9.3 Regularne oszczędzanie | Opis modelu kosztów; luka z zastrzeżeniami; nowy quiz |
| 12.1 Twoje liczby | Luka orientacyjna (subkonto, brutto); usunięty rachunek „liczby lat”; neutralne sformułowania; nowy quiz |
| 12.2 Kalendarz | Złagodzona interpretacja „roku wpłaty”; oznaczenie; subkonto w przeglądzie; nowy quiz |

### 2.2. Kalkulatory i przykłady

- **Wspólny parser `liczbaZPola`** w kalkulatorze oszczędzania, procentu składanego i inflacji. Odczytuje:
  - spacje i twarde spacje jako separatory tysięcy;
  - kropkę w grupach po trzy cyfry jako separator tysięcy („10.000” → 10 000, „1.000,50” → 1 000,5);
  - kropkę w innym miejscu jako przecinek dziesiętny („2.5” → 2,5);
  - pomija „zł”, „lat” i „%”.
  Zapis mieszany i niejednoznaczny (np. „1,5.0”) zwraca błąd.
- **Kalkulator procentu składanego:**
  - etykiety przy ujemnej stopie mówią o stracie, nie o zysku;
  - domyślna stopa równa celowi inflacyjnemu NBP, z opisem;
  - cel NBP dopisany do źródeł narzędzia.
- **Kalkulator inflacji:** poprawna odmiana „rok / lata / lat”; zakres inflacji do 20%.
- **Wykres:** etykieta „mld” na osi dla kwot od miliarda.
- **Przykłady:**
  - tabela składki emerytalnej z groszami i pełnym opisem kosztu;
  - przykład zwrotu przemianowany na „zwrot całkowity”;
  - nowy przykład „częściowy zwrot z IKE”.

### 2.3. Rejestr twierdzeń

- Dodano 29 twierdzeń ze statusem P. Wszystkie sprawdzone 14 listopada 2026 r., przegląd zaplanowany na 15 maja 2027 r. Lista w sekcji 4.
- Dodano źródło `ustawa-pp`: Prawo przedsiębiorców, t.j. Dz.U. 2026 poz. 1484.
- Zaktualizowano treść i przepis dwóch twierdzeń: `ike-zwrot-dochod` (art. 30a ust. 8 i 8a) oraz `sus-podstawa-wyzsza` (art. 18 ust. 8a, art. 18c ust. 8).
- Linki do M.P. 2025 poz. 1202 i 1156 prowadzą teraz do ELI.
- Rejestr ma 107 twierdzeń: 97 P, 6 W, 4 Z.

### 2.4. Strony publiczne i PDF

| Miejsce | Zmiana |
| --- | --- |
| `/ike/` | Małoletni; zwrot całkowity i częściowy |
| `/jdg-b2b/` | Hipotetyczna emerytura bez subkonta, kwota brutto |
| PDF rozdz. 0 | Usunięty zeszyt ćwiczeń, obietnica aktualizacji i nieprawdziwe zdanie o objaśnianiu pojęć |
| PDF rozdz. 2 | Subkonto, zestawienie 12 miesięcy, kwota brutto, formy neutralne |
| PDF rozdz. 4 | Małoletni, skutki wypłaty, zwrot całkowity i częściowy z przykładami, formy neutralne |
| PDF rozdz. 9 | Formy neutralne, luka orientacyjna |

### 2.5. Zasady pracy

`CLAUDE.md` ma dwie nowe konwencje:

- oznaczanie niejednoznacznych interpretacji akapitem „Do potwierdzenia przez eksperta”;
- wymagania dla quizów.

Testy pilnują obu zasad.

---

## 3. Zmienione pliki

```
CLAUDE.md
docs/rejestr-zrodel-i-twierdzen.md              (wygenerowany)
docs/raport-etap-2b.md                          (nowy — ten raport)
produkt/przewodnik/rozdzialy/00-jak-korzystac.md
produkt/przewodnik/rozdzialy/02-zus.md
produkt/przewodnik/rozdzialy/04-ike.md
produkt/przewodnik/rozdzialy/09-inflacja-i-procent-skladany.md
src/components/Kalkulator.astro
src/components/platforma/WidokNarzedzia.astro
src/content/lekcje/emerytura-pod-kontrola/*.md  (wszystkie 12 lekcji)
src/data/rejestr.json
src/lib/kalkulator/proste.ts
src/lib/kalkulator/proste-widok.ts
src/lib/kalkulator/proste.test.ts
src/lib/kalkulator/wykres.ts
src/lib/kalkulator/wykres.test.ts
src/lib/platforma/narzedzia.ts
src/lib/platforma/tresc.test.ts
src/lib/przyklady.ts
src/lib/tresc-markdown.test.ts
src/pages/ike.astro
src/pages/jdg-b2b.astro
tests/e2e/platforma.spec.ts
```

Bez zmian: `src/config/serwis.json` (flagi publikacji i recenzji), `scripts/gotowosc*`, układy, style, komponenty platformy poza `WidokNarzedzia.astro`.

---

## 4. Źródła i daty weryfikacji

Wszystkie teksty pobrane 14 listopada 2026 r. z ELI Sejmu. Status „obowiązujący” sprawdzony w API ELI. Nowelizacje po tekstach jednolitych przejrzane pod kątem zmian w cytowanych przepisach.

| Akt | Tekst | Przepisy użyte w etapie 2B | Nowelizacje po t.j. |
| --- | --- | --- | --- |
| [Ustawa o systemie ubezpieczeń społecznych](https://api.sejm.gov.pl/eli/acts/DU/2026/1474/text.pdf) | t.j. Dz.U. 2026 poz. 1474 | art. 11 ust. 2, 12 ust. 1, 18 ust. 8a, 18c ust. 1–3, 8, 11, 11a, 12, 19 ust. 1, 20 ust. 1, 22 ust. 3, 40 ust. 1, 50 ust. 1a, 1d, 2 | brak |
| [Ustawa o emeryturach i rentach z FUS](https://api.sejm.gov.pl/eli/acts/DU/2025/1749/text.pdf) | t.j. Dz.U. 2025 poz. 1749 | art. 5 ust. 2, 6 ust. 1, 7, 25 ust. 2, 3, 6, 26 ust. 6, 87 ust. 1, 3, 5, 104 ust. 1, 174 ust. 3 | Dz.U. 2026 poz. 26 i 425 — nie zmieniają tych przepisów |
| [Prawo przedsiębiorców](https://api.sejm.gov.pl/eli/acts/DU/2026/1484/text.pdf) | t.j. Dz.U. 2026 poz. 1484 (ogłoszony 10.11.2026) | art. 18 ust. 1–2 | brak |
| [Ustawa o IKE i IKZE](https://api.sejm.gov.pl/eli/acts/DU/2026/91/text.pdf) | t.j. Dz.U. 2026 poz. 91 | art. 3 ust. 2, 13 ust. 1a i 7, 34 ust. 1 pkt 2, ust. 2, 4, 5, 37 ust. 1 i 1a | brak |
| [Ustawa o PIT](https://api.sejm.gov.pl/eli/acts/DU/2026/592/text.pdf) | t.j. Dz.U. 2026 poz. 592 | art. 30a ust. 8, 8a, 8b, art. 34 ust. 1 | 5 nowelizacji; poz. 779 i 1371 sprawdzone pod kątem zmienianych artykułów, pozostałe po tytułach — nie dotyczą |
| [Ustawa o świadczeniach opieki zdrowotnej](https://api.sejm.gov.pl/eli/acts/DU/2025/1461/text.pdf) | t.j. Dz.U. 2025 poz. 1461 | art. 66 ust. 1 pkt 16, art. 79 ust. 1 | 7 nowelizacji (Dz.U. 2025 poz. 1537, 1739; 2026 poz. 203, 791, 972, 986, 1007) — żadna nie zmienia art. 66 ust. 1 pkt 16 ani art. 79 ust. 1 |
| [M.P. 2025 poz. 1202](https://api.sejm.gov.pl/eli/acts/MP/2025/1202/text.pdf), [M.P. 2025 poz. 1156](https://api.sejm.gov.pl/eli/acts/MP/2025/1156/text.pdf) | obwieszczenia | limity IKE i IKZE na 2026 r. | — |

Nowe twierdzenia (status P, sprawdzono 2026-11-14):

- `sus-subkonto-skladka`
- `zus-hipotetyczna-bez-subkonta`
- `zus-informacja-subkonto`
- `zus-informacja-12-miesiecy`
- `zus-hipotetyczna-5-lat`
- `pit-emerytura-zaliczka`
- `zdrowotna-emeryci`
- `fus-waloryzacja-roczna`
- `fus-waloryzacja-wskaznik`
- `fus-tablice-korzystniejsze`
- `fus-kapital-poczatkowy-zarobki`
- `fus-kapital-nie-dziedziczony`
- `fus-okresy-definicje`
- `fus-nieskladkowe-limit`
- `fus-najnizsza-przychod`
- `sus-maly-zus-plus`
- `sus-maly-zus-plus-granice`
- `sus-maly-zus-plus-ryczalt`
- `sus-maly-zus-plus-okres`
- `sus-limit-roczny`
- `sus-podstawa-chorobowe-wypadkowe`
- `pp-ulga-na-start`
- `ike-maloletni`
- `ike-limit-nie-nizszy`
- `ike-po-wyplacie`
- `ike-wyplata-smierc`
- `ike-zwrot-calkowity`
- `ike-zwrot-czesciowy`
- `ike-zwrot-czesciowy-dochod`

Data „stan prawny” w rejestrze (`stanNaDzien`) pozostaje 13 listopada 2026 r. — zob. sekcja 6.

---

## 5. Wyniki testów

Uruchomione 14 listopada 2026 r. po wszystkich zmianach.

| Kontrola | Wynik |
| --- | --- |
| `npm test` (Vitest) | **285 / 285** w 15 plikach (wcześniej 245) |
| `npm run check` | **0 błędów, 0 ostrzeżeń** |
| `npm run build` (w ramach `test:e2e`) | **50 stron** bez błędów |
| `npm run test:e2e` (komputer i telefon, z kontrolą dostępności WCAG 2.1 AA) | **397 przechodzi, 1 pominięty, 0 błędów** |
| `npm run rejestr` | 107 twierdzeń |
| `npm run przewodnik` | PDF 19 stron (wcześniej 17); w tekście PDF potwierdzono nowe sekcje i przykład częściowego zwrotu |
| `npm run gotowosc` | 6 blokad publikacji, bez zmian |

Testy dodane lub zmienione w tym etapie:

- **Polskie formaty liczb:**
  - jednostkowo: „10 000”, „10.000”, „1.000.000”, „1.000,50”, „2.5”, „0.025”, „1,000”, „10 000 zł” oraz zapisy błędne;
  - w przeglądarce: „10.000” i „1.000,50” w kalkulatorze procentu, „1.000” w kalkulatorze oszczędzania.
- **Kalkulatory:**
  - etykiety przy ujemnej stopie (jednostkowo i w przeglądarce);
  - odmiana „za 2 lata”;
  - oś „mld”.
- **Zgodność przykładów z kalkulatorami:** 10 000 zł przy 5% po 10 latach = 16 289 zł w lekcji i w kalkulatorze; 1 000 zł przy 2,5% po 20 latach = 1 639 zł.
- **Przykłady:**
  - częściowy zwrot: koszt 8 000 zł, dochód 2 000 zł, podatek 380 zł;
  - tabela składki z groszami.
- **Quizy:** co najmniej 3 odpowiedzi; każda pozycja poprawnej w ≥ 20% pytań; poprawna jako jedyna najdłuższa w ≤ 40% pytań.
- **Oznaczenia:** test sprawdza, które lekcje mają akapit „Do potwierdzenia przez eksperta”.
- **Widoki mobilne (390 px) i desktop (1280 px):** lekcje 1.2, 1.3, 2.2, 4.2 i strona `/ike/` bez przewijania poziomego i bez błędów konsoli. Pozostałe strony sprawdzają testy e2e na emulacji telefonu.

Pominięty test to najechanie kursorem na wykres na telefonie — pomijany od etapu 1, bo telefon nie ma kursora.

---

## 6. Problemy nierozwiązane

| Problem | Powód | Waga |
| --- | --- | --- |
| Nazwy IKE, IKZE i OKI w płatnym kursie (W-08) | Wymaga opinii prawnej | WYSOKA |
| Sześć akapitów „Do potwierdzenia przez eksperta” w pięciu lekcjach | Interpretacja niejednoznaczna (sekcja 7) | WYSOKA–ŚREDNIA |
| Brak przeliczenia emerytury brutto na netto | Świadoma decyzja do czasu recenzji podatkowej (P-04) | ŚREDNIA |
| Moduły 3 i 5–7 nadal bez lekcji; 12.1 nie ma porównania kont | Wstrzymane do recenzji podatkowej | ŚREDNIA |
| Brak miejsca na notatki kursanta na platformie | Wymagałoby nowej funkcji | ŚREDNIA |
| Brak osobnego słowniczka pojęć | Pojęcia objaśnione przy pierwszym użyciu; słowniczek to nowa treść | NISKA |
| Przycisk wariantu 7% w kalkulatorze oszczędzania (S-12) | Decyzja właściciela | NISKA |
| Wyjątki z art. 87 ust. 4 ustawy o FUS (zasiłki itp. przy proporcji stażu) nie są opisane w 1.2 | Mało istotne dla JDG; do dodania przy recenzji | NISKA |
| Szeroka tabela w 1.3 przewija się na telefonie w swoim regionie | Zgodne z konwencją serwisu; czytelność gorsza niż na komputerze | NISKA |
| `stanNaDzien` rejestru = 13 listopada 2026 r., a część twierdzeń sprawdzono 14 listopada | Zmiana daty stanu prawnego to decyzja właściciela; daty weryfikacji są przy każdym twierdzeniu | NISKA |
| Liczby z twierdzeń bez wartości (np. „24 miesiące”, „30%” w opisie małego ZUS plus) wpisane w treść | Rejestr nie ma dla nich pól liczbowych; zgodność sprawdzona ręcznie | NISKA |

---

## 7. Kwestie dla doradcy podatkowego lub prawnika

Pytania z audytu (P-01 do P-11) pozostają aktualne, z wyjątkiem P-07: rachunek „liczby lat” został usunięty.

Pytania powiązane z oznaczeniami w lekcjach:

| Lekcja | Oznaczenie | Pytanie |
| --- | --- | --- |
| 2.2 | Subkonto w hipotetycznej emeryturze | P-01: jak ZUS przedstawia hipotetyczną emeryturę wobec subkonta i jak edukacyjnie uwzględnić subkonto |
| 2.1 | Wygląd informacji o stanie konta | Czy opis zestawienia 12 miesięcy odpowiada dokumentowi ZUS |
| 1.2 | Ulga na start | P-02: czy miesiące ulgi na start liczą się do stażu do najniższej emerytury |
| 1.2 | Przychód emeryta z JDG | P-03: stosowanie art. 87 ust. 5 i art. 104 do emeryta prowadzącego działalność |
| 4.2 | Zwrot z IKE | P-06: kompletność opisu zwrotu całkowitego i częściowego; wartość środków w dniu zwrotu; opłaty |
| 12.2 | Rok wpłaty | P-05: czy decyduje data zlecenia, czy data uznania rachunku |
| — | Netto | P-04: czy i jak pokazać przykład emerytury netto |
| — | Nazwy | P-08: tytuły modułów i reklama kursu wobec art. 18 i 40 ustawy o IKE oraz analogicznego przepisu ustawy o OKI |
| — | Konsument | P-09: zakres aktualizacji treści cyfrowych (obietnicę usunięto; pytanie wraca przy sprzedaży) |
| — | Granica edukacji | P-10 i P-11: neutralne pytania w 1.3 i 12.1 o rezerwę i wybór dróg oszczędzania |
| 1.3 | Mały ZUS plus | Nowe: czy opis warunków (przychód, okres 36 z 60 miesięcy, wyłączenia) wystarcza w materiale edukacyjnym |

---

## 8. Gotowość do zewnętrznej recenzji

| Cel | Ocena |
| --- | --- |
| Recenzja ekspercka (doradca podatkowy, specjalista ds. ubezpieczeń społecznych) | **Gotowe.** Oba błędy krytyczne i wszystkie uwagi wysokie, poza nazwami (W-08), są usunięte albo oznaczone do potwierdzenia. Recenzent dostaje 12 lekcji, rejestr 97 twierdzeń P i listę konkretnych pytań |
| Recenzja prawna | Gotowe do zlecenia — W-08, P-09, P-10 |
| Pokaz w rozmowach walidacyjnych | Tak, jako wersja robocza |
| Publikacja i sprzedaż | **Nie.** Blokady publikacji bez zmian; brak recenzji, opinii prawnej, regulaminu i polityki prywatności; 7 z 12 modułów bez lekcji |

Lekcje nadal mają oznaczenie „Przed recenzją eksperta”. Flagi publikacji i blokady w `src/config/serwis.json` oraz `npm run gotowosc` pozostały bez zmian. Kolejnego etapu nie rozpoczęto.
