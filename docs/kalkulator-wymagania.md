# Wymagania dla kalkulatorów

Stan na dzień: **13 listopada 2026 r.**

## 1. Kalkulator scenariuszy oszczędzania — zbudowany

Adresy: `/kalkulator/` (strona publiczna), `/platforma/narzedzia/oszczedzanie/` (centrum narzędzi), lekcja 1.1 kursu demonstracyjnego (osadzenie w lekcji). Opis w rejestrze narzędzi: `src/lib/platforma/narzedzia.ts`. Ograniczenie: jeden kalkulator na stronę (stałe identyfikatory pól). Kod: `src/lib/kalkulator/oszczednosci.ts`, `src/lib/kalkulator/wykres.ts`, `src/components/Kalkulator.astro`.

### Dane wejściowe

| Pole | Zakres | Wartość początkowa | Uzasadnienie wartości początkowej |
| --- | --- | --- | --- |
| Wpłata miesięczna | 1–100 000 zł | 500 zł | Okrągła kwota przykładowa |
| Okres | 1–50 lat, pełne lata | 20 lat | — |
| Roczna stopa zwrotu | od −20% do 20% | 2,5% | Równa inflacji: scenariusz „oszczędności utrzymują siłę nabywczą”. Nie sugeruje zysku |
| Roczna inflacja | od −5% do 20% | 2,5% | Cel inflacyjny NBP (rejestr: `nbp-cel-inflacyjny`) |
| Roczne koszty | 0–5% | 0% | Pole opcjonalne |

Przyciski wariantów stopy zwrotu: −2%, 0%, 2,5%, 5%, 7%. Wariant ujemny i zerowy są obowiązkowe — użytkownik ma zobaczyć także niekorzystny scenariusz.

### Metoda

1. Roczny mnożnik netto = (1 + stopa zwrotu) × (1 − koszty).
2. Mnożnik miesięczny = pierwiastek 12. stopnia z mnożnika rocznego.
3. Wpłata na koniec każdego miesiąca, stała nominalnie.
4. Wartość realna = wartość nominalna / (1 + inflacja)^lata.

### Wyniki

Suma wpłat, wartość nominalna, wartość w dzisiejszych pieniądzach, różnica między wartością nominalną a wpłatami, wykres liniowy trzech serii, tabela rok po roku. Kwoty są zaokrąglane do pełnych złotych wyłącznie przy wyświetlaniu.

### Zasady, których kalkulator musi się trzymać

- Wynik jest oznaczony jako symulacja. Słowa „prognoza” i „zysk” nie pojawiają się w opisie wyniku.
- Założenia i metoda są widoczne na stronie.
- Błędne dane nie zmieniają wyniku; poprzedni wynik zostaje przygaszony, a pole dostaje komunikat.
- Każdą wartość z wykresu można odczytać bez myszy: z tabeli albo klawiszami strzałek.
- Kalkulator nie zawiera żadnych zasad podatkowych.
- Pierwszy wynik powstaje przy budowaniu strony, więc jest widoczny bez JavaScriptu.

### Testy

- Jednostkowe (`npm test`): zgodność ze wzorem zamkniętym, przypadki brzegowe (stopa zero, stopa ujemna, koszty równe stopie), liniowość, walidacja, osie i etykiety wykresu.
- W przeglądarce (`npm run test:e2e`): przeliczanie, zapis z przecinkiem, komunikaty błędów, warianty, tabela, obsługa klawiaturą, dymek, dostępność.

## 2. Mechanika podatkowa IKZE — biblioteka bez interfejsu

Kod: `src/lib/kalkulator/ikze.ts`. Funkcje: `odliczenie()` oraz `ikzeWzgledemIke()`. Są pokryte testami i pobierają limity z rejestru.

**Nie wolno ich podłączać do strony ani arkusza przed recenzją doradcy podatkowego.** Powody:

- wniosek porównawczy ma status „założenie własne” (`z-ikze-wzgledem-ike`),
- nierozstrzygnięte pytania DP-1 do DP-5 z `kwestie-do-weryfikacji.md`.

Po recenzji kalkulator IKZE powinien:

1. przyjmować formę opodatkowania i stawkę, roczną wpłatę oraz informację, czy użytkownik prowadzi działalność,
2. pokazywać kwotę odliczenia, zmniejszenie podatku w roku wpłaty i podatek przy wypłacie,
3. przy każdej liczbie podawać przepis z rejestru,
4. nie kończyć się zdaniem „wybierz IKZE” ani „wybierz IKE”.

## 3. Arkusz dołączony do przewodnika

Zakres: te same obliczenia co w obu kalkulatorach, w formie arkusza z odblokowanymi formułami. Powstaje po recenzji podatkowej. Każda formuła musi mieć odpowiednik w bibliotece `src/lib/kalkulator/` i test porównujący wyniki.
