# System aktualizacji informacji prawnych i podatkowych

Stan na dzień: **14 listopada 2026 r.**

## 1. Jedno źródło prawdy

Wszystkie limity, stawki, warunki i przepisy są zapisane w **`src/data/rejestr.json`**. Strony, kalkulatory i dokumenty pobierają je stamtąd.

Każde twierdzenie ma:

| Pole | Znaczenie |
| --- | --- |
| `id` | Stały identyfikator, np. `ikze-limit-2027` |
| `tresc` | Twierdzenie pełnym zdaniem |
| `wartosc`, `jednostka`, `rok` | Liczba, jeśli twierdzenie ją zawiera |
| `zrodlo` | Klucz źródła z sekcji `zrodla` |
| `przepis` | Artykuł, ustęp, punkt |
| `status` | `P` źródło pierwotne, `W` źródło wtórne, `Z` założenie własne |
| `sprawdzono` | Data ostatniego sprawdzenia w źródle |
| `przeglad` | Data, do której trzeba sprawdzić ponownie |
| `interpretacja` | Tylko dla statusu P: `brzmienie` — streszczenie przepisu; `wniosek` — połączenie przepisów albo wniosek autora, wymaga potwierdzenia przez eksperta |
| `uwagi` | Ograniczenia interpretacji; obowiązkowe dla `wniosek` |
| `obowiazujeOd` | Data, od której przepis się stosuje, gdy jeszcze nie obowiązuje albo data jest istotna (np. OKI od 1 stycznia 2027 r.) |

Status P nie oznacza poprawnej interpretacji. Weryfikacja ma cztery niezależne poziomy:

| Poziom | Co potwierdza | Gdzie zapisane |
| --- | --- | --- |
| 1. Treść przepisu | Przepis istnieje i mówi to, co twierdzenie (status P, data `sprawdzono`) | rejestr |
| 2. Interpretacja | Czy twierdzenie streszcza przepis, czy wyciąga wniosek (`interpretacja`) | rejestr |
| 3. Przedstawienie w lekcji | Czy lekcja nie upraszcza przepisu za bardzo; miejsca niejednoznaczne mają akapit „Do potwierdzenia przez eksperta” | lekcje, raporty etapów |
| 4. Przykład liczbowy | Czy liczby są policzone poprawnie | testy jednostkowe z niezależnym przeliczeniem |

Poziomy 2 i 3 potwierdza ostatecznie recenzent. Do czasu recenzji serwis ma status wersji roboczej.

## 2. Zabezpieczenia w kodzie

| Zabezpieczenie | Gdzie | Co robi |
| --- | --- | --- |
| Tylko status P na stronie | `src/lib/rejestr.ts`, funkcja `przypisy()` | Strona się nie zbuduje, jeśli użyje twierdzenia ze statusem W lub Z |
| Komplet pól | `src/lib/rejestr.test.ts` | Test nie przejdzie, jeśli twierdzeniu brakuje źródła, przepisu lub dat, jeśli twierdzenie P nie ma pola `interpretacja` albo wniosek nie ma uwag, albo jeśli data sprawdzenia jest późniejsza niż stan prawny |
| Tylko P w lekcjach | `src/lib/tresc-markdown.ts`, `src/lib/platforma/tresc.test.ts` | Lekcja się nie zbuduje, jeśli użyje twierdzenia niezadeklarowanego albo innego niż P; test sprawdza, że każde zadeklarowane twierdzenie ma przypis |
| Spójność limitów | ten sam test | Limity IKE i IKZE muszą wynikać z jednej prognozy wynagrodzenia |
| Źródła artykułów | `src/content.config.ts` | Artykuł bez dat i listy twierdzeń nie przejdzie walidacji |
| Przeterminowane przeglądy | `npm run gotowosc` | Blokada publikacji, gdy minęła data z pola `przeglad` |
| Status wersji roboczej | `src/config/serwis.json` | Do czasu recenzji baner na każdej stronie i blokada indeksowania |

## 3. Kalendarz

| Kiedy | Co | Gdzie sprawdzić | Co zmienić |
| --- | --- | --- | --- |
| Październik–grudzień | Limity IKE i IKZE na kolejny rok | Monitor Polski, obwieszczenia ministra właściwego do spraw zabezpieczenia społecznego | Nowe twierdzenia `*-limit-RRRR`; strony pobiorą je po zmianie identyfikatorów |
| Do 30 listopada | Stawka podatku od wartości aktywów OKI (od roku 2028) | Monitor Polski, obwieszczenie ministra finansów | `oki-stawka-RRRR` |
| Do 30 listopada, od 2029 r. | Kwoty zwolnienia w OKI | jak wyżej | `oki-zwolnienie-*` |
| Wrzesień–październik | Założenia polityki pieniężnej NBP | Monitor Polski | `nbp-cel-inflacyjny` |
| Styczeń | Składki ZUS przedsiębiorców | zus.pl, obwieszczenia | Twierdzenia ze statusem W zastąpić źródłem pierwotnym |
| Marzec | Waloryzacja świadczeń | komunikaty i obwieszczenia | `emerytura-minimalna-*` |
| Maj i listopad | Przegląd wszystkich przepisów | Teksty jednolite w Dzienniku Ustaw (ELI) | Pola `sprawdzono` i `przeglad` |
| Na bieżąco | Nowelizacje ogłoszone w trakcie roku | Dziennik Ustaw | Według potrzeb |

## 4. Procedura zmiany

1. Otwórz akt w źródle pierwotnym. Doniesienie prasowe jest sygnałem, nie źródłem.
2. Zmień lub dodaj twierdzenie w `src/data/rejestr.json`. Ustaw `sprawdzono` na dzisiejszą datę i nową datę `przeglad`.
3. Jeżeli zmienia się rok limitu, popraw identyfikatory na stronach, które go pokazują.
4. Zaktualizuj `stanNaDzien`.
5. Uruchom `npm test`, `npm run build`, `npm run rejestr`.
6. Zmiany, które wpływają na wnioski podatkowe, przekaż recenzentowi przed publikacją.
7. Dopisz wpis do dziennika zmian przewodnika.

## 5. Czego system nie robi

- Nie śledzi zmian prawa automatycznie. Przegląd wykonuje człowiek według kalendarza.
- Nie zastępuje recenzji. Status P oznacza „przeczytane w źródle”, a nie „zinterpretowane przez doradcę”.
