import {
  toPascalCase,
  monthsNumberToLetter,
  daysNumberToLetter,
  fahrenheitToCelsius,
} from "./utils/converter/index.js";

import {
  getIconWeatherByTag,
  getMainWeatherTag,
} from "./utils/weather_data/index.js";

import { days_forecast_data, weather_data, weather_icon } from "./api/index.js";

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

    weather_data.weather_icon = getIconWeatherByTag(
      getMainWeatherTag(result.days[0])
    );

    weather_data.city = toPascalCase(city);
    weather_data.date = `${daysNumberToLetter(
      result.days[0]
    )}, ${monthsNumberToLetter(result.days[0])} ${curr_day}, ${curr_month}`;

    weather_data.uv_index = result.days[0].uvindex;
    weather_data.weather = getMainWeatherTag(result.days[0]);
    weather_data.humidity = `${result.days[0].humidity.toFixed(0)}%`;
    weather_data.wind_speed = `${result.days[0].windspeed}Km/h`;

    // forecast_data :
    days_forecast_data.length = 0;
    for (let i = 0; i < 5; i++) {
      days_forecast_data.push({
        day: daysNumberToLetter(result.days[i]).slice(0, 3),
        weather: getMainWeatherTag(result.days[i]),
        icon: getIconWeatherByTag(getMainWeatherTag(result.days[i])),
        temp: `${fahrenheitToCelsius(
          result.days[i].tempmin
        )}°c ${fahrenheitToCelsius(result.days[i].tempmax)}°c`,
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

input_dom.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchValue = document.querySelector(".search");

  if (!searchValue.value.trim() || !isNaN(searchValue.value.trim())) {
    return;
  }

  if (await tryLoadWeatherFromCity(searchValue.value)) {
    searchValue.value = "";

    const card_left_container = document.querySelector(".card_current_weather");
    const cards_right_container = document.querySelector(
      ".container_cards_right"
    );
    const dom_current_datetime = document.getElementById("datetime");
    const dom_current_img_weather = document.getElementById(
      "current_img_weather"
    );
    const dom_current_degree = document.getElementById(
      "current_weather_degree"
    );
    const dom_current_min_max_degree = document.getElementById(
      "current_weather_min_max_degree"
    );

    const dom_detail_wind_speed = document.getElementById("wind_speed");
    const dom_detail_humidity = document.getElementById("humidity");
    const dom_detail_uv_index = document.getElementById("uv_index");

    const forecastItems = document.querySelectorAll(
      ".wrapper_forecast_weather li"
    );

    card_left_container.style.display = "flex";
    cards_right_container.style.display = "flex";

    // Current weather card data :
    dom_current_datetime.textContent = weather_data.date;
    dom_current_img_weather.src = weather_data.weather_icon;
    dom_current_degree.textContent = weather_data.current_degree;
    dom_current_min_max_degree.textContent = `${weather_data.degree_min.toLowerCase()} / ${weather_data.degree_max.toLowerCase()} | ${
      weather_data.weather
    }`;

    // Detail weather data :
    dom_detail_wind_speed.textContent = weather_data.wind_speed;
    dom_detail_humidity.textContent = weather_data.humidity;
    dom_detail_uv_index.textContent = weather_data.uv_index;

    // Forecast weather data :
    forecastItems.forEach((item, index) => {
      const data = days_forecast_data[index];

      if (data) {
        const dayEl = item.querySelector("p:nth-of-type(1)");
        const imgEl = item.querySelector("img");
        const weatherEl = item.querySelector("p:nth-of-type(2)");
        const tempEl = item.querySelector("p:nth-of-type(3)");

        dayEl.textContent = data.day;
        imgEl.src = data.icon;
        imgEl.alt = data.weather.toLowerCase();
        weatherEl.textContent = data.weather;
        tempEl.textContent = data.temp;
      }
    });
  }
});
