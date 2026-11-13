# Finansowa Przyszłość

Niezależny serwis edukacji finansowej dla osób prowadzących działalność i pracujących na B2B. Strona statyczna zbudowana w Astro.

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

## Przewodnik PDF

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
