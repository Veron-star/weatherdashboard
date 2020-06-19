const api = {
    key: "5591d25117b0ee81c97022c7d521410e",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const inputValue = document.querySelector('.inputValue');
inputValue.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults(inputValue.value);
    }
}

function getResults (query) {
    fetch('${api.base}weather?q=${query}&units=metric&APPID=${api.key}')
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}







