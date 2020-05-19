import React from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import styles from './calendar.module.css';

const cx = classNames.bind(styles);

const CalendarDay = ({ currentMonth, dateObject, rows, setNewDate }) => {
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

  return (
    <div className={dayStyles} onClick={goToDay}>
      {dateObject.format('DD')}
    </div>
  );
};

export default CalendarDay;
