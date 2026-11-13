# Marka i design system

Stan na dzień: **13 listopada 2026 r.**

## 1. Architektura marki

| Poziom | Nazwa | Rola |
| --- | --- | --- |
| Marka nadrzędna | **Finansowa Przyszłość** | Serwis, artykuły, narzędzia, kolejne produkty |
| Hasło | **Świadomie buduj swoją przyszłość.** | Stopka, materiały graficzne, sekcja główna |
| Pierwszy produkt | **Emerytura pod kontrolą** | Przewodnik z kalkulatorem dla osób na JDG i B2B |

Ocena rozwiązania:

- **Zalety.** Marka nadrzędna nie jest przywiązana do jednego segmentu ani do słowa „emerytura”, które dla trzydziestolatka brzmi odlegle. Nazwa produktu jest konkretna i mówi o korzyści.
- **Ryzyko 1: opisowość.** „Finansowa Przyszłość” to dwa pospolite słowa. Taka nazwa bywa trudna do zastrzeżenia jako znak słowny i łatwo o podobne oznaczenia. Szybkie wyszukiwanie w sieci (13.11.2026) nie wskazało marki o tej nazwie, ale **nie zastępuje to badania w bazach UPRP i EUIPO ani sprawdzenia domen**.
- **Ryzyko 2: „pod kontrolą”.** Nazwa produktu nie może sugerować kontroli nad wynikiem. W opisach zawsze dodajemy, że chodzi o plan i decyzje, a nie o wysokość świadczenia.
- **Ryzyko 3: instytucjonalny wygląd.** Granat, złoto i poważna typografia mogą sugerować bank lub urząd. Dlatego w stopce każdej strony jest zdanie, czym projekt nie jest.

Zasada nazewnicza: skrótów IKE, IKZE i OKI używamy wyłącznie opisowo, w tytułach materiałów edukacyjnych. Nie w nazwie marki, produktu, domeny ani w haśle reklamowym. Powód: art. 18 i 40 ustawy o IKE/IKZE oraz art. 20 i 31 ustawy o OKI. Kwestia czeka na opinię prawnika (`kwestie-do-weryfikacji.md`, PR-1).

## 2. Logo — koncept B „Droga do przyszłości”

Symbol: droga z dwoma łagodnymi zakrętami, która prowadzi do złotego punktu. Oznacza proces i kierunek. Nie jest wykresem i nie przedstawia wzrostu wartości.

| Plik | Zastosowanie |
| --- | --- |
| `public/logo/logo-poziome.svg` | Podstawowa wersja na jasne tło |
| `public/logo/logo-poziome-na-ciemne-tlo.svg` | Wersja na granat |
| `public/logo/logo-pionowe.svg`, `logo-pionowe-na-ciemne-tlo.svg` | Układ pionowy |
| `public/logo/symbol.svg`, `symbol-na-ciemne-tlo.svg` | Sam symbol |
| `public/logo/avatar.svg`, `avatar-512.png` | Profil w mediach społecznościowych |
| `public/favicon.svg`, `public/apple-touch-icon.png` | Ikona strony |
| `public/og.png` | Grafika udostępniania, 1200 × 630 px |

Pliki powstają poleceniem `npm run logo`. Napis jest zamieniony na krzywe, więc nie wymaga zainstalowanego fontu. Na stronie logo jest komponentem `src/components/Logo.astro`.

Zasady użycia: wokół logo zostaw wolne pole równe wysokości złotego punktu razy cztery; nie zmieniaj kolorów; nie dodawaj cieni ani gradientów; symbol bez napisu stosuj od 16 px, logo poziome od 120 px szerokości.

## 3. Kolory

| Rola | Nazwa | HEX | Token CSS |
| --- | --- | --- | --- |
| Główny granat | Institutional Navy | `#101D35` | `--granat` |
| Złoty akcent | Muted Gold | `#D5B875` | `--zloto` |
| Jasne tło | Off White | `#F5F6F8` | `--tlo` |
| Tekst pomocniczy | Slate Navy | `#26364B` | `--lupek` |
| Biel | White | `#FFFFFF` | `--biel` |
| Głęboki granat (stopka) | — | `#0A1426` | `--granat-gleboki` |
| Tekst cichy | — | `#4A5870` | `--tekst-cichy` |
| Złoto do tekstu na jasnym tle | — | `#75581A` | `--zloto-ciemne` |
| Linie | — | `#D6DBE4` | `--linia` |
| Błąd | — | `#A32018` | `--blad` |

Reguły:

- Złoto `#D5B875` służy wyłącznie jako akcent graficzny oraz tekst na granacie. Na jasnym tle ma zbyt niski kontrast; tam używamy `--zloto-ciemne`.
- Kontrast par tekst–tło sprawdza test `src/lib/kolory.test.ts` (próg 4,5:1). Nowy kolor tekstu trzeba dopisać do tego testu.
- Kolory są zapisane w dwóch plikach: `src/styles/tokeny.css` i `src/lib/kolory.ts`. Test pilnuje ich zgodności.

Serie wykresu mają osobne kolory w stałej kolejności: wartość nominalna `#2F5DA8`, wartość realna `#B07F1E`, suma wpłat `#1F8A70`. Zestaw przeszedł walidację rozróżnialności, także dla osób z zaburzeniami widzenia barw.

## 4. Typografia

| Zastosowanie | Font | Wagi |
| --- | --- | --- |
| Nagłówki | Manrope | 650–700 |
| Tekst | Inter | 400–600 |
| Liczby w tabelach | Inter, cyfry tabelaryczne | 500–600 |

Fonty są serwowane z własnego serwera (pakiety `@fontsource-variable`), z `font-display: swap`. Strona nie łączy się z zewnętrznymi serwerami fontów.

## 5. Komponenty

Strefa kursanta ma własny układ (`src/layouts/Aplikacja.astro`), style (`src/styles/platforma.css`) i komponenty (`src/components/platforma/`): karta modułu, lista lekcji, pasek postępu, znacznik statusu, quiz, ilustracja, materiały dodatkowe, opis narzędzia, karta narzędzia, nagłówek widoku, baner trybu demonstracyjnego. Używa tych samych tokenów kolorów i fontów co strona publiczna. Opis: `architektura-platformy.md`.

| Komponent | Plik | Opis |
| --- | --- | --- |
| Układ strony | `src/layouts/Bazowy.astro` | Metadane, nagłówek, stopka, baner statusu, link „Przejdź do treści” |
| Nagłówek podstrony | `NaglowekStrony.astro` | Etykieta, tytuł, wprowadzenie, motyw drogi |
| Przypis i lista źródeł | `Odn.astro`, `Zrodla.astro` | Numerowane odwołania do rejestru |
| Kalkulator | `Kalkulator.astro` | Formularz, kafle wyników, wykres, tabela |
| Zapis na listę | `Zapis.astro` | Widoczny tylko po spełnieniu warunków prawnych |
| Baner statusu | `BanerRoboczy.astro` | „Wersja robocza” do czasu recenzji |
| Ikony | `Ikona.astro` | Liniowe, siatka 24 px |
| Grafika drogi | `GrafikaDrogi.astro` | Motyw sekcji głównej |

Klasy wspólne (`src/styles/globalne.css`): `.kontener`, `.sekcja`, `.siatka`, `.karta`, `.przycisk`, `.ramka`, `.proza`, `.tabela-przewijana`, `.znacznik`, `.etykieta`, `.lista-kontrolna`.

## 6. Styl grafik i mediów społecznościowych

- Motyw przewodni: linia drogi z zaokrąglonymi zakrętami i punktami etapów.
- Tła: granat lub jasna szarość; złoto tylko jako akcent.
- Wykresy: cienkie linie, jasna siatka, zawsze z podpisanymi założeniami.
- Bez zdjęć gotówki, luksusu i ludzi sukcesu. Bez symboli sugerujących gwarancję.
