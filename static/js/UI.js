console.log("wczytano plik Ui.js")

class UI {

    constructor() {
        // this.songList
        // this.album
        // this.size
        this.init()
    }

    init() {
        document.getElementById("prev").onclick = (e) => { this.prevSong() }
        document.getElementById("prev").onmouseover = (e) => { document.body.style.cursor = "pointer" }
        document.getElementById("prev").onmouseout = (e) => { document.body.style.cursor = "default" }
        document.getElementById("play").onclick = (e) => { music.playSong(e.target) }
        document.getElementById("play").onmouseover = (e) => { document.body.style.cursor = "pointer" }
        document.getElementById("play").onmouseout = (e) => { document.body.style.cursor = "default" }
        document.getElementById("next").onclick = (e) => { this.nextSong() }
        document.getElementById("next").onmouseover = (e) => { document.body.style.cursor = "pointer" }
        document.getElementById("next").onmouseout = (e) => { document.body.style.cursor = "default" }
        document.getElementById("playlist").onclick = (e) => { console.log("here"); this.showPlaylistSongs() }
        document.getElementById("playlist").onmouseover = (e) => { document.body.style.cursor = "pointer" }
        document.getElementById("playlist").onmouseout = (e) => { document.body.style.cursor = "default" }
    }

    createCover(cover) {
        var el = document.createElement("img")
        el.className = "cover"
        console.log()
        el.src = "../media/covers/" + cover + ".jpg"
        el.addEventListener("click", () => {
            net.sendData(cover);
        })
        el.onmouseover = (e) => { document.body.style.cursor = "pointer" }
        el.onmouseout = (e) => { document.body.style.cursor = "default" }
        document.getElementById("covers").appendChild(el)
        console.log("Cover created")
    }

    createSong(album, title, size, i, endSize) {
        var songName = ""
        for (let i = 0; i < title.length; i++)
            if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
            else songName += title[i]
        var tr = document.createElement("tr")
        tr.onmouseover = () => { document.body.style.cursor = "pointer" }
        tr.onmouseout = () => { document.body.style.cursor = "default" }
        var td = document.createElement("td")
        td.onclick = (e) => { music.playMusic(album, title, size, document.getElementById("play")) }
        td.innerText = album
        tr.appendChild(td)
        var td = document.createElement("td")
        td.onclick = (e) => { music.playMusic(album, title, size, document.getElementById("play")) }
        td.innerText = songName
        tr.appendChild(td)
        var td = document.createElement("td")
        td.onclick = (e) => { music.playMusic(album, title, size, document.getElementById("play")) }
        td.innerText = (size / 1000 / 1000).toFixed(2) + " MB"
        tr.appendChild(td)
        var td = document.createElement("td")
        td.style.background = "rgb(51, 0, 0)"
        td.style.border = "1px solid rgb(41, 0, 0)"
        var img = document.createElement("img")
        img.src = "../img/playlist.png"
        img.width = 52
        img.height = 52
        img.style.paddingRight = "12px"
        img.style.paddingLeft = "12px"
        td.appendChild(img)
        // td.style.position = "relative"
        td.width = 64
        td.onmouseover = () => { td.style.backgroundColor = "rgb(123, 0, 0)" }
        td.onmouseout = () => { td.style.backgroundColor = "rgb(51, 0, 0)" }
        td.onclick = () => {
            ui.addToPlaylist(album, title, size)
        }
        tr.appendChild(td)
        document.getElementById("songs").appendChild(tr)
        console.log("Song created");

    }

    showPlaylistSongs() {
        music.showPlaylist()
    }

    addToPlaylist(album, title, size) {
        music.toPlaylist(album, title, size)
    }

    prevSong() {
        music.playPrevSong("prev")
    }

    nextSong() {
        music.playNextSong("next")
    }
}