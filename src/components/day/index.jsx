import React, { Fragment, useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import { getEventsByDate } from '../../services/firebase';

import DayHeader from './dayHeader';
import DayEvent from './dayEvent';

const Day = () => {
  const [{ selectedDate, uid }, dispatch] = useGlobalState();
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unixDate = selectedDate.clone().startOf('day').unix();
    getEventsByDate(unixDate, uid).then((events) => {
      setLoading(false);
      const eventList = [];
      events.forEach((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        eventList.push(data);
      });
      setEvents(eventList);
    })
  }, [loading, selectedDate, uid])

  const updateSelectedDate = (nextDay) => {
    const updatedDate = selectedDate.clone();
    nextDay ? updatedDate.add(1, 'day') : updatedDate.subtract(1, 'day');
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const goToEvent = (event) => {
    dispatch({ type: 'EVENT_SELECTED', event });
    history.push('/event');
  };

  const noEvents = !loading && !events.length

  return (
    <Fragment>
      <DayHeader
        nextDay={() => updateSelectedDate(true)}
        previousDay={() => updateSelectedDate(false)}
        selectedDate={selectedDate}
      />
      <div className="pageContentContainer">
        {loading ? (<LoadingOutlined />) : (
          events.map(event => (
            <DayEvent
              category={event['category_name']}
              key={event.id}
              goToEvent={() => goToEvent(event)}
              />
          ))
        )}
        {noEvents && <div>no events found</div>}
      </div>
    </Fragment>
  );
};

export default Day;
