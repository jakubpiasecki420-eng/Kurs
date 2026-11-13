import { expect, test } from '@playwright/test';

test('link „Przejdź do treści” jest pierwszym elementem fokusu', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const pomin = page.getByRole('link', { name: 'Przejdź do treści' });
  await expect(pomin).toBeFocused();
  await pomin.press('Enter');
  await expect(page.locator('main#tresc')).toBeFocused();
});

test('przyciski w sekcji głównej prowadzą do programu i strefy kursanta', async ({ page }) => {
  await page.goto('/');
  await page.locator('.hero').getByRole('link', { name: 'Wejdź do strefy kursanta' }).click();
  await expect(page).toHaveURL(/\/platforma\/$/);
  await expect(page.locator('h1')).toContainText('Witaj');
  await page.goto('/');
  await page.locator('.hero').getByRole('link', { name: 'Zobacz program' }).click();
  await expect(page).toHaveURL(/\/program\/$/);
});

test('nagłówek prowadzi do strefy kursanta', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('navigation', { name: 'Główna' }).getByRole('link', { name: 'Strefa kursanta' }).click();
  await expect(page).toHaveURL(/\/platforma\/$/);
});

test('nawigacja główna prowadzi do podstron i oznacza bieżącą', async ({ page, isMobile }) => {
  await page.goto('/');
  const nawigacja = page.getByRole('navigation', { name: 'Główna' });

  if (isMobile) {
    const przycisk = page.getByRole('button', { name: 'Menu' });
    await expect(przycisk).toHaveAttribute('aria-expanded', 'false');
    await expect(nawigacja).toBeHidden();
    await przycisk.click();
    await expect(przycisk).toHaveAttribute('aria-expanded', 'true');
    await expect(nawigacja).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nawigacja).toBeHidden();
    await przycisk.click();
  } else {
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  }

  await nawigacja.getByRole('link', { name: 'Biblioteka', exact: true }).click();
  await expect(page).toHaveURL(/\/biblioteka\/$/);
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await expect(
    page.getByRole('navigation', { name: 'Główna' }).getByRole('link', { name: 'Biblioteka', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('formularz zapisu nie jest pokazywany bez polityki prywatności', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form.zapis')).toHaveCount(0);
  await expect(page.getByText('Lista zainteresowanych jeszcze nie działa.')).toBeVisible();
});

test('dawny adres przewodnika przekierowuje na program kursu', async ({ page }) => {
  await page.goto('/produkt/');
  await expect(page).toHaveURL(/\/program\/$/);
});

test('strona programu nie przyjmuje zamówień', async ({ page }) => {
  await page.goto('/program/');
  await expect(page.getByText('sprzedaż jeszcze nie ruszyła')).toBeVisible();
  await expect(page.getByRole('button', { name: /kup|zamów|zapłać/i })).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/\d+\s?zł/);
});
