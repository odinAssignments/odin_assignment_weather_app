import {
  toPascalCase,
  monthsNumberToLetter,
  daysNumberToLetter,
  fahrenheitToCelsius,
} from "./utils/converter/index.js";

import { getMainWeatherTag } from "./utils/weather_data/index.js";

import { weather_data, weather_icon } from "./api/index.js";

export async function tryLoadWeatherFromCity(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline//${city}?key=TCZG9GXBM96ZN8UAYUV7HV3C8`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const curr_day = result.days[0].datetime.split("-")[2];
    const curr_month = result.days[0].datetime.split("-")[0];

    // weather_data :
    weather_data.current_degree = `${fahrenheitToCelsius(
      result.days[0].temp
    )}°C`;
    weather_data.degree_min = `${fahrenheitToCelsius(
      result.days[0].tempmin
    )}°C`;
    weather_data.degree_max = `${fahrenheitToCelsius(
      result.days[0].tempmax
    )}°C`;

    weather_data.city = toPascalCase(city);
    weather_data.date = `${daysNumberToLetter(
      result.days[0]
    )}, ${monthsNumberToLetter(result.days[0])} ${curr_day}, ${curr_month}`;

    weather_data.uv_index = result.days[0].uvindex;
    weather_data.weather = getMainWeatherTag(result.days[0]);
    weather_data.humidity = `${result.days[0].humidity.toFixed(0)}%`;
    weather_data.wind_speed = `${result.days[0].windspeed}Km/h`;

    // forecast_data :
    const days_forecast_data = [];
    for (let i = 0; i < 5; i++) {
      days_forecast_data.push({
        day: daysNumberToLetter(result.days[i]).slice(0, 3),
        weather: getMainWeatherTag(result.days[i]),
        tempMin: `${fahrenheitToCelsius(result.days[i].tempmin)}°C`,
        tempMax: `${fahrenheitToCelsius(result.days[i].tempmax)}°C`,
      });
    }

    console.log("----------- Today's Weather  -----------");
    console.log(weather_data.date);
    console.log("current degree :", weather_data.current_degree);
    console.log("degree min : ", weather_data.degree_min);
    console.log("degree max : ", weather_data.degree_max);
    console.log("weather : ", weather_data.weather);

    console.log("----------- Today's Weather Details -----------");
    console.log("humidity :", weather_data.humidity);
    console.log("winds speed :", weather_data.wind_speed);
    console.log("uv index :", weather_data.uv_index);

    console.log("----------- Forecast for 5 days -----------");
    console.log("days_forecast_data : ", days_forecast_data);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const input_dom = document.querySelector(".container_form");

input_dom.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = document.querySelector(".search");

  if (!searchValue.value.trim() || !isNaN(searchValue.value.trim())) {
    return;
  }

  if (tryLoadWeatherFromCity(searchValue.value)) {
    searchValue.value = "";

    const card_left_container = document.querySelector(".card_current_weather");
    const cards_right_container = document.querySelector(
      ".container_cards_right"
    );

    card_left_container.style.display = "flex";
    cards_right_container.style.display = "flex";

    // todo fill the data...
  }
});
