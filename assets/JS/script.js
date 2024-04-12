let url ="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=3f067e2ae06f31d1c39bb54fb5e3a57a";
let urlForecast ="https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=3f067e2ae06f31d1c39bb54fb5e3a57a";
let cityList = JSON.parse(localStorage.getItem("cityList")) || [];


// function that sets city into local storage//
function setCity(event) {
  event.preventDefault();
  let city = $("#city").val();
  cityList.push(city);
  localStorage.setItem("cityList", JSON.stringify(cityList));
  console.log(city);
  renderSearchHistory();
}

// function that retrieves searched city//
function getCity() {
  let city = document.getElementById("city").value;
  console.log(city);

  let findCity = url.replace("{city name}", city);
  console.log(findCity);

  fetch(findCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $("#city-name").text(data.name)
      $("#current-temp").text(`Temp: ${data.main.temp}`)
      $("#current-humidity").text(`Humidity: ${data.main.humidity}`)
      $("#current-wind").text(`Wind Speed: ${data.wind.speed}`)


    });
}

function getForecast() {
  let city = document.getElementById("city").value;
  console.log(city);

  let findCity = urlForecast.replace("{city name}", city);
  console.log(findCity);

  fetch(findCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const selectedData = [
        data.list[0],
        data.list[8],
        data.list[16],
        data.list[24],
        data.list[32],
      ]

      renderFiveDays(selectedData)
    });
}


function renderFiveDays(selectedData) {
  console.log("rendering five cards!")

  console.log(selectedData)

  for(data of selectedData) {
    const cardDiv = $("<div>");
    cardDiv.addClass("card");
    cardDiv.attr("style", "width: 19%;");
  
    cardDiv.html(`
      <div class="card-header">${data.dt_txt}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Temp: ${data.main.temp}</li>
        <i class="list-group-item">Humidity: ${data.main.humidity}</i>
        <li class="list-group-item">Wind Speed: ${data.wind.speed}</li>
      </ul>
    `)
  
    $("#5-day").append(cardDiv)
  }

  




}



//create city searched history//
// let searchHistory = JSON.parse(localStorage.getItem("city")) || [];
// let citySearch = document.getElementById("city");

function renderSearchHistory() {
  const cityCard = $(`
  <div class="container row">
      <h3 id=${city} class="col-11 bg-light d-flex justify-content-center border border-primary rounded fs-5 search-history" > ${city} </h3>
      <button type="button" class="col align-self-center d-flex btn-close" aria-label="Close"></button>    
  </div>`);
}


// function myFunc1() {
//   console.log('First function')
//   myFunc2()
// }

// function myFunc2() {
//   console.log('Second function')
// }

// $("#cityForm").on("submit", myFunc1)


$("#cityForm").on("submit", function (event) {
  event.preventDefault();
  setCity(event)
  getCity()
  getForecast()
})

// $("#cityForm").on("submit", 
// function (event) {
//   event.prventDefault();
//   setCity
//   getCity()
// }
// );


// $("#search-history").on("click", function (event) {
//   event.prventDefault();
//   setCity();
//   getCity();
// });

