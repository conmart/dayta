import moment from 'moment';
import * as fs from '../../services/firebase';
import { secondsToFriendly } from '../../services/utils';

const datePickFormat = 'YYYY-MM-DD';

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
    uid: uid,
  };
  if (eventDate)
    newEvent['start_date'] = moment(eventDate, datePickFormat)
      .startOf('day')
      .unix();
  if (durationInSeconds) newEvent['duration'] = durationInSeconds;
  if (start) newEvent['start_time'] = start.clone().unix();
  return newEvent;
};

export const buildNewCategory = (newEvent, uid) => {
  const {
    category_name: categoryName,
    duration,
    start_date: startDate,
  } = newEvent;
  return {
    name: categoryName,
    uid,
    total_duration: duration ? duration : 0,
    total_events: 1,
    most_recent_event: startDate,
  };
};

const updateExistingCategory = (id, name, newCount, newDuration, uid) => {
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

export const handleCategoryUpdate = (
  countIncr,
  category,
  durationChange,
  uid
) => {
  const { count, duration, id, name } = category;
  const newCount = count + countIncr;
  const newDuration = durationChange ? duration + durationChange : false;
  updateExistingCategory(id, name, newCount, newDuration, uid);
};

const extractValuesFromEvent = (event) => {
  if (!event) return [null, null, null, null];
  const oldDuration = event['duration'];
  const oldEventName = event['category_name'];
  const oldStartDate = event['start_date'];
  const oldStartTime = event['start_time'];
  return [oldDuration, oldEventName, oldStartDate, oldStartTime];
};

const getCategoryName = (oldEventName, category) => {
  if (oldEventName) return oldEventName;
  if (category && category['name']) return category['name'];
  return null;
};

export const eventDurationUnits = (duration) => {
  if (!duration) return [null, null];
  // unit is stored in index.jsx as 1 = seconds, 2 = minutes, 3 = hours
  const unitMap = { s: 1, m: 2, h: 3 };
  const [number, unit] = secondsToFriendly(duration);
  const mappedUnit = unitMap[unit[0]];
  return [number, mappedUnit];
};

export const calcDefaultValues = (category, event, selectedDate) => {
  const [
    oldDuration,
    oldEventName,
    oldStartDate,
    oldStartTime,
  ] = extractValuesFromEvent(event);
  const defaultCategoryName = getCategoryName(oldEventName, category);
  const defaultEventDate = oldStartDate
    ? moment.unix(oldStartDate).format(datePickFormat)
    : selectedDate.format(datePickFormat);
  const defaultEventStart = oldStartTime ? moment.unix(oldStartTime) : '';
  const defaultEventEnd =
    oldDuration && oldStartTime
      ? moment.unix(oldStartTime).add(oldDuration, 'seconds')
      : '';
  const [durNum, durUnit] = eventDurationUnits(oldDuration);
  const defaultDuration = durNum ? durNum : null;
  const defaultDurationUnit = durUnit ? durUnit : 2;
  return [
    defaultCategoryName,
    defaultEventDate,
    defaultEventStart,
    defaultEventEnd,
    defaultDuration,
    defaultDurationUnit,
  ];
};

export const compareEvents = (newEvent, oldEvent) => {
  const eventFields = ['category_name', 'duration', 'start_date', 'start_time'];
  const eventDiff = {};
  for (const field of eventFields) {
    if (newEvent[field] !== oldEvent[field]) {
      eventDiff[field] = newEvent[field] ? newEvent[field] : null;
    } else {
      delete eventDiff[field];
    }
  }
  return eventDiff;
};

const strTimeToMoment = (time) => (time ? moment(time, 'HH:mm') : null);

export const validateTime = (eventStart, eventEnd) => {
  const start = strTimeToMoment(eventStart);
  const end = strTimeToMoment(eventEnd);
  if (start && end && !start.isBefore(end)) return ['', ''];
  return [start, end];
};
