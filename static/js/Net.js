
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
                    ui.createSong(albumPhoto, finish.songs[i], finish.size[i], i, finish.songs.length, false)
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

    sendFromPlaylist(currSong, flag) {
        $.ajax({
            type: "POST",
            url: "adres_serwera",
            data: { action: "PLAYLIST" },
            success: function (response) {

                var finish = JSON.parse(response)
                console.log("heloł")

                var titles = finish.songs
                var sizes = finish.sizes
                var albums = finish.albums

                var which = 1
                var k = 1
                // if (titles[titles.length - 1] == titles[titles.length - 2] && flag == "prev") var k = 0
                // if(currSong == )


                if (k == 1)
                    while (titles[0] != currSong) {
                        var title = titles.shift()
                        var size = sizes.shift()
                        var album = albums.shift()
                        titles.push(title)
                        sizes.push(size)
                        albums.push(album)
                    }

                console.log("jestes tutaj");
                console.log(finish);

                if (titles.length != 1) {
                    if (titles[0] == titles[1]) {
                        var title = titles.shift()
                        var size = sizes.shift()
                        var album = albums.shift()
                        titles.push(title)
                        sizes.push(size)
                        albums.push(album)
                        // console.log(finish);

                        if (flag == "next") music.playMusic(albums[albums.length - 1], titles[albums.length - 1], sizes[albums.length - 1], document.getElementById("play"), 2)
                        which--
                    }
                    else if (titles[0] == titles[titles.length - 1]) {
                        // var title = titles.pop()
                        // var size = sizes.pop()
                        // var album = albums.pop()
                        // titles.unshift(title)
                        // sizes.unshift(size)
                        // albums.unshift(album)
                        // var title = titles.shift()
                        // var size = sizes.shift()
                        // var album = albums.shift()
                        // titles.push(title)
                        // sizes.push(size)
                        // albums.push(album)

                        if (flag == "prev") music.playMusic(albums[0], titles[0], sizes[0], document.getElementById("play"), 2)
                        which--
                    }
                    // else if()
                }
                if (which == 1)
                    if (titles.length == 1) music.playMusic(albums[0], titles[0], sizes[0], document.getElementById("play"), 2)
                    else if (flag == "next") music.playMusic(albums[1], titles[1], sizes[1], document.getElementById("play"), 2)
                    // else if (titles[0] == titles[titles.length - 1] && flag == "prev") {
                    //     console.log("weszeles");

                    //     // var title = titles.shift()
                    //     // var size = sizes.shift()
                    //     // var album = albums.shift()
                    //     // titles.push(title)
                    //     // sizes.push(size)
                    //     // albums.push(album)
                    //     // music.playMusic(albums[albums.length - 2], titles[titles.length - 2], sizes[sizes.length - 2], document.getElementById("play"), 2)
                    //     if (titles[titles.length - 1] == titles[titles.length - 2] && flag == "prev") {
                    //         console.log("tu tez");

                    //         // if (k == 1) {
                    //             var title = titles.pop()
                    //             var size = sizes.pop()
                    //             var album = albums.pop()
                    //             titles.unshift(title)
                    //             sizes.unshift(size)
                    //             albums.unshift(album)
                    //         // }
                    //         music.playMusic(albums[0], titles[0], sizes[0], document.getElementById("play"), 2)
                    //     }
                    // }
                    // else if (titles[titles.length - 1] == titles[titles.length - 2] && flag == "prev") {
                    //     if (k == 1) {
                    //         var title = titles.shift()
                    //         var size = sizes.shift()
                    //         var album = albums.shift()
                    //         titles.push(title)
                    //         sizes.push(size)
                    //         albums.push(album)
                    //     }
                    //     music.playMusic(albums[albums.length - 3], titles[titles.length - 3], sizes[sizes.length - 3], document.getElementById("play"), 2)
                    // }
                    else if (titles[0] != titles[titles.length - 1] && flag == "prev") music.playMusic(albums[albums.length - 1], titles[titles.length - 1], sizes[sizes.length - 1], document.getElementById("play"), 2)
                $.ajax({
                    type: "POST",
                    url: "adres_serwera",
                    data: { action: "UPDATE", albums: finish.albums, songs: finish.songs, sizes: finish.sizes },
                    success: function (response) {
                        console.log(response)
                    }
                });

            },
            error: function (err) {
                console.log(err);

            }
        })
    }

    updateServerPlaylist(finish) {
        $.ajax({
            type: "POST",
            url: "adres_serwera",
            data: { action: "UPDATE", albums: finish.albums, songs: finish.songs, sizes: finish.sizes },
            success: function (response) {
                console.log(response)
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
            data: { action: "PLAYLIST" },
            success: function (response) {
                console.log(response);
                var finish = JSON.parse(response)

                document.getElementById("songs").innerHTML = ""
                for (var i = 0; i < finish.songs.length; i++)
                    ui.createSong(finish.albums[i], finish.songs[i], finish.sizes[i], i, finish.songs.length, true)
                console.log("New songs table created")
            }
        });
    }
}