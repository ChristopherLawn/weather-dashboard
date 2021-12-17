var searchCity = document.querySelector("#user-search");
var citySearchEl = document.querySelector("#cityname");
var citySearchContainerEl = document.querySelector("#city-list");
var citySearchTerm = document.querySelector("#city-search-term");
var citySearchArray;
if (localStorage.getItem("city-list")) {
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
currentCityWeather.innerHTML = `<h1>${data.name}</h1>
    <p>Temp: ${(weatherData.current.temp)}°F</p>
    <p>Humidity: ${(weatherData.current.humidity)}%</p>
    <p>Wind Speed: ${(weatherData.current.wind_speed)} MPH</p>
    <p>UVI Index: ${(weatherData.current.uvi)}</p>` 
} 


searchCity.addEventListener("submit", citySubmitHandler);



// var citySearchArrayJson = JSON.parse(citySearchArray);
// citySearchArray = ["boston", "miami", "portland"]

// localStorage.setItem("city-list", JSON.stringify(citySearchArray));

// function removeDuplicates(citySearchArrayParameter) {
//     let unique = [];
//     citySearchArrayParameter.forEach(element => {
//         if (!unique.includes(element)) {
//             unique.push(element)
//         }
//     })
//     return unique;
// }
// console.log(removeDuplicates(citySearchArray));

// var apiURL = "https://api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}"

//     // create user search history array
//     // if (cities.length === 0) {
//     //     citySearchContainerEl.textContent = "No cities found.";
//     //     return;
//     // }

//     // citySearchTerm.textContent = searchTerm;

//     // loop over repos
//     // for (var i = 0; i < cities.length; i++) {
//     //     // format repo name
//     //     var cityName = cities[i];

//         // var cityName = citySearchEl.value.trim();
//         document.body.appendChild(citySearchContainerEl)

        // city search array
        // var cityCounter = 0;
        // for (i = 0; i < citySearchArray.length; i++) {
        //     if (citySearchArray[i] === cityNameButton) {
        //         cityCounter++
        //     }
        // };
        // if (cityCounter === 0) {

// }
        
// create button for each city

        

//         // // create a span element to hold repository name
//         // var titleEl = document.createElement("span");
//         // titleEl.textContent = repoName;

//         // append to container
//         // cityEl.appendChild("#city-list-container");

//         // // create a status element
//         // var statusEl = document.createElement("span");
//         // statusEl.classList = "flex-row align-center";

//         // // check if current repo has issues or not
//         // if (repos[i].open_issues_count > 0) {
//         //     statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//         // } else {
//         //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//         // }
        
//         // // append to container
//         // repoEl.appendChild(statusEl);

//         // append container to the DOM
        
//     // };

// var cityEl = document.createElement("li");
// cityEl.classList = "btn btn:hover col-lg-3 col-md-3 col-sm-12";
// cityEl.textContent = cityNameButton;
// cityEl.addEventListener("click", function(event) {
// findCity(event.target.textContent)
// });
// citySearchContainerEl.appendChild(cityEl);

// var populateCityList = function() {
//     // var cityList = JSON.parse(localStorage.getItem("city-list"));
//     var cityList = localStorage.getItem("city-list");
//     for (i = 0; i < cityList.length; i++);
//     if (cityList.length >= 0) {
//         cityList.forEach((value) => {
//             var cityEl = document.createElement("li");
//             cityEl.classList = "btn btn:hover col-lg-3 col-md-3 col-sm-12";
//             cityEl.textContent = cityNameButton;
//             cityEl.addEventListener("click", function(event) {
//             findCity(event.target.textContent)
//             });
//             citySearchContainerEl.appendChild(cityEl);
//         })
//     }
// ;}