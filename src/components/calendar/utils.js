export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const years = [...Array(200).keys()].map((year) => year + 1900);

export const daysToDisplay = (selectedDate) => {
  const firstDay = selectedDate.clone().startOf('month').startOf('week');
  const lastDay = selectedDate.clone().endOf('month').endOf('week');
  const days = [];
  while (!firstDay.isAfter(lastDay)) {
    days.push(firstDay.clone());
    firstDay.add(1, 'day');
  }
  return days;
};

// TODO: try to combine eventDateRange and buildEventsByDay
export const eventDateRange = (selectedDate) => {
  const start = selectedDate
    .clone()
    .subtract(1, 'month')
    .startOf('month')
    .startOf('week')
    .unix();
  const end = selectedDate
    .clone()
    .add(1, 'month')
    .endOf('month')
    .endOf('week')
    .unix();
  return [start, end];
};

export const buildEventsByDay = (events) => {
  const eventsByDay = {};
  events.forEach((event) => {
    const data = event.data();
    const date = data['start_date'];
    let existingEvents = eventsByDay[date];
    if (existingEvents) {
      eventsByDay[date] = existingEvents.concat([data]);
    } else {
      eventsByDay[date] = [data];
    }
  });
  return eventsByDay;
};
