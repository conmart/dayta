import React from 'react';
import { LeftCircleFilled } from '@ant-design/icons';

import styles from './category.module.css';

const EventList = ({ backToShow, events }) => {
  // TODO: style list
  // TODO: pass down function to update selected Event
  return (
    <div className="pageContentContainer">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr onClick={() => console.log(event.id)} key={event.id}>
              <td>{event['start_date']}</td>
              <td>{event['start_time']}</td>
              <td>{event['duration']}</td>
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
