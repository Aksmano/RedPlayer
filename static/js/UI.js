console.log("wczytano plik Ui.js")

class UI {

    constructor() {
        document.getElementById("prev").onclick = (e) => { music.prevSong() }
        document.getElementById("play").onclick = (e) => { music.playSong(e.target) }
        document.getElementById("next").onclick = (e) => { music.nextSong() }
    }

    createCover(cover) {
        var el = document.createElement("img")
        el.className = "cover"
        console.log()
        el.src = "../media/covers/" + cover + ".jpg"
        el.addEventListener("click", () => {
            net.sendData(cover);
        })
        document.getElementById("covers").appendChild(el)
        console.log("Cover created")
    }

    createSong(album, title, size) {
        var songName = ""
        for (let i = 0; i < title.length; i++)
            if (title[i] == "." && title[i + 1] == "m" && title[i + 2] == "p" && title[i + 3] == "3") break
            else songName += title[i]
        var tr = document.createElement("tr")
        tr.onclick = (e) => {
            music.playMusic(album, title, size, document.getElementById("play"))
        }
        tr.onmouseover = () => { document.body.style.cursor = "pointer" }
        tr.onmouseout = () => { document.body.style.cursor = "default" }
        var td = document.createElement("td")
        td.innerText = album
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = songName
        tr.appendChild(td)
        var td = document.createElement("td")
        td.innerText = (size / 1000 / 1000).toFixed(2) + " MB"
        tr.appendChild(td)
        var td = document.createElement("td")
        var arrow = document.createElement("div")
        arrow.className = "arrow"
        td.appendChild(arrow)
        td.style.position = "relative"
        td.width = 64
        td.onmouseover = () => { td.children[0].style.borderLeftColor = "rgb(233, 0, 0)" }
        td.onmouseout = () => { td.children[0].style.borderLeftColor = "rgb(255, 255, 255)" }
        tr.appendChild(td)
        document.getElementById("songs").appendChild(tr)
        console.log("Song created");

    }

}