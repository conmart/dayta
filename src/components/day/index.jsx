import React, { Fragment, useEffect, useState } from 'react';
import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../state';
import { getEventsByDate } from '../../services/firebase';
import DayEvent from './dayEvent';

import styles from './day.module.css';

const Day = () => {
  const [{ selectedDate, uid }, dispatch] = useGlobalState();
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unixDate = selectedDate.clone().startOf('day').unix();
    getEventsByDate(unixDate, uid).then((events) => {
      const eventList = [];
      events.forEach((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        eventList.push(data);
      });
      setEvents(eventList);
      setLoading(false);
    })
  }, [loading, selectedDate, uid])

  const updateSelectedDate = (nextDay) => {
    const updatedDate = selectedDate.clone();
    nextDay ? updatedDate.add(1, 'day') : updatedDate.subtract(1, 'day');
    dispatch({ type: 'NEW_DATE', selectedDate: updatedDate });
  };

  const goToEvent = (event) => {
    dispatch({ type: 'EVENT_SELECTED', selectedEvent: event });
    history.push('/event');
  };

  const noEvents = !loading && !events.length
  const formattedDate = selectedDate.format('MMMM Do, YYYY');

  return (
    <Fragment>
      <div className="pageTitleContainer">
        <LeftOutlined onClick={() => updateSelectedDate(false)} />
        <div className="pageTitle">{formattedDate}</div>
        <RightOutlined onClick={() => updateSelectedDate(true)} />
      </div>
      <div className="pageContentContainer">
        {loading ? (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        ) : (
          events.map((event) => (
            <DayEvent
              event={event}
              key={event.id}
              goToEvent={() => goToEvent(event)}
            />
          ))
        )}
        {noEvents && <div className={styles.noEvents}>No events found</div>}
      </div>
    </Fragment>
  );
};

export default Day;
