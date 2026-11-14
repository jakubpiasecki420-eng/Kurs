# Harmonogram realizacji

Stan na dzień: **13 listopada 2026 r.**

## 1. Stan faz z CLAUDE.md

| Faza | Zakres | Stan |
| --- | --- | --- |
| 0 | Audyt repozytorium | Zrobione. Repozytorium zawierało wyłącznie dwa dokumenty analityczne; przeniesione do `docs/archiwum/` |
| 1 | Design system i branding | Zrobione: tokeny, typografia, komponenty, logo w ośmiu plikach SVG, favicon, avatar, grafika OG |
| 2 | Strona główna | Zrobione |
| 3 | Podstrony edukacyjne | Zrobione jako wersja robocza: IKE, IKZE, OKI, JDG/B2B, źródła, o projekcie, kontakt, artykuły; od etapu 1 platformy także program, jak uczymy, biblioteka (dawna strona produktu przekierowuje na program) |
| 4 | Kalkulator | Zrobione: kalkulator oszczędzania z testami. Mechanika IKZE jako biblioteka, bez interfejsu |
| 5 | Treści i publikacje | Częściowo: szablon artykułu ze schematem, jeden artykuł, struktura przewodnika i zeszytu ćwiczeń, szkice rozdziałów 0, 2, 4 i 9 przewodnika ze składem PDF (`npm run przewodnik`) |
| 6 | Walidacja | Częściowo: testy jednostkowe, testy w przeglądarce, automatyczne testy dostępności. Brak recenzji eksperckiej i prawnej |

## 1a. Etapy platformy edukacyjnej

| Etap | Zakres | Stan |
| --- | --- | --- |
| 1. Fundamenty platformy | Strefa kursanta (pulpit, program, moduł, lekcja, postęp, narzędzia, ustawienia), model kurs → moduł → lekcja, postęp w przeglądarce za wymiennym magazynem, centrum narzędzi, strony „Program”, „Jak uczymy”, „Biblioteka” | **Zrobione 13 listopada 2026 r.** Wersja demonstracyjna, bez kont. Opis: `architektura-platformy.md` |
| 2. Treść pierwszego kursu | Lekcje modułów bez blokad (1, 2, 4, 9, 12) na podstawie szkiców przewodnika i rejestru; kalkulatory procentu składanego i inflacji; wspólne przykłady obliczeniowe dla lekcji i PDF | **Zrobione 14 listopada 2026 r.** 12 lekcji w 5 modułach, wersja robocza przed recenzją. Moduły 3, 5–8, 10, 11 czekają: 3 i 5–7 na recenzję podatkową, 8, 10 i 11 na polecenie właściciela |
| 3. Konta i ochrona treści | Logowanie, magazyn serwerowy, przeniesienie postępu z przeglądarki, renderowanie lekcji po stronie serwera | Po polityce prywatności i wyborze hostingu |
| 4. Sprzedaż dostępu | Płatności, regulamin, zwroty | Po progach walidacji i recenzji |

## 2. Ścieżka krytyczna do publikacji

Kolejność wynika z zależności, nie z dat. Terminy są orientacyjne i zakładają 10–15 godzin tygodniowo.

| Krok | Kto | Zależy od | Orientacyjnie |
| --- | --- | --- | --- |
| 1. Dziesięć rozmów z osobami na JDG/B2B (`docs/walidacja/scenariusz-rozmow.md`) | Właściciel | — | listopad 2026 |
| 2. Dane podmiotu i adres kontaktowy w konfiguracji | Właściciel | — | listopad 2026 |
| 3. Zapytania ofertowe do doradców podatkowych (`docs/walidacja/zapytanie-do-doradcy.md`) | Właściciel | — | listopad 2026 |
| 4. Badanie nazw i wybór domeny (PR-5, WL-2) | Właściciel, prawnik | — | listopad–grudzień 2026 |
| 5. Polityka prywatności i regulamin (PR-3) | Prawnik lub wzór kancelarii | krok 2 | grudzień 2026 |
| 6. Recenzja podatkowa stron i rejestru | Doradca podatkowy | krok 3; zlecenie dopiero po spełnieniu progu z kroku 1 | grudzień 2026 |
| 7. Poprawki po recenzji, wpis recenzji do konfiguracji | Claude Code | krok 6 | grudzień 2026 |
| 8. Wdrożenie na hosting, włączenie indeksowania | Właściciel, Claude Code | kroki 2, 4, 5, 7; `npm run gotowosc` bez blokad | styczeń 2027 |
| 9. Uruchomienie listy zainteresowanych | Właściciel | kroki 5 i 8 | styczeń 2027 |
| 10. Lekcje kursu na platformie; materiały uzupełniające (PDF, zeszyt ćwiczeń) | Claude Code, recenzent | krok 6 | styczeń–luty 2027 |
| 11. Przedsprzedaż | Właściciel | kroki 9 i 10, PR-4, KS-1 do KS-5, próg 300 zapisów | luty–marzec 2027 |
| 12. Premiera kursu na platformie | — | próg 30 zamówień; konta i ochrona treści (etap 3 platformy) | marzec 2027 lub później |

Zmiana wobec wcześniejszego planu: premiera przesuwa się z lutego na marzec 2027 r. Powód: lista zainteresowanych nie może ruszyć przed polityką prywatności, a strony nie mogą być publiczne przed recenzją. Sezon rozliczeń rocznych trwa do końca kwietnia, więc okno pozostaje otwarte.

## 3. Najbliższe prace w repozytorium

Możliwe bez czekania na opinie zewnętrzne (każdy punkt wymaga osobnego polecenia właściciela):

1. Lekcje modułów 8 (PPK i PPE), 10 (podstawy inwestowania) i 11 (porównywanie ofert) — po zweryfikowaniu potrzebnych przepisów w źródłach pierwotnych.
2. Rozdziały przewodnika PDF odpowiadające lekcjom modułów 1 i 12.
3. Kolejne artykuły oparte wyłącznie na twierdzeniach ze statusem P.
4. Konfiguracja wdrożenia na wybrany hosting statyczny.

Wstrzymane do czasu opinii: kalkulator IKZE w interfejsie, moduły 3 i 5–7 kursu oraz rozdziały 5–7 przewodnika, porównanie kont według formy opodatkowania, formularz zapisu, sprzedaż.
