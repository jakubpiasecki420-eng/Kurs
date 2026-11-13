/**
 * Buduje czytelną wersję rejestru źródeł i twierdzeń.
 *
 *   npm run rejestr
 *
 * Źródłem prawdy jest src/data/rejestr.json. Pliku docs/rejestr-zrodel-i-twierdzen.md
 * nie edytujemy ręcznie.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const katalog = dirname(fileURLToPath(import.meta.url));
const rejestr = JSON.parse(readFileSync(resolve(katalog, '../src/data/rejestr.json'), 'utf8'));

const STATUSY = {
  P: ['Potwierdzone w źródle pierwotnym [P]', 'Przeczytane w akcie prawnym lub na stronie urzędu. Tylko te twierdzenia wolno pokazać na stronie.'],
  W: ['Źródła wtórne [W]', 'Dane z mediów i serwisów branżowych. Służą analizie rynku; przed publikacją trzeba sięgnąć do oryginału.'],
  Z: ['Założenia i wnioski własne [Z]', 'Wymagają potwierdzenia przez doradcę podatkowego albo prawnika. Nie wolno ich publikować jako faktów.'],
};

const komorka = (t) => String(t).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const linie = [
  '# Rejestr źródeł i twierdzeń',
  '',
  '> Plik generowany poleceniem `npm run rejestr` z `src/data/rejestr.json`. Nie edytuj go ręcznie.',
  '',
  `Stan prawny na dzień: **${rejestr.stanNaDzien}**. Liczba twierdzeń: **${rejestr.twierdzenia.length}**.`,
  '',
];

for (const [status, [tytul, opis]] of Object.entries(STATUSY)) {
  const wiersze = rejestr.twierdzenia.filter((t) => t.status === status);
  linie.push(`## ${tytul}`, '', opis, '', `Liczba: ${wiersze.length}.`, '');
  linie.push('| Identyfikator | Obszar | Twierdzenie | Podstawa | Sprawdzono | Przegląd |', '| --- | --- | --- | --- | --- | --- |');
  for (const t of wiersze) {
    const z = rejestr.zrodla[t.zrodlo];
    const zrodlo = z.url ? `[${z.publikator}](${z.url})` : z.publikator;
    linie.push(
      `| \`${t.id}\` | ${t.obszar} | ${komorka(t.tresc)} | ${komorka(t.przepis)}; ${zrodlo} | ${t.sprawdzono} | ${t.przeglad} |`,
    );
  }
  linie.push('');
}

linie.push('## Źródła', '', '| Klucz | Tytuł | Publikator | Rodzaj |', '| --- | --- | --- | --- |');
for (const [klucz, z] of Object.entries(rejestr.zrodla)) {
  const tytul = z.url ? `[${komorka(z.tytul)}](${z.url})` : komorka(z.tytul);
  linie.push(`| \`${klucz}\` | ${tytul} | ${z.publikator} | ${z.rodzaj} |`);
}
linie.push('');

writeFileSync(resolve(katalog, '../docs/rejestr-zrodel-i-twierdzen.md'), linie.join('\n'));
console.log(`Zapisano docs/rejestr-zrodel-i-twierdzen.md (${rejestr.twierdzenia.length} twierdzeń).`);
