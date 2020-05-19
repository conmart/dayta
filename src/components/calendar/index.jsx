import React, { Fragment } from 'react';

import { useGlobalState } from '../../state';

import CalendarHeader from './calendarHeader';
import CalendarBody from './calendarBody';

const Calendar = () => {
  const [{ selectedDate }, dispatch] = useGlobalState();

  const setNewDate = (updatedDate) => {
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const setMonth = (e) => {
    const updatedDate = selectedDate.clone();
    updatedDate.month(e);
    setNewDate(updatedDate);
  };

  const setYear = (e) => {
    const updatedDate = selectedDate.clone();
    updatedDate.year(e);
    setNewDate(updatedDate);
  };

  return (
    <Fragment>
      <CalendarHeader
        selectedDate={selectedDate}
        setMonth={setMonth}
        setYear={setYear}
      />
      <CalendarBody selectedDate={selectedDate} setNewDate={setNewDate} />
    </Fragment>
  );
};

export default Calendar;
