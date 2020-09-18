//Feature 1: Display current day and time
function displayDayTime(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let todayDisplay = document.querySelector("#display-today");
  todayDisplay.innerHTML = `As at ${day} ${hours}:${minutes}`;
}

//Feature 2: Display city and temp submitted on form
function displayWeatherGraphic(temp, description) {
  let weatherGraphic = document.querySelector(".weatherGraphic");
  if (temp < -10) {
    weatherGraphic.innerHTML = `<i class="fas fa-temperature-low"></i>`;
  } else if (temp > 35) {
    weatherGraphic.innerHTML = `<i class="fas fa-temperature-high"></i>`;
  } else {
    if (description === `Clear`) {
      weatherGraphic.innerHTML = `<i class="fas fa-sun"></i>`;
    } else if (description === `Clouds`) {
      weatherGraphic.innerHTML = `<i class="fas fa-cloud"></i>`;
    } else if (description === `Snow`) {
      weatherGraphic.innerHTML = `<i class="far fa-snowflake"></i>`;
    } else if (description === `Rain`) {
      weatherGraphic.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
    } else if (description === `Drizzle`) {
      weatherGraphic.innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
    } else if (description === `Thunderstorm`) {
      weatherGraphic.innerHTML = `<i class="fas fa-bolt"></i>`;
    } else {
      weatherGraphic.innerHTML = `<i class="fas fa-smog"></i>`;
    }
  }
}
function displayWeather(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  celsiusTemp = response.data.main.temp;
  let currentDescription = response.data.weather[0].main;
  let windSpeed = response.data.wind.speed;
  let currentHumidity = response.data.main.humidity;
  let location = document.querySelector("#city");
  location.innerHTML = `${city}, ${country}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(celsiusTemp)}°`;
  let description = document.querySelector("#description");
  description.innerHTML = `${currentDescription}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}`;
  displayWeatherGraphic(celsiusTemp, currentDescription);
  displayDayTime(response.data.dt + response.data.timezone);
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  console.log(searchInput);
  let apiKey = "ccbf5e9b7ef0654ec52299eec6a9711b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Feature 3: Add current location button and display temp
function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "ccbf5e9b7ef0654ec52299eec6a9711b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentLocButton = document.querySelector("#currentLoc");
currentLocButton.addEventListener("click", showPosition);

//Feature 4: Farenheit Conversion
function switchFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("inactiveLink");
  fahrenheitLink.classList.add("inactiveLink");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(fahrenheitTemp)}°`;
}
function switchCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("inactiveLink");
  fahrenheitLink.classList.remove("inactiveLink");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}°`;
}

let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");
celsiusLink.addEventListener("click", switchCelsius);
fahrenheitLink.addEventListener("click", switchFahrenheit);
