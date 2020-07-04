const savedMVPs = $("#savedMVPs");
const savePlayerBtn = $("#savePlayerBtn");

let savedPlayerArray = JSON.parse(localStorage.getItem("savedMVPList")) || [];

renderPlayerBtns();
if (savedPlayerArray.length > 0) {

    let lastMVP = savedPlayerArray[savedPlayerArray.length - 1];
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
    $(".giphyContainer").empty();
    $('#player').empty();

}

savePlayerBtn.on("click", function (event) {
    event.preventDefault();

    if (savedPlayerArray.length < 5) {
        let savedPlayerName = $("#name").text();
        savedPlayerArray.push(savedPlayerName);
        localStorage.setItem("savedMVPList", JSON.stringify(savedPlayerArray));
        resetState();
        renderPlayerBtns();
    } else {
        return;
    }
});

function searchBallDl(x) {
    let queryURL = "https://www.balldontlie.io/api/v1/players?search=" + x;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        // createRow(response);

        savePlayer(response);
        $("#name").text(
            response.data[0].first_name + " " + response.data[0].last_name
        );

        $("#team").text(
            response.data[0].team.full_name
        );


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

// save player function

savePlayerBtn.on("click", function (event) {
    event.preventDefault();
});

function savePlayer(response) {
    let savedPlayerDiv = $("<button>");
    let savedPlayer = "";
    savedPlayer = response.data[0].first_name + " " + response.data[0].last_name;

    // savedPlayerDiv.text(response)
}

function playerStats(x) {
    // let season = "?seasons[]=enterseason"
    let queryURL =
        "https://www.balldontlie.io/api/v1/season_averages?" + "player_ids[]=" + x;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        $("#pts").text("Avg pts: " + response.data[0].pts);
        $("#reb").text("Avg reb: " + response.data[0].reb);
        $("#ast").text("Avg ast: " + response.data[0].ast);
        $("#stl").text("Avg stl: " + response.data[0].stl);
        $("#blk").text("Avg blk: " + response.data[0].blk);
        $("#fg_pct").text("FG %: " + response.data[0].fg_pct);
        $("#fg3_pct").text("3P %: " + response.data[0].fg3_pct);
        $("#ft_pct").text("FT %: " + response.data[0].ft_pct);
        $("#min").text("Avg min: " + response.data[0].min);
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

            let newGif = $("<img>")
            newGif.attr("src", response.data[index].images.downsized_medium.url)
            console.log(response.data[index].images.downsized_medium.url);
            $(".giphyContainer").append(newGif);
        }

    });

}

