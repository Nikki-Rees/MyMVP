const savedMVPs = $('#savedMVPs');


//id search bar
// const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.is-info');
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
        createRow(response);
    });
};


function savePlayer() {

}