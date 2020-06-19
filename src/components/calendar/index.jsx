import React, { Fragment, useEffect, useState } from 'react';

import { useGlobalState } from '../../state';
import { getEventsByDateRange } from '../../services/firebase';
import { buildEventsByDay, eventDateRange } from './utils';

import CalendarHeader from './calendarHeader';
import CalendarBody from './calendarBody';

const Calendar = () => {
  const [{ selectedDate, uid }, dispatch] = useGlobalState();
  const [eventsByDate, setEventsByDate] = useState({});

  useEffect(() => {
    const [start, end] = eventDateRange(selectedDate);
    getEventsByDateRange(start, end, uid).then((events) => {
      setEventsByDate(buildEventsByDay(events));
    });
  }, [selectedDate, uid]);

  const setNewDate = (updatedDate) => {
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const setMonth = (e) => setNewDate(selectedDate.clone().month(e));
  const setYear = (e) => setNewDate(selectedDate.clone().year(e));

  return (
    <Fragment>
      <CalendarHeader
        selectedDate={selectedDate}
        setMonth={setMonth}
        setYear={setYear}
      />
      <CalendarBody
        events={eventsByDate}
        selectedDate={selectedDate}
        setNewDate={setNewDate}
      />
    </Fragment>
  );
};

export default Calendar;
