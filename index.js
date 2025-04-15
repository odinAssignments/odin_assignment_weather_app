import {
  toPascalCase,
  monthsNumberToLetter,
  daysNumberToLetter,
  fahrenheitToCelsius,
} from "./utils/converter/index.js";

import { getMainWeatherTag } from "./utils/weather_data/index.js";

import { weather_data, forecast_data, weathers_icon } from "./api/index.js";

export async function loadWeatherFromCity(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline//${city}?key=Secret`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const curr_day = result.days[0].datetime.split("-")[2];
    const curr_month = result.days[0].datetime.split("-")[0];

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

    weather_data.weather = getMainWeatherTag(result.days[0]);

    console.log(weather_data.date);

    console.log("current degree :", weather_data.current_degree);
    console.log("degree min : ", weather_data.degree_min);
    console.log("degree max : ", weather_data.degree_max);
    console.log("weather : ", weather_data.weather);

    console.log(result);
    // console.log(result);
    // console.log(result.currentConditions);
  } catch (error) {
    console.log(error);
  }
}

loadWeatherFromCity("Namibie");
