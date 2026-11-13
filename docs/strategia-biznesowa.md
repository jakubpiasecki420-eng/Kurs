# Strategia biznesowa

Stan na dzień: **13 listopada 2026 r.** Zastępuje zalecenia z `docs/archiwum/`.

Oznaczenia: **[P]** potwierdzone w źródle pierwotnym, **[W]** źródło wtórne, **[Z]** założenie własne. Liczby i przepisy: `rejestr-zrodel-i-twierdzen.md`.

## 1. Cel i model

Finansowa Przyszłość jest niezależną marką edukacji finansowej. Zarabia na sprzedaży własnych materiałów. Nie pośredniczy w sprzedaży produktów finansowych i nie pobiera prowizji.

Kolejność budowy:

1. Bezpłatny serwis z wiedzą i kalkulatorem — źródło zaufania i ruchu z wyszukiwarek.
2. Lista zainteresowanych — dopiero po publikacji polityki prywatności.
3. Pierwszy produkt płatny: przewodnik „Emerytura pod kontrolą” dla osób na JDG i B2B.
4. Po walidacji: wersja dla pracowników etatowych, coroczna aktualizacja, warsztaty.

## 2. Dlaczego ten segment

Osoby na JDG i B2B, zwłaszcza rozliczające się ryczałtem lub podatkiem liniowym. Szczegóły: `grupa-docelowa-i-pozycjonowanie.md`.

- Limit IKZE dla prowadzących działalność w 2027 r.: 18 059,40 zł **[P]**.
- Odliczenie działa inaczej przy skali, podatku liniowym i ryczałcie **[P]**; ogólne poradniki rzadko to rozróżniają **[Z]**.
- Od 1 stycznia 2027 r. dochodzi OKI **[P]** — materiały sprzed 2027 r. go nie opisują.
- Ryczałt jest najszybciej rosnącą formą opodatkowania **[W]**.

Ryzyko segmentu: reforma Państwowej Inspekcji Pracy z 8 lipca 2026 r. może przesunąć część osób z B2B na etat **[W]**. Dlatego marka jest szersza niż pierwszy produkt.

## 3. Oferta i ceny

Wszystkie ceny są hipotezami do sprawdzenia w przedsprzedaży.

| Etap | Oferta | Cena testowa | Warunek uruchomienia |
| --- | --- | --- | --- |
| 1 | Pakiet „Emerytura pod kontrolą”: przewodnik PDF, arkusz obliczeniowy, zeszyt ćwiczeń, 12 miesięcy aktualizacji | 129 zł w przedsprzedaży, 179 zł regularnie | Recenzja doradcy podatkowego, regulamin, polityka prywatności |
| 2 | Coroczna aktualizacja dla dotychczasowych klientów | do ustalenia | Co najmniej 100 klientów |
| 3 | Wersja dla pracowników etatowych | do ustalenia | Osiągnięty próg walidacji etapu 1 |
| 4 | Warsztat na żywo lub kurs wideo | 399–499 zł **[Z]** | Popyt potwierdzony pytaniami klientów |

Czego nie robimy na starcie i dlaczego:

- **Samego PDF za 49–99 zł.** Niska cena przy tych samych kosztach obsługi i recenzji; arkusz jest głównym wyróżnikiem. Wracamy do tej opcji, jeśli przedsprzedaż pokaże opór cenowy.
- **Kursu wideo.** Drogi w produkcji i w corocznej aktualizacji.
- **Subskrypcji.** Bez bazy klientów nie ma komu jej sprzedać.
- **Afiliacji.** Ryzyko prawne (pozyskiwanie klientów dla firm inwestycyjnych, art. 79 ustawy o obrocie instrumentami finansowymi **[P]**) i utrata głównego argumentu wiarygodności.
- **Płatnych reklam.** Do czasu poznania konwersji z własnej listy.

Rachunek kontrolny: 100 sprzedaży po 129 zł to 12 900 zł przychodu brutto. Od tej kwoty odchodzą VAT, podatek, prowizje płatnicze i koszt recenzji. To sprawdzenie popytu, nie dochód.

## 4. Walidacja

Progi są założeniami **[Z]**. Służą temu, żeby decyzję o kontynuacji podjąć na danych.

| Hipoteza | Test | Próg | Decyzja przy wyniku poniżej progu |
| --- | --- | --- | --- |
| Problem jest rozpoznawany | 10 rozmów z osobami na JDG/B2B, bez sprzedaży | 6 z 10 nie zna rachunku dla swojej formy opodatkowania i chce go poznać | Zmiana segmentu |
| Serwis przyciąga właściwych ludzi | Zapis na listę po uruchomieniu formularza | 100 zapisów w 6 tygodni, 300 w 12 tygodni | Zmiana komunikatu lub kanału |
| Ludzie zapłacą | Przedsprzedaż z realną datą dostawy i zwrotem pieniędzy w razie opóźnienia | 30 opłaconych zamówień w 3 tygodnie | Zmiana oferty albo zamknięcie projektu |

Rozmowy można prowadzić od razu. Nie wymagają strony, listy ani zgód marketingowych.

## 5. Wiarygodność przy marce bez twarzy

`CLAUDE.md` ustala, że marka nie eksponuje założyciela. To utrudnia budowanie zaufania do nowej marki finansowej **[Z]**, więc rekompensują to cztery elementy, wszystkie obowiązkowe:

1. **Jawny podmiot.** Nazwa, forma prawna, NIP i adres na stronie „O projekcie” i w stopce. Bez nich `npm run gotowosc` blokuje publikację.
2. **Imienny recenzent.** Doradca podatkowy z numerem wpisu, zakresem i datą recenzji. To jedyne nazwisko, którego marka potrzebuje.
3. **Rejestr źródeł.** Każda liczba ma przepis, link i datę. Strona nie pozwala użyć twierdzenia bez źródła pierwotnego.
4. **Jawna metoda.** Informacja o użyciu narzędzi AI przy szkicach, o braku umów partnerskich i o tym, czego serwis nie robi.

Zakazane: fikcyjny zespół, fikcyjne opinie, sugestia statusu instytucji regulowanej.

## 6. Kanały

Przy 10–15 godzinach tygodniowo działają najwyżej dwa kanały jednocześnie.

| Kolejność | Kanał | Rola | Uwagi |
| --- | --- | --- | --- |
| 1 | Strona i SEO | Podstawa. Artykuły odpowiadające na konkretne pytania: „IKZE na ryczałcie”, „OKI a IKE”, „emerytura na B2B” | Indeksowanie włączane dopiero po recenzji |
| 2 | Jeden kanał społecznościowy marki | Zasięg. Karuzele z jawnymi rachunkami w serii „Liczby przyszłości” | Wybór między Instagramem a LinkedInem po 10 rozmowach — tam, gdzie rozmówcy faktycznie szukają wiedzy |
| 3 | Biura rachunkowe obsługujące JDG | Dostęp do właściwych ludzi | Materiał dla klientów biura; bez prowizji |
| później | TikTok, YouTube | — | Wideo dopiero przy potwierdzonym popycie |

Sześć serii treści z `CLAUDE.md` zostaje jako kategorie artykułów. Publikowane są tylko materiały oparte na twierdzeniach ze statusem **[P]**.

## 7. Budżet

Budżet początkowy: 1 500–3 000 zł. Kwoty poniżej to założenia do potwierdzenia ofertami **[Z]**.

| Pozycja | Kwota | Uwagi |
| --- | --- | --- |
| Hosting strony | 0 zł | Strona statyczna; darmowe plany hostingu wystarczą |
| Domena | ok. 100 zł rocznie | Po sprawdzeniu dostępności i znaków towarowych |
| Recenzja doradcy podatkowego | 1 000–2 000 zł | Zakres: rejestr twierdzeń, strony IKE/IKZE/OKI/JDG, formuły arkusza |
| Polityka prywatności i regulamin | 300–800 zł | Wzory od kancelarii; pełna opinia z przychodów przedsprzedaży |
| Narzędzie do listy mailingowej | 0 zł na starcie | Plan bezpłatny; wybór przy uruchomieniu zapisu |
| Reklamy | 0 zł | — |

Przy budżecie 1 500 zł pierwszeństwo ma recenzja podatkowa. Zlecamy ją dopiero wtedy, gdy rozmowy potwierdzą problem — zanim wydamy największą część budżetu.

## 8. Ryzyka

| Ryzyko | Skutek | Ograniczenie |
| --- | --- | --- |
| Brak zaufania do nowej marki bez twarzy | Niska konwersja | Sekcja 5; darmowy kalkulator jako próbka jakości |
| Darmowa konkurencja wysokiej jakości | Trudność w uzasadnieniu ceny | Wąski segment, arkusz, aktualizacje |
| Błąd merytoryczny | Utrata wiarygodności, odpowiedzialność | Rejestr, testy, recenzja, blokada publikacji |
| Przekroczenie granicy doradztwa | Sankcje karne i administracyjne | `zakres-produktu.md`, sekcja „Granice edukacji”; opinia prawnika |
| Zmiana przepisów | Nieaktualne materiały | `system-aktualizacji.md` |
| Zbyt wolny wzrost listy | Brak przedsprzedaży | Progi z sekcji 4 i gotowość do zmiany kanału |
| Kurczenie się segmentu B2B | Mniejszy rynek | Marka szersza niż produkt; wersja dla etatu w planie |
