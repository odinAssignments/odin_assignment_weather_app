const weather_data = {
  city: "",
  time: "",
  date: "",
  current_degree: "",
  degree_min: "",
  degree_max: "",
  weather_icon: "",
  weather: "",
  rain_prob: "",
  wind_speed: "",
  humidity: "",
  uv_index: 0,
};

const forecast_data = [
  {
    day: "",
    weather: "",
    degree_min: "",
    degree_max: "",
  },
];

function toPascalCase(str) {
  if (typeof str == "string") {
    return str
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  return str;
}

function monthsNumberToLetter(data) {
  const date = new Date(data.datetime);
  const month = date.getMonth();

  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return month;
  }
}

function daysNumberToLetter(data) {
  const date = new Date(data.datetime);
  const day = date.getDay();

  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid";
  }
}

function fahrenheitToCelsius(f) {
  return (((f - 32) * 5) / 9).toFixed(0);
}

async function loadWeatherFromCity(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline//${city}?key=SECRET`;
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
    weather_data.city = toPascalCase("united state");
    weather_data.date = `${daysNumberToLetter(
      result.days[0]
    )}, ${monthsNumberToLetter(result.days[0])} ${curr_day}, ${curr_month}`;

    console.log(weather_data.date);

    console.log("current degree :", weather_data.current_degree);
    console.log("degree min : ", weather_data.degree_min);
    console.log("degree max : ", weather_data.degree_max);

    console.log(result);
    // console.log(result);
    // console.log(result.currentConditions);
  } catch (error) {
    console.log(error);
  }
}

loadWeatherFromCity("texas");
