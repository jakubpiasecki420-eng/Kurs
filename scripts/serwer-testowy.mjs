/**
 * Minimalny serwer zbudowanej strony (dist/) dla testów w przeglądarce.
 * Nie zależy od działającego w tle `astro preview`, które pozwala na jedną instancję na projekt.
 *
 *   node scripts/serwer-testowy.mjs [port]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.argv[2] ?? 4322);

const TYPY = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function plik(sciezkaUrl) {
  const bezpieczna = normalize(decodeURIComponent(sciezkaUrl)).replace(/^(\.\.[/\\])+/, '');
  let p = join(dist, bezpieczna);
  if (!p.startsWith(dist)) return null;
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  return existsSync(p) && statSync(p).isFile() ? p : null;
}

createServer((zadanie, odpowiedz) => {
  const sciezka = new URL(zadanie.url ?? '/', 'http://localhost').pathname;
  const znaleziony = plik(sciezka);
  const docelowy = znaleziony ?? join(dist, '404.html');
  odpowiedz.writeHead(znaleziony ? 200 : 404, {
    'Content-Type': TYPY[extname(docelowy)] ?? 'application/octet-stream',
  });
  createReadStream(docelowy).pipe(odpowiedz);
}).listen(port, () => console.log(`Serwer testowy: http://localhost:${port}`));
