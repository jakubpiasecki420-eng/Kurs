/**
 * Magazyn postępu — jedyne miejsce, które wie, gdzie stan jest przechowywany.
 *
 * Teraz: pamięć przeglądarki (tryb demonstracyjny, jedno urządzenie, brak konta).
 * Później: implementacja tego samego interfejsu wywołująca API serwera
 * (zob. docs/architektura-platformy.md, sekcja „Integracja backendu”).
 */
import { pustyStan, walidujStan, type StanPostepu } from './postep';

export interface MagazynPostepu {
  /** Czy dane przetrwają przeładowanie strony. */
  readonly trwaly: boolean;
  /** Krótki opis dla kursanta, gdzie trafiają dane. */
  readonly opis: string;
  wczytaj(): Promise<StanPostepu>;
  zapisz(stan: StanPostepu): Promise<void>;
  wyczysc(): Promise<void>;
}

export const KLUCZ_POSTEPU = 'finansowa-przyszlosc:postep:v1';

/** Minimalny wycinek interfejsu Storage — ułatwia testy. */
export interface Przechowalnia {
  getItem(klucz: string): string | null;
  setItem(klucz: string, wartosc: string): void;
  removeItem(klucz: string): void;
}

export class MagazynLokalny implements MagazynPostepu {
  readonly trwaly = true;
  readonly opis = 'Postęp zapisuje się tylko w tej przeglądarce na tym urządzeniu.';

  constructor(
    private readonly przechowalnia: Przechowalnia,
    private readonly klucz = KLUCZ_POSTEPU,
  ) {}

  async wczytaj(): Promise<StanPostepu> {
    const surowe = this.przechowalnia.getItem(this.klucz);
    if (!surowe) return pustyStan();
    try {
      return walidujStan(JSON.parse(surowe));
    } catch {
      return pustyStan();
    }
  }

  async zapisz(stan: StanPostepu): Promise<void> {
    this.przechowalnia.setItem(this.klucz, JSON.stringify(stan));
  }

  async wyczysc(): Promise<void> {
    this.przechowalnia.removeItem(this.klucz);
  }
}

export class MagazynPamieci implements MagazynPostepu {
  readonly trwaly = false;
  readonly opis = 'Pamięć przeglądarki jest niedostępna. Postęp zniknie po zamknięciu strony.';
  private stan: StanPostepu = pustyStan();

  async wczytaj(): Promise<StanPostepu> {
    return structuredClone(this.stan);
  }

  async zapisz(stan: StanPostepu): Promise<void> {
    this.stan = structuredClone(stan);
  }

  async wyczysc(): Promise<void> {
    this.stan = pustyStan();
  }
}

/** Wybiera magazyn dostępny w bieżącym środowisku. Tryb prywatny lub zablokowane dane witryny → pamięć. */
export function utworzMagazyn(): MagazynPostepu {
  try {
    const s = globalThis.localStorage;
    const test = `${KLUCZ_POSTEPU}:test`;
    s.setItem(test, '1');
    s.removeItem(test);
    return new MagazynLokalny(s);
  } catch {
    return new MagazynPamieci();
  }
}
