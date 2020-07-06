const savedMVPs = $("#savedMVPs");
const savePlayerBtn = $("#savePlayerBtn");

let savedPlayerArray = JSON.parse(localStorage.getItem("savedMVPList")) || [];

renderPlayerBtns();
if (savedPlayerArray.length > 0) {

    let lastMVP = (savedPlayerArray[savedPlayerArray.length - 1]).replace(" ", "%20");
    searchBallDl(lastMVP);
    searchYouTube(lastMVP);
    searchGiphy(lastMVP);
}

const searchBtn = $("#search-btn");
// declare variable with search bar value

$("#player-search-input").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

searchBtn.on("click", function (event) {
    let playerName = $(".input").val();
    event.preventDefault();

    resetState();
    renderPlayerBtns();
    searchBallDl(playerName);
    searchYouTube(playerName);
    searchGiphy(playerName);

});

function renderPlayerBtns() {
    for (let i = 0; i < savedPlayerArray.length; i++) {
        let newDiv = $("<div>").addClass("savedPlayer");
        newDiv.text(savedPlayerArray[i]);
        $("#savedMVPs").append(newDiv);
    }
}

function resetState() {
    savedMVPs.empty();
    $(".slides").empty();
}

savePlayerBtn.on("click", function (event) {
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

$(document).on('click', ".savedPlayer", function (event) {
    event.preventDefault();
    let searchText = $(this).text().replace(" ", "%20");
    resetState();
    renderPlayerBtns();
    searchBallDl(searchText);
    searchYouTube(searchText);
    searchGiphy(searchText);
})

$(document).on("click", "#yt-refresh-btn", function () {
    window.location.reload();
})

function searchBallDl(x) {
    let queryURL = "https://www.balldontlie.io/api/v1/players?search=" + x;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
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



function playerStats(x) {

    let queryURL =
        "https://www.balldontlie.io/api/v1/season_averages?" + "player_ids[]=" + x;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
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
    }).then(function (response) {
        console.log(response);

        for (let index = 0; index < response.data.length; index++) {

            // let newGif = $("<img>")
            // newGif.attr("src", response.data[index].images.downsized_medium.url)
            // console.log(response.data[index].images.downsized_medium.url);
            // $(".giphyContainer").append(newGif);

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