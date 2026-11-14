# Status treści i recenzji — kurs „Emerytura pod kontrolą”

Stan na dzień: **14 listopada 2026 r.** (po Etapie 3A).

Wszystkie lekcje są **wersją roboczą przed recenzją eksperta**. Żadna recenzja nie została wykonana: `publikacja.recenzjaEksperta` w `src/config/serwis.json` ma wartość `null`, a każda lekcja pokazuje znacznik „Przed recenzją eksperta”. Ten dokument opisuje, co jest napisane, na czym się opiera i kto powinien to sprawdzić. Pytania do ekspertów: `docs/pytania-do-ekspertow.md`.

## Jak czytać tabele

- **Twierdzenia** — liczba twierdzeń z rejestru (`src/data/rejestr.json`, wyłącznie status P), na które lekcja się powołuje przypisem. Zero oznacza, że lekcja nie opisuje przepisów: tłumaczy pojęcia i rachunki na danych umownych.
- **Przykłady** — dyrektywy `<!-- tabela:… -->` lub `<!-- przyklad:… -->` z `src/lib/przyklady.ts`; rachunki są sprawdzane testami.
- **Oznaczenie** — akapit „Do potwierdzenia przez eksperta” w treści. Listę takich lekcji pilnuje test `tresc.test.ts`.
- **Recenzent** — rola eksperta, który powinien przeczytać lekcję. To propozycja, nie informacja o wykonanej recenzji.

## Podsumowanie

| | Liczba |
| --- | --- |
| Moduły w programie | 13 |
| Moduły z lekcjami | 8 |
| Lekcje | 20 (8 nowych w Etapie 3A) |
| Pytania w quizach | 55 |
| Łączny czas lekcji | około 164 min |
| Lekcje z oznaczeniem „Do potwierdzenia przez eksperta” | 5 |
| Lekcje bez żadnego twierdzenia z rejestru | 8 |
| Moduły zablokowane do czasu recenzji podatkowej | 4 |
| Moduły czekające na weryfikację przepisów | 1 („PPK i PPE”) |

## Moduły z lekcjami

### 1. Fundamenty bezpieczeństwa finansowego (nowy w Etapie 3A)

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Rezerwa finansowa przy nieregularnych dochodach | 8 min | 0 | 3 | kalkulator rezerwy | — | nie |
| Pieniądze firmy i pieniądze domowe | 7 min | 0 | 3 | — | — | nie |
| Długi, rezerwa i cele długoterminowe | 8 min | 0 | 3 | — | dług a oszczędności | nie |

Recenzent: ekspert finansów osobistych (bez wymogu doradcy podatkowego). Uwaga: lekcja o pieniądzach firmy i domu celowo nie opisuje przepisów podatkowych ani księgowych (np. rachunku VAT, wynagrodzenia właściciela) — rozważyć z księgowym, czy brak tych wątków nie wprowadza w błąd.

### 2. Jak działa system emerytalny

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Skąd bierze się emerytura z ZUS | 9 min | 11 | 3 | — | — | nie |
| Wiek emerytalny i najniższa emerytura | 10 min | 9 | 3 | — | — | **tak** |
| Podstawa składek i własne oszczędności | 10 min | 16 | 3 | — | składka emerytalna | nie |

Recenzent: specjalista ds. ubezpieczeń społecznych. Pytania Z-01 do Z-08.

### 3. ZUS: co możesz sprawdzić

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Informacja o stanie konta w ZUS | 7 min | 7 | 2 | — | — | **tak** |
| Jak czytać hipotetyczną emeryturę | 10 min | 9 | 3 | — | — | **tak** |

Recenzent: specjalista ds. ubezpieczeń społecznych. Pytania Z-01 do Z-08, T-01.

### 5. IKE

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| IKE: zasady i limit wpłat | 7 min | 11 | 3 | — | — | nie |
| IKE: wypłata, zwrot i zmiana instytucji | 11 min | 10 | 3 | — | zwrot całkowity, zwrot częściowy | **tak** |

Recenzent: doradca podatkowy. Pytania T-01 do T-04, R-01.

### 10. Inflacja i procent składany

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Inflacja i wartość realna | 7 min | 1 | 3 | kalkulator inflacji | inflacja, stopa realna | nie |
| Procent składany: zysk od zysku | 6 min | 0 | 3 | kalkulator procentu składanego | procent składany | nie |
| Regularne oszczędzanie, koszty i czytanie symulacji | 10 min | 1 | 3 | kalkulator oszczędzania | scenariusze, koszty | nie |

Recenzent: ekspert rynku kapitałowego lub finansów osobistych. Pytania I-01, I-02.

### 11. Podstawy inwestowania (lekcje nowe w Etapie 3A)

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Ryzyko, zmienność i możliwość straty | 9 min | 0 | 3 | kalkulator procentu składanego | zmienność | nie |
| Dywersyfikacja i horyzont inwestycji | 8 min | 0 | 3 | — | dywersyfikacja | nie |
| Jak rozpoznać obietnice bez pokrycia | 6 min | 0 | 2 | — | — | nie |

Recenzent: doradca inwestycyjny lub ekspert rynku kapitałowego; prawnik w zakresie granicy doradztwa. Pytania I-04, I-06, R-02. Lekcje nie wskazują instrumentów, funduszy, portfeli ani instytucji; przykłady dotyczą umownych aktywów „X” i „Y”.

### 12. Jak porównywać instytucje i produkty (lekcje nowe w Etapie 3A)

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Rodzaje opłat i ich wpływ na wynik | 8 min | 1 | 3 | kalkulator oszczędzania | opłaty | nie |
| Pytania do instytucji i tabela porównawcza | 6 min | 0 | 2 | — | — | nie |

Recenzent: ekspert rynku kapitałowego; prawnik (czy pytania nie sugerują wyboru instytucji). Pytania I-05, R-02. Lekcje celowo nie opisują przepisów o obowiązkach informacyjnych instytucji — wymagałoby to przeczytania aktów, których nie ma w rejestrze.

### 13. Twój plan

| Lekcja | Czas | Twierdzenia | Quiz | Narzędzie | Przykłady | Oznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| Twoje liczby w jednym miejscu | 10 min | 4 | 2 | kalkulator oszczędzania | — | nie |
| Kalendarz i przegląd roczny | 7 min | 8 | 2 | — | — | **tak** |

Recenzent: doradca podatkowy; prawnik (R-02, R-03).

## Moduły bez lekcji

| Moduł | Powód | Co odblokowuje |
| --- | --- | --- |
| 4. Twoja forma pracy | Zasady podatkowe zależne od formy opodatkowania (CLAUDE.md, sekcja 11) | Recenzja doradcy podatkowego, pytania T-05 do T-10 |
| 6. IKZE | Jak wyżej | Jak wyżej |
| 7. OKI | Jak wyżej; konto działa od 1 stycznia 2027 r. | Jak wyżej |
| 8. Trzy konta obok siebie | Porównanie kont według formy opodatkowania jest wstrzymane | Jak wyżej |
| 9. PPK i PPE | Ustawa o PPK nie została jeszcze przeczytana w źródle pierwotnym; brak twierdzeń w rejestrze | Weryfikacja aktu, twierdzenia P, decyzja o zakresie (dla przedsiębiorcy PPK dotyczy głównie zatrudniania pracowników) |

## Co sprawdzają testy, a czego nie

Testy (`src/lib/platforma/tresc.test.ts`, `src/lib/tresc-markdown.test.ts`, `tests/e2e/`) sprawdzają:

- że każde twierdzenie z pola `twierdzenia` ma przypis i status P;
- że w treści lekcji nie ma kwot ani stawek wpisanych ręcznie zamiast odwołań do rejestru;
- że każdy przykład renderuje się bez błędów, a kluczowe wartości (we wszystkich czterech nowych przykładach z Etapu 3A i w części wcześniejszych) zgadzają się z rachunkiem wykonanym niezależnie od kodu;
- że quizy mają co najmniej trzy odpowiedzi, rozłożone pozycje poprawnych odpowiedzi i że poprawna odpowiedź nie jest zwykle najdłuższa;
- że każda lekcja ma podsumowanie, a każdy moduł z lekcjami — cele;
- że treść nie odwołuje się do lekcji i modułów numerami;
- dostępność (axe, WCAG 2.1 AA) i brak przewijania w poziomie na telefonie i desktopie.

Testy **nie** sprawdzają merytorycznej poprawności interpretacji, kompletności tematów ani tego, czy treść nie przekracza granicy doradztwa. To zadanie recenzji eksperckiej.
