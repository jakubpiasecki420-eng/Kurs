import { expect, test } from '@playwright/test';
import { symuluj } from '../../src/lib/kalkulator/oszczednosci';
import { zlPelne } from '../../src/lib/format';

const tekst = (s: string) => s.replace(/ /g, ' ');

test.beforeEach(async ({ page }) => {
  await page.goto('/kalkulator/');
  await expect(page.locator('[data-kalkulator]')).toHaveAttribute('data-gotowy', 'true');
});

test('pokazuje wynik dla wartości początkowych', async ({ page }) => {
  const w = symuluj({ wplataMiesieczna: 500, lata: 20, stopaZwrotu: 0.025, inflacja: 0.025, koszty: 0 });
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText(zlPelne(w.sumaWplat));
  await expect(page.locator('[data-wynik="wartoscNominalna"]')).toHaveText(zlPelne(w.wartoscNominalna));
  await expect(page.locator('[data-wynik="wartoscRealna"]')).toHaveText(zlPelne(w.wartoscRealna));
  await expect(page.getByText('Nie jest prognozą ani obietnicą wyniku')).toBeVisible();
});

test('przelicza wynik po zmianie założeń, także z przecinkiem dziesiętnym', async ({ page }) => {
  await page.getByLabel('Wpłata miesięczna').fill('1 200');
  await page.getByLabel('Okres oszczędzania').fill('30');
  await page.getByLabel('Roczna stopa zwrotu').fill('4,5');
  await page.getByLabel('Roczna inflacja').fill('3');
  await page.getByLabel(/Roczne koszty/).fill('0,8');

  const w = symuluj({ wplataMiesieczna: 1200, lata: 30, stopaZwrotu: 0.045, inflacja: 0.03, koszty: 0.008 });
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText(zlPelne(w.sumaWplat));
  await expect(page.locator('[data-wynik="wartoscNominalna"]')).toHaveText(zlPelne(w.wartoscNominalna));
  await expect(page.locator('[data-wynik="wartoscRealna"]')).toHaveText(zlPelne(w.wartoscRealna));
  await expect(page.locator('[data-wynik="roznica"]')).toHaveText(zlPelne(w.roznica));
});

test('zerowa stopa zwrotu daje wartość nominalną równą sumie wpłat', async ({ page }) => {
  await page.getByRole('button', { name: '0%', exact: true }).click();
  await expect(page.getByLabel('Roczna stopa zwrotu')).toHaveValue('0');
  await expect(page.getByRole('button', { name: '0%', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(tekst(await page.locator('[data-wynik="wartoscNominalna"]').innerText())).toBe('120 000 zł');
  expect(tekst(await page.locator('[data-wynik="roznica"]').innerText())).toBe('0 zł');
});

test('ujemna stopa zwrotu pokazuje stratę', async ({ page }) => {
  await page.getByRole('button', { name: '−2%' }).click();
  const roznica = tekst(await page.locator('[data-wynik="roznica"]').innerText());
  expect(roznica.startsWith('-')).toBe(true);
});

test('błędne dane pokazują komunikat i nie zmieniają wyniku', async ({ page }) => {
  const przed = await page.locator('[data-wynik="wartoscNominalna"]').innerText();
  const lata = page.getByLabel('Okres oszczędzania');
  await lata.fill('80');
  await expect(lata).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-blad="lata"]')).toContainText('od 1 do 50 lat');
  await expect(page.locator('[data-wyniki]')).toHaveAttribute('data-nieaktualne', '');
  await expect(page.locator('[data-wynik="wartoscNominalna"]')).toHaveText(przed);

  await lata.fill('abc');
  await expect(page.locator('[data-blad="lata"]')).toContainText('wpisz liczbę');

  await lata.fill('10');
  await expect(lata).toHaveAttribute('aria-invalid', 'false');
  await expect(page.locator('[data-wyniki]')).not.toHaveAttribute('data-nieaktualne', '');
  expect(tekst(await page.locator('[data-wynik="sumaWplat"]').innerText())).toBe('60 000 zł');
});

test('przywraca wartości początkowe', async ({ page }) => {
  await page.getByLabel('Wpłata miesięczna').fill('3000');
  await page.getByRole('button', { name: 'Przywróć wartości początkowe' }).click();
  await expect(page.getByLabel('Wpłata miesięczna')).toHaveValue('500');
  expect(tekst(await page.locator('[data-wynik="sumaWplat"]').innerText())).toBe('120 000 zł');
});

test('tabela ma wiersz na każdy rok i te same liczby co kafle', async ({ page }) => {
  await page.getByLabel('Okres oszczędzania').fill('12');
  await page.getByText('Pokaż wyniki rok po roku w tabeli').click();
  const wiersze = page.locator('[data-tabela] tr');
  await expect(wiersze).toHaveCount(12);
  const ostatni = wiersze.last().locator('td');
  await expect(ostatni.nth(1)).toHaveText(await page.locator('[data-wynik="wartoscNominalna"]').innerText());
  await expect(ostatni.nth(2)).toHaveText(await page.locator('[data-wynik="wartoscRealna"]').innerText());
});

test('wykres ma trzy serie, legendę i mieści się w swoim polu', async ({ page }) => {
  const wykres = page.locator('[data-wykres] svg');
  await expect(wykres.locator('path[stroke-width="2"]')).toHaveCount(3);
  await expect(page.getByRole('list', { name: 'Legenda' }).getByRole('listitem')).toHaveCount(3);
  const pole = await page.locator('[data-wykres]').boundingBox();
  const svg = await wykres.boundingBox();
  expect(svg!.width).toBeLessThanOrEqual(pole!.width + 1);
  await expect(wykres.locator('[data-kursor]')).toBeHidden();
});

test('wartości z wykresu można odczytać klawiaturą', async ({ page }) => {
  const pole = page.locator('[data-wykres]');
  await pole.focus();
  const dymek = page.locator('[data-dymek]');
  await expect(dymek).toBeVisible();
  await expect(dymek).toContainText('Po 20 latach');
  await pole.press('ArrowLeft');
  await expect(dymek).toContainText('Po 19 latach');
  await pole.press('Home');
  await expect(dymek).toContainText('Start');
  await expect(page.locator('[data-odczyt]')).toContainText('suma wpłat 0 zł');
  await pole.blur();
  await expect(dymek).toBeHidden();
});

test('wskazanie punktu na wykresie pokazuje wszystkie trzy wartości', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Najechanie kursorem dotyczy urządzeń ze wskaźnikiem.');
  const pole = page.locator('[data-wykres]');
  await pole.scrollIntoViewIfNeeded();
  const ramka = (await pole.boundingBox())!;
  await page.mouse.move(ramka.x + ramka.width * 0.5, ramka.y + ramka.height * 0.5);
  const dymek = page.locator('[data-dymek]');
  await expect(dymek).toBeVisible();
  await expect(dymek.locator('dd')).toHaveCount(3);
  await expect(dymek.locator('.dymek__rok')).toContainText(/Po \d+ latach/);
});
