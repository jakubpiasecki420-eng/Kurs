# Raport końcowy — etap 2 platformy: treść pierwszego kursu i narzędzia

| | |
| --- | --- |
| Projekt | Finansowa Przyszłość — platforma edukacyjna, kurs „Emerytura pod kontrolą” |
| Data raportu | 14 listopada 2026 r. |
| Stan prawny materiałów | 13 listopada 2026 r. (nowe twierdzenia sprawdzone 14 listopada 2026 r.) |
| Gałąź | `claude/laughing-brown-837njb` |
| Commit z pracami etapu | `cd87803` — „Etap 2: lekcje kursu »Emerytura pod kontrolą« i nowe kalkulatory” |
| Punkt wyjścia | `b6e3a86` — etap 1 (fundamenty platformy) |
| Status serwisu | Wersja robocza. Brak recenzji eksperckiej i opinii prawnej. Zamknięty dla wyszukiwarek, niczego nie sprzedaje, nie zbiera danych |

> **Dla recenzenta:** plik jest samodzielny — nie potrzebujesz dostępu do repozytorium. Prośba jest w sekcji 10, format odpowiedzi w sekcji 11.
>
> Oznaczenia: **[P]** — przeczytane w tekście aktu prawnego; **[W]** — źródło wtórne; **[Z]** — wniosek, uproszczenie lub założenie autora.

---

## 1. Podsumowanie

Etap 2 dodał treść do platformy zbudowanej w etapie 1.

**Kurs i lekcje**

- Kurs **„Emerytura pod kontrolą”** jest aktywny i ma **12 lekcji w 5 z 12 modułów**: 1, 2, 4, 9 i 12.
- Każda lekcja ma quiz, listę źródeł i oznaczenie „Przed recenzją eksperta”.
- Pozostałe moduły są widoczne w programie jako „w przygotowaniu”.

**Narzędzia**

- W centrum narzędzi działają trzy kalkulatory: oszczędzania (istniał), **procentu składanego** (nowy) i **inflacji** (nowy).

**Źródła i przykłady**

- Liczby i przepisy w lekcjach pochodzą wyłącznie z rejestru twierdzeń ze statusem [P].
- Przykłady obliczeniowe w lekcjach i w przewodniku PDF liczy jeden wspólny moduł.

| Wskaźnik | Po etapie 1 | Po etapie 2 |
| --- | --- | --- |
| Strony w buildzie | 31 | 50 |
| Lekcje kursu docelowego | 0 | 12 |
| Dostępne narzędzia | 1 | 3 |
| Twierdzenia w rejestrze (P / W / Z) | 64 (54 / 6 / 4) | 78 (68 / 6 / 4) |
| Testy jednostkowe | 195 | 245 |
| Testy w przeglądarce | 263 | 397 (+1 pominięty celowo) |

---

## 2. Wykonane zmiany i nowe pliki

Zakres: 54 pliki, +2 894 / −553 wierszy (`git diff --stat b6e3a86 cd87803`). W tym zakresie jest też `docs/podatki-pod-kontrola.md` — dokument dodany na zdalnej gałęzi spoza tej pracy (zob. sekcja 8).

### 2.1. Nowe pliki

| Plik | Zawartość |
| --- | --- |
| `src/content/lekcje/emerytura-pod-kontrola/*.md` (12 plików) | Lekcje kursu: `skad-bierze-sie-emerytura`, `wiek-i-najnizsza-emerytura`, `podstawa-skladek-i-wlasne-oszczednosci`, `informacja-o-stanie-konta`, `hipotetyczna-emerytura`, `ike-zasady-i-limit`, `ike-wyplata-i-zwrot`, `inflacja-wartosc-realna`, `procent-skladany`, `regularne-oszczedzanie-i-koszty`, `twoje-liczby`, `przeglad-roczny` |
| `src/lib/tresc-markdown.ts` + test | Renderowanie lekcji: `{{id}}` → wartość z rejestru, `[^id]` → przypis, `<!-- dyrektywa -->` → przykład obliczeniowy; zatrzymuje budowanie przy twierdzeniu niezadeklarowanym lub innym niż [P]; tabele z Markdownu w przewijanym regionie |
| `src/lib/przyklady.ts` | Wspólne przykłady obliczeniowe dla lekcji i PDF: `przyklad:zwrot-ike`, `przyklad:skladka-emerytalna`, `tabela:inflacja`, `tabela:procent-skladany`, `tabela:scenariusze`, `wykres:scenariusz`, `tabela:koszty` |
| `src/lib/kalkulator/proste.ts` + test | Obliczenia procentu składanego i inflacji, walidacja pól, odczyt liczb w polskim zapisie |
| `src/lib/kalkulator/proste-widok.ts` | Model widoku obu kalkulatorów: kafle, serie wykresu, wiersze tabeli, opisy pól i zakresy |
| `src/lib/kalkulator/wykres-linie.ts` + test | Ogólny wykres liniowy SVG z tytułem i opisem dla czytników ekranu |
| `src/components/KalkulatorProsty.astro` | Komponent kalkulatora procentu składanego / inflacji (wynik w HTML, przeliczanie w przeglądarce) |
| `src/components/platforma/WidokNarzedzia.astro` | Wybór interfejsu narzędzia — na stronie narzędzia i w lekcji |
| `src/pages/platforma/narzedzia/[narzedzie].astro` | Jedna strona dla wszystkich dostępnych narzędzi (zastępuje `oszczedzanie.astro`; adres bez zmian) |
| `src/styles/kalkulator.css`, `src/styles/wykres.css` | Style formularzy, wyników, wykresów i przykładów — przeniesione z komponentu do plików wspólnych |

### 2.2. Zmienione pliki

| Plik | Zmiana |
| --- | --- |
| `src/data/rejestr.json` | +14 twierdzeń [P] (ustawa o FUS, ustawa o sus, ogłoszenia limitów IKE/IKZE, stawki OKI); wartości liczbowe dla `sus-skladka-emerytalna` (19,52%), `sus-podstawa-jdg` (60%), `sus-preferencyjna` (30%) |
| `src/content/kursy/emerytura-pod-kontrola.json` | Stan „aktywny”, lista lekcji w modułach 1, 2, 4, 9, 12 |
| `src/content.config.ts` | Pole `narzedzie` w lekcji przyjmuje wszystkie dostępne narzędzia |
| `src/lib/platforma/dane.ts` | Kurs aktywny: `emerytura-pod-kontrola` (wcześniej demonstracyjny) |
| `src/lib/platforma/narzedzia.ts` | Procent składany i inflacja: stan „dostępne”, adresy, założenia; lista `NARZEDZIA_DOSTEPNE` |
| `src/pages/platforma/kurs/[kurs]/[modul]/[lekcja].astro` | Renderowanie przez `renderujTresc`; znacznik „Przed recenzją eksperta”; osadzanie dowolnego narzędzia |
| `src/pages/platforma/kurs/[kurs]/index.astro` | Liczba modułów z lekcjami, informacja o modułach w przygotowaniu i o wersji roboczej, poprawna odmiana liczebników |
| `src/pages/platforma/index.astro` | Pulpit kursu docelowego; kurs demonstracyjny jako drugi kurs z linkiem; licznik modułów tylko z lekcjami |
| `src/lib/format.ts` + test | Funkcja `liczebnik()` (1 moduł, 3 moduły, 12 modułów) |
| `src/lib/kalkulator/wykres.ts` | Prefiks identyfikatorów — kilka wykresów na jednej stronie |
| `src/components/Kalkulator.astro` | Style przeniesione do `kalkulator.css` / `wykres.css`; logika bez zmian |
| `src/styles/globalne.css`, `platforma.css` | Import nowych stylów; kalkulator w lekcji dopasowuje się do szerokości kolumny |
| `scripts/generuj-przewodnik.ts` | Przykłady z `przyklady.ts` zamiast kopii lokalnej; poprawna odmiana w komunikacie |
| `src/lib/platforma/tresc.test.ts` | Testy treści: parsowanie nagłówków YAML, renderowanie każdej lekcji, przypis dla każdego zadeklarowanego twierdzenia, brak kwot wpisanych ręcznie |
| `tests/e2e/platforma.spec.ts`, `strony.spec.ts` | Nowe scenariusze i 15 nowych stron na liście testów |
| `package.json`, `package-lock.json` | `marked` w zależnościach; `yaml` (2.9.1) w zależnościach deweloperskich |
| Dokumentacja | `CLAUDE.md`, `README.md`, `docs/architektura-platformy.md`, `docs/harmonogram.md`, `docs/zakres-produktu.md`, `produkt/przewodnik/struktura.md`; wygenerowany `docs/rejestr-zrodel-i-twierdzen.md` |

### 2.3. Usunięte pliki

`src/pages/platforma/narzedzia/oszczedzanie.astro` — zastąpiony stroną dynamiczną pod tym samym adresem.

---

## 3. Struktura platformy

### 3.1. Adresy

| Adres | Zawartość |
| --- | --- |
| `/` i strony publiczne | Strona główna, przewodniki IKE/IKZE/OKI, JDG/B2B, kalkulator, program, jak uczymy, biblioteka, artykuły, o projekcie, źródła, kontakt |
| `/platforma/` | Pulpit: kontynuacja nauki, postęp, moduły, aktywność, narzędzia, kurs demonstracyjny |
| `/platforma/kurs/emerytura-pod-kontrola/` | Program kursu: 12 modułów, 5 z lekcjami |
| `/platforma/kurs/emerytura-pod-kontrola/<moduł>/` | 5 stron modułów |
| `/platforma/kurs/emerytura-pod-kontrola/<moduł>/<lekcja>/` | 12 lekcji |
| `/platforma/kurs/kurs-demonstracyjny/…` | Kurs demonstracyjny: 3 moduły, 6 lekcji |
| `/platforma/postep/` | Postęp kursu aktywnego, quizy, historia |
| `/platforma/narzedzia/` | Centrum narzędzi: 3 dostępne, 3 niedostępne (bez linków) |
| `/platforma/narzedzia/oszczedzanie/`, `/procent-skladany/`, `/inflacja/` | Kalkulatory z opisem metody |
| `/platforma/ustawienia/` | Nazwa wyświetlana, eksport i usuwanie danych |

### 3.2. Kurs „Emerytura pod kontrolą”

| Moduł | Stan | Lekcje |
| --- | --- | --- |
| 1. Jak działa system emerytalny | Lekcje | 1.1 Skąd bierze się emerytura z ZUS · 1.2 Wiek emerytalny i najniższa emerytura · 1.3 Podstawa składek i własne oszczędności |
| 2. ZUS: co możesz sprawdzić | Lekcje | 2.1 Informacja o stanie konta w ZUS · 2.2 Jak czytać hipotetyczną emeryturę |
| 3. Twoja forma pracy | W przygotowaniu | czeka na recenzję podatkową |
| 4. IKE | Lekcje | 4.1 Zasady i limit wpłat · 4.2 Wypłata, zwrot i zmiana instytucji |
| 5. IKZE | W przygotowaniu | czeka na recenzję podatkową |
| 6. OKI | W przygotowaniu | czeka na recenzję podatkową |
| 7. Trzy konta obok siebie | W przygotowaniu | czeka na recenzję podatkową i opinię prawną |
| 8. PPK i PPE | W przygotowaniu | brak twierdzeń [P] z ustawy o PPK |
| 9. Inflacja i procent składany | Lekcje | 9.1 Inflacja i wartość realna (kalkulator inflacji) · 9.2 Procent składany (kalkulator procentu) · 9.3 Regularne oszczędzanie i koszty (kalkulator oszczędzania) |
| 10. Podstawy inwestowania | W przygotowaniu | decyzja właściciela |
| 11. Jak porównywać instytucje i produkty | W przygotowaniu | decyzja właściciela |
| 12. Twój plan | Lekcje | 12.1 Twoje liczby w jednym miejscu (kalkulator oszczędzania) · 12.2 Kalendarz i przegląd roczny |

Łączny czas nauki: około 93 minut. Szablon lekcji, w tej kolejności:

1. nagłówek i spis sekcji,
2. treść z przypisami i przykładami,
3. ćwiczenie z narzędziem,
4. quiz,
5. materiały dodatkowe,
6. źródła,
7. przycisk ukończenia,
8. nawigacja.

---

## 4. Co działa rzeczywiście, a co jest demonstracyjne

### 4.1. Działa rzeczywiście

| Funkcja | Jak działa |
| --- | --- |
| Lekcje i ich treść | Pełna treść 12 lekcji; przypisy prowadzą do listy źródeł z linkami do aktów |
| Kontrola źródeł | Budowanie zatrzymuje się przy twierdzeniu [W]/[Z], niezadeklarowanym albo nieprzetworzonym |
| Kalkulatory | Trzy kalkulatory liczą poprawnie, walidują dane, pokazują błędy przy polach, działają na telefonie; pierwszy wynik widoczny bez JavaScriptu |
| Quizy | Ocena odpowiedzi, wyjaśnienia, zapis ostatniego wyniku |
| Postęp | Ukończenie i cofnięcie lekcji, statusy modułów, pasek postępu, „kontynuuj naukę”, historia aktywności — zapis w pamięci tej przeglądarki |
| Ustawienia | Nazwa wyświetlana, eksport postępu do JSON, usunięcie danych |
| Przewodnik PDF | `npm run przewodnik` składa 17 stron (rozdziały 0, 2, 4, 9 i dodatek ze źródłami) z tych samych przykładów co lekcje |
| Kontrola gotowości | `npm run gotowosc` wypisuje blokady publikacji |

### 4.2. Demonstracyjne lub niepełne

| Element | Stan |
| --- | --- |
| Konta użytkowników | Nie istnieją. Postęp jest tylko w tej przeglądarce, bez synchronizacji; każda strona strefy to komunikuje |
| Kurs demonstracyjny | Tekst zastępczy i opis platformy; ilustracja „grafika w przygotowaniu” |
| Blokada modułu | Tylko informacyjna — lekcję można otworzyć bezpośrednio |
| Treść lekcji | Wersja robocza przed recenzją eksperta |
| Moduły 3, 5–8, 10, 11 | Tylko tytuł i opis w programie |
| Kalkulator IKZE, porównanie IKE/IKZE | Biblioteki istnieją, interfejsu brak (czeka na recenzję podatkową) |
| Symulator emerytalny | Tylko wpis w rejestrze narzędzi |
| Formularz zapisu, ceny, płatności | Ukryte lub nieistniejące |
| Dane podmiotu, kontakt, polityka prywatności, regulamin | Brak |

---

## 5. Wyniki testów i builda

Uruchomione ponownie 14 listopada 2026 r. na commicie `cd87803`.

| Polecenie | Wynik |
| --- | --- |
| `npm test` (Vitest) | **245 / 245** w 15 plikach |
| `npm run check` (typy) | **0 błędów, 0 ostrzeżeń, 0 podpowiedzi** (98 plików) |
| `npm run build` | **50 stron** zbudowanych bez błędów |
| `npm run test:e2e` (Playwright, komputer i telefon, z kontrolą dostępności axe WCAG 2.1 AA) | **397 przechodzi, 1 pominięty, 0 błędów** |
| `npm run rejestr` | Wygenerowano `docs/rejestr-zrodel-i-twierdzen.md` (78 twierdzeń) |
| `npm run przewodnik` | PDF 17 stron, rozdziały 0, 2, 4, 9, C |
| `npm run gotowosc` | 6 blokad publikacji (sekcja 6.3) |

Testy w przeglądarce sprawdzają każdą z 39 stron na liście, na komputerze i na telefonie. Sprawdzane są:

- status 200, jeden nagłówek h1, opis strony, `noindex` i baner wersji roboczej;
- brak przewijania w poziomie;
- brak naruszeń dostępności.

Scenariusze strefy kursanta:

- postęp i kontynuacja nauki, cofnięcie ukończenia, warunek modułu, nawigacja między lekcjami;
- quizy w obu kursach;
- przypisy i przykłady w lekcji IKE;
- unikalne identyfikatory na stronie z wykresem i kalkulatorem;
- oba nowe kalkulatory, w tym błędne dane, przywracanie wartości i działanie bez JavaScriptu;
- program kursu, ustawienia, uszkodzone dane w pamięci przeglądarki, menu na telefonie.

Przegląd wizualny: zrzuty ekranu na szerokości 1280 px i 390 px dla:

- pulpitu i programu kursu,
- trzech lekcji (1.3, 9.3, 12.2),
- trzech kalkulatorów,
- publicznej strony `/kalkulator/`.

Po przeglądzie poprawiono dwie rzeczy: zbyt szerokie tabele w lekcji i ściśnięty kalkulator w kolumnie lekcji.

---

## 6. Znane błędy, ograniczenia i pominięte testy

### 6.1. Znane błędy

Brak znanych błędów funkcjonalnych po ostatnim uruchomieniu testów.

### 6.2. Ograniczenia

| Ograniczenie | Skutek |
| --- | --- |
| Postęp tylko w przeglądarce | Brak synchronizacji między urządzeniami; utrata po wyczyszczeniu danych przeglądarki |
| Lekcje publicznie dostępne pod adresem | Nie da się sprzedawać dostępu do treści bez etapu kont |
| Odpowiedzi quizów w kodzie strony | Quiz nadaje się do nauki, nie do egzaminu |
| Pulpit i panel postępu pokazują tylko kurs aktywny | Postęp kursu demonstracyjnego widać wyłącznie na jego stronach |
| Wykres w nowych kalkulatorach jest statyczny | Brak podglądu wartości po najechaniu; dokładne liczby są w tabeli |
| Jeden kalkulator danego rodzaju na stronę | Dwa takie same kalkulatory w jednej lekcji miałyby te same identyfikatory pól |
| Tabele przykładów na telefonie | Przewijają się w poziomie wewnątrz oznaczonego regionu (strona się nie przewija) |
| Dług techniczny | `Kalkulator.astro` ma własną funkcję odczytu liczb, dublującą `liczbaZPola()` z `proste.ts` |
| Przeniesienie stylów kalkulatora do plików globalnych | Zmieniła się kolejność reguł CSS. Testy i zrzuty nie wykazały różnic, ale nie każdą stronę obejrzano ręcznie na obu szerokościach |
| Rozdziały PDF 1 i 12 | Nie istnieją, choć lekcje tych modułów są gotowe |

### 6.3. Blokady publikacji (`npm run gotowosc`)

1. Brak danych podmiotu prowadzącego serwis.
2. Brak adresu kontaktowego.
3. Brak recenzji doradcy podatkowego.
4. Brak opinii prawnej o granicy edukacji i doradztwa oraz o użyciu nazw IKE, IKZE i OKI.
5. Brak polityki prywatności.
6. Brak docelowego adresu serwisu (`SITE_URL`).

### 6.4. Pominięte i niewykonane testy

| Test | Powód |
| --- | --- |
| Najechanie kursorem na wykres kalkulatora oszczędzania — wariant telefonu (1 test) | Celowo pominięty: telefon nie ma kursora |
| Treść PDF | Brak testu automatycznego; sprawdzane ręcznie przez odczyt tekstu z PDF. Obliczenia przykładów mają testy jednostkowe |
| Czytnik ekranu | Brak testu ręcznego (NVDA, VoiceOver); jest tylko automatyczna kontrola axe |
| Prawdziwe urządzenia i inne przeglądarki | Testy tylko w Chromium (emulacja telefonu) |
| Regresja wizualna | Brak automatycznego porównywania zrzutów |
| Poprawność merytoryczna | Testy sprawdzają pochodzenie i obliczenia liczb, nie interpretację przepisów — to zadanie recenzji |

---

## 7. Przepisy, na których opierają się nowe lekcje [P]

Wszystkie odczytane w tekstach jednolitych w serwisie ELI Sejmu (api.sejm.gov.pl), sprawdzone 13–14 listopada 2026 r.

| Treść w lekcji | Przepis | Akt |
| --- | --- | --- |
| Składka na ubezpieczenie emerytalne wynosi 19,52% podstawy wymiaru | art. 22 ust. 1 pkt 1 | ustawa o systemie ubezpieczeń społecznych, t.j. Dz.U. 2026 poz. 1474 |
| Na koncie w ZUS zapisuje się zwaloryzowaną wysokość składek | art. 40 ust. 1 | jw. |
| Podstawa wymiaru składek przedsiębiorcy: zadeklarowana kwota, nie niższa niż 60% prognozowanego przeciętnego wynagrodzenia | art. 18 ust. 8 | jw. |
| Przedsiębiorca może zadeklarować wyższą podstawę | art. 18 ust. 8a | jw. |
| Preferencyjna podstawa przez 24 miesiące: nie niższa niż 30% minimalnego wynagrodzenia; wyłączenie m.in. dla prowadzących działalność w ciągu 60 miesięcy przed startem | art. 18a ust. 1 i 2 | jw. |
| Wiek emerytalny co najmniej 60 lat (kobiety) i 65 lat (mężczyźni), z wyjątkami | art. 24 ust. 1 | ustawa o emeryturach i rentach z FUS, t.j. Dz.U. 2025 poz. 1749 |
| Podstawa obliczenia: zwaloryzowane składki, zwaloryzowany kapitał początkowy, środki na subkoncie | art. 25 ust. 1 | jw. |
| Emerytura = podstawa obliczenia ÷ średnie dalsze trwanie życia; wspólne dla kobiet i mężczyzn, w miesiącach | art. 26 ust. 1 i 3 | jw. |
| Prezes GUS ogłasza tablice trwania życia do 31 marca w Monitorze Polskim | art. 26 ust. 4 i 5 | jw. |
| Kapitał początkowy: urodzeni po 31.12.1948 r., składki przed 1.01.1999 r. | art. 173 ust. 1; art. 196 | jw. |
| Podwyższenie do najniższej emerytury: mężczyzna 65 lat i 25 lat okresów składkowych i nieskładkowych; kobieta 60 lat i 20 lat | art. 87 ust. 1 | jw. |
| Miesiące ze składkami od podstawy niższej niż minimalne wynagrodzenie wlicza się do stażu proporcjonalnie | art. 87 ust. 3 | jw. |
| Informacja o stanie konta do 31 sierpnia, stan na 31 grudnia poprzedniego roku; zawartość; hipotetyczna emerytura od 35 lat, dwa warianty, wzór | art. 50 (twierdzenia z etapu 1) | ustawa o systemie ubezpieczeń społecznych, t.j. Dz.U. 2026 poz. 1474 |
| Limit IKE: 28 260 zł (2026), 30 099 zł (2027); trzykrotność prognozowanego przeciętnego wynagrodzenia | obwieszczenia, art. 13 ust. 1 | M.P. 2025 poz. 1202, M.P. 2026 poz. 1081; ustawa o IKE i IKZE, t.j. Dz.U. 2026 poz. 91 |
| Limity IKE i IKZE ogłasza minister w Monitorze Polskim do końca roku poprzedzającego | art. 13 ust. 4; art. 13a ust. 8 | ustawa o IKE i IKZE |
| Warunki wypłaty z IKE; zwolnienie; podatek 19% przy zwrocie od różnicy między wartością środków a sumą wpłat; 75% przy więcej niż jednym IKE; wypłata transferowa | art. 34 ust. 1 ustawy o IKE i IKZE; art. 30a ust. 1 pkt 10 ustawy o PIT i pozostałe (twierdzenia z etapu 1) | ustawa o IKE i IKZE, t.j. Dz.U. 2026 poz. 91; ustawa o PIT, t.j. Dz.U. 2026 poz. 592 |
| Wypłata z IKZE wymaga wpłat w co najmniej 5 latach kalendarzowych | art. 34a ust. 1 i 2 | ustawa o IKE i IKZE |
| OKI: ustawa wchodzi w życie 1 stycznia 2027 r.; stawkę podatku od wartości aktywów minister finansów ogłasza do 30 listopada roku poprzedzającego | art. 46; art. 25 ust. 2 | ustawa o OKI, Dz.U. 2026 poz. 1098 |
| Średniookresowy cel inflacyjny NBP: 2,5% | załącznik do uchwały RPP | M.P. 2026 poz. 943 |

**Celowo pominięte:** kwota najniższej emerytury. Mamy ją tylko ze źródła wtórnego [W]: 1 978,49 zł od 1 marca 2026 r. Ustawa w tekście jednolitym podaje nieaktualną kwotę. Lekcja odsyła do stron ZUS.

---

## 8. Elementy wymagające Twojej decyzji

| # | Decyzja | Kontekst | Moja propozycja |
| --- | --- | --- | --- |
| 1 | Kto i kiedy recenzuje treść 12 lekcji | Lekcje są gotowe do recenzji merytorycznej; bez niej nie przejdą z wersji roboczej | Najpierw recenzja wstępna na podstawie tego raportu, potem zapytania do doradców podatkowych |
| 2 | Wnioski i uproszczenia z sekcji 9 | Zdania, które wynikają z przepisów, ale nie są ich cytatem | Zostawić do czasu recenzji; wątpliwe złagodzić albo usunąć |
| 3 | Uproszczony rachunek w lekcji 12.1 | Własne uproszczenie, opisane w lekcji jako takie | Zostawić z ostrzeżeniem albo usunąć — do oceny recenzenta |
| 4 | Dokument „Podatki pod kontrolą” (`docs/podatki-pod-kontrola.md`) | Dodany na zdalnej gałęzi poza tą pracą. Kierunek „ograniczania obciążeń podatkowych” styka się z zasadą nierozstrzygania sytuacji konkretnej osoby i wymaga recenzji podatkowej | Nie rozwijać przed opinią prawną; zdecydować: osobny produkt później czy archiwum |
| 5 | Raport po każdej pracy jako stała zasada | Prośba z poprzedniej wiadomości; w tej rozmowie nie zmieniałem CLAUDE.md | Dopisać do CLAUDE.md zasadę: raport w `docs/` po każdym etapie, z sekcjami jak w tym pliku |
| 6 | Kurs demonstracyjny na pulpicie | Pokazuje działanie platformy; kursant może go pomylić z treścią | Zostawić do czasu kont, potem ukryć |
| 7 | Język neutralny płciowo w lekcjach | Zastosowany w nowych lekcjach („Zapisz”, „suma wpłat”) | Utrzymać jako zasadę |
| 8 | Wartości przykładowe | Zysk 5% i wpłata 500 zł w przykładach; inflacja 2,5% (cel NBP) jako punkt odniesienia | Zostawić; każdy przykład ma podpis „nie prognoza” |
| 9 | Kolejność dalszych prac | Sekcja 12 | Wybór jednej opcji |
| 10 | Hosting i domena | Potrzebne do wdrożenia, nawet bez publikacji | Po badaniu nazw (krok 4 harmonogramu) |

---

## 9. Wnioski i uproszczenia autora [Z] — do szczególnej oceny

To zdania, które nie są cytatem przepisu, tylko z niego wynikają albo upraszczają rzeczywistość.

| Lekcja | Zdanie w lekcji | Na czym opiera się wniosek |
| --- | --- | --- |
| 1.1 | „Im później przechodzisz, tym krótsze jest średnie dalsze trwanie życia, więc ten sam kapitał dzieli się przez mniejszą liczbę miesięcy.” | Wzór z art. 26; własność tablic trwania życia |
| 1.1 | „Waloryzacja to okresowe przeliczanie zapisanych kwot według zasad określonych w ustawie.” „Subkonto to wydzielona część konta w ZUS.” | Definicje opisowe, bez szczegółów wskaźnika waloryzacji ani historii subkonta |
| 1.2 | „Bez wymaganego stażu podwyższenia nie ma — wypłacana jest kwota obliczona ze wzoru.” | Art. 87 ust. 1 a contrario |
| 1.2 | „Taka podstawa [preferencyjna, 30% minimalnego wynagrodzenia] jest niższa od minimalnego wynagrodzenia, więc te miesiące nie liczą się do stażu w całości.” | Art. 18a ustawy o sus i art. 87 ust. 3 ustawy o FUS. **Czy to poprawne zestawienie? Czy dotyczy też „małego ZUS plus”?** |
| 1.3 | „Jeśli zarabiasz więcej, niż wynosi zadeklarowana podstawa, kapitał w ZUS rośnie wolniej, niż rósłby, gdyby podstawą był cały Twój dochód.” | Art. 18 ust. 8 i art. 22 |
| 1.3 | „Pieniędzy zapisanych w ZUS nie wypłacisz przed emeryturą.” | Ogólna zasada systemu; nie mamy na nią osobnego twierdzenia [P] |
| 1.3 | Tabela: dodatkowe 1 000 / 2 000 / 5 000 zł podstawy → 195 / 390 / 976 zł składki emerytalnej miesięcznie | Arytmetyka na stawce 19,52%; podpis zaznacza, że od tej samej podstawy liczy się też składki rentowe |
| 4.1 | „Limit IKE jest taki sam dla wszystkich — nie zależy od tego, czy prowadzisz działalność.” | Wzór limitu IKE nie ma wariantu dla działalności (w odróżnieniu od IKZE) |
| 4.2 | „Jeśli środki są warte mniej niż suma wpłat, dochodu nie ma.” | Definicja dochodu przy zwrocie |
| 12.1 | Uproszczony rachunek: „wartość realna oszczędności ÷ (luka × 12) = liczba lat, przez które oszczędności pokryłyby lukę” | **Własne uproszczenie.** Lekcja opisuje je jako „duże uproszczenie: pomija podatki, zysk i inflację w czasie wypłat oraz zasady wypłat z poszczególnych kont” |
| 12.2 | „Do tych warunków [5 lat kalendarzowych wpłat na IKE i IKZE] liczy się więc rok, w którym wpłata wpłynęła na konto.” | Brzmienie „lata kalendarzowe” w art. 34 i 34a |
| 9.x | „Wyższy zysk oznacza zwykle wyższe ryzyko.” | Zasada ogólna, bez źródła prawnego |

Przykłady liczbowe w module 9 to symulacje przy stałych założeniach: wpłata 500 zł miesięcznie, zysk 0%, 2,5% i 5%, inflacja 2,5%, koszty 0–2%. Każda tabela ma podpis „Przykład obliczeniowy, nie prognoza”.

Kontrolne wyniki:

- 10 000 zł przy 5% przez 10 lat → 16 289 zł;
- 1 000 zł przy inflacji 2,5% po 20 latach → 1 639 zł kosztu i 610 zł siły nabywczej;
- wcześniejszy zwrot z IKE przy wpłatach 40 000 zł i wartości 50 000 zł → 1 900 zł podatku.

---

## 10. Prośba do recenzenta

1. Oceń poprawność zdań z sekcji 9. Przy każdym napisz: poprawne / wymaga zmiany (jak?) / usunąć.
2. Czy zestawienie preferencyjnej podstawy składek z proporcjonalnym liczeniem stażu do najniższej emerytury (lekcja 1.2) jest poprawne? Czy powinniśmy wspomnieć o innych podstawach niższych niż minimalne wynagrodzenie?
3. Czy uproszczony rachunek z lekcji 12.1 jest pomocny, czy wprowadza w błąd? Jeśli wprowadza — co zamiast niego?
4. Czy w którejkolwiek lekcji widzisz treść, która może być odebrana jako doradztwo inwestycyjne lub podatkowe?
5. Czego brakuje osobie na JDG lub B2B w modułach 1, 2, 4, 9 i 12, a co da się opisać bez rozstrzygania kwestii podatkowych?
6. Czy kolejność prac z sekcji 12 jest rozsądna?

## 11. Format odpowiedzi

Dla każdej uwagi:

- **Gdzie:** numer lekcji albo sekcji raportu.
- **Problem:** co jest nie tak.
- **Waga:** krytyczna (błąd merytoryczny lub prawny) / istotna / drobna.
- **Propozycja:** konkretne brzmienie albo działanie.
- **Źródło:** przepis lub dokument, jeśli uwaga dotyczy prawa.

Uwag bez źródła nie wprowadzimy do treści jako faktów; trafią na listę pytań do doradcy.

---

## 12. Rekomendowany następny etap (nie rozpoczęty)

**Etap 2b — weryfikacja i domknięcie treści bez blokad.**

| Kolejność | Zadanie | Warunek startu |
| --- | --- | --- |
| 1 | Poprawki lekcji po recenzji tego raportu | Odpowiedź recenzenta wklejona do rozmowy |
| 2 | Rozdziały PDF 1 i 12 złożone z gotowych lekcji | Polecenie właściciela |
| 3 | Moduł 8 (PPK i PPE): weryfikacja ustawy o PPK w źródle pierwotnym, twierdzenia [P], lekcje | Polecenie właściciela |
| 4 | Ujednolicenie odczytu liczb w `Kalkulator.astro` z `proste.ts` | Przy okazji prac nad narzędziami |

Równolegle, poza repozytorium (kroki 1–3 harmonogramu):

1. 10 rozmów z grupą docelową (`docs/walidacja/scenariusz-rozmow.md`); lekcje modułów 2 i 12 mogą służyć jako próbka;
2. dane podmiotu i adres kontaktowy w `src/config/serwis.json`;
3. zapytania ofertowe do doradców podatkowych (`docs/walidacja/zapytanie-do-doradcy.md`) — z 12 lekcjami i rejestrem jako materiałem do wyceny.

Nie rekomenduję teraz:

- modułów 3 i 5–7 — czekają na recenzję podatkową;
- etapu 3 (konta i ochrona treści) — po polityce prywatności i wyborze hostingu;
- sprzedaży.

**Jak obejrzeć stan lokalnie:** w katalogu projektu uruchom `git pull`, `npm install`, `npm run build`, `npm run preview` i otwórz `http://localhost:4321/platforma/`.
