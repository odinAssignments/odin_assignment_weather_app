export function toPascalCase(str) {
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

export function monthsNumberToLetter(data) {
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

export function daysNumberToLetter(data) {
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

export function fahrenheitToCelsius(f) {
  return (((f - 32) * 5) / 9).toFixed(0);
}
