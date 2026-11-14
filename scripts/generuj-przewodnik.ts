/**
 * Składa przewodnik „Emerytura pod kontrolą” do PDF.
 *
 *   npm run przewodnik
 *
 * Wejście:  produkt/przewodnik/rozdzialy/*.md (format: produkt/przewodnik/szablon-rozdzialu.md)
 * Wyjście:  wydruki/<nazwa>.html i wydruki/<nazwa>.pdf (katalog poza repozytorium)
 *
 * Liczby pochodzą z rejestru, przykłady obliczeniowe z bibliotek kalkulatora.
 * Rozdział z twierdzeniem spoza źródeł pierwotnych albo z blokadą nie zostanie złożony.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { marked } from 'marked';
import { chromium } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';
import { przygotujRozdzial, type Rozdzial } from '@/lib/przewodnik';
import { dyrektywa, esc } from '@/lib/przyklady';
import { data, liczebnik } from '@/lib/format';
import { STAN_NA_DZIEN } from '@/lib/rejestr';
import { PRZED_RECENZJA, SERWIS } from '@/lib/serwis';

const korzen = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const katalogRozdzialow = resolve(korzen, 'produkt/przewodnik/rozdzialy');
const katalogWyjscia = resolve(korzen, 'wydruki');

const WERSJA = SERWIS.produkt.wersja;
const NAZWA_PLIKU = `emerytura-pod-kontrola-${WERSJA}${PRZED_RECENZJA ? '-robocza' : ''}`;

/** Pełny spis przewodnika (produkt/przewodnik/struktura.md). */
const SPIS: Array<[string, string]> = [
  ['0', 'Jak korzystać z przewodnika'],
  ['1', 'Jak działa system emerytalny'],
  ['2', 'ZUS: co możesz sprawdzić'],
  ['3', 'Twoja forma pracy'],
  ['4', 'IKE'],
  ['5', 'IKZE'],
  ['6', 'OKI'],
  ['7', 'Trzy konta obok siebie'],
  ['8', 'PPK i PPE'],
  ['9', 'Inflacja i procent składany'],
  ['10', 'Podstawy inwestowania'],
  ['11', 'Jak porównywać instytucje i produkty'],
  ['12', 'Twój plan'],
  ['A', 'Checklisty'],
  ['B', 'Słownik pojęć'],
  ['C', 'Źródła'],
];

function wstawDyrektywy(markdown: string, numer: string): string {
  return markdown.replace(/<!--\s*([a-z:-]+)\s*-->/g, (_c, nazwa: string) => {
    try {
      return `\n\n${dyrektywa(nazwa)}\n\n`;
    } catch (e) {
      throw new Error(`Rozdział ${numer}: ${(e as Error).message}`);
    }
  });
}

/** Ramka „Sprawdź u siebie”: nagłówek z listą zadań w jednym bloku. */
function ramkaSprawdz(html: string): string {
  return html.replace(
    /<h2>Sprawdź u siebie<\/h2>\s*((?:<p>[\s\S]*?<\/p>\s*)?<ul>[\s\S]*?<\/ul>)/,
    '<section class="sprawdz"><h2>Sprawdź u siebie</h2>$1</section>',
  );
}

// ---------- Skład ----------

function rozdzialHtml(r: Rozdzial): string {
  const tresc = ramkaSprawdz(marked.parse(wstawDyrektywy(r.markdown, r.metadane.numer), { async: false }) as string);
  const przypisy = r.przypisy.length
    ? `<section class="zrodla-rozdzialu"><h2>Źródła</h2><ol>${r.przypisy
        .map(
          (p) =>
            `<li value="${p.nr}"><strong>${esc(p.twierdzenie.przepis)}</strong> — ${
              p.zrodlo.url ? `<a href="${p.zrodlo.url}">${esc(p.zrodlo.tytul)}</a>` : esc(p.zrodlo.tytul)
            } (${esc(p.zrodlo.publikator)})</li>`,
        )
        .join('')}</ol></section>`
    : '';
  const etykieta = r.metadane.numer === '0' ? 'Wprowadzenie' : `Rozdział ${r.metadane.numer}`;
  return `<article class="rozdzial">
<header class="rozdzial__naglowek"><p class="rozdzial__etykieta">${etykieta}</p><h1>${esc(r.metadane.tytul)}</h1>
<p class="rozdzial__cel"><span>Po tym rozdziale</span>${esc(r.metadane.cel)}</p></header>
${tresc}
${przypisy}
</article>`;
}

function spisHtml(obecne: Set<string>): string {
  const pozycje = SPIS.map(
    ([nr, tytul]) =>
      `<li class="${obecne.has(nr) ? 'jest' : 'brak'}"><span class="nr">${nr}</span><span class="t">${tytul}</span><span class="s">${
        obecne.has(nr) ? 'w tej wersji' : 'w przygotowaniu'
      }</span></li>`,
  ).join('');
  return `<section class="spis"><h1>Spis treści</h1><ol>${pozycje}</ol>
<p class="spis__uwaga">Rozdziały oznaczone „w przygotowaniu” powstaną po recenzji doradcy podatkowego albo po uzupełnieniu rejestru źródeł. Dostaniesz je w ramach aktualizacji.</p></section>`;
}

function dodatekZrodla(rozdzialy: Rozdzial[]): string {
  const widziane = new Set<string>();
  const wiersze = rozdzialy
    .flatMap((r) => r.przypisy)
    .filter((p) => !widziane.has(p.twierdzenie.id) && widziane.add(p.twierdzenie.id))
    .map(
      (p) =>
        `<tr><td>${esc(p.twierdzenie.tresc)}</td><td>${esc(p.twierdzenie.przepis)}<br>${
          p.zrodlo.url ? `<a href="${p.zrodlo.url}">${esc(p.zrodlo.publikator)}</a>` : esc(p.zrodlo.publikator)
        }</td><td class="l">${data(p.twierdzenie.sprawdzono)}</td></tr>`,
    )
    .join('');
  return `<article class="rozdzial dodatek"><header class="rozdzial__naglowek"><p class="rozdzial__etykieta">Dodatek C</p><h1>Źródła</h1></header>
<p>Wszystkie twierdzenia użyte w tej wersji przewodnika, z podstawą prawną i datą sprawdzenia w tekście źródłowym. Stan prawny: ${data(STAN_NA_DZIEN)}</p>
<table class="tabela-zrodel"><thead><tr><th>Twierdzenie</th><th>Podstawa</th><th class="l">Sprawdzono</th></tr></thead><tbody>${wiersze}</tbody></table></article>`;
}

function stopkaRedakcyjna(): string {
  const o = SERWIS.operator;
  const r = SERWIS.publikacja.recenzjaEksperta;
  return `<section class="redakcja"><h2>O tym wydaniu</h2>
<dl>
<dt>Tytuł</dt><dd>${esc(SERWIS.produkt.nazwa)} — ${esc(SERWIS.produkt.podtytul)}</dd>
<dt>Wersja</dt><dd>${WERSJA}${PRZED_RECENZJA ? ', wersja robocza' : ''}</dd>
<dt>Stan prawny</dt><dd>${data(STAN_NA_DZIEN)}</dd>
<dt>Wydawca</dt><dd>${esc(SERWIS.marka)}${o.nazwa ? `, ${esc([o.nazwa, o.formaPrawna, o.nip && `NIP ${o.nip}`, o.adres].filter(Boolean).join(', '))}` : ' — dane wydawcy zostaną uzupełnione przed publikacją'}</dd>
<dt>Recenzja podatkowa</dt><dd>${r ? `${esc(r.kto)}, nr wpisu ${esc(r.numerWpisu)}, ${data(r.data)}` : 'jeszcze nie przeprowadzona'}</dd>
</dl>
<p>Przewodnik ma charakter edukacyjny. Nie uwzględnia Twojej indywidualnej sytuacji i nie jest rekomendacją inwestycyjną ani poradą podatkową. ${esc(SERWIS.marka)} nie jest bankiem, funduszem, domem maklerskim ani doradcą inwestycyjnym i nie ma umów partnerskich z instytucjami finansowymi. Inwestowanie wiąże się z ryzykiem utraty części lub całości kapitału.</p></section>`;
}

function okladka(): string {
  const logo = readFileSync(resolve(korzen, 'public/logo/logo-poziome-na-ciemne-tlo.svg'), 'utf8')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/width="\d+" height="\d+"/, 'height="40"');
  const droga =
    'M-20 760h170a60 60 0 0 0 60-60v-90a60 60 0 0 1 60-60h110a60 60 0 0 0 60-60v-90a60 60 0 0 1 60-60h120';
  return `<section class="okladka">
<div class="okladka__logo">${logo}</div>
<svg class="okladka__droga" viewBox="0 0 640 820" aria-hidden="true"><path d="${droga}" fill="none" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="64" stroke-linecap="round"/><path d="${droga}" fill="none" stroke="#D5B875" stroke-width="3" stroke-linecap="round"/><circle cx="560" cy="280" r="14" fill="#D5B875"/></svg>
<div class="okladka__tytul"><p class="okladka__etykieta">Przewodnik</p><h1>${esc(SERWIS.produkt.nazwa)}</h1><p class="okladka__podtytul">${esc(SERWIS.produkt.podtytul)}</p></div>
<div class="okladka__dol">${PRZED_RECENZJA ? '<p class="okladka__robocza">Wersja robocza — przed recenzją doradcy podatkowego. Nie do sprzedaży i rozpowszechniania.</p>' : ''}<p>Wersja ${WERSJA} · Stan prawny na ${data(STAN_NA_DZIEN)}</p></div>
</section>`;
}

/** Strony treści: marginesy, stopka z tytułem i numer strony (okładka nie jest liczona). */
const STRONY_TRESCI = `
@page { size: A4; margin: 20mm 20mm 22mm 22mm;
  @bottom-left { content: "${SERWIS.produkt.nazwa} · wersja ${WERSJA}${PRZED_RECENZJA ? ' · wersja robocza' : ''}"; font: 400 7.5pt 'Inter Variable', sans-serif; color: #4A5870; }
  @bottom-right { content: counter(page); font: 600 7.5pt 'Inter Variable', sans-serif; color: #4A5870; }
}
`;

/** Okładka jest osobnym dokumentem: przeglądarka składa całość na szerokość strony z marginesami. */
const STRONA_OKLADKI = `@page { size: A4; margin: 0; }`;

const CSS = `
:root { --granat:#101D35; --zloto:#D5B875; --zloto-ciemne:#75581A; --tlo:#F5F6F8; --lupek:#26364B; --cichy:#4A5870; --linia:#D6DBE4;
  --seria-nominalna:#2F5DA8; --seria-realna:#B07F1E; --seria-wplaty:#1F8A70; --powierzchnia:#FFFFFF; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 400 10pt/1.6 'Inter Variable', sans-serif; color: var(--granat); }
h1, h2, h3 { font-family: 'Manrope Variable', sans-serif; letter-spacing: -0.02em; line-height: 1.2; break-after: avoid; }
h2 { font-size: 14pt; font-weight: 700; margin: 18pt 0 6pt; }
h3 { font-size: 11.5pt; font-weight: 700; margin: 14pt 0 4pt; }
p { margin: 0 0 7pt; orphans: 3; widows: 3; }
ul, ol { margin: 0 0 8pt; padding-left: 16pt; }
li { margin-bottom: 3pt; }
a { color: inherit; text-decoration-color: var(--zloto-ciemne); }
strong { font-weight: 650; }
sup.odn { font-size: 6.5pt; font-weight: 700; color: var(--zloto-ciemne); padding-left: 1pt; line-height: 0; }

.okladka { position: relative; width: 210mm; height: 297mm; background: var(--granat); color: #fff; overflow: hidden; break-after: page; }
.okladka__logo { position: absolute; left: 22mm; top: 22mm; }
.okladka__droga { position: absolute; right: -6mm; bottom: 26mm; width: 150mm; }
.okladka__tytul { position: absolute; left: 22mm; top: 82mm; width: 150mm; }
.okladka__etykieta { font: 700 9pt 'Manrope Variable'; letter-spacing: .14em; text-transform: uppercase; color: var(--zloto); margin-bottom: 10pt; }
.okladka h1 { font-size: 40pt; line-height: 1.05; margin: 0 0 14pt; letter-spacing: -.03em; }
.okladka__podtytul { font-size: 14pt; color: #C5CEDC; max-width: 120mm; }
.okladka__dol { position: absolute; left: 22mm; right: 22mm; bottom: 20mm; font-size: 9pt; color: #C5CEDC; }
.okladka__robocza { display: inline-block; background: var(--zloto); color: var(--granat); font-weight: 700; padding: 4pt 8pt; border-radius: 3pt; margin-bottom: 8pt; }

.spis { break-after: page; }
.spis h1, .rozdzial__naglowek h1 { font-size: 24pt; margin: 0 0 10pt; }
.spis ol { list-style: none; padding: 0; margin: 14pt 0; }
.spis li { display: grid; grid-template-columns: 12mm 1fr auto; gap: 4mm; padding: 6pt 0; border-bottom: .6pt solid var(--linia); margin: 0; }
.spis .nr { font: 700 10pt 'Manrope Variable'; color: var(--zloto-ciemne); }
.spis .s { font-size: 8pt; color: var(--cichy); }
.spis li.brak .t { color: var(--cichy); }
.spis li.jest .t { font-weight: 600; }
.spis__uwaga { font-size: 8.5pt; color: var(--cichy); }

.rozdzial { break-before: page; }
.rozdzial__naglowek { border-bottom: 2pt solid var(--granat); padding-bottom: 10pt; margin-bottom: 14pt; }
.rozdzial__etykieta { font: 700 8.5pt 'Manrope Variable'; letter-spacing: .14em; text-transform: uppercase; color: var(--zloto-ciemne); margin-bottom: 6pt; }
.rozdzial__cel { font-size: 10pt; color: var(--lupek); margin: 0; }
.rozdzial__cel span { display: block; font-size: 7.5pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--cichy); margin-bottom: 2pt; }

blockquote { margin: 0 0 12pt; padding: 8pt 12pt; background: var(--tlo); border-left: 3pt solid var(--zloto); border-radius: 2pt; }
blockquote p { margin: 0; }

table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 6pt 0 10pt; }
th, td { text-align: left; vertical-align: top; padding: 5pt 7pt; border-bottom: .6pt solid var(--linia); }
thead th { font: 700 7.5pt 'Manrope Variable'; letter-spacing: .05em; text-transform: uppercase; color: var(--cichy); background: var(--tlo); }
tbody th { font-weight: 600; }
.wizualnie-ukryte { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.tabela-przewijana { overflow: visible; }
.l { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
tr { break-inside: avoid; }
figure { margin: 8pt 0 12pt; break-inside: avoid; }
figcaption { font-size: 8pt; color: var(--cichy); margin-top: 4pt; }

.wykres { border: .6pt solid var(--linia); border-radius: 4pt; padding: 8pt 10pt; }
.wykres__tytul { font: 700 10pt 'Manrope Variable'; margin-bottom: 4pt; }
.legenda { list-style: none; padding: 0; margin: 0 0 4pt; display: flex; flex-wrap: wrap; gap: 2pt 12pt; font-size: 8pt; color: var(--lupek); }
.legenda li { display: flex; align-items: center; gap: 4pt; margin: 0; }
.klucz { display: inline-block; width: 12pt; border-top: 2.5pt solid var(--k); }
.wykres__svg { width: 100%; height: auto; display: block; }
.wykres__svg [hidden] { display: none; }
.wykres__siatka { stroke: #E6EAF0; stroke-width: 1; }
.wykres__siatka--os { stroke: #B9C2D0; }
.wykres__os { font: 500 11px 'Inter Variable'; fill: #4A5870; }
.wykres__etykieta { font: 600 11px 'Inter Variable'; fill: #26364B; }
.wykres__lacznik { stroke: #B9C2D0; stroke-width: 1; }

.sprawdz { break-inside: avoid; margin: 16pt 0 12pt; padding: 10pt 14pt 6pt; border: 1pt solid var(--granat); border-radius: 4pt; }
.sprawdz h2 { margin-top: 0; font-size: 12pt; }
ul.contains-task-list, .sprawdz ul { list-style: none; padding-left: 0; }
li.task-list-item, .sprawdz li { position: relative; padding-left: 16pt; }
input[type=checkbox] { appearance: none; position: absolute; left: 0; top: 2pt; width: 9pt; height: 9pt; border: 1pt solid var(--granat); border-radius: 1.5pt; margin: 0; }

.zrodla-rozdzialu { margin-top: 18pt; padding-top: 8pt; border-top: .6pt solid var(--linia); font-size: 8pt; color: var(--lupek); break-inside: avoid; }
.zrodla-rozdzialu h2 { font-size: 9pt; margin: 0 0 4pt; }
.zrodla-rozdzialu li { margin-bottom: 2pt; }
.tabela-zrodel { font-size: 8pt; }
.tabela-zrodel td:first-child { width: 58%; }

.redakcja { break-before: page; font-size: 8.5pt; color: var(--lupek); }
.redakcja dl { display: grid; grid-template-columns: 34mm 1fr; gap: 4pt 6mm; margin: 8pt 0 14pt; }
.redakcja dt { font-weight: 700; color: var(--granat); }
.redakcja dd { margin: 0; }
`;

function dokument(tresc: string, strony: string): string {
  const css = (pakiet: string) =>
    pathToFileURL(resolve(korzen, 'node_modules', pakiet, 'index.css')).href;
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<title>${esc(SERWIS.produkt.nazwa)} — wersja ${WERSJA}</title>
<link rel="stylesheet" href="${css('@fontsource-variable/inter')}">
<link rel="stylesheet" href="${css('@fontsource-variable/manrope')}">
<style>${strony}${CSS}</style></head><body>${tresc}</body></html>`;
}

// ---------- Uruchomienie ----------

const pliki = readdirSync(katalogRozdzialow).filter((p) => p.endsWith('.md')).sort();
const rozdzialy = pliki.map((p) => przygotujRozdzial(readFileSync(resolve(katalogRozdzialow, p), 'utf8')));
const obecne = new Set(rozdzialy.map((r) => r.metadane.numer));
obecne.add('C');

const czesci = {
  okladka: dokument(okladka(), STRONA_OKLADKI),
  tresc: dokument(
    [spisHtml(obecne), ...rozdzialy.map(rozdzialHtml), dodatekZrodla(rozdzialy), stopkaRedakcyjna()].join('\n'),
    STRONY_TRESCI,
  ),
};

mkdirSync(katalogWyjscia, { recursive: true });
const sciezkaPdf = resolve(katalogWyjscia, `${NAZWA_PLIKU}.pdf`);

const przegladarka = await chromium.launch();
const pdfy: Uint8Array[] = [];
for (const [nazwa, html] of Object.entries(czesci)) {
  const sciezkaHtml = resolve(katalogWyjscia, `${NAZWA_PLIKU}-${nazwa}.html`);
  writeFileSync(sciezkaHtml, html);
  const strona = await przegladarka.newPage();
  await strona.goto(pathToFileURL(sciezkaHtml).href, { waitUntil: 'networkidle' });
  await strona.evaluate(() => document.fonts.ready);
  pdfy.push(await strona.pdf({ preferCSSPageSize: true, printBackground: true, tagged: true }));
  await strona.close();
}
await przegladarka.close();

const wynik = await PDFDocument.create();
for (const bajty of pdfy) {
  const zrodlowy = await PDFDocument.load(bajty);
  const strony = await wynik.copyPages(zrodlowy, zrodlowy.getPageIndices());
  strony.forEach((s) => wynik.addPage(s));
}
wynik.setTitle(`${SERWIS.produkt.nazwa} — ${SERWIS.produkt.podtytul}`);
wynik.setAuthor(SERWIS.marka);
wynik.setSubject(`Wersja ${WERSJA}${PRZED_RECENZJA ? ', wersja robocza' : ''}. Stan prawny na ${STAN_NA_DZIEN}.`);
wynik.setLanguage('pl-PL');
wynik.setCreator(SERWIS.marka);
writeFileSync(sciezkaPdf, await wynik.save());

console.log(`Złożono ${liczebnik(obecne.size, 'rozdział', 'rozdziały', 'rozdziałów')}: ${[...obecne].join(', ')}.`);
console.log(`PDF: ${sciezkaPdf}`);
