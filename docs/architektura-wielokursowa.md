# Architektura wielokursowa

Stan na dzień: **14 listopada 2026 r.** Dokument opisuje, jak obecna platforma obsłuży kolejne kursy — w tym planowany kurs „Start młodego inwestora” — bez przebudowy. Drugi kurs **nie został** zbudowany.

## 1. Co już działa dla wielu kursów

| Warstwa | Stan | Gdzie |
| --- | --- | --- |
| Program kursu | Każdy kurs to osobny plik JSON z modułami, kolejnością lekcji i warunkami dostępu | `src/content/kursy/<kurs>.json`, schemat w `src/content.config.ts` |
| Lekcje | Lekcja należy do katalogu swojego kursu; identyfikator lekcji jest unikalny w obrębie kursu (dwa kursy mogą mieć lekcję o tej samej nazwie pliku) | `src/content/lekcje/<kurs>/<lekcja>.md`, `src/lib/platforma/dane.ts` |
| Walidacja programu | `zbudujKurs()` zatrzymuje budowanie przy brakującej lekcji, lekcji spoza programu, zdublowanej lekcji i błędnym warunku | `src/lib/platforma/kurs.ts` |
| Adresy | `/platforma/kurs/<kurs>/<moduł>/<lekcja>/` — generowane dla każdego kursu | `src/pages/platforma/kurs/[kurs]/…` |
| Postęp | Stan przechowuje osobny obiekt dla każdego kursu: ukończone lekcje i moduły, bieżąca lekcja, wyniki quizów. Historia aktywności zapisuje identyfikator kursu | `src/lib/platforma/postep.ts`; test „wiele kursów” w `postep.test.ts` |
| Widoki w przeglądarce | `klient.ts` obsługuje wszystkie kursy osadzone na stronie (`data-kurs`) | `src/lib/platforma/klient.ts` |
| Quizy | Wynik zapisywany per kurs i lekcja | `postep.ts`, `Quiz.astro` |
| Narzędzia | Wspólne dla wszystkich kursów; lekcja dowolnego kursu może osadzić narzędzie polem `narzedzie` | `src/lib/platforma/narzedzia.ts`, `WidokNarzedzia.astro` |
| Źródła | Jeden rejestr twierdzeń dla całej platformy | `src/data/rejestr.json` |

W repozytorium są dziś dwa kursy: „Emerytura pod kontrolą” i kurs demonstracyjny. Platforma już teraz obsługuje je równolegle.

## 2. Co zakłada jeden kurs aktywny

Te miejsca trzeba zmienić przed udostępnieniem drugiego kursu:

| Miejsce | Obecne zachowanie | Proponowana zmiana |
| --- | --- | --- |
| `src/lib/platforma/dane.ts` — `ID_KURSU_AKTYWNEGO` | Jedna stała wskazuje kurs w menu, na pulpicie, w panelu postępu i na stronie `/program/` | Pole `kolejnosc` i flaga `wyrozniony` w JSON kursu; funkcja `kursyAktywne()` zwracająca aktywne kursy niedemonstracyjne w kolejności |
| `src/layouts/Aplikacja.astro` — menu „Mój kurs” | Link do jednego kursu | „Moje kursy” → lista kursów (`/platforma/kursy/`) albo link bezpośredni, gdy kurs jest jeden |
| `src/pages/platforma/index.astro` — pulpit | Kontynuacja nauki i moduły jednego kursu; pozostałe kursy jako karty | Sekcja „Kontynuuj” dla kursu z ostatnią aktywnością (`stan.aktywnosci[0].kurs`), karty pozostałych kursów z ich postępem |
| `src/pages/platforma/postep.astro` | Postęp jednego kursu | Sekcja na każdy kurs z jakąkolwiek aktywnością albo przełącznik kursu |
| `src/pages/program.astro` | Program kursu wskazanego stałą | Strona `/kursy/` z listą programów i `/program/<kurs>/` (przekierowanie z `/program/` zachować) |
| `src/config/serwis.json` — sekcja `produkt` | Opis jednego produktu | Dane sprzedażowe przenieść do JSON kursu albo do osobnej sekcji `kursy` w konfiguracji |

Te zmiany mieszczą się w obecnej architekturze: statyczne strony Astro, dane z kolekcji treści, postęp w przeglądarce. Nie wymagają backendu.

## 3. Proponowane rozszerzenie schematu kursu

Pola opcjonalne, aby obecne pliki działały bez zmian:

```json
{
  "tytul": "Start młodego inwestora",
  "opis": "…",
  "stan": "w-przygotowaniu",
  "demonstracyjny": false,
  "kolejnosc": 2,
  "grupaDocelowa": "Osoby młode zaczynające oszczędzać i inwestować",
  "wymagaRecenzji": ["podatki", "inwestycje"],
  "moduly": []
}
```

- `kolejnosc` — porządek na liście kursów.
- `grupaDocelowa` — pokazywana na stronie programu.
- `wymagaRecenzji` — lista obszarów, które muszą przejść recenzję przed zmianą `stan` na `aktywny`. Dzięki temu `npm run gotowosc` może zgłaszać blokadę osobno dla każdego kursu.

## 4. Zasady dla kolejnych kursów

1. **Ten sam rejestr twierdzeń.** Nowe przepisy dodajemy do `src/data/rejestr.json` z polem `interpretacja`. Nie tworzymy osobnego rejestru dla kursu.
2. **Ta sama granica edukacji.** Kurs dla młodych inwestorów nie wskazuje instrumentów, funduszy, portfeli ani instytucji. Ryzyko rośnie przy odbiorcach niepełnoletnich — zob. `docs/pytania-do-ekspertow.md`, pytania R-07 i I-03.
3. **Wspólne narzędzia.** Nowe kalkulatory trafiają do `src/lib/kalkulator/` z testami i do rejestru narzędzi. Kurs korzysta z nich polem `narzedzie`.
4. **Identyfikatory lekcji** są unikalne w obrębie kursu. Identyfikator kursu w adresie i w kluczu postępu jest stały — jego zmiana kasuje postęp kursantów.
5. **Wersja magazynu postępu** (`WERSJA_STANU`) — zmiana struktury stanu wymaga migracji w `walidujStan()`.

## 5. Czego nie robimy na tym etapie

- Nie budujemy drugiego kursu ani jego lekcji.
- Nie wprowadzamy kont, bazy danych, płatności ani subskrypcji.
- Nie zmieniamy technologii.

Plan kroków jest w `docs/plan-dalszego-rozwoju.md`, sekcja „Przygotowanie drugiego kursu”.
