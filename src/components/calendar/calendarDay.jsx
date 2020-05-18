import React from 'react';

import styles from './calendar.module.css';

const CalendarDay = ({ dateObject }) => {
  return (
    <div className={styles.day}>
      {dateObject.format('DD')}
    </div>
  )
}

export default CalendarDay;
