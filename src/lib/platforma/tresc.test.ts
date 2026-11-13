import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { twierdzenie } from '@/lib/rejestr';

const kursy = new URL('../../content/kursy/', import.meta.url);
const lekcje = new URL('../../content/lekcje/', import.meta.url);

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

  it('kurs w przygotowaniu nie ma jeszcze lekcji', () => {
    const kurs = JSON.parse(readFileSync(new URL('emerytura-pod-kontrola.json', kursy), 'utf8'));
    expect(kurs.stan).toBe('w-przygotowaniu');
    expect(kurs.moduly.every((m: { lekcje?: string[] }) => !m.lekcje || m.lekcje.length === 0)).toBe(true);
  });

  it('lekcje odwołują się tylko do twierdzeń ze źródeł pierwotnych', () => {
    for (const katalog of readdirSync(lekcje)) {
      for (const plik of readdirSync(new URL(`${katalog}/`, lekcje))) {
        const linia = readFileSync(new URL(`${katalog}/${plik}`, lekcje), 'utf8').match(/^twierdzenia: \[(.*)\]$/m);
        const ids = linia ? linia[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
        ids.forEach((id) => expect(twierdzenie(id).status, id).toBe('P'));
      }
    }
  });
});
