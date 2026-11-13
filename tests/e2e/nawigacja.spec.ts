import { expect, test } from '@playwright/test';

test('link „Przejdź do treści” jest pierwszym elementem fokusu', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const pomin = page.getByRole('link', { name: 'Przejdź do treści' });
  await expect(pomin).toBeFocused();
  await pomin.press('Enter');
  await expect(page.locator('main#tresc')).toBeFocused();
});

test('przyciski w sekcji głównej prowadzą do treści i kalkulatora', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sprawdź kalkulator' }).click();
  await expect(page).toHaveURL(/\/kalkulator\/$/);
  await expect(page.locator('h1')).toContainText('Kalkulator');
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

  await nawigacja.getByRole('link', { name: 'IKZE', exact: true }).click();
  await expect(page).toHaveURL(/\/ikze\/$/);
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await expect(
    page.getByRole('navigation', { name: 'Główna' }).getByRole('link', { name: 'IKZE', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('formularz zapisu nie jest pokazywany bez polityki prywatności', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form.zapis')).toHaveCount(0);
  await expect(page.getByText('Lista zainteresowanych jeszcze nie działa.')).toBeVisible();
});

test('strona produktu nie przyjmuje zamówień', async ({ page }) => {
  await page.goto('/produkt/');
  await expect(page.getByText('sprzedaż jeszcze nie ruszyła')).toBeVisible();
  await expect(page.getByRole('button', { name: /kup|zamów|zapłać/i })).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/\d+\s?zł/);
});
