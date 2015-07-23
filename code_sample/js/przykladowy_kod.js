/**
 * Created by Paweł Nielepkowicz on 03/06/2015.
 */
window.onload = function () {

// MODULE DESIGN PATTERN

    var photoPreviewModule = (function () {

        // wyszukujemy element html odpowiadające za wczytywanie plików
        var droptarget = document.querySelectorAll('[data-droparea]');
        var inputFiles = document.querySelectorAll('[data-input-files]');
        // wysokość I szerokość ikonek
        var thumbwidth = 150;
        var thumbheight = 150;

        // tu przechowywuję wszystkie adresy BlobUrl do plików w wryginalnej wielkości
        var blobUrlArray = [];
        //   łączna ilość plików. Służy to potem do indeksowania plików w blobUrlArray
        // i manipulacji nimi, zapewnia mi to łatwy dostęp do plików
        var indexy = 0;
        // wartość przechowuje aktualny, chwilowy indeks do pliku wczytywanego za pomocą drag and drop
        var j = 0;
        // wartość przechowuje aktualny, chwilowy indeks do pliku wczytywanego za pomocą input
        var k = 0;

        // w tym obiekcie trzymam wszystkie pliki z danej kolejki
        // wczytywania za pomocą drag and drop lib input
        var files;
        // tworzenie BlobURL
        var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) ||
            (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
            window.createObjectURL;

        return {

            init: function () {

                console.log("droptarget" + droptarget);
                console.log(droptarget.length);
                // dokonuję iteracji na każdym pliku wczytanym z dysku twardego
                //  I dodaję metody Dotyczy to kolejki plików wczytanych za pomocą drag and drop
                for (var _j = 0; _j < droptarget.length; _j++) {

                    console.log(droptarget[_j]);

                    // ustawianie wskaźnika
                    j = _j;
                    photoPreviewModule._ondragover();
                    photoPreviewModule._ondragenter();
                    photoPreviewModule._droptarget();
                    photoPreviewModule._ondragleave();
                  //  console.log("droptarget" + droptarget);
                    console.log("j" + j);
                }
                // dokonuję iteracji na każdym pliku wczytanym z dysku twardego
                // I dodaję metody Dotyczy to kolejki plików wczytanych za pomocą input

                for (var _k = 0; _k < inputFiles.length; _k++) {

                    console.log(inputFiles[k]);
                    // ustawianie wskaźnika
                    k = _k;

                    photoPreviewModule._inputFiles();

                }

            },

            // gdy wczytuję pliki za pomocą input
            _inputFiles: function () {
                inputFiles[k].onchange = function (e) {
                    // tu teraz mamy wszystkie pliki z danej kolejki
                    // – pliki wczytane za pomocą input
                    files = e.target.files;
                    // funkcja odpowiedzialna za generowanie miniaturek I tworzenie canvas.
                    // Funkcja współdzielona z funkcją _droptarget
                    photoPreviewModule._generateThumbnails();
                    // usuwamy klasę css “active”
                    droptarget[j].classList.remove("active");
                    return false;
                };

            },

            // dodajemy klasę css “active”
            _ondragover: function () {

                droptarget[j].ondragover = function (e) {

                    // aktualizacja wskaznika
                    var currentElement = this;
                    var currentIndicator = currentElement.dataset.droparea;


                    console.log(currentIndicator);
                    j = currentIndicator;

                    console.log(droptarget[j]);
                    droptarget[j].classList.add("active");
                    return false;
                };
            },

            // upewniamy się, że przeciągamy tylko plik
            _ondragenter: function () {

                droptarget[j].ondragenter = function (e) {

                    // aktualizacja wskaźnika
                    var currentElement = this;
                    var currentIndicator = currentElement.dataset.droparea;


                    console.log(currentIndicator);
                    j = currentIndicator;
                    var types = e.dataTransfer.types;
                    if (!types ||
                        (types.contains && types.contains("Files")) ||
                        (types.indexOf && types.indexOf("Files") != -1)) {

                        return false;

                    }
                };
            },

            // gdy wczytuję pliki za pomocą drag and drop
            _droptarget: function () {

                droptarget[j].ondrop = function (e) {

                    // tu teraz mamy wszystkie pliki z danej kolejki
                    //  – pliki wczytane za pomocą drag and drop
                    files = e.dataTransfer.files;

                    // funkcja odpowiedzialna za generowanie miniaturek I tworzenie canvas.
                    // Funkcja współdzielona z funkcją _inputFiles
                    photoPreviewModule._generateThumbnails();

                    droptarget[j].classList.remove("active");
                    return false; // We've handled the drop
                };

            },

            _generateThumbnails: function () {

                // dokonuję iteracji na każdym pliku z danej kolejki
                for (var i = 0; i < files.length; i++) {
                    // tworzę element <img>
                    var img = document.createElement("img");
                    // przypisuję adres BlobURL
                    img.src = getBlobURL(files[i]); // Use Blob URL with <img>
                    // uwaga! Tu przypisuję jako właściwość tego obiektu indeks do tablicy zawierającej WSZYSTKIE obrazki
                    img.indexxx = indexy;
                    // inkrementacja I ustawienie poprawnej wartości . tu zastosowałem algorytm rekurencyjny
                    indexy++; // setting the value of index

                    console.log(getBlobURL(files[i]));
                    // I dodaję do tablicy adresy Blob. Ta tablica przechowywuje WSZYSTKIE pliki wczytane
                    blobUrlArray.push(getBlobURL(files[i]));

                    // gdy wczytam KONKRETNY plik
                    img.onload = function () {
                        // tworzenie I wstęna manipulacja obiektu canvas
                        var myCanvas = document.createElement('canvas');
                        var cx = myCanvas.getContext('2d');

                        myCanvas.width = thumbwidth;
                        myCanvas.height = thumbheight;
                        // ustawianie rozmiaru obrazka w canvas. Funkcja resize zwraca parametry
                        // potrzebne do wstawienia pozycji i rozmiaru obrazka w canvas
                        var dimensions = photoPreviewModule.resize(this.width, this.height, thumbwidth, thumbheight);

                        // dodawanie czarnego tła
                        cx.fillStyle = 'black';
                        cx.fillRect(0, 0, thumbwidth, thumbheight);
                        // I gdy mamy już wszystko gotowe, rysujemy canvas
                        cx.drawImage(
                            this, dimensions.x, dimensions.y, dimensions.w, dimensions.h
                        );
                        console.log(cx);
                        // dodajemy parameter indexxx. To jest niezbędne do klikania
                        // I otwierania obrazka w nowym oknie
                        myCanvas.indexxx = this.indexxx;

                        var margins = 15;

                        // tworzymy element <div> I dodajemy do niego canvas
                        var divContainer = document.createElement("div");

                        divContainer.style.display = "inline";
                        divContainer.style.margin = margins + "px";
                        document.body.appendChild(divContainer);
                        // I dodajemy do pliku HTML
                        divContainer.appendChild(myCanvas);
                        myCanvas.textAlign = 'center';
                        myCanvas.addEventListener("click", thumbClick, true);

                        // gdy chcemy otworzyć oryginalny plik w nowym oknie
                        function thumbClick() {
                            console.log(this.indexxx);

                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            // blobUrlArray[this.indexxx] – tu znajduje się adres Blob do oryginalnego obrazka.
                            // klikając w ikonkę otrzymuję  aktualny indeks do tablicy z wszystkimi adresami Blob
                            // coś jak event.currentTarget
                            window.open(blobUrlArray[this.indexxx])
                        }

                    };
                    console.log(blobUrlArray);
                }

            },

            // usówam klasę css “active”
            _ondragleave: function () {

                droptarget[j].ondragleave = function () {
                    droptarget[j].classList.remove("active");
                };

            },

            // ustawianie rozmiaru obrazka w canvas. Funkcja resize zwraca parametry
            //potrzebne do wstawienia pozycji i rozmiaru obrazka w canvas
            resize: function (imagewidth, imageheight, thumbwidth, thumbheight) {

                var w = 0, h = 0, x = 0, y = 0,
                    widthratio = imagewidth / thumbwidth,
                    heightratio = imageheight / thumbheight,
                    maxratio = Math.max(widthratio, heightratio);
                if (maxratio > 1) {
                    w = imagewidth / maxratio;
                    h = imageheight / maxratio;
                } else {
                    w = imagewidth;
                    h = imageheight;
                }
                x = ( thumbwidth - w ) / 2;
                y = ( thumbheight - h ) / 2;
                return {w: w, h: h, x: x, y: y};

            }

        };

    })();

    // wywołanie funkcji inicjującej moduł
    photoPreviewModule.init();

};
