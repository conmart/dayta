import React from 'react';

import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Cat1',
    age: 32,
    address: 'test1',
  },
  {
    key: '2',
    name: 'Cat2',
    age: 42,
    address: 'test2',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Total Events',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Most Recent',
    dataIndex: 'address',
    key: 'address',
  },
];

// TODO: fix table to make it look good

const CategoryTable = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CategoryTable;
