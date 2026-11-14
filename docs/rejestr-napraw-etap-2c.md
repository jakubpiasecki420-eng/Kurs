# Rejestr napraw — etap 2C

Data: 14 listopada 2026 r. Punkt wyjścia: commit `a9811ab` (etap 2B). Opis audytu: `docs/audyt-kontrolny-etap-2b.md`.

**Klasyfikacja:**

- **POTWIERDZONY BŁĄD** — istnieje i wymaga naprawy;
- **NIEJEDNOZNACZNOŚĆ** — możliwe różne uzasadnione odczytania;
- **ULEPSZENIE** — działa, ale można lepiej;
- **POTENCJALNY BŁĄD** — wymaga dodatkowej weryfikacji;
- **BRAK PODSTAW** — nie udało się potwierdzić.

**Statusy:**

- **naprawione** — zmienione i sprawdzone testem lub w przeglądarce;
- **pozostawione** — świadomie bez zmian, z powodem;
- **ekspert** — czeka na opinię.

## Treść lekcji

| ID | Plik | Problem | Klasyfikacja | Poprawka | Test potwierdzający | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A-01 | `src/content/lekcje/emerytura-pod-kontrola/wiek-i-najnizsza-emerytura.md` (1.2) | Ulga na start opisana bez warunków (pierwsza działalność albo po 60 miesiącach, nie dla byłego pracodawcy, możliwość rezygnacji) | POTWIERDZONY BŁĄD | Dodane warunki z art. 18 ust. 1–2 Prawa przedsiębiorców | Render lekcji w `tresc.test.ts`; e2e strony lekcji | naprawione |
| A-02 | `…/podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | Zakaz korekty deklaracji uogólniony na wszystkie sposoby ustalania podstawy, także na mały ZUS plus | NIEJEDNOZNACZNOŚĆ | Zawężone do podstawy deklarowanej (art. 18 ust. 8a) | `tresc.test.ts` | naprawione |
| A-03 | `…/podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | „Na etacie jest nią przychód z pracy” — zdanie merytoryczne bez twierdzenia P | POTWIERDZONY BŁĄD (zasada §4 CLAUDE.md) | Nowe twierdzenie `sus-podstawa-pracownik` (art. 18 ust. 1 ustawy o sus) z przypisem | `tresc.test.ts` (każde zadeklarowane twierdzenie ma przypis), `rejestr.test.ts` | naprawione |
| A-04 | `…/inflacja-wartosc-realna.md` (9.1) | Brak wyjaśnienia realnej stopy zwrotu i różnicy między przybliżeniem a wzorem dokładnym | ULEPSZENIE | Sekcja „Realna stopa zwrotu” i tabela `tabela:stopa-realna` liczona z rejestru | `tresc-markdown.test.ts` (2,44%, −2,44%), e2e „lekcja 9.1 pokazuje stopę realną” | naprawione |
| A-05 | `src/content/lekcje/kurs-demonstracyjny/jak-zbudowana-jest-lekcja.md` | Forma męska „skończyłeś” | POTWIERDZONY BŁĄD (konwencja §9) | Forma neutralna | e2e | naprawione |
| A-06 | `src/lib/przyklady.ts` | „1 000 zł” w nagłówkach tabel łamie się między „1” a „000” na telefonie | POTWIERDZONY BŁĄD (typografia) | Kwoty formatowane funkcją `zl()` z twardą spacją | Zrzut 390 px; testy przykładów | naprawione |
| A-07 | Lekcje 1.1–12.2 | Ponowna kontrola poprawek etapu 2B (subkonto, brutto, mały ZUS plus, zwrot IKE, quizy) | — | Brak nowych błędów poza A-01 do A-03 | Testy jednostkowe i e2e | sprawdzone |
| A-08 | `…/podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | Trzykolumnowa tabela przewija się na telefonie w swoim regionie | ULEPSZENIE | — | — | pozostawione (zgodne z konwencją serwisu) |
| A-09 | Lekcje 1.2, 1.3, 4.2 | Liczby z twierdzeń bez pola `wartosc` („24 miesiące”, „30%”, „60 miesięcy”) wpisane w treść | ULEPSZENIE | — | Zgodność sprawdzona ręcznie z rejestrem | pozostawione (wymaga rozszerzenia rejestru o kilka wartości na twierdzenie) |

## Strony publiczne

| ID | Plik | Problem | Klasyfikacja | Poprawka | Test potwierdzający | Status |
| --- | --- | --- | --- | --- | --- | --- |
| B-01 | `src/pages/ikze.astro` | „Zwrot jest przychodem z innych źródeł. Nie obejmuje go **więc** stawka 10%” — błędne wynikanie: art. 20 ust. 1 ustawy o PIT zalicza do przychodów z innych źródeł także wypłaty z IKZE | POTWIERDZONY BŁĄD | „Stawka 10% dotyczy wypłat, a nie zwrotu; rozliczenie zwrotu ustal z doradcą” | e2e `/ikze/` | naprawione; pytanie T-03 do doradcy |
| B-02 | `src/pages/ikze.astro` | „Bilans zależy od stawki” — pominięty wpływ wyników inwestycji | ULEPSZENIE | „zależy m.in. od stawki … i od wyników inwestycji” | e2e | naprawione |
| B-03 | `src/pages/oki.astro`, `src/data/rejestr.json` (`oki-kwalifikowane`) | „akcje i obligacje denominowane w złotych” — art. 26 ust. 4 ustawy o OKI mówi o akcjach spółek o kapitale zakładowym w złotych, w obrocie zorganizowanym | POTWIERDZONY BŁĄD (nieprecyzyjność) | Treść strony i twierdzenia zgodna z art. 26 ust. 4 | e2e `/oki/`, `rejestr.test.ts` | naprawione |
| B-04 | `src/pages/jdg-b2b.astro` | Opis odliczenia IKZE bez wzmianki o 10% podatku przy wypłacie | POTWIERDZONY BŁĄD (zasada §8 CLAUDE.md) | Punkt z `ikze-wyplata-podatek` i przypisem | e2e `/jdg-b2b/` | naprawione |
| B-05 | `src/pages/jdg-b2b.astro` | „Ile wpłaciłeś”, „zanim zamrozisz pieniądze” | POTWIERDZONY BŁĄD (konwencja) / ULEPSZENIE (język) | Formy neutralne | e2e | naprawione |
| B-06 | `src/pages/index.astro`, `src/pages/platforma/postep.astro` | „gdzie skończyłeś”, „Nie rozwiązałeś jeszcze” | POTWIERDZONY BŁĄD (konwencja) | Formy neutralne | e2e | naprawione |
| B-07 | `src/pages/kalkulator.astro` | Wartość 2,5% wpisana na sztywno zamiast pobrania z rejestru | POTWIERDZONY BŁĄD (zasada §4) | `procent(p.wartosc('nbp-cel-inflacyjny'))` | e2e `/kalkulator/` | naprawione |
| B-08 | `src/pages/oki.astro` | Liczby 19%, 0,1%, 70% wpisane w komponent; twierdzenia mają po kilka liczb i nie mają pola `wartosc` | POTWIERDZONY BŁĄD (zasada §4) | — | Zgodność z art. 25–26 ustawy o OKI sprawdzona ręcznie | pozostawione — wymaga rozdzielenia twierdzeń (plan, punkt T-4) |
| B-09 | `src/content/artykuly/wartosc-nominalna-i-realna.md` | Liczby 2,5%, 64%, 120 000 / 73 000 zł wpisane w tekst; artykuły nie korzystają z renderera lekcji | ULEPSZENIE | — | Liczby sprawdzone ręcznie (73 233 zł) | pozostawione (plan, punkt T-5) |

## Kalkulatory

| ID | Plik | Problem | Klasyfikacja | Poprawka | Test potwierdzający | Status |
| --- | --- | --- | --- | --- | --- | --- |
| C-01 | `src/lib/kalkulator/proste.ts` | Wariant „procent prosty” przy stracie spadał poniżej zera. Dane: 1 zł, −20%, 50 lat. Oczekiwane: 0 zł. Było: −9 zł | POTWIERDZONY BŁĄD | `Math.max(0, …)` — strata nie przekracza kapitału | `proste.test.ts` („procent prosty przy stracie nie spada poniżej zera”), e2e „przy dużej stracie żadna wartość nie jest ujemna” | naprawione |
| C-02 | `src/lib/kalkulator/proste.ts`, `proste-widok.ts` | Kalkulator inflacji nie pokazywał inflacji skumulowanej (różnica między roczną a łączną) | ULEPSZENIE | Pole `skumulowana` i kafel „Łączny wzrost cen … (inflacja skumulowana)” | `proste.test.ts` (63,9% dla 2,5% × 20 lat; większa niż 20 × 2,5%), e2e | naprawione |
| C-03 | `src/components/platforma/WidokNarzedzia.astro`, `src/pages/kalkulator.astro` | Domyślna stopa zwrotu równa celowi NBP mogła być odczytana jako prognoza zysku | NIEJEDNOZNACZNOŚĆ | Opisy: „hipotetyczne założenie, nie prognoza zysku; cel NBP dotyczy wzrostu cen” | e2e stron narzędzi | naprawione |
| C-04 | `src/components/Kalkulator.astro` | Przyciski 0–7% bez informacji, że to hipotetyczne warianty | ULEPSZENIE | Etykieta grupy i opis pola | e2e (dostępność, nazwa grupy) | naprawione |
| C-05 | `src/lib/kalkulator/proste.ts` | Brak funkcji stopy realnej | ULEPSZENIE | `stopaRealna()` (wzór dokładny) | `proste.test.ts` | naprawione |
| C-06 | `src/lib/platforma/narzedzia.ts` | Symulator emerytalny (planowany) bez zastrzeżenia, że nie będzie prognozą ZUS | ULEPSZENIE | Pole `uwaga` | `narzedzia.test.ts` | naprawione |
| C-07 | Wszystkie kalkulatory | Niezależne przeliczenie 12 przypadków (w tym skrajnych: 100 000 zł × 50 lat × 20%, inflacja −5%, 1 zł × −20%) | — | Zgodność co do 10⁻⁶ po poprawce C-01 | Skrypt kontrolny (Python) i testy | sprawdzone |
| C-08 | `src/components/Kalkulator.astro` | Kalkulator oszczędzania nie pokazuje realnej stopy zwrotu | ULEPSZENIE | — | — | pozostawione (wyjaśnia to lekcja 9.1; zmiana interfejsu do decyzji) |

## Rejestr twierdzeń

| ID | Plik | Problem | Klasyfikacja | Poprawka | Test potwierdzający | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D-01 | `src/data/rejestr.json`, `src/lib/rejestr.ts`, `scripts/generuj-rejestr.mjs`, `src/pages/zrodla.astro` | Status P nie odróżniał potwierdzenia treści przepisu od interpretacji | ULEPSZENIE (wymóg właściciela) | Pola `interpretacja` (brzmienie / wniosek), `uwagi`, `obowiazujeOd`; oznaczenia na stronie `/zrodla/` i w dokumencie rejestru | `rejestr.test.ts` (5 nowych testów), e2e „rejestr źródeł oddziela brzmienie przepisu od wniosku” | naprawione |
| D-02 | `src/data/rejestr.json` | `stanNaDzien` 13.11, a część twierdzeń sprawdzona 14.11; daty nie odzwierciedlały ponownych porównań z etapów 2A–2C | POTWIERDZONY BŁĄD (niespójność) | `stanNaDzien` = 2026-11-14; `sprawdzono` = 2026-11-14 dla 90 twierdzeń (89 porównanych ponownie z aktem 14.11 i 1 nowe) | `rejestr.test.ts` („data sprawdzenia nie jest późniejsza niż stan prawny”) | naprawione |
| D-03 | `src/data/rejestr.json` | 3 twierdzenia P są wnioskami: `zus-hipotetyczna-bez-subkonta`, `fus-najnizsza-przychod`, `zdrowotna-podstawa` | NIEJEDNOZNACZNOŚĆ | Oznaczone `wniosek` z opisem ograniczeń | `rejestr.test.ts` | naprawione (treść); ekspert (interpretacja) |
| D-04 | `knf-dobre-praktyki`, `doradztwo-*`, `konsument-*`, `nazwy-*` | Twierdzenia nieużywane w treści, sprawdzone 13.11; w tym etapie nie porównano ich ponownie ze źródłem | BRAK PODSTAW (do ponownej weryfikacji) | — | — | pozostawione (data 13.11 zachowana) |

## Architektura i technika

| ID | Plik | Problem | Klasyfikacja | Poprawka | Test potwierdzający | Status |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | `src/pages/program.astro` | Identyfikator kursu wpisany jako tekst | ULEPSZENIE | Stała `ID_KURSU_AKTYWNEGO` | Build, e2e `/program/` | naprawione |
| E-02 | `src/layouts/Aplikacja.astro`, `src/pages/platforma/index.astro`, `postep.astro` | Menu, pulpit i panel postępu zakładają jeden kurs aktywny | ULEPSZENIE | Opis zmian w `docs/architektura-wielokursowa.md` | — | pozostawione (nie budujemy drugiego kursu w tym etapie) |
| E-03 | `src/lib/platforma/postep.ts` | Czy postęp dwóch kursów o tych samych identyfikatorach lekcji jest rozdzielony | POTENCJALNY BŁĄD | Brak błędu — potwierdzone testem | `postep.test.ts` („wiele kursów”, 2 testy) | sprawdzone |
| E-04 | Wstawianie HTML (`set:html`, `innerHTML`) | Ryzyko wstrzyknięcia | POTENCJALNY BŁĄD | Brak błędu: HTML pochodzi wyłącznie z własnych treści i liczb; JSON w `<script>` ma escapowany `<`; teksty od użytkownika trafiają do DOM przez `textContent` | Przegląd kodu | sprawdzone |
| E-05 | `package.json` | Brak skryptu lint | — | — | — | pozostawione (lint nie istnieje w projekcie; kontrolę zapewniają `astro check`, testy i axe) |
