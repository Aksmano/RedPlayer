var music;
var net;
var ui;
$(document).ready(function () {
   net = new Net() // utworzenie obiektu klasy Net
   ui = new UI() // utworzenie obiektu klasy UI
   music =  new Music() // utworzenie obiektu klasy Music
   $.ajax({
      url: "adres serwera",
      data: { action: "FIRST" },
      type: "POST",
      success: (data) => {
         var finish = JSON.parse(data)

         for (let i = 0; i < finish.albums.length; i++)
            ui.createCover(finish.albums[i])
         for (let i = 0; i < finish.songs.length; i++)
            ui.createSong(finish.albums[0], finish.songs[i], finish.size[i])
         console.log("First album created")
      },
      error: function (xhr, status, error) {
         console.log(xhr);
      }
   })
})

