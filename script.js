//global variables
const savedMVPs = $("#savedMVPs");
const savePlayerBtn = $("#savePlayerBtn");
const apiKey = ""; //don't commit this key. Delete before commit.
const searchBtn = $("#search-btn");
const clearLocalStore = $("#clear-localstorage-btn");
let savedPlayerArray = JSON.parse(localStorage.getItem("savedMVPList")) || [];

//function loads on refresh so that the last saved player details, video and gif will be displayed. 
renderPlayerBtns();
if (savedPlayerArray.length > 0) {

    let lastMVP = (savedPlayerArray[savedPlayerArray.length - 1]).replace(" ", "%20");
    searchBallDl(lastMVP);
    searchYouTube(lastMVP);
    searchGiphy(lastMVP);
}

//enables searchBtn function to run when enter key is pressed with the player search input field
$("#player-search-input").keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

//main function of the app that triggers all functions
searchBtn.on("click", function(event) {
    let playerName = $(".input").val();
    event.preventDefault();

    resetState();
    renderPlayerBtns();
    searchBallDl(playerName);
    searchYouTube(playerName);
    searchGiphy(playerName);
    $(".input").val("");
});

//to render on reload any saved player buttons from local storage 
function renderPlayerBtns() {
    for (let i = 0; i < savedPlayerArray.length; i++) {
        let newDiv = $("<div>").addClass("savedPlayer");
        newDiv.text(savedPlayerArray[i]);
        $("#savedMVPs").append(newDiv);
    }
}

// deletes all content for player stats and gifs
function resetState() {
    savedMVPs.empty();
    $(".slides").empty();
}

//adds to current searched player to local storage. When limit of 5 is reached first saved player is replaced.
savePlayerBtn.on("click", function(event) {
    event.preventDefault();

    if (savedPlayerArray.length < 5) {
        let savedPlayerName = $("#name").text();
        savedPlayerArray.unshift(savedPlayerName);
        localStorage.setItem("savedMVPList", JSON.stringify(savedPlayerArray));
        resetState();
        renderPlayerBtns();
        searchGiphy(savedPlayerName);
    } else {
        let savedPlayerName = $("#name").text();
        savedPlayerArray.splice(-1, 1);
        savedPlayerArray.unshift(savedPlayerName);
        localStorage.setItem("savedMVPList", JSON.stringify(savedPlayerArray));
        resetState();
        renderPlayerBtns();
        searchGiphy(savedPlayerName);
    }
});

clearLocalStore.on("click", function() {
    localStorage.clear();
    location.reload();
})

//triggers app functions when saved player is pressed
$(document).on('click', ".savedPlayer", function(event) {
    event.preventDefault();
    let searchText = $(this).text().replace(" ", "%20");
    resetState();
    renderPlayerBtns();
    searchBallDl(searchText);
    searchYouTube(searchText);
    searchGiphy(searchText);
})

//api function for player information from www.balldontlie.io
function searchBallDl(x) {
    let queryURL = "https://www.balldontlie.io/api/v1/players?search=" + x;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        $("#name").text(
            response.data[0].first_name + " " + response.data[0].last_name
        );

        $("#team").text(
            response.data[0].team.full_name
        );
        $("#nickname").text("AKA: " + response.data[0].team.name);
        $("#city").text("City: " + response.data[0].team.city);
        $("#conference").text("Conference: " + response.data[0].team.conference);
        $("#division").text("Division: " + response.data[0].team.division);

        $("#height").text(
            "Height: " +
            response.data[0].height_feet +
            "ft " +
            response.data[0].height_inches +
            "in"
        );
        $("#weight").text("Weight: " + response.data[0].weight_pounds + "lbs");
        $("#position").text("Position: " + response.data[0].position);

        playerStats(response.data[0].id);
    });
}

//api function for player stats from www.balldontlie.io
function playerStats(x) {

    let queryURL =
        "https://www.balldontlie.io/api/v1/season_averages?" + "player_ids[]=" + x;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {

        $("#pts").text("PTS: " + response.data[0].pts);
        $("#reb").text("REB: " + response.data[0].reb);
        $("#ast").text("AST: " + response.data[0].ast);
        $("#stl").text("STL: " + response.data[0].stl);
        $("#blk").text("BLK: " + response.data[0].blk);
        $("#fg_pct").text("FG%: " + ((response.data[0].fg_pct) * 100).toFixed(2));
        $("#fg3_pct").text("3P%: " + ((response.data[0].fg3_pct) * 100).toFixed(2));
        $("#ft_pct").text("FT%: " + ((response.data[0].ft_pct) * 100).toFixed(2));
        $("#min").text("MIN: " + response.data[0].min);
        $("#season").text("Season: " + response.data[0].season);
    });
}

//Youtube api retrieves a clip of player highlights and randomly chooses 1 of 25
function searchYouTube(playerName) {
    let queryURLyt =
        "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=" +
        playerName +
        "%20career%20highlights" +
        "&type=video&videoDefinition=high&videoEmbeddable=true&maxResults=50" +
        apiKey;
    $.ajax({
        url: queryURLyt,
        method: "GET",
    }).then(function(response) {
        let itemNumber = Math.floor(Math.random() * 25) + 1;
        let highlightVid = response.items[itemNumber].id.videoId;

        console.log(response);
        console.log(highlightVid);

        let ytLink = "https://www.youtube.com/embed/" + highlightVid;
        $("#yt-link").attr("src", ytLink);
    });
}

//Giphy api retrieves 5 gifs related to searched player
function searchGiphy(playerName) {
    const giphyAPIkey = "&api_key=J6pBLGX38uKv9oFHUNmKpHbDAvpQ1r1K";
    const queryURL2 =
        "https://api.giphy.com/v1/gifs/search?q=" +
        playerName +
        giphyAPIkey +
        "&limit=5";
    $.ajax({
        url: queryURL2,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        for (let index = 0; index < response.data.length; index++) {

            let gifDiv = $("<div>");
            let gifImg = $("<img>");

            gifDiv.attr("id", "slide-" + (index + 1));
            gifImg.attr(
                "src",
                response.data[index].images.downsized_medium.url
            );
            gifImg.addClass("gifImg");

            gifDiv.append(gifImg);
            $(".slides").append(gifDiv);
        }
    });
}