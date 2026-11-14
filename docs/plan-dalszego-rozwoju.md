# Plan dalszego rozwoju po etapie 2C

Stan na dzień: **14 listopada 2026 r.**

Kolejność wynika z zależności. Każdy etap wymaga osobnego polecenia właściciela (CLAUDE.md, sekcja 11). Ścieżka publikacji i terminy: `docs/harmonogram.md`.

## 0. Najbliższy krok

1. Wysłać do ekspertów:
   - `docs/pytania-do-ekspertow.md`;
   - `docs/audyt-kontrolny-etap-2b.md`;
   - dostęp do strony w wersji roboczej.
   Najpierw sekcja „ZUS i ubezpieczenia społeczne” i „Podatki” — od nich zależy usunięcie oznaczeń w lekcjach 1.2, 2.1, 2.2, 4.2 i 12.2.
2. Równolegle przeprowadzić rozmowy z grupą docelową (`docs/walidacja/scenariusz-rozmow.md`).

## 1. Zadania techniczne

| Nr | Zadanie | Zależy od | Wielkość |
| --- | --- | --- | --- |
| T-1 | Lista kursów zamiast jednej stałej `ID_KURSU_AKTYWNEGO`: pulpit, menu, panel postępu i program dla wielu kursów (`docs/architektura-wielokursowa.md`, sekcja 2) | Decyzja o drugim kursie | średnia |
| T-2 | Pola `kolejnosc`, `grupaDocelowa`, `wymagaRecenzji` w schemacie kursu; blokady gotowości osobno dla każdego kursu | T-1 | mała |
| T-3 | Miejsce na notatki kursanta (zapisywane jak postęp, w przeglądarce) — ćwiczenia „Zapisz u siebie” | Decyzja właściciela | średnia |
| T-4 | Rozdzielenie twierdzeń z kilkoma liczbami (np. stawka OKI: 19% stopy referencyjnej, minimum 0,1%) albo pola `wartosci`, żeby usunąć liczby wpisane w komponent `/oki/` | — | mała |
| T-5 | Artykuły renderowane tym samym mechanizmem co lekcje (`{{id}}`, `[^id]`, dyrektywy), żeby liczby w artykułach pochodziły z rejestru | — | mała |
| T-6 | Kalkulator oszczędzania: opcjonalny kafel „realna stopa zwrotu po kosztach” | Decyzja właściciela | mała |
| T-7 | Skrypt lint (np. ESLint z konfiguracją Astro) — obecnie projekt nie ma lintera | — | mała |
| T-8 | Test wizualny (porównanie zrzutów) dla najważniejszych widoków | — | średnia |
| T-9 | Konfiguracja hostingu statycznego bez włączania indeksowania | Wybór domeny (WL-2) | mała |

## 2. Zadania merytoryczne (bez ekspertów)

| Nr | Zadanie | Uwagi |
| --- | --- | --- |
| M-1 | Moduł 8 (PPK i PPE): weryfikacja ustawy o PPK w źródle pierwotnym, twierdzenia P, lekcje | Dla przedsiębiorcy PPK dotyczy głównie zatrudniania pracowników — zakres do ustalenia |
| M-2 | Moduł 10 (podstawy inwestowania): ryzyko, dywersyfikacja, koszty, horyzont — bez instrumentów | Uwaga na granicę doradztwa (pytanie R-02) |
| M-3 | Moduł 11 (porównywanie ofert): pytania do instytucji i tabela opłat | Część pytań już jest w lekcji 4.2 |
| M-4 | Rozdziały PDF 1 i 12 złożone z gotowych lekcji | — |
| M-5 | Słowniczek pojęć dla kursu | Pojęcia są objaśnione przy pierwszym użyciu |
| M-6 | Ponowna weryfikacja twierdzeń nieużywanych w treści (doradztwo, konsument, nazwy, KNF) — data 13.11.2026 | Przed opinią prawną |

## 3. Zadania wymagające ekspertów

| Nr | Zadanie | Ekspert | Pytania |
| --- | --- | --- | --- |
| E-1 | Recenzja modułów 1 i 2 i usunięcie oznaczeń „Do potwierdzenia” | Specjalista ds. ubezpieczeń społecznych | Z-01 do Z-08 |
| E-2 | Recenzja modułów 4 i 12, stron IKE, IKZE, JDG/B2B | Doradca podatkowy | T-01 do T-04, T-11, T-12 |
| E-3 | Moduły 3, 5, 6, 7 (forma pracy, IKZE, OKI, trzy konta) | Doradca podatkowy | T-05 do T-10 |
| E-4 | Kalkulator ulgi IKZE i porównanie IKE/IKZE w interfejsie | Doradca podatkowy | T-05 |
| E-5 | Opinia o nazwach IKE/IKZE/OKI i granicy edukacji i doradztwa | Prawnik | R-01 do R-03 |
| E-6 | Wpis recenzji do `src/config/serwis.json` (imię, nazwisko, numer wpisu) — dopiero po wykonaniu | Właściciel | — |

## 4. Przygotowanie drugiego kursu „Start młodego inwestora”

| Nr | Zadanie | Uwagi |
| --- | --- | --- |
| K-1 | Decyzja właściciela: grupa docelowa (wiek, w tym czy osoby niepełnoletnie), cel, zakres | Pytanie R-07 do prawnika przed projektem treści |
| K-2 | Program kursu (moduły, cele) w pliku `src/content/kursy/start-mlodego-inwestora.json` ze stanem „w-przygotowaniu” | Bez lekcji i bez fikcyjnych treści |
| K-3 | T-1 i T-2 (wielokursowość) | Przed udostępnieniem drugiego kursu kursantom |
| K-4 | Lista przepisów do weryfikacji (IKE dla młodych, podatek od zysków kapitałowych, OKI) | Każde twierdzenie po przeczytaniu aktu |
| K-5 | Recenzja inwestycyjna i prawna koncepcji | Pytania I-03, R-07 |
| K-6 | Badanie nazwy kursu | Pytanie R-06 |

## 5. Przygotowanie sprzedaży

Blokady z `npm run gotowosc`: dane podmiotu, kontakt, recenzja podatkowa, opinia prawna, polityka prywatności, adres serwisu.

| Nr | Zadanie | Zależy od |
| --- | --- | --- |
| S-1 | Dane podmiotu i adres kontaktowy (WL-1) | Właściciel |
| S-2 | Polityka prywatności i regulamin z zasadami treści cyfrowych | Pytania S-01 do S-04 |
| S-3 | Rozliczenia: ryczałt, VAT, kasa, PKD | Pytania S-05, S-06 (księgowy) |
| S-4 | Recenzja ekspercka i opinia prawna wpisane do konfiguracji | E-1 do E-6 |
| S-5 | Włączenie indeksowania i listy zainteresowanych | S-1, S-2, S-4 |
| S-6 | Konta i płatności — dopiero po potwierdzeniu popytu (CLAUDE.md, sekcja 8) | Progi walidacji |

## 6. Rozwój marketingu

| Nr | Zadanie | Uwagi |
| --- | --- | --- |
| R-1 | 10 rozmów z grupą docelową; wnioski do `docs/walidacja/` | Najważniejszy krok niezależny od ekspertów |
| R-2 | Wybór jednego kanału społecznościowego (WL-4) | Po rozmowach |
| R-3 | Pierwsze materiały z serii „Liczby przyszłości” na podstawie przykładów z modułu 9 | Bez nazw IKE/IKZE/OKI w reklamie do czasu opinii R-01 |
| R-4 | Kontakt z biurami rachunkowymi | Po recenzji i z gotowym regulaminem |
| R-5 | Artykuły SEO oparte wyłącznie na twierdzeniach P | Po T-5 |
