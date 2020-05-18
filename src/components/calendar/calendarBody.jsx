import React from 'react';

import { daysToDisplay } from './utils';

import styles from './calendar.module.css';

const CalendarBody = ({ selectedDate }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const days = daysToDisplay(selectedDate);
  console.log(days);

  return (
    <div className={styles.daysContainer}>
      <div className={styles.daysOfWeekHeader}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>
      <div>days of the month</div>
    </div>
  );
};

export default CalendarBody;
