class Music {
    constructor() {
        this.on = 0
        this.duration
        this.albumName
        this.currSize
        this.currTitle
    }

    playMusic(album, title, size, icon, on) {
        var higherProg = document.getElementById("higherProg")
        var lowerProg = document.getElementById("lowerProg")
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
                this.currSize = size

                $("#play").prop("src", "../img/pause.png")
                $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").on("loadeddata", function () {
                    var songName = ""
                    for (let i = 0; i < title.length; i++)
                        if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
                        else songName += title[i]
                    $("#audio").trigger("play");
                    var time = document.getElementById("time")
                    time.innerText += "\t" + songName
                    $("#audio").on("timeupdate", function () {
                        var duration = $("#audio").prop("duration")
                        if (duration == NaN || duration == undefined || duration == 0) time = "0:00 || 0:00"
                        // console.log(duration)
                        // console.log(($("#audio").prop("currentTime") / duration) * 100)
                        var seconds = Math.round($("#audio").prop("currentTime") % 60)
                        var minutes = Math.floor($("#audio").prop("currentTime") / 60);
                        var durSecs = Math.round(duration)
                        var durMins = Math.floor(durSecs / 60);
                        durSecs = Math.floor(durSecs % 60);
                        if (durSecs < 10) durSecs = "0" + durSecs
                        if (seconds < 10) seconds = "0" + seconds
                        time.innerText = minutes + ":" + seconds + " || " + durMins + ":" + durSecs + "\t" + songName// (($("#audio").prop("currentTime") / duration) * 100).toFixed(2)
                        // higherProg.style.width = ($("#audio").prop("currentTime") / duration).toFixed(1) + "%"
                        if (($("#audio").prop("currentTime") / duration) * 100 > 0.5)
                            lowerProg.style.width = ($("#audio").prop("currentTime") / duration) * 100 + "%"
                        else lowerProg.style.width = "0.5%"

                    });
                    $("#audio").on("ended", function () {
                        console.log("Skończyło się");

                        ui.nextSong()

                    })

                })
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
                this.currSize = size
                $("#play").prop("src", "../img/pause.png")
                $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
                $("#audio").prop("volume", 0.2)
                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").on("loadeddata", function () {
                    var songName = ""
                    for (let i = 0; i < title.length; i++)
                        if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
                        else songName += title[i]
                    $("#audio").trigger("play");
                    var time = document.getElementById("time")
                    time.innerText += "\t" + songName
                    $("#audio").on("timeupdate", function () {
                        var duration = $("#audio").prop("duration")
                        if (duration == NaN || duration == undefined || duration == 0) time = "0:00 || 0:00"
                        // console.log(duration)
                        // console.log(($("#audio").prop("currentTime") / duration) * 100)
                        var seconds = Math.round($("#audio").prop("currentTime") % 60)
                        var minutes = Math.floor($("#audio").prop("currentTime") / 60);
                        var durSecs = Math.round(duration)
                        var durMins = Math.floor(durSecs / 60);
                        durSecs = Math.floor(durSecs % 60);
                        if (durSecs < 10) durSecs = "0" + durSecs
                        if (seconds < 10) seconds = "0" + seconds
                        time.innerText = minutes + ":" + seconds + " || " + durMins + ":" + durSecs + "\t" + songName // (($("#audio").prop("currentTime") / duration) * 100).toFixed(2)
                        // higherProg.style.width = ($("#audio").prop("currentTime") / duration).toFixed(1) + "%"
                        if (($("#audio").prop("currentTime") / duration) * 100 > 0.5)
                            lowerProg.style.width = ($("#audio").prop("currentTime") / duration) * 100 + "%"
                        else lowerProg.style.width = "0.5%"

                    });
                    $("#audio").on("ended", function () {

                        ui.nextSong()

                    })

                })
            }
        }
        else if (this.on == 2) {
            this.on = 1
            this.currTitle = title
            this.currSize = size
            $("#play").prop("src", "../img/pause.png")
            $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
            $("#audio").prop("volume", 0.2)
            $("#audio").trigger('load'); // załaduj plik mp3
            $("#audio").on("loadeddata", function () {
                var songName = ""
                for (let i = 0; i < title.length; i++)
                    if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
                    else songName += title[i]
                $("#audio").trigger("play");
                var time = document.getElementById("time")
                time.innerText += "\t" + songName
                $("#audio").on("timeupdate", function () {
                    var duration = $("#audio").prop("duration")
                    if (duration == NaN || duration == undefined || duration == 0) time = "0:00 || 0:00"
                    // console.log(duration)
                    // console.log(($("#audio").prop("currentTime") / duration) * 100)
                    var seconds = Math.round($("#audio").prop("currentTime") % 60)
                    var minutes = Math.floor($("#audio").prop("currentTime") / 60);
                    var durSecs = Math.round(duration)
                    var durMins = Math.floor(durSecs / 60);
                    durSecs = Math.floor(durSecs % 60);
                    if (durSecs < 10) durSecs = "0" + durSecs
                    if (seconds < 10) seconds = "0" + seconds
                    time.innerText = minutes + ":" + seconds + " || " + durMins + ":" + durSecs + "\t" + songName // (($("#audio").prop("currentTime") / duration) * 100).toFixed(2)
                    // higherProg.style.width = ($("#audio").prop("currentTime") / duration).toFixed(1) + "%"
                    if (($("#audio").prop("currentTime") / duration) * 100 > 0.5)
                        lowerProg.style.width = ($("#audio").prop("currentTime") / duration) * 100 + "%"
                    else lowerProg.style.width = "0.5%"

                });
                $("#audio").on("ended", function () {

                    ui.nextSong()

                })

            })
        }
        else if (this.on == 2) {
            this.on = 1
            this.currTitle = title
            this.currSize = size
            $("#play").prop("src", "../img/pause.png")
            $("#audio_src").prop("src", "../media/audio/" + album + "/" + title);
            $("#audio").prop("volume", 0.2)
            $("#audio").trigger('load'); // załaduj plik mp3
            $("#audio").on("loadeddata", function () {
                var songName = ""
                for (let i = 0; i < title.length; i++)
                    if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
                    else songName += title[i]
                $("#audio").trigger("play");
                var time = document.getElementById("time")
                time.innerText += "\t" + songName
                $("#audio").on("timeupdate", function () {
                    var duration = $("#audio").prop("duration")
                    if (duration == NaN || duration == undefined || duration == 0) time = "0:00 || 0:00"
                    // console.log(duration)
                    // console.log(($("#audio").prop("currentTime") / duration) * 100)
                    var seconds = Math.round($("#audio").prop("currentTime") % 60)
                    var minutes = Math.floor($("#audio").prop("currentTime") / 60);
                    var durSecs = Math.round(duration)
                    var durMins = Math.floor(durSecs / 60);
                    durSecs = Math.floor(durSecs % 60);
                    if (durSecs < 10) durSecs = "0" + durSecs
                    if (seconds < 10) seconds = "0" + seconds
                    time.innerText = minutes + ":" + seconds + " || " + durMins + ":" + durSecs + "\t" + songName // (($("#audio").prop("currentTime") / duration) * 100).toFixed(2)
                    // higherProg.style.width = ($("#audio").prop("currentTime") / duration).toFixed(1) + "%"
                    if (($("#audio").prop("currentTime") / duration) * 100 > 0.5)
                        lowerProg.style.width = ($("#audio").prop("currentTime") / duration) * 100 + "%"
                    else lowerProg.style.width = "0.5%"

                });
                $("#audio").on("ended", function () {

                    ui.nextSong()

                })

            })
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

    playNextSong(flag, isPlaylist) {
        if (isPlaylist == false) net.sendSong(this.albumName, this.currTitle, flag)
        else net.sendFromPlaylist(this.currTitle, flag)
    }

    playPrevSong(flag, isPlaylist) {
        if (isPlaylist == false)  net.sendSong(this.albumName, this.currTitle, flag)
        else net.sendFromPlaylist(this.currTitle, flag)
    }

    toPlaylist(album, title, size) {
        net.sendSongToPlaylist(album, title, size)
    }

    showPlaylist() {
        net.sendPlaylistReq()
    }
}