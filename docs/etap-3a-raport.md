# Raport — Etap 3A: rozwój platformy i kursu „Emerytura pod kontrolą”

Data: **14 listopada 2026 r.** Gałąź: `claude/laughing-brown-837njb`. Punkt wyjścia: commit `1aae5c5` (Etap 2C), który przed rozpoczęciem pracy był już na zdalnej gałęzi, z czystym drzewem roboczym.

Ten plik jest przeznaczony do przekazania do sprawdzenia. Opisuje, co zrobiono, co sprawdzono testami, czego świadomie nie zrobiono i co dalej.

## 1. Najważniejsze w pięciu punktach

1. Kurs ma **20 lekcji w 8 z 13 modułów** (wcześniej 12 lekcji w 5 z 12). Doszło 8 lekcji i nowy moduł „Fundamenty bezpieczeństwa finansowego” na początku kursu.
2. Każda lekcja ma **podsumowanie**, a każdy moduł z lekcjami — **cele** („Po tym module”).
3. Nowe narzędzie: **kalkulator rezerwy finansowej** — w centrum narzędzi i w lekcji o rezerwie.
4. Strefa kursanta ma **katalog kursów** (`/platforma/kursy/`) i pola kursu przygotowujące platformę do kolejnych kursów. Drugi kurs nie powstał.
5. Wszystkie lekcje pozostają **wersją roboczą przed recenzją eksperta**. Żadna blokada publikacji nie została zdjęta.

## 2. Treść kursu

### Nowe lekcje

| Moduł | Lekcja | Co zawiera |
| --- | --- | --- |
| Fundamenty bezpieczeństwa finansowego (nowy) | Rezerwa finansowa przy nieregularnych dochodach | Cel rezerwy jako liczba miesięcy wydatków, kolejność budowania, kalkulator rezerwy |
| | Pieniądze firmy i pieniądze domowe | Rozdzielenie pieniędzy, stała „wypłata” dla siebie, odkładanie na zobowiązania |
| | Długi, rezerwa i cele długoterminowe | Kolejność celów; przykład: koszt długu a zysk z oszczędności |
| Podstawy inwestowania | Ryzyko, zmienność i możliwość straty | Ta sama średnia, różna zmienność, różny wynik — przykład na danych umownych |
| | Dywersyfikacja i horyzont inwestycji | Umowne aktywa X i Y oraz ich połączenie; horyzont a miejsce dla pieniędzy |
| | Jak rozpoznać obietnice bez pokrycia | Sygnały ostrzegawcze: gwarancja wysokiego zysku, presja czasu, brak kosztów i ryzyka |
| Jak porównywać instytucje i produkty | Rodzaje opłat i ich wpływ na wynik | Opłata od wpłat a opłata od aktywów — przykład na 20 lat |
| | Pytania do instytucji i tabela porównawcza | Lista pytań i szablon porównania bez wskazywania ofert |

Każda nowa lekcja ma quiz, podsumowanie, sekcję „Czego ta lekcja nie rozstrzyga” i neutralne płciowo formy. Nowe lekcje nie wprowadzają nowych twierdzeń o przepisach: jedyne twierdzenie z rejestru to cel inflacyjny NBP w lekcji o opłatach (status P). Przykłady liczbowe są oznaczone jako „Przykład obliczeniowy, nie prognoza” i opierają się na danych umownych.

### Zmiany w istniejących lekcjach

- Dodane podsumowania (po 3 punkty) we wszystkich 12 dotychczasowych lekcjach.
- Odwołania „lekcja 2.1”, „moduł 12” zastąpione tytułami — numeracja przesunęła się po dodaniu modułu na początku. Nowy test pilnuje, żeby numery nie wróciły.
- Lekcja „Twoje liczby w jednym miejscu” odsyła do lekcji o rezerwie i do modułu o porównywaniu ofert.
- Strona publiczna `/program/` nazywa moduły czekające na recenzję tytułami, a nie numerami.

### Program kursu

13 modułów. Moduł „Fundamenty bezpieczeństwa finansowego” jest pierwszy. Moduły „Twoja forma pracy”, „IKZE”, „OKI”, „Trzy konta obok siebie” i „PPK i PPE” nie mają lekcji. Szczegóły i status każdej lekcji: `docs/status-tresci-i-recenzji.md`.

Numeracja rozdziałów przewodnika PDF nie zmieniła się, więc rozdział N odpowiada teraz modułowi N+1 na platformie. Mapowanie jest w `produkt/przewodnik/struktura.md`.

## 3. Platforma i UX

| Zmiana | Gdzie |
| --- | --- |
| Panel „Po tym module” z celami modułu | `src/pages/platforma/kurs/[kurs]/[modul]/index.astro` |
| Sekcja „Podsumowanie” po treści lekcji | `src/pages/platforma/kurs/[kurs]/[modul]/[lekcja].astro` |
| Katalog kursów z grupą docelową, opisem, liczbą modułów i lekcji oraz postępem | `src/pages/platforma/kursy.astro`, link z pulpitu |
| Pola `kolejnosc`, `grupaDocelowa` (kurs), `cele` (moduł), `podsumowanie` (lekcja) — opcjonalne | `src/content.config.ts`, `src/lib/platforma/model.ts`, `kurs.ts`, `dane.ts` (`kursyWKolejnosci()`) |
| Znak minus „−” zamiast łącznika w liczbach procentowych | `src/lib/format.ts` (`procent`) |

Kontynuacja nauki, statusy modułów i postęp działają jak wcześniej i automatycznie objęły nowe lekcje (pierwsza lekcja kursu to teraz „Rezerwa finansowa przy nieregularnych dochodach”).

## 4. Centrum narzędzi

Nowy **kalkulator rezerwy finansowej** (`/platforma/narzedzia/rezerwa/`):

- dane: miesięczne wydatki, liczba miesięcy, kwota już odłożona, kwota odkładana co miesiąc;
- wynik: cel rezerwy, brakująca kwota, na ile miesięcy wystarcza obecna kwota, czas dojścia do celu;
- walidacja zakresów i liczby całkowitej miesięcy, komunikaty błędów przy polach, obsługa polskich formatów liczb, przycisk przywrócenia wartości przykładowych;
- pierwszy wynik w HTML (działa bez JavaScriptu), opis założeń w panelu „O narzędziu”;
- rachunek bez odsetek, inflacji i podatków — powiedziane wprost pod wynikiem. Liczba miesięcy nie wynika z przepisu i nie jest przez narzędzie rekomendowana.

Centrum ma teraz cztery dostępne narzędzia i trzy planowane. Kalkulator IKZE i porównanie IKE/IKZE nadal nie są podłączone do interfejsu.

## 5. Testy — co faktycznie uruchomiono

Wszystkie polecenia uruchomiono po ostatniej zmianie kodu i treści.

| Polecenie | Wynik |
| --- | --- |
| `npx vitest run` (`npm test`) | 16 plików, **315 testów — wszystkie przechodzą** |
| `npm run check` | 0 błędów, 0 ostrzeżeń |
| `npm run test:e2e` (budowanie + Playwright, projekty desktop i telefon) | **513 przechodzi, 1 pominięty**, 0 błędów. Pominięty test dotyczy najechania kursorem na wykres i celowo nie działa na telefonie |
| `npx astro build` | 63 strony, bez błędów |
| `npm run rejestr` | 108 twierdzeń, plik bez zmian |
| `npm run przewodnik` | PDF złożony (rozdziały 0, 2, 4, 9, C) |
| `npm run gotowosc` | 6 blokad publikacji — bez zmian względem Etapu 2C |

Nowe lub zmienione testy:

- `src/lib/kalkulator/rezerwa.test.ts` — rachunek, zaokrąglenie czasu w górę, brak odkładania, osiągnięty cel, walidacja;
- `src/lib/tresc-markdown.test.ts` — wartości czterech nowych przykładów policzone niezależnie od kodu;
- `src/lib/format.test.ts` — znak minus w procentach;
- `src/lib/platforma/tresc.test.ts` — lista modułów z lekcjami, puste moduły zablokowane, podsumowania i cele, zakaz odwołań numerycznych;
- `tests/e2e/platforma.spec.ts` — pulpit i program po zmianie programu, kalkulator rezerwy, katalog kursów, cele modułu i podsumowanie lekcji;
- `tests/e2e/strony.spec.ts` — 13 nowych adresów w kontroli dostępności (axe), przewijania w poziomie, metadanych i oznaczenia wersji roboczej.

Przegląd wizualny: zrzuty na telefonie (Pixel 7) katalogu kursów, kalkulatora rezerwy, strony modułu i lekcji z tabelą. Poprawka po przeglądzie: wiersz „Dla kogo” w katalogu był pogrubiony i wyglądał jak drugi nagłówek.

Test jakości quizów wykazał, że poprawna odpowiedź była zbyt często najdłuższa (43,6% pytań przy limicie 40%). Wydłużono 12 odpowiedzi błędnych w nowych lekcjach, bez zmiany odpowiedzi poprawnych.

## 6. Czego świadomie nie zrobiono

| Element | Powód |
| --- | --- |
| Lekcje modułów „Twoja forma pracy”, „IKZE”, „OKI”, „Trzy konta obok siebie” | Wstrzymane do recenzji podatkowej (CLAUDE.md, sekcja 11) |
| Kalkulator IKZE i porównanie IKE/IKZE w interfejsie | Jak wyżej |
| Lekcje modułu „PPK i PPE” | Ustawa o PPK nie została przeczytana w źródle pierwotnym; bez twierdzeń P nie piszemy treści o przepisach |
| Symulator scenariuszy emerytalnych | Ryzyko powrotu rachunku „na ile lat wystarczy kapitał”, usuniętego po audycie (pytanie R-03) |
| Treści o obowiązkach informacyjnych instytucji i granicy doradztwa | Ustawa o obrocie instrumentami finansowymi wymaga ponownej weryfikacji (wiele zmian po tekście jednolitym) |
| Drugi kurs, konta, baza danych, płatności, subskrypcje, CMS | Poza zakresem etapu |
| Pulpit, menu i strona postępu dla wielu kursów jednocześnie | Wymaga decyzji o drugim kursie; katalog kursów jest pierwszym krokiem |

## 7. Ograniczenia i ryzyka

- Lekcje o inwestowaniu i porównywaniu ofert są blisko granicy doradztwa. Nie wskazują instrumentów ani instytucji, ale ocena prawna jest potrzebna (R-02, nowe pytania I-04 do I-06).
- Lekcja o pieniądzach firmy i domu nie omawia przepisów podatkowych ani księgowych. To celowe, ale księgowy powinien ocenić, czy nie brakuje ostrzeżeń.
- Nie przeprowadzono pełnego ponownego audytu wcześniejszych lekcji — zgodnie z poleceniem testowano nową pracę.
- Wyniki testów automatycznych nie zastępują recenzji eksperckiej.

## 8. Zmienione dokumenty

`CLAUDE.md`, `README.md`, `docs/architektura-platformy.md`, `docs/architektura-wielokursowa.md`, `docs/plan-dalszego-rozwoju.md`, `docs/harmonogram.md`, `docs/zakres-produktu.md`, `docs/pytania-do-ekspertow.md`, `produkt/przewodnik/struktura.md`. Nowe: ten raport, `docs/plan-rozwoju-kursu.md`, `docs/status-tresci-i-recenzji.md`.

## 9. Co dalej

Do decyzji właściciela:

1. **Wysłać do ekspertów** `docs/pytania-do-ekspertow.md` i `docs/status-tresci-i-recenzji.md`. Najpilniejsze: doradca podatkowy (odblokowuje 4 moduły i kalkulator IKZE) oraz prawnik (granica doradztwa, nazwy IKE/IKZE/OKI).
2. **Moduł „PPK i PPE”** — polecenie weryfikacji ustawy o PPK i napisania lekcji (krok K3-1 w `docs/plan-rozwoju-kursu.md`).
3. **Rozdziały PDF** dla modułów, które mają lekcje, a nie mają rozdziału (K3-2).
4. **Rozmowy z grupą docelową** na podstawie działającej strefy kursanta (`docs/walidacja/scenariusz-rozmow.md`).

Pełny plan treści: `docs/plan-rozwoju-kursu.md`. Plan techniczny i drugi kurs: `docs/plan-dalszego-rozwoju.md`.
