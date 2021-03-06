import moment from 'moment';

export const formatDate = (date, format) => {
  if (!date) return null;
  return moment.unix(date).format(format);
};

export const secondsToFriendly = (duration) => {
  let number = duration;
  let unit = number === 1 ? 'second' : 'seconds';
  if (duration >= 60) {
    number = duration / 60;
    unit = number === 1 ? 'minute' : 'minutes';
  }
  if (duration >= 3600) {
    number = duration / 3600;
    unit = number === 1 ? 'hour' : 'hours';
  }
  number = Math.round(number * 100) / 100;
  return [number, unit];
};

export const formattedSeconds = (duration) => {
  if (!duration) return null;
  const [number, unit] = secondsToFriendly(duration);
  return `${number} ${unit}`;
};

export const buildResourceList = (querySnapshot) => {
  const resourceList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data['id'] = doc.id;
    resourceList.push(data);
  })
  return resourceList;
}

export const sortEvents = (events) => {
  if (!events.length) return events;
  const eventsWithStart = [];
  const eventsWithoutStart = [];
  for (const event of events) {
    if (event['start_time']) {
      eventsWithStart.push(event);
    } else {
      eventsWithoutStart.push(event);
    }
  }
  eventsWithStart.sort((a, b) => a['start_time'] - b['start_time']);
  eventsWithoutStart.sort((a, b) => {
    const aName = a['category_name'].toUpperCase();
    const bName = b['category_name'].toUpperCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });
  return eventsWithStart.concat(eventsWithoutStart);
};
