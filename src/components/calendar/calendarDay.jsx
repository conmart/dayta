import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './calendar.module.css';

const CalendarDay = ({ dateObject, setNewDate }) => {
  const history = useHistory();

  const goToDay = () => {
    setNewDate(dateObject);
    history.push('/');
  };

  return (
    <div className={styles.day} onClick={goToDay}>
      {dateObject.format('DD')}
    </div>
  );
};

export default CalendarDay;
