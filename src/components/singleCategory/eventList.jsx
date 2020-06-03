import React from 'react';
import { LeftCircleFilled } from '@ant-design/icons';

import { formatDate, formattedSeconds } from '../../services/utils';

import styles from './category.module.css';

const EventList = ({ backToShow, events, goToEvent }) => {
  return (
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
      <div className={styles.backToShow} onClick={backToShow}>
        <LeftCircleFilled />
      </div>
    </div>
  );
};

export default EventList;
