import React, { Fragment } from 'react';

import { useGlobalState } from '../../state';

import CalendarHeader from './calendarHeader';
import Days from './days';

const Calendar = () => {
  const [{ selectedDate }, dispatch] = useGlobalState();

  const setMonth = (e) => {
    const updatedDate = selectedDate.clone();
    updatedDate.month(e);
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  return (
    <Fragment>
      <CalendarHeader selectedDate={selectedDate} setMonth={setMonth} />
      <Days />
    </Fragment>
  );
};

export default Calendar;
