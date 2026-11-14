# Audyt jakości kursu „Emerytura pod kontrolą” — etap 2A

| | |
| --- | --- |
| Data audytu | 14 listopada 2026 r. |
| Zakres | 12 lekcji w `src/content/lekcje/emerytura-pod-kontrola/`, program kursu, rejestr twierdzeń (`src/data/rejestr.json`), przypisy, przykłady obliczeniowe (`src/lib/przyklady.ts`), trzy kalkulatory, quizy, rozdziały przewodnika PDF (`produkt/przewodnik/rozdzialy/`) |
| Stan repozytorium | commit `06ed54e`, gałąź `claude/laughing-brown-837njb` |
| Zmiany w kodzie i treści | **żadne** — raport jest jedynym nowym plikiem |

## Zastrzeżenia dotyczące tego audytu

1. **Audyt nie jest niezależny.** Lekcje, kalkulatory i rejestr przygotował ten sam model, który wykonał audyt. Szukałem błędów celowo, ale nie zastąpi to recenzji osoby trzeciej.
2. **To nie jest opinia prawna ani podatkowa.** Ustalenia są porównaniem treści lekcji z brzmieniem przepisów. Interpretacje oznaczam jako **[interpretacja]**. Rozstrzygnąć je powinien doradca podatkowy albo prawnik.
3. **Źródła.** Teksty aktów pobrałem 14 listopada 2026 r. z serwisu ELI Sejmu (`api.sejm.gov.pl`) i `eli.gov.pl`. Statusy aktów i listę nowelizacji po tekstach jednolitych sprawdziłem w API ELI. Nie miałem dostępu do praktyki ZUS (np. jak naprawdę wygląda informacja o stanie konta) ani do interpretacji indywidualnych.
4. **Oznaczenia.** **Fakt** — wynika wprost z przepisu albo z obliczenia. **[interpretacja]** — mój wniosek z przepisu. **Rekomendacja** — moja propozycja.

---

## 1. Podsumowanie wykonawcze

**Ocena ogólna:** kurs jest uporządkowany, nie wskazuje produktów ani instytucji, a liczby w przykładach są policzone poprawnie. Ma jednak **dwa błędy krytyczne** w miejscu, które jest jego praktycznym celem: w liczeniu „luki” między wydatkami a emeryturą z ZUS. Ma też **kilka istotnych braków w zasadach dla przedsiębiorców**, czyli dokładnie dla grupy docelowej.

| Waga | Liczba uwag |
| --- | --- |
| KRYTYCZNA | 2 |
| WYSOKA | 8 |
| ŚREDNIA | 21 |
| NISKA | 11 |

**Najważniejsze ustalenia:**

1. **[KRYTYCZNA] Hipotetyczna emerytura nie obejmuje subkonta, a faktyczna emerytura je obejmuje.**
   - Art. 50 ust. 2 ustawy o systemie ubezpieczeń społecznych liczy hipotetyczną emeryturę ze składek z art. 40 ust. 1. Ten przepis wprost wyłącza składki zapisywane na subkoncie i odprowadzane do OFE.
   - Art. 25 ust. 1 ustawy o FUS wlicza subkonto do podstawy emerytury.
   - Lekcje 2.2 i 12.1 każą liczyć lukę od hipotetycznej emerytury i nie mówią o tym ograniczeniu.
   - **[interpretacja]** Luka wychodzi przez to zawyżona.
2. **[KRYTYCZNA] Kwota brutto porównywana z wydatkami.** Lekcje porównują hipotetyczną emeryturę z wydatkami, nie mówiąc, że to kwota przed zaliczką na podatek dochodowy (art. 34 ust. 1 ustawy o PIT) i przed składką zdrowotną 9% (art. 66 ust. 1 pkt 16 i art. 79 ust. 1 ustawy o świadczeniach opieki zdrowotnej). Luka wychodzi przez to zaniżona. Oba błędy działają w przeciwnych kierunkach, więc kursant nie wie, czy jego liczba jest za duża, czy za mała.
3. **[WYSOKA] Fałszywe uogólnienie w lekcji 1.3:** „przy działalności podstawa nie zależy od tego, ile zarabiasz”. Przy „małym ZUS plus” (art. 18c ustawy o sus) podstawa zależy od dochodu. U ryczałtowca zależy od przychodu pomnożonego przez 0,5 (art. 18c ust. 12 pkt 2) — a ryczałtowcy to główna grupa docelowa.
4. **[WYSOKA] Lekcja 1.2 pomija trzy warunki najniższej emerytury ważne dla przedsiębiorców:**
   - podstawy niższe niż minimalne wynagrodzenie przy „małym ZUS plus”;
   - limit okresów nieskładkowych do jednej trzeciej okresów składkowych (art. 87 ust. 1 w zw. z art. 5 ust. 2 ustawy o FUS);
   - utratę prawa do podwyższenia przy przychodzie z działalności przekraczającym kwotę podwyższenia (art. 87 ust. 5).
5. **[WYSOKA] Lekcja 4.2 podaje sposób liczenia dochodu przy zwrocie z IKE, który dotyczy tylko zwrotu całkowitego.** Przy zwrocie częściowym dochód liczy się proporcjonalnie (art. 30a ust. 8b ustawy o PIT).
6. **[WYSOKA] Kalkulatory odczytują „10.000” jako 10.** Kropka jako separator tysięcy to częsty zapis, a kalkulator nie zgłasza błędu i liczy wynik dla błędnej kwoty.
7. **[ŚREDNIA, systemowa] Quizy dają się zgadnąć bez wiedzy.** W 25 z 29 pytań poprawna odpowiedź jest najdłuższa, a nigdy nie stoi na trzecim miejscu.

**Co jest poprawne:** wszystkie przykłady liczbowe zgadzają się z niezależnym przeliczeniem. Limity IKE i IKZE na 2026 i 2027 r., stawki, terminy ogłoszeń i warunki wypłaty IKE oraz IKZE są zgodne z obowiązującymi przepisami. Żadna z nowelizacji uchwalonych po tekstach jednolitych nie zmienia przepisów cytowanych w lekcjach.

**Gotowość:**

- do recenzji eksperckiej — **po poprawkach K-01, K-02 i W-01 do W-06**, żeby nie płacić ekspertowi za wskazanie znanych już błędów;
- do sprzedaży — **nie**: błędy krytyczne, brak recenzji, brak opinii prawnej, brak dokumentów sprzedażowych (sekcja 12).

---

## 2. Ocena każdej lekcji

Skala własna 1–5: 5 — bez zastrzeżeń, 3 — wymaga poprawek, 1 — nie nadaje się. „Merytoryka” to zgodność z przepisami i kompletność dla JDG/B2B.

| Lekcja | Merytoryka | Zrozumiałość | Ćwiczenia i quiz | Uwagi (ID z sekcji 3) |
| --- | --- | --- | --- | --- |
| 1.1 Skąd bierze się emerytura z ZUS | 3 | 4 | 3 | Wzór i podstawa poprawne. Brak informacji, że część składki trafia na subkonto lub do OFE (S-01). Waloryzacja opisana zbyt ogólnie, bez gwarancji „nie mniej niż inflacja” (S-02). Brak wyjątku z art. 26 ust. 6 (S-03). Zdanie o „ostatnim wynagrodzeniu” nie uwzględnia kapitału początkowego (N-01) |
| 1.2 Wiek emerytalny i najniższa emerytura | 2 | 4 | 3 | Warunki wieku i stażu poprawne. Braki: mały ZUS plus i ulga na start (W-02), limit okresów nieskładkowych (W-03), utrata podwyższenia przy przychodzie z działalności (W-04). Polecenie zapisania stażu „do modułu 12”, który stażu nie używa (N-02) |
| 1.3 Podstawa składek i własne oszczędności | 2 | 4 | 3 | Fałszywe uogólnienie o podstawie (W-01). Podpis tabeli zaniża koszt wyższej podstawy (S-04). Brak górnego limitu podstawy i braku korekty deklaracji (S-05). Zdanie „nie wypłacisz przed emeryturą” bez twierdzenia w rejestrze; brak informacji, że kapitał w ZUS nie jest dziedziczony (S-06) |
| 2.1 Informacja o stanie konta w ZUS | 3 | 4 | 4 | Lista zawartości pomija subkonto i OFE (S-07). Polecenie porównania wpłat z przelewami prowadzi do pozornych rozbieżności (S-08) |
| 2.2 Jak czytać hipotetyczną emeryturę | 2 | 4 | 3 | Brak informacji o pominięciu subkonta (K-01) i o tym, że kwota jest brutto (K-02). Brak dodatkowych wariantów dla osób na 5 lat przed wiekiem emerytalnym (N-03) |
| 4.1 IKE: zasady i limit wpłat | 4 | 5 | 3 | Limity i zasady zgodne z przepisami. Pominięte ograniczenie dla małoletnich, a quiz uczy niepełnej odpowiedzi (S-09). Pominięta zasada, że limit nie spada poniżej limitu z poprzedniego roku (N-04) |
| 4.2 IKE: wypłata, zwrot i zmiana instytucji | 3 | 4 | 4 | Dochód przy częściowym zwrocie (W-05). Brak skutków wypłaty: po wypłacie jednorazowej albo pierwszej racie nie można założyć nowego IKE ani dalej wpłacać (S-10). Wypłata transferowa opisana poprawnie |
| 9.1 Inflacja i wartość realna | 5 | 5 | 4 | Poprawna. Uwagi do kalkulatora inflacji (N-05, N-06) |
| 9.2 Procent składany | 4 | 5 | 4 | Poprawna. Kalkulator przy ujemnej stopie nazywa stratę „zyskiem” (S-11). Domyślne 5% może sugerować oczekiwany zysk (S-12) |
| 9.3 Regularne oszczędzanie i koszty | 4 | 4 | 4 | Liczby poprawne. Ćwiczenie odsyła do „luki” z modułu 2, czyli dziedziczy K-01 i K-02 |
| 12.1 Twoje liczby w jednym miejscu | 2 | 4 | 2 | Luka liczona od kwoty brutto bez subkonta (K-01, K-02). Uproszczony rachunek „liczby lat” (W-06). Zalecenia normatywne podane jak fakty, quiz z normatywną odpowiedzią (S-13). Krok „Miejsce” odsyła do modułów, których nie ma (S-14) |
| 12.2 Kalendarz i przegląd roczny | 4 | 5 | 3 | Terminy zgodne z przepisami. Interpretacja „roku wpłaty” niezweryfikowana (S-15). Pytanie quizu ze sprzecznością logiczną (S-16) |

---

## 3. Tabela wykrytych problemów

Pliki lekcji leżą w `src/content/lekcje/emerytura-pod-kontrola/`.

### KRYTYCZNE

| ID | Plik / lekcja | Fragment | Problem | Rozwiązanie | Źródło |
| --- | --- | --- | --- | --- | --- |
| K-01 | `hipotetyczna-emerytura.md` (2.2), `twoje-liczby.md` (12.1), pośrednio `regularne-oszczedzanie-i-koszty.md` (9.3) | 2.2: „Suma składek i kapitału początkowego […] zostaje podzielona przez średnie dalsze trwanie życia”; „Różnica między wydatkami a hipotetyczną emeryturą to Twoja własna liczba”. 12.1: „Luka to różnica między tymi wydatkami a hipotetyczną emeryturą.” | **Fakt:** hipotetyczna emerytura obejmuje składki z art. 40 ust. 1 i kapitał początkowy (art. 50 ust. 2 ustawy o sus). Art. 40 ust. 1 wyłącza składki zapisywane na subkoncie i odprowadzane do OFE. Podstawa obliczenia faktycznej emerytury obejmuje subkonto (art. 25 ust. 1 ustawy o FUS). Na subkonto trafia 7,3% podstawy albo 4,38% przy członkostwie w OFE (art. 22 ust. 3 ustawy o sus). **[interpretacja]** Hipotetyczna emerytura pomija więc istotną część kapitału, a lekcja 1.1 sugeruje, że subkonto jest wliczane. Luka liczona w 12.1 jest systematycznie zawyżona | Dodać w 2.2 punkt „Nie obejmuje subkonta”. Pokazać, gdzie w informacji jest stan subkonta (art. 50 ust. 1a pkt 2a). Uzgodnić z ekspertem prostą metodę jego uwzględnienia albo wyraźnie opisać lukę jako szacunek ostrożny. Sprawdzić praktykę ZUS (pytanie P-01) | [ustawa o sus, t.j. Dz.U. 2026 poz. 1474](https://api.sejm.gov.pl/eli/acts/DU/2026/1474/text.pdf) art. 22 ust. 3, art. 40 ust. 1, art. 50 ust. 1a pkt 2a i ust. 2; [ustawa o FUS, t.j. Dz.U. 2025 poz. 1749](https://api.sejm.gov.pl/eli/acts/DU/2025/1749/text.pdf) art. 25 ust. 1 |
| K-02 | `hipotetyczna-emerytura.md` (2.2), `twoje-liczby.md` (12.1) | 2.2: „Zapisz obok swoje obecne miesięczne wydatki. Porównaj obie liczby.” 12.1: „szacowane wydatki na emeryturze w dzisiejszych pieniądzach” | **Fakt:** od emerytury organ rentowy pobiera zaliczkę na podatek dochodowy (art. 34 ust. 1 ustawy o PIT). Emeryt podlega obowiązkowemu ubezpieczeniu zdrowotnemu (art. 66 ust. 1 pkt 16), składka wynosi 9% podstawy (art. 79 ust. 1). Art. 25 ust. 1b ustawy o FUS mówi o emeryturze „przed odliczeniem zaliczki na podatek […] i składki na ubezpieczenie zdrowotne”. **[interpretacja]** Hipotetyczna emerytura to kwota brutto, a wydatki płaci się z kwoty netto. Lekcja tego nie mówi, więc luka jest zaniżona | Dodać wyraźnie: „To kwota brutto. Do ręki trafia mniej — po zaliczce na podatek i składce zdrowotnej.” Przykład netto przygotować dopiero po recenzji podatkowej (P-04) | [ustawa o PIT, t.j. Dz.U. 2026 poz. 592](https://api.sejm.gov.pl/eli/acts/DU/2026/592/text.pdf) art. 34 ust. 1; [ustawa o świadczeniach opieki zdrowotnej, t.j. Dz.U. 2025 poz. 1461](https://api.sejm.gov.pl/eli/acts/DU/2025/1461/text.pdf) art. 66 ust. 1 pkt 16, art. 79 ust. 1 (nowelizacji tej ustawy po tekście jednolitym nie przejrzałem — do potwierdzenia); ustawa o FUS art. 25 ust. 1b |

### WYSOKIE

| ID | Plik / lekcja | Fragment | Problem | Rozwiązanie | Źródło |
| --- | --- | --- | --- | --- | --- |
| W-01 | `podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | „Przy działalności podstawa nie zależy od tego, ile zarabiasz, tylko od tego, co zadeklarujesz.” | **Fakt:** przy „małym ZUS plus” podstawa zależy od dochodu z poprzedniego roku (art. 18c ust. 1–3). U ryczałtowca dochodem jest przychód pomnożony przez 0,5 (art. 18c ust. 12 pkt 2). Podstawa wynosi wtedy od 30% minimalnego wynagrodzenia do 60% prognozowanego przeciętnego wynagrodzenia (ust. 2), przez maksymalnie 36 miesięcy w każdych 60 (ust. 11a). Zdanie jest fałszywe dla istotnej części grupy docelowej | Opisać trzy sposoby ustalania podstawy: preferencyjną (art. 18a), „mały ZUS plus” (art. 18c) i zwykłą (art. 18 ust. 8). Dodać twierdzenia [P] do rejestru | ustawa o sus art. 18 ust. 8, art. 18a, art. 18c |
| W-02 | `wiek-i-najnizsza-emerytura.md` (1.2) | „Przykład sytuacji, której to dotyczy: przez pierwsze 24 miesiące działalności […]” | Lekcja podaje tylko preferencyjną podstawę. „Mały ZUS plus” też daje podstawę niższą niż minimalne wynagrodzenie (minimum 30% minimalnego wynagrodzenia, art. 18c ust. 2), więc te miesiące także liczą się do stażu w części (art. 87 ust. 3 ustawy o FUS). Lekcja nie wspomina o „uldze na start”. **Niezweryfikowane:** treść ulgi (art. 18 Prawa przedsiębiorców) i jej skutek dla okresów składkowych — w tym audycie nie czytałem tej ustawy | Dodać „mały ZUS plus” jako drugi przykład. Ulgę na start opisać dopiero po weryfikacji w Prawie przedsiębiorców i ustawie o FUS (P-02) | ustawa o sus art. 18c ust. 2; ustawa o FUS art. 87 ust. 3 |
| W-03 | `wiek-i-najnizsza-emerytura.md` (1.2) | Tabela „Okresy składkowe i nieskładkowe: co najmniej 20 / 25 lat” | Pominięty warunek z art. 87 ust. 1 („Przepis art. 5 ust. 2 stosuje się odpowiednio”): okresy nieskładkowe liczą się najwyżej do jednej trzeciej okresów składkowych | Dodać jedno zdanie i wyjaśnić oba rodzaje okresów (zob. S-17) | ustawa o FUS art. 5 ust. 2, art. 87 ust. 1 |
| W-04 | `wiek-i-najnizsza-emerytura.md` (1.2) | Cała sekcja „Najniższa emerytura: dwa warunki naraz” | Pominięte art. 87 ust. 5: podwyższenie do najniższej emerytury nie przysługuje, jeśli emeryt osiąga przychód z działalności z art. 104 ust. 1–4 przekraczający kwotę podwyższenia. **[interpretacja]** Dotyczy osób, które po przejściu na emeryturę dalej prowadzą działalność — typowy scenariusz dla grupy docelowej. Tytuł „dwa warunki” jest przez to mylący | Dodać trzeci warunek albo sekcję „Kiedy podwyższenia nie ma”. Skutki dla JDG potwierdzić u eksperta (P-03) | ustawa o FUS art. 87 ust. 5 i 5a, art. 104 |
| W-05 | `ike-wyplata-i-zwrot.md` (4.2), także rozdział 4 PDF | „Pieniądze możesz wycofać wcześniej. Wtedy od dochodu pobierany jest podatek 19%. Dochodem jest różnica między wartością środków na koncie a sumą wpłat.” | **Fakt:** ta definicja dotyczy zwrotu (art. 30a ust. 8 ustawy o PIT). Częściowy zwrot jest dopuszczalny (art. 37 ust. 1a ustawy o IKE). Dochodem jest wtedy kwota zwrotu pomniejszona o proporcjonalną część wpłat (art. 30a ust. 8b), a późniejszy zwrot całkowity liczy się według ust. 8a. Lekcja nie wspomina o częściowym zwrocie, a jej ogólny opis jest dla niego błędny | Rozróżnić zwrot całkowity (wypowiedzenie umowy, art. 37 ust. 1) i częściowy. Dla częściowego podać zasadę proporcji i prosty przykład | [ustawa o IKE i IKZE, t.j. Dz.U. 2026 poz. 91](https://api.sejm.gov.pl/eli/acts/DU/2026/91/text.pdf) art. 37 ust. 1 i 1a; ustawa o PIT art. 30a ust. 1 pkt 10, ust. 8–8d |
| W-06 | `twoje-liczby.md` (12.1) | „wartość realna oszczędności ÷ (luka × 12) = liczba lat, przez które oszczędności pokryłyby lukę” | Własne uproszczenie, choć opisane jako uproszczenie. Daje konkretną „liczbę lat”, którą łatwo odczytać jako odpowiedź na pytanie „czy mi wystarczy”. Wynik jest obciążony błędami K-01 i K-02. Rachunek pomija podatek przy wypłacie, który zależy od konta (np. 10% od wypłat z IKZE — art. 30 ust. 1 pkt 14 ustawy o PIT), oraz to, że długość życia jest nieznana | Usunąć do czasu recenzji albo zastąpić miarą bez interpretacji czasu, np. „jaka część luki w skali roku” — z wyraźnym zastrzeżeniem. Decyzja eksperta (P-07) | ustawa o PIT art. 30 ust. 1 pkt 14 |
| W-07 | Kalkulatory: `src/lib/kalkulator/proste.ts` (`liczbaZPola`), `src/components/Kalkulator.astro` (`liczba`) | Odczyt liczb z pól | **Błąd.** Dane: kwota początkowa „10.000”. Oczekiwane: 10 000 zł albo komunikat o błędzie. Rzeczywiste: 10 zł bez komunikatu (sprawdzone: `liczbaZPola('10.000') → 10`). „1.000,50” daje błąd (NaN), więc zachowanie jest niespójne | Traktować kropkę przed trzema cyframi jako separator tysięcy albo zgłaszać błąd, gdy zapis jest niejednoznaczny. Dodać test | — |
| W-08 | Cały kurs: tytuły modułów „IKE”, „IKZE”, „OKI”; planowana sprzedaż | Tytuły modułów 4–6 | **Fakt:** art. 18 ustawy o IKE zastrzega „określenie prowadzonej działalności” i „używanie w reklamie” nazw i skrótów IKE oraz IKZE dla instytucji prowadzących konta. Za używanie tych określeń „do określenia prowadzonej działalności lub reklamy” przez osobę nieuprawnioną grozi grzywna do 1 000 000 zł lub pozbawienie wolności do 3 lat (art. 40 ust. 1). Projekt ma już zasadę opisowego użycia nazw. **[interpretacja]** Opisowe użycie w treści edukacyjnej prawdopodobnie nie jest „określeniem działalności”, ale reklama płatnego kursu może być oceniona inaczej | Bez opinii prawnej nie używać nazw w materiałach reklamowych kursu (P-08). Blokada już istnieje w `npm run gotowosc` | ustawa o IKE art. 18, art. 40 ust. 1; rejestr: `nazwy-ike-ikze`, `nazwa-oki` |

### ŚREDNIE

| ID | Plik / lekcja | Fragment | Problem | Rozwiązanie | Źródło |
| --- | --- | --- | --- | --- | --- |
| S-01 | `skad-bierze-sie-emerytura.md` (1.1) | „ZUS prowadzi Twoje indywidualne konto i zapisuje na nim zwaloryzowaną wysokość składek” | Na koncie nie jest zapisywana cała składka 19,52%. Część trafia na subkonto albo do OFE (art. 22 ust. 3, art. 40 ust. 1). Bez tego kursant nie zrozumie K-01 | Dodać: „Część składki jest zapisywana na subkoncie (albo trafia do OFE, jeśli jesteś jego członkiem)” | ustawa o sus art. 22 ust. 3, art. 40 ust. 1 |
| S-02 | `skad-bierze-sie-emerytura.md` (1.1) | „Waloryzacja to okresowe przeliczanie zapisanych kwot według zasad określonych w ustawie.” | Definicja pusta. **Fakt:** waloryzacja odbywa się corocznie od 1 czerwca, a wskaźnik nie może być niższy niż wskaźnik cen konsumpcyjnych. Stan konta w wyniku waloryzacji nie może się obniżyć (art. 25 ust. 3 i 6, art. 25a ust. 4–5). To istotna różnica wobec oszczędności rynkowych z modułu 9 | Wyjaśnić jednym akapitem; dodać twierdzenia [P] | ustawa o FUS art. 25 ust. 3–6, art. 25a |
| S-03 | `skad-bierze-sie-emerytura.md` (1.1) | „Tablice się zmieniają. Ten sam kapitał może dać inną kwotę w zależności od roku” | Pominięty wyjątek z art. 26 ust. 6: jeśli jest to korzystniejsze, stosuje się tablice z dnia osiągnięcia wieku 60/65 lat | Dodać jedno zdanie | ustawa o FUS art. 26 ust. 5–6 |
| S-04 | `src/lib/przyklady.ts` (`przyklad:skladka-emerytalna`), lekcja 1.3 | „od tej samej podstawy liczy się też składki rentowe” | Od tej samej podstawy liczy się też składkę wypadkową i dobrowolną chorobową (art. 20 ust. 1; stawki w art. 22 ust. 1). Podpis zaniża koszt wyższej podstawy | Wymienić wszystkie składki liczone od podstawy albo podać, że tabela pokazuje tylko część kosztu | ustawa o sus art. 20 ust. 1, art. 22 ust. 1 |
| S-05 | `podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | „Możesz zadeklarować więcej.” | Pominięte: roczna podstawa składek emerytalnej i rentowych ma górny limit — 30-krotność prognozowanego przeciętnego wynagrodzenia (art. 19 ust. 1). Deklaracja wyższej kwoty nie podlega korekcie za dany miesiąc (art. 18 ust. 8a) | Dodać obie informacje | ustawa o sus art. 18 ust. 8a, art. 19 ust. 1 |
| S-06 | `podstawa-skladek-i-wlasne-oszczednosci.md` (1.3) | „pieniędzy zapisanych w ZUS nie wypłacisz przed emeryturą” | Twierdzenie bez źródła w rejestrze (status [Z] w praktyce). Brak też istotnej różnicy wobec IKE: kwota na koncie w ZUS nie podlega dziedziczeniu (art. 25 ust. 2 ustawy o FUS, z zastrzeżeniem art. 25b). Na IKE wypłata przysługuje osobie uprawnionej po śmierci oszczędzającego (art. 34 ust. 1 pkt 2 ustawy o IKE) | Dodać twierdzenia [P]; opisać różnicę w dziedziczeniu jako fakt, bez oceny | ustawa o FUS art. 25 ust. 2; ustawa o IKE art. 34 ust. 1 pkt 2 |
| S-07 | `informacja-o-stanie-konta.md` (2.1) | Lista „Co w niej jest” | Lista pomija stan subkonta (art. 50 ust. 1a pkt 2a) oraz składki na OFE i na subkonto (pkt 4–5). Kursant nie wie, gdzie szukać danych potrzebnych do K-01 | Uzupełnić listę | ustawa o sus art. 50 ust. 1a |
| S-08 | `informacja-o-stanie-konta.md` (2.1) | „Porównaj je z potwierdzeniami przelewów albo z dokumentami rozliczeniowymi.” | **Fakt:** zestawienie z 12 miesięcy pokazuje tylko składki emerytalne, i to bez części na subkonto i do OFE (art. 50 ust. 1a pkt 3). Przelew przedsiębiorcy obejmuje także inne składki. **[interpretacja]** Kwoty nie będą się zgadzać, a kursant może uznać to za błąd ZUS | Doprecyzować, z czym porównywać: składka emerytalna za miesiąc z deklaracji, minus część na subkonto. Najlepiej z przykładem po weryfikacji | ustawa o sus art. 50 ust. 1a pkt 3 |
| S-09 | `ike-zasady-i-limit.md` (4.1), quiz pyt. 1 | „Wpłacać na IKE może osoba, która ukończyła 16 lat”; quiz „Od 16 lat”; „Limit IKE jest taki sam dla wszystkich” | **Fakt:** małoletni może wpłacać tylko w roku, w którym ma dochody z umowy o pracę (art. 3 ust. 2). Jego wpłaty nie mogą przekroczyć tych dochodów (art. 13 ust. 7). Zdanie o limicie „takim samym dla wszystkich” jest więc nieścisłe | Dodać jedno zdanie albo zawęzić do pełnoletnich; poprawić wyjaśnienie w quizie | ustawa o IKE art. 3 ust. 2, art. 13 ust. 7 |
| S-10 | `ike-wyplata-i-zwrot.md` (4.2) | Sekcja „Kiedy wypłata jest wolna od podatku” | Pominięte skutki wypłaty: po wypłacie jednorazowej albo pierwszej racie nie można ponownie założyć IKE (art. 34 ust. 4) ani dalej wpłacać na to konto (ust. 5). Ważne dla planu wypłat | Dodać | ustawa o IKE art. 34 ust. 2, 4, 5 |
| S-11 | `src/lib/kalkulator/proste-widok.ts` (kalkulator procentu składanego) | Kafle przy ujemnej stopie | **Błąd komunikacyjny.** Dane: 10 000 zł, −2%, 20 lat. Wynik: „Zysk łącznie: −3 324 zł” (poprawnie), ale też „Zysk od wcześniejszych zysków: 676 zł” i „Gdyby zysk co roku wypłacać: 6 000 zł”. Przy stracie te etykiety nie mają sensu: 676 zł to mniejsza strata, nie zysk. Matematyka poprawna | Przy stopie ≤ 0 zmienić etykiety albo ukryć kafel porównawczy | — |
| S-12 | Kalkulator procentu składanego (domyślnie 5%), kalkulator oszczędzania (przyciski −2%, 0, 2,5%, 5%, 7%), przykłady w module 9 (5%) | Wartości domyślne | **[interpretacja]** Domyślne 5% i przycisk 7% mogą zakotwiczyć oczekiwanie, że to „normalny” zysk. Podpisy mówią „nie prognoza”, ale wartość domyślna działa silniej niż podpis | Domyślnie 0% albo stopa równa celowi inflacyjnemu; w przykładach uzasadnić wybór 5% jako wariant ilustracyjny | — |
| S-13 | `twoje-liczby.md` (12.1), quiz pyt. 2 | „lepiej przyjąć kwotę niższą i stałą niż wysoką i niepewną”; „Do planu weź wariant z dalszymi składkami”; quiz: pierwszym elementem planu jest rezerwa | Zalecenia normatywne podane jak fakty, a quiz ocenia je jako „poprawną odpowiedź”. Nie jest to doradztwo inwestycyjne (brak instrumentów), ale przekracza deklarowaną zasadę „wyjaśniamy, nie rozstrzygamy” | Przeformułować na pytania i kryteria („co przemawia za…”). Pytanie quizu zamienić na sprawdzające rozumienie, nie opinię | — |
| S-14 | `twoje-liczby.md` (12.1), struktura kursu | „Miejsce — gdzie odkładasz. Zasady kont znasz z modułów o IKE i z przewodników po IKZE i OKI” | Moduł 12 wymaga wiedzy z modułów 3 i 5–7, których nie ma. Kursant robi „szkic planu” bez porównania kont. Ścieżka nauki ma lukę | Oznaczyć 12.1 jako wersję częściową albo przesunąć „Miejsce” do czasu powstania modułów 5–7 | — |
| S-15 | `przeglad-roczny.md` (12.2) | „Do tych warunków liczy się więc rok, w którym wpłata wpłynęła na konto.” | **[interpretacja]** Ustawa mówi o „dokonywaniu wpłat […] w 5 dowolnych latach kalendarzowych” (art. 34 ust. 1 pkt 1 lit. a, art. 34a ust. 1 pkt 1). Czy liczy się data zlecenia, czy uznania rachunku — nie zweryfikowałem | Złagodzić („wpłata powinna zostać dokonana w danym roku; przy wpłatach na przełomie roku sprawdź w instytucji, którą datę przyjmuje”) albo potwierdzić (P-05) | ustawa o IKE art. 34, 34a |
| S-16 | `przeglad-roczny.md` (12.2), quiz pyt. 1 | „Kiedy najwcześniej warto zaktualizować w planie liczby z ZUS? — Po udostępnieniu informacji o stanie konta, czyli do 31 sierpnia.” | Sprzeczność: „najwcześniej” i „do 31 sierpnia” (termin końcowy). Informacja może się pojawić wcześniej | „Gdy ZUS udostępni informację — najpóźniej do 31 sierpnia” | ustawa o sus art. 50 ust. 1 |
| S-17 | Lekcje 1.2, 1.3 | „okresów składkowych i nieskładkowych”, „podstawa wymiaru”, „prognozowane przeciętne wynagrodzenie”, „minimalne wynagrodzenie” | Pojęcia użyte bez wyjaśnienia. Osoba bez wykształcenia finansowego myli przeciętne z minimalnym wynagrodzeniem — a cała lekcja 1.2 zależy od tej różnicy | Krótki słowniczek na początku modułu 1 albo objaśnienie przy pierwszym użyciu | — |
| S-18 | Wszystkie quizy | 29 pytań | **Fakt (pomiar):** w 25 z 29 pytań poprawna odpowiedź jest najdłuższa. Poprawna nigdy nie jest trzecia. Trzy pytania mają tylko dwie odpowiedzi. Część dystraktorów jest nieprawdopodobna („Urząd skarbowy”, „Bo tak wymaga ZUS”). Quiz da się zgadnąć bez wiedzy | Wyrównać długości odpowiedzi, losować kolejność albo rozłożyć poprawne odpowiedzi, dodać pytania sytuacyjne na liczbach kursanta | `src/components/platforma/Quiz.astro` (brak losowania) |
| S-19 | Lekcje 1.2, 2.1, 4.1, 4.2, 9.1, 12.1 („Zapisz u siebie”, „Zrób to teraz”) | Polecenia zapisu | Platforma nie ma miejsca na notatki, a rozdział 0 PDF odsyła do „zeszytu ćwiczeń dołączonego do przewodnika”, który nie istnieje (`produkt/workbook/` zawiera tylko strukturę). Ćwiczenia nie mają ciągłości między modułami | Dodać prosty arkusz do pobrania albo pola notatek; usunąć odwołanie do nieistniejącego zeszytu | `produkt/przewodnik/rozdzialy/00-jak-korzystac.md` |
| S-20 | Rozdział 0 PDF | „W okresie objętym aktualizacjami dostaniesz poprawioną wersję wraz z opisem zmian.” | Obietnica wobec kupującego bez określenia okresu i trybu. **[interpretacja]** Przy sprzedaży treści cyfrowych zakres aktualizacji ma znaczenie prawne | Usunąć albo określić po opinii prawnej (P-09) | — |
| S-21 | Rozdziały 2, 4 i 9 PDF | „Jeśli zacząłeś pracować później”, „płaciłeś”, „wpłacałeś”, „wpłaciłeś”, „zrobiłeś” | Formy męskie, niezgodne z zasadą z CLAUDE.md. PDF zawiera też te same braki co lekcje (K-01, K-02, W-05) | Ujednolicić z lekcjami po poprawkach | — |

### NISKIE

| ID | Plik / lekcja | Fragment | Problem | Rozwiązanie |
| --- | --- | --- | --- | --- |
| N-01 | 1.1 | „Nie ma tu ostatniego wynagrodzenia ani średniej z najlepszych lat.” | Dla osób z kapitałem początkowym dawne zarobki mają znaczenie (art. 174 ustawy o FUS) | Dodać zastrzeżenie |
| N-02 | 1.2 | „Te notatki przydadzą się w module 12” | Lekcje modułu 12 nie wykorzystują stażu | Połączyć albo usunąć zdanie |
| N-03 | 2.2 | Opis wariantów | Brak informacji o dodatkowych wariantach (wiek +1 do +5 lat) dla osób, którym do wieku emerytalnego brakuje nie więcej niż 5 lat (art. 50 ust. 1d ustawy o sus) | Dodać zdanie |
| N-04 | 4.1 | Opis limitu | Limit nie może być niższy niż ogłoszony w poprzednim roku (art. 13 ust. 1a). Nadpłata jest zwracana (ust. 5) | Opcjonalnie dodać |
| N-05 | `proste-widok.ts` (kalkulator inflacji) | Etykiety kafli | **Błąd językowy.** Dla 2 lat: „Tyle będzie kosztować za 2 lat”, poprawnie „za 2 lata”. Ten sam błąd dla 3, 4, 22, 23, 24 lat | Użyć `liczebnik()` z `format.ts` |
| N-06 | Kalkulatory | Zakresy inflacji | Kalkulator oszczędzania przyjmuje inflację od −5% do 20%, kalkulator inflacji do 30% | Ujednolicić albo uzasadnić |
| N-07 | `przyklad:skladka-emerytalna` (1.3) | Tabela | Zaokrąglenia niezależne: 390 zł × 12 ≠ 4 685 zł (dokładnie 390,40 zł i 4 684,80 zł) | Pokazać grosze |
| N-08 | Wykres przy skrajnych danych | 10 mln zł, 20%, 50 lat | Oś pokazuje „100 000 mln”; poprawne, ale nieczytelne | Dla kwot powyżej 1 mld zł użyć „mld” |
| N-09 | Rejestr | Źródła `mp-2025-1202`, `mp-2025-1156` | Link prowadzi do strony gov.pl, nie do tekstu w Monitorze Polskim (tekst w ELI istnieje i jest zgodny) | Podmienić link na ELI |
| N-10 | Rozdział 0 PDF | „Każde trudniejsze pojęcie objaśniamy przy pierwszym użyciu.” | Obecnie nieprawda (S-17) | Poprawić po S-17 albo złagodzić |
| N-11 | 9.2, 9.3 | „Wyższy zysk oznacza zwykle wyższe ryzyko.” | Zasada ogólna bez źródła; poprawna, ale niewyjaśniona | Rozwinąć w module 10 |

---

## 4. Weryfikacja twierdzeń prawnych

Wynik: **Zgodne** — przepis mówi to, co lekcja. **Zgodne, niepełne** — prawda, ale pominięto istotny wyjątek. **Błędne** — lekcja mówi coś innego. **Niezweryfikowane** — nie potwierdziłem w źródle pierwotnym.

### 4.1. Aktualność źródeł

| Akt | Tekst | Status (API ELI) | Nowelizacje po tekście jednolitym | Wpływ na lekcje |
| --- | --- | --- | --- | --- |
| Ustawa o systemie ubezpieczeń społecznych | t.j. Dz.U. 2026 poz. 1474 | obowiązujący | brak w API | — |
| Ustawa o emeryturach i rentach z FUS | t.j. Dz.U. 2025 poz. 1749 | obowiązujący | Dz.U. 2026 poz. 26 (nowy art. 5a — sposób sumowania okresów, orzecznictwo), poz. 425 (art. 50e) | Nie zmieniają art. 24–26 ani 87. Art. 5a dotyczy techniki liczenia okresów |
| Ustawa o IKE i IKZE | t.j. Dz.U. 2026 poz. 91 | obowiązujący | brak; ustawa o OKI tej ustawy nie zmienia | — |
| Ustawa o PIT | t.j. Dz.U. 2026 poz. 592 | obowiązujący | poz. 779, 846, 1079, 1287, 1371 | Według tytułów i przeglądu zmienianych artykułów nie dotyczą art. 21 ust. 1 pkt 58a, 26 ust. 1 pkt 2b, 30, 30a ani 34. Poz. 846, 1079, 1287 sprawdziłem tylko po tytule |
| Ustawa o zryczałtowanym podatku dochodowym | t.j. Dz.U. 2025 poz. 843 | obowiązujący | poz. 779 (art. 15 ust. 13a) | Nie dotyczy art. 11 |
| Ustawa o świadczeniach opieki zdrowotnej | t.j. Dz.U. 2025 poz. 1461 | obowiązujący | 7 nowelizacji | **Nie przejrzałem** — art. 66 i 79 do potwierdzenia |
| Ustawa o OKI | Dz.U. 2026 poz. 1098 | obowiązujący, wchodzi w życie 1.01.2027 | — | — |

### 4.2. Twierdzenia użyte w lekcjach

| Twierdzenie (rejestr) | Lekcje | Przepis | Wynik | Uwagi |
| --- | --- | --- | --- | --- |
| `sus-skladka-emerytalna` 19,52% | 1.1, 1.3 | sus art. 22 ust. 1 pkt 1 | Zgodne, niepełne | Część trafia na subkonto lub do OFE (ust. 3) — S-01 |
| `sus-konto-zwaloryzowane` | 1.1 | sus art. 40 ust. 1 | Zgodne, niepełne | Przepis wyłącza składki na subkonto i do OFE — S-01, K-01 |
| `sus-podstawa-jdg` 60% | 1.3 | sus art. 18 ust. 8 | Zgodne | Treść lekcji uogólnia na wszystkich przedsiębiorców — W-01 |
| `sus-podstawa-wyzsza` | 1.3 | sus art. 18 ust. 8a | Zgodne, niepełne | Brak limitu z art. 19 ust. 1 i braku korekty — S-05 |
| `sus-preferencyjna` 30%, 24 mies. | 1.2 | sus art. 18a ust. 1–2 | Zgodne | Wyłączenia streszczone poprawnie (pkt 1); pominięty pkt 2 (praca dla byłego pracodawcy), dopuszczalne przy „m.in.” |
| `fus-wiek-emerytalny` | 1.2 | FUS art. 24 ust. 1 | Zgodne | Przepis dotyczy urodzonych po 31.12.1948 r. — lekcja to zaznacza |
| `fus-podstawa-obliczenia` | 1.1 | FUS art. 25 ust. 1 | Zgodne | — |
| `fus-wzor-emerytury` | 1.1, 1.3 | FUS art. 26 ust. 1 i 3 | Zgodne | — |
| `fus-tablice-gus` | 1.1, 12.2 | FUS art. 26 ust. 4–5 | Zgodne, niepełne | Wyjątek z ust. 6 — S-03 |
| `zus-kapital-poczatkowy` | 1.1, 2.1 | FUS art. 173 ust. 1 | Zgodne | Ust. 1a (służby mundurowe) pominięty — dopuszczalne |
| `fus-najnizsza-warunki` | 1.2 | FUS art. 87 ust. 1 | Zgodne, niepełne | Pominięte art. 5 ust. 2 (W-03), ust. 5 i 5a (W-04) |
| `fus-najnizsza-proporcja` | 1.2 | FUS art. 87 ust. 3 | Zgodne | Przepis dotyczy okresów po wejściu ustawy w życie (1999 r.) i ma wyjątki w ust. 4 (zasiłki chorobowe itp.) — warto dodać jedno zdanie |
| `zus-informacja-o-stanie-konta` | 2.1, 12.2 | sus art. 50 ust. 1 | Zgodne | Dotyczy urodzonych po 31.12.1948 r. |
| `zus-profil-informacyjny` | 2.1 | sus art. 50 ust. 1h, 1ha, 1i | Zgodne | — |
| `zus-informacja-zawartosc` | 2.1 | sus art. 50 ust. 1a | Zgodne, niepełne | Subkonto i OFE pominięte — S-07 |
| `zus-hipotetyczna-emerytura` | 2.2 | sus art. 50 ust. 1ba, 1c | Zgodne | Wariant dodatkowy z ust. 1d — N-03 |
| `zus-hipotetyczna-warianty` | 2.2 | sus art. 50 ust. 1c pkt 2 | Zgodne | Średnia = suma składek ÷ liczba miesięcy ubezpieczenia — lekcja oddaje to poprawnie |
| `zus-hipotetyczna-wzor` | 2.2 | sus art. 50 ust. 2 | Zgodne | **Skutek tego przepisu (brak subkonta) nie został w lekcji wyciągnięty — K-01** |
| `ike-wiek-wplat` | 4.1 | IKE art. 3 ust. 1 | Zgodne, niepełne | Ust. 2 — małoletni (S-09) |
| `ike-jedno-konto` | 4.1 | IKE art. 4 ust. 1 | Zgodne | — |
| `ike-ubezpieczenie` | 4.1 | IKE art. 13 ust. 2, art. 29 i nast. | Zgodne | — |
| `ike-limit-wzor` | 4.1 | IKE art. 13 ust. 1 | Zgodne | Ust. 1a — N-04 |
| `ike-limit-2026` 28 260 zł | 4.1 | M.P. 2025 poz. 1202 | Zgodne | [tekst](https://api.sejm.gov.pl/eli/acts/MP/2025/1202/text.pdf) |
| `ike-limit-2027` 30 099 zł | 4.1 | M.P. 2026 poz. 1081 | Zgodne | [tekst](https://api.sejm.gov.pl/eli/acts/MP/2026/1081/text.pdf) |
| `ike-limit-ogloszenie` | 4.1, 12.2 | IKE art. 13 ust. 4 | Zgodne | — |
| `ikze-limit-ogloszenie` | 12.2 | IKE art. 13a ust. 8 | Zgodne | Limity 2027: 12 039,60 zł i 18 059,40 zł — zgodne z [M.P. 2026 poz. 1062](https://api.sejm.gov.pl/eli/acts/MP/2026/1062/text.pdf) (nieużyte w lekcjach) |
| `ike-wyplata-warunki` | 4.2, 12.2 | IKE art. 34 ust. 1 pkt 1 | Zgodne, niepełne | Ust. 1a, 4, 5 — S-10 |
| `ike-zwolnienie` | 4.1, 4.2 | PIT art. 21 ust. 1 pkt 58a | Zgodne | — |
| `ike-zwrot-podatek` 19% | 1.3, 4.2 | PIT art. 30a ust. 1 pkt 10 | Zgodne | — |
| `ike-zwrot-dochod` | 4.2 | PIT art. 30a ust. 8 | **Błędne w zakresie uogólnienia** | Dotyczy zwrotu całkowitego; częściowy — ust. 8b (W-05) |
| `ike-wiele-kont` 75% | 4.2 | PIT art. 30 ust. 1 pkt 7a, ust. 3a | Zgodne | — |
| `ike-wyplata-transferowa` | 4.2 | IKE art. 35 ust. 1 pkt 1, ust. 2; art. 36 ust. 1 | Zgodne | — |
| `ikze-wyplata-warunki` | 12.2 | IKE art. 34a ust. 1 | Zgodne | — |
| `oki-start` | 1.3, 12.2 | OKI art. 46 | Zgodne | — |
| `oki-stawka-ogloszenie` | 12.2 | OKI art. 25 ust. 2 | Zgodne | — |
| `nbp-cel-inflacyjny` 2,5% | 9.1, 9.3, kalkulatory | M.P. 2026 poz. 943 | Zgodne | — |

### 4.3. Twierdzenia bez źródła w rejestrze (w lekcjach)

| Zdanie | Lekcja | Wynik |
| --- | --- | --- |
| „pieniędzy zapisanych w ZUS nie wypłacisz przed emeryturą” | 1.3 | Niezweryfikowane w tym audycie (S-06) |
| „Kwota najniższej emerytury zmienia się co roku” | 1.2 | Niezweryfikowane — zasady waloryzacji świadczeń (rozdział 2 ustawy o FUS) nie były czytane |
| „IKE może być prowadzone w ramach umowy ubezpieczenia […] Warto to sprawdzić w starych umowach” | 4.1 | Pierwsza część zgodna; druga to rada praktyczna |
| „Opłaty liczone od zgromadzonych środków […] Działa na nie jednak ten sam procent składany” | 9.3 | Matematycznie poprawne przy przyjętym modelu |

### 4.4. IKZE i rozliczanie wpłat przez przedsiębiorców

Lekcje nie omawiają IKZE — moduł 5 jest wstrzymany. Twierdzenia z rejestru o odliczeniach sprawdziłem pomocniczo, bo dotyczą stron publicznych:

| Twierdzenie | Przepis | Wynik |
| --- | --- | --- |
| Odliczenie wpłat na IKZE od dochodu (skala) | PIT art. 26 ust. 1 pkt 2b | Zgodne |
| Podatek liniowy | PIT art. 30c ust. 2 pkt 3, ust. 3b | Zgodne |
| Ryczałt — odliczenie od przychodów | ustawa o ryczałcie art. 11 ust. 1 (odesłanie do art. 26 ust. 1 pkt 2b PIT) | Zgodne |
| Ryczałt — proporcja przy różnych stawkach | ustawa o ryczałcie art. 11 ust. 3 | Zgodne |
| 10% od wypłat z IKZE | PIT art. 30 ust. 1 pkt 14 | Zgodne |
| Wypłata z IKZE: 65 lat i 5 lat wpłat; raty co najmniej 10 lat | IKE art. 34a ust. 1 i 4 | Zgodne |

Twierdzeń o OKI (zwolnienia, aktywa kwalifikowane) i innych twierdzeń rejestru nieużytych w lekcjach **nie weryfikowałem** w tym audycie.

---

## 5. Weryfikacja obliczeń i przykładów

Niezależne przeliczenie w Pythonie (pętla miesięczna i wzór zamknięty na przyszłą wartość renty) zgadza się z wynikami bibliotek co do złotówki.

| Przykład | Lekcja | Wynik w kursie | Niezależnie | Ocena |
| --- | --- | --- | --- | --- |
| 1 000 zł przy inflacji 2,5%: koszt po 10/20/30 latach | 9.1 | 1 280 / 1 639 / 2 098 zł | 1 280,08 / 1 638,62 / 2 097,57 | Zgodne |
| Siła nabywcza 1 000 zł po 10/20/30 latach | 9.1 | 781 / 610 / 477 zł | 781,20 / 610,27 / 476,74 | Zgodne |
| 10 000 zł przy 5% po 1/10/20/30 latach | 9.2 | 10 500 / 16 289 / 26 533 / 43 219 zł | 10 500 / 16 288,95 / 26 532,98 / 43 219,42 | Zgodne |
| 500 zł/mies., 9 scenariuszy (0%, 2,5%, 5%; 10/20/30 lat) | 9.3 | np. 20 lat przy 2,5%: 155 016 zł nominalnie i 94 602 zł realnie | 155 016,31 (wzór zamknięty), 94 602 | Zgodne we wszystkich 9 wierszach |
| Koszty 0 / 0,5 / 1 / 2% po 30 latach | 9.3 | 407 688 / 371 913 / 339 712 / 284 587 zł | identycznie | Zgodne |
| Zwrot z IKE: wpłaty 40 000 zł, wartość 50 000 zł | 4.2 | podatek 1 900 zł | 10 000 × 19% = 1 900 | Zgodne (dla zwrotu całkowitego — W-05) |
| Składka emerytalna od +1 000/+2 000/+5 000 zł podstawy | 1.3 | 195/390/976 zł mies.; 2 342/4 685/11 712 zł rocznie | 195,20/390,40/976,00; 2 342,40/4 684,80/11 712,00 | Zgodne; zaokrąglenia niespójne wizualnie (N-07) |
| „3% inflacji: 100 zł → 103 zł” | 9.1 | — | — | Zgodne |
| „Po roku różnica między kolumnami jest zerowa” | 9.2 | — | 10 500 = 10 500 | Zgodne |

**Model kosztów** (kalkulator oszczędzania): mnożnik `(1 + stopa) × (1 − koszty)`, rozłożony na miesiące. To prawidłowy model opłaty od aktywów pobieranej raz w roku. Jest opisany w metodzie narzędzia, ale nie w lekcji 9.3. Przy stopie 5% i kosztach 1% stopa netto wynosi 3,95%, a nie 4% — warto to wspomnieć.

**Wniosek z przykładów w 9.3** („Przy zysku równym inflacji każda wpłata zachowuje siłę nabywczą z dnia wpłaty”) jest matematycznie poprawny przy braku kosztów i podatków. Lekcja zastrzega podatki tylko w sekcji końcowej.

---

## 6. Ocena kalkulatorów

| Kryterium | Oszczędzanie | Procent składany | Inflacja |
| --- | --- | --- | --- |
| Wzory | Poprawne (renta miesięczna, wpłata na koniec miesiąca) | Poprawne: `K(1+r)^n` i porównanie `K + K·r·n` | Poprawne: `K(1+i)^n` i `K/(1+i)^n` |
| Zgodność z lekcjami | Pełna | Pełna | Pełna |
| Zaokrąglenia | Do pełnych złotych, spójne | Kafle liczone z wartości dokładnych — sumy się zgadzają | Procent siły nabywczej z 1 miejscem po przecinku |
| Walidacja zakresów | Tak, komunikaty po polsku | Tak | Tak |
| Odczyt liczb | **„10.000” → 10 (W-07)** | **jak obok** | **jak obok** |
| Skrajne wartości | 100 000 zł/mies., 20%, 50 lat, inflacja −5% → wynik skończony | 10 mln zł, 20%, 50 lat → 91 mld zł, oś nieczytelna (N-08) | Bez problemów |
| Ujemna stopa | Poprawnie | Mylące etykiety (S-11) | n/d |
| Komunikowanie założeń | Opis metody, założenia, źródła, zastrzeżenie | Jak obok; „wartości nominalne, bez inflacji, podatków i kosztów” | Jak obok; „stała inflacja” |
| Wartości domyślne | Stopa równa inflacji (neutralnie), przyciski do 7% (S-12) | 5% (S-12) | Cel NBP 2,5% |
| Język | Poprawny | Poprawny | Błędna odmiana „za 2 lat” (N-05) |
| Bez JavaScriptu | Wynik początkowy widoczny | Widoczny | Widoczny |

Kalkulatory nie zwracają rekomendacji i nie łączą zasad podatkowych z oszczędzaniem — zgodnie z zasadami projektu.

---

## 7. Ocena quizów

- **Liczba:** 29 pytań w 12 lekcjach (2–3 na lekcję), 26 z trzema odpowiedziami, 3 z dwiema.
- **Poprawność kluczy:** wszystkie odpowiedzi oznaczone jako poprawne są zgodne z treścią lekcji. Dwa klucze trzeba uzupełnić po poprawkach: 4.1 pyt. 1 (małoletni, S-09) i 12.2 pyt. 1 (sprzeczność, S-16).
- **Wskazówki formalne:** poprawna odpowiedź jest najdłuższa w 25 z 29 pytań (86%). Stoi na pozycji 1 w 12 pytaniach, na pozycji 2 w 17, nigdy na pozycji 3 (S-18).
- **Co sprawdzają:**
  - **Rozumienie:** 1.1 pyt. 2 (wiek a dzielnik), 4.2 pyt. 1 i 2 (sytuacje liczbowe), 9.3 pyt. 1 i 3. To najlepsze pytania kursu.
  - **Odtworzenie faktów:** wiek 16 lat, 31 sierpnia, 35 lat — przydatne, ale łatwe.
  - **Opinię jako fakt:** 12.1 pyt. 2 o rezerwie (S-13).
- **Wyjaśnienia:** są przy każdym pytaniu i tłumaczą powód, a nie tylko powtarzają odpowiedź.
- **Rekomendacja:** w każdej lekcji przynajmniej jedno pytanie sytuacyjne na liczbach (jak 4.2). Wyrównać długość odpowiedzi i dodać czwartą, wiarygodną odpowiedź.

---

## 8. Ocena języka i zrozumiałości

**Mocne strony:**

- krótkie zdania i stała struktura lekcji („W tej lekcji”, treść, „Czego ta lekcja nie rozstrzyga”);
- neutralny, spokojny ton, bez straszenia;
- formy neutralne płciowo w lekcjach.

**Słabe strony:**

- **Pojęcia bez wyjaśnienia** (S-17): podstawa wymiaru, prognozowane przeciętne wynagrodzenie, minimalne wynagrodzenie, okresy składkowe i nieskładkowe, subkonto, zryczałtowany podatek.
- **Powtórzenia:**
  - 2.2 powtarza wzór z 1.1 (świadomie, ale można skrócić);
  - 4.1 powtarza limit w punktach i w tabeli;
  - 9.2 i 9.3 dwukrotnie podają zastrzeżenie o ryzyku.
- **Ciężkie zdania prawnicze** w 1.2 („Miesiące, w których składki na ubezpieczenia emerytalne i rentowe liczono od podstawy niższej niż minimalne wynagrodzenie, wlicza się do stażu proporcjonalnie do tej podstawy”). Brakuje przykładu liczbowego, np. podstawa równa 30% minimalnego wynagrodzenia → miesiąc liczy się jako 0,3 miesiąca. Taki przykład jest zgodny z brzmieniem art. 87 ust. 3 („w części odpowiadającej proporcji”).
- **Ścieżka do praktycznego wniosku:** kurs prowadzi od mechanizmu (moduł 1) przez własne dane (moduł 2) i konto (moduł 4) do planu (moduł 12). Wniosek praktyczny — luka — jest jednak obciążony błędami K-01 i K-02, a krok wyboru konta nie ma treści (S-14).
- **Ćwiczenia** to w większości polecenia „zapisz”, bez miejsca na zapis i bez informacji zwrotnej (S-19). Najlepiej uczą ćwiczenia z kalkulatorami w module 9.

---

## 9. Ryzyka prawne i podatkowe

| Ryzyko | Ocena | Uzasadnienie |
| --- | --- | --- |
| Wprowadzenie w błąd co do wysokości przyszłej emerytury | **Wysokie** | K-01, K-02, W-06: kluczowa liczba kursu jest liczona metodą, której ograniczeń kursant nie zna |
| Nieścisłości w zasadach składek dla JDG | Wysokie | W-01 do W-04 dotyczą właśnie grupy docelowej |
| Doradztwo inwestycyjne | Niskie | Brak instrumentów, funduszy i instytucji. Kalkulatory nie rekomendują. Wartości domyślne mogą zakotwiczać oczekiwania (S-12) |
| Doradztwo podatkowe | Niskie do średniego | Lekcje opisują przepisy, nie rozstrzygają sytuacji. Ryzyko rośnie przy modułach 3 i 5–7 oraz przy przykładzie emerytury netto (K-02) |
| Obietnica wyniku | Niskie | Wszystkie symulacje mają zastrzeżenie „nie prognoza”. Rachunek „liczby lat” (W-06) może zostać odczytany jako obietnica wystarczalności |
| Rekomendacje normatywne bez podstawy | Średnie | S-13 — formalnie nie doradztwo regulowane, ale niezgodne z deklarowaną zasadą |
| Nazwy IKE, IKZE, OKI | Średnie (do opinii) | W-08, art. 18 ustawy o IKE i odpowiednik w ustawie o OKI |
| Prawa konsumenta przy sprzedaży | Do oceny | Obietnica aktualizacji w PDF (S-20); brak regulaminu |
| Samo zastrzeżenie „materiał edukacyjny” | — | Nie usuwa ryzyk z wierszy 1–2: błąd merytoryczny pozostaje błędem niezależnie od zastrzeżenia |

---

## 10. Konkretne rekomendacje poprawek (kolejność)

**Przed recenzją ekspercką (sam projekt):**

1. **K-01, K-02, S-01, S-07.** Moduł 2 i 12.1:
   - wyjaśnić subkonto;
   - oznaczyć hipotetyczną emeryturę jako kwotę brutto;
   - zmienić opis luki na „szacunek przybliżony z dwoma znanymi ograniczeniami”;
   - do czasu recenzji nie podawać przeliczenia na netto.
2. **W-01 do W-04.** Przebudować 1.2 i 1.3 wokół trzech sposobów ustalania podstawy (preferencyjna, „mały ZUS plus”, zwykła) i pełnych warunków najniższej emerytury. Dodać twierdzenia [P] z art. 18c ustawy o sus oraz art. 5 ust. 2 i art. 87 ust. 5 ustawy o FUS.
3. **W-05, S-10.** Lekcja 4.2: zwrot całkowity i częściowy, skutki wypłaty.
4. **W-06.** Usunąć albo zastąpić rachunek „liczby lat”.
5. **W-07, S-11, N-05.** Poprawki kalkulatorów z testami.
6. **S-02, S-03, S-05, S-06, S-09, S-17.** Uzupełnienia i słowniczek.
7. **S-13, S-16, S-18.** Przegląd quizów i sformułowań normatywnych.
8. **S-19, S-20, S-21.** PDF: usunąć nieistniejący zeszyt i obietnicę aktualizacji, ujednolicić formy, przenieść poprawki z lekcji.

**Do decyzji eksperta:** pytania z sekcji 11.

**Nie zmieniać:** zasady „tylko [P]”, mechanizmu przypisów, struktury lekcji, neutralności wobec produktów.

---

## 11. Pytania do doradcy podatkowego lub prawnika

| ID | Pytanie | Do kogo |
| --- | --- | --- |
| P-01 | Czy hipotetyczna emerytura w informacji o stanie konta obejmuje środki z subkonta (art. 50 ust. 2 w zw. z art. 40 ust. 1 ustawy o sus)? Jak w materiałach edukacyjnych przedstawić przybliżony wpływ subkonta na emeryturę? | Ekspert ds. ubezpieczeń społecznych / ZUS |
| P-02 | Jak miesiące „ulgi na start” (art. 18 Prawa przedsiębiorców) i „małego ZUS plus” (art. 18c ustawy o sus) wpływają na okresy składkowe i staż do najniższej emerytury (art. 87 ust. 1 i 3 ustawy o FUS)? | Ekspert ds. ubezpieczeń społecznych |
| P-03 | Jak art. 87 ust. 5 ustawy o FUS działa wobec osoby, która po przejściu na emeryturę prowadzi JDG? Czy liczy się przychód w rozumieniu art. 104 dla prowadzących działalność? | Ekspert ds. ubezpieczeń społecznych |
| P-04 | Czy i jak pokazać przykładowe przeliczenie emerytury brutto na netto (zaliczka PIT, składka zdrowotna), nie wchodząc w doradztwo podatkowe? | Doradca podatkowy |
| P-05 | Która data decyduje o roku „dokonania wpłaty” na IKE i IKZE dla warunku 5 lat (art. 34 i 34a ustawy o IKE) — zlecenie czy uznanie rachunku instytucji? | Doradca podatkowy |
| P-06 | Czy opis dochodu przy zwrocie i częściowym zwrocie IKE (art. 30a ust. 8–8d ustawy o PIT) jest kompletny dla celów edukacyjnych? | Doradca podatkowy |
| P-07 | Czy rachunek „ile lat oszczędności pokryłyby lukę” (12.1) jest dopuszczalny w materiale edukacyjnym, czy może zostać uznany za ocenę indywidualnej sytuacji? | Prawnik |
| P-08 | Czy tytuły modułów „IKE”, „IKZE”, „OKI” w płatnym kursie oraz użycie tych skrótów w reklamie kursu naruszają art. 18 ustawy o IKE i analogiczny przepis ustawy o OKI? | Prawnik |
| P-09 | Jakie obowiązki wobec kupującego wynikają z obietnicy aktualizacji treści cyfrowej (PDF, kurs online) i jak ją sformułować? | Prawnik |
| P-10 | Czy zalecenia ogólne (rezerwa przed oszczędzaniem długoterminowym, stała kwota wpłat) mieszczą się w edukacji finansowej, czy wymagają innej formy? | Prawnik |
| P-11 | Czy porównanie „wyższa podstawa ZUS” i „dobrowolne konta” jako dróg oszczędzania (1.3) wymaga dodatkowych zastrzeżeń? | Doradca podatkowy |

---

## 12. Gotowość kursu

| Cel | Gotowość | Warunki |
| --- | --- | --- |
| **Recenzja ekspercka** | **Warunkowo — po poprawkach z punktów 1–4 sekcji 10** | Z obecnymi błędami recenzent spędzi czas na sprawach już wykrytych. Moduły 4.1, 9.x i 12.2 mogą iść do recenzji od razu |
| **Pokaz w rozmowach walidacyjnych** | Tak, jako próbka z wyraźnym oznaczeniem wersji roboczej | Nie pokazywać 12.1 bez poprawki K-01 i K-02 |
| **Sprzedaż** | **Nie** | Błędy krytyczne, 7 z 12 modułów bez lekcji, brak recenzji podatkowej i opinii prawnej, brak regulaminu i polityki prywatności, ryzyko nazw (W-08), obietnica aktualizacji (S-20) |

**Ocena końcowa:** konstrukcja kursu, mechanizm źródeł i przykłady liczbowe są solidne. Słabym punktem jest przełożenie przepisów na praktyczny wniosek dla przedsiębiorcy. Przepisy są zacytowane poprawnie, ale ich skutki dla JDG nie zostały wyprowadzone do końca, a kluczowa liczba (luka) jest liczona z kwoty, której ograniczeń kursant nie zna.

---

## Załącznik A. Metoda

1. Odczyt 12 plików lekcji, programu kursu, rejestru, przykładów, kalkulatorów, komponentu quizu i rozdziałów PDF.
2. Pobranie aktów z ELI, ekstrakcja tekstu (`pdftotext`), lektura cytowanych artykułów i artykułów sąsiednich (wyjątki, odesłania).
3. Sprawdzenie statusu aktów i nowelizacji po tekstach jednolitych w API ELI. Odczyt treści nowelizacji ustawy o FUS (Dz.U. 2026 poz. 26 i 425) oraz ustaw zmieniających PIT i ryczałt (poz. 779, 1371) w zakresie zmienianych artykułów.
4. Niezależne przeliczenie przykładów w Pythonie; testy kalkulatorów na wartościach skrajnych i błędnych.
5. Pomiar cech quizów: długość odpowiedzi, pozycja odpowiedzi poprawnej.

## Załącznik B. Czego nie zweryfikowano

- Prawo przedsiębiorców (ulga na start).
- Nowelizacje ustawy o świadczeniach opieki zdrowotnej po tekście jednolitym.
- Treść nowelizacji PIT z poz. 846, 1079 i 1287 (tylko tytuły).
- Praktyka ZUS w prezentowaniu hipotetycznej emerytury.
- Zasady waloryzacji świadczeń i ustalania kwoty najniższej emerytury.
- Twierdzenia rejestru o OKI, rynku i marketingu, nieużyte w lekcjach.
- Aktualne stawki składek wypadkowych i składki na Fundusz Pracy.
