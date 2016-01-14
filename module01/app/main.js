import $ from 'jquery';
$('h1').css({'color': 'red'});

var result = fetch('http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=2de143494c0b295cca9337e1e96b00e0');

result.then(function(response){
  return response.json();
}).then(function(json) {
  $('#weather').text(json.weather[0].description);
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
