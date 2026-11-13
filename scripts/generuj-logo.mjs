/**
 * Generuje pliki logo (koncept B „Droga do przyszłości”), favicon, avatar i grafikę OG.
 *
 *   npm run logo
 *
 * Napis jest zamieniany na krzywe, więc pliki SVG wyglądają tak samo bez zainstalowanego fontu.
 * Pliki PNG powstają przez zrzut SVG w przeglądarce Chromium z Playwrighta.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { chromium } from '@playwright/test';

const katalog = dirname(fileURLToPath(import.meta.url));
const publiczny = resolve(katalog, '../public');
const logoDir = resolve(publiczny, 'logo');
mkdirSync(logoDir, { recursive: true });

const GRANAT = '#101D35';
const ZLOTO = '#D5B875';
const BIEL = '#FFFFFF';
const NAZWA = 'Finansowa Przyszłość';

function font(plik) {
  const bufor = readFileSync(resolve(katalog, '../node_modules/@expo-google-fonts/manrope', plik));
  return opentype.parse(bufor.buffer.slice(bufor.byteOffset, bufor.byteOffset + bufor.byteLength));
}
const pogrubiony = font('700Bold/Manrope_700Bold.ttf');

/** Tekst jako ścieżka SVG oraz jego szerokość. */
function napis(tekst, rozmiar, opcje = {}) {
  const f = opcje.font ?? pogrubiony;
  const ustawienia = { kerning: true, letterSpacing: opcje.odstep ?? -0.02 };
  const sciezka = f.getPath(tekst, 0, 0, rozmiar, ustawienia);
  const ramka = sciezka.getBoundingBox();
  return { d: daneSciezki(sciezka), szer: ramka.x2 - ramka.x1, x1: ramka.x1, y1: ramka.y1, y2: ramka.y2 };
}

/**
 * Własny zapis danych ścieżki. Metoda toPathData() z opentype.js potrafi zwrócić „NaN”
 * dla części współrzędnych, co ucina napis w miejscu błędu.
 */
function daneSciezki(sciezka) {
  const z = (n) => {
    if (!Number.isFinite(n)) throw new Error('Nieprawidłowa współrzędna w krzywej fontu.');
    return String(Math.round(n * 100) / 100);
  };
  return sciezka.commands
    .map((c) => {
      switch (c.type) {
        case 'M':
        case 'L':
          return `${c.type}${z(c.x)} ${z(c.y)}`;
        case 'Q':
          return `Q${z(c.x1)} ${z(c.y1)} ${z(c.x)} ${z(c.y)}`;
        case 'C':
          return `C${z(c.x1)} ${z(c.y1)} ${z(c.x2)} ${z(c.y2)} ${z(c.x)} ${z(c.y)}`;
        case 'Z':
          return 'Z';
        default:
          throw new Error(`Nieznane polecenie ścieżki: ${c.type}`);
      }
    })
    .join('');
}

/** Symbol na siatce 48 × 48. */
const symbol = (kolor) =>
  `<path d="M6 38h8a10 10 0 0 0 10-10v-4a10 10 0 0 1 10-10h1" fill="none" stroke="${kolor}" stroke-width="5.2" stroke-linecap="round"/>` +
  `<circle cx="42" cy="14" r="3.6" fill="${ZLOTO}"/>`;

const svg = (szer, wys, zawartosc, tytul = NAZWA) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${szer} ${wys}" width="${szer}" height="${wys}" role="img" aria-label="${tytul}">` +
  `<title>${tytul}</title>${zawartosc}</svg>\n`;

function sam(kolor) {
  return svg(48, 48, symbol(kolor));
}

function poziome(kolor) {
  const n = napis(NAZWA, 26);
  const szer = Math.ceil(48 + 14 + n.szer + 4);
  // linia bazowa tak, żeby wysokość wersalików wypadła na środku symbolu
  const baza = 24 + 9.3;
  return svg(
    szer,
    48,
    symbol(kolor) + `<path transform="translate(${62 - n.x1} ${baza})" d="${n.d}" fill="${kolor}"/>`,
  );
}

function pionowe(kolor) {
  const n = napis(NAZWA, 26);
  const szer = Math.ceil(n.szer + 24);
  const skala = 1.5;
  const symbolSzer = 48 * skala;
  return svg(
    szer,
    130,
    `<g transform="translate(${(szer - symbolSzer) / 2} 6) scale(${skala})">${symbol(kolor)}</g>` +
      `<path transform="translate(${(szer - n.szer) / 2 - n.x1} 116)" d="${n.d}" fill="${kolor}"/>`,
  );
}

function znaczek(rozmiar, promien) {
  const skala = (rozmiar * 0.72) / 48;
  const margines = (rozmiar - 48 * skala) / 2;
  return svg(
    rozmiar,
    rozmiar,
    `<rect width="${rozmiar}" height="${rozmiar}" rx="${promien}" fill="${GRANAT}"/>` +
      `<g transform="translate(${margines} ${margines}) scale(${skala})">${symbol(BIEL)}</g>`,
  );
}

function og() {
  const haslo1 = napis('Świadomie buduj', 76, { odstep: -0.03 });
  const haslo2 = napis('swoją przyszłość.', 76, { odstep: -0.03 });
  const marka = napis(NAZWA, 30);
  const podpis = napis('Niezależna edukacja finansowa', 24, { font: font('600SemiBold/Manrope_600SemiBold.ttf'), odstep: 0.02 });
  const droga =
    'M620 560h170a56 56 0 0 0 56-56v-70a56 56 0 0 1 56-56h90a56 56 0 0 0 56-56v-70a56 56 0 0 1 56-56h60';
  return svg(
    1200,
    630,
    `<rect width="1200" height="630" fill="${GRANAT}"/>` +
      `<path d="${droga}" fill="none" stroke="${BIEL}" stroke-opacity="0.08" stroke-width="54" stroke-linecap="round"/>` +
      `<path d="${droga}" fill="none" stroke="${ZLOTO}" stroke-width="3" stroke-linecap="round"/>` +
      `<circle cx="1138" cy="196" r="13" fill="${ZLOTO}"/>` +
      `<g transform="translate(80 72) scale(1.25)">${symbol(BIEL)}</g>` +
      `<path transform="translate(${158 - marka.x1} 116)" d="${marka.d}" fill="${BIEL}"/>` +
      `<path transform="translate(${80 - haslo1.x1} 330)" d="${haslo1.d}" fill="${BIEL}"/>` +
      `<path transform="translate(${80 - haslo2.x1} 420)" d="${haslo2.d}" fill="${BIEL}"/>` +
      `<path transform="translate(${80 - podpis.x1} 520)" d="${podpis.d}" fill="${ZLOTO}"/>`,
    `${NAZWA} — Świadomie buduj swoją przyszłość.`,
  );
}

const pliki = {
  'logo/symbol.svg': sam(GRANAT),
  'logo/symbol-na-ciemne-tlo.svg': sam(BIEL),
  'logo/logo-poziome.svg': poziome(GRANAT),
  'logo/logo-poziome-na-ciemne-tlo.svg': poziome(BIEL),
  'logo/logo-pionowe.svg': pionowe(GRANAT),
  'logo/logo-pionowe-na-ciemne-tlo.svg': pionowe(BIEL),
  'logo/avatar.svg': znaczek(512, 0),
  'favicon.svg': znaczek(64, 14),
};
for (const [nazwa, tresc] of Object.entries(pliki)) writeFileSync(resolve(publiczny, nazwa), tresc);

const rastry = [
  { plik: 'apple-touch-icon.png', tresc: znaczek(180, 0), szer: 180, wys: 180 },
  { plik: 'logo/avatar-512.png', tresc: znaczek(512, 0), szer: 512, wys: 512 },
  { plik: 'og.png', tresc: og(), szer: 1200, wys: 630 },
];
const przegladarka = await chromium.launch();
for (const r of rastry) {
  const strona = await przegladarka.newPage({ viewport: { width: r.szer, height: r.wys }, deviceScaleFactor: 1 });
  await strona.setContent(`<style>html,body{margin:0}svg{display:block}</style>${r.tresc}`);
  await strona.screenshot({ path: resolve(publiczny, r.plik), clip: { x: 0, y: 0, width: r.szer, height: r.wys } });
  await strona.close();
}
await przegladarka.close();

console.log(`Zapisano ${Object.keys(pliki).length} plików SVG i ${rastry.length} pliki PNG w public/.`);
