/**
 * Sprawdza, czy serwis wolno udostępnić publicznie.
 *
 *   npm run gotowosc
 *
 * Kończy się kodem 1, jeśli jest choć jedna blokada. Uruchamiaj przed każdym wdrożeniem.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const katalog = dirname(fileURLToPath(import.meta.url));
const czytaj = (sciezka) => JSON.parse(readFileSync(resolve(katalog, '..', sciezka), 'utf8'));
const serwis = czytaj('src/config/serwis.json');
const rejestr = czytaj('src/data/rejestr.json');
const dzis = new Date().toISOString().slice(0, 10);

const blokady = [];
const uwagi = [];

const { operator, kontakt, publikacja, zapis } = serwis;
if (!operator.nazwa || !operator.adres) blokady.push('Brak danych podmiotu prowadzącego serwis (src/config/serwis.json → operator).');
if (!kontakt.email) blokady.push('Brak adresu kontaktowego (kontakt.email).');
if (!publikacja.recenzjaEksperta) blokady.push('Materiały nie przeszły recenzji doradcy podatkowego (publikacja.recenzjaEksperta).');
if (!publikacja.opiniaPrawna) blokady.push('Brak opinii prawnej o granicy edukacji i doradztwa oraz o użyciu nazw IKE, IKZE i OKI (publikacja.opiniaPrawna).');
if (!publikacja.politykaPrywatnosci) blokady.push('Brak polityki prywatności — bez niej nie wolno zbierać adresów e-mail.');
if (!publikacja.regulamin) uwagi.push('Brak regulaminu — wymagany przed rozpoczęciem sprzedaży.');
if (!process.env.SITE_URL) blokady.push('Nie ustawiono SITE_URL — nie powstaną adresy kanoniczne ani mapa strony.');
if (zapis.aktywny && (!zapis.adresFormularza || !publikacja.politykaPrywatnosci)) {
  blokady.push('Zapis na listę jest włączony bez adresu formularza lub bez polityki prywatności.');
}
if (publikacja.indeksowanie && !publikacja.recenzjaEksperta) {
  blokady.push('Indeksowanie jest włączone przed recenzją ekspercką.');
}

const zalegle = rejestr.twierdzenia.filter((t) => t.przeglad <= dzis);
if (zalegle.length > 0) {
  blokady.push(`Twierdzenia z przeterminowanym przeglądem (${zalegle.length}): ${zalegle.map((t) => t.id).join(', ')}.`);
}
const liczba = (s) => rejestr.twierdzenia.filter((t) => t.status === s).length;
uwagi.push(`Rejestr: ${liczba('P')} twierdzeń ze źródeł pierwotnych, ${liczba('W')} ze źródeł wtórnych, ${liczba('Z')} założeń własnych.`);
uwagi.push(`Stan prawny rejestru: ${rejestr.stanNaDzien}.`);

console.log('Gotowość serwisu do publikacji\n');
if (blokady.length === 0) console.log('Brak blokad.\n');
else {
  console.log(`Blokady (${blokady.length}):`);
  blokady.forEach((b) => console.log(`  ✗ ${b}`));
  console.log('');
}
console.log('Informacje:');
uwagi.forEach((u) => console.log(`  • ${u}`));

process.exit(blokady.length === 0 ? 0 : 1);
