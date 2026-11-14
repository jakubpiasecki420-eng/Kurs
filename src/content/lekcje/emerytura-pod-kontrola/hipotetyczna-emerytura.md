---
kurs: emerytura-pod-kontrola
modul: zus
tytul: 'Jak czytać hipotetyczną emeryturę'
opis: 'Dwie wysokości hipotetycznej emerytury w informacji z ZUS: co zakładają, jak są liczone, czego nie obejmują i dlaczego to kwoty brutto.'
czasMin: 10
demonstracyjna: false
twierdzenia:
  [
    zus-hipotetyczna-emerytura,
    zus-hipotetyczna-5-lat,
    zus-hipotetyczna-warianty,
    zus-hipotetyczna-wzor,
    zus-hipotetyczna-bez-subkonta,
    fus-podstawa-obliczenia,
    zus-informacja-subkonto,
    pit-emerytura-zaliczka,
    zdrowotna-emeryci,
  ]
materialy:
  - tytul: 'Kalkulator regularnego oszczędzania'
    opis: 'Sprawdzisz w nim, co dają własne oszczędności przy różnych założeniach.'
    adres: '/platforma/narzedzia/oszczedzanie/'
quiz:
  pytania:
    - pytanie: 'Masz 37 lat. Ile wysokości hipotetycznej emerytury znajdziesz w informacji o stanie konta?'
      odpowiedzi:
        - 'Żadnej — ZUS podaje ją dopiero osobom w wieku od 40 lat.'
        - 'Dwie: według obecnego stanu konta i z dalszymi składkami.'
        - 'Jedną, liczoną na podstawie Twojego ostatniego wynagrodzenia.'
      poprawna: 1
      wyjasnienie: 'Hipotetyczną emeryturę podaje się osobom, które na koniec poprzedniego roku miały co najmniej 35 lat — w dwóch wariantach.'
    - pytanie: 'Które środki pomija hipotetyczna emerytura, choć wlicza się je do prawdziwej emerytury?'
      odpowiedzi:
        - 'Zwaloryzowany kapitał początkowy.'
        - 'Składki zapisane na koncie w ZUS.'
        - 'Środki zapisane na subkoncie.'
      poprawna: 2
      wyjasnienie: 'Hipotetyczną emeryturę liczy się ze składek na koncie i kapitału początkowego. Środki z subkonta wchodzą do podstawy prawdziwej emerytury, ale nie do hipotetycznej.'
    - pytanie: 'Jak porównać hipotetyczną emeryturę z miesięcznymi wydatkami?'
      odpowiedzi:
        - 'Pamiętając, że to kwota brutto — do ręki trafi mniej.'
        - 'Wprost, bo od emerytury nie pobiera się podatku.'
        - 'Doliczając do niej 9%, bo tyle wynosi składka zdrowotna.'
      poprawna: 0
      wyjasnienie: 'Od emerytury pobiera się zaliczkę na podatek, a emeryt płaci składkę zdrowotną. Hipotetyczna emerytura jest kwotą przed tymi potrąceniami.'
---

> **W tej lekcji:** dwie kwoty, które ZUS nazywa hipotetyczną emeryturą. Pokazujemy, co zakłada każda z nich, czego nie obejmują i dlaczego nie można ich wprost porównywać z wydatkami.

## Kto ją dostaje

ZUS podaje hipotetyczną emeryturę osobom, które na koniec poprzedniego roku miały ukończone 35 lat. Liczy ją dla wieku 60 lat w przypadku kobiety i 65 lat w przypadku mężczyzny[^zus-hipotetyczna-emerytura]. Jeśli do tego wieku brakuje Ci nie więcej niż 5 lat, dostaniesz też wyliczenia dla wieku wyższego o rok, dwa, trzy, cztery i pięć lat[^zus-hipotetyczna-5-lat].

## Dwa warianty

Znajdziesz dwie kwoty[^zus-hipotetyczna-warianty]:

| Wariant | Co zakłada |
| --- | --- |
| Według stanu konta | Liczy się tylko to, co już jest na koncie — tak, jakby od dziś nie były opłacane żadne składki |
| Z dalszymi składkami | Do wieku emerytalnego za każdy miesiąc wpływa składka równa Twojej średniej miesięcznej składce z dotychczasowego okresu |

Dla przedsiębiorcy drugi wariant ma ważną cechę. Jeśli przez większość dotychczasowej pracy składki były liczone od najniższej dopuszczalnej podstawy, wariant zakłada, że podobnie będzie do końca.

## Jak ZUS to liczy

Suma składek i kapitału początkowego — w drugim wariancie powiększona o przyszłe hipotetyczne składki — zostaje podzielona przez średnie dalsze trwanie życia w wieku przejścia na emeryturę[^zus-hipotetyczna-wzor].

To ten sam mechanizm co w lekcji 1.1: kapitał rozłożony na przewidywaną liczbę wypłat. Z jedną ważną różnicą — opisaną niżej.

## Czego hipotetyczna emerytura nie obejmuje

**Środków z subkonta.** Do hipotetycznej emerytury wlicza się składki zapisane na koncie i kapitał początkowy. Ustawa odsyła tu do składek, które nie obejmują części zapisywanej na subkoncie i odprowadzanej do OFE[^zus-hipotetyczna-bez-subkonta]. Do podstawy prawdziwej emerytury środki z subkonta się wlicza[^fus-podstawa-obliczenia]. Pod tym względem hipotetyczna emerytura jest więc niższa od emerytury policzonej z pełnej podstawy. Stan subkonta znajdziesz w tej samej informacji o stanie konta[^zus-informacja-subkonto].

> **Do potwierdzenia przez eksperta.** Opisujemy brzmienie przepisów. Nie sprawdziliśmy, jak ZUS przedstawia to w samym dokumencie, i nie podajemy metody doliczenia subkonta do hipotetycznej emerytury.

**Potrąceń.** Hipotetyczna emerytura to kwota brutto. Od wypłacanej emerytury pobierana jest zaliczka na podatek dochodowy[^pit-emerytura-zaliczka]. Emeryt podlega też ubezpieczeniu zdrowotnemu, a składka wynosi {{zdrowotna-emeryci}} podstawy wymiaru[^zdrowotna-emeryci]. Do ręki trafi więc mniej. Ile mniej — zależy od przepisów podatkowych w latach wypłaty, dlatego w kursie tego nie liczymy.

**Innych oszczędności.** IKE, IKZE, OKI i oszczędności poza nimi trzeba doliczyć samodzielnie.

## Czego te liczby nie mówią

- **Nie są gwarancją.** Przepisy, tablice dalszego trwania życia i Twoja droga zawodowa mogą się zmienić.
- **Nie zakładają wzrostu Twoich składek.** Jeśli zaczniesz płacić składki od wyższej podstawy, wynik będzie inny.

## Zrób to teraz

1. Zapisz obie wysokości hipotetycznej emerytury z najnowszej informacji.
2. Zapisz stan subkonta.
3. Zapisz obok swoje obecne miesięczne wydatki.
4. Porównaj liczby, pamiętając o dwóch zastrzeżeniach: hipotetyczna emerytura pomija subkonto (czyli pod tym względem zaniża emeryturę) i jest kwotą brutto (czyli zawyża to, co trafi do ręki). Różnicę między wydatkami a hipotetyczną emeryturą zapisz jako liczbę orientacyjną. Wrócisz do niej w module 12.

Jeśli nie masz jeszcze 35 lat, informacja nie zawiera hipotetycznej emerytury. Zapisz wtedy łączną kwotę składek i stan subkonta i wróć do tego kroku, gdy ją otrzymasz.

## Czego ta lekcja nie rozstrzyga

Nie oceniamy, czy Twoja emerytura wystarczy. To zależy od Twoich wydatków, planów i innych oszczędności. Nie przeliczamy kwot brutto na netto i nie prognozujemy przyszłych zmian w systemie emerytalnym.
