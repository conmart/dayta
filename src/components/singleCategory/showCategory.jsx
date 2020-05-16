import React from 'react';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';

import styles from './category.module.css';

const ShowCategory = ({ showEventList }) => {
  return (
    <div>
      show category
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
