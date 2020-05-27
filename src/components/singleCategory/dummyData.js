export const dataSource = [
  {
    key: '1',
    date: 'May 14th',
    start: '3:00pm',
    duration: '3 hours',
  },
  {
    key: '2',
    date: 'May 4th',
    start: '3:00pm',
    duration: '30 minutes',
  },
  {
    key: '3',
    date: 'April 22nd',
    start: '3:00pm',
    duration: '40 minutes',
  },
  {
    key: '4',
    date: 'April 2nd',
    start: '3:00pm',
    duration: '2 hours',
  },
];

export const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Start',
    dataIndex: 'start',
    key: 'start',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
];

export const showSource = [
  {
    key: '1',
    label: 'Month Total',
    events: 10,
    duration: '5 hours',
  },
  {
    key: '2',
    label: 'Year Total',
    events: 40,
    duration: '25 hours',
  },
  {
    key: '3',
    label: 'All Time',
    events: 43,
    duration: '30 hours',
  },
];

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
