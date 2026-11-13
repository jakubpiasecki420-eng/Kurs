# System aktualizacji informacji prawnych i podatkowych

Stan na dzień: **13 listopada 2026 r.**

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

## 2. Zabezpieczenia w kodzie

| Zabezpieczenie | Gdzie | Co robi |
| --- | --- | --- |
| Tylko status P na stronie | `src/lib/rejestr.ts`, funkcja `przypisy()` | Strona się nie zbuduje, jeśli użyje twierdzenia ze statusem W lub Z |
| Komplet pól | `src/lib/rejestr.test.ts` | Test nie przejdzie, jeśli twierdzeniu brakuje źródła, przepisu lub dat |
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
