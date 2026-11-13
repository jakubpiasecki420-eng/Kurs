import { expect, test, type Page } from '@playwright/test';

const KURS = '/platforma/kurs/kurs-demonstracyjny/';
const L = {
  pierwsza: `${KURS}poznaj-platforme/jak-zbudowana-jest-lekcja/`,
  trzecia: `${KURS}poznaj-platforme/narzedzia-w-lekcjach/`,
  a: `${KURS}modul-przykladowy/lekcja-przykladowa-a/`,
  b: `${KURS}modul-przykladowy/lekcja-przykladowa-b/`,
  c: `${KURS}modul-z-warunkiem/lekcja-przykladowa-c/`,
};

async function otworz(page: Page, adres: string) {
  await page.goto(adres);
  await expect(page.locator('html')).toHaveAttribute('data-strefa-gotowa', 'true');
}

async function ukoncz(page: Page, adres: string) {
  await otworz(page, adres);
  await page.getByRole('button', { name: 'Oznacz jako ukończoną' }).click();
  await expect(page.getByRole('button', { name: 'Cofnij ukończenie' })).toBeVisible();
}

const status = (page: Page, modul: string) => page.locator(`[data-status-modulu="${modul}"]`).first();

test('pulpit na starcie: informacja o trybie demonstracyjnym, pierwsza lekcja i statusy', async ({ page }) => {
  await otworz(page, '/platforma/');
  await expect(page.getByLabel('Tryb demonstracyjny')).toContainText('Konta użytkowników jeszcze nie działają');
  const kontynuuj = page.locator('[data-kontynuuj]');
  await expect(kontynuuj).toContainText('Zacznij naukę');
  await expect(kontynuuj).toContainText('1.1 Jak zbudowana jest lekcja');
  await expect(status(page, 'poznaj-platforme')).toHaveText('Dostępny');
  await expect(status(page, 'modul-z-warunkiem')).toHaveText('Niedostępny');
  await expect(page.getByText('Nie masz jeszcze żadnej aktywności.')).toBeVisible();
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '0');
});

test('ukończenie lekcji aktualizuje postęp, kontynuację i historię — także po przeładowaniu', async ({ page }) => {
  await otworz(page, L.pierwsza);
  await expect(page.locator('[data-tekst-znacznika]')).toHaveText('Nieukończona');
  await page.getByRole('button', { name: 'Oznacz jako ukończoną' }).click();
  await expect(page.locator('[data-tekst-znacznika]')).toHaveText('Ukończona');
  await expect(page.locator('.lista-lekcji [data-lekcja="jak-zbudowana-jest-lekcja"]')).toHaveAttribute('data-ukonczona', 'true');

  await otworz(page, '/platforma/');
  const kontynuuj = page.locator('[data-kontynuuj]');
  await expect(kontynuuj).toContainText('Kontynuuj naukę');
  await expect(kontynuuj).toContainText('1.2 Jak działa postęp');
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '17');
  await expect(status(page, 'poznaj-platforme')).toHaveText('Rozpoczęty');
  await expect(page.locator('[data-aktywnosci]')).toContainText('Ukończono lekcję');

  await page.reload();
  await expect(page.locator('[data-kontynuuj]')).toContainText('1.2 Jak działa postęp');
});

test('cofnięcie ukończenia przywraca stan lekcji', async ({ page }) => {
  await ukoncz(page, L.pierwsza);
  await page.getByRole('button', { name: 'Cofnij ukończenie' }).click();
  await expect(page.locator('[data-tekst-znacznika]')).toHaveText('Nieukończona');
  await expect(page.getByRole('button', { name: 'Oznacz jako ukończoną' })).toBeVisible();
});

test('moduł z warunkiem odblokowuje się po ukończeniu wymaganego modułu', async ({ page }) => {
  await otworz(page, L.c);
  await expect(page.locator('[data-blokada]')).toBeVisible();

  await ukoncz(page, L.a);
  await ukoncz(page, L.b);

  await otworz(page, KURS);
  await expect(status(page, 'modul-przykladowy')).toHaveText('Ukończony');
  await expect(status(page, 'modul-z-warunkiem')).toHaveText('Dostępny');
  await otworz(page, L.c);
  await expect(page.locator('[data-blokada]')).toBeHidden();
});

test('nawigacja między lekcjami przechodzi przez granice modułów', async ({ page }) => {
  await otworz(page, L.trzecia);
  await page.getByRole('link', { name: /Następna lekcja/ }).click();
  await expect(page).toHaveURL(L.a);
  await expect(page.locator('h1')).toHaveText('Lekcja przykładowa A');
  await page.getByRole('link', { name: /Poprzednia lekcja/ }).click();
  await expect(page).toHaveURL(L.trzecia);
});

test('ostatnia lekcja kursu prowadzi z powrotem do programu', async ({ page }) => {
  await otworz(page, L.c);
  await page.getByRole('link', { name: /Wróć do programu/ }).click();
  await expect(page).toHaveURL(KURS);
});

test('lekcja ma spis sekcji, ilustrację, narzędzie, quiz i materiały', async ({ page }) => {
  await otworz(page, L.pierwsza);
  await expect(page.getByRole('navigation', { name: 'W tej lekcji' }).getByRole('link')).toHaveCount(5);
  await expect(page.getByRole('img', { name: /grafika w przygotowaniu/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Ćwiczenie: kalkulator/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sprawdź się' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Materiały dodatkowe' })).toBeVisible();
  await expect(page.getByText('Treść przykładowa')).toBeVisible();
});

test('kalkulator osadzony w lekcji przelicza wynik', async ({ page }) => {
  await otworz(page, L.pierwsza);
  await page.getByLabel('Wpłata miesięczna').fill('1000');
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText('240 000 zł');
});

test('quiz wymaga odpowiedzi, ocenia je i zapisuje wynik w postępie', async ({ page }) => {
  await otworz(page, L.pierwsza);
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(quiz.getByRole('alert')).toHaveText('Odpowiedz na wszystkie pytania.');

  await quiz.getByLabel('Z modułów, które dzielą się na lekcje').check();
  await quiz.getByLabel('Na koncie użytkownika na serwerze').check();
  await quiz.getByLabel('Symulacją dla założeń, które wpisujesz').check();
  await quiz.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(quiz.locator('[data-quiz-wynik]')).toHaveText('Wynik: 2 z 3.');
  await expect(quiz.locator('[data-pytanie="1"]')).toHaveAttribute('data-wynik', 'zle');
  await expect(quiz.locator('[data-quiz-poprzedni]')).toHaveText('Ostatni wynik: 2/3.');

  await quiz.getByRole('button', { name: 'Rozwiąż ponownie' }).click();
  await expect(quiz.locator('[data-quiz-wynik]')).toBeHidden();
  await expect(quiz.getByLabel('Na koncie użytkownika na serwerze')).not.toBeChecked();

  await otworz(page, '/platforma/postep/');
  await expect(page.locator('[data-quizy]')).toContainText('2/3');
  await expect(page.locator('[data-liczba="quizy-rozwiazane"]')).toHaveText('1');
});

test('centrum narzędzi: dostępny kalkulator z opisem, planowane narzędzia bez linków', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/');
  await expect(page.locator('.narzedzie-karta')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Kalkulator ulgi IKZE' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Kalkulator regularnego oszczędzania' }).click();
  await expect(page).toHaveURL('/platforma/narzedzia/oszczedzanie/');
  await page.getByLabel('Okres oszczędzania').fill('10');
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText('60 000 zł');
  const opis = page.getByRole('region', { name: /O narzędziu/ });
  await expect(opis).toContainText('Założenia');
  await expect(opis).toContainText('Źródła danych');
  await expect(opis).toContainText('nie jest prognozą');
});

test('ustawienia: nazwa wyświetlana, eksport i usunięcie postępu', async ({ page }) => {
  await otworz(page, '/platforma/ustawienia/');
  await page.getByLabel('Nazwa wyświetlana na pulpicie').fill('  Anna  ');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.locator('[data-inicjal]')).toHaveText('A');

  await ukoncz(page, L.pierwsza);
  await otworz(page, '/platforma/');
  await expect(page.locator('h1')).toHaveText('Witaj, Anna');

  await otworz(page, '/platforma/ustawienia/');
  const pobieranie = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Pobierz dane (JSON)' }).click();
  const plik = await pobieranie;
  expect(plik.suggestedFilename()).toMatch(/^finansowa-przyszlosc-postep-\d{4}-\d{2}-\d{2}\.json$/);

  await page.getByRole('button', { name: 'Usuń zapisany postęp' }).click();
  await page.getByRole('button', { name: 'Anuluj' }).click();
  await page.getByRole('button', { name: 'Usuń zapisany postęp' }).click();
  await page.getByRole('button', { name: 'Tak, usuń' }).click();
  await expect(page.getByLabel('Nazwa wyświetlana na pulpicie')).toHaveValue('');

  await otworz(page, '/platforma/');
  await expect(page.locator('h1')).toHaveText('Witaj w strefie kursanta');
  await expect(page.locator('[data-kontynuuj]')).toContainText('Zacznij naukę');
});

test('uszkodzone dane w przeglądarce nie psują strefy kursanta', async ({ page }) => {
  await page.goto('/platforma/');
  await page.evaluate(() => localStorage.setItem('finansowa-przyszlosc:postep:v1', '{zepsute'));
  await otworz(page, '/platforma/');
  await expect(page.locator('[data-kontynuuj]')).toContainText('Zacznij naukę');
});

test('kurs w przygotowaniu pokazuje program bez lekcji', async ({ page }) => {
  await otworz(page, '/platforma/kurs/emerytura-pod-kontrola/');
  await expect(page.getByRole('heading', { name: 'Ten kurs jest w przygotowaniu' })).toBeVisible();
  await expect(page.locator('.modul')).toHaveCount(12);
  await expect(page.locator('.modul a')).toHaveCount(0);
});

test('menu strefy kursanta oznacza bieżący widok i działa na telefonie', async ({ page, isMobile }) => {
  await otworz(page, '/platforma/');
  const menu = page.getByRole('navigation', { name: 'Strefa kursanta' });
  await expect(menu.getByRole('link', { name: 'Pulpit' })).toHaveAttribute('aria-current', 'page');
  await menu.getByRole('link', { name: 'Postęp' }).click();
  await expect(page).toHaveURL('/platforma/postep/');
  await expect(page.getByRole('navigation', { name: 'Strefa kursanta' }).getByRole('link', { name: 'Postęp' })).toHaveAttribute('aria-current', 'page');
  if (isMobile) {
    const ramka = await page.getByRole('navigation', { name: 'Strefa kursanta' }).boundingBox();
    const wysokosc = page.viewportSize()!.height;
    expect(ramka!.y + ramka!.height).toBeGreaterThan(wysokosc - 2);
  }
});
