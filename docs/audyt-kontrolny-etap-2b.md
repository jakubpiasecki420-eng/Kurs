# Audyt kontrolny etapu 2B i naprawy — etap 2C

| | |
| --- | --- |
| Data | 14 listopada 2026 r. |
| Gałąź | `claude/laughing-brown-837njb` |
| Punkt wyjścia | commit `a9811ab` (etap 2B) — repozytorium czyste, zgodne z gałęzią zdalną |
| Rejestr napraw | `docs/rejestr-napraw-etap-2c.md` (35 pozycji z klasyfikacją, testem i statusem) |
| Pytania do ekspertów | `docs/pytania-do-ekspertow.md` |
| Publikacja zmian | **Bez push** — zgodnie z poleceniem zmiany są tylko w lokalnym repozytorium (sekcja 10) |

## Zastrzeżenia

- **To nie jest audyt niezależny w sensie osobowym.** Wykonał go ten sam model, który pisał lekcje i poprawki 2B. Nie zakładałem jednak poprawności poprzednich raportów: każdą poprawkę 2B przeczytałem ponownie w pliku i porównałem z tekstem przepisu.
- **To nie jest opinia prawna ani podatkowa.** Wnioski z przepisów są oznaczone jako „wniosek” albo „Do potwierdzenia przez eksperta”.
- **Źródła:** teksty aktów z ELI Sejmu pobrane 14 listopada 2026 r. Prawo przedsiębiorców pobrano w tekście jednolitym Dz.U. 2026 poz. 1484 z 10 listopada 2026 r. Nie miałem dostępu do praktyki ZUS, interpretacji indywidualnych ani komentarzy.

---

## 1. Zakres audytu

| Obszar | Co sprawdzono | Jak |
| --- | --- | --- |
| Lekcje | 12 lekcji kursu i 6 lekcji demonstracyjnych | Lektura plików, porównanie z przepisami, kontrola quizów, form językowych i spójności między lekcjami |
| Strony publiczne | `/`, `/ike/`, `/ikze/`, `/oki/`, `/jdg-b2b/`, `/kalkulator/`, `/zrodla/`, `/program/`, artykuł | Lektura tekstu, porównanie z przepisami, wyszukiwanie języka doradczego, form męskich i liczb wpisanych na sztywno |
| Rejestr | 107 twierdzeń (przed zmianami), 22 źródła | Kontrola struktury (pola, źródła, daty); ponowne porównanie z aktami twierdzeń używanych w treści; mapa użycia twierdzeń |
| Kalkulatory | Oszczędzanie, procent składany, inflacja; funkcje wspólne (parser, wykresy, przykłady) | 12 przypadków porównanych z niezależnym przeliczeniem w Pythonie, wartości skrajne i błędne, kontrola etykiet |
| Quizy | 33 pytania kursu | Poprawność kluczy, jednoznaczność, zgodność z treścią, wskazówki formalne |
| Granica edukacji | Wszystkie strony i lekcje | Wyszukiwanie zwrotów „powinien”, „najlepszy”, „opłaca się”, „gwarant…”, „zarobisz”; ocena funkcji kalkulatorów |
| Architektura | Model kursu, postęp, widoki, wstawianie HTML, SEO, obsługa błędów | Przegląd kodu, testy jednostkowe dla wielu kursów |

**Nowelizacje sprawdzone w API ELI:**

- ustawa o FUS: Dz.U. 2026 poz. 26 i 425 — nie dotyczą przepisów z lekcji;
- ustawa o PIT: poz. 779 i 1371 — nie dotyczą;
- ustawa o świadczeniach opieki zdrowotnej: 7 nowelizacji — nie zmieniają art. 66 ust. 1 pkt 16 ani art. 79 ust. 1;
- ustawa o OKI zmienia inne ustawy od 1 stycznia 2027 r., ale nie ustawę o IKE.

## 2. Stan projektu przed zmianami

- 12 lekcji w modułach 1, 2, 4, 9 i 12 oraz trzy kalkulatory.
- Rejestr: 107 twierdzeń (97 P, 6 W, 4 Z), stan prawny „13 listopada 2026 r.”, przy czym 45 twierdzeń sprawdzono 14 listopada.
- Testy: 285 jednostkowych, 397 w przeglądarce, 1 pominięty.
- Poprawki 2B weszły w życie bez znanych regresji.
- Status P nie odróżniał potwierdzenia treści przepisu od interpretacji.
- Strony publiczne poza `/ike/` i `/jdg-b2b/` nie przeszły dotąd szczegółowej kontroli.

## 3. Znalezione problemy i ich klasyfikacja

Pełna lista z plikami i testami: `docs/rejestr-napraw-etap-2c.md`.

| Klasyfikacja | Znaleziono | Naprawiono | Pozostawiono |
| --- | --- | --- | --- |
| POTWIERDZONY BŁĄD | 13 | 12 | 1 (B-08 — liczby w `/oki/`, wymaga rozszerzenia rejestru) |
| NIEJEDNOZNACZNOŚĆ | 3 | 3 (doprecyzowane i oznaczone) | — |
| ULEPSZENIE | 13 | 8 | 5 (A-08, A-09, B-09, C-08, E-02 — z uzasadnieniem) |
| POTENCJALNY BŁĄD | 2 | — | — (oba sprawdzone: błędu nie ma) |
| BRAK PODSTAW DO WERYFIKACJI | 1 | — | 1 (D-04 — twierdzenia nieużywane, niesprawdzone ponownie) |
| Kontrole bez uwag | 3 | — | — |

### Najważniejsze ustalenia

1. **Kalkulator procentu składanego — błąd obliczeniowy (C-01).** Wariant „procent prosty” przy dużej stracie dawał wartość ujemną: 1 zł, −20%, 50 lat → −9 zł. Poprawione: strata nie przekracza kapitału. Dwa testy chronią przed powrotem błędu.
2. **`/ikze/` — błędne wynikanie (B-01).** Strona twierdziła, że zwrot nie jest objęty stawką 10%, „więc” że jest przychodem z innych źródeł. Art. 20 ust. 1 ustawy o PIT zalicza do przychodów z innych źródeł także wypłaty z IKZE, więc przesłanka nie uzasadniała wniosku. Poprawione; sposób opodatkowania zwrotu u ryczałtowca to pytanie T-03 do doradcy.
3. **`/oki/` — nieprecyzyjna definicja (B-03).** Strona mówiła o „akcjach denominowanych w złotych”. Art. 26 ust. 4 ustawy o OKI mówi o akcjach spółek, których kapitał zakładowy jest w złotych, w obrocie zorganizowanym. Poprawione na stronie i w rejestrze.
4. **`/jdg-b2b/` — naruszenie zasady projektu (B-04).** Opis odliczenia IKZE nie wspominał o 10% podatku przy wypłacie. Poprawione.
5. **Lekcja 1.3 — zdanie bez źródła (A-03).** Zdanie o podstawie składek pracownika nie miało twierdzenia P. Dodano twierdzenie z art. 18 ust. 1 ustawy o systemie ubezpieczeń społecznych.
6. **Lekcja 1.2 — ulga na start bez warunków (A-01).** Uzupełnione o warunki z art. 18 ust. 1–2 Prawa przedsiębiorców.
7. **Rejestr — daty (D-02).** Stan prawny wskazywał dzień wcześniejszy niż część weryfikacji. Teraz 90 twierdzeń ma datę sprawdzenia 14 listopada; test pilnuje, by żadna nie była późniejsza niż stan prawny.
8. **Rejestr — rozdzielenie poziomów weryfikacji (D-01, wymóg właściciela).** Każde twierdzenie P ma teraz oznaczony charakter: „brzmienie” (95) albo „wniosek” (3, z opisem ograniczeń). Przepisy OKI mają datę obowiązywania. Strona `/zrodla/` i dokument rejestru to pokazują; opis czterech poziomów jest w `docs/system-aktualizacji.md`.

### Ponowna kontrola poprawek 2B (A-07)

| Poprawka 2B | Wynik kontroli |
| --- | --- |
| Subkonto, hipotetyczna emerytura bez subkonta (2.1, 2.2, 12.1) | Zgodne z art. 22 ust. 3, 40 ust. 1, 50 ust. 1a i 2 ustawy o sus; twierdzenie oznaczone jako „wniosek” |
| Kwota brutto (2.2, 12.1) | Zgodne z art. 34 ust. 1 PIT, art. 66 ust. 1 pkt 16 i 79 ust. 1 ustawy zdrowotnej |
| Mały ZUS plus, preferencyjna podstawa, ulga na start (1.2, 1.3) | Zgodne z art. 18c i 18a; nieścisłości A-01 i A-02 poprawione |
| Limit nieskładkowych, brak podwyższenia przy przychodzie (1.2) | Zgodne z art. 5 ust. 2, 87 ust. 1 i 5 ustawy o FUS |
| Zwrot całkowity i częściowy IKE (4.2), przykłady 1 900 zł i 380 zł | Zgodne z art. 30a ust. 8–8b PIT i art. 37 ustawy o IKE; obliczenia potwierdzone testem |
| Kalkulatory: parser, etykiety przy stracie, odmiana | Działają; znaleziono nowy błąd C-01 w wariancie porównawczym |
| Quizy (33 pytania) | Klucze poprawne, pytania jednoznaczne i zgodne z treścią; bez zmian |

## 4. Naprawy

| Obszar | Naprawy |
| --- | --- |
| Lekcje | A-01, A-02, A-03, A-04 (nowa sekcja „Realna stopa zwrotu” z tabelą), A-05, A-06 |
| Strony publiczne | B-01 do B-07 |
| Kalkulatory | C-01 (błąd), C-02 (inflacja skumulowana), C-03 i C-04 (założenia hipotetyczne zamiast „prognozy”), C-05 (stopa realna), C-06 (zastrzeżenie symulatora) |
| Rejestr | D-01 (pola `interpretacja`, `uwagi`, `obowiazujeOd`), D-02 (daty), D-03 (3 wnioski oznaczone), nowe twierdzenie `sus-podstawa-pracownik` |
| Architektura | E-01 (stała zamiast tekstu w `/program/`) |
| Dokumentacja | CLAUDE.md (zasada §4 pkt 7, §11), `system-aktualizacji.md`, `architektura-platformy.md`, `harmonogram.md`, `kwestie-do-weryfikacji.md`; 5 nowych dokumentów |

## 5. Problemy pozostawione bez zmian

| ID | Problem | Powód |
| --- | --- | --- |
| B-08 | Liczby 19%, 0,1%, 70% wpisane w komponent `/oki/` | Twierdzenia mają po kilka liczb i nie mają pola `wartosc`; wymaga zmiany struktury rejestru (plan T-4). Zgodność z ustawą sprawdzona ręcznie |
| B-09 | Liczby wpisane w artykuł | Artykuły nie korzystają z renderera lekcji (plan T-5) |
| A-08 | Szeroka tabela w lekcji 1.3 na telefonie | Zgodne z konwencją przewijanych tabel; czytelność do poprawy przy przeglądzie UX |
| A-09 | Liczby z twierdzeń bez pola `wartosc` w treści lekcji | Jak B-08 |
| C-08 | Kalkulator oszczędzania bez stopy realnej | Lekcja 9.1 ją wyjaśnia; zmiana interfejsu do decyzji |
| E-02 | Widoki zakładają jeden aktywny kurs | Celowo — drugiego kursu nie budujemy; plan w `architektura-wielokursowa.md` |
| D-04 | 18 twierdzeń (8 P nieużywanych w treści, 6 W, 4 Z) z datą 13.11 | Nie są pokazywane w treści; do ponownej weryfikacji przed opinią prawną (plan M-6) |
| — | Sześć akapitów „Do potwierdzenia przez eksperta” w lekcjach 1.2, 2.1, 2.2, 4.2, 12.2 | Wymagają opinii |

## 6. Kwestie wymagające eksperta

Pełna lista z fragmentami platformy: `docs/pytania-do-ekspertow.md`.

| Obszar | Pytania | Liczba |
| --- | --- | --- |
| Podatki | T-01 do T-12 | 12 |
| ZUS i ubezpieczenia społeczne | Z-01 do Z-08 | 8 |
| Prawo i regulacje | R-01 do R-07 | 7 |
| Inwestycje i instrumenty finansowe | I-01 do I-03 | 3 |
| Sprzedaż treści cyfrowych | S-01 do S-06 | 6 |

Najpilniejsze: Z-01 (subkonto), Z-03 i Z-04 (staż i przychód emeryta), T-01 (netto), R-01 (nazwy IKE/IKZE/OKI), R-02 (granica edukacji).

### Granica edukacji i doradztwa — ocena

- **Brak rekomendacji.** Żadna strona ani lekcja nie wskazuje instrumentów, funduszy, portfeli ani instytucji. Zwroty „najlepszy”, „opłaca się”, „gwarant…” występują wyłącznie w zaprzeczeniach („nie odpowiadamy, czy… opłaca się”) albo w błędnych odpowiedziach quizów.
- **Kalkulatory:**
  - liczą skutki założeń;
  - nie łączą zasad podatkowych z oszczędzaniem;
  - wartości domyślne i przyciski są teraz opisane jako hipotetyczne;
  - kalkulator IKZE i porównanie IKE/IKZE pozostają niepodłączone.
- **Ryzyka do opinii:**
  - szkic planu w lekcji 12.1 (rezerwa, kwota, „miejsce”);
  - pytania pomocnicze w lekcji 1.3;
  - użycie nazw IKE/IKZE/OKI w płatnym produkcie.
  Samo zastrzeżenie „materiał edukacyjny” nie rozstrzyga tych kwestii — pytania R-01 do R-03.

## 7. Wyniki testów

Uruchomione 14 listopada 2026 r. po wszystkich zmianach.

| Polecenie | Wynik | Wcześniej (2B) |
| --- | --- | --- |
| `npm test` (Vitest) | **299 / 299** w 15 plikach | 285 |
| `npm run check` | **0 błędów, 0 ostrzeżeń, 0 podpowiedzi** | 0 |
| `npm run build` (w `test:e2e`) | **50 stron** bez błędów | 50 |
| `npm run test:e2e` (komputer i telefon, axe WCAG 2.1 AA) | **405 przechodzi, 1 pominięty, 0 błędów** | 397 |
| `npm run rejestr` | 108 twierdzeń | 107 |
| `npm run przewodnik` | PDF 19 stron | 19 |
| `npm run gotowosc` | 6 blokad, stan prawny 2026-11-14 | 6 blokad |
| Lint | **Nie uruchomiono** — projekt nie ma skryptu lint (plan T-7) | — |

**Pominięty test:** najechanie kursorem na wykres na telefonie — pomijany od etapu 1, bo telefon nie ma kursora.

**Nowe testy w tym etapie:**

| Plik | Liczba | Co sprawdza |
| --- | --- | --- |
| `rejestr.test.ts` | 5 | Charakter twierdzeń, uwagi do wniosków, daty |
| `proste.test.ts` | 4 | Procent prosty ≥ 0, inflacja skumulowana, stopa realna, brak wartości ujemnych |
| `postep.test.ts` | 2 | Izolacja postępu dwóch kursów |
| `tresc-markdown.test.ts` | 1 | Tabela stopy realnej |
| `platforma.spec.ts` (e2e) | 3 | Duża strata w kalkulatorze, inflacja skumulowana, lekcja 9.1 |
| `strony.spec.ts` (e2e) | 1 | Strona `/zrodla/` |

**Ścieżki użytkownika** (testy e2e):

- pulpit, ukończenie i cofnięcie lekcji;
- kontynuacja nauki, quizy i zapis wyniku w postępie;
- ustawienia, eksport i usunięcie danych, uszkodzone dane;
- nawigacja między lekcjami, menu na telefonie;
- trzy kalkulatory z polskimi formatami liczb.

**Widoki mobilne (390 px)** — brak przewijania poziomego i błędów konsoli, sprawdzone zrzutami:

- `/platforma/narzedzia/inflacja/`;
- lekcja 9.1;
- `/jdg-b2b/`, `/zrodla/`, `/ikze/`.

Pozostałe strony pokrywa e2e na emulacji telefonu.

**Niezależne obliczenia:** 12 przypadków kalkulatorów zgodnych z Pythonem po poprawce C-01. Przykłady w lekcjach zgodne z kalkulatorami:

- 16 289 zł — procent składany;
- 1 639 zł — kalkulator inflacji;
- 63,9% — inflacja skumulowana;
- 2,44% — stopa realna.

**Regresja wykryta i usunięta w trakcie:** jeden nowy test e2e szukał podpisu tabeli w złym elemencie (podpis jest pod tabelą, w `figure`). Poprawiono selektor testu, nie aplikację.

## 8. Podział wykonanych prac

| Kategoria | Zawartość |
| --- | --- |
| **Wykonane i sprawdzone** (testem lub w przeglądarce) | Wszystkie naprawy z sekcji 4; nowe testy; build; widoki mobilne zmienionych stron; niezależne przeliczenia |
| **Wykonane, nieweryfikowane zewnętrznie** | Treść poprawek prawnych (A-01, A-03, B-01, B-03, B-04); klasyfikacja „brzmienie / wniosek” 98 twierdzeń; nowe twierdzenie `sus-podstawa-pracownik`; opisy w lekcjach. Zgodne z tekstem aktów według autora, bez recenzji eksperta |
| **Tylko przeanalizowane** | Bezpieczeństwo wstawiania HTML (E-04); SEO (metadane, `noindex`, mapa strony tylko z `SITE_URL`); obsługa błędów (strona 404, uszkodzone dane — testy e2e); wydajność (statyczne strony, lokalne fonty, brak frameworka) — bez pomiarów Lighthouse |
| **Wymagające eksperta** | 36 pytań w `docs/pytania-do-ekspertow.md`; 6 akapitów „Do potwierdzenia” w lekcjach; 3 twierdzenia „wniosek” |
| **Niewykonane** | Lint (brak w projekcie); pomiar wydajności; ponowna weryfikacja 18 twierdzeń z datą 13.11; B-08, B-09, A-08, A-09, C-08, E-02; push (zgodnie z poleceniem) |

## 9. Ograniczenia audytu

- Dostęp do źródeł: tylko teksty aktów (ELI). Bez praktyki ZUS, interpretacji, orzecznictwa i komentarzy.
- Strona KNF (twierdzenie `knf-dobre-praktyki`) nie była ponownie otwierana.
- Testy w przeglądarce działają tylko w Chromium (komputer i emulacja telefonu). Bez Safari, Firefoksa i prawdziwych urządzeń. Czytnika ekranu nie testowano ręcznie.
- Ocena jakości edukacyjnej jest oceną autora treści, nie osoby z grupy docelowej.

## 10. Stan repozytorium

Zmiany są zapisane w lokalnym repozytorium na gałęzi `claude/laughing-brown-837njb`. Zgodnie z poleceniem **nie wykonano push**. Kontener sesji jest tymczasowy: dopóki zmiany nie zostaną wypchnięte, istnieją tylko tutaj.

## 11. Gotowość do kolejnego etapu

| Kolejny etap | Gotowość |
| --- | --- |
| Recenzja ekspercka (ZUS, podatki) | **Gotowe** — materiały, pytania i oznaczenia są przygotowane |
| Opinia prawna | **Gotowe do zlecenia** — pytania R-01 do R-07 |
| Rozbudowa o moduły bez blokad (8, 10, 11) | Możliwa technicznie; wymaga polecenia i weryfikacji przepisów |
| Drugi kurs | Architektura gotowa w warstwie danych; przed udostępnieniem trzeba wykonać T-1 i T-2 oraz uzyskać opinię R-07 |
| Publikacja i sprzedaż | **Nie** — 6 blokad publikacji bez zmian |

**Następny konkretny krok:** wysłać `docs/pytania-do-ekspertow.md` (sekcje 1 i 2) do specjalisty ds. ubezpieczeń społecznych i doradcy podatkowego. Równolegle przeprowadzić pierwsze rozmowy z grupą docelową.
