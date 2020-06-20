let appId = '74f6c0605d6d3bd672ec44e693f063f5';
let units = 'metric';
let searchMethod;
let uvIndex;
let lat = 'response.coord.lat';
let lon = 'response.coord.lon';

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function getUvIndex(uvIndex) {
    if (uvIndex <= 3) {
                bgcolor = "green";
            }
            else if (uvIndex >= 3 || uvIndex <= 6) {
                bgcolor = "yellow";
            }
            else if (uvIndex >= 6 || uvIndex <= 8) {
                bgcolor = "orange";
            }
            else {
                bgcolor = "red";
            }
}

function searchUv(uvIndex) {
    getUvIndex(uvIndex);
    fetch(`https://api.openweathermap.org/data/2.5/uvi?${uvIndex}=${response}&APPID=${appId}&lat=${lat}&lon=${lon}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
    
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    let uvIndexElement = document.getElementById('uvIndex');  
    let cityDate = document.getElementById('cityDate');  
    
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    cityDate.innerHTML = moment().format("dddd, MMMM Do YYYY, h:mm a");
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176C';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    uvIndexElement.innerHTML = 'UV Index: ';
    
    setPositionForHeaderInfo();
}
   
function setPositionForHeaderInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = 'calc(50% - ${weatherContainerWidth/2}px';
    weatherContainer.style.top = 'calc(50% - ${weatherContainerHeight/1.3}px';
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})





// API 

// http://history.openweathermap.org/data/2.5/history/city?q=London,UK&appid={YOUR_API_KEY}   //historical data
// http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt} //UV index
// http://api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={your api key} //5 days forcast
// http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key} // current data
// http://metric api.openweathermap.org/data/2.5/find?q=London&units=metric //metric convertion






