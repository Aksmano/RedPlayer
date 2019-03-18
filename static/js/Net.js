
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
            url: "adres_serwera",
            data: { action: "NEXT", album: albumPhoto },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane

                var finish = JSON.parse(data)
                document.getElementById("songs").innerHTML = ""
                for (var i = 0; i < finish.songs.length; i++)
                    ui.createSong(albumPhoto, finish.songs[i], finish.size[i], i, finish.songs.length)
                console.log("New songs table created")
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    sendSong(albumName, currSong, flag) {
        $.ajax({
            type: "POST",
            url: "adres_serwera",
            data: { action: "NEXT", album: albumName },
            success: function (response) {
                var finish = JSON.parse(response)

                var titles = finish.songs
                var sizes = finish.size
                while (titles[0] != currSong) {
                    var title = titles.shift()
                    var size = sizes.shift()
                    titles.push(title)
                    sizes.push(size)
                }

                if (titles.length == 1) music.playMusic(albumName, titles[0], sizes[0], document.getElementById("play"), 2)
                else if (flag == "next") music.playMusic(albumName, titles[1], sizes[1], document.getElementById("play"))
                else if (flag == "prev") music.playMusic(albumName, titles[titles.length - 1], sizes[sizes.length - 1], document.getElementById("play"))
            },
            error: function (err) {
                console.log(err);

            }
        });
    }

    sendSongToPlaylist(songAlbum, songTitle, songSize) {
        $.ajax({
            type: "POST",
            url: "adres_serwera",
            data: { action: "ADD", album: songAlbum, title: songTitle, size: songSize },
            success: function (response) {
                console.log(response)
            },
            error: function (err) {
                console.log(err)
            }
        });
    }

    sendPlaylistReq() {
        $.ajax({
            type: "POST",
            url: "adres_serwera",
            data: { action: "SHOW" },
            success: function (response) {
                console.log(response);
                var finish = JSON.parse(response)
                
                document.getElementById("songs").innerHTML = ""
                for (var i = 0; i < finish.songs.length; i++)
                    ui.createSong(finish.albums[i], finish.songs[i], finish.sizes[i], i, finish.songs.length)
                console.log("New songs table created")
            }
        });
    }
}