import { describe, expect, it } from 'vitest';
import { KLUCZ_POSTEPU, MagazynLokalny, MagazynPamieci, utworzMagazyn, type Przechowalnia } from './magazyn';
import { pustyStan, ustawNazwe } from './postep';

class Pamiec implements Przechowalnia {
  dane = new Map<string, string>();
  getItem = (k: string) => this.dane.get(k) ?? null;
  setItem = (k: string, v: string) => void this.dane.set(k, v);
  removeItem = (k: string) => void this.dane.delete(k);
}

describe('MagazynLokalny', () => {
  it('zapisuje i wczytuje stan', async () => {
    const p = new Pamiec();
    const m = new MagazynLokalny(p);
    await m.zapisz(ustawNazwe(pustyStan(), 'Ola'));
    expect(p.dane.has(KLUCZ_POSTEPU)).toBe(true);
    expect((await new MagazynLokalny(p).wczytaj()).profil.nazwa).toBe('Ola');
  });

  it('przy uszkodzonych danych zwraca pusty stan', async () => {
    const p = new Pamiec();
    p.setItem(KLUCZ_POSTEPU, '{to nie jest json');
    expect(await new MagazynLokalny(p).wczytaj()).toEqual(pustyStan());
  });

  it('czyści dane', async () => {
    const p = new Pamiec();
    const m = new MagazynLokalny(p);
    await m.zapisz(pustyStan());
    await m.wyczysc();
    expect(p.dane.size).toBe(0);
  });
});

describe('MagazynPamieci', () => {
  it('nie współdzieli obiektu z wywołującym', async () => {
    const m = new MagazynPamieci();
    const s = pustyStan();
    await m.zapisz(s);
    s.profil.nazwa = 'zmiana';
    expect((await m.wczytaj()).profil.nazwa).toBeNull();
    expect(m.trwaly).toBe(false);
  });
});

describe('utworzMagazyn', () => {
  it('bez dostępu do localStorage wybiera pamięć', () => {
    expect(utworzMagazyn()).toBeInstanceOf(MagazynPamieci);
  });
});
