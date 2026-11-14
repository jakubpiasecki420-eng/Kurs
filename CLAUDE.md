# CLAUDE.md — Finansowa Przyszłość

> Główne źródło prawdy dla projektu. Przeczytaj przed rozpoczęciem pracy. Szczegóły są w `docs/`; w razie sprzeczności obowiązuje ten plik, a sprzeczność trzeba usunąć.
>
> Stan na dzień: **14 listopada 2026 r.**

---

## 1. Rola Claude Code

Działaj jako zespół produktowo-technologiczny: projektant UX/UI, programista, projektant marki, redaktor treści, specjalista dostępności i jakości, analityk produktu oraz audytor merytoryczny.

### Zasady pracy

1. Zanim zmienisz kod, sprawdź strukturę repozytorium i istniejące konwencje (sekcja 9).
2. Nie usuwaj działających funkcji bez uzasadnienia.
3. Przy brakach informacji przyjmuj jawne, rozsądne założenia. Pytaj tylko o decyzje, które realnie blokują pracę.
4. Dziel pracę na etapy. Po każdym uruchom testy i sprawdź stronę w przeglądarce.
5. Nie twórz fikcyjnych opinii, ekspertów, certyfikatów, partnerstw, licencji, statystyk ani danych firmy.
6. Nie publikuj niezweryfikowanych twierdzeń o podatkach, ZUS, IKE, IKZE, OKI ani wynikach inwestycji.
7. Nie stosuj dark patterns, fałszywych liczników ani straszenia.
8. Priorytety: wiarygodność, czytelność, dostępność, bezpieczeństwo, użyteczność.
9. Treści dla odbiorców pisz po polsku, z poprawnymi znakami diakrytycznymi. Nazwy w kodzie również są po polsku, bez znaków diakrytycznych.
10. Nie twierdź, że domena, nazwa lub znak towarowy są dostępne, jeśli nie zostało to sprawdzone.
11. Nie udawaj, że recenzja ekspercka lub opinia prawna została wykonana.

---

## 2. Marka i cel

| Element | Treść |
| --- | --- |
| Marka nadrzędna | **Finansowa Przyszłość** |
| Hasło | „Świadomie buduj swoją przyszłość.” |
| Kategoria | Niezależna edukacja finansowa |
| Forma | **Platforma edukacyjna w przeglądarce**: kursy, moduły, lekcje, quizy, kalkulatory i postęp kursanta. PDF jest materiałem uzupełniającym |
| Pierwszy kurs | **„Emerytura pod kontrolą”** — dla osób na JDG i B2B (w przygotowaniu) |
| Rynek | Polska |
| Pierwsza grupa | Osoby prowadzące JDG i pracujące na B2B, zwłaszcza na ryczałcie i podatku liniowym |
| Kolejne grupy | Pracownicy etatowi, zleceniobiorcy, freelancerzy |

Nie sprzedajemy obietnicy wysokiej emerytury ani zysku. Sprzedajemy uporządkowaną wiedzę, narzędzia i proces, który pomaga samodzielnie przeanalizować własną sytuację.

**Misja:** upraszczać finanse, aby ludzie mogli podejmować bardziej świadome decyzje dotyczące swojej przyszłości.

**Ograniczenia wizerunkowe:**

- Marka wygląda profesjonalnie, ale nie może sugerować, że jest bankiem, funduszem, urzędem, doradcą ani podmiotem regulowanym. Zdanie o tym jest w stopce każdej strony.
- Marka nie eksponuje twarzy założyciela. Zamiast tego: jawne dane podmiotu, imienny recenzent, rejestr źródeł i jawna metoda (`docs/strategia-biznesowa.md`, sekcja 5).
- Skrótów IKE, IKZE i OKI używamy wyłącznie opisowo. Nie w nazwie marki, produktu, domeny ani w haśle reklamowym (`docs/marka.md`, sekcja 1).

Szczegóły: `docs/strategia-biznesowa.md`, `docs/grupa-docelowa-i-pozycjonowanie.md`, `docs/marka.md`.

---

## 3. Zakres merytoryczny

Obszary: system emerytalny i ZUS, IKE, IKZE, **OKI (od 1 stycznia 2027 r.)**, PPK, PPE, inflacja, procent składany, koszty, ryzyko, planowanie.

Pierwszy kurs ma 12 modułów (`src/content/kursy/emerytura-pod-kontrola.json`, rozwinięcie: `produkt/przewodnik/struktura.md`). Zakres i granice: `docs/zakres-produktu.md`. Architektura platformy: `docs/architektura-platformy.md`.

### Granice edukacji

- Wyjaśniamy zasady i przepisy ze źródłem. Nie rozstrzygamy sytuacji konkretnej osoby.
- Tłumaczymy pojęcia inwestycyjne. Nie wskazujemy instrumentów, funduszy, portfeli ani instytucji.
- Kalkulatory liczą skutki założeń wpisanych przez użytkownika. Nie zwracają rekomendacji.
- Na pytania „co mam wybrać” obowiązuje stała odpowiedź z `docs/zakres-produktu.md`, sekcja 3.
- Nie przyjmujemy wynagrodzenia od instytucji finansowych. Brak afiliacji.

---

## 4. Źródła i twierdzenia — zasady bezwzględne

1. **Jedno źródło prawdy:** `src/data/rejestr.json`. Każdy limit, stawka, warunek i przepis ma tam identyfikator, źródło, przepis, status i daty.
2. **Statusy:** `P` — przeczytane w źródle pierwotnym; `W` — źródło wtórne; `Z` — założenie własne.
3. **Na stronie i w produkcie wolno użyć wyłącznie statusu P.** Funkcja `przypisy()` zatrzyma budowanie przy próbie użycia W lub Z.
4. **Nie wpisuj liczb w komponentach.** Pobieraj je przez `p.wartosc('identyfikator')` i formatuj funkcjami z `src/lib/format.ts`.
5. Nowe twierdzenie dodajesz dopiero po przeczytaniu aktu w źródle. Preferowane: ELI/ISAP, Monitor Polski, strony ZUS, MF, MRPiPS, KNF, UOKiK.
6. Symulacje ujawniają założenia, rozróżniają wartość nominalną i realną i są oznaczone jako przykłady.
7. Każde twierdzenie P ma pole `interpretacja`: `brzmienie` (streszczenie przepisu) albo `wniosek` (połączenie przepisów lub wniosek autora — z polem `uwagi`, wymaga eksperta). Status P potwierdza treść przepisu, nie interpretację.
8. Po zmianie rejestru: `npm test`, `npm run build`, `npm run rejestr`.

Procedura i kalendarz: `docs/system-aktualizacji.md`. Czytelna wersja rejestru: `docs/rejestr-zrodel-i-twierdzen.md` (plik generowany).

---

## 5. Stan publikacji

Serwis jest **wersją roboczą**. Dopóki `publikacja.recenzjaEksperta` w `src/config/serwis.json` ma wartość `null`:

- na każdej stronie jest baner „Wersja robocza”,
- strony mają `noindex, nofollow`, a `robots.txt` blokuje indeksowanie,
- formularz zapisu jest ukryty,
- strona produktu nie pokazuje ceny i nie przyjmuje zamówień.

`npm run gotowosc` wypisuje blokady publikacji. Obecnie: brak danych podmiotu, adresu kontaktowego, recenzji podatkowej, opinii prawnej, polityki prywatności i adresu serwisu.

Nie zmieniaj tych flag bez podstawy: recenzję wpisujemy po jej wykonaniu, z nazwiskiem i numerem wpisu doradcy.

Pytania do doradcy podatkowego, prawnika i księgowego: `docs/kwestie-do-weryfikacji.md`.

---

## 6. Kierunek wizualny

Koncept B — „Droga do przyszłości”: droga z łagodnymi zakrętami prowadząca do złotego punktu. Symbol oznacza proces i kierunek; nie jest wykresem i nie obiecuje wzrostu.

| Rola | HEX | Token |
| --- | --- | --- |
| Główny granat | `#101D35` | `--granat` |
| Złoty akcent | `#D5B875` | `--zloto` |
| Jasne tło | `#F5F6F8` | `--tlo` |
| Tekst pomocniczy | `#26364B` | `--lupek` |
| Biel | `#FFFFFF` | `--biel` |

- Złoto jest akcentem. Jako tekst na jasnym tle używaj `--zloto-ciemne` (`#75581A`).
- Nagłówki: Manrope 650–700. Tekst: Inter 400–600. Fonty są serwowane lokalnie.
- Styl: instytucjonalny, współczesny, dużo przestrzeni, proste ikony liniowe. Bez zdjęć gotówki i luksusu.
- Głos: rzeczowy, spokojny, edukacyjny.

Pełny opis, pliki logo i komponenty: `docs/marka.md`.

---

## 7. Strona

| Adres | Zawartość |
| --- | --- |
| `/` | Strona główna |
| `/ike/`, `/ikze/`, `/oki/` | Przewodniki po kontach |
| `/jdg-b2b/` | Materiał dla prowadzących działalność |
| `/kalkulator/` | Kalkulator scenariuszy oszczędzania |
| `/program/` | Program kursu „Emerytura pod kontrolą” (`/produkt/` przekierowuje tutaj) |
| `/jak-uczymy/` | Prezentacja platformy i sposobu nauki |
| `/biblioteka/` | Darmowe materiały: przewodniki, artykuły, kalkulator |
| `/artykuly/` | Artykuły |
| `/platforma/…` | **Strefa kursanta** (wersja demonstracyjna): pulpit, program kursu, moduły, lekcje, postęp, narzędzia (`/platforma/narzedzia/<id>/`), ustawienia. Zawsze `noindex` |
| `/o-projekcie/` | Zasady, metoda, status serwisu |
| `/zrodla/` | Rejestr źródeł i metodologia |
| `/kontakt/` | Kontakt |
| `/polityka-prywatnosci/`, `/regulamin/` | **Nie istnieją.** Powstaną po przygotowaniu i weryfikacji prawnej |

Wymagania: mobile-first, WCAG 2.1 AA, brak agresywnych okien, czytelne formularze, dobre stany pustych danych i błędów, poprawne metadane.

Strefa kursanta działa bez kont: postęp zapisuje się w pamięci przeglądarki i każda strona strefy to komunikuje. Nie przedstawiaj tego jako konta ani synchronizacji. Nie dodawaj danych udających wyniki kursanta.

Kalkulator: `docs/kalkulator-wymagania.md`. Nie łącz zasad podatkowych z kalkulatorem oszczędzania. Biblioteki `src/lib/kalkulator/ikze.ts` nie podłączaj do interfejsu przed recenzją podatkową.

---

## 8. Marketing

- Kanały na start: strona i SEO, jeden kanał społecznościowy marki, biura rachunkowe. TikTok i wideo później.
- Serie treści: Finansowa Podstawa, Emerytura bez tajemnic, IKE czy IKZE?, Liczby przyszłości, Finansowy Audyt, Plan na przyszłość.
- Wolno pokazywać realne konsekwencje braku planu na własnych liczbach odbiorcy. Nie wolno: fałszywego strachu, zmyślonych statystyk, fałszywych odliczań, fikcyjnych opinii, gwarancji zysku, twierdzeń o niewypłacalności ZUS.
- Każda informacja o odliczeniu IKZE zawiera wzmiankę o 10% podatku przy wypłacie.

Budżet 1 500–3 000 zł, 10–15 godzin tygodniowo, brak własnej publiczności. Nie wdrażaj płatnej infrastruktury, kont użytkowników ani płatności przed potwierdzeniem popytu.

---

## 9. Technologia i polecenia

Strona statyczna: **Astro 7**, TypeScript, zwykły CSS z tokenami, bez frameworka interfejsu. Kalkulator jest małym skryptem w przeglądarce. Wybór: treść dominuje nad interakcją, strona ma działać bez JavaScriptu, hosting ma być bezpłatny.

| Polecenie | Działanie |
| --- | --- |
| `npm install` | Instalacja zależności |
| `npm run dev` | Serwer roboczy, `http://localhost:4321` |
| `npm run build` | Budowanie do `dist/` |
| `npm run preview` | Podgląd zbudowanej strony |
| `npm test` | Testy jednostkowe (Vitest) |
| `npm run test:e2e` | Buduje stronę i uruchamia testy w przeglądarce (Playwright) |
| `npm run check` | Kontrola typów |
| `npm run rejestr` | Generuje `docs/rejestr-zrodel-i-twierdzen.md` |
| `npm run logo` | Generuje pliki logo, favicon, avatar i grafikę OG |
| `npm run przewodnik` | Składa przewodnik do PDF w katalogu `wydruki/` (poza repozytorium) |
| `npm run gotowosc` | Lista blokad publikacji |

Zmienna `SITE_URL` ustawia docelowy adres serwisu. Bez niej nie powstają adresy kanoniczne ani mapa strony.

### Struktura

| Ścieżka | Zawartość |
| --- | --- |
| `src/config/serwis.json` | Marka, dane podmiotu, flagi publikacji, ustawienia zapisu |
| `src/data/rejestr.json` | Rejestr źródeł i twierdzeń |
| `src/lib/` | Rejestr, formatowanie, kolory, kalkulatory, treść lekcji (`tresc-markdown.ts`) i przykłady obliczeniowe (`przyklady.ts`) — z testami obok |
| `src/lib/platforma/` | Model kursu, budowanie programu, postęp, magazyn, rejestr narzędzi, skrypt strefy kursanta — z testami |
| `src/content/kursy/`, `src/content/lekcje/` | Programy kursów (JSON) i lekcje (Markdown) |
| `src/components/`, `src/layouts/` | Komponenty i układy: `Bazowy.astro` (strona publiczna), `Aplikacja.astro` (strefa kursanta); komponenty platformy w `src/components/platforma/` |
| `src/pages/` | Strony |
| `src/content/artykuly/` | Artykuły w Markdown ze schematem (`src/content.config.ts`) |
| `src/styles/` | Tokeny, style wspólne, `kalkulator.css` i `wykres.css` dla narzędzi, `platforma.css` dla strefy kursanta |
| `public/` | Logo, favicon, grafika OG (generowane) |
| `tests/e2e/` | Testy w przeglądarce |
| `scripts/` | Generatory i kontrola gotowości |
| `produkt/` | Przewodnik (struktura, szablon, rozdziały w `produkt/przewodnik/rozdzialy/`) i zeszyt ćwiczeń |
| `docs/` | Dokumentacja; `docs/archiwum/` — wcześniejsze analizy |

### Konwencje

- Tekst ciągły w szablonach: spacja przed elementem w nowej linii jest zachowywana (`compressHTML: false`). Przypis `<Odn>` stawiaj bezpośrednio po słowie, bez odstępu.
- Przewijane tabele mają `tabindex="0"`, `role="region"` i etykietę.
- Nowy kolor tekstu dopisz do `src/lib/kolory.ts`, `src/styles/tokeny.css` i testu kontrastu.
- Każda nowa strona trafia na listę w `tests/e2e/strony.spec.ts`.
- Strefa kursanta: stan postępu zmieniają wyłącznie funkcje z `src/lib/platforma/postep.ts`, zapisuje go magazyn (`magazyn.ts`). Widoki oznaczają elementy zależne od postępu atrybutami `data-*`, które uzupełnia `klient.ts`. Teksty do DOM tylko przez `textContent`.
- Nowa lekcja: plik w `src/content/lekcje/<kurs>/` i wpis w programie kursu. Treści merytoryczne tylko na twierdzeniach ze statusem P. W treści liczby z rejestru wstawiaj jako `{{identyfikator}}`, przypisy jako `[^identyfikator]` (bez odstępu po słowie), przykłady obliczeniowe dyrektywą `<!-- tabela:… -->` (`src/lib/przyklady.ts`). Każde twierdzenie z pola `twierdzenia` musi mieć przypis w treści.
- Fragment, którego interpretacja nie jest jednoznaczna, oznacz w lekcji akapitem `> **Do potwierdzenia przez eksperta.** …` i dopisz pytanie do raportu etapu. Test `tresc.test.ts` pilnuje listy takich lekcji.
- Quizy: co najmniej trzy odpowiedzi, poprawne rozłożone na różne pozycje, poprawna odpowiedź nie może być zwykle najdłuższa (test w `tresc.test.ts`).
- Treść dla kursanta pisz w formach neutralnych płciowo („Zapisz”, „suma wpłat”), nie „wpłaciłeś”.

---

## 10. Kryteria jakości

Zmiana jest gotowa, gdy:

- `npm test`, `npm run build` i `npm run test:e2e` przechodzą,
- strona działa na telefonie i desktopie bez przewijania w poziomie,
- automatyczne testy dostępności nie zgłaszają naruszeń,
- nie ma fikcyjnych danych ani liczb spoza rejestru,
- tekst jest poprawny językowo,
- dokumentacja w `docs/` i ten plik są zgodne ze stanem kodu.

---

## 11. Plan

Stan faz i ścieżka do publikacji: `docs/harmonogram.md`.

Etap 1 platformy (fundamenty) jest zakończony: strefa kursanta w wersji demonstracyjnej, model kursu i postępu, centrum narzędzi.

Etap 2 (treść pierwszego kursu) jest zakończony w zakresie bez blokad: kurs „Emerytura pod kontrolą” jest aktywny i ma 12 lekcji w modułach 1, 2, 4, 9 i 12, z quizami i przykładami z rejestru. Lekcje są wersją roboczą przed recenzją. W centrum narzędzi działają kalkulatory oszczędzania, procentu składanego i inflacji. Szczegóły i ograniczenia: `docs/architektura-platformy.md`.

Etap 2B (naprawa po audycie `docs/audyt-jakosci-kursu-etap-2a.md`) jest zakończony; raport: `docs/raport-etap-2b.md`.

Etap 2C (audyt kontrolny i naprawy) jest zakończony: `docs/audyt-kontrolny-etap-2b.md`, `docs/rejestr-napraw-etap-2c.md`. Pytania do ekspertów: `docs/pytania-do-ekspertow.md`. Architektura wielokursowa: `docs/architektura-wielokursowa.md`. Kolejne kroki: `docs/plan-dalszego-rozwoju.md`. Lekcje pozostają wersją roboczą przed recenzją.

Materiał uzupełniający: szkice rozdziałów 0, 2, 4 i 9 przewodnika składają się do PDF (`npm run przewodnik`) z tymi samymi przykładami obliczeniowymi co lekcje (`src/lib/przyklady.ts`).

Nie rozpoczynaj kolejnego etapu bez polecenia właściciela. Wstrzymane do czasu opinii zewnętrznych: kalkulator IKZE w interfejsie, moduły 3 i 5–7, porównanie kont według formy opodatkowania, formularz zapisu, sprzedaż, włączenie indeksowania.
