import React from 'react';
import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './day.module.css';

const DayEvent = ({ event, goToEvent }) => {
  const { category_name: name, duration, start_time: start } = event;
  const formattedStart = formatDate(start, 'h:mm a');
  const formattedDuration = formattedSeconds(duration);

  return (
    <div className={styles.eventContainer} onClick={goToEvent}>
      <div>{name}</div>
      <div className={styles.eventDetail}>
        {formattedStart && <div>{formattedStart}</div>}
        {formattedDuration && <div>{formattedDuration}</div>}
      </div>
    </div>
  );
};

export default DayEvent;
