import { defineConfig, devices } from '@playwright/test';

// Osobny port i własny serwer: testy nie kolidują z działającym `astro preview`.
const PORT = 4322;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'off',
    locale: 'pl-PL',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'telefon', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `node scripts/serwer-testowy.mjs ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
