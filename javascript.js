let appId = '5591d25117b0ee81c97022c7d521410e';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch('http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}').then(result => {
        return SpeechRecognitionResultList.json();
    }).then(result => {
        IntersectionObserver(results);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
        document.body.style.backgroundImage = 'url("Clear.jpg")';
        break;

        case 'Cloudy':
        document.body.style.backgroundImage = 'url("Cloudy.jpg")';
        break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
        document.body.style.backgroundImage = 'url("Rain.jpg")';
        break;

        case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("Storm.jpg")';
        break;

        case 'Snow':
        document.body.style.backgroundImage = 'url("Snow.jpg")';
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

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').nodeValue;
    if(searchTerm)
    searchWeather(searchTerm);
})











// API 

// http://history.openweathermap.org/data/2.5/history/city?q=London,UK&appid={YOUR_API_KEY}   //historical data
// http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt} //UV index
// http://api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={your api key} //5 days forcast
// http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key} // current data
// http://metric api.openweathermap.org/data/2.5/find?q=London&units=metric //metric convertion


// const inputValue = document.querySelector('.inputValue');
// inputValue.addEventListener('keypress', setQuery);

// function setQuery (evt) {
//     if (evt.keyCode == 13) {
//         getResults(inputValue.value);
//     }
// }

// function getResults (query) {
//     fetch('${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}')
//     .then(weather => {
//         return weather.json();
//     }).then(displayResults);
// }

// function displayResults (weather) {
//     let city = document.querySelector('.location .city');
//     city.innerText = '${weather.name}, ${weather.sys.country}';

//     let now = new Date();
//     let date = document.querySelector('.location .date');
//     date.innerText = dateBuilder(now);

//     let temp = document.querySelector('.current .temp');
//     temp.innerHTML = '${Math.round(weather.main.temp)}<span></span>';

//     let weather_el = document.querySelector('.current .weather');
//     weather_el.innerText = weather.weather[0].main;

//     let hilow = document.querySelector('.hi-low');
//     hilow.innerText = '${Math.round(weather.main.temp_min)} c / ${Math.round(weather.main.temp_max)}c';
// }

// function dateBuilder (d) {
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return '${day} ${date} ${month} ${year}';
// }



