import React from 'react';

import { daysToDisplay } from './utils';
import CalendarDay from './calendarDay';

import styles from './calendar.module.css';

const CalendarBody = ({ events, selectedDate, setNewDate }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysOfMonth = daysToDisplay(selectedDate);
  const numRows = daysOfMonth.length / 7;
  const currentMonth = selectedDate.month();

  const days = daysOfMonth.map((day, index) => {
    const eventsForThisDay = events[day.unix()];
    return (
      <CalendarDay
        currentMonth={currentMonth}
        dateObject={day}
        events={eventsForThisDay ? eventsForThisDay : []}
        key={index}
        rows={numRows}
        setNewDate={setNewDate}
      />
    );
  });

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
