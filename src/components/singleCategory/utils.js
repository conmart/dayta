import moment from 'moment';
import { formattedSeconds } from '../../services/utils';

const getAggregateNumbers = (events, interval) => {
  const label = interval === 'month' ? 'Month Total' : 'Year Total';
  const lowerBound = moment().startOf(interval).unix();
  const filteredEvents = events.filter(
    (event) => event['start_date'] >= lowerBound
  );
  const totalDuration = filteredEvents
    .filter((event) => event.duration)
    .reduce((acc, event) => {
      return acc + event.duration;
    }, 0);
  return {
    key: interval,
    label,
    count: filteredEvents.length,
    duration: formattedSeconds(totalDuration),
  };
};

export const buildDataSource = (events, selectedCategory) => {
  const dataSource = [];
  dataSource.push(getAggregateNumbers(events, 'month'));
  dataSource.push(getAggregateNumbers(events, 'year'));
  dataSource.push({
    key: 'total',
    label: 'All Time',
    count: selectedCategory['total_events'],
    duration: formattedSeconds(selectedCategory['total_duration']),
  });
  return dataSource;
};

export const showColumns = [
  {
    title: '',
    dataIndex: 'label',
    key: 'c1',
  },
  {
    title: 'Events',
    dataIndex: 'count',
    key: 'c2',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'c3',
  },
];

export const startAndEndOfYear = () => {
  const start = moment().startOf('year').unix();
  const end = moment().endOf('year').unix();
  return [start, end];
};

export const findExistingCategory = (categories, name) =>
  categories.filter((category) => category.name === name)[0];

export const buildCategoryUpdate = (categoryToDelete, categoryToUpdate) => {
  const totalDuration =
    categoryToDelete['total_duration'] + categoryToUpdate['total_duration'];
  const totalEvents =
    categoryToDelete['total_events'] + categoryToUpdate['total_events'];
  const mostrecentEvent = Math.max(
    categoryToDelete['most_recent_event'],
    categoryToUpdate['most_recent_event']
  );
  return {
    total_duration: totalDuration,
    total_events: totalEvents,
    most_recent_event: mostrecentEvent,
  };
};
