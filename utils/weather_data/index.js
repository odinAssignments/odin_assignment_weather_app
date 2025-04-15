export function getMainWeatherTag(data) {
  const conditions = data.conditions.toLowerCase();

  if (conditions.includes("rain")) return "Rain";
  if (conditions.includes("snow")) return "Snow";
  if (data.cloudcover >= 70) return "Cloudy";
  if (data.cloudcover >= 30) return "Partly Cloudy";

  return "Sunny";
}
