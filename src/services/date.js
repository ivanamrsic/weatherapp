const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getDayNameFromDate(date) {
  const day = new Date(date).getDay();
  return DAYS[day];
}
