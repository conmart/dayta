import React from 'react';
import { Divider, Table } from 'antd';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from './category.module.css';
import 'antd/dist/antd.css';

import { buildDataSource, showColumns } from './utils';

const ShowCategory = ({
  handleDelete,
  events,
  selectedCategory,
  showEventList,
}) => {
  const formattedMostRecent = moment
    .unix(selectedCategory['most_recent_event'])
    .format('MMMM Do, YYYY');

  const dataSource = buildDataSource(events, selectedCategory);

  return (
    <div className={styles.showContainer}>
      <Table dataSource={dataSource} columns={showColumns} pagination={false} />
      <div className={styles.mostRecent}>
        <Divider>Most Recent Event</Divider>
        {formattedMostRecent}
      </div>
      <div className={styles.showIconsContainer}>
        <div className={styles.showIcon} onClick={handleDelete}>
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
