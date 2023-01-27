let currentDate = new Date();
let date = document.querySelector(".date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  date.innerHTML = `${day} </br> ${hours} : 0${minutes}`;
} else {
  date.innerHTML = `${day} </br> ${hours} : ${minutes}`;
}

let temperatureUnit = document.querySelector("#temperature-unit");

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("#city-display");
  temperatureUnit.innerHTML = `${temperature}°`;
  cityDisplay.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function findMe(position) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let locationButton = document.querySelector("#locationFinder");
locationButton.addEventListener("click", findMe);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature-unit");
  currentTemperature.innerHTML = temperature;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar");
  let currentCity = document.querySelector("#city-display");
  let apiKey = "d6ee04fc6c97edbbcefb337782707ef1";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showTemperature);
  currentCity.innerHTML = city.value;
}

let searchForCity = document.querySelector("#searchbar-form");
searchForCity.addEventListener("submit", changeCity);
