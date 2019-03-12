class Music {
    constructor() {
        this.on = 0
        this.size = 0
        this.timestamp
    }

    playMusic(album, title, size, icon) {
        if (this.on == 0) {
            this.on = 1
            $("#play").prop("src", "../img/play.png")
            $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
            $("#audio").prop("volume", 0.2)
            $("#audio").trigger('load'); // załaduj plik mp3
            $("#audio").trigger("play")
        }
        else if (this.on == 1) {
            if ($("#audio_src").attr("src") == "../media/audio/" + album + "/" + title) {
                this.on = 0
                icon.src = "../img/play.png"
                $("#audio").trigger("pause")
            }
            else {
                $("#play").prop("src", "../img/play.png")
                $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").trigger("play")
            }
        }

    }

    playSong(icon) {
        if (this.on == 0) {
            this.on = 1
            icon.src = "../img/pause.png"
            $("#audio").prop("volume", 0.2)
            $("#audio").trigger("play")
            // $("#audio").on("loadeddata", () => {
            //     console.log(document.getElementById("audio").duration)
            //     this.duration = document.getElementById("audio").duration
            //     $("#time").text(parseInt(Math.floor(this.duration / 60)) + ":" + parseInt(this.duration % 60))
            // })
        }
        else if (this.on == 1) {
            this.on = 0
            icon.src = "../img/play.png"
            $("#audio").trigger("pause")
        }
    }

    nextSong() {

    }

    prevSong() {

    }
}