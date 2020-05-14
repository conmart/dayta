import React from 'react';

import { useGlobalState } from '../../state';


import DayHeader from './dayHeader';
import DayEvent from './dayEvent';

import styles from './day.module.css';

const Day = () => {
  const [{selectedDate}, dispatch] = useGlobalState();

  console.log(selectedDate)
  const events = ['Event1', 'Event2'];

  const eventList = events.map(event => (
    <DayEvent category={event} key={event} />
  ))

  return (
    <div>
      <DayHeader selectedDate={null} />
      <div>
        {eventList}
      </div>
    </div>
  )
}

export default Day;