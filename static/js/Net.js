
console.log("wczytano plik Net.js")

class Net {
    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
        this.doSth() // wywołanie funkcji z tej samej klasy
    }

    doSth() {
        console.log("funcja doSth " + this.a + " - " + this.b)
    }

    sendData(albumPhoto) {
        $.ajax({
            url: "adres serwera",
            data: { action: "NEXT", album: albumPhoto },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane

                var finish = JSON.parse(data)
                document.getElementById("songs").innerHTML = ""
                for (var i = 0; i < finish.songs.length; i++)
                    ui.createSong(albumPhoto, finish.songs[i], finish.size[i])
                console.log("New songs table created")
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}