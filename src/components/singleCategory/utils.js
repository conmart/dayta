import { secondsToFriendly } from '../../services/utils';

// const showSource = [
  // {
  //   key: '1',
  //   label: 'Month Total',
  //   events: 10,
  //   duration: '5 hours',
  // },
  // {
  //   key: '2',
  //   label: 'Year Total',
  //   events: 40,
  //   duration: '25 hours',
  // },
  // {
  //   key: '3',
  //   label: 'All Time',
  //   events: 43,
  //   duration: '30 hours',
  // },
// ];

export const buildDataSource = (events, selectedCategory) => {
  const dataSource = [];
  dataSource.push({
    key: '3',
    label: 'All Time',
    events: selectedCategory['total_events'],
    duration: secondsToFriendly(selectedCategory['total_duration'])
  });
  return dataSource;
}

export const showColumns = [
  {
    title: '',
    dataIndex: 'label',
    key: 'c1',
  },
  {
    title: 'Events',
    dataIndex: 'events',
    key: 'c2',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'c3',
  },
];
