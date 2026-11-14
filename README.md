# Finansowa Przyszłość

Niezależna platforma edukacji finansowej dla osób prowadzących działalność i pracujących na B2B: strona publiczna oraz strefa kursanta z kursami, lekcjami, quizami, kalkulatorami i postępem. Zbudowana w Astro jako strona statyczna.

Strefa kursanta (`/platforma/`) działa w wersji demonstracyjnej: konta jeszcze nie istnieją, a postęp zapisuje się tylko w przeglądarce. Kurs „Emerytura pod kontrolą” ma 20 lekcji w 8 z 13 modułów (wersja robocza przed recenzją); w centrum narzędzi działają kalkulatory rezerwy finansowej, regularnego oszczędzania, procentu składanego i inflacji. Katalog kursów: `/platforma/kursy/`.

**Status: wersja robocza.** Materiały nie przeszły recenzji doradcy podatkowego. Serwis jest zamknięty dla wyszukiwarek, nie zbiera danych i niczego nie sprzedaje.

## Uruchomienie

Wymagany Node.js 22 lub nowszy.

```bash
npm install
npm run dev        # http://localhost:4321
```

## Testy

```bash
npm test           # testy jednostkowe
npm run test:e2e   # buduje stronę i testuje ją w przeglądarce (przy pierwszym uruchomieniu: npx playwright install chromium)
```

## Przewodnik PDF (materiał uzupełniający)

```bash
npm run przewodnik # składa PDF do katalogu wydruki/
```

Rozdziały są w `produkt/przewodnik/rozdzialy/`. Dopóki materiały nie przejdą recenzji, okładka i stopka oznaczają PDF jako wersję roboczą.

## Przed publikacją

```bash
SITE_URL=https://adres-serwisu npm run gotowosc
```

Polecenie wypisuje blokady: brakujące dane podmiotu, recenzję, dokumenty prawne i przeterminowane przeglądy źródeł.

## Dokumentacja

- `CLAUDE.md` — główny brief, zasady i struktura projektu
- `docs/architektura-platformy.md` — struktura platformy, kursy i lekcje, postęp, narzędzia, plan backendu
- `docs/strategia-biznesowa.md` — model, oferta, walidacja, kanały
- `docs/grupa-docelowa-i-pozycjonowanie.md`
- `docs/marka.md` — architektura marki, logo, kolory, komponenty
- `docs/zakres-produktu.md` — pierwszy produkt i granice edukacji
- `docs/kalkulator-wymagania.md`
- `docs/system-aktualizacji.md` — jak utrzymywać liczby i przepisy
- `docs/rejestr-zrodel-i-twierdzen.md` — rejestr (generowany)
- `docs/kwestie-do-weryfikacji.md` — pytania do doradcy podatkowego, prawnika i księgowego
- `docs/harmonogram.md`
- `docs/walidacja/` — scenariusz rozmów walidacyjnych i zapytanie ofertowe do doradcy podatkowego
- `docs/raport-do-recenzji.md` — raport stanu projektu dla recenzenta zewnętrznego
- `docs/konfrontacja-analiz.md` — co zmieniło się względem wcześniejszych analiz
