import React from 'react';

import styles from './calendar.module.css';

const Days = () => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  return (
    <div className={styles.daysContainer}>
      <div className={styles.daysOfWeekHeader}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Days;
