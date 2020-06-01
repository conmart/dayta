import moment from 'moment';
import { secondsToFriendly } from '../../services/utils';

const getAggregateNumbers = (events, interval) => {
  const label = interval === 'month' ? 'Month Total' : 'Year Total';
  const lowerBound = moment().startOf(interval).unix();
  const filteredEvents = events.filter(
    (event) => event['start_date'] >= lowerBound
  );
  const totalDuration = filteredEvents
    .filter((event) => event.duration)
    .reduce((acc, event) => { return acc + event.duration }, 0);
  return {
    key: interval,
    label,
    count: filteredEvents.length,
    duration: secondsToFriendly(totalDuration),
  }
};

export const buildDataSource = (events, selectedCategory) => {
  const dataSource = [];
  dataSource.push(getAggregateNumbers(events, 'month'))
  dataSource.push(getAggregateNumbers(events, 'year'));
  dataSource.push({
    key: 'total',
    label: 'All Time',
    count: selectedCategory['total_events'],
    duration: secondsToFriendly(selectedCategory['total_duration']),
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
