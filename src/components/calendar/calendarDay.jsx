import React from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import styles from './calendar.module.css';

const cx = classNames.bind(styles);

const CalendarDay = ({
  currentMonth,
  dateObject,
  events,
  rows,
  setNewDate,
}) => {
  const history = useHistory();

  const goToDay = () => {
    setNewDate(dateObject);
    history.push('/');
  };

  const eventsFound = events ? events.length : false;

  const dayStyles = cx('day', {
    tallDay: rows === 5,
    extraTallDay: rows === 4,
    outsideCurrentMonth: dateObject.month() !== currentMonth,
  });
  const numberStyles = cx('dayNumber', { eventsFound });
  // TODO: Improve info available on calendar day, and add media queries

  return (
    <div className={dayStyles} onClick={goToDay}>
      <span className={numberStyles}>{dateObject.format('DD')}</span>
      {eventsFound && (
        <div className={styles.foundEvents}>{eventsFound} Events found</div>
      )}
    </div>
  );
};

export default CalendarDay;
