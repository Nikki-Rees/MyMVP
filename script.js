//id search bar
const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.is-info');
// declare variable with search bar value
const player = searchInput.value;

//declare ball don't lie api variable

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(player);
})