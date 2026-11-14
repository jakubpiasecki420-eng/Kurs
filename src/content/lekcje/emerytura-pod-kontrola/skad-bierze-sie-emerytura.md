---
kurs: emerytura-pod-kontrola
modul: system-emerytalny
tytul: 'Skąd bierze się emerytura z ZUS'
opis: 'Jak składki trafiają na konto i subkonto w ZUS, jak działa waloryzacja i jak z zapisanego kapitału powstaje miesięczna kwota emerytury.'
czasMin: 9
demonstracyjna: false
twierdzenia:
  [
    sus-skladka-emerytalna,
    sus-subkonto-skladka,
    sus-konto-zwaloryzowane,
    fus-waloryzacja-roczna,
    fus-waloryzacja-wskaznik,
    fus-podstawa-obliczenia,
    zus-kapital-poczatkowy,
    fus-kapital-poczatkowy-zarobki,
    fus-wzor-emerytury,
    fus-tablice-gus,
    fus-tablice-korzystniejsze,
  ]
materialy:
  - tytul: 'Źródła i metodologia'
    opis: 'Pełny rejestr przepisów, na których opiera się kurs, z datami weryfikacji.'
    adres: '/zrodla/'
quiz:
  pytania:
    - pytanie: 'Od czego zależy wysokość emerytury liczonej według zasad opisanych w lekcji?'
      odpowiedzi:
        - 'Od średniego wynagrodzenia z ostatnich lat pracy przed przejściem na emeryturę.'
        - 'Od przeciętnego wynagrodzenia w kraju ogłoszonego w roku przejścia na emeryturę.'
        - 'Od zapisanego kapitału podzielonego przez średnie dalsze trwanie życia.'
      poprawna: 2
      wyjasnienie: 'Emerytura to podstawa obliczenia — zwaloryzowane składki, kapitał początkowy i środki na subkoncie — podzielona przez średnie dalsze trwanie życia w wieku przejścia na emeryturę.'
    - pytanie: 'Liczby umowne: kapitał wynosi 600 000 zł. W wieku A średnie dalsze trwanie życia to 240 miesięcy, w późniejszym wieku B — 200 miesięcy. Co pokazuje wzór?'
      odpowiedzi:
        - 'W wieku B kwota miesięczna jest wyższa: 3 000 zł wobec 2 500 zł w wieku A.'
        - 'W wieku A kwota jest wyższa, bo kapitał rozkłada się na więcej miesięcy wypłat.'
        - 'Kwota jest w obu przypadkach taka sama, bo kapitał się nie zmienia.'
      poprawna: 0
      wyjasnienie: '600 000 zł ÷ 200 = 3 000 zł, a 600 000 zł ÷ 240 = 2 500 zł. Ten sam kapitał dzielony przez mniejszą liczbę miesięcy daje wyższą kwotę.'
    - pytanie: 'Co ustawa mówi o corocznej waloryzacji składek zapisanych na koncie w ZUS?'
      odpowiedzi:
        - 'Stan konta może spaść, jeśli w danym roku spadły ceny.'
        - 'Stan konta nie może się obniżyć, a wskaźnik nie jest niższy niż wskaźnik cen.'
        - 'Wynik zależy od zysków funduszy inwestycyjnych, w których ZUS lokuje składki emerytalne.'
      poprawna: 1
      wyjasnienie: 'Waloryzacja odbywa się co roku od 1 czerwca. Wskaźnik nie może być niższy niż wskaźnik cen, a w wyniku waloryzacji stan konta nie może się obniżyć.'
---

> **W tej lekcji:** jak działa emerytura z ZUS w systemie, w którym liczy się to, co zapisano na Twoim koncie i subkoncie. Bez tej wiedzy trudno ocenić, czego możesz się spodziewać i co od Ciebie zależy.

## Składka trafia na konto i subkonto

Za każdy miesiąc ubezpieczenia płacona jest składka na ubezpieczenie emerytalne. Wynosi ona {{sus-skladka-emerytalna}} podstawy wymiaru[^sus-skladka-emerytalna]. Podstawa wymiaru to kwota, od której liczy się składki. Przy działalności gospodarczej ustala się ją według zasad opisanych w lekcji 1.3.

Składka nie trafia w całości w jedno miejsce. Część równa {{sus-subkonto-skladka}} podstawy wymiaru jest zapisywana na **subkoncie**, czyli w osobnej ewidencji w ZUS. Jeśli jesteś członkiem otwartego funduszu emerytalnego (OFE), część tej kwoty trafia do OFE[^sus-subkonto-skladka]. Pozostała część składki jest zapisywana na Twoim **koncie** w ZUS w wysokości zwaloryzowanej[^sus-konto-zwaloryzowane].

To rozróżnienie wróci w module 2, bo hipotetyczna emerytura z informacji ZUS liczona jest inaczej niż prawdziwa.

## Waloryzacja: co dzieje się z zapisanymi składkami

Zapisane składki nie leżą bez zmian. Co roku od 1 czerwca ZUS przeprowadza waloryzację, a jej wynik nie może obniżyć stanu konta[^fus-waloryzacja-roczna].

Wskaźnik waloryzacji to wskaźnik wzrostu cen powiększony o realny wzrost sumy składek emerytalnych naliczanych w kraju. Nie może być niższy niż wskaźnik cen[^fus-waloryzacja-wskaznik]. Waloryzacja co najmniej nadąża więc za wzrostem cen mierzonym tym wskaźnikiem — inaczej niż oszczędności inwestowane na rynku, które mogą stracić (moduł 9).

Opisane zasady dotyczą składek na koncie. Zasad dotyczących środków na subkoncie w tej lekcji nie omawiamy.

## Z czego liczy się emeryturę

Podstawę obliczenia emerytury tworzą trzy elementy[^fus-podstawa-obliczenia]:

- **zwaloryzowane składki** zapisane na koncie,
- **zwaloryzowany kapitał początkowy** — jeśli go masz,
- **środki zapisane na subkoncie**.

Kapitał początkowy ustala się osobom urodzonym po 31 grudnia 1948 r., które przed 1 stycznia 1999 r. opłacały składki albo za które opłacał je płatnik[^zus-kapital-poczatkowy]. Jego wysokość zależy m.in. od podstawy wymiaru składek z kolejnych 10 lat kalendarzowych sprzed 1999 r.[^fus-kapital-poczatkowy-zarobki] Jeśli Twoja praca zaczęła się później, nie masz kapitału początkowego i to nie jest błąd.

## Jak z kapitału powstaje kwota miesięczna

Emerytura to podstawa obliczenia podzielona przez średnie dalsze trwanie życia dla osób w wieku przejścia na emeryturę. To średnie jest wyrażone w miesiącach i jest wspólne dla kobiet i mężczyzn[^fus-wzor-emerytury].

Innymi słowy: zgromadzony kapitał zostaje rozłożony na przewidywaną liczbę miesięcznych wypłat.

Średnie dalsze trwanie życia pochodzi z tablic, które Prezes GUS ogłasza co roku do 31 marca w Monitorze Polskim[^fus-tablice-gus].

## Co wynika ze wzoru

Wzór ma trzy proste konsekwencje:

1. **Większy kapitał oznacza wyższą emeryturę.** Jeśli podstawa obliczenia jest dwa razy większa, kwota emerytury też jest dwa razy większa.
2. **Wiek przejścia na emeryturę ma znaczenie.** Im później przechodzisz, tym krótsze jest średnie dalsze trwanie życia, więc ten sam kapitał dzieli się przez mniejszą liczbę miesięcy.
3. **Tablice się zmieniają.** Ten sam kapitał może dać inną kwotę w zależności od roku przejścia na emeryturę. Jeśli jest to korzystniejsze, stosuje się tablice obowiązujące w dniu ukończenia 60 lat przez kobietę albo 65 lat przez mężczyznę[^fus-tablice-korzystniejsze].

Nie liczy się tu ostatnie wynagrodzenie ani średnia z najlepszych lat, tylko suma tego, co zapisano na koncie i subkoncie. Dawne zarobki mają znaczenie pośrednio — przez kapitał początkowy, jeśli go masz.

## Czego ta lekcja nie rozstrzyga

Nie oceniamy, czy system jest korzystny, i nie prognozujemy jego zmian. Pokazujemy zasady wynikające z obecnych przepisów, żeby kolejne lekcje — o Twoim koncie w ZUS i o dodatkowym oszczędzaniu — miały wspólny punkt wyjścia.
