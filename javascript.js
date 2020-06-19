var button = document.querySelector('.button')
var inputvalue = document.querySelector('.inputvalue')
var name = document.querySelector('.name')
var descrp = document.querySelector('.description')
var temp = document.querySelector('.temp')

button.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid=5591d25117b0ee81c97022c7d521410e')
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(Error => alert("Invalid"))
})


