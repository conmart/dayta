export const dataSource = [
  {
    key: '1',
    name: 'TestCategory1',
    instances: 32,
    latest: 'May 4th',
  },
  {
    key: '2',
    name: 'Cat2',
    instances: 42,
    latest: 'April 22nd',
  },
  {
    key: '3',
    name: 'Ca3',
    instances: 43,
    latest: 'March 3rd',
  },
  {
    key: '4',
    name: 'Cat4',
    instances: 44,
    latest: 'March 15th',
  },
];

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Total Events',
    dataIndex: 'instances',
    key: 'instances',
  },
  {
    title: 'Last Event',
    dataIndex: 'latest',
    key: 'latest',
  },
];
