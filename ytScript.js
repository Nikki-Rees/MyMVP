const apiKey = "&key=AIzaSyBnkoYU_uw9KSVJAdUlTLaZltRCIieA_6s";

function searchYouTube() {
    let playerName = $(".input").val().replace(" ", "%20")
    const queryURL =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=" +
      playerName +
      "career%20highlights" +
      "&type=video&videoDefinition=high&videoEmbeddable=true" +
      apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        let highlightVid = response.items[0].id.videoId
        console.log(response)
        console.log(highlightVid)
            // console.log(queryURL)
        loadVideo(highlightVid);
    });
}

// YouTube video script
// loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;

function loadVideo(highlightVid) {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: highlightVid,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

//The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}