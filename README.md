Próbka mojego kodu Javascript. Akurat przedwczoraj to 
napisałem. Skrypt posiada następujące funkcje:

- mamy określone elementy html i jeśli na jeden z nich przeciągniemy kilka 
plików graficznych, to zostaną wczytane do pamięci przeglądarki i zostaną 
wyświetlone miniaturki - ikonki. Miniaturki wyświetlane za pomocą Canvas. 
Jeśli klikniemy na jakąś ikonkę, to w nowej zakładce otworzy się dane 
zdjęcie w oryginalnej rozdzielczości. Użyłem do tego BlobURL.
- dokładnie w ten sam sposób możemy wczytać kilka plików za pomocą input - 
file
- kod tak zaprojektowałem, że skrypt automatycznie wyszukuje określone 
elementy html oraz file - input i dodaje do nich pożądaną funkcjonalność. 
Skorzystałem tutaj z data-attribute.
- skrypt został napisany zgodnie z Module Design Pattern
- do kodu napisałem komentarze. Położyłem nacisk na poprawną strukturę 
uporządkowanie i czytelność kodu.
