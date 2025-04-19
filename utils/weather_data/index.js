import { weather_icon } from "../../api/index.js";

export function getMainWeatherTag(data) {
  const conditions = data.conditions.toLowerCase();

  if (conditions.includes("rain")) return "Rain";
  if (conditions.includes("snow")) return "Snow";
  if (data.cloudcover >= 70) return "Cloudy";

  return "Sunny";
}

export function getIconWeatherByTag(tag) {
  switch (tag.toLowerCase()) {
    case "rain":
      return weather_icon.rain;
    case "cloud":
      return weather_icon.cloud;
    case "sun":
      return weather_icon.sun;
    case "snow":
      return weather_icon.snow;
    default:
      return weather_icon.sun;
  }
}
