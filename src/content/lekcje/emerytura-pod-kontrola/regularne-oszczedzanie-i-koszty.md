---
kurs: emerytura-pod-kontrola
modul: inflacja
tytul: 'Regularne oszczędzanie, koszty i czytanie symulacji'
opis: 'Trzy scenariusze regularnych wpłat, wpływ rocznych kosztów na wynik i cztery pytania, które warto zadać każdej symulacji.'
czasMin: 10
demonstracyjna: false
podsumowanie:
  - 'Przy zysku równym inflacji wartość realna regularnych wpłat jest niższa od ich sumy.'
  - 'Roczne koszty od zgromadzonych środków zmieniają wynik w długim okresie o dziesiątki tysięcy złotych.'
  - 'Każdą symulację czytaj przez założenia, wynik realny, wariant niekorzystny i koszty.'
twierdzenia: [nbp-cel-inflacyjny]
narzedzie: oszczedzanie
quiz:
  pytania:
    - pytanie: 'Odkładasz co miesiąc tę samą kwotę, a zysk jest równy inflacji. Jak wypada wartość realna w porównaniu z sumą wpłat?'
      odpowiedzi:
        - 'Jest równa sumie wpłat, bo zysk pokrywa inflację.'
        - 'Jest wyższa od sumy wpłat dzięki procentowi składanemu.'
        - 'Jest niższa, bo późniejsze wpłaty są realnie warte mniej.'
      poprawna: 2
      wyjasnienie: 'Każda wpłata zachowuje siłę nabywczą z dnia wpłaty, ale ta sama nominalna wpłata za dwadzieścia lat jest warta dziś znacznie mniej niż dzisiejsza.'
    - pytanie: 'Która informacja jest niezbędna, żeby sensownie odczytać wynik symulacji?'
      odpowiedzi:
        - 'Nazwa instytucji finansowej, która przygotowała symulację wyniku.'
        - 'Założenia i to, czy wynik jest nominalny, czy realny.'
        - 'Wyłącznie końcowa kwota pokazana na wykresie.'
      poprawna: 1
      wyjasnienie: 'Kwota bez założeń i bez informacji, czy uwzględnia inflację, niewiele mówi.'
    - pytanie: 'Dlaczego jeden punkt procentowy rocznych kosztów ma duże znaczenie w długim okresie?'
      odpowiedzi:
        - 'Pomniejsza kapitał co roku, więc mniej pieniędzy pracuje dalej.'
        - 'Jest pobierany tylko raz, przy otwarciu konta, więc później nie działa.'
        - 'Nie ma znaczenia, jeśli zysk jest dodatni.'
      poprawna: 0
      wyjasnienie: 'Na koszty działa ten sam procent składany co na zysk — tylko w przeciwną stronę.'
---

> **W tej lekcji:** łączymy inflację i procent składany w przykładzie regularnego oszczędzania. Do tego koszty, które po cichu zabierają część wyniku, i krótka instrukcja czytania każdej symulacji.

## Trzy horyzonty, trzy założenia

Tabela pokazuje wpłatę 500 zł miesięcznie przez 10, 20 i 30 lat. Pierwszy wariant to brak jakiegokolwiek zysku. Drugi to zysk równy celowi inflacyjnemu NBP, czyli {{nbp-cel-inflacyjny}}[^nbp-cel-inflacyjny]. Trzeci to zysk wyższy od inflacji.

<!-- tabela:scenariusze -->

Wnioski z tej tabeli:

- Przy zerowym zysku wartość realna jest **niższa** niż suma wpłat. Pieniądze odłożone „w skarpecie” tracą siłę nabywczą.
- Przy zysku równym inflacji każda wpłata zachowuje siłę nabywczą z dnia, w którym ją zrobiono. Wartość realna jest mimo to niższa od sumy wpłat, bo wpłata 500 zł za dwadzieścia lat będzie warta w dzisiejszych pieniądzach dużo mniej niż dzisiejsza. Kto chce oszczędzać realnie tyle samo, musi z czasem podnosić wpłaty.
- Dopiero zysk wyższy od inflacji realnie powiększa oszczędności. Wyższy zysk oznacza jednak zwykle wyższe ryzyko.

<!-- wykres:scenariusz -->

## Koszty: niewielki procent, duża kwota

Opłaty liczone od zgromadzonych środków wyglądają niewinnie, bo pobierane są po trochu każdego roku. Działa na nie jednak ten sam procent składany. W przykładzie i w kalkulatorze koszty pomniejszają wartość po doliczeniu zysku, więc zysk po kosztach jest nieco niższy niż prosta różnica „zysk minus koszty”.

<!-- tabela:koszty -->

Dlatego przy porównywaniu ofert tabela opłat jest jednym z pierwszych punktów.

## Jak czytać każdą symulację

1. **Znajdź założenia.** Symulacja bez założeń jest bezwartościowa.
2. **Sprawdź, czy wynik jest nominalny, czy realny.** Kwota bez tej informacji niewiele mówi.
3. **Policz wariant niekorzystny.** Zerowy albo ujemny zysk jest tak samo możliwy jak wysoki.
4. **Sprawdź, czy uwzględniono koszty.**

## Ćwiczenie

1. Wpisz do kalkulatora poniżej kwotę, którą realnie możesz odkładać co miesiąc, i liczbę lat do emerytury.
2. Policz trzy warianty: zerowy zysk, zysk równy inflacji i zysk wyższy od inflacji.
3. Zapisz wartości realne. Obok zapisz orientacyjną lukę z modułu o ZUS, pamiętając o jej ograniczeniach: hipotetyczna emerytura pomija subkonto i jest kwotą brutto.

## Czego ta lekcja nie rozstrzyga

Nie mówimy, jakiego zysku możesz się spodziewać. Symulacje nie uwzględniają podatków — zasady opodatkowania różnią się zależnie od rodzaju konta.
