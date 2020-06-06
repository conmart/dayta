import React from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import { sortEvents } from '../../services/utils';

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

  const dayStyles = cx('day', {
    tallDay: rows === 5,
    extraTallDay: rows === 4,
    outsideCurrentMonth: dateObject.month() !== currentMonth,
  });
  const numberStyles = cx('dayNumber', { dayHasEvents: events.length });

  const eventList = sortEvents([...events]).map((event, index) => (
    <div key={index}>{event['category_name']}</div>
  ));

  return (
    <div className={dayStyles} onClick={goToDay}>
      <span className={numberStyles}>{dateObject.format('DD')}</span>
      <div className={styles.eventList}>{eventList}</div>
    </div>
  );
};

export default CalendarDay;
