import React from 'react';

import { daysToDisplay } from './utils';
import CalendarDay from './calendarDay';

import styles from './calendar.module.css';

const CalendarBody = ({ selectedDate, setNewDate }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysOfMonth = daysToDisplay(selectedDate);

  const days = daysOfMonth.map((day, index) => (
    <CalendarDay key={index} dateObject={day} setNewDate={setNewDate} />
  ))

  return (
    <div className={styles.container}>
      <div className={styles.daysOfWeekHeader}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysContainer}>{days}</div>
    </div>
  );
};

export default CalendarBody;
