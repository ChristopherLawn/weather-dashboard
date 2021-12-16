var searchCity = document.querySelector("#user-search");
var citySearchEl = document.querySelector("#cityname");
var citySearchContainerEl = document.querySelector("#city-list");
var citySearchTerm = document.querySelector("#city-search-term");
var citySearchArray = [];
function removeDuplicates(citySearchArray) {
    let unique = [];
    citySearchArray.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element)
        }
    })
    return unique;
}
// console.log(removeDuplicates(citySearchArray));

var citySubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = citySearchEl.value.trim();
    console.log(cityName);

    if (cityName) {
        findCity(cityName);

        // clear old content
        // citySearchContainerEl.textContent = "";
        citySearchEl.value = "";
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
                displayCities(data.name);
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
                localStorage.setItem("city-list", cityNameButton);
                // localStorage.setItem("ul", cityNameButton);
                console.log(cityEl);
                console.log(citySearchArray);
            }
            
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
};



searchCity.addEventListener("submit", citySubmitHandler);