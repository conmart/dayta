import React from 'react';

import { Table } from 'antd';

import 'antd/dist/antd.css';

const dataSource = [
  {
    key: '1',
    name: 'TestCategory1',
    age: 32,
    address: 'test1',
  },
  {
    key: '2',
    name: 'Cat2',
    age: 42,
    address: 'test2',
  },
  {
    key: '3',
    name: 'Ca3',
    age: 43,
    address: 'test3',
  },
  {
    key: '4',
    name: 'Cat4',
    age: 44,
    address: 'test4',
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
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default CategoryTable;
