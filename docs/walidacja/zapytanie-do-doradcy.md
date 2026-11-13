# Zapytanie ofertowe do doradcy podatkowego

Stan na dzień: **13 listopada 2026 r.**

## 1. Kiedy wysłać i kiedy zlecić

- **Zapytania wyślij od razu** do 3–5 doradców. Wycena nic nie kosztuje, a odpowiedzi trwają.
- **Recenzję zleć dopiero po rozmowach**, gdy co najmniej 6 z 10 potwierdzi problem (`scenariusz-rozmow.md`). To największy wydatek z budżetu startowego.

## 2. Kogo szukać

- Osoba wpisana na listę doradców podatkowych. Listę prowadzi Krajowa Rada Doradców Podatkowych; informacje znajdziesz na stronie Krajowej Izby Doradców Podatkowych ([kidp.pl](https://kidp.pl)). Przed zleceniem sprawdź wpis.
- Doświadczenie z przedsiębiorcami na ryczałcie i podatku liniowym.
- Zgoda na podanie imienia, nazwiska i numeru wpisu w materiałach. Bez tego recenzja nie buduje wiarygodności marki.

## 3. Treść wiadomości

Uzupełnij pola w nawiasach kwadratowych.

> **Temat:** Zapytanie o wycenę — recenzja materiałów edukacyjnych o IKE, IKZE i OKI dla przedsiębiorców
>
> Dzień dobry,
>
> przygotowuję niezależne materiały edukacyjne o oszczędzaniu na emeryturę dla osób prowadzących jednoosobową działalność i pracujących na B2B. Nie świadczę doradztwa, nie sprzedaję produktów finansowych i nie mam umów z instytucjami finansowymi.
>
> Szukam doradcy podatkowego do pisemnej recenzji części podatkowej. Stan prawny materiałów: 13 listopada 2026 r. Zakres:
>
> 1. Zestawienie 48 twierdzeń o IKE, IKZE, OKI i składkach — każde z podstawą prawną (ustawa, artykuł, ustęp). Proszę o weryfikację poprawności i kompletności.
> 2. Sześć pytań szczegółowych:
>    - czy porównanie IKZE z IKE przy tym samym koszcie netto można opisać wzorem 0,9 / (1 − stawka podatku) i jakie zastrzeżenia trzeba podać;
>    - jak działa odliczenie wpłat na IKZE na ryczałcie przy kilku stawkach oraz przy łączeniu ryczałtu z etatem lub najmem;
>    - czy osoba korzystająca z ulgi na start ma prawo do wyższego limitu IKZE (art. 8 ust. 6a ustawy o systemie ubezpieczeń społecznych);
>    - czy wyższy limit przysługuje przy działalności zawieszonej lub prowadzonej przez część roku;
>    - czy odliczenie wpłat na IKZE wpływa na progi przychodu, od których zależy składka zdrowotna ryczałtowca;
>    - które fundusze korzystają ze zwolnienia w OKI przy warunku 70% kwalifikowanych aktywów, w szczególności fundusze zagraniczne inwestujące globalnie.
> 3. Przegląd czterech stron serwisu (IKE, IKZE, OKI, materiał dla prowadzących działalność) — łącznie około 17 tys. znaków.
>
> Uprzejmie proszę o:
>
> - wycenę ryczałtową i możliwy termin wykonania,
> - informację, czy recenzja będzie miała formę pisemną,
> - zgodę na podanie w materiałach imienia, nazwiska i numeru wpisu, z datą i zakresem recenzji.
>
> Komplet materiałów prześlę po potwierdzeniu zainteresowania.
>
> Z poważaniem
> [imię i nazwisko]
> [telefon lub adres e-mail]

## 4. Co wysłać po odpowiedzi

| Materiał | Skąd |
| --- | --- |
| Rejestr twierdzeń, część ze statusem P | `docs/rejestr-zrodel-i-twierdzen.md` (wygeneruj aktualną wersję: `npm run rejestr`) |
| Pytania szczegółowe ze stanem wiedzy | `docs/kwestie-do-weryfikacji.md`, sekcja „Doradca podatkowy” |
| Cztery strony serwisu | Wydruk do PDF stron `/ike/`, `/ikze/`, `/oki/`, `/jdg-b2b/` |

## 5. Po recenzji

1. Popraw twierdzenia i strony według uwag. Zmień status założeń, które doradca potwierdził.
2. Wpisz recenzję do `src/config/serwis.json` → `publikacja.recenzjaEksperta`: imię i nazwisko, numer wpisu, data, zakres.
3. Uruchom `npm test`, `npm run build` i `npm run gotowosc`.

Nie wpisuj recenzji, zanim nie masz jej na piśmie.
