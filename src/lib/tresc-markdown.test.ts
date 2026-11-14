import { describe, expect, it } from 'vitest';
import { podstaw, renderujTresc, slug } from './tresc-markdown';
import { DYREKTYWY, dyrektywa, wartoscP } from './przyklady';

describe('podstaw', () => {
  it('wstawia wartości z rejestru w polskim zapisie', () => {
    expect(podstaw('Limit {{ike-limit-2027}}.', ['ike-limit-2027']).replace(/ /g, ' ')).toBe('Limit 30 099 zł.');
    expect(podstaw('Stawka {{ikze-wyplata-podatek}}', ['ikze-wyplata-podatek'])).toBe('Stawka 10%');
  });

  it('numeruje przypisy według kolejności deklaracji, jak lista źródeł na stronie', () => {
    const t = podstaw('A[^ike-wiek-wplat] B[^ike-limit-2027]', ['ike-limit-2027', 'ike-wiek-wplat']);
    expect(t).toContain('href="#zrodlo-2"');
    expect(t.indexOf('zrodlo-2')).toBeLessThan(t.indexOf('zrodlo-1'));
  });

  it('wymaga deklaracji i statusu P', () => {
    expect(() => podstaw('{{ike-limit-2027}}', [])).toThrow(/nie jest zadeklarowane/);
    expect(() => podstaw('[^rynek-ppk]', ['rynek-ppk'])).toThrow(/status W/);
    expect(() => podstaw('[^z-ikze-wzgledem-ike]', ['z-ikze-wzgledem-ike'])).toThrow(/status Z/);
  });

  it('zastępuje dyrektywę stojącą w osobnej linii', () => {
    expect(podstaw('Tekst\n\n<!-- tabela:inflacja -->\n\nDalej', [])).toContain('<table>');
    expect(() => podstaw('<!-- tabela:nie-ma -->', [])).toThrow(/Nieznana dyrektywa/);
  });
});

describe('renderujTresc', () => {
  it('nadaje nagłówkom identyfikatory i zwraca spis', () => {
    const { html, naglowki } = renderujTresc('## Ile możesz wpłacić\n\nTekst\n\n## Ile możesz wpłacić', []);
    expect(naglowki.map((n) => n.slug)).toEqual(['ile-mozesz-wplacic', 'ile-mozesz-wplacic-1']);
    expect(html).toContain('<h2 id="ile-mozesz-wplacic">');
  });

  it('nie zostawia nieprzetworzonych znaczników', () => {
    const { html } = renderujTresc('Limit {{ike-limit-2027}}[^ike-limit-2027]', ['ike-limit-2027']);
    expect(html).not.toMatch(/\{\{|\[\^/);
    expect(html).toContain('class="odn"');
  });
});

describe('slug', () => {
  it('zamienia polskie znaki', () => {
    expect(slug('Wcześniejszy zwrot — ile kosztuje?')).toBe('wczesniejszy-zwrot-ile-kosztuje');
  });
});

describe('przykłady obliczeniowe', () => {
  it.each(Object.keys(DYREKTYWY))('%s daje poprawny HTML bez błędnych liczb', (nazwa) => {
    const html = dyrektywa(nazwa);
    expect(html).not.toMatch(/NaN|undefined|Infinity/);
    expect(html).toMatch(/<table|<svg/);
    expect(html).toMatch(/nie prognoza|podatku by nie było|Przykład obliczeniowy/);
  });

  it('tabela stopy realnej pokazuje różnicę między przybliżeniem a wzorem dokładnym', () => {
    const html = dyrektywa('tabela:stopa-realna').replace(/[\u00a0\u202f]/g, ' ');
    expect(html).toContain('2,5%');
    expect(html).toContain('2,44%');
    expect(html).toContain('−2,44%');
    expect(html).toContain('nie prognoza');
  });

  it('przykład częściowego zwrotu z IKE liczy dochód proporcjonalnie', () => {
    const html = dyrektywa('przyklad:czesciowy-zwrot-ike').replace(/[\u00a0\u202f]/g, ' ');
    expect(html).toContain('8 000 zł');
    expect(html).toContain('2 000 zł');
    expect(html).toContain('380 zł');
  });

  it('tabela składki emerytalnej pokazuje grosze, więc kwoty roczne zgadzają się z miesięcznymi', () => {
    const html = dyrektywa('przyklad:skladka-emerytalna').replace(/[\u00a0\u202f]/g, ' ');
    expect(html).toContain('390,40 zł');
    expect(html).toContain('4 684,80 zł');
  });

  it('przykład zwrotu z IKE liczy podatek ze stawki z rejestru', () => {
    expect(dyrektywa('przyklad:zwrot-ike').replace(/ /g, ' ')).toContain('1 900 zł');
    expect(wartoscP('ike-zwrot-podatek')).toBe(0.19);
  });

  // Wartości oczekiwane policzone niezależnie od kodu przykładów.
  const bezSpacji = (n: string) => dyrektywa(n).replace(/[  ]/g, ' ');

  it('przykład zmienności: ta sama średnia, niższy wynik przy większych wahaniach', () => {
    const html = bezSpacji('tabela:zmiennosc');
    // 10 000 × 1,05^10; 10 000 × (1,2 × 0,9)^5; 10 000 × (1,35 × 0,75)^5
    for (const t of ['16 289 zł', '14 693 zł', '10 641 zł', '3,92%', '0,62%']) expect(html).toContain(t);
  });

  it('przykład dywersyfikacji: połączenie X i Y ma łagodniejszy najgorszy rok', () => {
    const html = bezSpacji('tabela:dywersyfikacja');
    // X: 1,15 × 0,9 × 1,1; Y: 0,95 × 1,12 × 1,03; połowa: 1,05 × 1,01 × 1,065
    for (const t of ['11 385 zł', '10 959 zł', '11 294 zł', '−10%', '−5%', '6,5%']) expect(html).toContain(t);
  });

  it('przykład opłat: opłata od wpłat i opłaty roczne w tych samych założeniach', () => {
    const html = bezSpacji('tabela:oplaty');
    for (const t of ['202 902 zł', '198 844 zł', '191 557 zł', '180 940 zł']) expect(html).toContain(t);
  });

  it('przykład długu: różnica między odsetkami a zyskiem w pierwszym roku', () => {
    const html = bezSpacji('tabela:dlug-a-oszczednosci');
    for (const t of ['1 200 zł', '500 zł', '700 zł']) expect(html).toContain(t);
  });

  it('odmawia wartości spoza źródeł pierwotnych', () => {
    expect(() => wartoscP('rynek-ppk')).toThrow();
  });
});

describe('tabele w treści', () => {
  it('tabela z Markdownu trafia do przewijanego regionu, a tabela z dyrektywy nie jest owijana drugi raz', () => {
    const { html } = renderujTresc('| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<!-- przyklad:zwrot-ike -->\n', ['ike-zwrot-podatek']);
    expect(html.match(/class="tabela-przewijana"/g)).toHaveLength(2);
    expect(html).toContain('role="region" aria-label="Tabela. Jeśli nie mieści się na ekranie');
    expect(html).not.toMatch(/tabela-przewijana[^>]*>\s*<div class="tabela-przewijana/);
  });
});
