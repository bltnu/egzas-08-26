export const translateDay = (day) => {
  switch (day) {
    case "Mon":
      return "Pirmadienis";
    case "Tue":
      return "Antradienis";
    case "Wed":
      return "Trečiadienis";
    case "Thu":
      return "Ketvirtadienis";
    case "Fri":
      return "Penktadienis";
    case "Sat":
      return "Šeštadienis";
    case "Sun":
      return "Sekamdienis";
    default:
      return day;
  }
};

export const convertDate = (date) => {
  const convertedDate = new Date(date);
  return convertedDate.toLocaleDateString();
};
