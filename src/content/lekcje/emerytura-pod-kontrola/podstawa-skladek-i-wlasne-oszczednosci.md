---
kurs: emerytura-pod-kontrola
modul: system-emerytalny
tytul: 'Podstawa składek i własne oszczędności'
opis: 'Trzy sposoby ustalania podstawy składek przy działalności, co zmienia wyższa podstawa i jakie są drogi dodatkowego oszczędzania na emeryturę.'
czasMin: 10
demonstracyjna: false
twierdzenia:
  [
    sus-podstawa-pracownik,
    sus-podstawa-jdg,
    sus-preferencyjna,
    sus-maly-zus-plus,
    sus-maly-zus-plus-granice,
    sus-maly-zus-plus-okres,
    sus-maly-zus-plus-ryczalt,
    sus-podstawa-wyzsza,
    sus-limit-roczny,
    sus-skladka-emerytalna,
    sus-podstawa-chorobowe-wypadkowe,
    fus-wzor-emerytury,
    fus-kapital-nie-dziedziczony,
    ike-wyplata-smierc,
    oki-start,
    ike-zwrot-podatek,
  ]
materialy:
  - tytul: 'Przewodnik po IKE'
    opis: 'Limity, warunki wypłaty i koszt wcześniejszego zwrotu.'
    adres: '/ike/'
  - tytul: 'Przewodnik po OKI'
    opis: 'Nowy rodzaj konta od 1 stycznia 2027 r.'
    adres: '/oki/'
quiz:
  pytania:
    - pytanie: 'Prowadzisz działalność na ryczałcie i rozważasz mały ZUS plus. Która informacja jest prawdziwa?'
      odpowiedzi:
        - 'Podstawa zależy od dochodu, a na ryczałcie dochodem jest połowa przychodu.'
        - 'Podstawa jest zawsze równa 60% prognozowanego przeciętnego wynagrodzenia.'
        - 'Można z niego korzystać bez limitu przez cały okres prowadzenia działalności.'
      poprawna: 0
      wyjasnienie: 'Przy małym ZUS plus podstawa zależy od dochodu z poprzedniego roku; u ryczałtowca dochodem jest przychód pomnożony przez 0,5. Można z tego korzystać najwyżej przez 36 miesięcy w każdych 60 miesiącach działalności.'
    - pytanie: 'Jak zmienia się miesięczna składka emerytalna, gdy podstawa wymiaru wzrasta dwukrotnie?'
      odpowiedzi:
        - 'Rośnie dwukrotnie, bo jest stałym procentem podstawy.'
        - 'Rośnie o stałą kwotę, niezależną od wysokości podstawy.'
        - 'Nie zmienia się, bo składka emerytalna jest ryczałtowa.'
      poprawna: 0
      wyjasnienie: 'Składka emerytalna to stały procent podstawy wymiaru, więc rośnie proporcjonalnie do podstawy.'
    - pytanie: 'Czym różnią się kwota na koncie w ZUS i środki na IKE w razie śmierci oszczędzającego?'
      odpowiedzi:
        - 'Obie kwoty wchodzą w całości do spadku na ogólnych zasadach prawa spadkowego.'
        - 'Środki z IKE dostają uprawnieni; kwot z konta w ZUS się nie dziedziczy.'
        - 'Obie kwoty przechodzą na rzecz państwa, jeśli nikt nie złoży wniosku.'
      poprawna: 1
      wyjasnienie: 'Środki z IKE wypłaca się osobie uprawnionej. Kwota stanowiąca podstawę obliczenia emerytury w ZUS nie podlega dziedziczeniu (z wyjątkiem szczególnych zasad dla subkonta).'
---

> **W tej lekcji:** jak przy działalności ustala się podstawę składek i co to oznacza dla Twojej przyszłej emerytury. Do tego trzy drogi dodatkowego oszczędzania — bez wskazywania, która jest dla Ciebie właściwa.

## Trzy sposoby ustalania podstawy

Podstawa wymiaru to kwota, od której liczy się składki. Na etacie jest nią co do zasady przychód ze stosunku pracy[^sus-podstawa-pracownik]. Przy działalności gospodarczej możliwe są trzy sytuacje:

| Sposób | Podstawa składek emerytalnej i rentowych | Najważniejsze warunki |
| --- | --- | --- |
| Zwykły | Zadeklarowana kwota, nie niższa niż {{sus-podstawa-jdg}} prognozowanego przeciętnego wynagrodzenia na dany rok[^sus-podstawa-jdg] | — |
| Preferencyjny | Zadeklarowana kwota, nie niższa niż {{sus-preferencyjna}} minimalnego wynagrodzenia[^sus-preferencyjna] | Pierwsze 24 miesiące działalności; nie dla m.in. osób, które w ciągu 60 miesięcy przed startem prowadziły działalność |
| Mały ZUS plus | Połowa przeciętnego miesięcznego dochodu z poprzedniego roku[^sus-maly-zus-plus], nie mniej niż 30% minimalnego i nie więcej niż 60% prognozowanego przeciętnego wynagrodzenia[^sus-maly-zus-plus-granice] | Przychód w poprzednim roku do {{sus-maly-zus-plus}}; najwyżej 36 miesięcy w każdych 60 miesiącach działalności; nie dla osób, które spełniają warunki preferencyjnej podstawy[^sus-maly-zus-plus-okres] |

Przy ryczałcie od przychodów ewidencjonowanych dochodem do wyliczenia małego ZUS plus jest połowa przychodu[^sus-maly-zus-plus-ryczalt]. Ustawa przewiduje też inne warunki i wyłączenia — przed wyborem sprawdź je w ZUS albo z księgową.

W każdej z tych sytuacji możesz zadeklarować podstawę wyższą niż najniższa. Jeśli podstawą jest kwota deklarowana, zadeklarowania wyższej kwoty nie można skorygować za miesiąc, w którym je złożono[^sus-podstawa-wyzsza]. Roczna podstawa składek emerytalnej i rentowych ma też górną granicę: 30-krotność prognozowanego przeciętnego wynagrodzenia miesięcznego[^sus-limit-roczny].

Jeśli Twój dochód jest wyższy niż podstawa składek, kapitał w ZUS rośnie wolniej, niż rósłby, gdyby podstawą był cały dochód.

## Co zmienia wyższa podstawa

Składka emerytalna to {{sus-skladka-emerytalna}} podstawy wymiaru[^sus-skladka-emerytalna]. Rośnie więc proporcjonalnie do podstawy.

<!-- przyklad:skladka-emerytalna -->

Od tej samej podstawy liczy się też składkę wypadkową oraz chorobową, która dla przedsiębiorcy jest dobrowolna[^sus-podstawa-chorobowe-wypadkowe]. Wyższa podstawa zwiększa więc wszystkie te składki, a nie tylko emerytalną.

Z lekcji 1.1 wiesz, że emerytura to zapisany kapitał podzielony przez średnie dalsze trwanie życia[^fus-wzor-emerytury]. Wyższe składki oznaczają więc wyższą emeryturę — ale tylko w części, która wynika z lat płacenia wyższych składek.

Wyższa podstawa ma też drugą stronę. Zwiększa bieżące koszty prowadzenia działalności. Kwota zapisana w ZUS nie podlega dziedziczeniu, z wyjątkiem szczególnych zasad dla środków z subkonta[^fus-kapital-nie-dziedziczony]. Środki z IKE po śmierci oszczędzającego wypłaca się osobie uprawnionej[^ike-wyplata-smierc].

## Trzy drogi dodatkowego oszczędzania

Jeśli chcesz mieć na emeryturze więcej, niż wynika z obecnych składek, masz trzy podstawowe możliwości:

1. **Wyższa podstawa składek w ZUS** — opisana wyżej.
2. **Dobrowolne konta z preferencjami podatkowymi:** IKE, IKZE oraz OKI, które zaczyna działać 1 stycznia 2027 r.[^oki-start] Każde ma inne zasady wpłat, wypłat i podatków. Przykład: pieniądze z IKE możesz wycofać przed spełnieniem warunków ustawy, ale wtedy od zysku pobierany jest podatek {{ike-zwrot-podatek}}[^ike-zwrot-podatek].
3. **Oszczędzanie poza tymi kontami** — bez preferencji podatkowych, ale też bez ich ograniczeń.

Te drogi się nie wykluczają. Różnią się dostępnością pieniędzy przed emeryturą, podatkami, ryzykiem, zasadami dziedziczenia i tym, jak bardzo zależą od przyszłych zmian przepisów.

## Jak podejść do decyzji

Zamiast pytać, która droga jest najlepsza, odpowiedz sobie na kilka pytań:

- Co się stanie, jeśli pojawi się nieprzewidziany wydatek, zanim zaczniesz odkładać na dziesięciolecia?
- Czy pieniądze odłożone na emeryturę mogą Ci być potrzebne wcześniej?
- Jak ważna jest dla Ciebie preferencja podatkowa w porównaniu z elastycznością?
- Ile możesz odkładać regularnie, także w słabszych miesiącach?

Konta IKE omawiamy w module 4, inflację i koszty w module 9, a składanie planu w module 12.

## Czego ta lekcja nie rozstrzyga

Nie mówimy, który sposób ustalania podstawy wybrać, czy warto podnieść podstawę ani które konto wybrać. To zależy od Twojej sytuacji, w tym od formy opodatkowania. Na pytanie „co mam wybrać” nie odpowiadamy — dajemy wiedzę i narzędzia, żeby ocenić to samodzielnie albo z doradcą.
