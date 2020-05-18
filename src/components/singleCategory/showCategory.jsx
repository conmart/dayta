import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';

import styles from './category.module.css';
import 'antd/dist/antd.css';

import { showSource, showColumns } from './dummyData';

const ShowCategory = ({ showEventList }) => {
  // TODO: style display of most recent category occurance

  return (
    <div className={styles.showContainer}>
      <Table 
        dataSource={showSource}
        columns={showColumns}
        pagination={false}
      />
      <div>Most Recent Event</div>
      September 19th, 2019
      <div className={styles.showIconsContainer}>
        <div className={styles.showIcon}>
          <DeleteOutlined />
        </div>
        <div className={styles.showIcon} onClick={showEventList}>
          <UnorderedListOutlined />
        </div>
      </div>
    </div>
  );
};

export default ShowCategory;
