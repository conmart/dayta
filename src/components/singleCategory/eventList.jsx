import React from 'react';
import { Table } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';

import styles from './category.module.css';
import 'antd/dist/antd.css';

import { dataSource, columns } from './dummyData';

const EventList = ({ backToShow, events }) => {
  // console.log(events)
  return (
    <div className="pageContentContainer">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div className={styles.backToShow} onClick={backToShow}>
        <LeftCircleFilled />
      </div>
    </div>
  );
}

export default EventList;