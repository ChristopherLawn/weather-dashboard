var searchInputEl = document.querySelector("#cityname");
var searchCity = document.querySelector("#user-form");
var searchContainerEl = document.querySelector("#city-container");

var citySubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // // get value from input element
    var cityName = searchInputEl.value.trim();
    console.log(cityName);

    if (cityName) {
        findCity(cityName);

        // clear old content
        searchContainerEl.textContent = "";
        searchInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

var findCity = function(cityInput) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+",,&appid=e843da64771fc78ef6dbf9ad46b3939d";

    // var apiURL = "https://api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}"
  
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert('Error: City Not Found!  Please use format "City" (E.g. Portland) or "City, State" (E.g. Portland, OR) or "City, State, Country" (E.g. Portland, OR, US)');
        }
    });
};

searchCity.addEventListener("submit", citySubmitHandler);