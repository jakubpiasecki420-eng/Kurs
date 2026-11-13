import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adres serwisu podajemy przez zmienną środowiskową, bo domena nie jest jeszcze wybrana.
const adres = process.env.SITE_URL || undefined;

export default defineConfig({
  site: adres,
  integrations: adres ? [sitemap()] : [],
  build: { format: 'directory' },
  // Bez kompresji HTML: kompresor usuwał spacje przed pogrubieniami i linkami w tekście ciągłym.
  compressHTML: false,
  // Dawna strona przewodnika PDF; produktem jest teraz kurs na platformie.
  redirects: { '/produkt': '/program/' },
  server: { host: true },
});
