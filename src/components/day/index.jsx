import React, { Fragment } from 'react';

import { useGlobalState } from '../../state';

import DayHeader from './dayHeader';
import DayEvent from './dayEvent';

const Day = () => {
  const [{ selectedDate }, dispatch] = useGlobalState();

  const updateSelectedDate = (nextDay) => {
    const updatedDate = selectedDate.clone();
    nextDay ? updatedDate.add(1, 'day') : updatedDate.subtract(1, 'day');
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const events = ['Category 1', 'Category 2'];

  const eventList = events.map((event) => (
    <DayEvent category={event} key={event} />
  ));

  return (
    <Fragment>
      <DayHeader
        nextDay={() => updateSelectedDate(true)}
        previousDay={() => updateSelectedDate(false)}
        selectedDate={selectedDate}
      />
      <div className="pageContentContainer">{eventList}</div>
    </Fragment>
  );
};

export default Day;
