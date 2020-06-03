import React from 'react';
import { Divider, Table } from 'antd';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import { formatDate } from '../../services/utils';
import { buildDataSource, showColumns } from './utils';

import styles from './category.module.css';
import 'antd/dist/antd.css';

const cx = classNames.bind(styles)

const ShowCategory = ({
  handleDelete,
  events,
  selectedCategory,
  showEventList,
}) => {
  const formattedMostRecent = formatDate(
    selectedCategory['most_recent_event'],
    'MMMM Do, YYYY'
  );

  const dataSource = buildDataSource(events, selectedCategory);
  const deleteStyles = cx('showIcon', 'delete');
  const eventListStyles = cx('showIcon', 'eventListIcon');

  return (
    <div className={styles.showContainer}>
      <Table dataSource={dataSource} columns={showColumns} pagination={false} />
      <div className={styles.mostRecent}>
        <Divider>Most Recent Event</Divider>
        {formattedMostRecent}
      </div>
      <div className={styles.showIconsContainer}>
        <div className={deleteStyles} onClick={handleDelete}>
          <DeleteOutlined />
        </div>
        <div className={eventListStyles} onClick={showEventList}>
          <UnorderedListOutlined />
        </div>
      </div>
    </div>
  );
};

export default ShowCategory;
