import React from 'react';
import { LeftCircleFilled } from '@ant-design/icons';

import { formatDate, secondsToFriendly } from '../../services/utils';

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
            <tr onClick={() => goToEvent(event)} key={event.id}>
              <td>{formatDate(event['start_date'], 'M/DD/YY')}</td>
              <td>{formatDate(event['start_time'], 'h:mm a')}</td>
              <td>{secondsToFriendly(event['duration'])}</td>
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
