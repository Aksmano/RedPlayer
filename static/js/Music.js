class Music {
    constructor() {
        this.on = 0
        this.size = 0
        this.timestamp
        this.duration
        this.albumName
        this.currTitle
    }

    playMusic(album, title, size, icon, on) {
        if (on === undefined) this.on = this.on
        else if (on == 0 || on == 1 || on == 2) this.on = on
        this.albumName = album
        if (this.on == 0) {
            if ($("#audio_src").attr("src") == "../media/audio/" + album + "/" + title) {
                this.on = 1
                icon.src = "../img/pause.png"
                $("#audio").trigger("play")
            }
            else {
                this.on = 1
                this.currTitle = title
                $("#play").prop("src", "../img/pause.png")
                $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").trigger("play")
                // $("#audio").on("loadeddata", function () {
                //     console.log(document.getElementById("audio").duration)
                //     $("#text").text(Math.floor(parseInt(this.duration/60)) + ":" + parseInt(this.duration % 60))
                //  });
            }
        }
        else if (this.on == 1) {
            if ($("#audio_src").attr("src") == "../media/audio/" + album + "/" + title) {
                this.on = 0
                icon.src = "../img/play.png"
                $("#audio").trigger("pause")
            }
            else {
                this.currTitle = title
                $("#play").prop("src", "../img/pause.png")
                $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").trigger("play")
            }
        }
        else if (this.on == 2) {
            this.on = 1
            this.currTitle = title
            $("#play").prop("src", "../img/pause.png")
            $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
            $("#audio").prop("volume", 0.2)
            $("#audio").trigger('load'); // załaduj plik mp3
            $("#audio").trigger("play")
        }

    }

    playSong(icon) {
        if ($("#audio_src").attr("src") != "")
            if (this.on == 0) {
                this.on = 1
                icon.src = "../img/pause.png"
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger("play")
            }
            else if (this.on == 1) {
                this.on = 0
                icon.src = "../img/play.png"
                $("#audio").trigger("pause")
            }
    }

    playNextSong(flag) {
        net.sendSong(this.albumName, this.currTitle, flag)
    }

    playPrevSong(flag) {
        net.sendSong(this.albumName, this.currTitle, flag)
    }
}