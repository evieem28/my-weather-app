let now = new Date();
let h2 = document.querySelector("h2");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
h2.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
  
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
           <div class="weather-forecast-date">${day}</div>
<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="42"/>
<div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 22° </span>
          <span class="weather-forecast-temperature-min"> 16° </span>
            </div>
      </div>
    </div>
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
           <div class="weather-forecast-date">Sun</div>
<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="42"/>
<div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 22° </span>
          <span class="weather-forecast-temperature-min"> 16° </span>
            </div>
      </div>
    </div>
  `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#display-temp");
  h1.innerHTML = `${temperature}°C`;
  let cityDisplay = document.querySelector("#display-city");
  cityDisplay.innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function city(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search");
  let cityDisplay = document.querySelector("#display-city");
  cityDisplay.innerHTML = citySearch.value;
  let apiKey = "068cbf4b37e3ff950b253f0b64177940";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#enter-city");
form.addEventListener("submit", city);

function showPosition(position) {
  let showLatitude = position.coords.latitude;
  let showLongitude = position.coords.longitude;
  let apiKey = "068cbf4b37e3ff950b253f0b64177940";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${showLatitude}&lon=${showLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);


