# Harmonogram realizacji

Stan na dzień: **13 listopada 2026 r.**

## 1. Stan faz z CLAUDE.md

| Faza | Zakres | Stan |
| --- | --- | --- |
| 0 | Audyt repozytorium | Zrobione. Repozytorium zawierało wyłącznie dwa dokumenty analityczne; przeniesione do `docs/archiwum/` |
| 1 | Design system i branding | Zrobione: tokeny, typografia, komponenty, logo w ośmiu plikach SVG, favicon, avatar, grafika OG |
| 2 | Strona główna | Zrobione |
| 3 | Podstrony edukacyjne | Zrobione jako wersja robocza: IKE, IKZE, OKI, JDG/B2B, źródła, o projekcie, produkt, kontakt, artykuły |
| 4 | Kalkulator | Zrobione: kalkulator oszczędzania z testami. Mechanika IKZE jako biblioteka, bez interfejsu |
| 5 | Treści i publikacje | Częściowo: szablon artykułu ze schematem, jeden artykuł, struktura przewodnika i zeszytu ćwiczeń |
| 6 | Walidacja | Częściowo: testy jednostkowe, testy w przeglądarce, automatyczne testy dostępności. Brak recenzji eksperckiej i prawnej |

## 2. Ścieżka krytyczna do publikacji

Kolejność wynika z zależności, nie z dat. Terminy są orientacyjne i zakładają 10–15 godzin tygodniowo.

| Krok | Kto | Zależy od | Orientacyjnie |
| --- | --- | --- | --- |
| 1. Dziesięć rozmów z osobami na JDG/B2B | Właściciel | — | listopad 2026 |
| 2. Dane podmiotu i adres kontaktowy w konfiguracji | Właściciel | — | listopad 2026 |
| 3. Zapytania ofertowe do doradców podatkowych (zakres DP-1 do DP-7) | Właściciel | — | listopad 2026 |
| 4. Badanie nazw i wybór domeny (PR-5, WL-2) | Właściciel, prawnik | — | listopad–grudzień 2026 |
| 5. Polityka prywatności i regulamin (PR-3) | Prawnik lub wzór kancelarii | krok 2 | grudzień 2026 |
| 6. Recenzja podatkowa stron i rejestru | Doradca podatkowy | krok 3 | grudzień 2026 |
| 7. Poprawki po recenzji, wpis recenzji do konfiguracji | Claude Code | krok 6 | grudzień 2026 |
| 8. Wdrożenie na hosting, włączenie indeksowania | Właściciel, Claude Code | kroki 2, 4, 5, 7; `npm run gotowosc` bez blokad | styczeń 2027 |
| 9. Uruchomienie listy zainteresowanych | Właściciel | kroki 5 i 8 | styczeń 2027 |
| 10. Treść przewodnika, arkusz, zeszyt ćwiczeń | Claude Code, recenzent | krok 6 | styczeń–luty 2027 |
| 11. Przedsprzedaż | Właściciel | kroki 9 i 10, PR-4, KS-1 do KS-5, próg 300 zapisów | luty–marzec 2027 |
| 12. Premiera przewodnika | — | próg 30 zamówień | marzec 2027 |

Zmiana wobec wcześniejszego planu: premiera przesuwa się z lutego na marzec 2027 r. Powód: lista zainteresowanych nie może ruszyć przed polityką prywatności, a strony nie mogą być publiczne przed recenzją. Sezon rozliczeń rocznych trwa do końca kwietnia, więc okno pozostaje otwarte.

## 3. Najbliższe prace w repozytorium

Możliwe bez czekania na opinie zewnętrzne:

1. Kolejne artykuły oparte wyłącznie na twierdzeniach ze statusem P.
2. Treść rozdziałów 1, 2, 4, 9 i 12 przewodnika (nie zależą od DP-1 do DP-5).
3. Szablon PDF przewodnika i zeszytu ćwiczeń w identyfikacji marki.
4. Arkusz kalkulatora oszczędzania (część bez podatków).
5. Konfiguracja wdrożenia na wybrany hosting statyczny.

Wstrzymane do czasu opinii: kalkulator IKZE w interfejsie, rozdziały 5–7 przewodnika, porównanie kont według formy opodatkowania, formularz zapisu, sprzedaż.
