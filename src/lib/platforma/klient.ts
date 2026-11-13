/**
 * Warstwa strefy kursanta uruchamiana w przeglądarce.
 *
 * Strony są statyczne. Ten moduł wczytuje postęp z magazynu i uzupełnia nim elementy
 * oznaczone atrybutami `data-*`. Bez JavaScriptu strony pokazują stan początkowy.
 * Wszystkie teksty trafiają do DOM przez textContent.
 */
import type { KursKlienta } from './kurs';
import { utworzMagazyn, type MagazynPostepu } from './magazyn';
import { ETYKIETY_STATUSU } from './etykiety';
import { nastepnaLekcja, podsumowanie, postepKursu, statusModulu, type Aktywnosc, type StanPostepu } from './postep';

export { ETYKIETY_STATUSU };

const ETYKIETY_AKTYWNOSCI: Record<Aktywnosc['rodzaj'], string> = {
  'otwarcie-lekcji': 'Otwarto lekcję',
  'ukonczenie-lekcji': 'Ukończono lekcję',
  'ukonczenie-modulu': 'Ukończono moduł',
  quiz: 'Rozwiązano quiz',
};

export const ZDARZENIE_ZMIANY = 'postep:zmiana';

export interface Sesja {
  magazyn: MagazynPostepu;
  stan(): StanPostepu;
  /** Zmienia stan i zapisuje go. Zwraca false, jeśli zapis się nie udał. */
  zmien(zmiana: (s: StanPostepu) => StanPostepu): Promise<boolean>;
}

let sesja: Promise<Sesja> | null = null;

export function pobierzSesje(): Promise<Sesja> {
  sesja ??= (async () => {
    const magazyn = utworzMagazyn();
    let stan = await magazyn.wczytaj();
    return {
      magazyn,
      stan: () => stan,
      async zmien(zmiana) {
        const nowy = zmiana(stan);
        try {
          await magazyn.zapisz(nowy);
        } catch {
          pokazKomunikat('Nie udało się zapisać postępu. Sprawdź, czy przeglądarka pozwala zapisywać dane witryny.', true);
          return false;
        }
        stan = nowy;
        document.dispatchEvent(new CustomEvent(ZDARZENIE_ZMIANY));
        return true;
      },
    };
  })();
  return sesja;
}

/** Struktury kursów osadzone w stronie przez układ strefy kursanta. */
export function kursyNaStronie(): KursKlienta[] {
  return [...document.querySelectorAll<HTMLScriptElement>('script[data-kurs-klienta]')].map(
    (s) => JSON.parse(s.textContent ?? '{}') as KursKlienta,
  );
}

export function kursNaStronie(id: string): KursKlienta {
  const k = kursyNaStronie().find((x) => x.id === id);
  if (!k) throw new Error(`Strona nie zawiera struktury kursu „${id}”.`);
  return k;
}

let czasKomunikatu: ReturnType<typeof setTimeout> | undefined;

export function pokazKomunikat(tekst: string, blad = false) {
  const el = document.querySelector<HTMLElement>('[data-komunikat]');
  if (!el) return;
  el.textContent = tekst;
  el.dataset.blad = String(blad);
  el.hidden = false;
  clearTimeout(czasKomunikatu);
  czasKomunikatu = setTimeout(() => (el.hidden = true), blad ? 8000 : 4000);
}

const formatDaty = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function data(iso: string): string {
  return formatDaty.format(new Date(iso));
}

function ustawPasek(el: Element, procent: number) {
  const tor = el.querySelector<HTMLElement>('[role="progressbar"]');
  const wypelnienie = el.querySelector<HTMLElement>('.pasek__wypelnienie');
  const tekst = el.querySelector<HTMLElement>('[data-postep-tekst]');
  tor?.setAttribute('aria-valuenow', String(procent));
  if (wypelnienie) wypelnienie.style.width = `${procent}%`;
  if (tekst) tekst.textContent = `${procent}%`;
}

function adresLekcji(kursy: KursKlienta[], a: Aktywnosc): string | null {
  const kurs = kursy.find((k) => k.id === a.kurs);
  const modul = kurs?.moduly.find((m) => m.id === a.modul);
  if (!modul) return null;
  if (!a.lekcja) return modul.adres;
  return modul.lekcje.find((l) => l.id === a.lekcja)?.adres ?? null;
}

function odswiezAktywnosci(stan: StanPostepu, kursy: KursKlienta[]) {
  document.querySelectorAll<HTMLElement>('[data-aktywnosci]').forEach((lista) => {
    const limit = Number(lista.dataset.limit ?? 30);
    const wpisy = stan.aktywnosci.slice(0, limit);
    const pusto = lista.parentElement?.querySelector<HTMLElement>('[data-aktywnosci-pusto]');
    if (pusto) pusto.hidden = wpisy.length > 0;
    lista.hidden = wpisy.length === 0;
    lista.replaceChildren(
      ...wpisy.map((a) => {
        const li = document.createElement('li');
        li.className = 'aktywnosc';
        li.dataset.rodzaj = a.rodzaj;
        const rodzaj = document.createElement('span');
        rodzaj.className = 'aktywnosc__rodzaj';
        rodzaj.textContent = ETYKIETY_AKTYWNOSCI[a.rodzaj];
        const adres = adresLekcji(kursy, a);
        const opis = document.createElement(adres ? 'a' : 'span');
        opis.className = 'aktywnosc__opis';
        opis.textContent = a.opis;
        if (adres) (opis as HTMLAnchorElement).href = adres;
        const czas = document.createElement('time');
        czas.className = 'aktywnosc__czas';
        czas.dateTime = a.data;
        czas.textContent = data(a.data);
        li.append(rodzaj, opis, czas);
        return li;
      }),
    );
  });
}

/** Uzupełnia wszystkie elementy strony zależne od postępu. */
export function odswiezWidok(stan: StanPostepu, kursy: KursKlienta[]) {
  for (const kurs of kursy) {
    const p = postepKursu(stan, kurs.id);
    const sum = podsumowanie(stan, kurs);

    document.querySelectorAll<HTMLElement>(`[data-status-modulu][data-kurs="${kurs.id}"]`).forEach((el) => {
      const status = statusModulu(stan, kurs, el.dataset.statusModulu!);
      el.dataset.stan = status;
      const tekst = el.querySelector('.status__tekst');
      if (tekst) tekst.textContent = ETYKIETY_STATUSU[status];
    });

    document.querySelectorAll<HTMLElement>(`[data-lekcja][data-kurs="${kurs.id}"]`).forEach((el) => {
      const ukonczona = Boolean(p.ukonczoneLekcje[el.dataset.lekcja!]);
      el.dataset.ukonczona = String(ukonczona);
      const tekst = el.querySelector('[data-tekst-ukonczenia]');
      if (tekst) tekst.textContent = ukonczona ? ' (ukończona)' : '';
    });

    document.querySelectorAll(`[data-postep-kursu="${kurs.id}"]`).forEach((el) => ustawPasek(el, sum.procent));

    document.querySelectorAll<HTMLElement>(`[data-postep-modulu][data-kurs="${kurs.id}"]`).forEach((el) => {
      const modul = kurs.moduly.find((m) => m.id === el.dataset.postepModulu);
      if (!modul || modul.lekcje.length === 0) return;
      const ile = modul.lekcje.filter((l) => p.ukonczoneLekcje[l.id]).length;
      ustawPasek(el, Math.round((ile / modul.lekcje.length) * 100));
    });

    const liczby: Record<string, number> = {
      'lekcje-ukonczone': sum.ukonczoneLekcje,
      'lekcje-wszystkie': sum.wszystkieLekcje,
      'moduly-ukonczone': sum.ukonczoneModuly,
      'moduly-wszystkie': sum.wszystkieModuly,
      'quizy-rozwiazane': Object.keys(p.wynikiQuizow).length,
    };
    document.querySelectorAll<HTMLElement>(`[data-liczba][data-kurs="${kurs.id}"]`).forEach((el) => {
      el.textContent = String(liczby[el.dataset.liczba!] ?? 0);
    });

    document.querySelectorAll<HTMLElement>(`[data-kontynuuj="${kurs.id}"]`).forEach((el) => {
      const cel = nastepnaLekcja(stan, kurs);
      const link = el.querySelector<HTMLAnchorElement>('[data-kontynuuj-link]');
      const tytul = el.querySelector<HTMLElement>('[data-kontynuuj-tytul]');
      const modul = el.querySelector<HTMLElement>('[data-kontynuuj-modul]');
      const etykieta = el.querySelector<HTMLElement>('[data-kontynuuj-etykieta]');
      el.dataset.koniec = String(cel === null);
      if (!cel) {
        if (tytul) tytul.textContent = 'Kurs ukończony';
        if (modul) modul.textContent = 'Możesz wrócić do dowolnej lekcji z programu kursu.';
        if (link) {
          link.href = link.dataset.adresKursu ?? link.href;
          link.textContent = 'Zobacz program kursu';
        }
        return;
      }
      const rozpoczety = Object.keys(p.ukonczoneLekcje).length > 0 || p.biezaca !== null;
      if (etykieta) etykieta.textContent = rozpoczety ? 'Kontynuuj naukę' : 'Zacznij naukę';
      if (tytul) tytul.textContent = `${cel.lekcja.numer} ${cel.lekcja.tytul}`;
      if (modul) modul.textContent = `Moduł: ${cel.modul.tytul}`;
      if (link) {
        link.href = cel.lekcja.adres;
        link.textContent = rozpoczety ? 'Kontynuuj' : 'Zacznij';
      }
    });
  }

  odswiezAktywnosci(stan, kursy);

  document.querySelectorAll<HTMLElement>('[data-nazwa]').forEach((el) => {
    el.textContent = stan.profil.nazwa ?? el.dataset.domyslnie ?? '';
  });
  document.querySelectorAll<HTMLElement>('[data-inicjal]').forEach((el) => {
    el.textContent = (stan.profil.nazwa?.[0] ?? el.dataset.domyslnie ?? '').toUpperCase();
  });
  document.querySelectorAll<HTMLElement>('[data-ostatnia-aktywnosc]').forEach((el) => {
    el.textContent = stan.ostatniaAktywnosc ? data(stan.ostatniaAktywnosc) : (el.dataset.domyslnie ?? '');
  });
}

let strefa: Promise<Sesja> | null = null;

/** Wspólny start każdej strony strefy kursanta. Kolejne wywołania zwracają tę samą sesję. */
export function uruchomStrefe(): Promise<Sesja> {
  strefa ??= startStrefy();
  return strefa;
}

async function startStrefy(): Promise<Sesja> {
  const s = await pobierzSesje();
  const kursy = kursyNaStronie();
  document.querySelectorAll<HTMLElement>('[data-magazyn-opis]').forEach((el) => (el.textContent = s.magazyn.opis));
  document.querySelectorAll<HTMLElement>('[data-magazyn-nietrwaly]').forEach((el) => (el.hidden = s.magazyn.trwaly));
  odswiezWidok(s.stan(), kursy);
  document.addEventListener(ZDARZENIE_ZMIANY, () => odswiezWidok(s.stan(), kursy));
  document.documentElement.dataset.strefaGotowa = 'true';
  return s;
}
