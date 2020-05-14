import React from 'react';

import { useGlobalState } from '../../state';

import DayHeader from './dayHeader';
import DayEvent from './dayEvent';

import styles from './day.module.css';

const Day = () => {
  const [{ selectedDate }, dispatch] = useGlobalState();

  const updateSelectedDate = (nextDay) => {
    const updatedDate = selectedDate.clone();
    nextDay ? updatedDate.add(1, 'day') : updatedDate.subtract(1, 'day');
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const events = ['Event1', 'Event2'];

  const eventList = events.map((event) => (
    <DayEvent category={event} key={event} />
  ));

  return (
    <div>
      <DayHeader
        nextDay={() => updateSelectedDate(true)}
        previousDay={() => updateSelectedDate(false)}
        selectedDate={selectedDate}
      />
      <div>{eventList}</div>
    </div>
  );
};

export default Day;
