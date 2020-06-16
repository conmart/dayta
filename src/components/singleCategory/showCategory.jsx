import React, { useState } from 'react';
import { Divider, Table } from 'antd';
import {
  DeleteOutlined,
  LoadingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';

import { formatDate } from '../../services/utils';
import { buildDataSource, showColumns } from './utils';
import ConfirmationModal from '../confirmationModal';

import styles from './category.module.css';
import 'antd/dist/antd.css';

const cx = classNames.bind(styles);

const ShowCategory = ({
  handleDelete,
  events,
  loading,
  selectedCategory,
  showEventList,
}) => {
  const [showModal, setShowModal] = useState(false);
  const formattedMostRecent = formatDate(
    selectedCategory['most_recent_event'],
    'MMMM Do, YYYY'
  );

  const dataSource = buildDataSource(events, selectedCategory);
  const deleteStyles = cx('showIcon', 'delete');
  const eventListStyles = cx('showIcon', 'eventListIcon');

  const confirmDelete = () => {
    setShowModal(true);
  };

  const modalText =
    'Are you sure? This action will delete this category as well as all associated events.';

  return (
    <div>
      {loading ? (
        <div className="loadingContainer">
          <LoadingOutlined />
        </div>
      ) : (
        <div className={styles.showContainer}>
          {showModal && (
            <ConfirmationModal
              cancel={() => setShowModal(false)}
              confirm={handleDelete}
              text={modalText}
            />
          )}
          <Table
            dataSource={dataSource}
            columns={showColumns}
            pagination={false}
          />
          <div className={styles.mostRecent}>
            <Divider>Most Recent Event</Divider>
            {formattedMostRecent}
          </div>
          <div className={styles.showIconsContainer}>
            <div className={deleteStyles} onClick={confirmDelete}>
              <DeleteOutlined />
            </div>
            <div className={eventListStyles} onClick={showEventList}>
              <UnorderedListOutlined />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCategory;
