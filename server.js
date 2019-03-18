var qs = require("querystring")
var http = require("http")
var fs = require("fs")

var playlist = {
    "albums": [],
    "songs": [],
    "sizes": []
}

const servResponse = (req, res) => {

    var allData = "";
    var audio = {
        "albums": [],
        "songs": [],
        "size": []
    }
    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        console.log(finish)
        if (finish.action == "FIRST") {
            fs.readdir(__dirname + "/static/media/audio/", (err, files) => {
                if (err) {
                    return console.log(err);
                }
                console.log(files)
                files.forEach(function (fileName) {
                    console.log(fileName);
                    audio.albums.push(fileName)
                });
                // audio.albums = albums
                console.log(audio);
                console.log(audio.albums[0]);
                console.log(decodeURI(audio.albums[0]));
                fs.readdir(__dirname + "/static/media/audio/" + decodeURI(audio.albums[0]), function (err, files) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(__dirname + "/static/media/audio/" + decodeURI(audio.albums[0]));

                    console.log(files)
                    files.forEach(function (fileName) {
                        console.log(__dirname);
                        audio.songs.push(fileName)
                        var stats = fs.statSync(__dirname + "/static/media/audio/" + audio.albums[0] + "/" + fileName);
                        audio.size.push(stats.size)
                        console.log(stats);
                    })
                    console.log(audio)
                    res.end(JSON.stringify(audio, null, 4));
                    // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                });
            })
        }
        else if (finish.action == "NEXT") {
            fs.readdir(__dirname + "/static/media/audio/", (err, files) => {
                if (err) {
                    return console.log(err);
                }
                console.log(files)
                files.forEach(function (fileName) {
                    console.log(fileName);
                    audio.albums.push(fileName)
                });
                // audio.albums = albums
                console.log(audio);
                console.log(audio.albums[0]);
                console.log(decodeURI(audio.albums[0]));
                fs.readdir(__dirname + "/static/media/audio/" + decodeURI(finish.album), function (err, files) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(__dirname + "/static/media/audio/" + decodeURI(finish.album));

                    console.log(files)
                    files.forEach(function (fileName) {
                        console.log(__dirname);
                        audio.songs.push(fileName)
                        var stats = fs.statSync(__dirname + "/static/media/audio/" + finish.album + "/" + fileName);
                        audio.size.push(stats.size)
                        console.log(stats);
                    })
                    console.log(audio)
                    res.end(JSON.stringify(audio, null, 4));
                    // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
                });
            })
        }
        else if(finish.action == "ADD"){
            playlist.albums.push(finish.album)
            playlist.songs.push(finish.title)
            playlist.sizes.push(finish.size)
            console.log(playlist);
            
            res.end(JSON.stringify(playlist, null, 4))
        }
    })

}

var server = http.createServer((req, res) => {
    console.log(req.method) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":
            if (req.url == "/")
                fs.readFile("static/pages/index.html", (error, data) => {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                })
            else if (req.url == "/css/style.css")
                fs.readFile("static/css/style.css", (error, data) => {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                })
            else if (req.url == "/css/progBar.css")
                fs.readFile("static/css/progBar.css", (error, data) => {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                })
            else {
                fs.readFile("static/" + decodeURI(req.url), (error, data) => {
                    if (!error && decodeURI(req.url).includes(".jpg")) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                    if (!error && decodeURI(req.url).includes(".png")) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                    if (!error && decodeURI(req.url).includes(".mp3")) {
                        res.writeHead(200, { 'Content-Type': 'audio/mpeg;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                    if (!error && decodeURI(req.url).includes(".js")) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                        res.write(data);
                        res.end();
                    }
                })
            }

            // else if(req.url == "/")
            break;
        case "POST":
            // wywołanie funkcji "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servResponse(req, res)

            break;
        default: break;

    }
})

server.listen(3000, () => {
    console.log("start serwera na porcie 3000")
})