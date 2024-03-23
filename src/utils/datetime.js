const displayTime = (datetime) => {
  return `${datetime.getUTCHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`;
};

const displayWeekDayName = (datetime) => {
  const nameDay = datetime.toLocaleDateString('it-IT', {weekday: 'long', timeZone: 'UTC'});
  return nameDay.charAt(0).toUpperCase() + nameDay.slice(1);
}

export default {
  displayTime,
  displayWeekDayName
}