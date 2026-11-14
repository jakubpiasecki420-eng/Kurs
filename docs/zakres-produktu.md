# Zakres pierwszego kursu i granice edukacji

Stan na dzień: **13 listopada 2026 r.**

## 1. Produkt

**„Emerytura pod kontrolą”** — kurs na platformie Finansowa Przyszłość dla osób na JDG i B2B.

| Składnik | Forma | Stan |
| --- | --- | --- |
| Kurs | 13 modułów z lekcjami, quizami i zadaniami na platformie (`/platforma/`) | Program modułów: `src/content/kursy/emerytura-pod-kontrola.json`. 20 lekcji w 8 modułach, wersja robocza przed recenzją (`docs/status-tresci-i-recenzji.md`). Na recenzję podatkową czekają moduły „Twoja forma pracy”, „IKZE”, „OKI” i „Trzy konta obok siebie”; moduł „PPK i PPE” czeka na weryfikację ustawy o PPK |
| Narzędzia | Kalkulatory w centrum narzędzi i osadzone w lekcjach | Dostępne: kalkulatory rezerwy finansowej, regularnego oszczędzania, procentu składanego i inflacji. Kalkulator IKZE i porównanie IKE/IKZE po recenzji podatkowej; symulator emerytalny planowany (`src/lib/platforma/narzedzia.ts`) |
| Materiały uzupełniające | PDF z rozdziałami i zeszyt ćwiczeń do wydruku | Szkice rozdziałów 0, 2, 4 i 9 (`npm run przewodnik`); struktura zeszytu: `produkt/workbook/struktura.md` |
| Aktualizacje | 12 miesięcy | Proces: `system-aktualizacji.md` |

Szkice rozdziałów przewodnika są źródłem treści lekcji: jeden rozdział odpowiada jednemu modułowi. Numeracja rozdziałów PDF pochodzi z pierwszej wersji programu (12 modułów) i nie odpowiada już numerom modułów na platformie — mapowanie jest w `produkt/przewodnik/struktura.md`. Moduły „Fundamenty bezpieczeństwa finansowego”, „Jak działa system emerytalny”, „Podstawy inwestowania”, „Jak porównywać instytucje i produkty” i „Twój plan” mają lekcje, a jeszcze nie mają rozdziałów PDF.

Czego kurs nie zawiera w pierwszej wersji: wideo, konsultacji indywidualnych, społeczności, portfeli modelowych, rankingów instytucji.

## 2. Układ treści

Moduły kursu odpowiadają rozdziałom przewodnika. Zmiany względem pierwotnego planu: dodany moduł o OKI, moduł o formach zatrudnienia zawężony do perspektywy przedsiębiorcy, moduł o inwestowaniu ograniczony do pojęć.

| Nr | Moduł | Zakres | Granica |
| --- | --- | --- | --- |
| 1 | Jak działa system emerytalny | Filary, skąd bierze się świadczenie | Bez prognoz wysokości świadczeń |
| 2 | ZUS: co możesz sprawdzić | Informacja o stanie konta, hipotetyczna emerytura | Prognoza to nie gwarancja |
| 3 | Twoja forma pracy | JDG i B2B szczegółowo; etat i zlecenie w tabeli porównawczej | Bez oceny, która forma jest „lepsza” |
| 4 | IKE | Limity, wypłata, zwrot, jedno konto | Bez wskazywania instytucji |
| 5 | IKZE | Limity, odliczenie według formy opodatkowania, wypłata | Rachunek opłacalności po recenzji doradcy |
| 6 | OKI | Podatek od wartości aktywów, zwolnienia | Bez oceny konkretnych funduszy |
| 7 | IKE, IKZE i OKI — porównanie | Mechanizm trzech kont, kolejność według formy opodatkowania | Wyłącznie po recenzji doradcy |
| 8 | PPK i PPE | Podstawy i kiedy mają znaczenie dla przedsiębiorcy | Krótko |
| 9 | Inflacja i procent składany | Wartość nominalna i realna, czas | Symulacje z jawnymi założeniami |
| 10 | Podstawy inwestowania | Klasy aktywów, ryzyko, dywersyfikacja, koszty | Pojęcia i kryteria; żadnych instrumentów, portfeli ani stóp zwrotu „do oczekiwania” |
| 11 | Jak porównywać instytucje i produkty | Lista pytań, tabela opłat do samodzielnego wypełnienia | Bez nazw instytucji |
| 12 | Twój plan | Rezerwa, kolejność, kwota, terminy, przegląd roczny | Plan układa czytelnik |
| — | Checklisty, słownik, źródła | — | — |

## 3. Granice edukacji

Podstawa prawna granicy: doradztwem inwestycyjnym jest rekomendacja przygotowana na podstawie potrzeb i sytuacji klienta, dotycząca instrumentów finansowych (art. 76 ustawy o obrocie instrumentami finansowymi). Dokładny przebieg granicy wymaga opinii prawnika (PR-2).

### Edukacja finansowa i emerytalna

| Wolno | Nie wolno |
| --- | --- |
| Wyjaśniać zasady systemu i przepisy ze źródłem | Obiecywać wysokość świadczenia |
| Pokazywać, gdzie czytelnik sprawdzi własne dane | Twierdzić, że ZUS nie wypłaci świadczeń |
| Podawać limity i warunki z rejestru | Podawać liczby bez źródła i daty |

### Edukacja podatkowa

| Wolno | Nie wolno |
| --- | --- |
| Opisywać mechanizm odliczenia i opodatkowania z przepisem | Rozstrzygać sytuację konkretnej osoby |
| Pokazywać rachunek na jawnych założeniach, po recenzji doradcy | Publikować wnioski o statusie „założenie własne” jako fakty |
| Wskazywać, kiedy potrzebny jest doradca podatkowy | Udawać, że recenzja została wykonana |

### Edukacja inwestycyjna

| Wolno | Nie wolno |
| --- | --- |
| Tłumaczyć pojęcia: ryzyko, dywersyfikacja, koszty, horyzont | Wskazywać konkretne instrumenty, fundusze, portfele |
| Podawać neutralne kryteria porównania | Rekomendować instytucję lub produkt |
| Pokazywać symulacje z założeniami wpisanymi przez użytkownika | Sugerować spodziewaną stopę zwrotu |
| Informować o ryzyku utraty kapitału | Przyjmować wynagrodzenie od instytucji finansowych |

### Narzędzia

- Kalkulator liczy skutki założeń wpisanych przez użytkownika. Nie zadaje pytań o sytuację osobistą po to, by coś zarekomendować, i nie zwraca wskazań typu „wybierz X”.
- Domyślne wartości nie mogą sugerować wyniku. Dlatego domyślna stopa zwrotu jest równa domyślnej inflacji.

### Pytania indywidualne

Na pytania „co mam wybrać” obowiązuje jedna odpowiedź, w komentarzach, wiadomościach i e-mailach:

> Nie oceniamy indywidualnych sytuacji i nie doradzamy, które konto, instytucję lub inwestycję wybrać. Nasze materiały i kalkulator pokażą Ci zasady i skutki różnych założeń. Z decyzją dotyczącą Twojej sytuacji zwróć się do doradcy podatkowego albo licencjonowanego doradcy inwestycyjnego.

## 4. Warunki rozpoczęcia sprzedaży

1. Recenzja doradcy podatkowego wpisana do `src/config/serwis.json`.
2. Opinia prawna w sprawach PR-1 do PR-4.
3. Regulamin, polityka prywatności i dane podmiotu opublikowane.
4. `npm run gotowosc` kończy się bez blokad.
5. Cena i zasady zwrotu podane na stronie produktu.
