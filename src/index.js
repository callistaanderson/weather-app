//Feature 1: Display current day and time
function displayDayTime(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}
let todayDisplay = document.querySelector("#display-today");
todayDisplay.innerHTML = displayDayTime(new Date());

//Feature 2: Display city and temp submitted on form
function displayWeather(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  let currentTemp = Math.round(response.data.main.temp);
  let location = document.querySelector("#city");
  location.innerHTML = `${city}, ${country}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${currentTemp}°`;
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
