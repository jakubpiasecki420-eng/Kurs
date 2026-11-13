import { describe, expect, it } from 'vitest';
import { data, lata, procent, zl, zlPelne } from './format';

const nbsp = ' ';

describe('zl', () => {
  it('grupuje tysiące także w liczbach czterocyfrowych', () => {
    expect(zl(5779)).toBe(`5${nbsp}779${nbsp}zł`);
    expect(zl(28260)).toBe(`28${nbsp}260${nbsp}zł`);
  });
  it('pokazuje grosze tylko dla kwot niepełnych', () => {
    expect(zl(12039.6)).toBe(`12${nbsp}039,60${nbsp}zł`);
    expect(zl(30099)).toBe(`30${nbsp}099${nbsp}zł`);
  });
});

describe('zlPelne', () => {
  it('zaokrągla do pełnych złotych', () => {
    expect(zlPelne(1264.62)).toBe(`1${nbsp}265${nbsp}zł`);
  });
  it('nie wyświetla ujemnego zera', () => {
    expect(zlPelne(-0.4)).toBe(`0${nbsp}zł`);
    expect(zlPelne(-1.6)).toBe(`-2${nbsp}zł`);
  });
});

describe('procent', () => {
  it('używa przecinka dziesiętnego', () => {
    expect(procent(0.085)).toBe('8,5%');
    expect(procent(0.19)).toBe('19%');
    expect(procent(0.0085)).toBe('0,85%');
  });
});

describe('data', () => {
  it('zapisuje datę słownie', () => {
    expect(data('2026-11-13')).toBe(`13 listopada 2026${nbsp}r.`);
    expect(data('2027-01-01')).toBe(`1 stycznia 2027${nbsp}r.`);
  });
});

describe('lata', () => {
  it('odmienia rzeczownik po liczebniku', () => {
    expect(lata(1)).toBe('1 rok');
    expect(lata(2)).toBe('2 lata');
    expect(lata(5)).toBe('5 lat');
    expect(lata(12)).toBe('12 lat');
    expect(lata(22)).toBe('22 lata');
    expect(lata(30)).toBe('30 lat');
  });
});
