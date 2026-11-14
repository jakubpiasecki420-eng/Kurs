# Architektura platformy

Stan na dzień: **13 listopada 2026 r.** Dotyczy etapu 1: fundamentów platformy edukacyjnej.

## 1. Cel i zakres

Finansowa Przyszłość jest platformą edukacyjną dostępną w przeglądarce. Kursant przechodzi kursy podzielone na moduły i lekcje, rozwiązuje quizy, korzysta z kalkulatorów i wraca do rozpoczętej nauki. PDF jest materiałem uzupełniającym, a nie głównym produktem.

Etap 1 dostarcza działający frontend i model danych. Nie obejmuje kont, serwera, płatności, CMS ani treści kursu.

## 2. Struktura systemu

| Część | Adresy | Charakter | Indeksowanie |
| --- | --- | --- | --- |
| Strona publiczna | `/`, `/program/`, `/jak-uczymy/`, `/biblioteka/`, `/ike/`, `/ikze/`, `/oki/`, `/jdg-b2b/`, `/kalkulator/`, `/artykuly/`, `/zrodla/`, `/o-projekcie/`, `/kontakt/` | Treści statyczne, działają bez JavaScriptu | Wyłączone do czasu recenzji (`src/config/serwis.json`) |
| Strefa kursanta | `/platforma/…` | Statyczne widoki uzupełniane w przeglądarce o postęp kursanta | Zawsze wyłączone (`noindex`) |
| Administracja | `/admin/…` (zarezerwowane) | Nie istnieje. Plan w sekcji 8 | — |

Dawny adres `/produkt/` przekierowuje na `/program/`.

### Strefa kursanta

| Adres | Widok | Plik |
| --- | --- | --- |
| `/platforma/` | Pulpit: powitanie, kontynuacja nauki, postęp, moduły, ostatnia aktywność, narzędzia, pozostałe kursy (w tym demonstracyjny) | `src/pages/platforma/index.astro` |
| `/platforma/kurs/<kurs>/` | Program kursu z modułami i lekcjami | `src/pages/platforma/kurs/[kurs]/index.astro` |
| `/platforma/kurs/<kurs>/<moduł>/` | Moduł: status, warunek dostępu, lekcje, sąsiednie moduły | `…/[kurs]/[modul]/index.astro` |
| `/platforma/kurs/<kurs>/<moduł>/<lekcja>/` | Lekcja | `…/[kurs]/[modul]/[lekcja].astro` |
| `/platforma/postep/` | Panel postępu: moduły, quizy, historia | `src/pages/platforma/postep.astro` |
| `/platforma/narzedzia/` | Centrum narzędzi | `src/pages/platforma/narzedzia/index.astro` |
| `/platforma/narzedzia/<narzędzie>/` | Dostępne narzędzie z opisem: `oszczedzanie`, `procent-skladany`, `inflacja` | `…/narzedzia/[narzedzie].astro` (lista: `NARZEDZIA_DOSTEPNE`) |
| `/platforma/ustawienia/` | Nazwa wyświetlana, eksport i usuwanie danych, informacja o kontach | `src/pages/platforma/ustawienia.astro` |

Układ: `src/layouts/Aplikacja.astro` — nagłówek aplikacji, menu boczne (na telefonie dolny pasek), baner trybu demonstracyjnego, stopka z zastrzeżeniem. Style: `src/styles/platforma.css`.

## 3. Kursy, moduły i lekcje

```
KURS ──< MODUŁ ──< LEKCJA ──< SEKCJA (nagłówek ## w treści)
                        └── ĆWICZENIA: quiz, narzędzie, materiały dodatkowe, ilustracja
```

| Element | Źródło | Zawartość |
| --- | --- | --- |
| Kurs | `src/content/kursy/<kurs>.json` | Tytuł, opis, stan (`aktywny` / `w-przygotowaniu`), flaga `demonstracyjny`, program: kolejność modułów i lekcji, warunki dostępu (`wymaga`) |
| Lekcja | `src/content/lekcje/<kurs>/<lekcja>.md` | Nagłówek: moduł, tytuł, opis, czas, flaga `demonstracyjna`, twierdzenia z rejestru, ilustracja, narzędzie, materiały, quiz. Treść: sekcje `##` |

Schematy: `src/content.config.ts`. Model i typy: `src/lib/platforma/model.ts`.

`zbudujKurs()` (`src/lib/platforma/kurs.ts`) łączy program z plikami lekcji i zatrzymuje budowanie, gdy:

- program wskazuje brakującą lekcję albo lekcja deklaruje inny moduł,
- lekcja występuje dwa razy albo nie ma jej w programie,
- moduł wymaga modułu, który nie występuje wcześniej.

Lekcje podlegają tym samym zasadom źródeł co strona: twierdzenia ze statusem P, przypisy przez `przypisy()`.

### Treść lekcji i rejestr

Treść lekcji renderuje `renderujTresc()` z `src/lib/tresc-markdown.ts` (marked). W Markdownie lekcji:

| Zapis | Wynik |
| --- | --- |
| `{{identyfikator}}` | Wartość twierdzenia z rejestru, sformatowana (kwota w zł albo stawka w %) |
| `[^identyfikator]` | Przypis `[n]` prowadzący do listy źródeł; `n` to pozycja w polu `twierdzenia` |
| `<!-- przyklad:zwrot-ike -->` i inne dyrektywy | Przykład obliczeniowy z `src/lib/przyklady.ts`: tabela albo wykres z podpisem i założeniami |

Budowanie zatrzymuje się, gdy identyfikator nie jest zadeklarowany w lekcji, nie ma statusu P albo zostaje nieprzetworzony znacznik. Ten sam moduł przykładów składa przewodnik PDF, więc liczby w lekcjach i w PDF pochodzą z jednego miejsca. Tabele z Markdownu trafiają do przewijanego regionu z etykietą.

Dyrektywy: `przyklad:zwrot-ike`, `przyklad:skladka-emerytalna`, `tabela:inflacja`, `tabela:procent-skladany`, `tabela:scenariusze`, `wykres:scenariusz`, `tabela:koszty`.

### Kursy w repozytorium

| Kurs | Stan | Zawartość |
| --- | --- | --- |
| `kurs-demonstracyjny` | aktywny, demonstracyjny | 3 moduły, 6 lekcji. Treść opisuje samą platformę albo jest tekstem zastępczym. Lekcja 1.1 pokazuje wszystkie elementy szablonu |
| `emerytura-pod-kontrola` | aktywny (kurs w menu „Mój kurs”) | 12 modułów, w tym 5 z lekcjami: 1 (3 lekcje), 2 (2), 4 (2), 9 (3), 12 (2) — razem 12 lekcji. Moduły 3, 5–8, 10 i 11 są oznaczone jako w przygotowaniu. Lekcje mają znacznik „Przed recenzją eksperta”, dopóki `publikacja.recenzjaEksperta` jest puste |

### Szablon lekcji

Kolejność: okruszki → nagłówek (numer, pozycja w kursie, czas, oznaczenie treści przykładowej albo wersji przed recenzją, stan ukończenia) → informacja o blokadzie modułu → spis sekcji → treść → ilustracja → ćwiczenie z narzędziem → quiz → materiały dodatkowe → źródła → ukończenie → poprzednia / następna lekcja. Obok, na komputerze: postęp kursu i lista lekcji modułu.

Komponenty: `src/components/platforma/` (`WidokNarzedzia`, `KartaModulu`, `ListaLekcji`, `PasekPostepu`, `ZnacznikStatusu`, `Quiz`, `Ilustracja`, `MaterialyDodatkowe`, `InformacjeNarzedzia`, `KartaNarzedzia`, `NaglowekWidoku`, `BanerDemo`).

## 4. Postęp kursanta

### Dane

`StanPostepu` (`src/lib/platforma/postep.ts`):

| Pole | Zawartość |
| --- | --- |
| `wersja` | Wersja schematu (1) — podstawa przyszłych migracji |
| `profil.nazwa` | Opcjonalna nazwa wyświetlana |
| `kursy[<kurs>].ukonczoneLekcje` | Lekcja → data ukończenia |
| `kursy[<kurs>].ukonczoneModuly` | Moduł → data ukończenia |
| `kursy[<kurs>].biezaca` | Ostatnio otwarta lekcja (aktualne miejsce nauki) |
| `kursy[<kurs>].wynikiQuizow` | Lekcja → ostatni wynik (poprawne, wszystkie, data) |
| `aktywnosci` | Ostatnie 30 zdarzeń: otwarcie lekcji, ukończenie lekcji, ukończenie modułu, quiz |
| `ostatniaAktywnosc` | Data ostatniego zdarzenia |

### Warstwy

| Warstwa | Plik | Odpowiedzialność |
| --- | --- | --- |
| Logika | `postep.ts` | Czyste funkcje na niezmiennym stanie: `otworzLekcje`, `ukonczLekcje`, `cofnijUkonczenie`, `zapiszWynikQuizu`, `statusModulu`, `podsumowanie`, `nastepnaLekcja`, `walidujStan`. Czas przekazywany jako argument |
| Magazyn | `magazyn.ts` | Interfejs `MagazynPostepu` (`wczytaj`, `zapisz`, `wyczysc`). Implementacje: `MagazynLokalny` (localStorage) i `MagazynPamieci` (gdy przeglądarka blokuje zapis) |
| Widok | `klient.ts` | Sesja w przeglądarce, uzupełnianie elementów oznaczonych `data-*`, komunikaty. Teksty trafiają do DOM wyłącznie przez `textContent` |

Statusy modułu: **niedostępny** (brak lekcji albo nieukończony moduł wymagany), **dostępny**, **rozpoczęty** (ukończona co najmniej jedna lekcja albo otwarta lekcja z modułu), **ukończony** (wszystkie lekcje).

### Tryb demonstracyjny

- Postęp zapisuje się wyłącznie w pamięci tej przeglądarki (`finansowa-przyszlosc:postep:v1`). To nie jest konto ani synchronizacja.
- Każda strona strefy pokazuje baner o trybie demonstracyjnym; przy zablokowanej pamięci — ostrzeżenie, że postęp zniknie.
- Dane odczytane z pamięci przechodzą przez `walidujStan()`; uszkodzone dane dają pusty stan zamiast błędu.
- W ustawieniach kursant pobiera swoje dane jako JSON albo je usuwa.
- Platforma nie zawiera żadnych danych przedstawianych jako wyniki kursanta. Liczby na pulpicie pochodzą wyłącznie z jego własnych działań.

## 5. Narzędzia

Rejestr: `src/lib/platforma/narzedzia.ts`. Każde narzędzie — także planowane — ma opis, założenia, źródła (twierdzenia ze statusem P), datę aktualizacji metody i zastrzeżenie. Test `narzedzia.test.ts` pilnuje kompletności.

| Narzędzie | Stan | Logika |
| --- | --- | --- |
| Kalkulator regularnego oszczędzania | **Dostępne** — `/kalkulator/`, `/platforma/narzedzia/oszczedzanie/`, lekcje 9.3 i 12.1 kursu, lekcja 1.3 kursu demonstracyjnego | `src/lib/kalkulator/oszczednosci.ts`, `wykres.ts` |
| Kalkulator procentu składanego | **Dostępne** — `/platforma/narzedzia/procent-skladany/`, lekcja 9.2 | `src/lib/kalkulator/proste.ts`, `proste-widok.ts`, `wykres-linie.ts`; komponent `KalkulatorProsty.astro` |
| Kalkulator inflacji | **Dostępne** — `/platforma/narzedzia/inflacja/`, lekcja 9.1 | jak wyżej |
| Kalkulator ulgi IKZE | Po recenzji podatkowej | `src/lib/kalkulator/ikze.ts` gotowa i przetestowana |
| Porównanie IKE i IKZE | Po recenzji podatkowej | `ikzeWzgledemIke` w `ikze.ts` |
| Symulator scenariuszy emerytalnych | Planowane | Do zaprojektowania |

Nowe narzędzie: wpis w rejestrze → biblioteka obliczeń z testami w `src/lib/kalkulator/` → komponent → identyfikator w `NARZEDZIA_DOSTEPNE` i gałąź w `WidokNarzedzia.astro`. Strona `/platforma/narzedzia/<id>/` powstaje wtedy sama, a lekcja może osadzić narzędzie polem `narzedzie`. Budowanie zatrzyma się, jeśli narzędzie ma interfejs, a w rejestrze nie jest oznaczone jako dostępne.

Kalkulatory procentu składanego i inflacji liczą pierwszy wynik przy budowaniu strony (działają bez JavaScriptu), a po zmianie danych przeliczają się w przeglądarce. Wykres jest statyczny; dokładne wartości są w tabeli. Style kalkulatorów i wykresów są wspólne: `src/styles/kalkulator.css` i `src/styles/wykres.css`. W lekcji układ kalkulatora zależy od szerokości kolumny treści (zapytanie kontenerowe), nie od szerokości ekranu.

## 6. Decyzje technologiczne

| Decyzja | Uzasadnienie |
| --- | --- |
| Zostajemy przy Astro 7, wynik statyczny | Wszystkie widoki etapu 1 da się wygenerować z góry; postęp obsługuje mały skrypt. Brak kosztów serwera, szybkie strony, działanie bez JavaScriptu dla treści |
| Bez frameworka interfejsu (React, Vue) | Interakcje są proste (przyciski, formularze, uzupełnianie liczników). Framework dodałby zależności i wagę bez korzyści |
| Kolekcje treści Astro dla kursów i lekcji | Walidacja schematu przy budowaniu, treść w repozytorium z historią zmian, ten sam mechanizm co artykuły |
| Logika postępu jako czyste funkcje | Testowalna bez przeglądarki, gotowa do użycia także po stronie serwera |
| Magazyn za interfejsem | Zmiana miejsca zapisu nie dotyka logiki ani widoków |
| Statusy i liczniki uzupełniane przez atrybuty `data-*` | Jeden mechanizm dla wszystkich widoków; bez JavaScriptu widać stan początkowy |
| Testy w przeglądarce na własnym serwerze plików | Niezależność od `astro preview` działającego w tle |

## 7. Integracja backendu w przyszłości

Kolejność zalecana na etap kont:

1. **Uwierzytelnianie.** Zewnętrzny dostawca logowania albo własne konta — decyzja razem z wyborem hostingu. Wymaga polityki prywatności (blokada w `npm run gotowosc`).
2. **Magazyn serwerowy.** Nowa implementacja `MagazynPostepu`, np. `MagazynSerwerowy`, wywołująca API (`GET` i `PUT` stanu albo zdarzenia: ukończenie lekcji, wynik quizu). `utworzMagazyn()` wybiera ją dla zalogowanego kursanta. Logika w `postep.ts` zostaje bez zmian.
3. **Przeniesienie postępu z przeglądarki.** Przy pierwszym logowaniu: `MagazynLokalny.wczytaj()` → `walidujStan()` → wysłanie na serwer za zgodą kursanta.
4. **Schemat bazy.** Tabele odpowiadające polom `StanPostepu`: kursanci, ukończone lekcje (kursant, kurs, lekcja, data), wyniki quizów (kursant, lekcja, wynik, data), zdarzenia aktywności. Moduły ukończone można wyliczać z lekcji.
5. **Ochrona treści płatnej.** Dziś każda lekcja jest statycznym plikiem HTML dostępnym pod swoim adresem. Treść płatna wymaga renderowania `/platforma/kurs/…` po stronie serwera z kontrolą dostępu (Astro z adapterem i trybem serwerowym dla tej ścieżki). Strona publiczna może pozostać statyczna.
6. **Quizy z oceną po stronie serwera** — tylko jeśli wynik zacznie mieć znaczenie (np. certyfikat). Dziś odpowiedzi są w kodzie strony celowo: quiz służy utrwaleniu wiedzy.

## 8. Administracja (plan)

- Prefiks `/admin/` jest zarezerwowany. W etapie 1 nie ma żadnego widoku administracyjnego.
- Do czasu decyzji o CMS treść kursów edytuje się w plikach JSON i Markdown w repozytorium; walidację zapewniają schematy i `zbudujKurs()`.
- Pierwszy zakres panelu: podgląd kursów i lekcji ze statusem (szkic, po recenzji, opublikowana), lista twierdzeń z przeterminowanym przeglądem, statystyki ukończeń bez danych osobowych. Wymaga kont z rolą administratora.
- Wybór CMS (oparty na repozytorium albo zewnętrzny) zależy od tego, kto poza właścicielem będzie edytować treść.

## 9. Ograniczenia obecnej architektury

| Ograniczenie | Skutek | Kiedy usunąć |
| --- | --- | --- |
| Postęp tylko w przeglądarce | Brak synchronizacji między urządzeniami; utrata po wyczyszczeniu danych | Etap kont |
| Wszystkie lekcje publicznie dostępne pod adresem | Nie da się sprzedawać dostępu do treści | Przed sprzedażą kursu (sekcja 7, pkt 5) |
| Blokada modułu tylko informacyjna | Lekcję z niedostępnego modułu można otworzyć bezpośrednio | Razem z kontrolą dostępu |
| Jeden kalkulator danego rodzaju na stronę | `Kalkulator.astro` używa stałych identyfikatorów pól; `KalkulatorProsty.astro` poprzedza je rodzajem, więc kalkulator procentu i inflacji mogą stać obok siebie, ale nie dwa takie same | Przy pierwszej lekcji z dwoma narzędziami tego samego rodzaju |
| Odpowiedzi quizu w kodzie strony | Quiz nie nadaje się do egzaminu | Jeśli pojawi się certyfikat |
| Jeden aktywny kurs w menu i na pulpicie | `ID_KURSU_AKTYWNEGO` w `src/lib/platforma/dane.ts` (obecnie `emerytura-pod-kontrola`). Postęp kursu demonstracyjnego widać tylko na jego stronach | Gdy kursant będzie miał więcej niż jeden kurs |
| Bez JavaScriptu strefa pokazuje stan początkowy | Postęp i quizy wymagają JavaScriptu | Nie planujemy zmiany |
