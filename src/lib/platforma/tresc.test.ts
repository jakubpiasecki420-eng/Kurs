import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { twierdzenie } from '@/lib/rejestr';
import { renderujTresc } from '@/lib/tresc-markdown';

const kursy = new URL('../../content/kursy/', import.meta.url);
const lekcje = new URL('../../content/lekcje/', import.meta.url);

interface Lekcja {
  plik: string;
  dane: { twierdzenia?: string[]; demonstracyjna: boolean; narzedzie?: string; quiz?: { pytania: unknown[] } };
  tresc: string;
}

function wszystkieLekcje(): Lekcja[] {
  return readdirSync(lekcje).flatMap((katalog) =>
    readdirSync(new URL(`${katalog}/`, lekcje)).map((plik) => {
      const tekst = readFileSync(new URL(`${katalog}/${plik}`, lekcje), 'utf8');
      const m = tekst.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!m) throw new Error(`${katalog}/${plik}: brak nagłówka YAML.`);
      return { plik: `${katalog}/${plik}`, dane: parse(m[1]), tresc: m[2] };
    }),
  );
}

describe('treść platformy', () => {
  const pliki = readdirSync(kursy).filter((p) => p.endsWith('.json'));

  it('zawiera kurs demonstracyjny i kurs docelowy', () => {
    expect(pliki.sort()).toEqual(['emerytura-pod-kontrola.json', 'kurs-demonstracyjny.json']);
  });

  it.each(pliki)('%s: każda lekcja z programu ma plik w katalogu kursu i wskazuje właściwy moduł', (plik) => {
    const id = plik.replace('.json', '');
    const kurs = JSON.parse(readFileSync(new URL(plik, kursy), 'utf8'));
    for (const m of kurs.moduly) {
      for (const l of m.lekcje ?? []) {
        const sciezka = new URL(`${id}/${l}.md`, lekcje);
        expect(existsSync(sciezka), `${id}/${l}.md`).toBe(true);
        const tekst = readFileSync(sciezka, 'utf8');
        expect(tekst).toMatch(new RegExp(`^kurs: ${id}$`, 'm'));
        expect(tekst).toMatch(new RegExp(`^modul: ${m.id}$`, 'm'));
      }
    }
  });

  it('kurs demonstracyjny jest oznaczony jako demonstracyjny, a jego lekcje jako przykładowe', () => {
    const kurs = JSON.parse(readFileSync(new URL('kurs-demonstracyjny.json', kursy), 'utf8'));
    expect(kurs.demonstracyjny).toBe(true);
    for (const plik of readdirSync(new URL('kurs-demonstracyjny/', lekcje))) {
      expect(readFileSync(new URL(`kurs-demonstracyjny/${plik}`, lekcje), 'utf8')).toMatch(/^demonstracyjna: true$/m);
    }
  });

  it('kurs docelowy jest aktywny; lekcje mają tylko moduły, których treść nie czeka na recenzję podatkową', () => {
    const kurs = JSON.parse(readFileSync(new URL('emerytura-pod-kontrola.json', kursy), 'utf8'));
    expect(kurs.stan).toBe('aktywny');
    expect(kurs.demonstracyjny).toBe(false);
    const zLekcjami = kurs.moduly.filter((m: { lekcje?: string[] }) => m.lekcje?.length).map((m: { id: string }) => m.id);
    expect(zLekcjami).toEqual(['system-emerytalny', 'zus', 'ike', 'inflacja', 'twoj-plan']);
  });

  it('lekcje kursu docelowego nie są oznaczone jako przykładowe i mają quiz', () => {
    for (const l of wszystkieLekcje().filter((x) => x.plik.startsWith('emerytura-pod-kontrola/'))) {
      expect(l.dane.demonstracyjna, l.plik).toBe(false);
      expect(l.dane.quiz?.pytania.length, l.plik).toBeGreaterThan(0);
    }
  });

  it('lekcje odwołują się tylko do twierdzeń ze źródeł pierwotnych', () => {
    for (const l of wszystkieLekcje()) {
      (l.dane.twierdzenia ?? []).forEach((id) => expect(twierdzenie(id).status, `${l.plik}: ${id}`).toBe('P'));
    }
  });

  it('każda lekcja renderuje się bez błędów, a każde zadeklarowane twierdzenie ma przypis w treści', () => {
    for (const l of wszystkieLekcje()) {
      const deklarowane = l.dane.twierdzenia ?? [];
      const { html } = renderujTresc(l.tresc, deklarowane, l.plik);
      expect(html, l.plik).not.toMatch(/NaN|undefined/);
      deklarowane.forEach((id, i) => expect(html, `${l.plik}: brak przypisu ${id}`).toContain(`href="#zrodlo-${i + 1}"`));
    }
  });

  it('w treści lekcji nie ma kwot ani stawek wpisanych ręcznie zamiast odwołań do rejestru', () => {
    // Dozwolone wyjątki: liczby z przykładów dydaktycznych i warunki wieku/stażu opisane słownie w treści twierdzeń.
    const kwotaZRejestru = /\b\d{1,3}(?: \d{3})+(?:,\d{2})? zł/;
    for (const l of wszystkieLekcje().filter((x) => x.plik.startsWith('emerytura-pod-kontrola/'))) {
      const bezPrzykladow = l.tresc.replace(/500 zł|100 zł|103 zł|40 000 zł|50 000 zł|10 000 zł/g, '');
      expect(bezPrzykladow, l.plik).not.toMatch(kwotaZRejestru);
      expect(l.tresc, l.plik).not.toMatch(/\d+,\d+%/);
    }
  });

  it('quizy kursu docelowego nie dają się zgadnąć po pozycji ani długości odpowiedzi', () => {
    const pytania = wszystkieLekcje()
      .filter((x) => x.plik.startsWith('emerytura-pod-kontrola/'))
      .flatMap((l) => (l.dane.quiz?.pytania ?? []) as { odpowiedzi: string[]; poprawna: number }[]);
    expect(pytania.length).toBeGreaterThan(20);
    pytania.forEach((p) => expect(p.odpowiedzi.length).toBeGreaterThanOrEqual(3));
    // Każda pozycja poprawnej odpowiedzi (1., 2., 3.) występuje w co najmniej 20% pytań.
    for (const poz of [0, 1, 2]) {
      expect(pytania.filter((p) => p.poprawna === poz).length / pytania.length).toBeGreaterThanOrEqual(0.2);
    }
    // Poprawna odpowiedź jest jedyną najdłuższą w co najwyżej 40% pytań.
    const najdluzsza = pytania.filter((p) => {
      const dl = p.odpowiedzi.map((o) => o.length);
      const maks = Math.max(...dl);
      return dl[p.poprawna] === maks && dl.filter((x) => x === maks).length === 1;
    });
    expect(najdluzsza.length / pytania.length).toBeLessThanOrEqual(0.4);
  });

  it('miejsca wymagające opinii eksperta są oznaczone w treści', () => {
    const oznaczone = wszystkieLekcje().filter((l) => l.tresc.includes('**Do potwierdzenia przez eksperta.**'));
    expect(oznaczone.map((l) => l.plik).sort()).toEqual(
      [
        'emerytura-pod-kontrola/hipotetyczna-emerytura.md',
        'emerytura-pod-kontrola/ike-wyplata-i-zwrot.md',
        'emerytura-pod-kontrola/informacja-o-stanie-konta.md',
        'emerytura-pod-kontrola/przeglad-roczny.md',
        'emerytura-pod-kontrola/wiek-i-najnizsza-emerytura.md',
      ].sort(),
    );
  });
});

