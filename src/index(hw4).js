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

//Feature 2: Display city submitted on form
function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

//Feature 3: Alternate C to F
function switchCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "14°";
}
function switchFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "57°";
}
let celsiusLink = document.querySelector("#celsius");
let farenheitLink = document.querySelector("#farenheit");
celsiusLink.addEventListener("click", switchCelsius);
farenheitLink.addEventListener("click", switchFarenheit);
