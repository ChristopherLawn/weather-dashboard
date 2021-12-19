var searchCity = document.querySelector("#user-search");
var clearSearch = document.querySelector("#clear-history");
var clearHistory = function() {
    localStorage.clear();
    var hideCityContainer = document.querySelector("#city-list-container");
        hideCityContainer.classList.add("hide");
    var hideCityContainer = document.querySelector("#city-list-container");
        hideCityContainer.classList.add("hide");
    var hideCurrent = document.getElementById("current-weather-container");
        hideCurrent.classList.add("hide");
    var hideFiveTitle = document.getElementById("five-day-title");
        hideFiveTitle.classList.add("hide");
    var hideFiveCards = document.getElementById("five-day-cards");
        hideFiveCards.classList.add("hide");
    document.location.reload(true);
}

var citySearchEl = document.querySelector("#cityname");
var citySearchContainerEl = document.querySelector("#city-list");
var citySearchTerm = document.querySelector("#city-search-term");
var citySearchArray;
if (localStorage.getItem("city-list")) {
    var unhideClearHistory = document.querySelector("#clear-history");
        unhideClearHistory.classList.remove("hide");
    var unhideSearchHistory = document.getElementById("search-history-title")
        unhideSearchHistory.classList.remove("hide");
    citySearchArray = JSON.parse(localStorage.getItem("city-list"));
    citySearchArray.forEach(element => {
        var cityEl = document.createElement("li");
        cityEl.classList = "btn btn:hover col-lg-3 col-md-3 col-sm-12";
        cityEl.textContent = element;
        cityEl.addEventListener("click", function(event) {
        findCity(event.target.textContent)
        });
        citySearchContainerEl.appendChild(cityEl);
    });
} else {
    citySearchArray = [];
};


var citySubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = citySearchEl.value.trim();
    console.log(cityName);

    if (cityName) {
        findCity(cityName);

        // clear old content
        citySearchEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};


var findCity = function(cityInput) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+",,&units=imperial&appid=e843da64771fc78ef6dbf9ad46b3939d";
  
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&units=imperial&appid=e843da64771fc78ef6dbf9ad46b3939d")
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(additionaldata) {
                console.log(additionaldata);
                displayCities(data.name);
                showCityWeather(data, additionaldata);
                showFiveDayOne(data, additionaldata);
                showFiveDayTwo(data, additionaldata);
                showFiveDayThree(data, additionaldata);
                showFiveDayFour(data, additionaldata);
                showFiveDayFive(data, additionaldata);
                })};
            });
            });
        } else {
            alert('Error: City Not Found!  Please use format "City" (E.g. Portland) or "City, State" (E.g. Portland, OR) or "City, State, Country" (E.g. Portland, OR, US)');
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Weather Dashboard");
    });
};

var displayCities = function(cityNameButton) {
            let inArray = false;
            for(let i = 0; i < citySearchArray.length; i++){
                if(citySearchArray[i] === cityNameButton){
                    inArray = true;
                }
            }
            if(!inArray){
                citySearchArray.push(cityNameButton);
                var cityEl = document.createElement("li");
                cityEl.classList = "btn btn:hover col-lg-3 col-md-3 col-sm-12";
                cityEl.textContent = cityNameButton;
                cityEl.addEventListener("click", function(event) {
                findCity(event.target.textContent)
                });
                citySearchContainerEl.appendChild(cityEl);
                localStorage.setItem("city-list", JSON.stringify(citySearchArray));
                console.log(cityEl);
                console.log(citySearchArray);
            }
};


var showCityWeather = function(data, weatherData) {
var currentCityWeather = document.querySelector("#current-weather-container");
var unhideClearHistory = document.querySelector("#clear-history");
    unhideClearHistory.classList.remove("hide");
var unhideCityContainer = document.querySelector("#city-list-container");
    unhideCityContainer.classList.remove("hide");
var unhideSearchHistory = document.getElementById("search-history-title")
    unhideSearchHistory.classList.remove("hide");
var unhideCurrent = document.getElementById("current-weather-container")
    unhideCurrent.classList.remove("hide");
var unhideFiveTitle = document.getElementById("five-day-title")
    unhideFiveTitle.classList.remove("hide");
var unhideFiveCards = document.getElementById("five-day-cards")
    unhideFiveCards.classList.remove("hide");
var uviColor = console.log(weatherData.current.uvi);
if ((weatherData.current.uvi) < 6) {uviColor="uv-moderate"};
if ((weatherData.current.uvi) < 3) {uviColor="uv-low"};
if ((weatherData.current.uvi) > 6) {uviColor="uv-high"};
currentCityWeather.innerHTML = `<h1>${data.name}</h1>
    <h3>${(moment().format('MMM Do YYYY'))}</h3>
    <img src="http://openweathermap.org/img/wn/${(weatherData.current.weather[0].icon)}@2x.png"></img>
    <p>Temp: ${(weatherData.current.temp)}°F</p>
    <p>Humidity: ${(weatherData.current.humidity)}%</p>
    <p>Wind Speed: ${(weatherData.current.wind_speed)} MPH</p>
    <p class="${uviColor}">UVI Index: ${(weatherData.current.uvi)}</p>`     
} 

var showFiveDayOne = function(data, weatherData) {
    var fiveDayOne = document.querySelector("#five-day-one");
    fiveDayOne.innerHTML =
        `<h2>${(moment().add(1,'days').format('MMM Do YYYY'))}</h2>
        <img src="http://openweathermap.org/img/wn/${(weatherData.daily[0].weather[0].icon)}@2x.png"></img>
        <p>Temp: ${(weatherData.daily[0].temp.day)}°F</p>
        <p>Wind Speed: ${(weatherData.daily[0].wind_speed)} MPH</p>
        <p>Humidity: ${(weatherData.daily[0].humidity)}%</p>` 
    }
    
var showFiveDayTwo = function(data, weatherData) {
    var fiveDayTwo = document.querySelector("#five-day-two");
    fiveDayTwo.innerHTML =
        `<h2>${(moment().add(2,'days').format('MMM Do YYYY'))}</h2>
        <img src="http://openweathermap.org/img/wn/${(weatherData.daily[1].weather[0].icon)}@2x.png"></img>
        <p>Temp: ${(weatherData.daily[1].temp.day)}°F</p>
        <p>Wind Speed: ${(weatherData.daily[1].wind_speed)} MPH</p>
        <p>Humidity: ${(weatherData.daily[1].humidity)}%</p>` 
    }

var showFiveDayThree = function(data, weatherData) {
    var fiveDayThree = document.querySelector("#five-day-three");
    fiveDayThree.innerHTML =
        `<h2>${(moment().add(3,'days').format('MMM Do YYYY'))}</h2>
        <img src="http://openweathermap.org/img/wn/${(weatherData.daily[2].weather[0].icon)}@2x.png"></img>
        <p>Temp: ${(weatherData.daily[2].temp.day)}°F</p>
        <p>Wind Speed: ${(weatherData.daily[2].wind_speed)} MPH</p>
        <p>Humidity: ${(weatherData.daily[2].humidity)}%</p>` 
    }

var showFiveDayFour = function(data, weatherData) {
    var fiveDayFour = document.querySelector("#five-day-four");
    fiveDayFour.innerHTML =
        `<h2>${(moment().add(4,'days').format('MMM Do YYYY'))}</h2>
        <img src="http://openweathermap.org/img/wn/${(weatherData.daily[3].weather[0].icon)}@2x.png"></img>
        <p>Temp: ${(weatherData.daily[3].temp.day)}°F</p>
        <p>Wind Speed: ${(weatherData.daily[3].wind_speed)} MPH</p>
        <p>Humidity: ${(weatherData.daily[3].humidity)}%</p>` 
    }

var showFiveDayFive = function(data, weatherData) {
    var fiveDayFive = document.querySelector("#five-day-five");
    fiveDayFive.innerHTML =
        `<h2>${(moment().add(5,'days').format('MMM Do YYYY'))}</h2>
        <img src="http://openweathermap.org/img/wn/${(weatherData.daily[4].weather[0].icon)}@2x.png"></img>
        <p>Temp: ${(weatherData.daily[4].temp.day)}°F</p>
        <p>Wind Speed: ${(weatherData.daily[4].wind_speed)} MPH</p>
        <p>Humidity: ${(weatherData.daily[4].humidity)}%</p>` 
    }

searchCity.addEventListener("submit", citySubmitHandler);

clearSearch.addEventListener("click", clearHistory);