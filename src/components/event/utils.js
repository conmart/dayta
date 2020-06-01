import * as fs from '../../services/firebase';

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
};

export const buildEvent = (
  categoryName,
  eventDate,
  start,
  end,
  duration,
  unit,
  uid
) => {
  const durationInSeconds = calcEventDuration(start, end, duration, unit);
  const newEvent = {
    category_name: categoryName,
    start_date: eventDate.clone().startOf('day').unix(),
    uid: uid,
  };
  if (durationInSeconds) newEvent['duration'] = durationInSeconds;
  if (start) newEvent['start_time'] = start.clone().unix();
  return newEvent;
};

export const buildNewCategory = (categoryName, duration, eventDate, uid) => {
  return {
    name: categoryName,
    uid,
    total_duration: duration ? duration : 0,
    total_events: 1,
    most_recent_event: eventDate.clone().startOf('day').unix(),
  };
};

const updateExistingCategory = (
  id,
  name,
  newCount,
  newDuration,
  uid
) => {
  fs.getMostRecentEventForCategory(name, uid).then((collection) => {
    let latestEvent;
    collection.forEach((doc) => (latestEvent = doc.data()['start_date']));
    const updatedCategoryData = {
      total_events: newCount,
      most_recent_event: latestEvent ? latestEvent : null,
    };
    if (newDuration) updatedCategoryData['total_duration'] = newDuration;
    fs.updateCategory(id, updatedCategoryData);
  });
};

const createNewDuration = (add, categoryDuration, eventDuration) =>
  add ? categoryDuration + eventDuration : categoryDuration - eventDuration;

export const handleCategoryUpdate = (add, category, eventDuration, uid) => {
  const { count, duration, id, name } = category;
  const newCount = add ? count + 1 : count - 1;
  const newDuration = eventDuration
    ? createNewDuration(add, duration, eventDuration)
    : false;
  updateExistingCategory(id, name, newCount, newDuration, uid);
};

export const durationToFriendly = (duration) => {
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
  return `${number} ${unit}`;
};
