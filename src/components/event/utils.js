const durationToSeconds = (duration, unit) => {
  // unit is stored in index.jsx as 1 = seconds, 2 = minutes, 3 = hours
  switch (unit) {
    case 1:
      return duration;
    case 2:
      return duration * 60;
    case 3:
      return duration * 3600;
    default:
      return duration;
  }
};

const calcEventDuration = (start, end, duration, unit) => {
  if (start && end) {
    return end.diff(start, 'seconds');
  } else if (duration) {
    return durationToSeconds(duration, unit);
  }
  return null;
}

export const buildEvent = (categoryName, eventDate, start, end, duration, unit, uid) => {
  const durationInSeconds = calcEventDuration(
    start,
    end,
    duration,
    unit
  );
  const newEvent = {
    category_name: categoryName,
    start_date: eventDate.clone().startOf('day').unix(),
    uid: uid,
  };
  if (durationInSeconds) newEvent['duration'] = durationInSeconds;
  if (start) newEvent['start_time'] = start.clone().unix();
  return newEvent;
}

export const buildNewCategory = (categoryName, eventDate, uid ) => {
  return {
    name: categoryName,
    uid,
    total_events: 1,
    most_recent_event: eventDate.clone().startOf('day').unix(),
  };
}

export const durationToFriendly = (duration) => {
  let number = duration;
  let unit = number === 1 ? 'second' : 'seconds';
  if (duration >= 60) {
    number = duration / 60
    unit = number === 1 ? 'minute' : 'minutes';
  }
  if (duration >= 3600) {
    number = duration / 3600;
    unit = number === 1 ? 'hour' : 'hours';
  }
  return `${number} ${unit}`;
}
