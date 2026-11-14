import { expect, test, type Page } from '@playwright/test';

const KURS = '/platforma/kurs/kurs-demonstracyjny/';
const EPK = '/platforma/kurs/emerytura-pod-kontrola/';
const R = {
  rezerwa: `${EPK}fundamenty/rezerwa-finansowa/`,
  pierwsza: `${EPK}system-emerytalny/skad-bierze-sie-emerytura/`,
  ike: `${EPK}ike/ike-wyplata-i-zwrot/`,
  inflacja: `${EPK}inflacja/inflacja-wartosc-realna/`,
  koszty: `${EPK}inflacja/regularne-oszczedzanie-i-koszty/`,
};
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

test('pulpit na starcie: informacja o trybie demonstracyjnym, pierwsza lekcja kursu i statusy', async ({ page }) => {
  await otworz(page, '/platforma/');
  await expect(page.getByLabel('Tryb demonstracyjny')).toContainText('Konta użytkowników jeszcze nie działają');
  const kontynuuj = page.locator('[data-kontynuuj]');
  await expect(kontynuuj).toContainText('Zacznij naukę');
  await expect(kontynuuj).toContainText('1.1 Rezerwa finansowa przy nieregularnych dochodach');
  await expect(status(page, 'fundamenty')).toHaveText('Dostępny');
  await expect(page.locator('[data-liczba="moduly-wszystkie"]')).toHaveText('8');
  await expect(page.getByText('Nie masz jeszcze żadnej aktywności.')).toBeVisible();
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '0');
  await expect(page.getByRole('region', { name: 'Kurs demonstracyjny' }).getByRole('link', { name: 'Przejdź do kursu' })).toHaveAttribute('href', KURS);
});

test('ukończenie lekcji aktualizuje postęp, kontynuację i historię — także po przeładowaniu', async ({ page }) => {
  await otworz(page, R.rezerwa);
  await expect(page.locator('[data-tekst-znacznika]')).toHaveText('Nieukończona');
  await page.getByRole('button', { name: 'Oznacz jako ukończoną' }).click();
  await expect(page.locator('[data-tekst-znacznika]')).toHaveText('Ukończona');
  await expect(page.locator('.lista-lekcji [data-lekcja="rezerwa-finansowa"]')).toHaveAttribute('data-ukonczona', 'true');

  await otworz(page, '/platforma/');
  const kontynuuj = page.locator('[data-kontynuuj]');
  await expect(kontynuuj).toContainText('Kontynuuj naukę');
  await expect(kontynuuj).toContainText('1.2 Pieniądze firmy i pieniądze domowe');
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '5');
  await expect(status(page, 'fundamenty')).toHaveText('Rozpoczęty');
  await expect(page.locator('[data-aktywnosci]')).toContainText('Ukończono lekcję');

  await page.reload();
  await expect(page.locator('[data-kontynuuj]')).toContainText('1.2 Pieniądze firmy i pieniądze domowe');
});

test('postęp kursu demonstracyjnego jest liczony osobno', async ({ page }) => {
  await ukoncz(page, L.pierwsza);
  await otworz(page, KURS);
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '17');
  await otworz(page, '/platforma/');
  await expect(page.locator('[data-postep-kursu] [role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '0');
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
  await otworz(page, R.pierwsza);
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(quiz.getByRole('alert')).toHaveText('Odpowiedz na wszystkie pytania.');

  await quiz.getByLabel(/Od zapisanego kapitału podzielonego/).check();
  await quiz.getByLabel(/W wieku A kwota jest wyższa/).check();
  await quiz.getByLabel(/Stan konta nie może się obniżyć/).check();
  await quiz.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(quiz.locator('[data-quiz-wynik]')).toHaveText('Wynik: 2 z 3.');
  await expect(quiz.locator('[data-pytanie="1"]')).toHaveAttribute('data-wynik', 'zle');
  await expect(quiz.locator('[data-quiz-poprzedni]')).toHaveText('Ostatni wynik: 2/3.');

  await quiz.getByRole('button', { name: 'Rozwiąż ponownie' }).click();
  await expect(quiz.locator('[data-quiz-wynik]')).toBeHidden();
  await expect(quiz.getByLabel(/W wieku A kwota jest wyższa/)).not.toBeChecked();

  await otworz(page, '/platforma/postep/');
  await expect(page.locator('[data-quizy]')).toContainText('2/3');
  await expect(page.locator('[data-liczba="quizy-rozwiazane"]')).toHaveText('1');
});

test('quiz w kursie demonstracyjnym działa tak samo', async ({ page }) => {
  await otworz(page, L.pierwsza);
  const quiz = page.locator('[data-quiz]');
  await quiz.getByLabel('Z modułów, które dzielą się na lekcje').check();
  await quiz.getByLabel('Na koncie użytkownika na serwerze').check();
  await quiz.getByLabel('Symulacją dla założeń, które wpisujesz').check();
  await quiz.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(quiz.locator('[data-quiz-wynik]')).toHaveText('Wynik: 2 z 3.');
});

test('lekcja kursu: oznaczenie wersji roboczej, przykłady z rejestru i przypisy prowadzące do źródeł', async ({ page }) => {
  await otworz(page, R.ike);
  await expect(page.getByText('Przed recenzją eksperta')).toBeVisible();
  await expect(page.getByText('Treść przykładowa')).toHaveCount(0);
  const przyklad = page.getByRole('region', { name: 'Przykład: zwrot całkowity z IKE' });
  await expect(przyklad).toContainText('Podatek 19% od dochodu');
  await expect(przyklad).toContainText('1 900 zł');
  const czesciowy = page.getByRole('region', { name: 'Przykład: częściowy zwrot z IKE' });
  await expect(czesciowy).toContainText('2 000 zł');
  await expect(czesciowy).toContainText('380 zł');
  await expect(page.getByText('Do potwierdzenia przez eksperta.')).toBeVisible();
  const przypis = page.locator('.proza a.odn').first();
  await expect(przypis).toHaveAttribute('href', '#zrodlo-1');
  await przypis.click();
  await expect(page.locator('#zrodlo-1')).toBeInViewport();
  await expect(page.locator('.zrodla li')).toHaveCount(10);
});

test('lekcja z wykresem i kalkulatorem: każdy ma własne identyfikatory', async ({ page }) => {
  await otworz(page, R.koszty);
  await expect(page.locator('.przyklad-wykres svg')).toHaveAttribute('aria-labelledby', 'przyklad-wykres-tytul przyklad-wykres-opis');
  const ids = await page.locator('[id]').evaluateAll((els) => els.map((e) => e.id));
  expect(ids.length).toBe(new Set(ids).size);
  await page.getByLabel('Wpłata miesięczna').fill('1000');
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText('240 000 zł');
});

test('kalkulator inflacji w lekcji przelicza wynik i zgłasza błędne dane', async ({ page }) => {
  await otworz(page, R.inflacja);
  const k = page.locator('[data-kalkulator-prosty="inflacja"]');
  await expect(k).toHaveAttribute('data-gotowy', 'true');
  await k.getByLabel('Kwota w dzisiejszych pieniądzach').fill('1000');
  await k.getByLabel('Roczna inflacja').fill('2,5');
  await k.getByLabel('Za ile lat').fill('20');
  await expect(k.locator('[data-kafel-wartosc]').first()).toHaveText('1 639 zł');
  await k.getByLabel('Za ile lat').fill('2');
  await expect(k.locator('[data-kafel-etykieta]').first()).toHaveText('Tyle będzie kosztować za 2 lata');
  await k.getByLabel('Za ile lat').fill('80');
  await expect(k.getByText('Za ile lat: podaj wartość od 1 do 50 lat.')).toBeVisible();
  await expect(k.getByLabel('Za ile lat')).toHaveAttribute('aria-invalid', 'true');
  await expect(k.locator('[data-wyniki]')).toHaveAttribute('data-nieaktualne', '');
});

test('centrum narzędzi: dostępne kalkulatory z opisem, planowane narzędzia bez linków', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/');
  await expect(page.locator('.narzedzie-karta')).toHaveCount(7);
  await expect(page.getByRole('link', { name: 'Kalkulator ulgi IKZE' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Kalkulator regularnego oszczędzania' }).click();
  await expect(page).toHaveURL('/platforma/narzedzia/oszczedzanie/');
  await page.getByLabel('Okres oszczędzania').fill('10');
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText('60 000 zł');
  await page.getByLabel('Wpłata miesięczna').fill('1.000');
  await expect(page.locator('[data-wynik="sumaWplat"]')).toHaveText('120 000 zł');
  const opis = page.getByRole('region', { name: /O narzędziu/ });
  await expect(opis).toContainText('Założenia');
  await expect(opis).toContainText('Źródła danych');
  await expect(opis).toContainText('nie jest prognozą');
});

test('kalkulator procentu składanego: przelicza, rysuje wykres i wraca do wartości początkowych', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/');
  await page.getByRole('link', { name: 'Kalkulator procentu składanego' }).click();
  await expect(page).toHaveURL('/platforma/narzedzia/procent-skladany/');
  const k = page.locator('[data-kalkulator-prosty="procent-skladany"]');
  await expect(k).toHaveAttribute('data-gotowy', 'true');
  await expect(k.getByLabel('Roczna stopa zwrotu')).toHaveValue('2,5');
  await k.getByLabel('Roczna stopa zwrotu').fill('5');
  await k.getByLabel('Okres').fill('10');
  await expect(k.locator('[data-kafel-wartosc]').first()).toHaveText('16 289 zł');
  await expect(k.locator('[data-kafel-etykieta]').first()).toHaveText('Wartość po 10 latach');
  await expect(k.locator('[data-tabela] tr')).toHaveCount(10);
  await expect(k.locator('[data-wykres] svg path')).toHaveCount(2);
  await k.getByLabel('Roczna stopa zwrotu').fill('0');
  await expect(k.locator('[data-kafel-wartosc]').nth(3)).toHaveText('0 zł');
  await k.getByLabel('Roczna stopa zwrotu').fill('−2');
  await expect(k.locator('[data-kafel-etykieta]').nth(1)).toHaveText('Strata łącznie');
  await k.getByLabel('Roczna stopa zwrotu').fill('5');
  await k.getByLabel('Kwota początkowa').fill('10.000');
  await expect(k.locator('[data-kafel-wartosc]').first()).toHaveText('16 289 zł');
  await k.getByLabel('Kwota początkowa').fill('1.000,50');
  await expect(k.getByLabel('Kwota początkowa')).toHaveAttribute('aria-invalid', 'false');
  await expect(k.locator('[data-kafel-wartosc]').first()).toHaveText('1 630 zł');
  await k.getByRole('button', { name: 'Przywróć wartości początkowe' }).click();
  await expect(k.getByLabel('Okres')).toHaveValue('20');
  await expect(k.getByLabel('Kwota początkowa')).toBeFocused();
});

test('kalkulatory działają bez JavaScriptu: pierwszy wynik jest w HTML', async ({ browser }) => {
  const kontekst = await browser.newContext({ javaScriptEnabled: false });
  const page = await kontekst.newPage();
  await page.goto('/platforma/narzedzia/inflacja/');
  await expect(page.locator('[data-kafel-wartosc]').first()).toHaveText('1 639 zł');
  await expect(page.locator('[data-wykres] svg')).toBeVisible();
  await kontekst.close();
});

test('ustawienia: nazwa wyświetlana, eksport i usunięcie postępu', async ({ page }) => {
  await otworz(page, '/platforma/ustawienia/');
  await page.getByLabel('Nazwa wyświetlana na pulpicie').fill('  Anna  ');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await expect(page.locator('[data-inicjal]')).toHaveText('A');

  await ukoncz(page, R.pierwsza);
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

test('program kursu: moduły z lekcjami i moduły w przygotowaniu', async ({ page }) => {
  await otworz(page, EPK);
  await expect(page.locator('.modul')).toHaveCount(13);
  await expect(page.locator('[data-informacja-o-kursie]')).toContainText('Lekcje ma 8 z 13 modułów');
  await expect(page.locator('[data-informacja-o-kursie]')).toContainText('wersją roboczą przed recenzją eksperta');
  await expect(page.getByText('8 modułów z lekcjami · 20 lekcji')).toBeVisible();
  await expect(page.locator('.lista-lekcji a')).toHaveCount(20);
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

test('kalkulator procentu składanego: przy dużej stracie żadna wartość nie jest ujemna', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/procent-skladany/');
  const k = page.locator('[data-kalkulator-prosty="procent-skladany"]');
  await expect(k).toHaveAttribute('data-gotowy', 'true');
  await k.getByLabel('Kwota początkowa').fill('1');
  await k.getByLabel('Roczna stopa zwrotu').fill('−20');
  await k.getByLabel('Okres').fill('50');
  await expect(k.locator('[data-kafel-wartosc]').nth(2)).toHaveText('0 zł');
  await expect(k.locator('[data-tabela]')).not.toContainText('-');
});

test('kalkulator inflacji pokazuje inflację skumulowaną obok rocznej', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/inflacja/');
  const k = page.locator('[data-kalkulator-prosty="inflacja"]');
  await expect(k).toHaveAttribute('data-gotowy', 'true');
  await expect(k.locator('[data-kafel-etykieta]').nth(3)).toHaveText('Łączny wzrost cen przez 20 lat (inflacja skumulowana)');
  await expect(k.locator('[data-kafel-wartosc]').nth(3)).toHaveText('63,9%');
  await k.getByLabel('Za ile lat').fill('3');
  await expect(k.locator('[data-kafel-etykieta]').nth(3)).toHaveText('Łączny wzrost cen przez 3 lata (inflacja skumulowana)');
});

test('lekcja o inflacji pokazuje stopę realną liczoną dokładnym wzorem', async ({ page }) => {
  await otworz(page, `${EPK}inflacja/inflacja-wartosc-realna/`);
  const t = page.getByRole('region', { name: 'Stopa nominalna, inflacja i stopa realna' });
  await expect(t).toContainText('2,44%');
  // Podpis z założeniami jest pod tabelą, w tym samym elemencie figure.
  await expect(page.locator('figure.przyklad', { has: t }).locator('figcaption')).toContainText('nie prognoza');
});

test('kalkulator rezerwy: cel, brakująca kwota, czas dojścia i błędne dane', async ({ page }) => {
  await otworz(page, '/platforma/narzedzia/rezerwa/');
  const k = page.locator('[data-kalkulator-rezerwy]');
  await expect(k).toHaveAttribute('data-gotowy', 'true');
  await expect(k.locator('[data-wynik="cel"]')).toHaveText('36 000 zł');
  await expect(k.locator('[data-wynik="brakuje"]')).toHaveText('26 000 zł');
  await expect(k.locator('[data-wynik="czas"]')).toHaveText('26 miesięcy');
  await k.getByLabel('Już odłożone').fill('40.000');
  await expect(k.locator('[data-wynik="brakuje"]')).toHaveText('0 zł');
  await expect(k.locator('[data-wynik="czas"]')).toHaveText('cel osiągnięty');
  await k.getByLabel('Już odłożone').fill('0');
  await k.getByLabel('Odkładane co miesiąc').fill('0');
  await expect(k.locator('[data-wynik="czas"]')).toHaveText('nie da się policzyć bez odkładania');
  await k.getByLabel('Na ile miesięcy').fill('2,5');
  await expect(k.getByLabel('Na ile miesięcy')).toHaveAttribute('aria-invalid', 'true');
  await expect(k.locator('[data-wyniki]')).toHaveAttribute('data-nieaktualne', '');
});

test('katalog kursów, cele modułu i podsumowanie lekcji', async ({ page }) => {
  await otworz(page, '/platforma/kursy/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kursy');
  const linki = page.locator('.karta-kursu h2 a');
  await expect(linki.first()).toHaveText('Emerytura pod kontrolą');
  await expect(linki.last()).toHaveText('Kurs demonstracyjny');
  await linki.first().click();
  await expect(page).toHaveURL(EPK);

  await otworz(page, `${EPK}fundamenty/`);
  await expect(page.getByRole('heading', { name: 'Po tym module' })).toBeVisible();
  await expect(page.locator('.cele-modulu li').first()).toBeVisible();

  await otworz(page, R.rezerwa);
  const podsumowanie = page.getByRole('region', { name: 'Podsumowanie' });
  await expect(podsumowanie.locator('li')).toHaveCount(3);
  await expect(page.locator('[data-kalkulator-rezerwy]')).toBeVisible();
});
