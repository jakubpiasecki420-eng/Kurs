import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const STRONY = [
  '/',
  '/ike/',
  '/ikze/',
  '/oki/',
  '/jdg-b2b/',
  '/kalkulator/',
  '/artykuly/',
  '/artykuly/wartosc-nominalna-i-realna/',
  '/program/',
  '/jak-uczymy/',
  '/biblioteka/',
  '/platforma/',
  '/platforma/postep/',
  '/platforma/narzedzia/',
  '/platforma/narzedzia/oszczedzanie/',
  '/platforma/ustawienia/',
  '/platforma/kurs/kurs-demonstracyjny/',
  '/platforma/kurs/kurs-demonstracyjny/poznaj-platforme/',
  '/platforma/kurs/kurs-demonstracyjny/poznaj-platforme/jak-zbudowana-jest-lekcja/',
  '/platforma/kurs/kurs-demonstracyjny/modul-z-warunkiem/lekcja-przykladowa-c/',
  '/platforma/kurs/emerytura-pod-kontrola/',
  '/o-projekcie/',
  '/zrodla/',
  '/kontakt/',
];

for (const adres of STRONY) {
  test.describe(`strona ${adres}`, () => {
    test('ładuje się bez błędów i ma podstawowe elementy', async ({ page }) => {
      const bledy: string[] = [];
      page.on('console', (m) => m.type() === 'error' && bledy.push(m.text()));
      page.on('pageerror', (e) => bledy.push(e.message));

      const odpowiedz = await page.goto(adres);
      expect(odpowiedz?.status()).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
      await expect(page).toHaveTitle(/Finansowa Przyszłość/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(page.locator('main#tresc')).toBeVisible();
      await expect(page.locator('footer')).toContainText('niezależnym projektem edukacyjnym');
      expect(bledy).toEqual([]);
    });

    test('przed recenzją jest zamknięta dla wyszukiwarek i oznaczona jako wersja robocza', async ({ page }) => {
      await page.goto(adres);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      await expect(page.getByLabel('Status serwisu')).toContainText('Wersja robocza');
    });

    test('nie przewija się w poziomie', async ({ page }) => {
      await page.goto(adres);
      const nadmiar = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(nadmiar).toBeLessThanOrEqual(0);
    });

    test('spełnia automatyczne kryteria dostępności WCAG 2.1 AA', async ({ page }) => {
      await page.goto(adres);
      const wynik = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(wynik.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
    });
  });
}

test('nieistniejący adres pokazuje stronę błędu z nawigacją', async ({ page }) => {
  const odpowiedz = await page.goto('/nie-ma-takiej-strony/');
  expect(odpowiedz?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Tej strony nie ma');
  await expect(page.getByRole('link', { name: 'Strona główna', exact: true })).toBeVisible();
});

test('robots.txt blokuje indeksowanie do czasu recenzji', async ({ request }) => {
  const tresc = await (await request.get('/robots.txt')).text();
  expect(tresc).toContain('Disallow: /');
});

test('tekst nie ma sklejonych wyrazów przy pogrubieniach i linkach', async ({ page }) => {
  await page.goto('/ikze/');
  const tekst = (await page.locator('main').innerText()).replace(/ /g, ' ');
  expect(tekst).toContain('działalność 18 059,40 zł');
  expect(tekst).toContain('na stronie dla JDG i B2B');
});

test('liczby na stronach pochodzą z rejestru', async ({ page }) => {
  await page.goto('/');
  const tekst = (await page.locator('main').innerText()).replace(/ /g, ' ');
  for (const kwota of ['30 099 zł', '12 039,60 zł', '18 059,40 zł']) expect(tekst).toContain(kwota);
});

test('przypis prowadzi do źródła na dole strony', async ({ page }) => {
  await page.goto('/ike/');
  const przypis = page.locator('a.odn').first();
  const cel = await przypis.getAttribute('href');
  await przypis.click();
  await expect(page.locator(cel!)).toBeInViewport();
  await expect(page.locator(cel!).locator('a')).toHaveAttribute('href', /^https:\/\//);
});
