let now = new Date();

let date = now.getDate();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguts",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${date} ${month} </br> ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showLocation(position) {
  let apiKey = "eae061c95483dd066657bfc7525418ed";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${temperature}`;
  let cityName = response.data.name;
  let country = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}, ${country}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  /*let feelslike = document.querySelector("#feelslike");
  feelslike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}`;*/
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#current-temp");
locationButton.addEventListener("click", getCurrentPosition);

function searchCity(city) {
  let apiKey = "eae061c95483dd066657bfc7525418ed";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = ` ${temperature}`;
  let cityName = response.data.name;
  let country = response.data.sys.country;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}, ${country}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;

  /* let feelslike = document.querySelector("#feelslike");
  feelslike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;*/
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("London");
