import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import styles from './day.module.css';

const DayEvent = ({ category, goToEvent }) => {
  return (
    <div className={styles.eventContainer} onClick={goToEvent}>
      {category}
      <div className={styles.eventIcons}>
        <EditOutlined />
        <DeleteOutlined />
      </div>
    </div>
  );
};

export default DayEvent;
