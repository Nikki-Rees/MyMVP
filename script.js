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

// playerStats(response.id) {
    //eg link "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237"
    // let season = "?seasons[]=enterseason"
    // let queryURL = `https://www.balldontlie.io/api/v1/season_averyages${response.id}`
    // console.log(reponse.id)
    // console.log(queryURL)
// {
//   "data": [
//     {
//       "games_played":37,
//       "player_id":237,
//       "season":2018,
//       "min":"34:46",
//       "fgm":9.92,
//       "fga":19.22,
//       "fg3m":2.05,
//       "fg3a":5.73,
//       "ftm":5.08,
//       "fta":7.54,
//       "oreb":0.95,
//       "dreb":7.59,
//       "reb":8.54,
//       "ast":7.38,
//       "stl":1.32,
//       "blk":0.65,
//       "turnover":3.49,
//       "pf":1.59,
//       "pts":26.97,
//       "fg_pct":0.516,
//       "fg3_pct":0.358,
//       "ft_pct":0.674
//     }
//   ]
// }
// }


// const queryURL =
//   "http://api.giphy.com/v1/gifs/search?q=" + playerName + APIkey + "&limit=5";
// $.ajax({
//   url: queryURL,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
//   $("#currentImage").append(response);
// });