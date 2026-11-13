# „Emerytura pod kontrolą” — struktura przewodnika PDF

Stan na dzień: **13 listopada 2026 r.** Zakres i granice: `docs/zakres-produktu.md`.

Format: A4, 60–80 stron, identyfikacja z `docs/marka.md`. Każdy rozdział powstaje według `szablon-rozdzialu.md`.

Kolumna „Twierdzenia” podaje identyfikatory z `src/data/rejestr.json`. Rozdział wolno pisać tylko na twierdzeniach ze statusem P. Kolumna „Blokada” wskazuje pytania z `docs/kwestie-do-weryfikacji.md`, które muszą być rozstrzygnięte przed napisaniem.

| Nr | Rozdział | Cel czytelnika | Twierdzenia | Blokada | Strony |
| --- | --- | --- | --- | --- | --- |
| 0 | Jak korzystać z przewodnika | Wie, co dostał, czego tu nie ma i jaki jest stan prawny | — | — | 2 |
| 1 | Jak działa system emerytalny | Rozumie, skąd bierze się świadczenie i dlaczego dodatkowe oszczędzanie jest jego decyzją | do uzupełnienia: ustawa o emeryturach i rentach z FUS | brak twierdzeń P | 5 |
| 2 | ZUS: co możesz sprawdzić | Otwiera informację o stanie konta i umie ją przeczytać | `zus-informacja-o-stanie-konta`, `zus-hipotetyczna-emerytura` | — | 5 |
| 3 | Twoja forma pracy | Wie, co z prowadzenia działalności wynika dla limitów i odliczeń | `ikze-dzialalnosc-definicja`, `ikze-ulga-na-start-wylaczenie`, `zdrowotna-podstawa` | DP-3, DP-4, DP-6 | 6 |
| 4 | IKE | Zna limit, warunki wypłaty i skutki zwrotu | `ike-*` | — | 6 |
| 5 | IKZE | Zna limit, sposób odliczenia przy swojej formie opodatkowania i podatek przy wypłacie | `ikze-*` | DP-1, DP-2 | 8 |
| 6 | OKI | Rozumie podatek od wartości aktywów i zwolnienia | `oki-*` | DP-5 | 6 |
| 7 | Trzy konta obok siebie | Umie ułożyć kolejność dla swojej formy opodatkowania | wszystkie powyższe | DP-1, DP-5, PR-2 | 8 |
| 8 | PPK i PPE | Wie, kiedy te programy go dotyczą | do uzupełnienia: ustawa o PPK | brak twierdzeń P | 3 |
| 9 | Inflacja i procent składany | Odróżnia wartość nominalną od realnej; umie czytać symulację | `nbp-cel-inflacyjny` | — | 5 |
| 10 | Podstawy inwestowania | Zna pojęcia: ryzyko, dywersyfikacja, koszty, horyzont | — (pojęcia; bez instrumentów) | PR-2 | 6 |
| 11 | Jak porównywać instytucje i produkty | Ma listę pytań i tabelę opłat do wypełnienia | `ike-wyplata-transferowa` | PR-2 | 4 |
| 12 | Twój plan | Ma wypełniony plan: rezerwa, kolejność, kwota, terminy, przegląd roczny | — | — | 6 |
| A | Checklisty | — | — | — | 3 |
| B | Słownik pojęć | — | — | — | 3 |
| C | Źródła i dziennik zmian | Widzi wszystkie przepisy i historię aktualizacji | cały rejestr, status P | — | 4 |

## Stan rozdziałów

| Rozdział | Plik | Stan |
| --- | --- | --- |
| 0 | `rozdzialy/00-jak-korzystac.md` | Szkic przed recenzją |
| 2 | `rozdzialy/02-zus.md` | Szkic przed recenzją |
| 4 | `rozdzialy/04-ike.md` | Szkic przed recenzją |
| 9 | `rozdzialy/09-inflacja-i-procent-skladany.md` | Szkic przed recenzją |
| C | generowany ze źródeł użytych w rozdziałach | Automatycznie |

Skład: `npm run przewodnik` tworzy `wydruki/emerytura-pod-kontrola-<wersja>.pdf`. Tabele i wykres w rozdziałach 4 i 9 powstają z bibliotek kalkulatora (dyrektywy `<!-- tabela:… -->` w treści), więc zmiana stawki w rejestrze aktualizuje przykłady.

## Kolejność pisania

1. Bez blokad: 0, 2, 4, 9 (gotowe), 12, A, B, C.
2. Po uzupełnieniu rejestru o nowe twierdzenia P: 1, 8.
3. Po recenzji doradcy podatkowego: 3, 5, 6, 7.
4. Po opinii prawnika: 10, 11.

## Elementy stałe każdej strony

- Stopka: nazwa przewodnika, numer wersji, data stanu prawnego.
- Przypisy na dole strony z przepisem; pełna lista w dodatku C.
- Ramka „Sprawdź u siebie” z zadaniem do wykonania we własnych dokumentach.
- Symulacje zawsze z tabelą założeń i dopiskiem, że są przykładem.

## Wersjonowanie

Wersja ma postać `RRRR.N`, np. `2027.1`. Każda zmiana liczby lub przepisu podnosi `N` i dostaje wpis w dzienniku zmian: data, co się zmieniło, identyfikator twierdzenia.
