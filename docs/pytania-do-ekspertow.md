# Pytania do ekspertów

Stan na dzień: **14 listopada 2026 r.** Żadna opinia nie została jeszcze uzyskana.

Ten dokument zbiera wszystkie otwarte pytania w jednym miejscu:

- z `docs/kwestie-do-weryfikacji.md` (oznaczenia DP, PR, KS);
- z audytu etapu 2A (P-01 do P-11);
- nowe pytania z etapu 2C.

Każde pytanie wskazuje konkretny fragment platformy. Teksty przepisów są w `docs/rejestr-zrodel-i-twierdzen.md`; przy każdym podano artykuł.

**Jak korzystać:** każdemu ekspertowi przekaż jego sekcję, ten dokument i dostęp do strony w wersji roboczej. Odpowiedź z podstawą prawną wpiszemy do rejestru i do lekcji. Odpowiedź bez podstawy prawnej trafi do lekcji jako „wskazówka eksperta”, nie jako przepis.

---

## 1. Podatki (doradca podatkowy)

| Nr | Pytanie | Fragment platformy | Co już wiemy | Co blokuje |
| --- | --- | --- | --- | --- |
| T-01 (P-04) | Czy i jak pokazać w materiale edukacyjnym przykładowe przeliczenie emerytury brutto na netto (zaliczka PIT, składka zdrowotna 9%), nie oceniając sytuacji konkretnej osoby? | Lekcje 2.2 i 12.1: „To kwota brutto… w kursie tego nie liczymy” | PIT art. 34 ust. 1; ustawa o świadczeniach opieki zdrowotnej art. 66 ust. 1 pkt 16, art. 79 ust. 1. Podstawy składki zdrowotnej emeryta nie weryfikowaliśmy | Przykład netto w module 12 |
| T-02 (P-06) | Czy opis zwrotu całkowitego i częściowego z IKE jest kompletny? Jak ustala się wartość środków w dniu zwrotu i czy opłaty instytucji wpływają na dochód? | Lekcja 4.2, przykłady „zwrot całkowity” (podatek 1 900 zł) i „częściowy zwrot” (380 zł); strona `/ike/` | PIT art. 30a ust. 1 pkt 10 i ust. 8–8d; ustawa o IKE art. 37 ust. 1 i 1a | Usunięcie oznaczenia „Do potwierdzenia” w 4.2 |
| T-03 (nowe) | Jak opodatkowany jest zwrot z IKZE u osoby na ryczałcie, która wcześniej odliczała wpłaty od przychodu? Czy zwrot doliczany jest do przychodów opodatkowanych na skali? | Strona `/ikze/`, sekcja „Co oznacza wcześniejszy zwrot”: „ustal z doradcą podatkowym” | PIT art. 20 ust. 1: zwrot i wypłaty z IKZE to przychody z innych źródeł; art. 30 ust. 1 pkt 14: 10% dotyczy wypłat | Pełny opis na stronie `/ikze/` i w module 5 |
| T-04 (P-05) | Który dzień decyduje o roku „dokonania wpłaty” dla warunku 5 lat kalendarzowych na IKE i IKZE — zlecenie przelewu czy uznanie rachunku instytucji? | Lekcja 12.2, akapit „Do potwierdzenia przez eksperta” | Ustawa o IKE art. 34 ust. 1 pkt 1 lit. a, art. 34a ust. 1 pkt 1 | Kalendarz przeglądu rocznego |
| T-05 (DP-1) | Czy porównanie IKZE z IKE według wzoru 0,9 / (1 − stawka) jest poprawne i jakie zastrzeżenia trzeba podać? | Biblioteka `src/lib/kalkulator/ikze.ts` (niepodłączona), twierdzenie Z `z-ikze-wzgledem-ike` | Mechanizm odliczenia i 10% przy wypłacie potwierdzone w ustawach; wzór jest własny | Moduł 7, kalkulator IKZE |
| T-06 (DP-2) | Jak działa odliczenie IKZE na ryczałcie przy kilku stawkach i przy łączeniu ryczałtu z etatem lub najmem? | Strony `/ikze/`, `/jdg-b2b/` | Ustawa o ryczałcie art. 11 ust. 1 i 3 | Moduł 5 |
| T-07 (DP-3) | Czy osoba korzystająca z ulgi na start ma prawo do wyższego limitu IKZE? | Strona `/jdg-b2b/`, ramka „Uwaga na ulgę na start” | Ustawa o sus art. 8 ust. 6a | Moduł 3 |
| T-08 (DP-4) | Czy odliczenie IKZE wpływa na progi przychodu, od których zależy składka zdrowotna ryczałtowca? | Strona `/jdg-b2b/`, krok 4; twierdzenie Z `z-ryczalt-zdrowotna-ikze` | Twierdzenie `zdrowotna-podstawa` oznaczone w rejestrze jako „wniosek” | Moduł 3 |
| T-09 (DP-5) | Które rodzaje funduszy spełniają warunek 70% kwalifikowanych aktywów w OKI? Jak traktować fundusze zagraniczne inwestujące globalnie? | Strona `/oki/` | Ustawa o OKI art. 26 ust. 1 i 4 (doprecyzowane w etapie 2C) | Moduł 6 |
| T-10 (DP-6) | Czy wyższy limit IKZE przysługuje przy działalności zawieszonej lub prowadzonej przez część roku? | Strona `/ikze/` | Brak ustaleń | Moduł 5 |
| T-11 (P-11) | Czy porównanie „wyższa podstawa składek w ZUS” i „dobrowolne konta” jako dróg oszczędzania wymaga dodatkowych zastrzeżeń? | Lekcja 1.3, sekcja „Trzy drogi dodatkowego oszczędzania” | — | Recenzja modułu 1 |
| T-12 (DP-7) | Recenzja całości: rejestr twierdzeń (98 P), lekcje 1.1–12.2, strony IKE, IKZE, OKI i JDG/B2B | Cały serwis | — | Publikacja |

## 2. ZUS i ubezpieczenia społeczne (specjalista ds. ubezpieczeń społecznych lub ZUS)

| Nr | Pytanie | Fragment platformy | Co już wiemy | Co blokuje |
| --- | --- | --- | --- | --- |
| Z-01 (P-01) | Czy hipotetyczna emerytura w informacji o stanie konta pomija środki z subkonta, tak jak wynika z art. 50 ust. 2 w zw. z art. 40 ust. 1 ustawy o sus? Jak w materiale edukacyjnym przybliżyć wpływ subkonta na emeryturę? | Lekcja 2.2, sekcja „Czego hipotetyczna emerytura nie obejmuje”; twierdzenie `zus-hipotetyczna-bez-subkonta` („wniosek”) | Brzmienie przepisów; praktyki ZUS nie sprawdzaliśmy | Usunięcie oznaczenia w 2.2; luka w 12.1 |
| Z-02 | Czy opis zestawienia składek z ostatnich 12 miesięcy (tylko składki emerytalne, bez subkonta i OFE, w kwotach nominalnych) odpowiada dokumentowi ZUS? | Lekcja 2.1, sekcja „Jak czytać zestawienie ostatnich składek” | Ustawa o sus art. 50 ust. 1a pkt 3 | Usunięcie oznaczenia w 2.1 |
| Z-03 (P-02) | Czy miesiące ulgi na start, gdy przedsiębiorca nie podlega ubezpieczeniom, liczą się do stażu wymaganego do najniższej emerytury? | Lekcja 1.2, drugi akapit „Do potwierdzenia przez eksperta” | Prawo przedsiębiorców art. 18 ust. 1; ustawa o FUS art. 6 ust. 1 pkt 1 (okresy ubezpieczenia) | Usunięcie oznaczenia w 1.2 |
| Z-04 (P-03) | Jak art. 87 ust. 5 ustawy o FUS (brak podwyższenia przy przychodzie przekraczającym kwotę podwyższenia) stosuje się do emeryta, który nadal prowadzi działalność gospodarczą? Jak liczy się przychód (art. 104)? | Lekcja 1.2, sekcja „Kiedy podwyższenia nie ma mimo stażu”; twierdzenie `fus-najnizsza-przychod` („wniosek”) | Brzmienie art. 87 ust. 5 i art. 104 ust. 1 | Usunięcie oznaczenia w 1.2 |
| Z-05 (nowe) | Czy przy małym ZUS plus z podstawą niższą od minimalnego wynagrodzenia miesiące liczą się do stażu proporcjonalnie (art. 87 ust. 3), tak jak przy preferencyjnej podstawie? | Lekcja 1.2, punkt „Mały ZUS plus” | Art. 87 ust. 3 mówi o „podstawie wymiaru niższej od kwoty minimalnego wynagrodzenia” bez rozróżnienia tytułu | Recenzja modułu 1 |
| Z-06 (nowe) | Czy opis małego ZUS plus w lekcji 1.3 (przychód do 120 000 zł, połowa dochodu, granice 30%/60%, 36 z 60 miesięcy, ryczałt: połowa przychodu) jest wystarczający, a pominięte wyłączenia z art. 18c ust. 11 nie wprowadzają w błąd? | Lekcja 1.3, tabela „Trzy sposoby ustalania podstawy” | Ustawa o sus art. 18c ust. 1–3, 11, 11a, 12 | Recenzja modułu 1 |
| Z-07 (nowe) | Czy zapis „zadeklarowania wyższej kwoty nie można skorygować za miesiąc, w którym je złożono” dotyczy też podwyższenia podstawy przy małym ZUS plus (art. 18c ust. 8)? | Lekcja 1.3 | Art. 18 ust. 8a dotyczy podstawy będącej „zadeklarowaną kwotą”; lekcja zawęża zdanie do takiej podstawy | — |
| Z-08 (nowe) | Czy opis waloryzacji (coroczna, wskaźnik nie niższy niż wskaźnik cen, stan konta nie może spaść) jest wystarczający? Czy warto omówić waloryzację subkonta? | Lekcja 1.1, sekcja „Waloryzacja” | Ustawa o FUS art. 25 ust. 3 i 6; waloryzacji subkonta nie analizowaliśmy | Recenzja modułu 1 |

## 3. Prawo i regulacje (prawnik)

| Nr | Pytanie | Fragment platformy | Co już wiemy | Co blokuje |
| --- | --- | --- | --- | --- |
| R-01 (PR-1, P-08) | Czy tytuły modułów „IKE”, „IKZE”, „OKI”, nazwy stron `/ike/`, `/ikze/`, `/oki/` i użycie skrótów w reklamie płatnego kursu naruszają art. 18 i 40 ustawy o IKE oraz art. 20 i 31 ustawy o OKI? | Program kursu (moduły 4–6), strony publiczne, przyszłe reklamy | Przepisy zastrzegają te określenia „do określenia prowadzonej działalności lub reklamy” | Marketing i sprzedaż |
| R-02 (PR-2, P-10) | Gdzie przebiega granica między edukacją a doradztwem inwestycyjnym w przypadku: kalkulatorów z wariantami stopy zwrotu, szkicu planu w lekcji 12.1 (rezerwa, kwota, „miejsce”), pytań pomocniczych w lekcji 1.3? | Lekcje 1.3 i 12.1, kalkulatory | Ustawa o obrocie instrumentami finansowymi art. 69 ust. 2 pkt 5, art. 76; zalecenia KNF dla twórców treści | Sprzedaż |
| R-03 (P-07, rozszerzone) | Czy porównanie „orientacyjnej luki” z wartością realną oszczędności (bez przeliczania na wypłaty) może zostać uznane za ocenę indywidualnej sytuacji? | Lekcja 12.1, krok 4 | Rachunek „liczby lat” usunięto w etapie 2B | Sprzedaż |
| R-04 (PR-6) | Czy i jak informować o użyciu narzędzi AI przy tworzeniu materiałów? Komu przysługują prawa autorskie do takich treści? | Strona „O projekcie” | — | Sprzedaż |
| R-05 (PR-7) | Odpowiedzialność za błąd w kalkulatorze lub lekcji; czy potrzebne jest ubezpieczenie OC? | Kalkulatory, lekcje | KNF zaleca rozważenie OC twórcom treści finansowych | Sprzedaż |
| R-06 (PR-5) | Badanie nazw „Finansowa Przyszłość”, „Emerytura pod kontrolą” i planowanej „Start młodego inwestora” w bazach znaków towarowych | Marka, kursy | Szybkie wyszukiwanie bez kolizji to nie jest badanie znaków | Domena, druk, drugi kurs |
| R-07 (nowe) | Czy drugi kurs „Start młodego inwestora”, skierowany do osób młodych (w tym 16–17 lat, które mogą wpłacać na IKE), wymaga dodatkowych zabezpieczeń: wieku odbiorców, zgody opiekuna, zakazu rekomendacji instrumentów? | Plan rozwoju (`docs/plan-dalszego-rozwoju.md`) | Ustawa o IKE art. 3 ust. 2 (małoletni) | Projekt drugiego kursu |

## 4. Inwestycje i instrumenty finansowe (doradca inwestycyjny lub ekspert rynku kapitałowego)

| Nr | Pytanie | Fragment platformy | Co już wiemy | Co blokuje |
| --- | --- | --- | --- | --- |
| I-01 (nowe) | Czy przykłady liczbowe z hipotetycznymi stopami 0%, 2,5% i 5% (i przycisk 7% w kalkulatorze oszczędzania) są przedstawione w sposób, który nie sugeruje oczekiwanego wyniku? | Lekcje 9.1–9.3, kalkulatory, opisy „hipotetyczne założenie, nie prognoza” | — | Recenzja modułu 9 |
| I-02 (nowe) | Czy model kosztów (opłata od aktywów pobierana raz w roku, mnożnik (1 + zysk) × (1 − koszty)) jest wystarczająco dokładny dla celów edukacyjnych? | Lekcja 9.3, kalkulator oszczędzania | Model opisany w metodzie narzędzia | Recenzja modułu 9 |
| I-03 (nowe) | Jak w kursie dla młodych inwestorów przedstawić ryzyko, dywersyfikację i horyzont bez wskazywania instrumentów? Jakie przykłady są bezpieczne? | Planowany kurs „Start młodego inwestora”; moduł 10 kursu obecnego | — | Moduł 10, drugi kurs |

## 5. Sprzedaż treści cyfrowych (prawnik, księgowy)

| Nr | Pytanie | Fragment platformy | Co już wiemy | Co blokuje |
| --- | --- | --- | --- | --- |
| S-01 (PR-3) | Regulamin, polityka prywatności, zgody na e-maile, klauzule informacyjne dla platformy z postępem zapisywanym tylko w przeglądarce | Formularz zapisu (ukryty), strefa kursanta | Ustawa o prawach konsumenta art. 38 ust. 1 pkt 13, art. 7aa | Lista zainteresowanych, sprzedaż |
| S-02 (PR-4) | Zasady przedsprzedaży treści cyfrowych, dobrowolnej gwarancji zwrotu i informowania o obniżkach cen | Strona `/program/` (bez ceny) | jak wyżej | Przedsprzedaż |
| S-03 (P-09) | Jakie obowiązki wynikają z aktualizacji treści cyfrowych (kurs online, PDF) i jak opisać okres aktualizacji? | Obietnicę aktualizacji usunięto z rozdziału 0 PDF (etap 2B) | — | Sprzedaż |
| S-04 (nowe) | Czy sprzedaż dostępu do wielu kursów (pakiet, osobne kursy) wymaga innej konstrukcji regulaminu? | `docs/architektura-wielokursowa.md` | — | Model sprzedaży drugiego kursu |
| S-05 (KS-1, KS-2) | Stawka ryczałtu i VAT dla sprzedaży kursu online i PDF w ramach istniejącej działalności | — | — | Kalkulacja ceny |
| S-06 (KS-3 do KS-5) | Wpływ przychodu na próg składki zdrowotnej ryczałtowca, kody PKD, kasa fiskalna przy sprzedaży internetowej | — | — | Rozpoczęcie sprzedaży |
