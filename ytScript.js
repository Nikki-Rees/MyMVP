// const apiKey = "&key=AIzaSyC4EHWAq38XegCgZSifE3Zu8V_2hUE5UrE";


// function searchYouTube() {

//     let playerName = $(".input").val().replace(" ", "%20")
//     let queryURLyt =
//       "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=" +
//       playerName +
//       "%20career%20highlights" +
//       "&type=video&videoDefinition=high&videoEmbeddable=true" +
//       apiKey;
//     $.ajax({
//         url: queryURLyt,
//         method: "GET",
//     }).then(function (response) {
        
//         let highlightVid = response.items[0].id.videoId;
//         console.log(response)
//         console.log(highlightVid)
        
//         let ytLink = "https://www.youtube.com/embed/" + highlightVid;
//         $("#yt-link").attr("src", ytLink);
//     });
// }