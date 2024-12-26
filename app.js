import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
  if (!data) return;
  const weatherJSX = `
      <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
      <img alt="weather icons"
        src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"
        
      />
      <span>${data.weather[0].main}</span>
      <p>${Math.round(data.main.temp)} ℃</p>
    </div>
    <div id="info">
      <p>Humidity: <span>${data.main.humidity}%</span></p>
      <p>wind speed: <span>${data.wind.speed}m/s</span></p>
    </div>
    
  `;
  weatherContainer.innerHTML = weatherJSX;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather = (data) => {
  if (!data) return;

  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
    <div>
      <img
        src="http://openweathermap.org/img/w/${i.weather[0].icon}.png"
        alt="weather icon"
      />
      <h3>${getWeekDay(i.dt)}</h3>
      <p>${Math.round(i.main.temp)}</p>
      <span>${i.weather[0].main}</span>
    </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    showModal("Please enter city name");
  }
  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const foreCastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(foreCastData);
};

const errorCallback = (error) => {
  showModal(error);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your browser does not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchHandler();
  }
});
const initHandler = async () => {
  const currentData = await getWeatherData("current", "malard");
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "malard");
  renderForecastWeather(forecastData);
};
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
