# Plan rozwoju kursu „Emerytura pod kontrolą”

Stan na dzień: **14 listopada 2026 r.** (po Etapie 3A). Każdy kolejny etap wymaga polecenia właściciela (CLAUDE.md, sekcja 11). Zadania techniczne, eksperckie i drugi kurs: `docs/plan-dalszego-rozwoju.md`. Status lekcji: `docs/status-tresci-i-recenzji.md`.

## 1. Docelowa ścieżka kursanta

Kurs prowadzi od porządku w bieżących finansach do własnego planu. Moduły są ułożone w siedmiu obszarach:

| Obszar | Moduły | Stan |
| --- | --- | --- |
| Fundamenty bezpieczeństwa | 1. Fundamenty bezpieczeństwa finansowego | 3 lekcje |
| System emerytalny i ZUS | 2. Jak działa system emerytalny; 3. ZUS: co możesz sprawdzić | 3 + 2 lekcje |
| Emerytura przedsiębiorcy | 4. Twoja forma pracy | czeka na recenzję podatkową |
| Konta emerytalne | 5. IKE; 6. IKZE; 7. OKI; 8. Trzy konta obok siebie; 9. PPK i PPE | IKE: 2 lekcje; IKZE, OKI, trzy konta — recenzja podatkowa; PPK i PPE — weryfikacja ustawy |
| Inwestowanie i ryzyko | 10. Inflacja i procent składany; 11. Podstawy inwestowania; 12. Jak porównywać instytucje i produkty | 3 + 3 + 2 lekcje |
| Budowanie kapitału | rozłożone w modułach 1, 10 i 12 (rezerwa, regularne odkładanie, koszty) | — |
| Długoterminowy plan | 13. Twój plan | 2 lekcje |

Moduły i lekcje nazywamy tytułami, nie numerami. Numer w tej tabeli służy tylko orientacji w obecnym programie.

## 2. Kolejne kroki bez udziału ekspertów

Kolejność według zależności i wartości dla kursanta.

| Nr | Zadanie | Warunek | Uwagi |
| --- | --- | --- | --- |
| K3-1 | Lekcje modułu „PPK i PPE” | Przeczytanie ustawy o PPK (ELI/ISAP) i dopisanie twierdzeń P do rejestru | Ustalić zakres: przedsiębiorca jako uczestnik (gdy ma też etat) i jako pracodawca. Bez twierdzeń W i Z |
| K3-2 | Rozdziały PDF dla modułów z lekcjami bez rozdziału | — | Mapowanie w `produkt/przewodnik/struktura.md`. Te same przykłady obliczeniowe co w lekcjach |
| K3-3 | Pulpit i postęp dla wielu kursów | Decyzja o drugim kursie | `docs/architektura-wielokursowa.md`, sekcja 2. Katalog kursów już istnieje |
| K3-4 | Notatki kursanta w przeglądarce dla ćwiczeń „Zapisz u siebie” | Decyzja właściciela | Zapis jak postęp, z eksportem; bez kont |
| K3-5 | Słowniczek pojęć | — | Pojęcia z lekcji z odesłaniem do miejsca pierwszego użycia |
| K3-6 | Ponowna weryfikacja ustawy o obrocie instrumentami finansowymi (granica doradztwa) | — | Tekst jednolity ma wiele późniejszych zmian; potrzebne przed opinią prawną (R-02) |

## 3. Kroki zależne od ekspertów

| Nr | Zadanie | Ekspert | Pytania |
| --- | --- | --- | --- |
| K3-7 | Lekcje modułów „Twoja forma pracy”, „IKZE”, „OKI”, „Trzy konta obok siebie” | Doradca podatkowy | T-05 do T-10 |
| K3-8 | Kalkulator ulgi IKZE i porównanie IKE/IKZE w interfejsie | Doradca podatkowy | T-05 |
| K3-9 | Usunięcie oznaczeń „Do potwierdzenia przez eksperta” w pięciu lekcjach | Specjalista ds. ubezpieczeń społecznych, doradca podatkowy | Z-01 do Z-08, T-01 do T-04 |
| K3-10 | Recenzja lekcji o inwestowaniu i porównywaniu ofert | Ekspert rynku kapitałowego, prawnik | I-04 do I-06, R-02 |
| K3-11 | Przykład przeliczenia emerytury brutto na netto w module „Twój plan” | Doradca podatkowy | T-01 |

## 4. Czego świadomie nie robimy

- Symulatora scenariuszy emerytalnych, który przelicza kapitał na liczbę lat wypłat — wymaga rozstrzygnięcia R-03 i zasad podatku przy wypłacie.
- Rekomendacji instrumentów, funduszy, portfeli i instytucji.
- Kont użytkowników, bazy danych, płatności i subskrypcji (CLAUDE.md, sekcja 8).
- Drugiego kursu „Start młodego inwestora” — tylko przygotowanie architektury.

## 5. Kryteria gotowości modułu

Moduł uznajemy za gotowy do recenzji, gdy:

1. Każde twierdzenie o przepisach ma status P w rejestrze i przypis w treści.
2. Lekcje mają podsumowanie, quiz spełniający test jakości i sekcję „Czego ta lekcja nie rozstrzyga”.
3. Moduł ma cele, a przykłady obliczeniowe pochodzą z `src/lib/przyklady.ts` i mają testy wartości.
4. Niejednoznaczne fragmenty mają oznaczenie „Do potwierdzenia przez eksperta” i pytanie w `docs/pytania-do-ekspertow.md`.
5. Testy jednostkowe, budowanie i testy w przeglądarce przechodzą.
