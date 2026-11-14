---
kurs: emerytura-pod-kontrola
modul: system-emerytalny
tytul: 'Wiek emerytalny i najniższa emerytura'
opis: 'Od kiedy przysługuje emerytura, kiedy ZUS podwyższa ją do najniższej kwoty, kiedy podwyższenia nie ma i jak niska podstawa składek wpływa na staż.'
czasMin: 10
demonstracyjna: false
twierdzenia:
  [
    fus-wiek-emerytalny,
    fus-najnizsza-warunki,
    fus-okresy-definicje,
    fus-nieskladkowe-limit,
    fus-najnizsza-przychod,
    fus-najnizsza-proporcja,
    sus-preferencyjna,
    sus-maly-zus-plus-granice,
    pp-ulga-na-start,
  ]
quiz:
  pytania:
    - pytanie: 'Kobieta w wieku 60 lat ma 18 lat okresów składkowych i 4 lata okresów nieskładkowych. Czy spełnia warunek stażu do najniższej emerytury?'
      odpowiedzi:
        - 'Nie — do stażu liczą się wyłącznie okresy, w których płacono składki.'
        - 'Tak — 4 lata nieskładkowe mieszczą się w limicie jednej trzeciej.'
        - 'Nie — kobieta potrzebuje co najmniej 25 lat okresów składkowych.'
      poprawna: 1
      wyjasnienie: 'Limit okresów nieskładkowych to jedna trzecia z 18 lat, czyli 6 lat. Liczą się więc wszystkie 4 lata: razem 22 lata, a kobieta potrzebuje 20.'
    - pytanie: 'Przez 12 miesięcy składki liczono od podstawy równej 30% minimalnego wynagrodzenia. Ile miesięcy stażu do najniższej emerytury dają te okresy?'
      odpowiedzi:
        - 'Pełne 12 miesięcy.'
        - 'Około 3,6 miesiąca.'
        - 'Ani jednego miesiąca.'
      poprawna: 1
      wyjasnienie: 'Takie miesiące liczą się w proporcji podstawy do minimalnego wynagrodzenia: 12 × 0,3 = 3,6 miesiąca.'
    - pytanie: 'Co może odebrać prawo do podwyższenia do najniższej emerytury mimo spełnienia warunków wieku i stażu?'
      odpowiedzi:
        - 'Posiadanie oszczędności na IKE lub IKZE.'
        - 'Złożenie wniosku po ukończeniu 65 lat.'
        - 'Przychód z działalności wyższy od podwyższenia.'
      poprawna: 2
      wyjasnienie: 'Podwyższenie nie przysługuje, jeśli emeryt osiąga przychód z działalności podlegającej obowiązkowi ubezpieczenia społecznego wyższy od kwoty podwyższenia.'
---

> **W tej lekcji:** od kiedy przysługuje emerytura z ZUS i czym jest gwarancja najniższej emerytury. Dla osób prowadzących działalność ważne są dwie rzeczy: jak niska podstawa składek wpływa na staż i kiedy podwyższenia nie ma mimo spełnienia warunków.

## Wiek emerytalny

Emerytura z ZUS przysługuje po osiągnięciu wieku emerytalnego, który wynosi co najmniej 60 lat dla kobiet i 65 lat dla mężczyzn. Ustawa przewiduje od tej zasady wyjątki[^fus-wiek-emerytalny]. Dotyczą one określonych grup i w tym kursie się nimi nie zajmujemy.

Wiek emerytalny to moment, od którego możesz otrzymywać świadczenie. Z poprzedniej lekcji wiesz, że jego wysokość zależy od kapitału i od wieku, w którym faktycznie przechodzisz na emeryturę.

## Najniższa emerytura: warunki

Jeśli emerytura obliczona ze wzoru jest niższa od najniższej emerytury, ZUS podwyższa ją do tej kwoty. Potrzebny jest wiek i staż[^fus-najnizsza-warunki]:

| Kto | Wiek | Okresy składkowe i nieskładkowe |
| --- | --- | --- |
| Kobieta | ukończone 60 lat | co najmniej 20 lat |
| Mężczyzna | ukończone 65 lat | co najmniej 25 lat |

**Okresy składkowe** to przede wszystkim okresy ubezpieczenia, na przykład pracy na etacie. **Okresy nieskładkowe** to m.in. okresy pobierania zasiłku chorobowego lub opiekuńczego[^fus-okresy-definicje]. Okresy nieskładkowe liczą się najwyżej do jednej trzeciej okresów składkowych[^fus-nieskladkowe-limit].

Bez wymaganego stażu podwyższenia nie ma — wypłacana jest kwota obliczona ze wzoru, nawet jeśli jest niższa od najniższej emerytury.

Kwota najniższej emerytury zmienia się co roku. Nie podajemy jej tutaj — aktualną sprawdzisz na stronach ZUS.

### Kiedy podwyższenia nie ma mimo stażu

Podwyższenie nie przysługuje emerytowi, który osiąga przychód z działalności podlegającej obowiązkowi ubezpieczenia społecznego, jeśli ten przychód jest wyższy od kwoty podwyższenia[^fus-najnizsza-przychod]. Ma to znaczenie dla osób, które chcą prowadzić działalność także po przejściu na emeryturę.

> **Do potwierdzenia przez eksperta.** Jak ten przepis stosuje się do osoby, która po przejściu na emeryturę nadal prowadzi działalność gospodarczą, i jak liczy się wtedy przychód — opisujemy brzmienie ustawy, nie konkretne przypadki.

## Niska podstawa składek a staż

Miesiące, w których składki na ubezpieczenia emerytalne i rentowe liczono od podstawy niższej niż minimalne wynagrodzenie, wlicza się do stażu w części odpowiadającej proporcji tej podstawy do minimalnego wynagrodzenia[^fus-najnizsza-proporcja]. Przykład: miesiąc ze składkami od podstawy równej 30% minimalnego wynagrodzenia liczy się jako 0,3 miesiąca.

Uwaga na dwie różne kwoty: **minimalne wynagrodzenie** (płaca minimalna) i **prognozowane przeciętne wynagrodzenie**, czyli przewidywana średnia płaca, od której zależy m.in. najniższa podstawa składek przedsiębiorcy. W tej części lekcji liczy się porównanie z minimalnym wynagrodzeniem.

Przy działalności gospodarczej podstawa niższa od minimalnego wynagrodzenia może wystąpić w dwóch sytuacjach:

- **Preferencyjna podstawa** — przez pierwsze 24 miesiące działalności podstawą może być kwota nie niższa niż {{sus-preferencyjna}} minimalnego wynagrodzenia[^sus-preferencyjna]. Ustawa wyłącza z tego m.in. osoby, które w ciągu 60 miesięcy przed startem prowadziły działalność.
- **Mały ZUS plus** — podstawa zależy od dochodu i może wynosić od 30% minimalnego wynagrodzenia do 60% prognozowanego przeciętnego wynagrodzenia[^sus-maly-zus-plus-granice]. Jeśli Twoja podstawa jest niższa od minimalnego wynagrodzenia, te miesiące też liczą się do stażu tylko w części.

Jest też trzecia sytuacja. **Ulga na start** pozwala przez 6 miesięcy od podjęcia działalności nie podlegać obowiązkowym ubezpieczeniom społecznym. Dotyczy osób, które zakładają działalność po raz pierwszy albo ponownie po co najmniej 60 miesiącach i nie wykonują jej na rzecz byłego pracodawcy; można z niej zrezygnować[^pp-ulga-na-start]. W tym czasie nie są płacone składki emerytalne, więc nic nie trafia na konto w ZUS.

> **Do potwierdzenia przez eksperta.** Czy miesiące ulgi na start, gdy przedsiębiorca nie podlega ubezpieczeniom, liczą się do stażu potrzebnego do najniższej emerytury. Z definicji okresów składkowych wynika, że nie są okresem ubezpieczenia z tytułu działalności, ale tej interpretacji nie potwierdził jeszcze specjalista.

To nie jest ocena, czy korzystanie z niższej podstawy albo z ulgi jest dobrym pomysłem. Chodzi o to, żeby było jasne, że te decyzje wpływają na staż i kapitał, a nie tylko na bieżące koszty.

## Zapisz u siebie

- Ile masz lat i ile zostało Ci do wieku emerytalnego.
- Przybliżoną liczbę lat, w których opłacane były za Ciebie składki — z pracy na etacie i z działalności.
- Okresy, w których Twoje składki liczono od podstawy niższej niż minimalne wynagrodzenie, i okresy ulgi na start, jeśli takie były.

Te notatki przydadzą się, jeśli będziesz chcieć sprawdzić w ZUS albo z doradcą, czy spełnisz warunki najniższej emerytury.

## Czego ta lekcja nie rozstrzyga

Nie liczymy Twojego stażu — robi to ZUS przy przyznawaniu świadczenia. Nie omawiamy wyjątków od wieku emerytalnego ani zasad dla osób urodzonych przed 1949 r.
