// const APIkey = "&api_key=J6pBLGX38uKv9oFHUNmKpHbDAvpQ1r1K";
const savedMVPs = $('#savedMVPs');
const savePlayerBtn = $('#savePlayerBtn');


//id search bar
// const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector("#search-btn");
// declare variable with search bar value


//declare ball don't lie api variable

searchBtn.addEventListener('click', function (event) {
    let playerName = $('.input').val();
    event.preventDefault();
    console.log(playerName)

    searchBallDl(playerName);

})



function searchBallDl(x) {
    let queryURL = "https://www.balldontlie.io/api/v1/players?search=" + x;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // createRow(response);
        savePlayer(response);
        $("#currentPlayer").text(response.data[0].first_name + " " + response.data[0].last_name);
        $("#height").text("Height: " + response.data[0].height_feet + "ft " + response.data[0].height_inches + ("in"));
        $("#weight").text("Weight: " + response.data[0].weight_pounds);
        $("#position").text("Position: " + response.data[0].position);

        playerStats(response.data[0].id);

    });
};



//player card Function





// save player function

savePlayerBtn.on('click', function (event) {
    event.preventDefault();

})

function savePlayer(response) {
    let savedPlayerDiv = $('<button>');
    let savedPlayer = "";
    savedPlayer = response.data[0].first_name + " " + response.data[0].last_name;
    console.log(savedPlayer);
    // savedPlayerDiv.text(response)

}

function playerStats(x) {
    // let season = "?seasons[]=enterseason"
    let queryURL = "https://www.balldontlie.io/api/v1/season_averages?" + "player_ids[]=" + x;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {


        $("#pts").text("Avg pts: " + response.data[0].pts);
        $("#reb").text("Avg reb: " + response.data[0].reb);
        $("#ast").text("Avg ast: " + response.data[0].ast);
        $("#stl").text("Avg stl: " + response.data[0].stl);
        $("#blk").text("Avg blk: " + response.data[0].blk);
        $("#fg_pct").text("FG %: " + response.data[0].fg_pct + "%");
        $("#fg3_pct").text("3P %: " + response.data[0].fg3_pct + "%");
        $("#ft_pct").text("FT %: " + response.data[0].ft_pct + "%");
        $("#min").text("Avg min: " + response.data[0].min);
        $("#season").text("Season: " + response.data[0].season);
    })

}




// const queryURL =
//   "http://api.giphy.com/v1/gifs/search?q=" + playerName + APIkey + "&limit=5";
// $.ajax({
//   url: queryURL,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
//   $("#currentImage").append(response);
// });