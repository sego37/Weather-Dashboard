let url ="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3f067e2ae06f31d1c39bb54fb5e3a57a";
const cityHistory = document.getElementById("city");


// function that sets city into local storage//
function setCity() {
  let city = document.getElementById("city").val();
  localStorage.setItem("city", JSON.stringify(city));
  console.log(city);
}

// function that retrieves searched city//
function getCity() {
  let city = document.getElementById("city").val();
  console.log(city);

  let findCity = url.replace("{city name}", city);
  console.log(findCity);

  fetch(findCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//create city searched history//
let searchHistory = JSON.parse(localStorage.getItem("city")) || [];
let citySearch = document.getElementById("city");

function renderSearchHistory() {
  const cityCard = $(`<div class="container row">
    <h3 id="search-history" class="col-11 bg-light d-flex justify-content-center border border-primary rounded fs-5" > "${city}" </h3>
    <button type="button" class="col align-self-center d-flex btn-close" aria-label="Close"></button>    
  </div>`);
}

$(document).ready(function () {
  $("#submit").on("click", getCity);
});
