var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var descrp = document.querySelector('.description')
var temp = document.querySelector('.temp')

button.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=5591d25117b0ee81c97022c7d521410e')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descrpValue = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        descrp.innerHTML = descrpValue;
    })

    .catch(Error => alert("Invalid"))
})


