import moment from 'moment';

export const formatDate = (date, format) => {
  if (!date) return null;
  return moment.unix(date).format(format)
}

export const secondsToFriendly = (duration) => {
  if (!duration) return null;
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
  return `${number} ${unit}`;
};
