import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';

import { getLimitedEventsByCategory } from '../../services/firebase';
import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './category.module.css';
import 'antd/dist/antd.css'; // Do I need this here?

const limit = 50;

const EventList = ({ backToShow, category, goToEvent, uid }) => {
  const { name: categoryName, total_events: totalEvents } = category;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreEvents, setMoreEvents] = useState(false);
  const [lastReceived, setLastReceived] = useState(null);

  const loadEvents = () => {
    setLoading(true);
    getLimitedEventsByCategory(categoryName, lastReceived, limit, uid).then(
      (receivedEvents) => {
        setLastReceived(receivedEvents.docs[receivedEvents.docs.length - 1]);
        let eventData = [];
        receivedEvents.forEach((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          eventData.push(data);
        });
        eventData = events.concat(eventData);
        setEvents(eventData);
        setLoading(false);
        setMoreEvents(eventData.length < totalEvents);
      }
    );
  };

  // TODO: Figure out this linter warning
  useEffect(() => {
    loadEvents();
  }, [categoryName]);

  return (
    <Fragment>
      <div className="pageContentContainer">
        <table className={styles.eventListTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                className={styles.eventRow}
                onClick={() => goToEvent(event)}
                key={event.id}
              >
                <td>{formatDate(event['start_date'], 'M/DD/YY')}</td>
                <td>{formatDate(event['start_time'], 'h:mm a')}</td>
                <td>{formattedSeconds(event['duration'])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="loadingContainer">
            <LoadingOutlined />
          </div>
        )}
        {moreEvents && !loading && (
          <div className={styles.loadMore}>
            <Button type="primary" onClick={loadEvents} size="large">
              Load more events
            </Button>
          </div>
        )}
      </div>
      <div className={styles.backToShow} onClick={backToShow}>
          <ArrowLeftOutlined />
          <span className={styles.backText}>Back</span>
      </div>
    </Fragment>
  );
};

export default EventList;
