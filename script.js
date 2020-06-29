const savedMVPs = $('#savedMVPs');
const savePlayerBtn = $('#savePlayerBtn');


//id search bar
// const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector("#search-btn");
// declare variable with search bar value


//declare ball don't lie api variable

searchBtn.addEventListener('click', function(event) {
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
    }).then(function(response) {
        console.log(response);
        // createRow(response);
        savePlayer(response);
    });
};



//player card Function






// save player function

savePlayerBtn.on('click', function(event) {
    event.preventDefault();

})

function savePlayer(response) {
    let savedPlayerDiv = $('<button>');
    let savedPlayer = "";
    savedPlayer = response.data[0].first_name + " " + response.data[0].last_name;
    console.log(savedPlayer);
    // savedPlayerDiv.text(respon)

}